import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { FiBriefcase, FiChevronRight } from 'react-icons/fi';
import { db } from '../firebase';

const FALLBACK_EXP = [
  {
    id: 'exp-1',
    logo: '',
    title: 'Assistant Professor',
    company: 'SVM Polytechnic College, Latur',
    period: 'June 2023 – Present · Full-time',
    isActive: true,
    points: [
      'Deliver lectures in Java, C, DBMS, Data Structures & Web Technologies to 100+ students per semester.',
      'Guide final-year students through complete project lifecycle — from problem definition to implementation and presentation.',
      'Conduct technical workshops, lab sessions and coding bootcamps to improve practical programming skills.',
      'Mentor students on career pathways in software engineering, competitive programming, and certifications.',
      'Design course materials, assignments, and assessments aligned with university curriculum and industry needs.',
      'Organize inter-college hackathons and technical events fostering innovation and teamwork.'
    ],
    tags: ['Java', 'C Programming', 'DBMS', 'Data Structures', 'Web Technologies', 'Project Mentorship', 'Curriculum Design', 'Leadership']
  }
];

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'experience'));
        if (querySnapshot.empty) {
          setExperiences(FALLBACK_EXP);
        } else {
          const exps = [];
          querySnapshot.forEach((doc) => {
            exps.push({ id: doc.id, ...doc.data() });
          });
          setExperiences(exps);
        }
      } catch (err) {
        console.error("Error fetching experiences from Firebase, using fallback", err);
        setExperiences(FALLBACK_EXP);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <section id="experience">
      <div className="section-wrap">
        <div className="container">
          <div data-anim>
            <span className="section-tag">Experience</span>
            <h2 className="section-title">Where I've worked</h2>
            <p className="section-desc">2+ years building the next generation of engineers.</p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading experience...</div>
          ) : (
            experiences.map(exp => (
              <div key={exp.id} data-anim className="mb-8 last:mb-0">
                <div className="exp-card">
                  <div className="exp-card__header">
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      {exp.logo ? (
                        <div className="exp-card__logo">{exp.logo}</div>
                      ) : (
                        <div className="exp-card__logo" style={{ background: 'var(--gray-100)', color: 'var(--gray-500)', fontSize: 16 }}>
                          <FiBriefcase size={20} />
                        </div>
                      )}
                      <div>
                        <div className="exp-card__title">{exp.title}</div>
                        <div className="exp-card__company">{exp.company}</div>
                        <div className="exp-card__period">{exp.period}</div>
                      </div>
                    </div>
                    {exp.isActive && (
                      <div className="exp-card__badge">
                        <span className="exp-card__badge-dot" />
                        Currently Active
                      </div>
                    )}
                  </div>

                  {Array.isArray(exp.points) && exp.points.length > 0 && (
                    <ul className="exp-points">
                      {exp.points.map((p, idx) => (
                        <li key={idx} className="exp-point">
                          <span className="exp-point__icon" style={{ marginTop: 6 }}>
                            <FiChevronRight size={12} />
                          </span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {Array.isArray(exp.tags) && exp.tags.length > 0 && (
                    <div className="exp-tags">
                      {exp.tags.map(t => (
                        <span key={t} className="exp-tag">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
