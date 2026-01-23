import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigation } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navigation.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const linkVariants = reducedMotion
    ? {}
    : {
        hover: { y: -2 },
        tap: { y: 0 }
      };

  return (
    <motion.nav
      initial={reducedMotion ? false : 'hidden'}
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#home"
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.98 }}
            className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors"
          >
            Adi
          </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === item.href.substring(1)
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.span
                    layoutId={reducedMotion ? undefined : 'activeSection'}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
