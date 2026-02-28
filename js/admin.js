/* =====================================================
   SOFTBERT NEXUS — Admin Panel JS
   Password-protected, localStorage-backed CMS
   ===================================================== */

const ADMIN_PW_KEY  = "sn_admin_pw";
const ADMIN_SES_KEY = "sn_admin_session";
const DEFAULT_PW    = "softbert2024";

// ── Helpers ──
function el(id) { return document.getElementById(id); }
function val(id) { const e = el(id); return e ? e.value : ""; }
function setVal(id, v) { const e = el(id); if (e) e.value = v || ""; }
function getStoredPw() { return localStorage.getItem(ADMIN_PW_KEY) || DEFAULT_PW; }

// ── Session ──
function isLoggedIn() { return sessionStorage.getItem(ADMIN_SES_KEY) === "1"; }
function login() { sessionStorage.setItem(ADMIN_SES_KEY, "1"); }
function logout() {
  sessionStorage.removeItem(ADMIN_SES_KEY);
  location.reload();
}

// ── Show/hide screens ──
function showPanel() {
  el("loginScreen").style.display = "none";
  el("adminWrap").classList.add("is-visible");
}

// ── Deep clone helper ──
function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

// ── Working copy of content (mutated in-place) ──
let CONTENT = loadContent();

// ── Populate all form fields from CONTENT ──
function populateFields() {
  // Nav
  setVal("f-nav-logo", CONTENT.nav.logo);

  // Hero
  setVal("f-hero-badge",           CONTENT.hero.badge);
  setVal("f-hero-title",           CONTENT.hero.title);
  setVal("f-hero-titleHighlight",  CONTENT.hero.titleHighlight);
  setVal("f-hero-subtitle",        CONTENT.hero.subtitle);
  setVal("f-hero-ctaPrimary",      CONTENT.hero.ctaPrimary);
  setVal("f-hero-ctaSecondary",    CONTENT.hero.ctaSecondary);

  // Services meta
  setVal("f-services-heading",    CONTENT.services.heading);
  setVal("f-services-subheading", CONTENT.services.subheading);
  renderServicesEditor();

  // About
  setVal("f-about-heading",    CONTENT.about.heading);
  setVal("f-about-subheading", CONTENT.about.subheading);
  setVal("f-about-body",       CONTENT.about.body);
  renderStatsEditor();
  renderValuesEditor();

  // Contact
  setVal("f-contact-heading",    CONTENT.contact.heading);
  setVal("f-contact-subheading", CONTENT.contact.subheading);
  setVal("f-contact-email",      CONTENT.contact.email);
  setVal("f-contact-phone",      CONTENT.contact.phone);
  setVal("f-contact-address",    CONTENT.contact.address);
  setVal("f-fl-name",    CONTENT.contact.formLabels.name);
  setVal("f-fl-email",   CONTENT.contact.formLabels.email);
  setVal("f-fl-subject", CONTENT.contact.formLabels.subject);
  setVal("f-fl-message", CONTENT.contact.formLabels.message);
  setVal("f-fl-submit",  CONTENT.contact.formLabels.submit);

  // Footer
  setVal("f-footer-tagline",   CONTENT.footer.tagline);
  setVal("f-footer-copyright", CONTENT.footer.copyright);
}

// ── Services dynamic editor ──
function renderServicesEditor() {
  const container = el("services-editor");
  if (!container) return;
  container.innerHTML = CONTENT.services.items.map((item, i) => `
    <div class="admin-card" id="service-card-${i}">
      <div class="admin-card__header">
        <span class="admin-card__title">Service ${i + 1}</span>
        <button class="btn--danger" onclick="removeService(${i})">Remove</button>
      </div>
      <div class="admin-field-row">
        <div class="admin-field">
          <label>Title</label>
          <input type="text" id="f-svc-title-${i}" value="${escAttr(item.title)}" />
        </div>
        <div class="admin-field">
          <label>Icon (code / layers / compass)</label>
          <input type="text" id="f-svc-icon-${i}" value="${escAttr(item.icon)}" />
        </div>
      </div>
      <div class="admin-field">
        <label>Description</label>
        <textarea id="f-svc-desc-${i}" rows="3">${escText(item.description)}</textarea>
      </div>
      <div class="admin-field">
        <label>Tags (comma-separated)</label>
        <input type="text" id="f-svc-tags-${i}" value="${escAttr(item.tags.join(", "))}" />
      </div>
    </div>
  `).join("");
}

window.removeService = function(i) {
  if (CONTENT.services.items.length <= 1) {
    alert("You need at least one service.");
    return;
  }
  CONTENT.services.items.splice(i, 1);
  renderServicesEditor();
};

function readServicesFromFields() {
  return CONTENT.services.items.map((_, i) => ({
    title:       val(`f-svc-title-${i}`),
    icon:        val(`f-svc-icon-${i}`)  || "code",
    description: val(`f-svc-desc-${i}`),
    tags:        val(`f-svc-tags-${i}`).split(",").map(t => t.trim()).filter(Boolean),
  }));
}

// ── Stats dynamic editor ──
function renderStatsEditor() {
  const container = el("stats-editor");
  if (!container) return;
  container.innerHTML = `
    <div class="admin-card">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        ${CONTENT.about.stats.map((s, i) => `
          <div class="admin-field" style="display:grid;grid-template-columns:80px 1fr;gap:10px;align-items:end">
            <div>
              <label>Value</label>
              <input type="text" id="f-stat-val-${i}" value="${escAttr(s.value)}" />
            </div>
            <div>
              <label>Label</label>
              <input type="text" id="f-stat-label-${i}" value="${escAttr(s.label)}" />
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function readStatsFromFields() {
  return CONTENT.about.stats.map((_, i) => ({
    value: val(`f-stat-val-${i}`),
    label: val(`f-stat-label-${i}`),
  }));
}

// ── Values dynamic editor ──
function renderValuesEditor() {
  const container = el("values-editor");
  if (!container) return;
  container.innerHTML = CONTENT.about.values.map((v, i) => `
    <div class="admin-card" style="margin-bottom:12px">
      <div class="admin-field-row">
        <div class="admin-field">
          <label>Title</label>
          <input type="text" id="f-val-title-${i}" value="${escAttr(v.title)}" />
        </div>
        <div class="admin-field">
          <label>Icon (zap / shield / users)</label>
          <input type="text" id="f-val-icon-${i}" value="${escAttr(v.icon)}" />
        </div>
      </div>
      <div class="admin-field">
        <label>Description</label>
        <input type="text" id="f-val-text-${i}" value="${escAttr(v.text)}" />
      </div>
    </div>
  `).join("");
}

function readValuesFromFields() {
  return CONTENT.about.values.map((_, i) => ({
    title: val(`f-val-title-${i}`),
    icon:  val(`f-val-icon-${i}`) || "zap",
    text:  val(`f-val-text-${i}`),
  }));
}

// ── Show save confirmation ──
function flashSaved(msgId) {
  const msg = el(msgId);
  if (!msg) return;
  msg.classList.add("is-visible");
  setTimeout(() => msg.classList.remove("is-visible"), 2500);
}

// ── Section navigation ──
function initNav() {
  const navItems = document.querySelectorAll(".admin-nav__item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(n => n.classList.remove("is-active"));
      item.classList.add("is-active");
      const target = item.dataset.section;
      document.querySelectorAll(".admin-section").forEach(s => s.classList.remove("is-active"));
      const section = el(`section-${target}`);
      if (section) section.classList.add("is-active");
    });
  });
}

// ── Save handlers ──
function initSaveHandlers() {
  // Nav
  el("save-nav").addEventListener("click", () => {
    CONTENT.nav.logo = val("f-nav-logo");
    saveContent(CONTENT);
    flashSaved("msg-nav");
  });
  el("reset-nav").addEventListener("click", () => {
    if (!confirmReset()) return;
    CONTENT.nav = deepClone(DEFAULT_CONTENT.nav);
    saveContent(CONTENT);
    setVal("f-nav-logo", CONTENT.nav.logo);
    flashSaved("msg-nav");
  });

  // Hero
  el("save-hero").addEventListener("click", () => {
    CONTENT.hero.badge          = val("f-hero-badge");
    CONTENT.hero.title          = val("f-hero-title");
    CONTENT.hero.titleHighlight = val("f-hero-titleHighlight");
    CONTENT.hero.subtitle       = val("f-hero-subtitle");
    CONTENT.hero.ctaPrimary     = val("f-hero-ctaPrimary");
    CONTENT.hero.ctaSecondary   = val("f-hero-ctaSecondary");
    saveContent(CONTENT);
    flashSaved("msg-hero");
  });
  el("reset-hero").addEventListener("click", () => {
    if (!confirmReset()) return;
    CONTENT.hero = deepClone(DEFAULT_CONTENT.hero);
    saveContent(CONTENT);
    populateFields();
    flashSaved("msg-hero");
  });

  // Services
  el("save-services").addEventListener("click", () => {
    CONTENT.services.heading    = val("f-services-heading");
    CONTENT.services.subheading = val("f-services-subheading");
    CONTENT.services.items      = readServicesFromFields();
    saveContent(CONTENT);
    flashSaved("msg-services");
  });
  el("add-service").addEventListener("click", () => {
    CONTENT.services.items.push({
      icon: "code", title: "New Service",
      description: "Describe this service here.",
      tags: ["Tag 1"]
    });
    renderServicesEditor();
  });
  el("reset-services").addEventListener("click", () => {
    if (!confirmReset()) return;
    CONTENT.services = deepClone(DEFAULT_CONTENT.services);
    saveContent(CONTENT);
    populateFields();
    flashSaved("msg-services");
  });

  // About
  el("save-about").addEventListener("click", () => {
    CONTENT.about.heading    = val("f-about-heading");
    CONTENT.about.subheading = val("f-about-subheading");
    CONTENT.about.body       = val("f-about-body");
    CONTENT.about.stats      = readStatsFromFields();
    CONTENT.about.values     = readValuesFromFields();
    saveContent(CONTENT);
    flashSaved("msg-about");
  });
  el("reset-about").addEventListener("click", () => {
    if (!confirmReset()) return;
    CONTENT.about = deepClone(DEFAULT_CONTENT.about);
    saveContent(CONTENT);
    populateFields();
    flashSaved("msg-about");
  });

  // Contact
  el("save-contact").addEventListener("click", () => {
    CONTENT.contact.heading    = val("f-contact-heading");
    CONTENT.contact.subheading = val("f-contact-subheading");
    CONTENT.contact.email      = val("f-contact-email");
    CONTENT.contact.phone      = val("f-contact-phone");
    CONTENT.contact.address    = val("f-contact-address");
    CONTENT.contact.formLabels = {
      name:    val("f-fl-name"),
      email:   val("f-fl-email"),
      subject: val("f-fl-subject"),
      message: val("f-fl-message"),
      submit:  val("f-fl-submit"),
    };
    saveContent(CONTENT);
    flashSaved("msg-contact");
  });
  el("reset-contact").addEventListener("click", () => {
    if (!confirmReset()) return;
    CONTENT.contact = deepClone(DEFAULT_CONTENT.contact);
    saveContent(CONTENT);
    populateFields();
    flashSaved("msg-contact");
  });

  // Footer
  el("save-footer").addEventListener("click", () => {
    CONTENT.footer.tagline   = val("f-footer-tagline");
    CONTENT.footer.copyright = val("f-footer-copyright");
    saveContent(CONTENT);
    flashSaved("msg-footer");
  });
  el("reset-footer").addEventListener("click", () => {
    if (!confirmReset()) return;
    CONTENT.footer = deepClone(DEFAULT_CONTENT.footer);
    saveContent(CONTENT);
    populateFields();
    flashSaved("msg-footer");
  });
}

// ── Settings handlers ──
function initSettings() {
  // Password change
  el("save-password").addEventListener("click", () => {
    const current  = val("f-pw-current");
    const newPw    = val("f-pw-new");
    const confirm  = val("f-pw-confirm");
    const msgEl    = el("pw-change-msg");

    if (current !== getStoredPw()) {
      msgEl.textContent = "Current password is incorrect.";
      msgEl.style.color = "#f87171";
      return;
    }
    if (newPw.length < 6) {
      msgEl.textContent = "New password must be at least 6 characters.";
      msgEl.style.color = "#f87171";
      return;
    }
    if (newPw !== confirm) {
      msgEl.textContent = "New passwords do not match.";
      msgEl.style.color = "#f87171";
      return;
    }
    localStorage.setItem(ADMIN_PW_KEY, newPw);
    msgEl.textContent = "Password updated successfully!";
    msgEl.style.color = "#10b981";
    el("f-pw-current").value = "";
    el("f-pw-new").value = "";
    el("f-pw-confirm").value = "";
  });

  // Reset all
  el("reset-all").addEventListener("click", () => {
    if (!confirm("Are you sure? This will reset ALL content to factory defaults and cannot be undone.")) return;
    resetContent();
    CONTENT = loadContent();
    populateFields();
    alert("All content has been reset to defaults.");
  });

  // Theme toggle in settings
  el("admin-theme-toggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sn_theme", next);
  });
}

// ── Logout ──
function initLogout() {
  el("logoutBtn").addEventListener("click", logout);
}

// ── Login form ──
function initLogin() {
  // Apply saved theme on admin page
  const savedTheme = localStorage.getItem("sn_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (isLoggedIn()) {
    showPanel();
    return;
  }

  el("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const entered = val("adminPassword");
    if (entered === getStoredPw()) {
      login();
      showPanel();
    } else {
      el("loginError").textContent = "Incorrect password. Please try again.";
      el("adminPassword").value = "";
      el("adminPassword").focus();
    }
  });
}

// ── Confirm before resetting a section ──
function confirmReset() {
  return confirm("Reset this section to default content? This will overwrite your changes.");
}

// ── Escape helpers (for rendering into HTML attributes/textarea) ──
function escAttr(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escText(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── Boot ──
document.addEventListener("DOMContentLoaded", () => {
  initLogin();

  if (!isLoggedIn()) return;

  CONTENT = loadContent();
  populateFields();
  initNav();
  initSaveHandlers();
  initSettings();
  initLogout();
});
