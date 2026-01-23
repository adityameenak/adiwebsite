import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { projects, projectCategories } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import FilterPills from './FilterPills';
import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi';

/**
 * ProjectsChapter - Editorial project grid with filtering
 *
 * Features:
 * - Category filter pills with animated transitions
 * - Staggered card reveal on scroll
 * - Hover image reveal (when images available)
 * - Impact metrics prominently displayed
 * - Demo + GitHub action buttons
 */
export default function ProjectsChapter() {
  const [activeFilter, setActiveFilter] = useState('all');
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Filter projects and add counts
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

  // Container variants for staggered reveal
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
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
        exit: {
          opacity: 0,
          y: -20,
          scale: 0.95,
          transition: { duration: 0.3 },
        },
      };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding bg-neutral-50 relative overflow-hidden"
    >
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent/3 to-transparent blur-3xl pointer-events-none" />

      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
          className="mb-12 lg:mb-16"
        >
          {/* Section label */}
          <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
            Featured Work
          </p>

          {/* Title + description */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 mb-4">
                Projects
              </h2>
              <p className="text-lg text-neutral-600 max-w-xl">
                Technical projects spanning semiconductors, sustainability, and software.
                Each built to solve real problems.
              </p>
            </div>

            {/* Filter pills */}
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
          role="tabpanel"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ProjectCard
                  project={project}
                  index={index}
                  reducedMotion={reducedMotion}
                />
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
 * ProjectCard - Individual project card with hover effects
 */
function ProjectCard({ project, index, reducedMotion }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={reducedMotion ? {} : { y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className={`
          relative h-full bg-white rounded-xl p-6 lg:p-8
          border border-neutral-200/80
          transition-all duration-300
          ${isHovered ? 'border-accent/30 shadow-soft-lg' : ''}
        `}
      >
        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/[0.02] via-transparent to-accent/[0.01]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative flex flex-col h-full">
          {/* Top row: Category + Featured badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs font-medium text-accent bg-accent-subtle px-2 py-0.5 rounded">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className={`
              text-xl lg:text-2xl font-heading font-bold mb-3
              transition-colors duration-200
              ${isHovered ? 'text-accent' : 'text-neutral-900'}
            `}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-neutral-600 text-sm lg:text-base leading-relaxed mb-4 flex-grow">
            {project.shortDescription || project.description}
          </p>

          {/* Impact metric */}
          {project.impact && (
            <div className="mb-4 pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-sm font-medium text-neutral-900">
                  {project.impact}
                </span>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`
                  text-xs font-medium px-2.5 py-1 rounded-md
                  transition-colors duration-200
                  ${isHovered
                    ? 'bg-accent-subtle text-accent border border-accent/20'
                    : 'bg-neutral-100 text-neutral-600 border border-neutral-200/60'
                  }
                `}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-auto">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium
                         text-neutral-600 hover:text-accent transition-colors"
              >
                <FiExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium
                         text-neutral-600 hover:text-accent transition-colors"
              >
                <FiGithub className="w-4 h-4" />
                Code
              </a>
            )}
            {!project.demoUrl && !project.githubUrl && (
              <span className="text-sm text-neutral-400 italic">
                Private project
              </span>
            )}
          </div>
        </div>

        {/* Decorative corner accent */}
        <motion.div
          className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden rounded-br-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-accent/10 to-transparent" />
        </motion.div>

        {/* Hover arrow indicator */}
        <motion.div
          className="absolute top-6 right-6 lg:top-8 lg:right-8"
          initial={{ opacity: 0, x: -5, y: 5 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -5,
            y: isHovered ? 0 : 5,
          }}
          transition={{ duration: 0.2 }}
        >
          <FiArrowUpRight className="w-5 h-5 text-accent" />
        </motion.div>
      </div>
    </motion.article>
  );
}
