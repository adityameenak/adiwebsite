import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * PinnedTransition - GSAP ScrollTrigger pinned section
 *
 * This component dynamically imports GSAP only when needed.
 * Use sparingly - only for one special "chapter" transition.
 *
 * Features:
 * - Pins the section while scrolling through content
 * - Progress-based animations
 * - Dynamic import to avoid bundle bloat
 * - Falls back gracefully if GSAP fails to load
 */

// Lazy load GSAP to avoid bundle bloat
const loadGSAP = async () => {
  const gsap = await import('gsap');
  const ScrollTrigger = await import('gsap/ScrollTrigger');
  gsap.default.registerPlugin(ScrollTrigger.default);
  return { gsap: gsap.default, ScrollTrigger: ScrollTrigger.default };
};

export default function PinnedTransition({
  children,
  className = '',
  pinDuration = 1, // How many viewport heights to pin for (1 = 100vh)
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [isGsapLoaded, setIsGsapLoaded] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip GSAP if user prefers reduced motion
    if (reducedMotion) {
      setIsGsapLoaded(false);
      return;
    }

    let ctx;

    const initGSAP = async () => {
      try {
        const { gsap, ScrollTrigger } = await loadGSAP();
        setIsGsapLoaded(true);

        ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${window.innerHeight * pinDuration}`,
            pin: contentRef.current,
            pinSpacing: true,
            scrub: true,
          });
        }, containerRef);
      } catch (error) {
        console.warn('GSAP failed to load, falling back to static layout');
        setIsGsapLoaded(false);
      }
    };

    initGSAP();

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, [reducedMotion, pinDuration]);

  // Fallback: Just render children without pinning
  if (reducedMotion || !isGsapLoaded) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

/**
 * PinnedSection - A pinned section with fade-in content
 *
 * Use case: "Featured Work" or "Highlights" that pins while content fades in
 */
export function PinnedSection({ items, title, className = '' }) {
  const containerRef = useRef(null);
  const panelRefs = useRef([]);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    let ctx;

    const initGSAP = async () => {
      try {
        const { gsap, ScrollTrigger } = await loadGSAP();

        ctx = gsap.context(() => {
          // Pin the container
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${items.length * 100}vh`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            onUpdate: (self) => {
              const newIndex = Math.min(
                Math.floor(self.progress * items.length),
                items.length - 1
              );
              setActiveIndex(newIndex);
            },
          });

          // Animate panels
          panelRefs.current.forEach((panel, i) => {
            gsap.fromTo(
              panel,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: `top+=${i * 100}vh top`,
                  end: `top+=${(i + 0.5) * 100}vh top`,
                  scrub: true,
                },
              }
            );
          });
        }, containerRef);
      } catch (error) {
        console.warn('GSAP failed to load');
      }
    };

    initGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [items, reducedMotion]);

  // Fallback for reduced motion: Simple stacked layout
  if (reducedMotion) {
    return (
      <section className={className}>
        <h2 className="text-4xl font-bold mb-8">{title}</h2>
        <div className="space-y-8">
          {items.map((item, i) => (
            <div key={i} className="p-6 bg-neutral-50 rounded-xl">
              {item}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className={`relative h-screen ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-wide">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-12">
            {title}
          </h2>

          <div className="relative">
            {items.map((item, i) => (
              <div
                key={i}
                ref={(el) => (panelRefs.current[i] = el)}
                className={`
                  absolute inset-0 transition-opacity duration-300
                  ${activeIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                `}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {items.map((_, i) => (
          <div
            key={i}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${activeIndex === i ? 'bg-accent scale-150' : 'bg-neutral-300'}
            `}
          />
        ))}
      </div>
    </section>
  );
}
