import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { projects, projectCategories } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionLabel from './effects/SectionLabel';
import FilterPills from './FilterPills';

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

  const leads = filteredProjects.filter((p) => p.lead);
  const rest = filteredProjects.filter((p) => !p.lead);

  return (
    <section ref={sectionRef} id="projects" className="sec">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reducedMotion ? 0.2 : 0.5 }}
          className="sec-head flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5"
        >
          <div>
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="sec-title">Projects</h2>
          </div>
          <FilterPills
            filters={filtersWithCount}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>

        <motion.div
          id="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-4"
        >
          <AnimatePresence mode="popLayout">
            {leads.map((project) => (
              <motion.div key={project.id} variants={itemVariants} layout initial="hidden" animate="visible" exit="exit">
                <LeadProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {rest.map((project) => (
                  <motion.div key={project.id} variants={itemVariants} layout initial="hidden" animate="visible" exit="exit">
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {filteredProjects.length === 0 && (
          <p style={{ textAlign: 'center', padding: '48px 0', color: 'var(--faint)', fontSize: '15px' }}>
            No projects in this category.
          </p>
        )}
      </div>
    </section>
  );
}

const CARD_LINK_ARROW = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

function TagRow({ tags, limit }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
      {tags.slice(0, limit).map((tag) => (
        <span key={tag} className="mono-chip">{tag}</span>
      ))}
    </div>
  );
}

const isExternal = (href) => href.startsWith('http') || href.endsWith('.pdf');

// Full-width card: accent top rule, status dot, stacked actions.
function LeadProjectCard({ project }) {
  return (
    <article className="project-card project-card--lead">
      <div style={{ minWidth: 0 }}>
        <p className="project-card__label">
          <span className="status-dot" aria-hidden="true" />
          {project.type}
        </p>
        <h3 className="project-card__title" style={{ fontSize: '21px' }}>{project.title}</h3>
        <p className="project-card__body" style={{ maxWidth: '68ch' }}>{project.shortDescription}</p>
        <TagRow tags={project.tags} limit={5} />
      </div>

      <div className="project-actions">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={link.primary ? 'is-primary' : undefined}
            {...(isExternal(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {link.label} {CARD_LINK_ARROW}
          </a>
        ))}
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  const href = project.demoUrl || project.githubUrl;
  const Tag = href ? 'a' : 'article';
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Tag {...linkProps} className="project-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span className="project-card__meta">{project.type || project.category}</span>
        {project.status && <span className="project-card__meta">{project.status}</span>}
      </div>

      <h3 className="project-card__title">
        {project.title}
        {href && <span className="project-card__arrow">{CARD_LINK_ARROW}</span>}
      </h3>

      <p className="project-card__body" style={{ flex: 1 }}>{project.shortDescription}</p>

      <TagRow tags={project.tags} limit={3} />
    </Tag>
  );
}
