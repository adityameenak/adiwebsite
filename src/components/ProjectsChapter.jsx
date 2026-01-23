import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { projects, projectCategories } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import FilterPills from './FilterPills';

/**
 * ProjectsChapter - Project grid with filtering
 *
 * Simplified cards with title, description, tags, and Details button.
 */
export default function ProjectsChapter() {
  const [activeFilter, setActiveFilter] = useState('all');
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const filtersWithCount = useMemo(() => {
    return projectCategories.map((cat) => ({
      ...cat,
      count: cat.id === 'all'
        ? projects.length
        : projects.filter((p) => p.category === cat.id).length,
    }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
        exit: {
          opacity: 0,
          y: -20,
          transition: { duration: 0.3 },
        },
      };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding bg-neutral-50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent/3 to-transparent blur-3xl pointer-events-none" />

      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
            Featured Work
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4">
                Projects
              </h2>
              <p className="text-lg text-neutral-600 max-w-xl">
                Technical projects spanning semiconductors, sustainability, and software.
              </p>
            </div>

            <FilterPills
              filters={filtersWithCount}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              className="lg:self-end"
            />
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          id="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ProjectCard project={project} reducedMotion={reducedMotion} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="text-neutral-500 text-lg">
                No projects in this category yet.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/**
 * ProjectCard - Simple project card
 */
function ProjectCard({ project, reducedMotion }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={reducedMotion ? {} : { y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className={`
          relative h-full bg-white rounded-xl p-6 lg:p-8
          border border-neutral-200
          transition-all duration-300
          ${isHovered ? 'border-accent/30 shadow-lg' : ''}
        `}
      >
        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Category */}
          <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3">
            {project.category}
          </span>

          {/* Title */}
          <h3
            className={`
              text-xl lg:text-2xl font-bold mb-3
              transition-colors duration-200
              ${isHovered ? 'text-accent' : 'text-neutral-900'}
            `}
          >
            {project.title}
          </h3>

          {/* Description - short and literal */}
          <p className="text-neutral-600 text-sm lg:text-base leading-relaxed mb-6 flex-grow">
            {project.shortDescription}
          </p>

          {/* Tags - 3 max */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`
                  text-xs font-medium px-2.5 py-1 rounded-md
                  transition-colors duration-200
                  ${isHovered
                    ? 'bg-accent/10 text-accent'
                    : 'bg-neutral-100 text-neutral-600'
                  }
                `}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Details button */}
          <div className="mt-auto">
            <button
              className="text-sm font-medium text-neutral-600 hover:text-accent
                       transition-colors duration-200"
            >
              Details →
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
