/* GHOST WORLD EXPERIENCE — progressive enhancements */
(() => {
  'use strict';
  const track = (name, payload = {}) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, payload);
    }
  };

  /* Existing preview player keeps the sound. Decorative wave mirrors real play state. */
  const audio = document.getElementById('site-instrumental');
  const player = document.querySelector('.nightmare-player');
  if (audio && player) {
    const status = player.querySelector('.nightmare-status');
    const sync = () => {
      const playing = !audio.paused && !audio.ended;
      player.classList.toggle('is-playing', playing);
      if (status) status.textContent = playing ? 'NOW PLAYING · NEW MASTER' : 'NEW MASTER · 52-SECOND PREVIEW';
    };
    audio.addEventListener('play', () => {
      sync();
      track('nightmare_preview_play', { track_name: 'FUCK A NIGHTMARE' });
    });
    audio.addEventListener('pause', sync);
    audio.addEventListener('ended', sync);
    audio.addEventListener('error', sync);
    sync();
  }

  /* Defer YouTube until the visitor presses the poster, saving initial load. */
  document.querySelectorAll('.jgw-feature-play').forEach((button) => {
    button.addEventListener('click', () => {
      const videoId = button.dataset.videoId || '';
      const title = button.dataset.videoTitle || 'Music video';
      const frame = button.closest('.premiere-video');
      if (!frame || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) return;
      const embed = document.createElement('iframe');
      embed.title = title + ' — official music video';
      embed.loading = 'eager';
      embed.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      embed.referrerPolicy = 'strict-origin-when-cross-origin';
      embed.allowFullscreen = true;
      embed.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0';
      if (audio && !audio.paused) audio.pause();
      frame.replaceChildren(embed);
      track('featured_video_launch', { video_title: title, youtube_id: videoId });
    }, { once: true });
  });

  /* Site entrance is visual-only until the user's final narration is approved. */
  const intro = document.getElementById('jgw-intro-modal');
  const openButton = document.querySelector('[data-open-ghost-intro]');
  if (intro && openButton) {
    const closeButton = intro.querySelector('.jgw-intro-close');
    const closeIntro = (restoreFocus = true) => {
      intro.hidden = true;
      intro.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('jgw-modal-open');
      if (restoreFocus) openButton.focus();
    };
    openButton.addEventListener('click', () => {
      intro.hidden = false;
      intro.setAttribute('aria-hidden', 'false');
      document.body.classList.add('jgw-modal-open');
      closeButton.focus();
      track('ghost_intro_open', { experience: 'silent_cinematic_entrance' });
    });
    intro.querySelectorAll('[data-close-intro]').forEach((el) => {
      el.addEventListener('click', () => closeIntro());
    });
    intro.querySelectorAll('[data-intro-destination]').forEach((link) => {
      link.addEventListener('click', () => closeIntro(false));
    });
    intro.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeIntro();
      } else if (event.key === 'Tab') {
        const focusables = [...intro.querySelectorAll('button, a[href]')];
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
  }

  /* Lightweight event attribution; never count a submit attempt as a confirmed signup. */
  document.addEventListener('click', (event) => {
    const el = event.target.closest('[data-ghost-event]');
    if (!el) return;
    track(el.dataset.ghostEvent, {
      placement: el.dataset.placement || 'homepage',
      label: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80)
    });
  }, true);
  document.addEventListener('submit', (event) => {
    if (event.target.closest('#join-the-world')) {
      track('newsletter_submit_attempt', { placement: 'after_double_feature' });
    }
  }, true);
  document.querySelectorAll('#merch a[href]').forEach((link) => {
    link.addEventListener('click', () => {
      track('ghost_wear_click', {
        item: (link.querySelector('b')?.textContent || link.querySelector('strong')?.textContent || 'store').trim().slice(0, 80)
      });
    }, { capture: true });
  });

  /* TikTok's heavy third-party embed waits until the feed is near the viewport. */
  const feed = document.querySelector('.ghost-feed-embed .tiktok-embed');
  if (feed) {
    let requested = false;
    const loadFeed = () => {
      if (requested) return;
      requested = true;
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.tiktok.com/embed.js';
      document.body.appendChild(script);
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        loadFeed();
      }, { rootMargin: '300px 0px' });
      observer.observe(feed);
    } else {
      loadFeed();
    }
  }
})();
