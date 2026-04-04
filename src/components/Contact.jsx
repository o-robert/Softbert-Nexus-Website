import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Contact.css';

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

export default function Contact() {
  const { content } = useContent();
  const c = content.contact;
  const fl = c.formLabels;

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const { ref, visible } = useScrollAnimation();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address.';
    if (!form.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div ref={ref} className={`section-header fade-up${visible ? ' visible' : ''}`}>
          <p className="section-label">Contact</p>
          <h2 className="section-title">
            <span className="highlight">{c.heading}</span>
          </h2>
          <p className="section-sub">{c.subheading}</p>
        </div>

        <div className="contact__inner">
          <div className="contact__info">
            <div className="contact__info-item">
              <span className="contact__info-icon"><MailIcon /></span>
              <span>{c.email}</span>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon"><PhoneIcon /></span>
              <span>{c.phone}</span>
            </div>
            <div className="contact__info-item">
              <span className="contact__info-icon"><PinIcon /></span>
              <span>{c.address}</span>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            {submitted ? (
              <div className="form-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <p>Message sent! We'll get back to you soon.</p>
                <button type="button" className="btn btn--outline" onClick={() => setSubmitted(false)}>
                  Send another
                </button>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="f-name">{fl.name}</label>
                    <input id="f-name" type="text" placeholder="John Doe"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="f-email">{fl.email}</label>
                    <input id="f-email" type="email" placeholder="john@example.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="f-subject">{fl.subject}</label>
                  <input id="f-subject" type="text" placeholder="How can we help?"
                    value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="f-message">{fl.message}</label>
                  <textarea id="f-message" rows={5} placeholder="Tell us about your project..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
                <button type="submit" className="btn btn--primary btn--full">{fl.submit}</button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
