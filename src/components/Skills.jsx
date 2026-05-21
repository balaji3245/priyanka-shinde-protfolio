import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiDatabase, FiGlobe, FiCpu, FiZap } from 'react-icons/fi';

const skillCategories = [
  {
    icon: <FiCode />,
    title: 'Programming Languages',
    color: '#00d4ff',
    skills: [
      { name: 'Java', level: 85 },
      { name: 'Python', level: 78 },
      { name: 'JavaScript', level: 72 },
    ],
  },
  {
    icon: <FiDatabase />,
    title: 'Database',
    color: '#7c3aed',
    skills: [
      { name: 'MySQL', level: 80 },
    ],
    tags: ['SQL Queries', 'Database Design', 'CRUD Operations', 'Joins & Indexing'],
  },
  {
    icon: <FiGlobe />,
    title: 'Web Technologies',
    color: '#e879f9',
    tags: ['HTML5', 'CSS3', 'J2EE', 'Servlets', 'JSP', 'JDBC'],
  },
  {
    icon: <FiCpu />,
    title: 'Core CS Concepts',
    color: '#00d4ff',
    tags: ['OOP', 'Java Collection Framework', 'Data Structures', 'Algorithms', 'Design Patterns'],
  },
  {
    icon: <FiZap />,
    title: 'AI / Machine Learning',
    color: '#7c3aed',
    tags: ['Machine Learning Basics', 'Artificial Intelligence', 'Data Preprocessing', 'scikit-learn', 'NumPy', 'Pandas'],
  },
];

/* ===== SKILL BAR ===== */
const SkillBar = ({ name, level, delay, inView }) => (
  <div className="skill-bar-wrap">
    <div className="skill-bar-header">
      <span className="skill-name">{name}</span>
      <span className="skill-pct">{level}%</span>
    </div>
    <div className="skill-bar-bg">
      <motion.div
        className="skill-bar-fill"
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: 'easeOut' }}
      />
    </div>
  </div>
);

/* ===== SKILLS SECTION ===== */
const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="glow-blob" style={{ width: 350, height: 350, background: '#00d4ff', top: '20%', left: '-8%' }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Technologies & expertise</p>

        <div className="skills-container">
          <div className="skills-grid">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                className="glass-card skill-category"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Header */}
                <div className="skill-cat-header">
                  <div className="skill-cat-icon" style={{ background: `linear-gradient(135deg, ${cat.color}33, ${cat.color}11)`, border: `1px solid ${cat.color}33`, color: cat.color }}>
                    {cat.icon}
                  </div>
                  <div>
                    <div className="skill-cat-title">{cat.title}</div>
                  </div>
                </div>

                {/* Skill bars */}
                {cat.skills && cat.skills.map((skill, j) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.3 + j * 0.15}
                    inView={inView}
                  />
                ))}

                {/* Tags */}
                {cat.tags && (
                  <div className="tech-tags" style={{ marginTop: cat.skills ? '1rem' : 0 }}>
                    {cat.tags.map(tag => (
                      <span key={tag} className="tech-tag" style={{ borderColor: `${cat.color}33`, color: cat.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
