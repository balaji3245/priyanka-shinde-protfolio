/**
 * About — two-column layout with photo placeholder and skills list.
 * Real dev portfolios keep this personal and concise.
 */
const About = () => (
  <section id="about">
    <div className="container">
      {/* Section heading */}
      <div className="section-heading" data-anim>
        <span className="section-heading__num">01.</span>
        <h2 className="section-heading__title">About Me</h2>
        <span className="section-heading__line" />
      </div>

      <div className="about-grid" data-anim>
        {/* Bio */}
        <div className="about-text">
          <p>
            Hello! I'm Priyanka, a software engineer and educator based in Latur, Maharashtra.
            I completed my <strong style={{ color: 'var(--slate-white)' }}>B.Tech in Computer Engineering</strong>{' '}
            from DBATU Lonere with a CGPA of 7.75, and have been working as an{' '}
            <strong style={{ color: 'var(--slate-white)' }}>Assistant Professor</strong> since 2023.
          </p>
          <p>
            My journey into tech started with a love for problem-solving. Over the years, I've
            worked on projects spanning cloud systems, machine learning, and web development.
            I enjoy bridging the gap between theory and real-world implementation — whether that's
            teaching it to students or building it myself.
          </p>
          <p>
            I'm currently looking to transition fully into a{' '}
            <strong style={{ color: 'var(--slate-white)' }}>software engineering role</strong>{' '}
            where I can contribute meaningfully to product development. I'm particularly interested in
            backend systems, AI/ML applications, and full-stack web development.
          </p>
          <p>Here are a few technologies I've been working with recently:</p>

          <ul className="skills-list">
            {[
              'Java', 'Python', 'JavaScript',
              'HTML & CSS', 'MySQL', 'J2EE / Servlets',
              'scikit-learn', 'OOP & Design Patterns',
            ].map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* Photo placeholder */}
        <div className="about-photo">
          <div className="about-photo__img" aria-hidden="true">
            <span className="avatar-text">PS</span>
          </div>
          <div className="about-photo__frame" aria-hidden="true" />
        </div>
      </div>
    </div>
  </section>
);

export default About;
