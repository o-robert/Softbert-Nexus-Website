import { useContent } from '../context/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './About.css';

const VALUE_ICONS = {
  zap: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
};

export default function About() {
  const { content } = useContent();
  const a = content.about;
  const { ref: textRef, visible: textVisible } = useScrollAnimation();
  const { ref: rightRef, visible: rightVisible } = useScrollAnimation();

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__inner">
          <div ref={textRef} className={`about__text fade-up${textVisible ? ' visible' : ''}`}>
            <p className="section-label">{a.heading}</p>
            <h2 className="section-title">
              {a.subheading.includes('software') ? (
                <>More than a<br /><span className="highlight">software company.</span></>
              ) : (
                a.subheading
              )}
            </h2>
            <div className="about__body">
              {a.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div ref={rightRef} className={`about__right fade-up${rightVisible ? ' visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}>
            <div className="stats-grid">
              {a.stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-card__value">{stat.value}</span>
                  <span className="stat-card__label">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="values-list">
              {a.values.map((val) => (
                <div key={val.title} className="value-item">
                  <div className="value-item__icon">
                    {VALUE_ICONS[val.icon] || VALUE_ICONS.zap}
                  </div>
                  <div>
                    <p className="value-item__title">{val.title}</p>
                    <p className="value-item__text">{val.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
