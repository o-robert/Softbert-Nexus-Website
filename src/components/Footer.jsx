import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import './Footer.css';

export default function Footer() {
  const { content } = useContent();
  const f = content.footer;

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">{content.nav.logo}</a>
          <p className="footer__tagline">{f.tagline}</p>
        </div>
        <nav className="footer__links">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <Link to="/admin">Admin</Link>
        </nav>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
