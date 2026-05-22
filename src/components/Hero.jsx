import { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

/**
 * Hero — typography-first, no gimmicks.
 * Large name, clear tagline, brief description, two CTAs.
 */
const Hero = () => {
  const heroRef = useRef(null);

  // Simple staggered fade-in on mount
  useEffect(() => {
    const children = heroRef.current?.querySelectorAll('[data-hero]');
    children?.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i * 120);
    });
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Greeting */}
      <p className="hero__greeting" data-hero>
        Hi, my name is
      </p>

      {/* Name */}
      <h1 className="hero__name" data-hero>
        Priyanka Shinde.
      </h1>

      {/* Tagline */}
      <h2 className="hero__tagline" data-hero>
        I build software &amp;&nbsp;teach&nbsp;tech.
      </h2>

      {/* Description */}
      <p className="hero__desc" data-hero>
        I'm a Computer Engineering graduate and Assistant Professor at{' '}
        <a href="https://www.svm.edu.in" target="_blank" rel="noopener noreferrer">
          SVM, Latur
        </a>
        , passionate about software development, AI/ML, and building solutions
        that solve real-world problems. Currently looking for a{' '}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
        >
          software engineering role
        </a>.
      </p>

      {/* Typing accent */}
      <p
        data-hero
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          color: 'var(--slate)',
          marginBottom: '40px',
          minHeight: '22px',
        }}
      >
        <span style={{ color: 'var(--green)', marginRight: '8px' }}>→</span>
        <TypeAnimation
          sequence={[
            'Java · Python · JavaScript',
            2000,
            'HTML · CSS · J2EE',
            2000,
            'Machine Learning · AI',
            2000,
            'Problem Solver · Teacher',
            2000,
          ]}
          wrapper="span"
          speed={55}
          repeat={Infinity}
        />
      </p>

      {/* CTAs */}
      <div className="hero__cta" data-hero>
        <a
          id="hero-contact-btn"
          href="#contact"
          className="btn btn--primary"
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
        >
          Get in touch <FiArrowRight />
        </a>
        <a
          id="hero-resume-btn"
          href="/resume.pdf"
          className="btn btn--ghost"
          download
        >
          <FiDownload /> Download resume
        </a>
      </div>
    </section>
  );
};

export default Hero;
