import { useState } from 'react';
import { FiSend, FiMail, FiPhone, FiMapPin, FiLinkedin } from 'react-icons/fi';

const INFO = [
  { id: 'ci-email',    icon: '✉️', label: 'Email',    val: 'priyankashinde@email.com', href: 'mailto:priyankashinde@email.com' },
  { id: 'ci-phone',    icon: '📱', label: 'Phone',    val: '+91 XXXXX XXXXX',          href: 'tel:+91XXXXXXXXXX' },
  { id: 'ci-location', icon: '📍', label: 'Location', val: 'Latur, Maharashtra',       href: 'https://maps.google.com/?q=Latur,Maharashtra' },
  { id: 'ci-linkedin', icon: '💼', label: 'LinkedIn', val: 'linkedin.com/in/priyanka-shinde', href: 'https://linkedin.com/in/' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact">
      <div className="section-wrap section-wrap--gray">
        <div className="container">
          <div data-anim style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-tag" style={{ margin: '0 auto 16px' }}>📬 Contact</span>
            <h2 className="section-title">Let's work together</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              I'm actively looking for software engineering roles. Got an opportunity or just want to chat? My inbox is open!
            </p>
          </div>

          <div className="contact-wrapper" data-anim>
            <div className="contact-card">
              {/* Info grid */}
              <div className="contact-info-row">
                {INFO.map(item => (
                  <a
                    key={item.id}
                    id={item.id}
                    href={item.href}
                    className="contact-info-item"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    <div className="contact-info-item__icon">{item.icon}</div>
                    <div>
                      <div className="contact-info-item__label">{item.label}</div>
                      <div className="contact-info-item__val">{item.val}</div>
                    </div>
                  </a>
                ))}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--gray-100)', marginBottom: 28 }} />

              {/* Form */}
              {sent ? (
                <div className="form-success">
                  🎉 Message sent! I'll get back to you within 24 hours.
                </div>
              ) : (
                <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row-2">
                    <div className="form-field">
                      <label className="form-label" htmlFor="cf-name">Full Name</label>
                      <input id="cf-name" type="text" className="form-input" placeholder="Jane Smith"
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="cf-email">Email Address</label>
                      <input id="cf-email" type="email" className="form-input" placeholder="jane@company.com"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="cf-subject">Subject</label>
                    <input id="cf-subject" type="text" className="form-input" placeholder="Job opportunity / Project collaboration / Other"
                      value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="cf-message">Message</label>
                    <textarea id="cf-message" className="form-textarea" placeholder="Hi Priyanka, I'd love to discuss..."
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                  </div>
                  <div className="form-submit-row">
                    <button id="contact-submit-btn" type="submit" className="btn-primary">
                      <FiSend /> Send Message
                    </button>
                    <span style={{ fontSize: 13, color: 'var(--gray-400)' }}>
                      Usually responds within 24h
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
