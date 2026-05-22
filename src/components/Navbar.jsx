import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Education',      href: '#education' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll('section[id]');
      let cur = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = s.id; });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <a
            href="/"
            className="nav-logo"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="nav-logo__icon">PS</div>
            Priyanka Shinde
          </a>

          {/* Desktop nav */}
          <ul className="nav-links">
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`nav-link ${active === link.href.slice(1) ? 'active' : ''}`}
                  onClick={e => { e.preventDefault(); go(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a
              id="nav-contact-btn"
              href="#contact"
              className="nav-cta"
              onClick={e => { e.preventDefault(); go('#contact'); }}
            >
              Hire Me
            </a>
            <button
              className={`hamburger ${open ? 'open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="mobile-menu">
          <button
            onClick={() => setOpen(false)}
            style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontSize: 28, color: 'var(--gray-700)' }}
            aria-label="Close menu"
          >
            <FiX />
          </button>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-menu__link"
              onClick={e => { e.preventDefault(); go(link.href); }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-menu__cta"
            onClick={e => { e.preventDefault(); go('#contact'); }}
          >
            Hire Me
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
