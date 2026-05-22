const POINTS = [
  { icon: '🎓', text: 'Deliver lectures in Java, C, DBMS, Data Structures & Web Technologies to 100+ students per semester.' },
  { icon: '🛠️', text: 'Guide final-year students through complete project lifecycle — from problem definition to implementation and presentation.' },
  { icon: '💡', text: 'Conduct technical workshops, lab sessions and coding bootcamps to improve practical programming skills.' },
  { icon: '🤝', text: 'Mentor students on career pathways in software engineering, competitive programming, and certifications.' },
  { icon: '📝', text: 'Design course materials, assignments, and assessments aligned with university curriculum and industry needs.' },
  { icon: '🏆', text: 'Organize inter-college hackathons and technical events fostering innovation and teamwork.' },
];

const Experience = () => (
  <section id="experience">
    <div className="section-wrap">
      <div className="container">
        <div data-anim>
          <span className="section-tag">💼 Experience</span>
          <h2 className="section-title">Where I've worked</h2>
          <p className="section-desc">2+ years building the next generation of engineers.</p>
        </div>

        <div data-anim>
          <div className="exp-card">
            <div className="exp-card__header">
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div className="exp-card__logo">🎓</div>
                <div>
                  <div className="exp-card__title">Assistant Professor</div>
                  <div className="exp-card__company">SVM Polytechnic College, Latur</div>
                  <div className="exp-card__period">June 2023 – Present · Full-time</div>
                </div>
              </div>
              <div className="exp-card__badge">
                <span className="exp-card__badge-dot" />
                Currently Active
              </div>
            </div>

            <ul className="exp-points">
              {POINTS.map(p => (
                <li key={p.text} className="exp-point">
                  <span className="exp-point__icon">{p.icon}</span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>

            <div className="exp-tags">
              {['Java', 'C Programming', 'DBMS', 'Data Structures', 'Web Technologies', 'Project Mentorship', 'Curriculum Design', 'Leadership'].map(t => (
                <span key={t} className="exp-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
