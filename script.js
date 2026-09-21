// Google Analytics 4 — Jai Ghost World
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());
gtag('config','G-ZK5H5NNYMW');
const gaScript=document.createElement('script');
gaScript.async=true;
gaScript.src='https://www.googletagmanager.com/gtag/js?id=G-ZK5H5NNYMW';
document.head.appendChild(gaScript);

const button=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');
if(button&&nav){
  button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false')}));
}

// Broadcast control: set the section's data-status to "live" and data-live-src
// to an embeddable stream URL. Offline art remains the automatic fallback.
const liveChannel=document.querySelector('.live-channel');
if(liveChannel){
  const status=liveChannel.dataset.status==='live'?'live':'offline';
  const statusLabel=liveChannel.querySelector('.live-status span');
  const stage=liveChannel.querySelector('#live-stage');
  const liveSrc=liveChannel.dataset.liveSrc?.trim();
  if(statusLabel)statusLabel.textContent=status==='live'?'LIVE NOW':'OFFLINE';
  if(status==='live'&&liveSrc&&stage){
    const embed=document.createElement('iframe');
    embed.className='live-embed';
    embed.src=liveSrc;
    embed.title='Jai Ghost World live broadcast';
    embed.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
    embed.allowFullscreen=true;
    stage.append(embed);
    liveChannel.classList.add('has-live-embed');
  }
}
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();

/* Jai Ghost World cinematic interactions */
const enhancementStyles=document.createElement('style');
enhancementStyles.textContent=`
body.jgw-modal-open{overflow:hidden}
.jgw-modal[hidden]{display:none!important}
.jgw-modal{position:fixed;z-index:1000;inset:0;display:grid;place-items:center;padding:clamp(16px,3vw,40px)}
.jgw-modal-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.92);backdrop-filter:blur(9px)}
.jgw-modal-shell{position:relative;z-index:2;width:min(1120px,96vw);max-height:94vh;overflow:auto;background:linear-gradient(180deg,#0b0c0c,#030404);border:1px solid #333638;box-shadow:0 32px 100px #000}
.jgw-modal-shell:before{content:"";position:absolute;left:0;top:0;width:110px;height:2px;background:var(--red,#bd171e)}
.jgw-close{position:absolute;z-index:4;right:14px;top:12px;width:44px;height:44px;border:1px solid #4b4d4d;background:#050606;color:#fff;font-size:1.7rem;line-height:1;cursor:pointer}
.jgw-close:hover,.jgw-close:focus-visible,.jgw-gallery-nav:hover,.jgw-gallery-nav:focus-visible{border-color:var(--red,#bd171e);background:#741016;outline:none}
.jgw-video-content{padding:clamp(24px,3.2vw,46px)}
.jgw-kicker{color:var(--red,#bd171e);font-size:.58rem;letter-spacing:.22em;margin-bottom:10px}
.jgw-video-content h2{margin:0 56px 20px 0;font-family:'Bebas Neue',sans-serif;font-size:clamp(1.8rem,3.6vw,3.4rem);font-weight:400;letter-spacing:.08em}
.jgw-video-frame{position:relative;aspect-ratio:16/9;background:#000;border:1px solid #2f3233;overflow:hidden}
.jgw-video-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.jgw-modal-actions{display:flex;justify-content:space-between;gap:14px;align-items:center;margin-top:18px;flex-wrap:wrap}
.jgw-youtube-link{display:inline-flex;align-items:center;min-height:44px;padding:11px 18px;border:1px solid var(--red,#bd171e);font-size:.56rem;letter-spacing:.15em}
.jgw-youtube-link:hover,.jgw-youtube-link:focus-visible{background:var(--red,#bd171e)}
.jgw-modal-note{color:#8e9190;font-size:.47rem;letter-spacing:.12em}
.jgw-spotify-shell{width:min(760px,96vw)}
.jgw-spotify-content{padding:clamp(28px,4vw,52px)}
.jgw-spotify-content h2{margin:0 56px 20px 0;font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,4vw,3.8rem);font-weight:400;letter-spacing:.09em;line-height:.96}
.jgw-spotify-frame{width:100%;height:352px;border:0;border-radius:12px;background:#101010;display:block}
.jgw-spotify-note{display:flex;align-items:center;gap:10px;margin-top:16px;color:#9da09d;font-size:.47rem;line-height:1.6;letter-spacing:.12em}
.jgw-spotify-note:before{content:"";width:8px;height:8px;border-radius:50%;background:#1ed760;box-shadow:0 0 14px #1ed76088;flex:0 0 auto}
.bts-strip figure{cursor:zoom-in;position:relative;transition:transform .2s,border-color .2s}
.bts-strip figure:after{content:'VIEW';position:absolute;right:8px;bottom:7px;padding:4px 6px;background:#050606cc;border:1px solid #ffffff38;color:#ddd;font-size:.38rem;letter-spacing:.13em;opacity:0;transition:opacity .2s}
.bts-strip figure:hover,.bts-strip figure:focus-visible{transform:translateY(-3px);border-color:var(--red,#bd171e);outline:none}
.bts-strip figure:hover:after,.bts-strip figure:focus-visible:after{opacity:1}
.jgw-gallery-shell{width:min(1180px,96vw);background:#020303;overflow:hidden}
.jgw-gallery-stage{position:relative;min-height:min(78vh,820px);display:grid;place-items:center;background:#000;padding:22px 76px 58px}
.jgw-gallery-stage img{max-width:100%;max-height:74vh;width:auto;height:auto;object-fit:contain;box-shadow:0 20px 70px #000}
.jgw-gallery-caption{position:absolute;left:24px;right:24px;bottom:18px;text-align:center;color:#c8cac7;font-size:.52rem;letter-spacing:.12em}
.jgw-gallery-nav{position:absolute;z-index:3;top:50%;transform:translateY(-50%);width:46px;height:58px;border:1px solid #4a4d4d;background:#050606d9;color:#fff;font-size:1.45rem;cursor:pointer}
.jgw-gallery-prev{left:16px}.jgw-gallery-next{right:16px}
@media(max-width:700px){
  .jgw-modal{padding:8px}.jgw-video-content,.jgw-spotify-content{padding:22px 14px 16px}.jgw-video-content h2,.jgw-spotify-content h2{margin-right:42px;font-size:1.7rem}.jgw-close{right:8px;top:8px;width:38px;height:38px}.jgw-gallery-stage{min-height:72vh;padding:54px 12px 70px}.jgw-gallery-nav{top:auto;bottom:12px;transform:none;width:44px;height:44px}.jgw-gallery-prev{left:12px}.jgw-gallery-next{right:12px}.jgw-gallery-caption{left:62px;right:62px;bottom:25px;font-size:.43rem}.jgw-modal-actions{align-items:flex-start;flex-direction:column}.jgw-spotify-frame{border-radius:8px}.jgw-spotify-note{font-size:.42rem}
}
`;
document.head.appendChild(enhancementStyles);

const openModal=(modal,focusTarget)=>{modal.hidden=false;document.body.classList.add('jgw-modal-open');requestAnimationFrame(()=>focusTarget?.focus())};
const closeModal=(modal,returnFocus)=>{modal.hidden=true;document.body.classList.remove('jgw-modal-open');returnFocus?.focus()};

/* Spotify music player — keep listeners inside Jai Ghost World */
const spotifyLaunchers=[...document.querySelectorAll('.release-card[href*="open.spotify.com"], .spotify-button[href*="open.spotify.com"]')];
if(spotifyLaunchers.length){
  let spotifyReturnFocus=null;
  const spotifyModal=document.createElement('div');
  spotifyModal.className='jgw-modal';
  spotifyModal.id='jgw-spotify-modal';
  spotifyModal.hidden=true;
  spotifyModal.setAttribute('role','dialog');
  spotifyModal.setAttribute('aria-modal','true');
  spotifyModal.setAttribute('aria-labelledby','jgw-spotify-title');
  spotifyModal.innerHTML=`<div class="jgw-modal-backdrop" data-close-spotify></div><div class="jgw-modal-shell jgw-spotify-shell"><button class="jgw-close" type="button" aria-label="Close music player">×</button><div class="jgw-spotify-content"><div class="jgw-kicker">JAI GHOST WORLD / MUSIC</div><h2 id="jgw-spotify-title">NOW PLAYING</h2><iframe class="jgw-spotify-frame" title="Spotify player" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe><div class="jgw-spotify-note">LISTEN HERE. STAY INSIDE JAI GHOST WORLD.</div></div></div>`;
  document.body.appendChild(spotifyModal);
  const spotifyClose=spotifyModal.querySelector('.jgw-close');
  const spotifyFrame=spotifyModal.querySelector('.jgw-spotify-frame');
  const spotifyTitle=spotifyModal.querySelector('#jgw-spotify-title');
  const instrumental=document.querySelector('#site-instrumental');

  const getSpotifyData=launcher=>{
    try{
      const url=new URL(launcher.href);
      const parts=url.pathname.split('/').filter(Boolean);
      const type=parts[0];
      const id=parts[1];
      if(!['track','album','artist','playlist','episode','show'].includes(type)||!id)return null;
      const cardTitle=launcher.querySelector('.release-meta b')?.textContent?.replace(/\s+/g,' ').trim();
      const title=cardTitle||(type==='artist'?'JAI LOYAL':'NOW PLAYING');
      return{type,id,title};
    }catch{return null}
  };

  const closeSpotify=()=>{
    spotifyFrame.src='';
    closeModal(spotifyModal,spotifyReturnFocus);
    if(instrumental&&spotifyModal.dataset.resumeInstrumental==='true'){
      spotifyModal.dataset.resumeInstrumental='false';
      instrumental.play().catch(()=>{});
    }
  };

  spotifyLaunchers.forEach(launcher=>{
    const data=getSpotifyData(launcher);
    if(!data)return;
    const small=launcher.querySelector('.release-meta small');
    if(small)small.textContent='Play here';
    if(launcher.classList.contains('release-card'))launcher.setAttribute('aria-label',`Play ${data.title} inside Jai Ghost World`);
    if(launcher.classList.contains('spotify-button'))launcher.childNodes[launcher.childNodes.length-1].textContent=' PLAY JAI LOYAL HERE →';
    launcher.addEventListener('click',e=>{
      e.preventDefault();
      spotifyReturnFocus=launcher;
      spotifyTitle.textContent=data.title;
      spotifyFrame.style.height=data.type==='track'?'152px':'352px';
      spotifyFrame.title=`${data.title} Spotify player`;
      spotifyFrame.src=`https://open.spotify.com/embed/${data.type}/${data.id}?utm_source=generator&theme=0`;
      if(instrumental){spotifyModal.dataset.resumeInstrumental=String(!instrumental.paused);instrumental.pause()}
      if(typeof gtag==='function')gtag('event','music_player_open',{music_title:data.title,spotify_type:data.type,spotify_id:data.id});
      openModal(spotifyModal,spotifyClose);
    });
  });

  spotifyClose.addEventListener('click',closeSpotify);
  spotifyModal.querySelector('[data-close-spotify]').addEventListener('click',closeSpotify);
  spotifyModal.addEventListener('keydown',e=>{if(e.key==='Escape')closeSpotify()});
}

/* Music-video modal */
const watchWorld=document.querySelector('.watch-world');
if(watchWorld){
  const videoUrl=watchWorld.href;
  const videoModal=document.createElement('div');
  videoModal.className='jgw-modal';
  videoModal.id='jgw-video-modal';
  videoModal.hidden=true;
  videoModal.setAttribute('role','dialog');
  videoModal.setAttribute('aria-modal','true');
  videoModal.setAttribute('aria-labelledby','jgw-video-title');
  videoModal.innerHTML=`<div class="jgw-modal-backdrop" data-close-video></div><div class="jgw-modal-shell"><button class="jgw-close" type="button" aria-label="Close video">×</button><div class="jgw-video-content"><div class="jgw-kicker">JAI GHOST WORLD / MUSIC VIDEO</div><h2 id="jgw-video-title">I SEEN THROUGH THE DEVIL'S EYES</h2><div class="jgw-video-frame"><iframe title="I Seen Through the Devil's Eyes music video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div><div class="jgw-modal-actions"><span class="jgw-modal-note">SHORT FILMS + DOCUMENTARIES — COMING SOON</span><a class="jgw-youtube-link" href="${videoUrl}" target="_blank" rel="noopener noreferrer">WATCH ON YOUTUBE ↗</a></div></div></div>`;
  document.body.appendChild(videoModal);
  const videoClose=videoModal.querySelector('.jgw-close');
  const videoFrame=videoModal.querySelector('iframe');
  const stopAndClose=()=>{videoFrame.src='';closeModal(videoModal,watchWorld)};
  watchWorld.addEventListener('click',e=>{e.preventDefault();videoFrame.src='https://www.youtube.com/embed/OOTt7VrOcS8?autoplay=1&rel=0&modestbranding=1';openModal(videoModal,videoClose)});
  videoClose.addEventListener('click',stopAndClose);
  videoModal.querySelector('[data-close-video]').addEventListener('click',stopAndClose);
  videoModal.addEventListener('keydown',e=>{if(e.key==='Escape')stopAndClose()});
}

/* Full interview modal */
const pressPlayButtons=[...document.querySelectorAll('[data-press-play]')];
if(pressPlayButtons.length){
  let pressReturnFocus=null;
  const pressVideoUrl='https://youtu.be/0DGCSpeNy8A';
  const pressModal=document.createElement('div');
  pressModal.className='jgw-modal';
  pressModal.id='jgw-press-modal';
  pressModal.hidden=true;
  pressModal.setAttribute('role','dialog');
  pressModal.setAttribute('aria-modal','true');
  pressModal.setAttribute('aria-labelledby','jgw-press-title');
  pressModal.innerHTML=`<div class="jgw-modal-backdrop" data-close-press></div><div class="jgw-modal-shell"><button class="jgw-close" type="button" aria-label="Close interview">×</button><div class="jgw-video-content"><div class="jgw-kicker">NEWS &amp; PRESS / FULL INTERVIEW</div><h2 id="jgw-press-title">THE HELL OF PAIN DEEP DIVE</h2><div class="jgw-video-frame"><iframe title="The Hell of Pain Deep Dive full interview" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div><div class="jgw-modal-actions"><span class="jgw-modal-note">JAI LOYAL &amp; JAI GHOST / THE SOLOMON PAULK SHOW</span><a class="jgw-youtube-link" href="${pressVideoUrl}" target="_blank" rel="noopener noreferrer">WATCH ON YOUTUBE ↗</a></div></div></div>`;
  document.body.appendChild(pressModal);
  const pressClose=pressModal.querySelector('.jgw-close');
  const pressFrame=pressModal.querySelector('iframe');
  const stopAndClosePress=()=>{pressFrame.src='';closeModal(pressModal,pressReturnFocus)};
  pressPlayButtons.forEach(trigger=>trigger.addEventListener('click',()=>{pressReturnFocus=trigger;pressFrame.src='https://www.youtube-nocookie.com/embed/0DGCSpeNy8A?autoplay=1&rel=0&modestbranding=1';openModal(pressModal,pressClose)}));
  pressClose.addEventListener('click',stopAndClosePress);
  pressModal.querySelector('[data-close-press]').addEventListener('click',stopAndClosePress);
  pressModal.addEventListener('keydown',e=>{if(e.key==='Escape')stopAndClosePress()});
}

/* Behind-the-scenes lightbox */
const galleryImages=[...document.querySelectorAll('.bts-strip figure img')];
if(galleryImages.length){
  let galleryIndex=0;
  let galleryReturnFocus=null;
  const galleryModal=document.createElement('div');
  galleryModal.className='jgw-modal';
  galleryModal.id='jgw-gallery-modal';
  galleryModal.hidden=true;
  galleryModal.setAttribute('role','dialog');
  galleryModal.setAttribute('aria-modal','true');
  galleryModal.setAttribute('aria-label','Behind the scenes gallery');
  galleryModal.innerHTML=`<div class="jgw-modal-backdrop" data-close-gallery></div><div class="jgw-modal-shell jgw-gallery-shell"><button class="jgw-close" type="button" aria-label="Close gallery">×</button><div class="jgw-gallery-stage"><button class="jgw-gallery-nav jgw-gallery-prev" type="button" aria-label="Previous image">‹</button><img src="" alt=""><button class="jgw-gallery-nav jgw-gallery-next" type="button" aria-label="Next image">›</button><div class="jgw-gallery-caption"></div></div></div>`;
  document.body.appendChild(galleryModal);
  const galleryMain=galleryModal.querySelector('.jgw-gallery-stage img');
  const galleryCaption=galleryModal.querySelector('.jgw-gallery-caption');
  const galleryClose=galleryModal.querySelector('.jgw-close');
  const renderGallery=()=>{const source=galleryImages[galleryIndex];galleryMain.src=source.currentSrc||source.src;galleryMain.alt=source.alt||'Behind the scenes image';galleryCaption.textContent=`${String(galleryIndex+1).padStart(2,'0')} / ${String(galleryImages.length).padStart(2,'0')} — ${source.alt||'Behind the scenes'}`};
  const moveGallery=delta=>{galleryIndex=(galleryIndex+delta+galleryImages.length)%galleryImages.length;renderGallery()};
  const closeGallery=()=>closeModal(galleryModal,galleryReturnFocus);
  galleryImages.forEach((img,index)=>{const figure=img.closest('figure');if(!figure)return;figure.tabIndex=0;figure.setAttribute('role','button');figure.setAttribute('aria-label',`Open ${img.alt||'behind the scenes image'}`);const launch=()=>{galleryIndex=index;galleryReturnFocus=figure;renderGallery();openModal(galleryModal,galleryClose)};figure.addEventListener('click',launch);figure.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();launch()}})});
  galleryModal.querySelector('.jgw-gallery-prev').addEventListener('click',()=>moveGallery(-1));
  galleryModal.querySelector('.jgw-gallery-next').addEventListener('click',()=>moveGallery(1));
  galleryClose.addEventListener('click',closeGallery);
  galleryModal.querySelector('[data-close-gallery]').addEventListener('click',closeGallery);
  galleryModal.addEventListener('keydown',e=>{if(e.key==='Escape')closeGallery();if(e.key==='ArrowLeft')moveGallery(-1);if(e.key==='ArrowRight')moveGallery(1)});
}


/* THE WRATH preference selector */
(() => {
  const choices = [...document.querySelectorAll('[data-wrath-choice]')];
  if (!choices.length) return;

  const status = document.querySelector('.wrath-vote-status');
  const storageKey = 'jgw-wrath-choice';

  const getLabel = (choice) => {
    const match = choices.find((el) => el.dataset.wrathChoice === choice);
    return match ? (match.dataset.choiceLabel || match.textContent.trim()) : choice;
  };

  const applyChoice = (choice, announce = false) => {
    choices.forEach((el) => {
      const selected = el.dataset.wrathChoice === choice;
      el.classList.toggle('is-selected', selected);
      if (el.classList.contains('wrath-vote')) {
        el.setAttribute('aria-pressed', selected ? 'true' : 'false');
      }
    });

    if (status && choice) {
      const label = getLabel(choice);
      status.textContent = announce
        ? `LOCKED IN ON THIS DEVICE: ${label}. JOIN THE LIST BELOW FOR LAUNCH UPDATES.`
        : `YOUR PICK ON THIS DEVICE: ${label}. JOIN THE LIST BELOW FOR LAUNCH UPDATES.`;
    }
  };

  let saved = '';
  try {
    saved = window.localStorage.getItem(storageKey) || '';
  } catch (error) {
    saved = '';
  }

  if (saved && choices.some((el) => el.dataset.wrathChoice === saved)) {
    applyChoice(saved, false);
  }

  choices.forEach((el) => {
    if (el.classList.contains('wrath-vote')) {
      el.setAttribute('role', 'button');
      el.setAttribute('aria-pressed', el.dataset.wrathChoice === saved ? 'true' : 'false');
    }

    el.addEventListener('click', () => {
      const choice = el.dataset.wrathChoice || '';
      if (!choice) return;
      try {
        window.localStorage.setItem(storageKey, choice);
      } catch (error) {
        // The preference still works for this visit if storage is unavailable.
      }
      applyChoice(choice, true);
    });
  });
})();


/* THE WRATH 21+ AGE GATE */
(() => {
  const section = document.querySelector('.wrath-age-gated');
  const lock = document.getElementById('wrath-age-lock');
  const content = document.getElementById('wrath-adult-content');
  const modal = document.getElementById('wrath-age-modal');
  const form = document.getElementById('wrath-age-form');
  const dob = document.getElementById('wrath-dob');
  const error = document.getElementById('wrath-age-error');
  const openButtons = [...document.querySelectorAll('[data-wrath-age-open]')];
  const closeButtons = [...document.querySelectorAll('[data-wrath-age-close]')];

  if (!section || !lock || !content || !modal || !form || !dob) return;

  const STORAGE_KEY = 'jgw-wrath-21plus';
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  let returnFocus = null;

  const todayLocalISO = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const is21OrOlder = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const birth = new Date(year, month - 1, day);

    if (
      birth.getFullYear() !== year ||
      birth.getMonth() !== month - 1 ||
      birth.getDate() !== day
    ) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cutoff = new Date(today.getFullYear() - 21, today.getMonth(), today.getDate());
    return birth <= cutoff;
  };

  const hasValidVerification = () => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
      return Boolean(
        stored &&
        stored.verified === true &&
        typeof stored.expiresAt === 'number' &&
        Date.now() < stored.expiresAt
      );
    } catch (e) {
      return false;
    }
  };

  const reveal = ({scroll = false} = {}) => {
    lock.hidden = true;
    content.hidden = false;
    content.setAttribute('aria-hidden', 'false');
    section.setAttribute('aria-labelledby', 'wrath-title');
    section.classList.add('is-age-verified');

    if (scroll) {
      window.requestAnimationFrame(() => {
        section.scrollIntoView({behavior:'smooth', block:'start'});
      });
    }
  };

  const conceal = () => {
    lock.hidden = false;
    content.hidden = true;
    content.setAttribute('aria-hidden', 'true');
    section.setAttribute('aria-labelledby', 'wrath-gate-title');
    section.classList.remove('is-age-verified');
  };

  const openModal = (trigger) => {
    returnFocus = trigger || document.activeElement;
    error.textContent = '';
    dob.value = '';
    modal.hidden = false;
    document.body.classList.add('wrath-age-open');
    window.requestAnimationFrame(() => dob.focus());
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove('wrath-age-open');
    error.textContent = '';
    if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus();
  };

  dob.max = todayLocalISO();
  dob.min = '1900-01-01';

  if (hasValidVerification()) {
    reveal();
  } else {
    conceal();
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', () => openModal(button));
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = dob.value;

    if (!value) {
      error.textContent = 'ENTER YOUR DATE OF BIRTH TO CONTINUE.';
      dob.focus();
      return;
    }

    if (!is21OrOlder(value)) {
      error.textContent = 'ACCESS IS LIMITED TO VISITORS AGE 21 OR OLDER.';
      return;
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          verified: true,
          expiresAt: Date.now() + THIRTY_DAYS
        })
      );
    } catch (e) {
      // Verification still applies for this visit if storage is unavailable.
    }

    modal.hidden = true;
    document.body.classList.remove('wrath-age-open');
    reveal({scroll:true});
  });
})();


/* LOYAL LIGHT-SIDE TRANSITION */
(() => {
  const loyal = document.getElementById('loyal');
  const overlay = document.getElementById('loyal-transition-screen');
  const triggers = [...document.querySelectorAll('[data-loyal-enter]')];
  const buddyInterest = [...document.querySelectorAll('[data-buddy-interest]')];

  if (!loyal) return;

  const revealLoyalArt = () => loyal.classList.add('is-revealed');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealLoyalArt();
          observer.disconnect();
        }
      });
    }, {threshold:.18});
    observer.observe(loyal);
  } else {
    revealLoyalArt();
  }

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let transitionRunning = false;

  const enterLoyal = (event) => {
    if (event) event.preventDefault();
    if (transitionRunning) return;

    if (!overlay || reducedMotion) {
      loyal.scrollIntoView({behavior: reducedMotion ? 'auto' : 'smooth', block:'start'});
      revealLoyalArt();
      history.replaceState(null, '', '#loyal');
      return;
    }

    transitionRunning = true;
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.remove('is-exiting');
    overlay.classList.add('is-playing');
    document.body.style.overflow = 'hidden';

    window.setTimeout(() => {
      loyal.scrollIntoView({behavior:'auto', block:'start'});
      revealLoyalArt();
      history.replaceState(null, '', '#loyal');
    }, 900);

    window.setTimeout(() => {
      overlay.classList.add('is-exiting');
    }, 1350);

    window.setTimeout(() => {
      overlay.hidden = true;
      overlay.setAttribute('aria-hidden', 'true');
      overlay.classList.remove('is-playing','is-exiting');
      document.body.style.overflow = '';
      transitionRunning = false;
    }, 1925);
  };

  triggers.forEach((trigger) => trigger.addEventListener('click', enterLoyal));

  buddyInterest.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      try {
        window.localStorage.setItem('jgw-loyal-interest', 'buddys-adventures');
      } catch (e) {
        // The page still works if local storage is unavailable.
      }
    });
  });

  if (window.location.hash === '#loyal') {
    window.requestAnimationFrame(revealLoyalArt);
  }
})();
