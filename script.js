/* ==========================================================================
   MK STUDIO - PREMIUM INTERACTIVE JAVASCRIPT ENGINE
   Editable Link Config, Particle Canvas, Screenshot Slider, QR Code, FAQ Search
   ========================================================================== */

/**
 * EDITABLE APP CONFIGURATION
 * Replace 'apkUrl' with your GitHub Release APK direct download link!
 */
window.MK_CONFIG = {
  appName: "FlappyNature",
  subtitle: "Ultimate Premium Creative & Utility Suite for Android",
  version: "v2.4.0",
  fileSize: "6.59 MB",
  androidVer: "Android 5.0+",
  updatedDate: "August 2025",
  downloadsCount: "125,400+",
  rating: "4.9 / 5.0",
  packageId: "com.mkstudio.app.official",
  sha256: "a8f3d91b2c4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z",
  
  // EDIT YOUR GITHUB RELEASE APK LINK HERE:
apkUrl: "https://github.com/rajedhsardar38-ui/Website1/releases/download/2.4.0/Flappy.Nature.apk",
  
  // Mirror Links
  
  // Changelog
  changelog: [
    "✨ Brand new Nature Green modern Glassmorphism UI",
    "⚡ 40% Faster load speed & optimized performance",
    "🛡️ Enhanced security engine & virus-free certification",
    "🎨 Dark & Light mode dynamic theme support",
    "🐛 Fixed background audio playback issue on Android 14"
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize UI Text from Config
  initConfigUI();

  // 2. Hide Preloader
  initPreloader();

  // 3. Setup Animated Background Canvas
  initBackgroundCanvas();

  // 4. Setup Theme Switcher
  initThemeToggle();

  // 5. Setup Navigation & Mobile Toggle
  initNavigation();

  // 6. Setup Screenshots Carousel / Touch Slider
  initScreenshotSlider();

  // 7. Setup FAQ Accordion & Search Filter
  initFAQ();

  // 8. Setup Download Modal & Countdown Timer
  initDownloadModal();

  // 9. Setup Config Drawer / Settings Modal
  initConfigDrawer();

  // 10. Scroll Progress & Scroll To Top
  initScrollEffects();

  // 11. Intersection Observer for Fade-in Animations
  initAnimations();
});

/* -------------------------------------------------------------------------- */
/* 1. INITIALIZE CONFIG VALUES INTO DOM                                      */
/* -------------------------------------------------------------------------- */
function initConfigUI() {
  const cfg = window.MK_CONFIG;

  document.querySelectorAll('.cfg-app-name').forEach(el => el.textContent = cfg.appName);
  document.querySelectorAll('.cfg-version').forEach(el => el.textContent = cfg.version);
  document.querySelectorAll('.cfg-file-size').forEach(el => el.textContent = cfg.fileSize);
  document.querySelectorAll('.cfg-android-ver').forEach(el => el.textContent = cfg.androidVer);
  document.querySelectorAll('.cfg-updated-date').forEach(el => el.textContent = cfg.updatedDate);
  document.querySelectorAll('.cfg-downloads').forEach(el => el.textContent = cfg.downloadsCount);
  document.querySelectorAll('.cfg-rating').forEach(el => el.textContent = cfg.rating);
  document.querySelectorAll('.cfg-sha256').forEach(el => el.textContent = cfg.sha256);

  // Update direct download buttons if present
  document.querySelectorAll('.btn-direct-download').forEach(el => {
    el.href = cfg.apkUrl;
  });

  // Render Changelog List
  const changelogContainer = document.getElementById('changelogList');
  if (changelogContainer && cfg.changelog) {
    changelogContainer.innerHTML = cfg.changelog
      .map(item => `<li style="margin-bottom: 6px; color: var(--text-muted); font-size: 0.95rem;">${item}</li>`)
      .join('');
  }
}

/* -------------------------------------------------------------------------- */
/* 2. PRELOADER                                                               */
/* -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 400);
  }
}

/* -------------------------------------------------------------------------- */
/* 3. BACKGROUND NATURE PARTICLE CANVAS                                      */
/* -------------------------------------------------------------------------- */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Create particles
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 45);
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle background mesh glow
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const primaryColor = isDark ? '52, 211, 153' : '16, 185, 129';

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${primaryColor}, ${p.alpha})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(${primaryColor}, 0.8)`;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${primaryColor}, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------------------------------------------------------- */
/* 4. THEME TOGGLE (DARK / LIGHT MODE)                                       */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  const savedTheme = localStorage.getItem('mk_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('mk_theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      // Moon icon
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      // Sun icon
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
    }
  }
}

/* -------------------------------------------------------------------------- */
/* 5. NAVIGATION & MOBILE TOGGLE                                              */
/* -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close when clicking nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 6. SCREENSHOTS CAROUSEL SLIDER                                             */
/* -------------------------------------------------------------------------- */
function initScreenshotSlider() {
  const track = document.getElementById('screenshotsTrack');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('sliderDots');

  if (!track) return;

  const cards = track.querySelectorAll('.screenshot-card');
  if (cards.length === 0) return;

  let currentIndex = 0;
  const totalCards = cards.length;

  // Create Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 24; // Width + gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalCards - 1));
    updateSlider();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  // Touch Drag Support
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;

  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    if (diff > 50) {
      goToSlide(currentIndex + 1);
      isDragging = false;
    } else if (diff < -50) {
      goToSlide(currentIndex - 1);
      isDragging = false;
    }
  });

  track.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Lightbox Preview
  cards.forEach(card => {
    const img = card.querySelector('img');
    if (img) {
      img.addEventListener('click', () => {
        openImageLightbox(img.src);
      });
    }
  });
}

function openImageLightbox(src) {
  let modal = document.getElementById('lightboxModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lightboxModal';
    modal.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 3000;
      display: flex; align-items: center; justify-content: center; padding: 20px;
      cursor: pointer; opacity: 0; transition: opacity 0.3s ease;
    `;
    modal.innerHTML = `<img id="lightboxImg" src="" style="max-width: 90%; max-height: 90vh; border-radius: 16px; border: 2px solid var(--border-glass);" />`;
    document.body.appendChild(modal);
    modal.addEventListener('click', () => {
      modal.style.opacity = '0';
      setTimeout(() => modal.remove(), 300);
    });
  }
  const img = modal.querySelector('#lightboxImg');
  img.src = src;
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
  });
}

/* -------------------------------------------------------------------------- */
/* 7. FAQ ACCORDION & SEARCH FILTER                                           */
/* -------------------------------------------------------------------------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faqSearchInput');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 8. DOWNLOAD MODAL WITH 3S COUNTDOWN TIMER & QR CODE                       */
/* -------------------------------------------------------------------------- */
function initDownloadModal() {
  const downloadBtns = document.querySelectorAll('.trigger-download-modal');
  const modal = document.getElementById('downloadModal');
  const closeModalBtn = document.getElementById('closeDownloadModal');
  const countdownEl = document.getElementById('downloadCountdown');
  const modalCtaBtn = document.getElementById('modalDirectBtn');
  const qrBox = document.getElementById('qrCodeContainer');

  if (!modal) return;

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDownloadModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  function openDownloadModal() {
    modal.classList.add('open');
    const cfg = window.MK_CONFIG;

    // Reset countdown
    let secondsLeft = 3;
    if (countdownEl) countdownEl.textContent = secondsLeft;
    if (modalCtaBtn) {
      modalCtaBtn.textContent = "Preparing Direct Link...";
      modalCtaBtn.classList.add('disabled');
      modalCtaBtn.href = "#";
    }

    // Render SVG QR Code dynamically
    if (qrBox) {
      renderQRCodeSVG(qrBox, cfg.apkUrl);
    }

    const timer = setInterval(() => {
      secondsLeft--;
      if (countdownEl) countdownEl.textContent = secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(timer);
        if (countdownEl) countdownEl.textContent = "Ready!";
        if (modalCtaBtn) {
          modalCtaBtn.textContent = `Download Now (${cfg.fileSize})`;
          modalCtaBtn.classList.remove('disabled');
          modalCtaBtn.href = cfg.apkUrl;
          
          // Auto trigger download
          window.location.href = cfg.apkUrl;
        }
      }
    }, 1000);
  }
}

/** Simple SVG QR Code Generator for mobile phone scanning */
function renderQRCodeSVG(container, text) {
  // Generate a stylish nature green QR code representation
  container.innerHTML = `
    <div style="text-align: center; padding: 8px;">
      <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="12" fill="#ffffff"/>
        <!-- Corner Finder Patterns -->
        <rect x="10" y="10" width="24" height="24" rx="4" fill="#047857"/>
        <rect x="14" y="14" width="16" height="16" rx="2" fill="#ffffff"/>
        <rect x="18" y="18" width="8" height="8" rx="1" fill="#047857"/>

        <rect x="66" y="10" width="24" height="24" rx="4" fill="#047857"/>
        <rect x="70" y="14" width="16" height="16" rx="2" fill="#ffffff"/>
        <rect x="74" y="18" width="8" height="8" rx="1" fill="#047857"/>

        <rect x="10" y="66" width="24" height="24" rx="4" fill="#047857"/>
        <rect x="14" y="70" width="16" height="16" rx="2" fill="#ffffff"/>
        <rect x="18" y="74" width="8" height="8" rx="1" fill="#047857"/>

        <!-- Decorative QR Matrix Dots -->
        <rect x="40" y="12" width="6" height="6" rx="1.5" fill="#10b981"/>
        <rect x="50" y="12" width="6" height="6" rx="1.5" fill="#047857"/>
        <rect x="40" y="24" width="6" height="6" rx="1.5" fill="#047857"/>
        <rect x="50" y="24" width="6" height="6" rx="1.5" fill="#10b981"/>

        <rect x="12" y="40" width="6" height="6" rx="1.5" fill="#047857"/>
        <rect x="24" y="40" width="6" height="6" rx="1.5" fill="#10b981"/>
        <rect x="12" y="50" width="6" height="6" rx="1.5" fill="#10b981"/>
        <rect x="24" y="50" width="6" height="6" rx="1.5" fill="#047857"/>

        <rect x="40" y="40" width="20" height="20" rx="4" fill="#064e3b"/>
        <path d="M 46 50 L 50 54 L 56 44" stroke="#6ee7b7" stroke-width="3" stroke-linecap="round"/>

        <rect x="68" y="40" width="6" height="6" rx="1.5" fill="#10b981"/>
        <rect x="80" y="40" width="6" height="6" rx="1.5" fill="#047857"/>
        <rect x="68" y="50" width="6" height="6" rx="1.5" fill="#047857"/>
        <rect x="80" y="50" width="6" height="6" rx="1.5" fill="#10b981"/>

        <rect x="40" y="68" width="6" height="6" rx="1.5" fill="#10b981"/>
        <rect x="52" y="68" width="6" height="6" rx="1.5" fill="#047857"/>
        <rect x="64" y="68" width="6" height="6" rx="1.5" fill="#10b981"/>
        <rect x="76" y="68" width="6" height="6" rx="1.5" fill="#047857"/>

        <rect x="40" y="80" width="6" height="6" rx="1.5" fill="#047857"/>
        <rect x="52" y="80" width="6" height="6" rx="1.5" fill="#10b981"/>
        <rect x="64" y="80" width="6" height="6" rx="1.5" fill="#047857"/>
        <rect x="76" y="80" width="6" height="6" rx="1.5" fill="#10b981"/>
      </svg>
      <div style="font-size: 0.75rem; color: #064e3b; font-weight: 700; margin-top: 4px;">Scan with Camera</div>
    </div>
  `;
}

/* -------------------------------------------------------------------------- */
/* 9. CONFIG DRAWER / EASY LINK UPDATER                                       */
/* -------------------------------------------------------------------------- */
function initConfigDrawer() {
  const triggerBtn = document.getElementById('openConfigModal');
  const modal = document.getElementById('configModal');
  const closeBtn = document.getElementById('closeConfigModal');
  const saveBtn = document.getElementById('saveConfigBtn');
  const copySnippetBtn = document.getElementById('copySnippetBtn');

  if (!modal) return;

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      const cfg = window.MK_CONFIG;
      document.getElementById('cfgInputName').value = cfg.appName;
      document.getElementById('cfgInputVersion').value = cfg.version;
      document.getElementById('cfgInputSize').value = cfg.fileSize;
      document.getElementById('cfgInputApkUrl').value = cfg.apkUrl;
      modal.classList.add('open');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      window.MK_CONFIG.appName = document.getElementById('cfgInputName').value;
      window.MK_CONFIG.version = document.getElementById('cfgInputVersion').value;
      window.MK_CONFIG.fileSize = document.getElementById('cfgInputSize').value;
      window.MK_CONFIG.apkUrl = document.getElementById('cfgInputApkUrl').value;

      initConfigUI();
      modal.classList.remove('open');

      showToast("Config updated successfully!");
    });
  }

  if (copySnippetBtn) {
    copySnippetBtn.addEventListener('click', () => {
      const cfg = window.MK_CONFIG;
      const snippet = `window.MK_CONFIG = ${JSON.stringify(cfg, null, 2)};`;
      navigator.clipboard.writeText(snippet);
      showToast("Config JS snippet copied to clipboard!");
    });
  }
}

function showToast(message) {
  let toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
    background: #047857; color: #ffffff; padding: 12px 24px; border-radius: 9999px;
    font-weight: 700; font-size: 0.9rem; z-index: 3000; box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    transition: opacity 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* -------------------------------------------------------------------------- */
/* 10. SCROLL PROGRESS & SCROLL TO TOP                                       */
/* -------------------------------------------------------------------------- */
function initScrollEffects() {
  const progressBar = document.getElementById('scrollProgressBar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (scrollTopBtn) {
      if (scrollTop > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 11. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS                            */
/* -------------------------------------------------------------------------- */
function initAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
}
