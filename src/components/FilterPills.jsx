import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Clay category-tab style: transparent inactive, surface-card active, pill shape
export default function FilterPills({ filters, activeFilter, onFilterChange, className = '' }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="tablist" aria-label="Filter projects">
      {filters.map(({ id, label, count }) => {
        const isActive = activeFilter === id;
        return (
          <motion.button
            key={id}
            onClick={() => onFilterChange(id)}
            role="tab"
            aria-selected={isActive}
            aria-controls="projects-grid"
            whileTap={reducedMotion ? {} : { scale: 0.98 }}
            style={{
              position: 'relative',
              padding: '6px 12px',
              borderRadius: '4px',
              fontFamily: 'var(--mono)',
              fontSize: '12px',
              cursor: 'pointer',
              border: '1px solid',
              outline: 'none',
              background: isActive ? 'var(--accent-soft)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--muted)',
              borderColor: isActive ? 'var(--accent)' : 'var(--rule)',
              transition: 'all 0.15s ease',
            }}
            className={isActive ? '' : 'hover:text-ink hover:border-ink'}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {label}
              {typeof count === 'number' && (
                <span style={{ fontSize: '11px', color: isActive ? 'var(--accent)' : 'var(--faint)', opacity: 0.8 }}>
                  {count}
                </span>
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export function FilterPillsScrollable({ filters, activeFilter, onFilterChange, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="flex gap-2 overflow-x-auto hide-scrollbar py-1"
        role="tablist"
        aria-label="Filter projects"
      >
        <FilterPills filters={filters} activeFilter={activeFilter} onFilterChange={onFilterChange} />
      </div>
    </div>
  );
}
