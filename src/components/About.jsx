import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBriefcase, FiCode, FiBook, FiUsers } from 'react-icons/fi';

const stats = [
  { icon: <FiBriefcase />, number: '2+', label: 'Years Experience' },
  { icon: <FiCode />, number: '10+', label: 'Tech Projects' },
  { icon: <FiBook />, number: '7.75', label: 'CGPA Achieved' },
  { icon: <FiUsers />, number: '100+', label: 'Students Mentored' },
];

/* ===== ANIMATED COUNTER ===== */
const Counter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const isFloat = target.toString().includes('.');
    const end = parseFloat(target);
    const duration = 1500;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      setCount(isFloat ? current.toFixed(2) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  );
};

/* ===== ABOUT SECTION ===== */
const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div className="glow-blob" style={{ width: 400, height: 400, background: '#7c3aed', top: '20%', right: '-10%' }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know me better</p>

        <div className="about-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Text */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              Hi! I'm <strong>Priyanka Nandkumar Shinde</strong>, a passionate Computer Engineering graduate
              from DBATU Lonere with a strong foundation in software development, algorithms, and modern
              technology solutions.
            </p>
            <p>
              With <strong>2+ years of teaching experience</strong> as an Assistant Professor at SVM, Latur,
              I have developed exceptional communication, mentorship, and problem-solving skills while guiding
              undergraduate students in technical domains.
            </p>
            <p>
              My core interests lie in <strong>Java development, Python programming, web technologies</strong>,
              and exploring the frontiers of <strong>Artificial Intelligence & Machine Learning</strong>.
              I believe in writing clean, efficient code and building solutions that make a real difference.
            </p>
            <p>
              I'm actively seeking opportunities to transition into a <strong>full-time software engineering role</strong>
              where I can apply my technical skills, continuous learning mindset, and problem-solving abilities
              to contribute to impactful projects.
            </p>

            {/* Skills highlight */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
              {['Java', 'Python', 'JavaScript', 'MySQL', 'HTML/CSS', 'AI/ML', 'OOP', 'J2EE'].map(skill => (
                <span key={skill} className="tech-tag">{skill}</span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <div style={{ fontSize: '1.5rem', color: 'var(--neon-blue)', marginBottom: '0.5rem' }}>
                    {stat.icon}
                  </div>
                  <Counter
                    target={stat.number.replace('+', '').replace('CGPA', '')}
                    suffix={stat.number.includes('+') ? '+' : ''}
                  />
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Code snippet card */}
            <motion.div
              className="glass-card"
              style={{ padding: '1.5rem', marginTop: '1.5rem' }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', lineHeight: 1.8 }}>
                <span style={{ color: '#64748b' }}>// Priyanka's profile</span><br />
                <span style={{ color: '#7c3aed' }}>const</span>{' '}
                <span style={{ color: '#00d4ff' }}>developer</span>{' '}
                <span style={{ color: '#f1f5f9' }}>= {'{'}</span><br />
                <span style={{ paddingLeft: '1.5rem', color: '#94a3b8' }}>name: </span>
                <span style={{ color: '#4ade80' }}>"Priyanka Shinde"</span><span style={{ color: '#f1f5f9' }}>,</span><br />
                <span style={{ paddingLeft: '1.5rem', color: '#94a3b8' }}>role: </span>
                <span style={{ color: '#4ade80' }}>"Software Engineer"</span><span style={{ color: '#f1f5f9' }}>,</span><br />
                <span style={{ paddingLeft: '1.5rem', color: '#94a3b8' }}>passion: </span>
                <span style={{ color: '#4ade80' }}>"Building solutions"</span><span style={{ color: '#f1f5f9' }}>,</span><br />
                <span style={{ paddingLeft: '1.5rem', color: '#94a3b8' }}>status: </span>
                <span style={{ color: '#fbbf24' }}>"Open to work 🚀"</span><br />
                <span style={{ color: '#f1f5f9' }}>{'}'}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
