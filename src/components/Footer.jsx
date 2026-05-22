/**
 * Footer — minimal, mono font, nothing flashy.
 */
const Footer = () => (
  <footer>
    <a
      href="https://github.com/balaji3245/priyanka-shinde-protfolio"
      className="footer-logo"
      target="_blank"
      rel="noopener noreferrer"
    >
      Designed &amp; Built by Priyanka Nandkumar Shinde
    </a>
    <p className="footer-copy">
      Inspired by{' '}
      <span>
        <a
          href="https://brittanychiang.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--green)' }}
        >
          Brittany Chiang
        </a>
      </span>
      {' · '}Built with <span>React</span> &amp; <span>Vite</span>
    </p>
  </footer>
);

export default Footer;
