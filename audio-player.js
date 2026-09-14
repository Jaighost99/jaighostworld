const instrumental = document.querySelector('#site-instrumental');
const instrumentalToggle = document.querySelector('.instrumental-toggle');

if (instrumental && instrumentalToggle) {
  instrumental.volume = 0.32;

  const syncInstrumentalButton = () => {
    const playing = !instrumental.paused;
    instrumentalToggle.textContent = playing ? '❚❚ PAUSE' : '▶ INSTRUMENTAL';
    instrumentalToggle.classList.toggle('is-playing', playing);
    instrumentalToggle.setAttribute('aria-pressed', String(playing));
    instrumentalToggle.setAttribute('aria-label', playing ? 'Pause Break Them instrumental' : 'Play Break Them instrumental');
  };

  instrumentalToggle.addEventListener('click', async () => {
    if (instrumental.paused) {
      try {
        await instrumental.play();
      } catch {
        instrumentalToggle.textContent = 'TAP TO PLAY';
      }
    } else {
      instrumental.pause();
    }
  });

  instrumental.addEventListener('play', syncInstrumentalButton);
  instrumental.addEventListener('pause', syncInstrumentalButton);
  instrumental.addEventListener('error', () => {
    instrumentalToggle.textContent = 'AUDIO UNAVAILABLE';
    instrumentalToggle.disabled = true;
  });

  const videoLauncher = document.querySelector('.watch-world');
  const videoModal = document.querySelector('#jgw-video-modal');
  if (videoLauncher && videoModal) {
    videoLauncher.addEventListener('click', () => {
      videoModal.dataset.resumeInstrumental = String(!instrumental.paused);
      instrumental.pause();
    });

    new MutationObserver(() => {
      if (videoModal.hidden && videoModal.dataset.resumeInstrumental === 'true') {
        videoModal.dataset.resumeInstrumental = 'false';
        instrumental.play().catch(() => {});
      }
    }).observe(videoModal, { attributes: true, attributeFilter: ['hidden'] });
  }

  syncInstrumentalButton();
}

