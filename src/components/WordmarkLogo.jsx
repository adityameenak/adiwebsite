import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useScrollTo } from '../hooks/useLenis';

/**
 * WordmarkLogo - Fixed top-left logo
 *
 * Plain sans font, no fancy wordmark styling.
 * Just "Adi" in the base font.
 */
export default function WordmarkLogo() {
  const reducedMotion = useReducedMotion();
  const { scrollTo } = useScrollTo();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollTo('#home', { offset: 0, duration: 1.5 });
    } else {
      navigate('/');
    }
  };

  return (
    <motion.a
      href="/"
      onClick={handleClick}
      className="fixed top-6 left-6 sm:top-8 sm:left-8 lg:top-10 lg:left-12 z-50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: reducedMotion ? 0.3 : 0.6,
        delay: reducedMotion ? 0 : 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <span
        className="font-sans font-bold text-lg sm:text-xl text-neutral-900
                   hover:text-accent transition-colors duration-200
                   select-none cursor-pointer"
      >
        Adi
      </span>
    </motion.a>
  );
}
