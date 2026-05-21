import { useEffect, useRef } from 'react';

/* ===== CUSTOM CURSOR ===== */
const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor) {
        cursor.style.left = mouseX - 6 + 'px';
        cursor.style.top = mouseY - 6 + 'px';
      }
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (follower) {
        follower.style.left = followerX - 18 + 'px';
        follower.style.top = followerY - 18 + 'px';
      }
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    animate();

    // Scale on hover
    const handleHover = () => {
      if (cursor) cursor.style.transform = 'scale(2)';
      if (follower) follower.style.transform = 'scale(1.5)';
    };
    const handleLeave = () => {
      if (cursor) cursor.style.transform = 'scale(1)';
      if (follower) follower.style.transform = 'scale(1)';
    };

    document.querySelectorAll('a, button, [class*="btn"], .tech-tag, .social-icon, .float-social-btn, .back-to-top, .nav-link, .hamburger').forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
};

export default Cursor;
