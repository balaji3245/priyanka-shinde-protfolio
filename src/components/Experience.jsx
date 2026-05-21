import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMonitor, FiUsers, FiTarget, FiMessageSquare, FiBook, FiAward } from 'react-icons/fi';

const responsibilities = [
  {
    icon: <FiMonitor />,
    title: 'Teaching Undergraduate Students',
    desc: 'Delivered engaging lectures in core CS subjects including Programming, DBMS, and OS.',
  },
  {
    icon: <FiBook />,
    title: 'Curriculum & Project Guidance',
    desc: 'Guided final-year students on technical projects from ideation to implementation.',
  },
  {
    icon: <FiUsers />,
    title: 'Student Mentorship',
    desc: 'Mentored students in technical skill development, career planning, and competitive exams.',
  },
  {
    icon: <FiMessageSquare />,
    title: 'Communication & Presentations',
    desc: 'Improved student communication, presentation abilities, and technical writing skills.',
  },
  {
    icon: <FiTarget />,
    title: 'Academic Excellence',
    desc: 'Designed assessments, lab assignments, and educational materials to reinforce learning.',
  },
  {
    icon: <FiAward />,
    title: 'Skill Development Programs',
    desc: 'Organized technical workshops and hackathons to foster innovation among students.',
  },
];

/* ===== EXPERIENCE SECTION ===== */
const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-blob" style={{ width: 350, height: 350, background: '#7c3aed', top: '10%', right: '-8%' }} />
      <div className="glow-blob" style={{ width: 250, height: 250, background: '#00d4ff', bottom: '10%', left: '-5%' }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">Professional journey</p>

        <motion.div
          className="glass-card exp-card"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Header */}
          <div className="exp-header">
            <div className="exp-icon-wrap">🎓</div>
            <div style={{ flex: 1 }}>
              <h3 className="exp-title">Assistant Professor</h3>
              <div className="exp-company">SVM Polytechnic College, Latur</div>
              <span className="exp-period">2023 – Present · Full-time</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  padding: '0.4rem 0.875rem',
                  background: 'rgba(74, 222, 128, 0.1)',
                  border: '1px solid rgba(74, 222, 128, 0.3)',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  color: '#4ade80',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                }}
              >
                ● Active
              </div>
            </div>
          </div>

          {/* Description */}
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.75rem' }}>
            As an Assistant Professor in the Computer Engineering department, I combine deep technical knowledge
            with effective pedagogy to inspire the next generation of software engineers. My role spans from
            classroom instruction to project mentorship and skill development programs.
          </p>

          {/* Responsibilities grid */}
          <ul className="exp-responsibilities">
            {responsibilities.map((item, i) => (
              <motion.li
                key={item.title}
                className="exp-item"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              >
                <span className="exp-item-icon">{item.icon}</span>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Skills used */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              Skills Applied
            </div>
            <div className="tech-tags">
              {['Java', 'Python', 'C Programming', 'DBMS', 'Data Structures', 'Web Technologies', 'Communication', 'Leadership'].map(tag => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
