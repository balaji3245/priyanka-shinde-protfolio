import { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiCode, FiFolder } from 'react-icons/fi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Fallback data in case Firebase is empty or not configured yet
const FALLBACK_FEATURED = [
  {
    id: 'proj-1',
    emoji: '',
    bg: 'var(--gray-100)',
    title: 'Cloud Based Attendance Tracking',
    desc: 'Developed a comprehensive cloud-based attendance management system using modern web technologies. Designed the architecture to support real-time attendance logging, automated report generation, and an intuitive administrative dashboard to streamline institutional operations.',
    stack: ['Java', 'J2EE', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    github: '#',
    demo: '#',
    isFeatured: true
  }
];

const FALLBACK_OTHER = [
  {
    id: 'proj-2',
    icon: '',
    title: 'Sentiment Analysis on Movie Reviews',
    desc: 'Built and trained a machine learning model for sentiment classification using Python. Processed natural language data to accurately classify user reviews as positive or negative, leveraging core NLP techniques and statistical modeling.',
    stack: ['Python', 'Machine Learning', 'NLP', 'Data Processing'],
    isFeatured: false
  },
  {
    id: 'proj-3',
    icon: '',
    title: 'Digital Image Watermarking',
    desc: 'Implemented advanced digital image security and copyright protection techniques. Developed algorithms to embed and extract watermarks, ensuring image authenticity and preventing unauthorized duplication of digital assets.',
    stack: ['Python', 'Image Processing', 'Security Algorithms'],
    isFeatured: false
  }
];

const CodeSnippet = ({ bg }) => (
  <div style={{ position: 'absolute', inset: 0, padding: 20, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.7, color: 'var(--gray-400)', overflow: 'hidden', userSelect: 'none', whiteSpace: 'pre' }}>
    {`const solution = (arr) => {\n  return arr.sort((a,b) => a-b)\n           .filter(n => n > 0)\n           .reduce((sum, n) => sum + n, 0);\n};\n\nclass DataProcessor {\n  predict(input) {\n    return this.model.run(input);\n  }\n}\n\nawait fetch('/api/data')\n  .then(r => r.json())\n  .then(processBatch);`}
  </div>
);

const Projects = () => {
  const [featuredProjects, setFeaturedProjects] = useState(FALLBACK_FEATURED);
  const [otherProjects, setOtherProjects] = useState(FALLBACK_OTHER);
  const [loading, setLoading] = useState(false);

  return (
    <section id="projects">
      <div className="section-wrap section-wrap--gray">
        <div className="container">
          <div data-anim>
            <span className="section-tag">Projects</span>
            <h2 className="section-title">Things I've built</h2>
            <p className="section-desc">A selection of projects spanning web apps, ML models, and system tools.</p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading projects...</div>
          ) : (
            <>
              {/* Featured cards */}
              <div className="projects-featured" data-anim>
                {featuredProjects.map((proj, index) => (
                  <article key={proj.id} id={proj.id} className="proj-card proj-card--featured">
                    {/* Preview */}
                    <div className="proj-card__preview" style={{ background: proj.bg || 'var(--gray-100)' }}>
                      <CodeSnippet bg={proj.bg} />
                      <span className="proj-card__preview-emoji" style={{ color: 'var(--gray-400)' }}><FiCode size={40} /></span>
                    </div>

                    {/* Body */}
                    <div className="proj-card__body">
                      <div className="proj-card__number">Project 0{index + 1}</div>
                      <h3 className="proj-card__title">{proj.title}</h3>
                      <p className="proj-card__desc">{proj.desc}</p>
                      <div className="proj-card__stack">
                        {Array.isArray(proj.stack) && proj.stack.map(t => <span key={t} className="stack-pill">{t}</span>)}
                      </div>
                      <div className="proj-card__links">
                        {proj.demo && (
                          <a id={`${proj.id}-demo`} href={proj.demo} target="_blank" rel="noreferrer" className="proj-link proj-link--primary">
                            <FiExternalLink /> Live Demo
                          </a>
                        )}
                        {proj.github && (
                          <a id={`${proj.id}-github`} href={proj.github} target="_blank" rel="noreferrer" className="proj-link proj-link--outline">
                            <FiGithub /> GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Other projects */}
              {otherProjects.length > 0 && (
                <div style={{ marginTop: 48 }} data-anim>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 16, letterSpacing: '-0.3px' }}>
                    Other Projects
                  </h3>
                  <div className="projects-grid">
                    {otherProjects.map(proj => (
                      <article key={proj.id} id={proj.id} className="proj-mini">
                        <span className="proj-mini__icon" style={{ color: 'var(--gray-500)' }}><FiFolder /></span>
                        <h4 className="proj-mini__title">{proj.title}</h4>
                        <p className="proj-mini__desc">{proj.desc}</p>
                        <div className="proj-mini__stack">
                          {Array.isArray(proj.stack) && proj.stack.map(t => <span key={t} className="proj-mini__tag">{t}</span>)}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
