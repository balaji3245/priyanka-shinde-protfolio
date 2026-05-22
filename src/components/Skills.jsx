const SKILL_CATS = [
  { icon: '☕', title: 'Programming Languages', skills: ['Java', 'Python', 'JavaScript', 'C / C++', 'SQL'] },
  { icon: '🌐', title: 'Web & Backend',         skills: ['HTML5', 'CSS3', 'J2EE / Servlets', 'JSP', 'JDBC', 'REST APIs'] },
  { icon: '🗄️', title: 'Databases',              skills: ['MySQL', 'Database Design', 'SQL Queries', 'Normalization'] },
  { icon: '🤖', title: 'AI / Machine Learning',  skills: ['scikit-learn', 'NumPy', 'Pandas', 'NLP Basics', 'Data Preprocessing'] },
  { icon: '🧩', title: 'CS Concepts',            skills: ['OOP', 'Java Collections', 'Data Structures', 'Algorithms', 'Design Patterns'] },
  { icon: '🛠️', title: 'Tools & Workflow',       skills: ['Git & GitHub', 'VS Code', 'Eclipse IDE', 'IntelliJ IDEA', 'Jupyter Notebook'] },
];

const Skills = () => (
  <section id="skills">
    <div className="section-wrap">
      <div className="container">
        <div data-anim>
          <span className="section-tag">⚡ Skills</span>
          <h2 className="section-title">Technologies I work with</h2>
          <p className="section-desc">A versatile stack spanning programming, web, databases, and AI/ML.</p>
        </div>

        <div className="skills-layout" data-anim>
          {SKILL_CATS.map(cat => (
            <div key={cat.title} className="skill-cat-card">
              <div className="skill-cat-header">
                <div className="skill-cat-icon">{cat.icon}</div>
                <div className="skill-cat-title">{cat.title}</div>
              </div>
              <div className="skill-tags">
                {cat.skills.map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
