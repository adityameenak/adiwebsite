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
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid',
              outline: 'none',
              background: isActive ? '#f5f0e0' : 'transparent',
              color: isActive ? '#0a0a0a' : '#6a6a6a',
              borderColor: isActive ? '#e5e5e5' : '#e5e5e5',
              transition: 'all 0.15s ease',
            }}
            className={isActive ? '' : 'hover:text-ink hover:border-ink'}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {label}
              {typeof count === 'number' && (
                <span style={{
                  fontSize: '12px',
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  background: isActive ? '#ebe6d6' : '#f0f0f0',
                  color: isActive ? '#3a3a3a' : '#9a9a9a',
                }}>
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
