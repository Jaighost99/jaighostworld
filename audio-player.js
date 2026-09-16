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

/* Music Video Vault — browse and watch without leaving Jai Ghost World */
const videoVaultLauncher = document.querySelector('.visual-copy .outline-button[href*="youtube"]');
const featuredVideoLauncher = document.querySelector('.watch-world');

if (videoVaultLauncher && featuredVideoLauncher) {
  videoVaultLauncher.textContent = 'EXPLORE MUSIC VIDEOS →';
  videoVaultLauncher.href = '#video-vault';
  videoVaultLauncher.removeAttribute('target');
  videoVaultLauncher.removeAttribute('rel');
  videoVaultLauncher.setAttribute('aria-haspopup', 'dialog');
  videoVaultLauncher.setAttribute('aria-controls', 'jgw-video-vault');

  const vaultStyles = document.createElement('style');
  vaultStyles.textContent = `
    .jgw-vault-shell{width:min(980px,96vw)}
    .jgw-vault-content{padding:clamp(26px,4vw,48px)}
    .jgw-vault-content h2{margin:0 56px 8px 0;font-family:'Bebas Neue',sans-serif;font-size:clamp(2.2rem,5vw,4.7rem);font-weight:400;letter-spacing:.1em;line-height:.9}
    .jgw-vault-intro{margin:0 0 24px;color:#929592;font-size:.5rem;line-height:1.7;letter-spacing:.1em}
    .jgw-vault-grid{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(210px,.5fr);gap:18px}
    .jgw-vault-card{position:relative;min-width:0;padding:0;border:1px solid #353839;background:#040505;color:#fff;text-align:left;font:inherit;cursor:pointer;overflow:hidden}
    .jgw-vault-card img{width:100%;aspect-ratio:16/9;object-fit:cover;filter:grayscale(.5) contrast(1.2) brightness(.68);transition:transform .25s,filter .25s}
    .jgw-vault-card:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,#020303ed 0,transparent 56%);pointer-events:none}
    .jgw-vault-card:hover,.jgw-vault-card:focus-visible{border-color:var(--red,#bd171e);outline:none}
    .jgw-vault-card:hover img,.jgw-vault-card:focus-visible img{transform:scale(1.025);filter:grayscale(.15) contrast(1.15) brightness(.8)}
    .jgw-vault-play{position:absolute;z-index:2;left:18px;bottom:18px;display:flex;align-items:center;gap:13px}
    .jgw-vault-play b{width:42px;height:42px;display:grid;place-items:center;border:1px solid #eee;border-radius:50%;font-size:.62rem}
    .jgw-vault-play strong{display:block;font-size:.58rem;letter-spacing:.13em}
    .jgw-vault-play small{display:block;margin-top:5px;color:#b1b3b0;font-size:.42rem;letter-spacing:.11em}
    .jgw-vault-coming{display:flex;min-height:100%;flex-direction:column;justify-content:flex-end;padding:22px;border:1px solid #2d3031;background:radial-gradient(circle at 50% 20%,#31080a,transparent 42%),#050606}
    .jgw-vault-coming span{color:var(--red,#bd171e);font-size:.44rem;letter-spacing:.2em}
    .jgw-vault-coming strong{margin-top:8px;font-family:'Bebas Neue',sans-serif;font-size:2rem;font-weight:400;line-height:.92;letter-spacing:.1em}
    .jgw-vault-coming p{margin:12px 0 0;color:#8f9290;font-size:.45rem;line-height:1.6}
    @media(max-width:700px){.jgw-vault-content{padding:22px 14px 16px}.jgw-vault-content h2{font-size:2rem}.jgw-vault-grid{grid-template-columns:1fr}.jgw-vault-coming{min-height:180px}.jgw-vault-play{left:12px;bottom:12px}.jgw-vault-play strong{font-size:.48rem}}
  `;
  document.head.appendChild(vaultStyles);

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
        <div class="jgw-kicker">JAI GHOST WORLD / VIDEO VAULT</div>
        <h2 id="jgw-vault-title">MUSIC VIDEOS</h2>
        <p class="jgw-vault-intro">WATCH INSIDE THE WORLD. NEW VISUALS WILL DROP INTO THIS VAULT AS THEY ARRIVE.</p>
        <div class="jgw-vault-grid">
          <button class="jgw-vault-card" type="button" data-vault-play aria-label="Play I Seen Through the Devil's Eyes">
            <img src="assets/hero-world.png" alt="I Seen Through the Devil's Eyes music video" loading="lazy" decoding="async">
            <span class="jgw-vault-play"><b aria-hidden="true">▶</b><span><strong>I SEEN THROUGH THE DEVIL'S EYES</strong><small>PLAY INSIDE JAI GHOST WORLD</small></span></span>
          </button>
          <div class="jgw-vault-coming" aria-label="More music videos coming soon">
            <span>NEXT TRANSMISSION</span>
            <strong>MORE VISUALS<br>COMING SOON</strong>
            <p>The vault is built. Future music videos can be added here without sending viewers away from Jai Ghost World.</p>
          </div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(vaultModal);

  const vaultClose = vaultModal.querySelector('.jgw-close');
  const vaultPlay = vaultModal.querySelector('[data-vault-play]');

  const openVault = () => {
    vaultModal.hidden = false;
    document.body.classList.add('jgw-modal-open');
    if (typeof gtag === 'function') gtag('event', 'video_vault_open');
    requestAnimationFrame(() => vaultClose.focus());
  };

  const closeVault = (restoreFocus = true) => {
    vaultModal.hidden = true;
    document.body.classList.remove('jgw-modal-open');
    if (restoreFocus) videoVaultLauncher.focus();
  };

  videoVaultLauncher.addEventListener('click', event => {
    event.preventDefault();
    openVault();
  });

  vaultPlay.addEventListener('click', () => {
    if (typeof gtag === 'function') gtag('event', 'video_vault_play', { video_title: "I Seen Through the Devil's Eyes" });
    closeVault(false);
    requestAnimationFrame(() => featuredVideoLauncher.click());
  });

  vaultClose.addEventListener('click', () => closeVault());
  vaultModal.querySelector('[data-close-vault]').addEventListener('click', () => closeVault());
  vaultModal.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeVault();
  });
}
