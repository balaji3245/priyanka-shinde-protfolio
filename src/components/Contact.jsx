import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiSend } from 'react-icons/fi';

const contactInfo = [
  {
    id: 'contact-email',
    icon: <FiMail />,
    label: 'Email',
    value: 'priyankashinde@email.com',
    href: 'mailto:priyankashinde@email.com',
    color: '#00d4ff',
  },
  {
    id: 'contact-phone',
    icon: <FiPhone />,
    label: 'Phone',
    value: '+91 XXXXX XXXXX',
    href: 'tel:+91XXXXXXXXXX',
    color: '#7c3aed',
  },
  {
    id: 'contact-location',
    icon: <FiMapPin />,
    label: 'Location',
    value: 'Latur, Maharashtra, India',
    href: 'https://maps.google.com/?q=Latur,Maharashtra',
    color: '#e879f9',
  },
  {
    id: 'contact-linkedin',
    icon: <FiLinkedin />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/priyanka-shinde',
    href: 'https://linkedin.com/in/',
    color: '#0ea5e9',
  },
];

/* ===== CONTACT SECTION ===== */
const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-blob" style={{ width: 400, height: 400, background: '#00d4ff', top: '10%', left: '-8%' }} />
      <div className="glow-blob" style={{ width: 300, height: 300, background: '#7c3aed', bottom: '10%', right: '-5%' }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Let's work together</p>

        <div className="contact-grid">
          {/* Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Let's Connect!</h3>
            <p>
              I'm actively seeking software engineering opportunities where I can contribute
              my technical skills and passion for building modern solutions. Whether it's a
              full-time role, collaboration, or just a tech conversation — I'd love to hear from you!
            </p>

            <div className="contact-items">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.id}
                  id={item.id}
                  href={item.href}
                  className="contact-item"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="contact-item-icon" style={{ color: item.color, background: `${item.color}11`, border: `1px solid ${item.color}22` }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="glass-card"
            style={{ padding: '2rem' }}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Send a Message
            </h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#4ade80',
                  fontSize: '1rem',
                  fontWeight: '600',
                }}
              >
                ✅ Message sent! I'll get back to you soon.
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-input"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email-input">Email</label>
                    <input
                      id="contact-email-input"
                      type="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    className="form-input"
                    placeholder="Job Opportunity / Collaboration / Other"
                    value={formState.subject}
                    onChange={e => setFormState({ ...formState, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    className="form-textarea"
                    placeholder="Tell me about the opportunity or how I can help..."
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    required
                  />
                </div>

                <motion.button
                  id="contact-submit-btn"
                  type="submit"
                  className="form-submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <FiSend /> Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
