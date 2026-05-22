import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

/**
 * Contact — centered CTA + minimal form.
 * Real dev portfolios keep contact simple and direct.
 */
const Contact = () => {
  const [form, setForm]   = useState({ name: '', email: '', message: '' });
  const [sent, setSent]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-section" data-anim>
          {/* Overline */}
          <span className="contact-overline">07. What's Next?</span>

          <h2 className="contact-title">Get In Touch</h2>

          <p className="contact-body">
            I'm currently looking for a software engineering role. Whether you have a job
            opening, a project idea, or just want to say hi — my inbox is always open.
            I'll do my best to get back to you!
          </p>

          <a
            id="contact-email-cta"
            href="mailto:priyankashinde@email.com"
            className="btn btn--primary"
            style={{ margin: '0 auto' }}
          >
            Say Hello →
          </a>

          {/* Divider */}
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '48px 0' }} />

          {/* Or fill the form */}
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--slate)', marginBottom: '8px' }}>
            — or drop a message below —
          </p>

          {sent ? (
            <div className="form-success">
              ✓ Message received — I'll reply soon!
            </div>
          ) : (
            <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="cf-name">Name</label>
                  <input
                    id="cf-name"
                    type="text"
                    className="form-input"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="cf-email">Email</label>
                  <input
                    id="cf-email"
                    type="email"
                    className="form-input"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  className="form-textarea"
                  placeholder="Hi Priyanka, I'd love to chat about..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <button id="contact-submit-btn" type="submit" className="form-submit">
                <FiSend /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
