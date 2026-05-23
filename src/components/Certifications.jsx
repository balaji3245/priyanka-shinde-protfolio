const CERTS = [
  { id: 'cert-1', icon: '☁️', title: 'Cloud Computing – TechSaksham by Microsoft & SAP (Edunet Foundation)', issuer: 'TechSaksham', year: '2022' },
  { id: 'cert-2', icon: '🤖', title: 'Artificial intelligence - TechSaksham by Microsoft & SAP (Edunet Foundation)', issuer: 'TechSaksham', year: '2022' },
  { id: 'cert-3', icon: '🐍', title: 'Python Training', issuer: 'Internshala', year: '2021' },
  { id: 'cert-4', icon: '🌐', title: 'Web Development & Technologies Training', issuer: 'INGenious Technohub Pvt. Ltd.', year: '2021' },
];

const Certifications = () => (
  <section id="certifications">
    <div className="section-wrap">
      <div className="container">
        <div data-anim>
          <span className="section-tag">🏅 Certifications</span>
          <h2 className="section-title">Continuous learning</h2>
          <p className="section-desc">Verified credentials from leading tech companies and platforms.</p>
        </div>

        <div className="certs-grid" data-anim>
          {CERTS.map(cert => (
            <div key={cert.id} id={cert.id} className="cert-card">
              <span className="cert-card__icon">{cert.icon}</span>
              <h3 className="cert-card__title">{cert.title}</h3>
              <p className="cert-card__issuer">{cert.issuer}</p>
              <span className="cert-card__year">✓ Verified · {cert.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Certifications;
