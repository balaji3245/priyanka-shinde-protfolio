import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

/**
 * Back to top — simple border button, appears after 500px scroll.
 */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      id="back-to-top-btn"
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
    >
      <FiArrowUp />
    </button>
  );
};

export default BackToTop;
