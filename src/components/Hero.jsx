import { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Hero = () => {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-hero]');
    els?.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 100);
    });
  }, []);

  return (
    <section id="home">
      <div ref={ref} className="hero hero--two-col">

        {/* ── LEFT: Text content ── */}
        <div className="hero__content">
          {/* Eyebrow badge */}
          <div className="hero__eyebrow" data-hero>
            <span className="hero__eyebrow-dot" />
            Open to Software Engineering Roles
          </div>

          {/* Name */}
          <h1 className="hero__name" data-hero>
            Priyanka<br />Nandkumar Shinde
          </h1>

          {/* Role with gradient */}
          <h2 className="hero__role" data-hero>
            Software Engineer &amp; Educator
          </h2>

          {/* Typing */}
          <div className="hero__type-line" data-hero>
            <span className="hero__type-label">Skilled in</span>
            <TypeAnimation
              sequence={[
                'Java Development', 2000,
                'Python & ML', 2000,
                'Web Technologies', 2000,
                'Problem Solving', 2000,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              style={{ color: 'var(--indigo-600)', fontWeight: 600 }}
            />
          </div>

          {/* Description */}
          <p className="hero__desc" data-hero>
            Computer Engineering graduate with <strong>2+ years of teaching experience</strong> as
            an Assistant Professor. Passionate about building scalable software, exploring AI/ML,
            and creating technology that makes a real difference.
          </p>

          {/* CTAs */}
          <div className="hero__actions" data-hero>
            <a
              id="hero-contact-btn"
              href="#contact"
              className="btn-primary"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Get In Touch <FiArrowRight />
            </a>
            <a
              id="hero-resume-btn"
              href="/resume.pdf"
              className="btn-secondary"
              download
            >
              <FiDownload /> Download Resume
            </a>
          </div>

          {/* Social row */}
          <div data-hero style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
            {[
              { icon: <FiGithub />, href: 'https://github.com/', label: 'GitHub', id: 'hero-github' },
              { icon: <FiLinkedin />, href: 'https://linkedin.com/in/priyanka-shinde', label: 'LinkedIn', id: 'hero-linkedin' },
              { icon: <FiMail />, href: 'mailto:priyankashinde@email.com', label: 'Email', id: 'hero-email' },
            ].map(s => (
              <a
                key={s.id}
                id={s.id}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 40, height: 40,
                  border: '1px solid var(--gray-200)',
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gray-600)',
                  fontSize: 18,
                  background: 'white',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--indigo-500)';
                  e.currentTarget.style.color = 'var(--indigo-600)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--gray-200)';
                  e.currentTarget.style.color = 'var(--gray-600)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="hero__stats" data-hero>
            {[
              { num: '2+',    label: 'Years Teaching' },
              { num: 'CGPA 7.75', label: 'Academic Score' },
              { num: '3+',    label: 'Major Projects' },
              { num: '100+',  label: 'Students Mentored' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="hero__stat-num">{stat.num}</div>
                <div className="hero__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Avatar photo ── */}
        <div className="hero__photo-wrap" data-hero>
          <div className="hero__photo-ring">
            <img
              src="/avtar.png"
              alt="Priyanka Nandkumar Shinde"
              className="hero__photo"
            />
          </div>
          {/* Floating badge */}
          <div className="hero__photo-badge">
            <span style={{ fontSize: 18 }}>👩‍💻</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>Available Now</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>Open to Work</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
