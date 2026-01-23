import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * StickyScroll - Creates a sticky left column while right content scrolls
 * Lando Norris-inspired scroll experience with progress indicator
 *
 * @param {string} title - Section title (sticky)
 * @param {string} subtitle - Section subtitle (sticky)
 * @param {Array} items - Array of content items to scroll through
 * @param {Function} renderItem - Function to render each item
 */
export function StickyScroll({
  title,
  subtitle,
  items,
  renderItem,
  className = '',
}) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Calculate which item is active based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const newIndex = Math.min(
        Math.floor(latest * items.length),
        items.length - 1
      );
      setActiveIndex(Math.max(0, newIndex));
    });
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Desktop: Sticky two-column layout */}
      <div className="hidden lg:grid lg:grid-cols-5 lg:gap-12">
        {/* Sticky left column */}
        <div className="lg:col-span-2">
          <div className="sticky top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
              {subtitle && (
                <p className="text-gray-500 text-lg mb-8">{subtitle}</p>
              )}

              {/* Progress indicator */}
              {!reducedMotion && (
                <div className="relative">
                  {/* Background track */}
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-gray-200 rounded-full" />
                  {/* Active progress */}
                  <motion.div
                    className="absolute left-0 top-0 w-0.5 bg-purple-600 rounded-full origin-top"
                    style={{ scaleY: progress, height: '100%' }}
                  />

                  {/* Item indicators */}
                  <div className="space-y-4 pl-6">
                    {items.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3"
                        animate={{
                          opacity: activeIndex === index ? 1 : 0.4,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            activeIndex === index
                              ? 'bg-purple-600'
                              : 'bg-gray-300'
                          }`}
                        />
                        <span
                          className={`text-sm font-medium transition-colors duration-300 ${
                            activeIndex === index
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                        >
                          {item.company || item.title || `Item ${index + 1}`}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Scrolling right column */}
        <div className="lg:col-span-3 space-y-8">
          {items.map((item, index) => (
            <StickyScrollItem
              key={index}
              item={item}
              index={index}
              isActive={activeIndex === index}
              renderItem={renderItem}
            />
          ))}
        </div>
      </div>

      {/* Mobile: Standard stacked layout */}
      <div className="lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && <p className="text-gray-500 text-lg">{subtitle}</p>}
        </motion.div>

        <div className="space-y-6">
          {items.map((item, index) => (
            <StickyScrollItem
              key={index}
              item={item}
              index={index}
              isActive={true}
              renderItem={renderItem}
              isMobile
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * StickyScrollItem - Individual item in the sticky scroll section
 */
function StickyScrollItem({ item, index, isActive, renderItem, isMobile = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: isMobile ? index * 0.1 : 0 }}
      className={!isMobile && !reducedMotion ? (isActive ? 'opacity-100' : 'opacity-50') : ''}
      style={{
        transition: 'opacity 0.3s ease',
      }}
    >
      {renderItem(item, index, isActive)}
    </motion.div>
  );
}
