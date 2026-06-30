// ============================================================
//  MAIN SITE LOGIC
// ============================================================

const state = { activeFilter: "all" };

// ---------- Navigation ----------
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    // Close mobile menu if open
    navLinks.classList.remove("open");
  });
});

// Mobile hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));

// ---------- Hero Entrance Animation ----------
function animateHero() {
  const title    = document.querySelector('.hero-title');
  const hero     = document.querySelector('#hero');
  const words    = document.querySelectorAll('.word-inner');

  // Stagger each word
  words.forEach((el, i) => {
    el.style.transitionDelay = `${0.3 + i * 0.13}s`;
  });

  // Trigger animations
  setTimeout(() => {
    if (title) title.classList.add('animate');
    if (hero)  hero.classList.add('hero-loaded');
  }, 80);
}

// ---------- Hero Parallax ----------
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
  if (!heroContent || window.scrollY >= window.innerHeight) return;
  const progress = window.scrollY / window.innerHeight;
  heroContent.style.transform = `translateY(${window.scrollY * 0.22}px)`;
  heroContent.style.opacity   = Math.max(0, 1 - progress * 1.6).toFixed(3);
}, { passive: true });

// ---------- Filter Tabs ----------
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.activeFilter = btn.dataset.filter;
    renderVideos();
  });
});

// ---------- Render Video Grid ----------
// Try thumbnails from highest to lowest resolution. maxresdefault (1280x720)
// only exists if the uploader's source video was HD; if it 404s we step
// down through progressively safer (always-available) sizes.
const THUMBNAIL_QUALITIES = ["maxresdefault", "sddefault", "hqdefault", "mqdefault"];

function getYouTubeThumbnail(id, qualityIndex = 0) {
  return `https://img.youtube.com/vi/${id}/${THUMBNAIL_QUALITIES[qualityIndex]}.jpg`;
}

function handleThumbnailError(img, videoId) {
  const nextIndex = parseInt(img.dataset.qualityIndex || "0", 10) + 1;
  if (nextIndex >= THUMBNAIL_QUALITIES.length) return; // already on the last fallback
  img.dataset.qualityIndex = nextIndex;
  img.src = getYouTubeThumbnail(videoId, nextIndex);
}

const CATEGORY_LABELS = {
  sports: "Sports",
  business: "Business",
  personal: "Personal",
};

function renderVideos() {
  const grid = document.getElementById("video-grid");
  const filtered =
    state.activeFilter === "all"
      ? VIDEOS
      : VIDEOS.filter((v) => v.category === state.activeFilter);

  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="empty-state">No videos here yet — check back soon.</p>`;
    return;
  }

  filtered.forEach((video, i) => {
    const isFeatured = i === 0;
    const card = document.createElement("div");
    card.className = isFeatured ? "video-card featured" : "video-card";
    card.style.animationDelay = `${i * 70}ms`;

    const thumbHTML = `
      <div class="card-thumb" data-id="${video.id}">
        <img
          src="${getYouTubeThumbnail(video.id)}"
          alt="${video.title}"
          loading="lazy"
          data-quality-index="0"
        />
        <div class="play-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" stroke="white" stroke-width="1.5"/>
            <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="white"/>
          </svg>
        </div>
      </div>
    `;

    const infoHTML = `
      <div class="card-info">
        ${isFeatured ? '<span class="featured-label">Featured Work</span>' : ''}
        <span class="card-tag">${CATEGORY_LABELS[video.category] || video.category}</span>
        <h3 class="card-title">${video.title}</h3>
        <p class="card-desc">${video.description}</p>
      </div>
    `;

    card.innerHTML = thumbHTML + infoHTML;
    const thumbImg = card.querySelector(".card-thumb img");
    thumbImg.addEventListener("error", () => handleThumbnailError(thumbImg, video.id));
    card.querySelector(".card-thumb").addEventListener("click", () =>
      openModal(video.id, video.title)
    );
    grid.appendChild(card);
  });

  // Trigger animation
  requestAnimationFrame(() => {
    document.querySelectorAll(".video-card").forEach((c) => c.classList.add("visible"));
  });
}

// ---------- Modal ----------
const modal = document.getElementById("video-modal");
const modalIframe = document.getElementById("modal-iframe");
const modalClose = document.getElementById("modal-close");
const modalTitle = document.getElementById("modal-title");

function openModal(videoId, title) {
  modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  modalTitle.textContent = title;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modalIframe.src = "";
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ---------- Scroll Reveal ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Hero Background Video Cycling ----------
function initHeroVideos(clips) {
  if (!clips || clips.length === 0) return;

  const slides = [document.getElementById("hero-slide-0"), document.getElementById("hero-slide-1")];
  const videos = [document.getElementById("hero-video-0"), document.getElementById("hero-video-1")];

  let currentSlot = 0;
  let clipIndex   = 0;
  const FADE_MS   = 1200; // must match CSS transition duration

  // Buffer a clip into a slot without playing it
  function preloadSlot(slot, idx) {
    const v = videos[slot];
    v.src = clips[idx];
    v.load();
  }

  function advance() {
    const nextSlot      = 1 - currentSlot;
    const nextClipIndex = (clipIndex + 1) % clips.length;

    // Always start the next clip from the very beginning
    videos[nextSlot].currentTime = 0;
    videos[nextSlot].play().catch(() => {});

    // Crossfade
    slides[nextSlot].classList.add("active");
    slides[currentSlot].classList.remove("active");

    const prevSlot = currentSlot;

    // Update state
    currentSlot = nextSlot;
    clipIndex   = nextClipIndex;

    // Listen for end of the now-playing clip
    videos[currentSlot].addEventListener("ended", advance, { once: true });

    // Wait for the fade to fully complete before touching the old slot —
    // this prevents any flash or ghost frame during the transition
    setTimeout(() => {
      videos[prevSlot].pause();
      videos[prevSlot].removeAttribute("src");
      videos[prevSlot].load(); // release memory

      // Now safe to preload the next-next clip into the idle slot
      preloadSlot(prevSlot, (clipIndex + 1) % clips.length);
    }, FADE_MS);
  }

  // Load and play first clip
  videos[0].src = clips[0];
  videos[0].currentTime = 0;
  videos[0].play().catch(() => {});
  slides[0].classList.add("active");

  if (clips.length === 1) {
    videos[0].loop = true;
    return;
  }

  // Listen for end of first clip
  videos[0].addEventListener("ended", advance, { once: true });

  // Immediately preload the second clip so it's ready
  preloadSlot(1, 1 % clips.length);
}

// ---------- Marquee (JS-driven, pixel-perfect loop) ----------
(function () {
  const track = document.querySelector('.marquee-track');
  if (!track) return;

  const SPEED = 52; // px per second
  let loopWidth = 0;
  let x = 0;
  let last = null;

  function tick(ts) {
    if (last !== null) {
      const dt = Math.min(ts - last, 50); // cap so tab-resume doesn't jump
      x -= SPEED * (dt / 1000);
      if (x <= -loopWidth) x += loopWidth;
      track.style.transform = `translateX(${x}px)`;
    }
    last = ts;
    requestAnimationFrame(tick);
  }

  document.fonts.ready.then(() => {
    const original = track.children[0];
    loopWidth = original.offsetWidth;
    if (!loopWidth) return;

    // Calculate how many copies fill 3× the viewport, then add them.
    // (Can't use track.offsetWidth in a while-loop — the parent clips
    //  it to viewport width, causing an infinite loop.)
    const copiesNeeded = Math.ceil((window.innerWidth * 3) / loopWidth);
    const existing = track.children.length;
    for (let i = existing; i < copiesNeeded; i++) {
      track.appendChild(original.cloneNode(true));
    }

    requestAnimationFrame(tick);
  });
})();

// ---------- Scroll Progress ----------
const scrollProgressEl = document.querySelector('.scroll-progress');
if (scrollProgressEl) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgressEl.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }, { passive: true });
}

// ---------- Stat Counter Animation ----------
(function () {
  const statsEl = document.querySelector('.about-stats');
  if (!statsEl) return;

  let triggered = false;

  function countUp(el, target, suffix, duration) {
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      el.textContent = Math.round(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || triggered) return;
    triggered = true;
    statsEl.querySelectorAll('.stat-number[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      countUp(el, target, suffix, 1400);
    });
    observer.disconnect();
  }, { threshold: 0.35 });

  observer.observe(statsEl);
})();

// ---------- Init ----------
animateHero();
renderVideos();

// On mobile, use only 3 random clips to save data (already shuffled)
// On desktop, use the full list
const heroClips = window.innerWidth <= 768
  ? HERO_VIDEOS.slice(0, 3)
  : HERO_VIDEOS;

initHeroVideos(heroClips);
