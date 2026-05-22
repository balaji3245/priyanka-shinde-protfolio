const About = () => (
  <section id="about">
    <div className="section-wrap section-wrap--gray">
      <div className="container">
        <div className="about-layout">
          {/* Text */}
          <div data-anim>
            <span className="section-tag">👋 About Me</span>
            <h2 className="section-title">Passionate engineer &amp; dedicated educator</h2>
            <p className="section-desc">
              Building software by day, shaping engineers by calling.
            </p>

            <div className="about-body">
              <p>
                I'm <strong>Priyanka Nandkumar Shinde</strong>, a Computer Engineering graduate from
                DBATU Lonere and a full-time Assistant Professor at SVM Polytechnic College, Latur.
                With a CGPA of 7.75 and hands-on project experience, I bring both academic depth
                and practical skills to everything I build.
              </p>
              <p>
                Over the past 2+ years of teaching, I've mastered the art of <strong>breaking down
                complex concepts</strong> — a skill that makes me a stronger developer and collaborator.
                I've guided 100+ students through programming, DBMS, and final-year projects.
              </p>
              <p>
                I'm actively seeking a <strong>software engineering role</strong> where I can apply my
                skills in Java, Python, web technologies, and AI/ML to build products that matter.
              </p>
            </div>

            <div className="about-chips">
              {['Java', 'Python', 'JavaScript', 'MySQL', 'HTML/CSS', 'J2EE', 'Machine Learning', 'OOP', 'Data Structures', 'Git'].map(s => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>

          {/* Card */}
          <div data-anim>
            <div className="about-card">
              <div className="about-card__avatar" style={{ background: 'none', padding: 0, overflow: 'hidden' }}>
                <img src="/avtar.png" alt="Priyanka Shinde" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <div className="about-card__name">Priyanka N. Shinde</div>
              <div className="about-card__role">Software Engineer · Educator</div>

              <div className="about-card__stats">
                {[
                  { num: '2+',   label: 'Yrs Teaching' },
                  { num: '7.75', label: 'B.Tech CGPA' },
                  { num: '3+',   label: 'Projects' },
                  { num: '100+', label: 'Students' },
                ].map(s => (
                  <div key={s.label} className="about-stat">
                    <div className="about-stat__num">{s.num}</div>
                    <div className="about-stat__label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="about-card__location">
                📍 Latur, Maharashtra, India
              </div>

              {/* Status badge */}
              <div style={{
                marginTop: 16,
                padding: '10px 16px',
                background: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.2)',
                borderRadius: 10,
                fontSize: 13,
                color: '#16a34a',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'blink 2s infinite' }} />
                Open to Work — Available Immediately
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
