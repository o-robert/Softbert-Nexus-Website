import { useContent } from '../context/ContentContext';
import './Hero.css';

function CodeCard() {
  return (
    <div className="code-card">
      <div className="code-card__bar">
        <span className="dot dot--red" />
        <span className="dot dot--yellow" />
        <span className="dot dot--green" />
      </div>
      <pre className="code-card__body">
        <code>
          <span className="t-keyword">const</span>{' '}
          <span className="t-var">softbert</span> = {'{'}{'\n'}
          {'  '}<span className="t-prop">services</span>: [{'\n'}
          {'    '}<span className="t-str">"Software Dev"</span>,{'\n'}
          {'    '}<span className="t-str">"Resources"</span>,{'\n'}
          {'    '}<span className="t-str">"Consulting"</span>,{'\n'}
          {'  '}],{'\n'}
          {'  '}<span className="t-prop">mission</span>:{' '}
          <span className="t-str">"Build the future"</span>,{'\n'}
          {'  '}<span className="t-prop">deliver</span>: () =&gt;{' '}
          <span className="t-var">excellence</span>,{'\n'}
          {'}'};
        </code>
      </pre>
    </div>
  );
}

export default function Hero() {
  const { content } = useContent();
  const h = content.hero;

  return (
    <section className="hero" id="home">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="badge">{h.badge}</span>
          <h1 className="hero__title">
            <span>{h.title}</span>
            <br />
            <span className="hero__highlight">{h.titleHighlight}</span>
          </h1>
          <p className="hero__subtitle">{h.subtitle}</p>
          <div className="hero__ctas">
            <a href="#services" className="btn btn--primary">{h.ctaPrimary}</a>
            <a href="#contact" className="btn btn--ghost">{h.ctaSecondary}</a>
          </div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <CodeCard />
        </div>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span>Scroll to explore</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <polyline points="19 12 12 19 5 12"/>
        </svg>
      </div>
    </section>
  );
}
