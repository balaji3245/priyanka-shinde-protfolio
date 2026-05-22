const EDU = [
  {
    icon: '🎓',
    score: 'CGPA 7.75',
    degree: 'B.Tech in Computer Engineering',
    school: 'DBATU Lonere',
    year: '2019 – 2023',
  },
  {
    icon: '📜',
    score: '82.23%',
    degree: 'Diploma in Computer Engineering',
    school: 'Polytechnic Institute, Maharashtra',
    year: '2016 – 2019',
  },
  {
    icon: '🏫',
    score: '85.80%',
    degree: 'Secondary School Certificate (SSC)',
    school: 'Maharashtra State Board',
    year: '2015 – 2016',
  },
];

const Education = () => (
  <section id="education">
    <div className="section-wrap section-wrap--gray">
      <div className="container">
        <div data-anim>
          <span className="section-tag">🎓 Education</span>
          <h2 className="section-title">Academic background</h2>
          <p className="section-desc">Strong academic foundation from Maharashtra's leading institutions.</p>
        </div>

        <div className="edu-cards" data-anim>
          {EDU.map(e => (
            <div key={e.degree} className="edu-card">
              <div className="edu-card__icon">{e.icon}</div>
              <div className="edu-card__score">{e.score}</div>
              <div className="edu-card__degree">{e.degree}</div>
              <div className="edu-card__school">{e.school}</div>
              <div className="edu-card__year">{e.year}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Education;
