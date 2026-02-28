/* =====================================================
   SOFTBERT NEXUS — Main Site JS
   Reads content from localStorage (falls back to defaults)
   ===================================================== */

// SVG icon map
const ICONS = {
  code: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  layers: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  compass: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  shield: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
};

// ── DOM Helpers ──
function el(id) { return document.getElementById(id); }
function setText(id, text) {
  const node = el(id);
  if (node) node.textContent = text;
}

// ── Render site from content object ──
function renderSite(c) {
  // Nav
  setText("nav-logo", c.nav.logo);
  setText("footer-logo", c.nav.logo);

  // Hero
  setText("hero-badge",           c.hero.badge);
  setText("hero-title",           c.hero.title);
  setText("hero-title-highlight", c.hero.titleHighlight);
  setText("hero-subtitle",        c.hero.subtitle);

  const ctaPrimary = el("hero-cta-primary");
  if (ctaPrimary) ctaPrimary.textContent = c.hero.ctaPrimary;

  const ctaSecondary = el("hero-cta-secondary");
  if (ctaSecondary) ctaSecondary.textContent = c.hero.ctaSecondary;

  // Services heading
  setText("services-label",   c.services.heading);
  const sHead = el("services-heading");
  if (sHead) {
    const parts = c.services.subheading.split(".");
    sHead.innerHTML = parts[0].trim() + (parts[1] ? `.<br /><span class="gradient-text">${parts.slice(1).join(".").trim()}</span>` : "");
  }

  // Services grid
  const grid = el("services-grid");
  if (grid) {
    grid.innerHTML = c.services.items.map((item, i) => `
      <div class="service-card fade-in-up stagger" style="--i:${i}">
        <div class="service-card__icon">${ICONS[item.icon] || ICONS.code}</div>
        <h3 class="service-card__title">${escHtml(item.title)}</h3>
        <p class="service-card__description">${escHtml(item.description)}</p>
        <div class="service-card__tags">
          ${item.tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  // About
  setText("about-label",   c.about.heading);
  const aHead = el("about-heading");
  if (aHead) {
    const parts = c.about.subheading.split(".");
    aHead.innerHTML = parts[0].trim() + (parts[1] ? `.<br /><span class="gradient-text">${parts.slice(1).join(".").trim()}</span>` : "");
  }
  setText("about-body", c.about.body);

  // Stats
  const statsGrid = el("stats-grid");
  if (statsGrid) {
    statsGrid.innerHTML = c.about.stats.map(s => `
      <div class="stat-card fade-in-up">
        <div class="stat-card__value">${escHtml(s.value)}</div>
        <div class="stat-card__label">${escHtml(s.label)}</div>
      </div>
    `).join("");
  }

  // Values
  const valuesGrid = el("values-grid");
  if (valuesGrid) {
    valuesGrid.innerHTML = c.about.values.map(v => `
      <div class="value-item fade-in-up">
        <div class="value-item__icon">${ICONS[v.icon] || ICONS.zap}</div>
        <div>
          <div class="value-item__title">${escHtml(v.title)}</div>
          <div class="value-item__text">${escHtml(v.text)}</div>
        </div>
      </div>
    `).join("");
  }

  // Contact
  setText("contact-heading",    c.contact.heading);
  setText("contact-subheading", c.contact.subheading);
  setText("contact-email",      c.contact.email);
  setText("contact-phone",      c.contact.phone);
  setText("contact-address",    c.contact.address);

  const fl = c.contact.formLabels;
  setText("label-name",    fl.name);
  setText("label-email",   fl.email);
  setText("label-subject", fl.subject);
  setText("label-message", fl.message);
  const submitBtn = el("form-submit");
  if (submitBtn) submitBtn.textContent = fl.submit;

  // Footer
  setText("footer-tagline",   c.footer.tagline);
  setText("footer-copyright", c.footer.copyright);
}

// ── Escape HTML ──
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Theme Toggle ──
function initTheme() {
  const saved = localStorage.getItem("sn_theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);

  const btn = el("themeToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sn_theme", next);
  });
}

// ── Navbar scroll effect ──
function initNavbar() {
  const navbar = el("navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    navbar.style.boxShadow = window.scrollY > 10 ? "0 2px 24px rgba(0,0,0,0.3)" : "none";
  }, { passive: true });
}

// ── Mobile menu ──
function initMobileMenu() {
  const btn  = el("hamburger");
  const menu = el("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    btn.classList.toggle("is-open");
    menu.classList.toggle("is-open");
  });

  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      btn.classList.remove("is-open");
      menu.classList.remove("is-open");
    });
  });
}

// ── Scroll animations ──
function initScrollAnimations() {
  const targets = document.querySelectorAll(".fade-in-up");
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(t => observer.observe(t));
}

// ── Contact form (front-end only) ──
function initContactForm() {
  const form     = el("contactForm");
  const feedback = el("form-feedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name    = form.querySelector("#form-name").value.trim();
    const email   = form.querySelector("#form-email").value.trim();
    const message = form.querySelector("#form-message").value.trim();

    if (!name || !email || !message) {
      feedback.textContent = "Please fill in all required fields.";
      feedback.className = "form-feedback error";
      return;
    }

    // Simulate submission
    const btn = el("form-submit");
    if (btn) { btn.textContent = "Sending…"; btn.disabled = true; }

    setTimeout(() => {
      feedback.textContent = "Message sent! We'll get back to you soon.";
      feedback.className = "form-feedback success";
      form.reset();
      if (btn) { btn.textContent = "Send Message"; btn.disabled = false; }
    }, 1200);
  });
}

// ── Observe dynamically rendered fade-in elements ──
function observeNewElements() {
  const allFade = document.querySelectorAll(".fade-in-up:not(.is-observed)");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

  allFade.forEach(t => {
    t.classList.add("is-observed");
    observer.observe(t);
  });
}

// ── Boot ──
document.addEventListener("DOMContentLoaded", () => {
  const content = loadContent();
  renderSite(content);

  initTheme();
  initNavbar();
  initMobileMenu();
  initContactForm();

  // Give DOM time to render then observe
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initScrollAnimations();
      observeNewElements();
    });
  });
});
