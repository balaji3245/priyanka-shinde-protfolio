import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const NAV_ITEMS = [
  { num: '01.', label: 'About',        href: '#about' },
  { num: '02.', label: 'Experience',   href: '#experience' },
  { num: '03.', label: 'Education',    href: '#education' },
  { num: '04.', label: 'Skills',       href: '#skills' },
  { num: '05.', label: 'Projects',     href: '#projects' },
  { num: '06.', label: 'Contact',      href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (href) => {
    setMenuOpen(false);
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
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            priyanka.dev
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation">
            <ul className="nav-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="nav-link"
                    onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                  >
                    <span className="nav-link__num">{item.num}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/resume.pdf" className="nav-resume" download>
                  Resume
                </a>
              </li>
            </ul>
          </nav>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className="mobile-nav__link"
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="mobile-nav__num">{item.num}</span>
              {item.label}
            </a>
          ))}
          <a href="/resume.pdf" className="mobile-nav__resume" download>
            Resume
          </a>
        </nav>
      )}
    </>
  );
};

export default Navbar;
