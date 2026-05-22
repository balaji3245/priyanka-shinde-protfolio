import { FiGithub, FiExternalLink } from 'react-icons/fi';

const FEATURED = [
  {
    id: 'proj-1',
    num: '01',
    emoji: '☁️',
    bg: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)',
    title: 'Cloud Based Attendance Tracking',
    desc: 'A full-stack attendance management system for educational institutions. Features real-time marking, exportable reports, and an admin dashboard built on Java EE with MySQL backend.',
    stack: ['Java', 'J2EE', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: '#',
    demo: '#',
  },
  {
    id: 'proj-2',
    num: '02',
    emoji: '🧠',
    bg: 'linear-gradient(135deg, #ede9fe 0%, #fce7f3 100%)',
    title: 'Sentiment Analysis on Movie Reviews',
    desc: 'NLP pipeline classifying IMDB reviews as positive/negative using TF-IDF + Naive Bayes. Achieves ~90% accuracy with a live prediction web interface.',
    stack: ['Python', 'scikit-learn', 'NLTK', 'Pandas', 'NumPy'],
    github: '#',
    demo: '#',
  },
  {
    id: 'proj-3',
    num: '03',
    emoji: '🔐',
    bg: 'linear-gradient(135deg, #dcfce7 0%, #dbeafe 100%)',
    title: 'Digital Image Watermarking',
    desc: 'Implements invisible LSB steganography for image copyright protection. Embeds ownership signatures without perceptible quality loss.',
    stack: ['Python', 'OpenCV', 'Pillow', 'NumPy'],
    github: '#',
    demo: '#',
  },
];

const OTHER = [
  {
    id: 'proj-4',
    icon: '📊',
    title: 'Sorting Algorithm Visualizer',
    desc: 'Interactive web app demonstrating Bubble, Merge, Quick & Heap sort with adjustable speed.',
    stack: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'proj-5',
    icon: '📋',
    title: 'Student Result Management',
    desc: 'Java Swing desktop app for storing, updating and generating result reports with role-based access.',
    stack: ['Java', 'Swing', 'MySQL', 'JDBC'],
  },
  {
    id: 'proj-6',
    icon: '💰',
    title: 'Expense Tracker CLI',
    desc: 'Command-line budget tracker in Python that categorizes spending and generates monthly summaries.',
    stack: ['Python', 'CSV', 'argparse'],
  },
];

const CodeSnippet = ({ bg }) => (
  <div style={{ position: 'absolute', inset: 0, padding: 20, fontFamily: 'monospace', fontSize: 11, lineHeight: 1.7, color: 'rgba(79,70,229,0.2)', overflow: 'hidden', userSelect: 'none', whiteSpace: 'pre' }}>
    {`const solution = (arr) => {\n  return arr.sort((a,b) => a-b)\n           .filter(n => n > 0)\n           .reduce((sum, n) => sum + n, 0);\n};\n\nclass DataProcessor {\n  predict(input) {\n    return this.model.run(input);\n  }\n}\n\nawait fetch('/api/data')\n  .then(r => r.json())\n  .then(processBatch);`}
  </div>
);

const Projects = () => (
  <section id="projects">
    <div className="section-wrap section-wrap--gray">
      <div className="container">
        <div data-anim>
          <span className="section-tag">🚀 Projects</span>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-desc">A selection of projects spanning web apps, ML models, and system tools.</p>
        </div>

        {/* Featured cards */}
        <div className="projects-featured" data-anim>
          {FEATURED.map(proj => (
            <article key={proj.id} id={proj.id} className="proj-card proj-card--featured">
              {/* Preview */}
              <div className="proj-card__preview" style={{ background: proj.bg }}>
                <CodeSnippet bg={proj.bg} />
                <span className="proj-card__preview-emoji">{proj.emoji}</span>
              </div>

              {/* Body */}
              <div className="proj-card__body">
                <div className="proj-card__number">Project {proj.num}</div>
                <h3 className="proj-card__title">{proj.title}</h3>
                <p className="proj-card__desc">{proj.desc}</p>
                <div className="proj-card__stack">
                  {proj.stack.map(t => <span key={t} className="stack-pill">{t}</span>)}
                </div>
                <div className="proj-card__links">
                  <a id={`${proj.id}-demo`} href={proj.demo} className="proj-link proj-link--primary" onClick={e => e.preventDefault()}>
                    <FiExternalLink /> Live Demo
                  </a>
                  <a id={`${proj.id}-github`} href={proj.github} className="proj-link proj-link--outline" onClick={e => e.preventDefault()}>
                    <FiGithub /> GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Other projects */}
        <div style={{ marginTop: 48 }} data-anim>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 16, letterSpacing: '-0.3px' }}>
            Other Projects
          </h3>
          <div className="projects-grid">
            {OTHER.map(proj => (
              <article key={proj.id} id={proj.id} className="proj-mini">
                <span className="proj-mini__icon">{proj.icon}</span>
                <h4 className="proj-mini__title">{proj.title}</h4>
                <p className="proj-mini__desc">{proj.desc}</p>
                <div className="proj-mini__stack">
                  {proj.stack.map(t => <span key={t} className="proj-mini__tag">{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Projects;
