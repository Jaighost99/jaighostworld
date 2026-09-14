const button=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');
if(button&&nav){
  button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false')}));
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
.about-portrait img.about-logo-art{object-fit:contain!important;object-position:center!important;filter:none!important;background:#050505;padding:clamp(8px,1vw,16px)}
@media(max-width:700px){
  .jgw-modal{padding:8px}.jgw-video-content{padding:22px 14px 16px}.jgw-video-content h2{margin-right:42px;font-size:1.7rem}.jgw-close{right:8px;top:8px;width:38px;height:38px}.jgw-gallery-stage{min-height:72vh;padding:54px 12px 70px}.jgw-gallery-nav{top:auto;bottom:12px;transform:none;width:44px;height:44px}.jgw-gallery-prev{left:12px}.jgw-gallery-next{right:12px}.jgw-gallery-caption{left:62px;right:62px;bottom:25px;font-size:.43rem}.jgw-modal-actions{align-items:flex-start;flex-direction:column}
}
`;
document.head.appendChild(enhancementStyles);

const openModal=(modal,focusTarget)=>{modal.hidden=false;document.body.classList.add('jgw-modal-open');requestAnimationFrame(()=>focusTarget?.focus())};
const closeModal=(modal,returnFocus)=>{modal.hidden=true;document.body.classList.remove('jgw-modal-open');returnFocus?.focus()};

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

/* About section artwork */
const aboutArt=document.querySelector('.about-portrait img');
if(aboutArt){
  aboutArt.classList.add('about-logo-art');
  aboutArt.alt='Jai Loyal / Ghost skull artwork';
  aboutArt.src='assets/about-ghost-art.jpg?v=20260914-5';
}
