import { useState, useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Fallback data in case Firebase is empty or not configured yet
const FALLBACK_FEATURED = [
  {
    id: 'proj-1',
    emoji: '☁️',
    bg: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)',
    title: 'Cloud Based Attendance Tracking',
    desc: 'A full-stack attendance management system for educational institutions. Features real-time marking, exportable reports, and an admin dashboard built on Java EE with MySQL backend.',
    stack: ['Java', 'J2EE', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: '#',
    demo: '#',
    isFeatured: true
  }
];

const FALLBACK_OTHER = [
  {
    id: 'proj-4',
    icon: '📊',
    title: 'Sorting Algorithm Visualizer',
    desc: 'Interactive web app demonstrating Bubble, Merge, Quick & Heap sort with adjustable speed.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    isFeatured: false
  }
];

const CodeSnippet = ({ bg }) => (
  <div style={{ position: 'absolute', inset: 0, padding: 20, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.7, color: 'rgba(79,70,229,0.2)', overflow: 'hidden', userSelect: 'none', whiteSpace: 'pre' }}>
    {`const solution = (arr) => {\n  return arr.sort((a,b) => a-b)\n           .filter(n => n > 0)\n           .reduce((sum, n) => sum + n, 0);\n};\n\nclass DataProcessor {\n  predict(input) {\n    return this.model.run(input);\n  }\n}\n\nawait fetch('/api/data')\n  .then(r => r.json())\n  .then(processBatch);`}
  </div>
);

const Projects = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [otherProjects, setOtherProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        if (querySnapshot.empty) {
          // Use fallback if DB is empty
          setFeaturedProjects(FALLBACK_FEATURED);
          setOtherProjects(FALLBACK_OTHER);
        } else {
          const projs = [];
          querySnapshot.forEach((doc) => {
            projs.push({ id: doc.id, ...doc.data() });
          });
          
          setFeaturedProjects(projs.filter(p => p.isFeatured));
          setOtherProjects(projs.filter(p => !p.isFeatured));
        }
      } catch (err) {
        console.error("Error fetching projects from Firebase, using fallback", err);
        setFeaturedProjects(FALLBACK_FEATURED);
        setOtherProjects(FALLBACK_OTHER);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects">
      <div className="section-wrap section-wrap--gray">
        <div className="container">
          <div data-anim>
            <span className="section-tag">🚀 Projects</span>
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
                    <div className="proj-card__preview" style={{ background: proj.bg || 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)' }}>
                      <CodeSnippet bg={proj.bg} />
                      <span className="proj-card__preview-emoji">{proj.emoji || '🚀'}</span>
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
                        <span className="proj-mini__icon">{proj.emoji || '📁'}</span>
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
