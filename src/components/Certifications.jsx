import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward, FiCheck } from 'react-icons/fi';

const certifications = [
  {
    id: 'cert-1',
    icon: '☁️',
    title: 'TechSaksham Internship on Cloud Computing',
    issuer: 'Microsoft & SAP India',
    color: '#0ea5e9',
    year: '2022',
    skills: ['Cloud Fundamentals', 'Azure Services', 'Cloud Deployment'],
  },
  {
    id: 'cert-2',
    icon: '🤖',
    title: 'TechSaksham Program on Artificial Intelligence',
    issuer: 'Microsoft & SAP India',
    color: '#7c3aed',
    year: '2022',
    skills: ['AI Concepts', 'ML Basics', 'Neural Networks'],
  },
  {
    id: 'cert-3',
    icon: '🐍',
    title: 'Python Programming Training',
    issuer: 'Internshala',
    color: '#4ade80',
    year: '2021',
    skills: ['Python Syntax', 'OOP', 'Data Manipulation'],
  },
  {
    id: 'cert-4',
    icon: '🌐',
    title: 'Web Development & Technologies Training',
    issuer: 'Online Platform',
    color: '#e879f9',
    year: '2021',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
  },
];

/* ===== CERTIFICATIONS SECTION ===== */
const Certifications = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="certifications"
      style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="glow-blob" style={{ width: 300, height: 300, background: '#00d4ff', top: '10%', right: '-5%' }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        <h2 className="section-title">Certifications</h2>
        <p className="section-subtitle">Continuous learning & growth</p>

        <div className="certs-grid">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              id={cert.id}
              className="glass-card cert-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
            >
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${cert.color}, transparent)`, borderRadius: '16px 16px 0 0' }} />

              {/* Icon */}
              <div className="cert-icon" style={{ background: `linear-gradient(135deg, ${cert.color}22, ${cert.color}0a)`, border: `1px solid ${cert.color}33`, fontSize: '1.6rem' }}>
                {cert.icon}
              </div>

              {/* Content */}
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-issuer" style={{ color: cert.color }}>{cert.issuer}</div>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.875rem' }}>
                {cert.skills.map(skill => (
                  <span
                    key={skill}
                    style={{
                      padding: '0.2rem 0.65rem',
                      background: `${cert.color}11`,
                      border: `1px solid ${cert.color}22`,
                      borderRadius: '100px',
                      fontSize: '0.72rem',
                      color: cert.color,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="cert-badge">
                <FiCheck style={{ color: '#4ade80' }} />
                <span style={{ color: '#4ade80', marginRight: '0.5rem' }}>Verified</span>
                <FiAward style={{ marginRight: '0.25rem' }} />
                {cert.year}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;
