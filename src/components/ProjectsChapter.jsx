import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { projects, projectCategories } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import FilterPills from './FilterPills';

// Color assignment per project — cycles through brand palette
// teal (dark, white text), lavender (light, dark text), ochre (light, dark text), peach (light, dark text)
const PROJECT_COLORS = {
  3: { bg: '#1a3a3a', text: '#ffffff', linkText: '#a4d4c5', tagBg: 'rgba(255,255,255,0.12)', tagText: '#e5e5e5', tagBorder: 'rgba(255,255,255,0.16)' }, // STEM Research Finder
  1: { bg: '#b8a4ed', text: '#0a0a0a', linkText: '#3a2a6a', tagBg: 'rgba(10,10,10,0.08)', tagText: '#1a1a3a', tagBorder: 'rgba(10,10,10,0.12)' }, // Sustainapath
  2: { bg: '#e8b94a', text: '#0a0a0a', linkText: '#5a3a00', tagBg: 'rgba(10,10,10,0.08)', tagText: '#3a2a00', tagBorder: 'rgba(10,10,10,0.12)' }, // SolarIQ
  4: { bg: '#ffb084', text: '#0a0a0a', linkText: '#5a2a00', tagBg: 'rgba(10,10,10,0.08)', tagText: '#3a1a00', tagBorder: 'rgba(10,10,10,0.12)' }, // Substack
};

export default function ProjectsChapter() {
  const [activeFilter, setActiveFilter] = useState('all');
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const filtersWithCount = useMemo(() => {
    return projectCategories.map((cat) => ({
      ...cat,
      count: cat.id === 'all' ? projects.length : projects.filter((p) => p.category === cat.id).length,
    }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.08, delayChildren: 0.05 } },
  };

  const itemVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
        exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
      };

  return (
    <section ref={sectionRef} id="projects" style={{ paddingTop: '96px', paddingBottom: '96px', background: '#fffaf0' }}>
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.55 }}
          style={{ marginBottom: '48px' }}
        >
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '12px' }}>
            Featured Work
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 500, letterSpacing: '-2px', color: '#0a0a0a', marginBottom: '12px' }}>
                Projects
              </h2>
              <p style={{ fontSize: '16px', color: '#6a6a6a', maxWidth: '44ch', lineHeight: 1.55 }}>
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
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants} layout initial="hidden" animate="visible" exit="exit">
                <ProjectCard project={project} reducedMotion={reducedMotion} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ color: '#9a9a9a', fontSize: '16px' }}>No projects in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, reducedMotion }) {
  const colors = PROJECT_COLORS[project.id] || PROJECT_COLORS[4];

  return (
    <motion.article
      whileHover={reducedMotion ? {} : { y: -4 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: colors.bg,
        borderRadius: '24px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '280px',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', color: colors.text, opacity: 0.65 }}>
          {project.type || project.category}
        </span>
        {project.status && (
          <span
            style={{
              padding: '3px 10px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 600,
              background: colors.tagBg,
              color: colors.tagText,
              border: `1px solid ${colors.tagBorder}`,
            }}
          >
            {project.status}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '22px', fontWeight: 600, color: colors.text, lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: '10px' }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{ fontSize: '15px', color: colors.text, opacity: 0.75, lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
        {project.shortDescription}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 500,
              background: colors.tagBg,
              color: colors.tagText,
              border: `1px solid ${colors.tagBorder}`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Link */}
      <div style={{ marginTop: 'auto' }}>
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 600,
              color: colors.linkText,
              textDecoration: 'none',
            }}
          >
            View Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <span style={{ fontSize: '14px', color: colors.text, opacity: 0.45 }}>
            {project.status === 'In Progress' ? 'In development' : 'Coming soon'}
          </span>
        )}
      </div>
    </motion.article>
  );
}
