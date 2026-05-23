import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { FiAward } from 'react-icons/fi';
import { db } from '../firebase';

const FALLBACK_EDU = [
  {
    id: 'edu-1',
    icon: '',
    score: 'CGPA: 7.75',
    degree: 'Bachelor of Technology (Computer Engineering)',
    school: 'Dr. Babasaheb Ambedkar Technological University, Lonere',
    year: '2020 - 2023',
    order: 0
  },
  {
    id: 'edu-2',
    icon: '',
    score: 'Percentage: 82.23%',
    degree: 'Diploma in Computer Engineering',
    school: 'Govt. Residential Women’s Polytechnic, Latur',
    year: '2017 - 2020',
    order: 1
  },
  {
    id: 'edu-3',
    icon: '',
    score: 'Percentage: 85.80%',
    degree: 'SSC',
    school: 'Maharashtra Vidyalaya, Nilanga',
    year: '2014',
    order: 2
  },
];

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEducation(FALLBACK_EDU);
    setLoading(false);
  }, []);

  return (
    <section id="education">
      <div className="section-wrap section-wrap--gray">
        <div className="container">
          <div data-anim>
            <span className="section-tag">Education</span>
            <h2 className="section-title">Academic background</h2>
            <p className="section-desc">Strong academic foundation from Maharashtra's leading institutions.</p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading education...</div>
          ) : (
            <div className="edu-cards" data-anim>
              {education.map(e => (
                <div key={e.id} className="edu-card">
                  {e.icon ? (
                    <div className="edu-card__icon">{e.icon}</div>
                  ) : (
                    <div className="edu-card__icon" style={{ background: 'var(--gray-100)', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FiAward size={24} />
                    </div>
                  )}
                  <div className="edu-card__score">{e.score}</div>
                  <div className="edu-card__degree">{e.degree}</div>
                  <div className="edu-card__school">{e.school}</div>
                  <div className="edu-card__year">{e.year}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
