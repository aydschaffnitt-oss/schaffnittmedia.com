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
function getYouTubeThumbnail(id) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

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
    const card = document.createElement("div");
    card.className = "video-card";
    card.style.animationDelay = `${i * 60}ms`;
    card.innerHTML = `
      <div class="card-thumb" data-id="${video.id}">
        <img
          src="${getYouTubeThumbnail(video.id)}"
          alt="${video.title}"
          loading="lazy"
          onerror="this.src='https://img.youtube.com/vi/${video.id}/hqdefault.jpg'"
        />
        <div class="play-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" stroke="white" stroke-width="1.5"/>
            <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="white"/>
          </svg>
        </div>
      </div>
      <div class="card-info">
        <span class="card-tag">${video.category === "sports" ? "Sports" : "Business"}</span>
        <h3 class="card-title">${video.title}</h3>
        <p class="card-desc">${video.description}</p>
      </div>
    `;
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
function buildHeroBgURL(videoId) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&playsinline=1`;
}

function initHeroVideos() {
  if (!HERO_VIDEOS || HERO_VIDEOS.length === 0) return;

  const slides  = [document.getElementById("hero-slide-0"), document.getElementById("hero-slide-1")];
  const iframes = [document.getElementById("hero-iframe-0"), document.getElementById("hero-iframe-1")];

  let current = 0;
  let next    = 1;
  let index   = 0;

  // Load first video into slot 0
  iframes[0].src = buildHeroBgURL(HERO_VIDEOS[0]);
  slides[0].classList.add("active");

  if (HERO_VIDEOS.length === 1) return; // No cycling needed for a single video

  setInterval(() => {
    index = (index + 1) % HERO_VIDEOS.length;

    // Pre-load next video into the hidden slot
    iframes[next].src = buildHeroBgURL(HERO_VIDEOS[index]);

    // Crossfade
    slides[next].classList.add("active");
    slides[current].classList.remove("active");

    // Swap slots
    [current, next] = [next, current];
  }, (HERO_INTERVAL || 8) * 1000);
}

// ---------- Init ----------
renderVideos();
initHeroVideos();
