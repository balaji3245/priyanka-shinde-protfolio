import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';

/* ===== ANIMATED CANVAS BACKGROUND ===== */
const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#7c3aed';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mouseX = canvas.width / 2, mouseY = canvas.height / 2;
    const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', onMouseMove);

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = '#00d4ff';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        });
        p.update();
        p.draw();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      style={{ opacity: 0.7 }}
    />
  );
};

/* ===== HERO SECTION ===== */
const Hero = () => {
  return (
    <section id="home" className="hero">
      <HeroCanvas />

      {/* Background glows */}
      <div className="glow-blob" style={{ width: 500, height: 500, background: '#00d4ff', top: '10%', left: '-5%' }} />
      <div className="glow-blob" style={{ width: 400, height: 400, background: '#7c3aed', bottom: '10%', right: '-5%' }} />
      <div className="grid-bg" />

      <div className="hero-content">
        {/* Left: Text */}
        <div>
          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-dot" />
            Available for Opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Priyanka<br />
            Nandkumar<br />
            Shinde
          </motion.h1>

          {/* Role */}
          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Aspiring Software Engineer · Assistant Professor
          </motion.p>

          {/* Typing animation */}
          <motion.div
            className="hero-typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TypeAnimation
              sequence={[
                '$ java Developer',
                1500,
                '$ python Enthusiast',
                1500,
                '$ web Developer',
                1500,
                '$ AI/ML Explorer',
                1500,
                '$ Problem Solver',
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            Passionate about software development, problem-solving, and building
            modern technology solutions. Computer Engineering graduate with 2+ years
            of teaching experience, actively seeking software engineering roles.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <a
              href="#contact"
              id="hero-contact-btn"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>
                <FiArrowRight />
                Get In Touch
              </span>
            </a>
            <a
              href="/resume.pdf"
              id="hero-resume-btn"
              className="btn-outline"
              download
            >
              <FiDownload />
              Download Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="https://github.com/"
              id="hero-github-link"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <FiGithub />
            </a>
            <a
              href="https://linkedin.com/in/"
              id="hero-linkedin-link"
              className="social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin />
            </a>
            <a
              href="mailto:priyanka.shinde@email.com"
              id="hero-email-link"
              className="social-icon"
              aria-label="Send Email"
            >
              <FiMail />
            </a>
          </motion.div>
        </div>

        {/* Right: Avatar */}
        <motion.div
          className="hero-avatar-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div style={{ position: 'relative' }}>
            {/* Outer glow */}
            <div className="avatar-glow" />

            {/* Spinning ring */}
            <div className="avatar-ring">
              <div className="avatar-inner">
                <span className="avatar-initials">PS</span>
              </div>
            </div>

            {/* Floating badges */}
            <div className="floating-badge top-right">
              <span className="badge-icon">☕</span>
              Java Developer
            </div>
            <div className="floating-badge bottom-left">
              <span className="badge-icon">🤖</span>
              AI Enthusiast
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          zIndex: 2,
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--neon-blue), transparent)' }} />
      </motion.div>
    </section>
  );
};

export default Hero;
