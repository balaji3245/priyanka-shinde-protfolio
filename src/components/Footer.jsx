import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => (
  <footer>
    <div className="footer-inner">
      <div className="footer-logo">
        <div className="footer-logo__icon">PS</div>
        Priyanka Shinde
      </div>

      <ul className="footer-links">
        {['About', 'Experience', 'Projects', 'Contact'].map(l => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              onClick={e => { e.preventDefault(); document.querySelector(`#${l.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      <div className="footer-socials">
        {[
          { icon: <FiGithub />,   href: 'https://github.com/',             id: 'footer-github',   label: 'GitHub' },
          { icon: <FiLinkedin />, href: 'https://linkedin.com/in/',        id: 'footer-linkedin', label: 'LinkedIn' },
          { icon: <FiMail />,     href: 'mailto:priyankashinde@email.com', id: 'footer-email',    label: 'Email' },
        ].map(s => (
          <a
            key={s.id}
            id={s.id}
            href={s.href}
            className="footer-social"
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>

    <p className="footer-copy">
      © {new Date().getFullYear()} <span>Priyanka Shinde</span> · Built with <span>React</span> &amp; <span>Vite</span> · Designed with ♥
    </p>
  </footer>
);

export default Footer;
