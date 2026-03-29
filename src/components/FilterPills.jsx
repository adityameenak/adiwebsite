import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * FilterPills - Animated filter buttons for project filtering
 *
 * Features:
 * - Smooth active state transitions
 * - Accessible keyboard navigation
 * - Count badges
 * - Horizontal scroll on mobile
 */
export default function FilterPills({
  filters,
  activeFilter,
  onFilterChange,
  className = '',
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`flex flex-wrap gap-2 sm:gap-3 ${className}`}
      role="tablist"
      aria-label="Filter projects"
    >
      {filters.map(({ id, label, count }) => {
        const isActive = activeFilter === id;

        return (
          <motion.button
            key={id}
            onClick={() => onFilterChange(id)}
            role="tab"
            aria-selected={isActive}
            aria-controls="projects-grid"
            className={`
              relative px-4 py-2 text-sm font-medium rounded-full
              transition-colors duration-200 outline-none
              focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
              ${isActive
                ? 'text-white'
                : 'text-neutral-500 hover:text-neutral-900 bg-white border border-neutral-200 hover:border-neutral-400'
              }
            `}
            whileHover={reducedMotion ? {} : { scale: 1.02 }}
            whileTap={reducedMotion ? {} : { scale: 0.98 }}
          >
            {/* Active background pill */}
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-accent rounded-full"
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}

            {/* Label */}
            <span className="relative z-10 flex items-center gap-2">
              {label}
              {typeof count === 'number' && (
                <span
                  className={`
                    text-xs px-1.5 py-0.5 rounded-full
                    ${isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-200 text-neutral-400'
                    }
                  `}
                >
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

/**
 * FilterPillsScrollable - Horizontal scroll version for mobile
 */
export function FilterPillsScrollable({
  filters,
  activeFilter,
  onFilterChange,
  className = '',
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      {/* Fade gradients for scroll indication */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none sm:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none sm:hidden" />

      <div
        className="flex gap-2 overflow-x-auto hide-scrollbar py-1 px-1 -mx-1 sm:flex-wrap sm:overflow-visible"
        role="tablist"
        aria-label="Filter projects"
      >
        {filters.map(({ id, label, count }) => {
          const isActive = activeFilter === id;

          return (
            <motion.button
              key={id}
              onClick={() => onFilterChange(id)}
              role="tab"
              aria-selected={isActive}
              className={`
                relative flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full
                transition-colors duration-200 outline-none
                focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                ${isActive
                  ? 'text-white'
                  : 'text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200'
                }
              `}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterScroll"
                  className="absolute inset-0 bg-accent rounded-full"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                {label}
                {typeof count === 'number' && count > 0 && (
                  <span
                    className={`
                      text-xs px-1.5 py-0.5 rounded-full
                      ${isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-neutral-200 text-neutral-500'
                      }
                    `}
                  >
                    {count}
                  </span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
