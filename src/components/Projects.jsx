import { FiGithub, FiExternalLink } from 'react-icons/fi';

const FEATURED = [
  {
    id: 'fp-1',
    label: 'Featured Project',
    emoji: '☁️',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%)',
    title: 'Cloud Based Attendance Tracking',
    desc: 'A full-stack attendance management system designed for educational institutions. Instructors can mark, view, and export attendance records in real time. Built on a Java EE backend with a MySQL database and a responsive HTML/CSS/JS frontend.',
    tech: ['Java', 'J2EE', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: '#',
    demo:   '#',
  },
  {
    id: 'fp-2',
    label: 'Featured Project',
    emoji: '🧠',
    gradient: 'linear-gradient(135deg, #2d1b4e 0%, #1a0d2e 100%)',
    title: 'Sentiment Analysis on Movie Reviews',
    desc: 'An NLP pipeline that classifies IMDB movie reviews as positive or negative using a Naive Bayes classifier trained on TF-IDF features. Achieves ~90% accuracy on the test set. Includes a simple web interface for live predictions.',
    tech: ['Python', 'scikit-learn', 'NLTK', 'Pandas', 'NumPy'],
    github: '#',
    demo:   '#',
  },
  {
    id: 'fp-3',
    label: 'Featured Project',
    emoji: '🔐',
    gradient: 'linear-gradient(135deg, #0d3b2e 0%, #051f18 100%)',
    title: 'Digital Image Watermarking',
    desc: 'Implements both visible and invisible watermarking techniques to protect digital images from unauthorized use. Uses LSB (Least Significant Bit) steganography to embed ownership data without perceptible quality loss.',
    tech: ['Python', 'OpenCV', 'Pillow', 'NumPy'],
    github: '#',
    demo:   '#',
  },
];

const OTHER = [
  {
    id: 'op-1',
    title: 'Sorting Algorithm Visualizer',
    desc: 'An interactive web app that visually demonstrates Bubble, Merge, Quick, and Heap sort with adjustable speed controls.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: '#',
    demo:   '#',
  },
  {
    id: 'op-2',
    title: 'Student Result Management',
    desc: 'A Java Swing desktop application to store, update, and generate result reports for students with role-based access.',
    tech: ['Java', 'Swing', 'MySQL', 'JDBC'],
    github: '#',
    demo:   '#',
  },
  {
    id: 'op-3',
    title: 'Expense Tracker CLI',
    desc: 'A command-line budget tracker built in Python that categorizes spending and generates monthly summary reports.',
    tech: ['Python', 'CSV', 'argparse'],
    github: '#',
    demo:   '#',
  },
];

/* Tiny code pattern for project previews */
const CodePattern = ({ gradient }) => (
  <div
    className="fp-image__wrap"
    style={{ background: gradient }}
    aria-hidden="true"
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        lineHeight: '1.6',
        color: 'rgba(100,255,218,0.12)',
        padding: '20px',
        overflow: 'hidden',
        userSelect: 'none',
        wordBreak: 'break-all',
      }}
    >
      {`function main() {\n  const data = fetch(api);\n  return process(data);\n}\n\nclass Model {\n  constructor(params) {\n    this.params = params;\n  }\n  predict(x) {\n    return this.weights * x;\n  }\n}\n\nconst result = new Model(config).predict(input);\nconsole.log(result);`}
    </div>
  </div>
);

/**
 * Projects — featured (large, alternating) + other projects (small card grid).
 */
const Projects = () => (
  <section id="projects">
    <div className="container--wide">
      <div className="section-heading" style={{ padding: '0 var(--side-padding)' }} data-anim>
        <span className="section-heading__num">05.</span>
        <h2 className="section-heading__title">Things I've Built</h2>
        <span className="section-heading__line" />
      </div>

      {/* Featured */}
      <div style={{ padding: '0 var(--side-padding)' }}>
        {FEATURED.map((proj) => (
          <article key={proj.id} id={proj.id} className="featured-project" data-anim>
            {/* Image */}
            <div className="fp-image">
              <CodePattern gradient={proj.gradient} />
            </div>

            {/* Content */}
            <div className="fp-content">
              <p className="fp-label">{proj.label}</p>
              <h3 className="fp-title">{proj.title}</h3>

              <div className="fp-desc">{proj.desc}</div>

              <div className="fp-tech">
                {proj.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              <div className="fp-links">
                <a
                  id={`${proj.id}-github`}
                  href={proj.github}
                  className="fp-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  onClick={(e) => e.preventDefault()}
                >
                  <FiGithub />
                </a>
                <a
                  id={`${proj.id}-demo`}
                  href={proj.demo}
                  className="fp-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                  onClick={(e) => e.preventDefault()}
                >
                  <FiExternalLink />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Other projects heading */}
      <div style={{ textAlign: 'center', padding: '0 var(--side-padding)', marginTop: '80px' }} data-anim>
        <h3
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '20px',
            color: 'var(--slate-white)',
            marginBottom: '8px',
          }}
        >
          Other Noteworthy Projects
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--slate)', fontFamily: 'var(--font-mono)' }}>
          view the archive
        </p>
      </div>

      {/* Grid */}
      <div className="projects-grid" style={{ padding: '0 var(--side-padding)' }} data-anim>
        {OTHER.map((proj) => (
          <article key={proj.id} id={proj.id} className="project-card">
            <div className="project-card__top">
              <span className="project-card__folder" aria-hidden="true">📁</span>
              <div className="project-card__links">
                <a
                  id={`${proj.id}-github`}
                  href={proj.github}
                  className="project-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  onClick={(e) => e.preventDefault()}
                >
                  <FiGithub />
                </a>
                <a
                  id={`${proj.id}-demo`}
                  href={proj.demo}
                  className="project-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                  onClick={(e) => e.preventDefault()}
                >
                  <FiExternalLink />
                </a>
              </div>
            </div>
            <h3 className="project-card__title">{proj.title}</h3>
            <p className="project-card__desc">{proj.desc}</p>
            <div className="project-card__tech">
              {proj.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
