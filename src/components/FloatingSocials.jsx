import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/', label: 'GitHub', id: 'float-github' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/', label: 'LinkedIn', id: 'float-linkedin' },
  { icon: <FiMail />, href: 'mailto:priyankashinde@email.com', label: 'Email', id: 'float-email' },
];

/* ===== FLOATING SOCIAL BUTTONS ===== */
const FloatingSocials = () => (
  <div className="floating-socials">
    {socials.map((s, i) => (
      <motion.a
        key={s.id}
        id={s.id}
        href={s.href}
        className="float-social-btn"
        target={s.href.startsWith('http') ? '_blank' : undefined}
        rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={s.label}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 + i * 0.1 }}
        title={s.label}
      >
        {s.icon}
      </motion.a>
    ))}
  </div>
);

export default FloatingSocials;
