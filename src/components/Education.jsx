import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBook, FiAward, FiStar } from 'react-icons/fi';

const educations = [
  {
    icon: <FiBook />,
    degree: 'B.Tech in Computer Engineering',
    school: 'DBATU Lonere',
    score: 'CGPA 7.75',
    year: '2019 – 2023',
    desc: 'Bachelor of Technology with focus on software engineering, algorithms, and computer science fundamentals.',
    color: '#00d4ff',
  },
  {
    icon: <FiAward />,
    degree: 'Diploma in Computer Engineering',
    school: 'Polytechnic Institute',
    score: '82.23%',
    year: '2016 – 2019',
    desc: 'Technical diploma covering programming fundamentals, database management, and computer hardware.',
    color: '#7c3aed',
  },
  {
    icon: <FiStar />,
    degree: 'Secondary School Certificate (SSC)',
    school: 'Maharashtra State Board',
    score: '85.80%',
    year: '2015 – 2016',
    desc: 'Completed secondary education with distinction in Science and Mathematics.',
    color: '#e879f9',
  },
];

/* ===== EDUCATION SECTION ===== */
const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="education"
      style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="glow-blob" style={{ width: 300, height: 300, background: '#00d4ff', bottom: '10%', left: '-5%' }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">My academic journey</p>

        <div className="timeline">
          {educations.map((edu, i) => (
            <motion.div
              key={edu.degree}
              className="timeline-item"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* For odd (0, 2): content left, spacer right. For even (1): content right, spacer left */}
              {i % 2 === 0 ? (
                <>
                  {/* Content on left */}
                  <div className="timeline-content" style={{ textAlign: 'right' }}>
                    <div className="glass-card edu-card">
                      <div className="edu-degree">{edu.degree}</div>
                      <div className="edu-school">{edu.school}</div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>{edu.desc}</p>
                      <div className="edu-meta" style={{ alignItems: 'flex-end' }}>
                        <div className="edu-score">{edu.score}</div>
                        <div className="edu-year">{edu.year}</div>
                      </div>
                    </div>
                  </div>
                  {/* Dot */}
                  <div
                    className="timeline-dot"
                    style={{ boxShadow: `0 0 20px ${edu.color}66` }}
                  >
                    {edu.icon}
                  </div>
                  {/* Spacer */}
                  <div />
                </>
              ) : (
                <>
                  {/* Spacer */}
                  <div />
                  {/* Dot */}
                  <div
                    className="timeline-dot"
                    style={{ background: `linear-gradient(135deg, ${edu.color}, #7c3aed)`, boxShadow: `0 0 20px ${edu.color}66` }}
                  >
                    {edu.icon}
                  </div>
                  {/* Content on right */}
                  <div className="timeline-content" style={{ textAlign: 'left' }}>
                    <div className="glass-card edu-card">
                      <div className="edu-degree">{edu.degree}</div>
                      <div className="edu-school" style={{ color: edu.color }}>{edu.school}</div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>{edu.desc}</p>
                      <div className="edu-meta">
                        <div className="edu-score">{edu.score}</div>
                        <div className="edu-year">{edu.year}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
