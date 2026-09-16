/* GHOST RADIO PICKS — curated Jailoyal tracks with one-click Spotify playback */
(() => {
  const radioModal = document.querySelector('#jgw-ghost-radio');
  const radioLink = document.querySelector('.ghost-radio-nav');
  if (!radioModal || !radioLink) return;

  const legacyFrame = radioModal.querySelector('.jgw-radio-frame');
  const radioContent = radioModal.querySelector('.jgw-radio-content');
  if (!legacyFrame || !radioContent) return;

  const artistUri = 'spotify:artist:7JYQHRk7T8PvDFIFvsKyZj';

  const ghostRadioTracks = [
    { id: '2xGcJvZ2r7tfbiNhYbzMlf', title: 'HELL OF PAIN' },
    { id: '1z708QcdhWh9Xv6w0SJK4P', title: "I SEEN THROUGH THE DEVIL'S EYES" },
    { id: '5Jt4Vc5hFzMMMkN3vNSnEM', title: 'I SEEN THE DEVIL PANIC' },
    { id: '2YsZGOIhn8T0TjaC2YbJmo', title: "WHISPERS DON'T SLEEP" },
    { id: '7kkwherbw13AuOMyMv55Yh', title: 'WIDE OPEN' },
    { id: '6pf5Bj49hE2BQ6abyP7Bc1', title: 'BLACK OUT' },
    { id: '4cBmS2rSHSSRyi7RoWxOz3', title: 'NEVER LEFT' },
    { id: '38T0M8HEt1Z8iqYcT9qNNQ', title: 'REDBULL' },
    { id: '4AlA4nHUnjxGR77gHPANpx', title: 'WELCOME HOME (FEAT. JD GREER)' },
    { id: '6wTln7bepfbX8SOvbPZkSY', title: 'TRYIN 2 TAKE ME DOWN' },
    { id: '2jw2cltpP1hVmUuC67lrYF', title: 'STRUGGLE WITH THAT' },
    { id: '3yeNIVmNXucb34TdfHIoCU', title: "WHAT'S REAL" },
    { id: '3RKFPOuwHCDV0qhy0NRykA', title: 'NOBODY TESTING US NOW' }
  ];

  const styles = document.createElement('style');
  styles.textContent = `
    .jgw-radio-picker{margin-top:4px;padding-top:14px;border-top:1px solid #272a2a}
    .jgw-radio-picker-head{display:flex;align-items:end;justify-content:space-between;gap:14px;margin-bottom:12px}
    .jgw-radio-picker-head span{color:var(--red,#bd171e);font-size:.42rem;letter-spacing:.18em}
    .jgw-radio-picker-head small{color:#747774;font-size:.38rem;letter-spacing:.12em;text-align:right}
    .jgw-radio-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;overflow:visible}
    .jgw-radio-track{display:flex;align-items:center;gap:10px;min-height:43px;padding:8px 10px;border:1px solid #292c2d;background:#070808;color:#d9dbd8;text-align:left;font:700 .43rem 'Space Mono',monospace;letter-spacing:.08em;line-height:1.3;cursor:pointer;transition:.18s}
    .jgw-radio-track:before{content:'▶';display:grid;place-items:center;width:24px;height:24px;border:1px solid #454849;border-radius:50%;font-size:.34rem;flex:0 0 auto}
    .jgw-radio-track:hover,.jgw-radio-track:focus-visible,.jgw-radio-track.is-active{border-color:var(--red,#bd171e);background:#190708;color:#fff;outline:none}
    .jgw-radio-track.is-loading:before{content:'…'}
    .jgw-radio-all{grid-column:1/-1;justify-content:center;color:#fff;background:#0d0f0f}
    .jgw-radio-all:before{content:'●';color:#1ed760;font-size:.5rem;border:0}
    .jgw-radio-player[hidden]{display:none!important}
    .jgw-radio-player{margin-top:16px;width:100%;min-height:152px}
    .jgw-radio-player iframe{display:block;width:100%!important;height:152px;border:0;border-radius:12px;background:#101010}
    .jgw-radio-player.is-artist iframe{height:352px}
    @media(max-width:900px){.jgw-radio-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:700px){.jgw-radio-list{grid-template-columns:1fr}.jgw-radio-picker-head{align-items:start;flex-direction:column}.jgw-radio-picker-head small{text-align:left}.jgw-radio-all{grid-column:auto}.jgw-radio-player iframe{border-radius:8px}.jgw-radio-player.is-artist iframe{height:430px}}
  `;
  document.head.appendChild(styles);

  const player = document.createElement('div');
  player.className = 'jgw-radio-player';
  player.hidden = true;
  const embedMount = document.createElement('div');
  embedMount.id = 'jgw-radio-embed';
  player.appendChild(embedMount);
  legacyFrame.replaceWith(player);

  const picker = document.createElement('div');
  picker.className = 'jgw-radio-picker';
  picker.innerHTML = `
    <div class="jgw-radio-picker-head">
      <span>GHOST RADIO PICKS</span>
      <small>${ghostRadioTracks.length} CURATED TRACKS / ONE CLICK TO PLAY</small>
    </div>
    <div class="jgw-radio-list">
      <button class="jgw-radio-track jgw-radio-all" type="button" data-radio-all>ALL JAI LOYAL RELEASES</button>
      ${ghostRadioTracks.map(track => `<button class="jgw-radio-track" type="button" data-radio-track="${track.id}" data-radio-title="${track.title.replace(/"/g, '&quot;')}">${track.title}</button>`).join('')}
    </div>`;

  const foot = radioContent.querySelector('.jgw-radio-foot');
  radioContent.insertBefore(picker, player);
  if (foot) radioContent.insertBefore(player, foot);

  const allButton = picker.querySelector('[data-radio-all]');
  const trackButtons = [...picker.querySelectorAll('[data-radio-track]')];
  let controller = null;
  let pendingSelection = null;

  const setActive = activeButton => {
    picker.querySelectorAll('.jgw-radio-track').forEach(button => {
      button.classList.toggle('is-active', button === activeButton);
      if (button !== activeButton) button.classList.remove('is-loading');
    });
  };

  const revealPlayer = (artist = false) => {
    player.hidden = false;
    player.classList.toggle('is-artist', artist);
    requestAnimationFrame(() => player.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  };

  const playSelection = selection => {
    if (!controller || !selection) return false;
    const { uri, title, button, artist } = selection;
    setActive(button);
    button?.classList.add('is-loading');
    revealPlayer(artist);
    controller.loadEntity(uri, false, 0);
    if (!artist) {
      // The track button itself is the user gesture. Start playback immediately.
      controller.play();
      setTimeout(() => controller?.play(), 180);
    }
    setTimeout(() => button?.classList.remove('is-loading'), 700);
    if (!artist && typeof gtag === 'function') {
      gtag('event', 'ghost_radio_track_play', {
        music_title: title,
        spotify_id: uri.replace('spotify:track:', '')
      });
    }
    return true;
  };

  const queueOrPlay = selection => {
    pendingSelection = selection;
    if (playSelection(selection)) pendingSelection = null;
  };

  allButton.addEventListener('click', () => {
    queueOrPlay({ uri: artistUri, title: 'ALL JAI LOYAL RELEASES', button: allButton, artist: true });
  });

  trackButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.radioTrack;
      const title = button.dataset.radioTitle;
      if (!id) return;
      queueOrPlay({ uri: `spotify:track:${id}`, title, button, artist: false });
    });
  });

  const previousSpotifyReady = window.onSpotifyIframeApiReady;
  window.onSpotifyIframeApiReady = IFrameAPI => {
    if (typeof previousSpotifyReady === 'function') previousSpotifyReady(IFrameAPI);
    IFrameAPI.createController(
      embedMount,
      { width: '100%', height: 152, uri: artistUri, theme: 'dark' },
      EmbedController => {
        controller = EmbedController;
        controller.addListener('playback_started', () => {
          picker.querySelectorAll('.jgw-radio-track').forEach(button => button.classList.remove('is-loading'));
        });
        if (pendingSelection) {
          const queued = pendingSelection;
          pendingSelection = null;
          playSelection(queued);
        }
      }
    );
  };

  if (!document.querySelector('script[data-jgw-spotify-iframe-api]')) {
    const apiScript = document.createElement('script');
    apiScript.src = 'https://open.spotify.com/embed/iframe-api/v1';
    apiScript.async = true;
    apiScript.dataset.jgwSpotifyIframeApi = 'true';
    document.body.appendChild(apiScript);
  }

  const resetRadio = () => {
    controller?.pause();
    player.hidden = true;
    player.classList.remove('is-artist');
    setActive(null);
    pendingSelection = null;
  };

  radioLink.addEventListener('click', () => requestAnimationFrame(resetRadio));
  radioModal.querySelector('.jgw-close')?.addEventListener('click', resetRadio);
  radioModal.querySelector('[data-close-radio]')?.addEventListener('click', resetRadio);
  radioModal.addEventListener('keydown', event => {
    if (event.key === 'Escape') resetRadio();
  });
})();