import { useContent } from '../context/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Services.css';

const ICONS = {
  code: (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  layers: (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  compass: (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
};

function ServiceCard({ item, index }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`service-card fade-up${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="service-card__icon">
        {ICONS[item.icon] || ICONS.code}
      </div>
      <h3 className="service-card__title">{item.title}</h3>
      <p className="service-card__desc">{item.description}</p>
      <div className="service-card__tags">
        {item.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const { content } = useContent();
  const s = content.services;
  const { ref, visible } = useScrollAnimation();

  return (
    <section className="section" id="services">
      <div className="container">
        <div ref={ref} className={`section-header fade-up${visible ? ' visible' : ''}`}>
          <p className="section-label">{s.heading}</p>
          <h2 className="section-title">
            {s.subheading.split('.')[0]}.<br />
            <span className="highlight">{s.subheading.split('.').slice(1).join('.').trim()}</span>
          </h2>
        </div>
        <div className="services__grid">
          {s.items.map((item, i) => (
            <ServiceCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
