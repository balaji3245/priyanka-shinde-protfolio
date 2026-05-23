import { FiMapPin } from 'react-icons/fi';

const About = () => (
  <section id="about">
    <div className="section-wrap section-wrap--gray">
      <div className="container">
        <div className="about-layout">
          {/* Text */}
          <div data-anim>
            <span className="section-tag">About</span>
            <h2 className="section-title">Passionate engineer &amp; dedicated educator</h2>
            <p className="section-desc">
              Building software by day, shaping engineers by calling.
            </p>

            <div className="about-body">
              <p>
                I'm <strong>Priyanka Shinde</strong>, a Computer Engineering graduate from
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
              <div className="about-card__name">Priyanka Shinde</div>
              <div className="about-card__role">ASPIRING SOFTWARE ENGINEER</div>

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

              <div className="about-card__location" style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                <FiMapPin size={14} />
                Latur, Maharashtra, India
              </div>

              {/* Status badge */}
              <div style={{
                marginTop: 16,
                padding: '8px 12px',
                background: 'var(--gray-50)',
                border: '1px solid var(--gray-200)',
                borderRadius: 8,
                fontSize: 12,
                color: 'var(--gray-700)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Open to Opportunities
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
