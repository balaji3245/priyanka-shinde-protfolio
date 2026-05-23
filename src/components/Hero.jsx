import { useEffect, useRef } from 'react';
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
          <h1 className="hero__name" data-hero style={{ fontSize: 'clamp(40px, 6vw, 64px)' }}>
            Priyanka<br />Nandkumar Shinde
          </h1>

          {/* Role with gradient */}
          <h2 className="hero__role" data-hero>
            ASPIRING SOFTWARE ENGINEER
          </h2>

          {/* Subheading */}
          <div className="hero__type-line" data-hero>
            <span style={{ color: 'var(--gray-900)', fontWeight: 600 }}>Motivated Computer Engineering graduate</span> with 2+ years of teaching experience.
          </div>

          {/* Description */}
          <p className="hero__desc" data-hero>
            Motivated Computer Engineering graduate with <strong>2+ years of teaching experience</strong>, 
            seeking an opportunity in the IT industry to apply technical and problem-solving skills.
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
              { icon: <FiLinkedin />, href: 'https://in.linkedin.com/in/priyankanandkumarshinde', label: 'LinkedIn', id: 'hero-linkedin' },
              { icon: <FiMail />, href: 'mailto:priyankanshinde2019@gmail.com', label: 'Email', id: 'hero-email' },
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
          {/* Clean status badge */}
          <div className="hero__photo-badge">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#18181b' }}>Available Now</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
