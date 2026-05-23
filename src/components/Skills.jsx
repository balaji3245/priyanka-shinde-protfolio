import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { FiCode } from 'react-icons/fi';
import { db } from '../firebase';

const FALLBACK_SKILLS = [
  { id: 'sk-1', icon: '', title: 'Programming',   skills: ['Java', 'Python', 'JavaScript'], order: 0 },
  { id: 'sk-2', icon: '', title: 'Technologies',  skills: ['HTML', 'CSS', 'J2EE'], order: 1 },
  { id: 'sk-3', icon: '', title: 'Database',      skills: ['MySQL'], order: 2 },
  { id: 'sk-4', icon: '', title: 'Concepts',      skills: ['OOP', 'Java Collection Framework'], order: 3 },
  { id: 'sk-5', icon: '', title: 'AI / ML',       skills: ['Basic Machine Learning & AI Concepts'], order: 4 },
];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'skills'));
        if (querySnapshot.empty) {
          setSkills(FALLBACK_SKILLS);
        } else {
          const skillsList = [];
          querySnapshot.forEach((doc) => {
            skillsList.push({ id: doc.id, ...doc.data() });
          });
          skillsList.sort((a, b) => (a.order || 0) - (b.order || 0));
          setSkills(skillsList);
        }
      } catch (err) {
        console.error("Error fetching skills from Firebase, using fallback", err);
        setSkills(FALLBACK_SKILLS);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills">
      <div className="section-wrap">
        <div className="container">
          <div data-anim>
            <span className="section-tag">Skills</span>
            <h2 className="section-title">Technologies I work with</h2>
            <p className="section-desc">A versatile stack spanning programming, web, databases, and AI/ML.</p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading skills...</div>
          ) : (
            <div className="skills-layout" data-anim>
              {skills.map(cat => (
                <div key={cat.id} className="skill-cat-card">
                  <div className="skill-cat-header">
                    {cat.icon ? (
                      <div className="skill-cat-icon">{cat.icon}</div>
                    ) : (
                      <div className="skill-cat-icon" style={{ background: 'var(--gray-100)', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiCode size={20} />
                      </div>
                    )}
                    <div className="skill-cat-title">{cat.title}</div>
                  </div>
                  <div className="skill-tags">
                    {Array.isArray(cat.skills) && cat.skills.map(s => (
                      <span key={s} className="skill-tag">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
