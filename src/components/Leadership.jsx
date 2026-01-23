import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { leadership } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Leadership() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Don't render section if no leadership data
  if (!leadership || leadership.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  return (
    <section id="leadership" className="py-24 px-6 lg:px-8 bg-white">
      <div ref={sectionRef} className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
          >
            Leadership
          </motion.h2>

          <motion.div variants={containerVariants} className="space-y-8">
            {leadership.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={reducedMotion ? {} : { scale: 1.01, y: -2 }}
                transition={{ duration: 0.3 }}
                className="group bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {item.organization}
                  </h3>
                  <span className="text-sm text-gray-500 mt-2 md:mt-0 font-medium">
                    {item.period}
                  </span>
                </div>

                <div className="space-y-4">
                  {item.roles.map((role, index) => (
                    <div key={index}>
                      <h4 className="text-lg font-semibold text-purple-600 mb-2">
                        {role.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
