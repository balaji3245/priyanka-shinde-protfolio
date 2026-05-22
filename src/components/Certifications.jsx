const CERTS = [
  {
    id:     'cert-cloud',
    icon:   '☁️',
    title:  'TechSaksham Internship — Cloud Computing',
    issuer: 'Microsoft & SAP India',
    year:   '2022',
  },
  {
    id:     'cert-ai',
    icon:   '🤖',
    title:  'TechSaksham Program — Artificial Intelligence',
    issuer: 'Microsoft & SAP India',
    year:   '2022',
  },
  {
    id:     'cert-python',
    icon:   '🐍',
    title:  'Python Programming Training',
    issuer: 'Internshala',
    year:   '2021',
  },
  {
    id:     'cert-web',
    icon:   '🌐',
    title:  'Web Development & Technologies',
    issuer: 'Online Platform',
    year:   '2021',
  },
];

/**
 * Certifications — clean grid, no glow animations.
 */
const Certifications = () => (
  <section id="certifications">
    <div className="container">
      <div className="section-heading" data-anim>
        <span className="section-heading__num">06.</span>
        <h2 className="section-heading__title">Certifications</h2>
        <span className="section-heading__line" />
      </div>

      <div className="cert-list" data-anim>
        {CERTS.map((cert) => (
          <div key={cert.id} id={cert.id} className="cert-item">
            <span className="cert-icon" aria-hidden="true">{cert.icon}</span>
            <h3 className="cert-title">{cert.title}</h3>
            <p className="cert-issuer">{cert.issuer}</p>
            <p className="cert-year">{cert.year}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
