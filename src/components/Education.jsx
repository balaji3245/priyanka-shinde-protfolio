import { FiBook, FiAward, FiStar } from 'react-icons/fi';

const EDU = [
  {
    year: '2019 – 2023',
    degree: 'B.Tech in Computer Engineering',
    school: 'DBATU Lonere',
    score: 'CGPA: 7.75 / 10',
    icon: <FiBook />,
  },
  {
    year: '2016 – 2019',
    degree: 'Diploma in Computer Engineering',
    school: 'Polytechnic Institute, Maharashtra',
    score: 'Score: 82.23%',
    icon: <FiAward />,
  },
  {
    year: '2015 – 2016',
    degree: 'Secondary School Certificate (SSC)',
    school: 'Maharashtra State Board',
    score: 'Score: 85.80%',
    icon: <FiStar />,
  },
];

/**
 * Education — clean table-style list, no glassmorphism.
 */
const Education = () => (
  <section id="education">
    <div className="container">
      <div className="section-heading" data-anim>
        <span className="section-heading__num">03.</span>
        <h2 className="section-heading__title">Education</h2>
        <span className="section-heading__line" />
      </div>

      <div className="edu-list" data-anim>
        {EDU.map((item) => (
          <div key={item.degree} className="edu-item">
            <div className="edu-year">{item.year}</div>
            <div>
              <div className="edu-degree">{item.degree}</div>
              <div className="edu-school">{item.school}</div>
              <div className="edu-score">{item.score}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
