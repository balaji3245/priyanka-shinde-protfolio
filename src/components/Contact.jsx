import { FiMail, FiPhone, FiMapPin, FiLinkedin } from 'react-icons/fi';

const INFO = [
  { id: 'ci-email',    icon: <FiMail />, label: 'Email',    val: 'priyankanshinde2019@gmail.com', href: 'mailto:priyankanshinde2019@gmail.com' },
  { id: 'ci-phone',    icon: <FiPhone />, label: 'Phone',    val: '+91 8788258726',          href: 'tel:+918788258726' },
  { id: 'ci-location', icon: <FiMapPin />, label: 'Location', val: 'Latur, Maharashtra',       href: 'https://maps.google.com/?q=Latur,Maharashtra' },
  { id: 'ci-linkedin', icon: <FiLinkedin />, label: 'LinkedIn', val: 'linkedin.com/in/priyankanandkumarshinde', href: 'https://in.linkedin.com/in/priyankanandkumarshinde' },
];

const Contact = () => {
  return (
    <section id="contact">
      <div className="section-wrap section-wrap--gray">
        <div className="container">
          <div data-anim style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="section-tag" style={{ margin: '0 auto 16px' }}>Contact</span>
            <h2 className="section-title">Let's work together</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              I'm actively looking for software engineering roles. Got an opportunity or just want to chat? My inbox is open!
            </p>
          </div>

          <div className="contact-wrapper" data-anim>
            <div className="contact-card">
              {/* Info grid */}
              <div className="contact-info-row" style={{ marginBottom: 0 }}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
