import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    id: 'proj-1',
    number: '01',
    emoji: '☁️',
    gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    title: 'Cloud Based Attendance Tracking',
    desc: 'A comprehensive cloud-based attendance management system for educational institutions. Features real-time tracking, automated reports, and a student dashboard using modern web technologies.',
    stack: ['Java', 'J2EE', 'MySQL', 'HTML/CSS', 'JavaScript', 'Cloud'],
    highlights: ['Real-time Tracking', 'Auto Reports', 'Admin Dashboard'],
  },
  {
    id: 'proj-2',
    number: '02',
    emoji: '🧠',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    title: 'Sentiment Analysis on Movie Reviews',
    desc: 'A machine learning model for classifying movie review sentiments (positive/negative/neutral) using NLP techniques. Built with Python, scikit-learn, and NLTK for text processing.',
    stack: ['Python', 'scikit-learn', 'NLTK', 'Pandas', 'NumPy', 'ML'],
    highlights: ['NLP Processing', '90%+ Accuracy', 'Dataset Analysis'],
  },
  {
    id: 'proj-3',
    number: '03',
    emoji: '🔐',
    gradient: 'linear-gradient(135deg, #10b981, #0ea5e9)',
    title: 'Digital Image Watermarking',
    desc: 'An image security system implementing invisible digital watermarking for copyright protection. Uses image processing algorithms to embed and extract ownership signatures from images.',
    stack: ['Python', 'OpenCV', 'PIL', 'NumPy', 'Image Processing'],
    highlights: ['Invisible Watermark', 'Copyright Protection', 'Image Security'],
  },
];

/* ===== PROJECTS SECTION ===== */
const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" style={{ padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-blob" style={{ width: 400, height: 400, background: '#7c3aed', top: '20%', right: '-10%' }} />
      <div className="glow-blob" style={{ width: 300, height: 300, background: '#00d4ff', bottom: '10%', left: '-5%' }} />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Things I've built</p>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              id={project.id}
              className="glass-card project-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Preview */}
              <div className="project-preview">
                <div
                  className="project-preview-bg"
                  style={{ background: project.gradient }}
                />
                <div className="project-preview-overlay" />
                <div className="project-preview-icon">{project.emoji}</div>
                <div className="project-number">{project.number}</div>

                {/* Highlights */}
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  display: 'flex',
                  gap: '0.4rem',
                  flexWrap: 'wrap',
                }}>
                  {project.highlights.map(h => (
                    <span key={h} style={{
                      padding: '0.2rem 0.6rem',
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '6px',
                      fontSize: '0.7rem',
                      color: 'rgba(255,255,255,0.8)',
                    }}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>

                {/* Stack badges */}
                <div className="project-stack">
                  {project.stack.map(tech => (
                    <span key={tech} className="stack-badge">{tech}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="project-actions">
                  <a href="#" id={`${project.id}-demo`} className="project-btn primary" onClick={e => e.preventDefault()}>
                    <FiExternalLink /> Live Demo
                  </a>
                  <a href="#" id={`${project.id}-github`} className="project-btn outline" onClick={e => e.preventDefault()}>
                    <FiGithub /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
