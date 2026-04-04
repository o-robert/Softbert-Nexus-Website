import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { DEFAULT_CONTENT } from '../../data/defaultContent';
import './Admin.css';

const PW_KEY = 'sn_admin_pw';

const NAV_ITEMS = [
  { id: 'hero',     label: 'Hero' },
  { id: 'services', label: 'Services' },
  { id: 'about',    label: 'About' },
  { id: 'contact',  label: 'Contact' },
  { id: 'footer',   label: 'Footer' },
  { id: 'settings', label: 'Settings' },
];

function Field({ label, value, onChange, type = 'text', rows }) {
  if (rows) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="admin-section">
      <h3 className="admin-section__title">{title}</h3>
      {children}
    </div>
  );
}

/* ── Hero tab ── */
function HeroTab({ draft, setDraft }) {
  const h = draft.hero;
  const set = (key) => (val) => setDraft({ ...draft, hero: { ...h, [key]: val } });
  return (
    <>
      <Section title="Hero Content">
        <Field label="Badge text" value={h.badge} onChange={set('badge')} />
        <Field label="Title line 1" value={h.title} onChange={set('title')} />
        <Field label="Title highlight (line 2)" value={h.titleHighlight} onChange={set('titleHighlight')} />
        <Field label="Subtitle" value={h.subtitle} onChange={set('subtitle')} rows={3} />
        <Field label="Primary CTA" value={h.ctaPrimary} onChange={set('ctaPrimary')} />
        <Field label="Secondary CTA" value={h.ctaSecondary} onChange={set('ctaSecondary')} />
      </Section>
    </>
  );
}

/* ── Services tab ── */
function ServicesTab({ draft, setDraft }) {
  const s = draft.services;

  const setMeta = (key) => (val) =>
    setDraft({ ...draft, services: { ...s, [key]: val } });

  const setItem = (i, key) => (val) => {
    const items = s.items.map((item, idx) => idx === i ? { ...item, [key]: val } : item);
    setDraft({ ...draft, services: { ...s, items } });
  };

  const setTags = (i) => (val) => {
    const tags = val.split(',').map((t) => t.trim()).filter(Boolean);
    setItem(i, 'tags')(tags);
  };

  const addItem = () => {
    const items = [...s.items, { icon: 'code', title: 'New Service', description: '', tags: [] }];
    setDraft({ ...draft, services: { ...s, items } });
  };

  const removeItem = (i) => {
    const items = s.items.filter((_, idx) => idx !== i);
    setDraft({ ...draft, services: { ...s, items } });
  };

  return (
    <>
      <Section title="Section Header">
        <Field label="Heading" value={s.heading} onChange={setMeta('heading')} />
        <Field label="Subheading" value={s.subheading} onChange={setMeta('subheading')} />
      </Section>
      {s.items.map((item, i) => (
        <Section key={i} title={`Service ${i + 1}`}>
          <div className="admin-section__row">
            <Field label="Title" value={item.title} onChange={setItem(i, 'title')} />
            <div className="form-group">
              <label>Icon</label>
              <select value={item.icon} onChange={(e) => setItem(i, 'icon')(e.target.value)}>
                <option value="code">Code</option>
                <option value="layers">Layers</option>
                <option value="compass">Compass</option>
              </select>
            </div>
          </div>
          <Field label="Description" value={item.description} onChange={setItem(i, 'description')} rows={3} />
          <Field label="Tags (comma-separated)" value={item.tags.join(', ')} onChange={setTags(i)} />
          <button className="btn btn--danger btn--sm" onClick={() => removeItem(i)}>
            Remove Service
          </button>
        </Section>
      ))}
      <button className="btn btn--outline" onClick={addItem}>+ Add Service</button>
    </>
  );
}

/* ── About tab ── */
function AboutTab({ draft, setDraft }) {
  const a = draft.about;
  const set = (key) => (val) => setDraft({ ...draft, about: { ...a, [key]: val } });

  const setStat = (i, key) => (val) => {
    const stats = a.stats.map((s, idx) => idx === i ? { ...s, [key]: val } : s);
    setDraft({ ...draft, about: { ...a, stats } });
  };

  const setValue = (i, key) => (val) => {
    const values = a.values.map((v, idx) => idx === i ? { ...v, [key]: val } : v);
    setDraft({ ...draft, about: { ...a, values } });
  };

  return (
    <>
      <Section title="Section Header">
        <Field label="Heading" value={a.heading} onChange={set('heading')} />
        <Field label="Subheading" value={a.subheading} onChange={set('subheading')} />
        <Field label="Body text" value={a.body} onChange={set('body')} rows={5} />
      </Section>
      <Section title="Stats">
        <div className="admin-grid-2">
          {a.stats.map((stat, i) => (
            <div key={i} className="admin-pair">
              <Field label="Value" value={stat.value} onChange={setStat(i, 'value')} />
              <Field label="Label" value={stat.label} onChange={setStat(i, 'label')} />
            </div>
          ))}
        </div>
      </Section>
      <Section title="Values">
        {a.values.map((val, i) => (
          <div key={i} className="admin-pair">
            <Field label="Title" value={val.title} onChange={setValue(i, 'title')} />
            <Field label="Text" value={val.text} onChange={setValue(i, 'text')} />
          </div>
        ))}
      </Section>
    </>
  );
}

/* ── Contact tab ── */
function ContactTab({ draft, setDraft }) {
  const c = draft.contact;
  const set = (key) => (val) => setDraft({ ...draft, contact: { ...c, [key]: val } });
  const setLabel = (key) => (val) =>
    setDraft({ ...draft, contact: { ...c, formLabels: { ...c.formLabels, [key]: val } } });

  return (
    <>
      <Section title="Contact Info">
        <Field label="Heading" value={c.heading} onChange={set('heading')} />
        <Field label="Subheading" value={c.subheading} onChange={set('subheading')} rows={2} />
        <Field label="Email" value={c.email} onChange={set('email')} type="email" />
        <Field label="Phone" value={c.phone} onChange={set('phone')} />
        <Field label="Address" value={c.address} onChange={set('address')} />
      </Section>
      <Section title="Form Labels">
        <Field label="Name field" value={c.formLabels.name} onChange={setLabel('name')} />
        <Field label="Email field" value={c.formLabels.email} onChange={setLabel('email')} />
        <Field label="Subject field" value={c.formLabels.subject} onChange={setLabel('subject')} />
        <Field label="Message field" value={c.formLabels.message} onChange={setLabel('message')} />
        <Field label="Submit button" value={c.formLabels.submit} onChange={setLabel('submit')} />
      </Section>
    </>
  );
}

/* ── Footer tab ── */
function FooterTab({ draft, setDraft }) {
  const f = draft.footer;
  const set = (key) => (val) => setDraft({ ...draft, footer: { ...f, [key]: val } });
  return (
    <Section title="Footer">
      <Field label="Logo text" value={draft.nav.logo}
        onChange={(val) => setDraft({ ...draft, nav: { ...draft.nav, logo: val } })} />
      <Field label="Tagline" value={f.tagline} onChange={set('tagline')} />
      <Field label="Copyright" value={f.copyright} onChange={set('copyright')} />
    </Section>
  );
}

/* ── Settings tab ── */
function SettingsTab({ onReset, onLogout }) {
  const [newPw, setNewPw] = useState('');
  const [pwMsg, setPwMsg] = useState('');

  const changePw = (e) => {
    e.preventDefault();
    if (newPw.length < 6) { setPwMsg('Password must be at least 6 characters.'); return; }
    localStorage.setItem(PW_KEY, newPw);
    setNewPw('');
    setPwMsg('Password updated successfully.');
  };

  return (
    <>
      <Section title="Change Password">
        <form onSubmit={changePw} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Field label="New password" value={newPw} onChange={setNewPw} type="password" />
          {pwMsg && <p className={pwMsg.includes('success') ? 'admin-msg admin-msg--ok' : 'admin-msg admin-msg--err'}>{pwMsg}</p>}
          <button type="submit" className="btn btn--primary">Update Password</button>
        </form>
      </Section>
      <Section title="Data">
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Reset all content to factory defaults. This cannot be undone.
        </p>
        <button className="btn btn--danger" onClick={onReset}>Reset to Defaults</button>
      </Section>
      <Section title="Session">
        <button className="btn btn--outline" onClick={onLogout}>Sign Out</button>
      </Section>
    </>
  );
}

/* ── Main Admin Panel ── */
export default function AdminPanel({ onLogout }) {
  const { content, saveContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState('hero');
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(content)));
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveContent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (!window.confirm('Reset all content to defaults?')) return;
    resetContent();
    setDraft(JSON.parse(JSON.stringify(DEFAULT_CONTENT)));
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'hero':     return <HeroTab draft={draft} setDraft={setDraft} />;
      case 'services': return <ServicesTab draft={draft} setDraft={setDraft} />;
      case 'about':    return <AboutTab draft={draft} setDraft={setDraft} />;
      case 'contact':  return <ContactTab draft={draft} setDraft={setDraft} />;
      case 'footer':   return <FooterTab draft={draft} setDraft={setDraft} />;
      case 'settings': return <SettingsTab onReset={handleReset} onLogout={onLogout} />;
      default: return null;
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <span className="admin-sidebar__logo">Softbert Admin</span>
        </div>
        <nav className="admin-sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`admin-nav-item${activeTab === item.id ? ' active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <Link to="/" className="btn btn--outline btn--sm">← View site</Link>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-main__header">
          <h2>{NAV_ITEMS.find((n) => n.id === activeTab)?.label}</h2>
          {activeTab !== 'settings' && (
            <button className={`btn btn--primary${saved ? ' btn--saved' : ''}`} onClick={handleSave}>
              {saved ? '✓ Saved' : 'Save Changes'}
            </button>
          )}
        </div>
        <div className="admin-main__body">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}
