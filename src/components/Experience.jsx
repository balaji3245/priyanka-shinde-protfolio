import { useState } from 'react';

const JOBS = [
  {
    id:      'svm',
    tab:     'SVM, Latur',
    title:   'Assistant Professor',
    company: 'SVM Polytechnic College',
    url:     'https://www.svm.edu.in',
    period:  'June 2023 — Present',
    points: [
      'Teach undergraduate courses in Programming (Java, C), DBMS, Data Structures, and Web Technologies to 100+ students per semester.',
      'Guide final-year students through complete project lifecycle — from problem definition and architecture to implementation and presentation.',
      'Conduct technical workshops and lab sessions, improving student pass rates and practical skill proficiency.',
      'Mentor students on career pathways in software engineering, competitive programming, and certifications.',
      'Design course materials, lab assignments, and assessments aligned with university curriculum and industry relevance.',
      'Organize inter-college technical events and hackathons to foster problem-solving culture among students.',
    ],
    tags: ['Java', 'C Programming', 'DBMS', 'Data Structures', 'Web Technologies', 'Project Mentorship'],
  },
];

/**
 * Experience — tab-based layout, just like the best dev portfolios.
 */
const Experience = () => {
  const [active, setActive] = useState('svm');
  const job = JOBS.find((j) => j.id === active);

  return (
    <section id="experience">
      <div className="container">
        <div className="section-heading" data-anim>
          <span className="section-heading__num">02.</span>
          <h2 className="section-heading__title">Where I've Worked</h2>
          <span className="section-heading__line" />
        </div>

        <div className="exp-layout" data-anim>
          {/* Tab list */}
          <ul className="exp-tabs" role="tablist" aria-label="Jobs">
            {JOBS.map((j) => (
              <li
                key={j.id}
                id={`tab-${j.id}`}
                role="tab"
                aria-selected={active === j.id}
                aria-controls={`panel-${j.id}`}
                className={`exp-tab ${active === j.id ? 'active' : ''}`}
                onClick={() => setActive(j.id)}
                tabIndex={active === j.id ? 0 : -1}
              >
                {j.tab}
              </li>
            ))}
          </ul>

          {/* Panel */}
          {job && (
            <div
              id={`panel-${job.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${job.id}`}
              className="exp-panel"
            >
              <h3 className="exp-panel__title">
                {job.title}{' '}
                <span>
                  @{' '}
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    {job.company}
                  </a>
                </span>
              </h3>
              <p className="exp-panel__period">{job.period}</p>

              <ul className="exp-panel__list">
                {job.points.map((point, i) => (
                  <li key={i} className="exp-panel__item">{point}</li>
                ))}
              </ul>

              <div className="exp-panel__tags">
                {job.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
