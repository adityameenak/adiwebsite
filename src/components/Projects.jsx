import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Projects() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.15,
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
        hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  return (
    <section id="projects" className="py-24 px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-purple-100/40 to-transparent blur-3xl pointer-events-none" />

      <div ref={sectionRef} className="max-w-6xl mx-auto relative">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Projects
            </h2>
            <p className="text-gray-500 max-w-2xl">
              Technical projects focused on sustainability, energy systems, and process optimization.
            </p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                variants={itemVariants}
                className="group relative"
              >
                <ProjectCard project={project} reducedMotion={reducedMotion} index={index} />
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, reducedMotion, index }) {
  return (
    <motion.div
      whileHover={reducedMotion ? {} : { y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-full"
    >
      <div className="relative h-full bg-white rounded-xl p-6 md:p-8 border border-gray-200/80 transition-all duration-300 group-hover:border-purple-300 group-hover:shadow-xl group-hover:shadow-purple-500/10">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/[0.03] via-transparent to-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Accent line at top */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-300/0 to-transparent group-hover:via-purple-400/60 transition-all duration-500" />

        <div className="relative">
          {/* Project number */}
          <div className="absolute -top-2 -right-2 text-6xl font-bold text-gray-100 group-hover:text-purple-100/60 transition-colors duration-300 select-none pointer-events-none">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Content */}
          <div className="relative">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
              {project.title}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: tagIndex * 0.05 }}
                  className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 border border-gray-200/60 group-hover:bg-purple-50 group-hover:text-purple-700 group-hover:border-purple-200/60 transition-all duration-200"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden rounded-br-xl pointer-events-none">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-100/0 to-transparent group-hover:from-purple-100/50 transition-all duration-500 transform translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4" />
        </div>
      </div>
    </motion.div>
  );
}
