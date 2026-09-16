/* GHOST RADIO PICKS — curated Jailoyal tracks layered onto the Spotify artist radio */
(() => {
  const radioModal = document.querySelector('#jgw-ghost-radio');
  const radioLink = document.querySelector('.ghost-radio-nav');
  if (!radioModal || !radioLink) return;

  const radioFrame = radioModal.querySelector('.jgw-radio-frame');
  const radioContent = radioModal.querySelector('.jgw-radio-content');
  if (!radioFrame || !radioContent) return;

  const artistEmbed = 'https://open.spotify.com/embed/artist/7JYQHRk7T8PvDFIFvsKyZj?utm_source=generator&theme=0';

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
    .jgw-radio-picker{margin-top:18px;padding-top:18px;border-top:1px solid #272a2a}
    .jgw-radio-picker-head{display:flex;align-items:end;justify-content:space-between;gap:14px;margin-bottom:12px}
    .jgw-radio-picker-head span{color:var(--red,#bd171e);font-size:.42rem;letter-spacing:.18em}
    .jgw-radio-picker-head small{color:#747774;font-size:.38rem;letter-spacing:.12em;text-align:right}
    .jgw-radio-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;overflow:visible}
    .jgw-radio-track{display:flex;align-items:center;gap:10px;min-height:43px;padding:8px 10px;border:1px solid #292c2d;background:#070808;color:#d9dbd8;text-align:left;font:700 .43rem 'Space Mono',monospace;letter-spacing:.08em;line-height:1.3;cursor:pointer;transition:.18s}
    .jgw-radio-track:before{content:'▶';display:grid;place-items:center;width:24px;height:24px;border:1px solid #454849;border-radius:50%;font-size:.34rem;flex:0 0 auto}
    .jgw-radio-track:hover,.jgw-radio-track:focus-visible,.jgw-radio-track.is-active{border-color:var(--red,#bd171e);background:#190708;color:#fff;outline:none}
    .jgw-radio-all{grid-column:1/-1;justify-content:center;color:#fff;background:#0d0f0f}
    .jgw-radio-all:before{content:'●';color:#1ed760;font-size:.5rem;border:0}
    @media(max-width:900px){.jgw-radio-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:700px){.jgw-radio-list{grid-template-columns:1fr}.jgw-radio-picker-head{align-items:start;flex-direction:column}.jgw-radio-picker-head small{text-align:left}.jgw-radio-all{grid-column:auto}}
  `;
  document.head.appendChild(styles);

  const picker = document.createElement('div');
  picker.className = 'jgw-radio-picker';
  picker.innerHTML = `
    <div class="jgw-radio-picker-head">
      <span>GHOST RADIO PICKS</span>
      <small>${ghostRadioTracks.length} TRACKS / SELECT A TRACK / STAY INSIDE THE WORLD</small>
    </div>
    <div class="jgw-radio-list">
      <button class="jgw-radio-track jgw-radio-all is-active" type="button" data-radio-all>ALL JAI LOYAL RELEASES</button>
      ${ghostRadioTracks.map(track => `<button class="jgw-radio-track" type="button" data-radio-track="${track.id}" data-radio-title="${track.title.replace(/"/g, '&quot;')}">${track.title}</button>`).join('')}
    </div>`;

  const foot = radioContent.querySelector('.jgw-radio-foot');
  if (foot) radioContent.insertBefore(picker, foot);
  else radioContent.appendChild(picker);

  const allButton = picker.querySelector('[data-radio-all]');
  const trackButtons = [...picker.querySelectorAll('[data-radio-track]')];

  const setActive = activeButton => {
    picker.querySelectorAll('.jgw-radio-track').forEach(button => button.classList.toggle('is-active', button === activeButton));
  };

  const showArtist = () => {
    radioFrame.src = artistEmbed;
    radioFrame.style.height = window.innerWidth <= 700 ? '430px' : '480px';
    radioFrame.title = 'Ghost Radio — Jai Loyal on Spotify';
    setActive(allButton);
  };

  allButton.addEventListener('click', showArtist);

  trackButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.radioTrack;
      const title = button.dataset.radioTitle;
      if (!id) return;
      radioFrame.src = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
      radioFrame.style.height = '152px';
      radioFrame.title = `${title} — Ghost Radio`;
      setActive(button);
      if (typeof gtag === 'function') gtag('event', 'ghost_radio_track_play', { music_title: title, spotify_id: id });
    });
  });

  radioLink.addEventListener('click', () => {
    requestAnimationFrame(() => {
      setActive(allButton);
      radioFrame.style.height = window.innerWidth <= 700 ? '430px' : '480px';
    });
  });
})();