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

/* Music Video Vault — four-video gallery and player inside Jai Ghost World */
const videoVaultLauncher = document.querySelector('[data-video-vault], .visual-copy .outline-button[href*="youtube"]');

if (videoVaultLauncher) {
  videoVaultLauncher.textContent = 'EXPLORE MUSIC VIDEOS →';
  videoVaultLauncher.href = '#video-vault';
  videoVaultLauncher.removeAttribute('target');
  videoVaultLauncher.removeAttribute('rel');
  videoVaultLauncher.setAttribute('aria-haspopup', 'dialog');
  videoVaultLauncher.setAttribute('aria-controls', 'jgw-video-vault');

  const vaultVideos = [
    {
      id: 'OOTt7VrOcS8',
      title: "I SEEN THROUGH THE DEVIL'S EYES",
      label: 'OFFICIAL MUSIC VIDEO',
      image: 'assets/hero-world.png'
    },
    {
      id: 'keFMGyhpq9k',
      title: 'HELL OF PAIN',
      label: 'OFFICIAL MUSIC VIDEO',
      image: 'https://i.ytimg.com/vi/keFMGyhpq9k/hqdefault.jpg'
    },
    {
      id: '_0nt_3sl-mI',
      title: "WHISPERS DON'T SLEEP",
      label: 'OFFICIAL MUSIC VIDEO',
      image: 'https://i.ytimg.com/vi/_0nt_3sl-mI/hqdefault.jpg'
    },
    {
      id: 'XSHizNXFIZQ',
      title: '41',
      label: 'MUSIC VISUAL',
      image: 'https://i.ytimg.com/vi/XSHizNXFIZQ/hqdefault.jpg'
    }
  ];

  const vaultStyles = document.createElement('style');
  vaultStyles.textContent = `
    .jgw-vault-shell{width:min(1040px,96vw)}
    .jgw-vault-content{padding:clamp(26px,4vw,48px)}
    .jgw-vault-content h2{margin:0 56px 8px 0;font-family:'Bebas Neue',sans-serif;font-size:clamp(2.2rem,5vw,4.7rem);font-weight:400;letter-spacing:.1em;line-height:.9}
    .jgw-vault-intro{margin:0 0 24px;color:#929592;font-size:.5rem;line-height:1.7;letter-spacing:.1em}
    .jgw-vault-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
    .jgw-vault-card{position:relative;min-width:0;padding:0;border:1px solid #353839;background:#040505;color:#fff;text-align:left;font:inherit;cursor:pointer;overflow:hidden;aspect-ratio:16/9}
    .jgw-vault-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(.46) contrast(1.16) brightness(.62);transition:transform .25s,filter .25s}
    .jgw-vault-card:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,#020303f2 0,transparent 64%);pointer-events:none}
    .jgw-vault-card:hover,.jgw-vault-card:focus-visible{border-color:var(--red,#bd171e);outline:none}
    .jgw-vault-card:hover img,.jgw-vault-card:focus-visible img{transform:scale(1.025);filter:grayscale(.12) contrast(1.12) brightness(.76)}
    .jgw-vault-play{position:absolute;z-index:2;left:16px;right:16px;bottom:15px;display:flex;align-items:center;gap:12px}
    .jgw-vault-play b{width:40px;height:40px;display:grid;place-items:center;border:1px solid #eee;border-radius:50%;font-size:.6rem;flex:0 0 auto}
    .jgw-vault-play strong{display:block;font-size:.55rem;letter-spacing:.12em;line-height:1.3}
    .jgw-vault-play small{display:block;margin-top:4px;color:#b1b3b0;font-size:.39rem;letter-spacing:.11em}
    .jgw-vault-footer{margin:18px 0 0;color:#767977;font-size:.42rem;letter-spacing:.17em;text-align:center}
    .jgw-vault-player[hidden],.jgw-vault-gallery[hidden]{display:none!important}
    .jgw-vault-player-head{display:flex;gap:14px;align-items:center;margin-bottom:16px;flex-wrap:wrap}
    .jgw-vault-back{min-height:42px;padding:9px 14px;border:1px solid #484b4b;background:#050606;color:#fff;font:700 .47rem 'Space Mono',monospace;letter-spacing:.12em;cursor:pointer}
    .jgw-vault-back:hover,.jgw-vault-back:focus-visible{border-color:var(--red,#bd171e);background:#741016;outline:none}
    .jgw-vault-now{min-width:0}.jgw-vault-now span{display:block;color:var(--red,#bd171e);font-size:.4rem;letter-spacing:.18em}.jgw-vault-now strong{display:block;margin-top:4px;font-family:'Bebas Neue',sans-serif;font-size:clamp(1.35rem,3vw,2.25rem);font-weight:400;letter-spacing:.08em;line-height:1}
    .jgw-vault-frame{position:relative;aspect-ratio:16/9;background:#000;border:1px solid #2f3233;overflow:hidden}
    .jgw-vault-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
    @media(max-width:700px){.jgw-vault-content{padding:22px 14px 16px}.jgw-vault-content h2{font-size:2rem}.jgw-vault-grid{grid-template-columns:1fr;gap:12px}.jgw-vault-play{left:12px;right:12px;bottom:12px}.jgw-vault-play strong{font-size:.48rem}.jgw-vault-card{aspect-ratio:16/9}.jgw-vault-footer{font-size:.38rem}}
  `;
  document.head.appendChild(vaultStyles);

  const cards = vaultVideos.map(video => `
    <button class="jgw-vault-card" type="button" data-video-id="${video.id}" data-video-title="${video.title.replace(/"/g, '&quot;')}" aria-label="Play ${video.title}">
      <img src="${video.image}" alt="${video.title} video thumbnail" loading="lazy" decoding="async">
      <span class="jgw-vault-play"><b aria-hidden="true">▶</b><span><strong>${video.title}</strong><small>${video.label}</small></span></span>
    </button>`).join('');

  const vaultModal = document.createElement('div');
  vaultModal.className = 'jgw-modal';
  vaultModal.id = 'jgw-video-vault';
  vaultModal.hidden = true;
  vaultModal.setAttribute('role', 'dialog');
  vaultModal.setAttribute('aria-modal', 'true');
  vaultModal.setAttribute('aria-labelledby', 'jgw-vault-title');
  vaultModal.innerHTML = `
    <div class="jgw-modal-backdrop" data-close-vault></div>
    <div class="jgw-modal-shell jgw-vault-shell">
      <button class="jgw-close" type="button" aria-label="Close music video vault">×</button>
      <div class="jgw-vault-content">
        <div class="jgw-vault-gallery">
          <div class="jgw-kicker">JAI GHOST WORLD / VIDEO VAULT</div>
          <h2 id="jgw-vault-title">MUSIC VIDEOS</h2>
          <p class="jgw-vault-intro">WATCH INSIDE THE WORLD.</p>
          <div class="jgw-vault-grid">${cards}</div>
          <p class="jgw-vault-footer">MORE VISUALS / MORE TRANSMISSIONS / COMING SOON</p>
        </div>
        <div class="jgw-vault-player" hidden>
          <div class="jgw-vault-player-head">
            <button class="jgw-vault-back" type="button">← BACK TO VIDEOS</button>
            <div class="jgw-vault-now"><span>NOW PLAYING</span><strong></strong></div>
          </div>
          <div class="jgw-vault-frame"><iframe title="Jai Ghost World music video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(vaultModal);

  const vaultClose = vaultModal.querySelector('.jgw-close');
  const vaultGallery = vaultModal.querySelector('.jgw-vault-gallery');
  const vaultPlayer = vaultModal.querySelector('.jgw-vault-player');
  const vaultFrame = vaultModal.querySelector('.jgw-vault-frame iframe');
  const vaultNowTitle = vaultModal.querySelector('.jgw-vault-now strong');
  const vaultBack = vaultModal.querySelector('.jgw-vault-back');

  const resumeSiteInstrumental = () => {
    if (instrumental && vaultModal.dataset.resumeInstrumental === 'true') {
      vaultModal.dataset.resumeInstrumental = 'false';
      instrumental.play().catch(() => {});
    }
  };

  const stopVaultVideo = ({ resume = true } = {}) => {
    vaultFrame.src = '';
    vaultPlayer.hidden = true;
    vaultGallery.hidden = false;
    if (resume) resumeSiteInstrumental();
  };

  const playVaultVideo = button => {
    const id = button.dataset.videoId;
    const title = button.dataset.videoTitle;
    if (!id || !title) return;
    if (instrumental) {
      vaultModal.dataset.resumeInstrumental = String(!instrumental.paused);
      instrumental.pause();
    }
    vaultNowTitle.textContent = title;
    vaultGallery.hidden = true;
    vaultPlayer.hidden = false;
    vaultFrame.title = `${title} music video`;
    vaultFrame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    if (typeof gtag === 'function') gtag('event', 'video_vault_play', { video_title: title, youtube_id: id });
    requestAnimationFrame(() => vaultBack.focus());
  };

  const openVault = () => {
    stopVaultVideo({ resume: false });
    vaultModal.hidden = false;
    document.body.classList.add('jgw-modal-open');
    if (typeof gtag === 'function') gtag('event', 'video_vault_open');
    requestAnimationFrame(() => vaultClose.focus());
  };

  const closeVault = () => {
    stopVaultVideo({ resume: true });
    vaultModal.hidden = true;
    document.body.classList.remove('jgw-modal-open');
    videoVaultLauncher.focus();
  };

  videoVaultLauncher.addEventListener('click', event => {
    event.preventDefault();
    openVault();
  });

  vaultModal.querySelectorAll('[data-video-id]').forEach(button => {
    button.addEventListener('click', () => playVaultVideo(button));
  });

  vaultBack.addEventListener('click', () => {
    stopVaultVideo({ resume: true });
    requestAnimationFrame(() => vaultModal.querySelector('[data-video-id]')?.focus());
  });
  vaultClose.addEventListener('click', closeVault);
  vaultModal.querySelector('[data-close-vault]').addEventListener('click', closeVault);
  vaultModal.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (!vaultPlayer.hidden) {
        stopVaultVideo({ resume: true });
        requestAnimationFrame(() => vaultModal.querySelector('[data-video-id]')?.focus());
      } else {
        closeVault();
      }
    }
  });
}

/* GHOST RADIO — Jai Loyal Spotify artist catalog inside Jai Ghost World */
const siteNav = document.querySelector('#site-nav');
const contactNavLink = siteNav?.querySelector('a[href="#contact"]');

if (siteNav && contactNavLink) {
  const radioStyles = document.createElement('style');
  radioStyles.textContent = `
    .site-header nav{gap:clamp(12px,1.55vw,26px)}
    .ghost-radio-nav{display:inline-flex;align-items:center;gap:7px;color:#f0f0ec!important;white-space:nowrap}
    .ghost-radio-nav:before{content:'';width:7px;height:7px;border-radius:50%;background:var(--red,#bd171e);box-shadow:0 0 12px #bd171e99;flex:0 0 auto}
    .ghost-radio-nav:hover,.ghost-radio-nav:focus-visible{color:#fff!important;outline:none}
    .jgw-radio-shell{width:min(760px,96vw)}
    .jgw-radio-content{padding:clamp(28px,4vw,52px)}
    .jgw-radio-content h2{margin:0 56px 7px 0;font-family:'Bebas Neue',sans-serif;font-size:clamp(2.5rem,5vw,4.8rem);font-weight:400;letter-spacing:.1em;line-height:.9}
    .jgw-radio-tagline{margin:0 0 22px;color:#9a9d9a;font-size:.5rem;letter-spacing:.16em;line-height:1.6}
    .jgw-radio-frame{display:block;width:100%;height:480px;border:0;border-radius:12px;background:#101010}
    .jgw-radio-foot{display:flex;align-items:center;gap:10px;margin-top:16px;color:#8f928f;font-size:.45rem;letter-spacing:.13em;line-height:1.55}
    .jgw-radio-foot:before{content:'';width:8px;height:8px;border-radius:50%;background:#1ed760;box-shadow:0 0 14px #1ed76088;flex:0 0 auto}
    @media(max-width:700px){.jgw-radio-content{padding:22px 14px 16px}.jgw-radio-content h2{font-size:2.3rem}.jgw-radio-frame{height:430px;border-radius:8px}.jgw-radio-tagline,.jgw-radio-foot{font-size:.4rem}}
  `;
  document.head.appendChild(radioStyles);

  const radioLink = document.createElement('a');
  radioLink.className = 'ghost-radio-nav';
  radioLink.href = '#ghost-radio';
  radioLink.textContent = 'GHOST RADIO';
  radioLink.setAttribute('aria-haspopup', 'dialog');
  radioLink.setAttribute('aria-controls', 'jgw-ghost-radio');
  contactNavLink.insertAdjacentElement('afterend', radioLink);

  const radioModal = document.createElement('div');
  radioModal.className = 'jgw-modal';
  radioModal.id = 'jgw-ghost-radio';
  radioModal.hidden = true;
  radioModal.setAttribute('role', 'dialog');
  radioModal.setAttribute('aria-modal', 'true');
  radioModal.setAttribute('aria-labelledby', 'jgw-radio-title');
  radioModal.innerHTML = `
    <div class="jgw-modal-backdrop" data-close-radio></div>
    <div class="jgw-modal-shell jgw-radio-shell">
      <button class="jgw-close" type="button" aria-label="Close Ghost Radio">×</button>
      <div class="jgw-radio-content">
        <div class="jgw-kicker">JAI GHOST WORLD / GHOST RADIO</div>
        <h2 id="jgw-radio-title">GHOST RADIO</h2>
        <p class="jgw-radio-tagline">THE SOUND OF JAI GHOST WORLD.</p>
        <iframe class="jgw-radio-frame" title="Ghost Radio — Jai Loyal on Spotify" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <div class="jgw-radio-foot">POWERED BY JAI LOYAL'S SPOTIFY ARTIST PROFILE.</div>
      </div>
    </div>`;
  document.body.appendChild(radioModal);

  const radioClose = radioModal.querySelector('.jgw-close');
  const radioFrame = radioModal.querySelector('.jgw-radio-frame');
  const artistEmbed = 'https://open.spotify.com/embed/artist/7JYQHRk7T8PvDFIFvsKyZj?utm_source=generator&theme=0';

  const openRadio = event => {
    event?.preventDefault();
    radioFrame.src = artistEmbed;
    if (instrumental) {
      radioModal.dataset.resumeInstrumental = String(!instrumental.paused);
      instrumental.pause();
    }
    radioModal.hidden = false;
    document.body.classList.add('jgw-modal-open');
    if (typeof gtag === 'function') gtag('event', 'ghost_radio_open', { spotify_artist_id: '7JYQHRk7T8PvDFIFvsKyZj' });
    requestAnimationFrame(() => radioClose.focus());
  };

  const closeRadio = () => {
    radioFrame.src = '';
    radioModal.hidden = true;
    document.body.classList.remove('jgw-modal-open');
    if (instrumental && radioModal.dataset.resumeInstrumental === 'true') {
      radioModal.dataset.resumeInstrumental = 'false';
      instrumental.play().catch(() => {});
    }
    radioLink.focus();
  };

  radioLink.addEventListener('click', openRadio);
  radioClose.addEventListener('click', closeRadio);
  radioModal.querySelector('[data-close-radio]').addEventListener('click', closeRadio);
  radioModal.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeRadio();
  });
}
