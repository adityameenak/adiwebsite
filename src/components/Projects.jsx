import { motion } from 'framer-motion';
import { projects } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import {
  fadeInUp,
  fadeInUpReduced,
  staggerContainer,
  cardHover,
  cardHoverReduced,
} from '../utils/animations';

export default function Projects() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? fadeInUpReduced : fadeInUp;
  const cardVariants = reducedMotion ? cardHoverReduced : cardHover;

  return (
    <section id="projects" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={variants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-12"
          >
            Projects
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={variants}
                initial="rest"
                whileHover="hover"
                className="bg-white rounded-2xl p-8 border border-gray-100 group"
              >
                <motion.div variants={cardVariants}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
