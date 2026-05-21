import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

/* ===== FOOTER ===== */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Logo */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '1.5rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem',
          letterSpacing: '2px',
        }}>
          {'<PS />'}
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Aspiring Software Engineer · Computer Engineering Graduate · Open to Opportunities
        </p>

        {/* Social links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: <FiGithub />, href: 'https://github.com/', label: 'GitHub', id: 'footer-github' },
            { icon: <FiLinkedin />, href: 'https://linkedin.com/in/', label: 'LinkedIn', id: 'footer-linkedin' },
            { icon: <FiMail />, href: 'mailto:priyankashinde@email.com', label: 'Email', id: 'footer-email' },
          ].map(social => (
            <motion.a
              key={social.id}
              id={social.id}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={social.label}
              whileHover={{ y: -3, scale: 1.1 }}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'color 0.3s',
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p>
          © {currentYear} <span>Priyanka Nandkumar Shinde</span>. Built with{' '}
          <span>React</span> &{' '}
          <span>♥</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
