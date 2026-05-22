const SKILL_GROUPS = [
  {
    title: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'C / C++', 'SQL'],
  },
  {
    title: 'Web & Backend',
    items: ['HTML5', 'CSS3', 'J2EE / Servlets', 'JSP', 'JDBC', 'REST APIs'],
  },
  {
    title: 'Database',
    items: ['MySQL', 'Database Design', 'SQL Queries', 'Normalization'],
  },
  {
    title: 'AI / ML',
    items: ['scikit-learn', 'NumPy', 'Pandas', 'Data Preprocessing', 'NLP Basics'],
  },
  {
    title: 'CS Concepts',
    items: ['OOP', 'Java Collections', 'Data Structures', 'Algorithms', 'Design Patterns'],
  },
  {
    title: 'Tools',
    items: ['Git & GitHub', 'VS Code', 'Eclipse IDE', 'IntelliJ IDEA', 'Jupyter Notebook'],
  },
];

/**
 * Skills — simple categorized list, no progress bars (those aren't meaningful to recruiters).
 */
const Skills = () => (
  <section id="skills">
    <div className="container">
      <div className="section-heading" data-anim>
        <span className="section-heading__num">04.</span>
        <h2 className="section-heading__title">Skills</h2>
        <span className="section-heading__line" />
      </div>

      <div className="skills-section-grid" data-anim>
        {SKILL_GROUPS.map((group) => (
          <div key={group.title} className="skill-group">
            <p className="skill-group__title">{group.title}</p>
            <ul className="skill-group__items">
              {group.items.map((item) => (
                <li key={item} className="skill-item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
