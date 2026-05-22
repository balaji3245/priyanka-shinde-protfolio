import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';

/**
 * Fixed side elements — social icons (left) and email (right)
 * Hidden below 1080px.
 */
const SideElements = () => (
  <>
    {/* Left — social icons */}
    <aside className="side-element side-element--left" aria-label="Social links">
      <a
        id="side-github"
        href="https://github.com/"
        className="side-icon"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        title="GitHub"
      >
        <FiGithub />
      </a>
      <a
        id="side-linkedin"
        href="https://linkedin.com/in/priyanka-shinde"
        className="side-icon"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <FiLinkedin />
      </a>
      <a
        id="side-mail"
        href="mailto:priyankashinde@email.com"
        className="side-icon"
        aria-label="Email"
        title="Send email"
      >
        <FiMail />
      </a>
    </aside>

    {/* Right — email */}
    <aside className="side-element side-element--right" aria-label="Email link">
      <a
        id="side-email-link"
        href="mailto:priyankashinde@email.com"
        className="side-email"
      >
        priyankashinde@email.com
      </a>
    </aside>
  </>
);

export default SideElements;
