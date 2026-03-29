import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { FiArrowUpRight } from 'react-icons/fi';
import HeroPortrait from './HeroPortrait';

/**
 * HeroChapter — editorial two-column hero with portrait background.
 *
 * Layers (bottom → top):
 *   1. HeroPortrait   — SVG bust, 13% opacity, blurred, fades at edges
 *   2. Grid content   — text, identity card
 *   3. Stat strip     — bottom divider
 *
 * The portrait occupies the right half of the section and bleeds gently
 * into the text area, creating depth without reducing readability.
 */
export default function HeroChapter() {
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
      };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion ? 0 : 0.09, delayChildren: 0.1 },
    },
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden px-7 sm:px-10 lg:px-14 pt-14 pb-0 lg:pt-20"
    >
      {/* ── Portrait background layer ── */}
      <HeroPortrait />

      {/* ── Content (above portrait) ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10"
      >
        {/* Discipline strip */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-12 lg:mb-16"
        >
          {[
            'Chemical Engineering',
            'Semiconductors',
            'Materials Science',
            'Texas\u00A0A&M',
          ].map((tag, i, arr) => (
            <span key={tag} className="flex items-center gap-3">
              <span className="text-[13px] text-neutral-400 tracking-wide">{tag}</span>
              {i < arr.length - 1 && (
                <span className="text-neutral-300 text-xs" aria-hidden>·</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Main two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_284px] gap-10 lg:gap-14 xl:gap-20 items-end mb-12 lg:mb-16">

          {/* Left — primary content */}
          <div>
            <motion.h1
              variants={fadeUp}
              className="font-display font-medium tracking-tight leading-[0.92] text-neutral-900 mb-9"
              style={{ fontSize: 'clamp(64px, 10vw, 124px)' }}
            >
              Hi, I'm{' '}
              <em className="not-italic text-accent">Adi.</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[17px] lg:text-[18px] text-neutral-500 font-light leading-relaxed max-w-[44ch] mb-10"
            >
              {personalInfo.title}
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-5 sm:gap-7">
              <button
                onClick={() => navigate('/projects')}
                className="btn-primary px-7 py-3.5 text-[14px]"
              >
                View Projects
              </button>
              <button
                onClick={() => navigate('/experience')}
                className="group flex items-center gap-1.5 text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                Experience
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
              </button>
            </motion.div>
          </div>

          {/* Right — identity panel (desktop only) */}
          <motion.aside
            variants={fadeUp}
            className="hidden lg:block self-end"
            aria-label="Identity summary"
          >
            <div
              className="rounded-2xl bg-white border border-neutral-200 overflow-hidden"
              style={{
                boxShadow:
                  '0 1px 3px rgba(0,0,0,0.04), 0 6px 24px -6px rgba(0,0,0,0.08)',
              }}
            >
              {/* Status row */}
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-neutral-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-[13px] font-medium text-neutral-700">Open to opportunities</span>
              </div>

              {/* Info table */}
              <dl className="px-5 py-4 space-y-3 border-b border-neutral-100 text-[13px]">
                {[
                  { label: 'School',     value: 'Texas A&M' },
                  { label: 'Major',      value: 'Chem. Engineering' },
                  { label: 'Focus',      value: 'Semiconductors' },
                  { label: 'Class',      value: '2028' },
                  { label: 'Fellowship', value: 'Samsung Fellow', accent: true },
                ].map(({ label, value, accent }) => (
                  <div key={label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-neutral-400 flex-shrink-0">{label}</dt>
                    <dd className={`font-medium text-right ${accent ? 'text-accent' : 'text-neutral-800'}`}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Links */}
              <div className="px-5 py-4 space-y-3">
                {[
                  { label: 'LinkedIn', href: personalInfo.linkedin },
                  { label: 'Email',    href: `mailto:${personalInfo.email}` },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center justify-between text-[13px] text-neutral-500 hover:text-accent transition-colors duration-200"
                  >
                    {label}
                    <FiArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Stat strip */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 divide-x divide-neutral-200 border-t border-neutral-200 pt-8 pb-14 lg:pb-20"
        >
          <div className="pr-6 sm:pr-10">
            <p className="text-[22px] lg:text-[26px] font-bold text-neutral-900 leading-tight">2+</p>
            <p className="text-[12px] text-neutral-400 mt-1 tracking-wide uppercase">Years Research</p>
          </div>
          <div className="px-6 sm:px-10">
            <p className="text-[22px] lg:text-[26px] font-bold text-neutral-900 leading-tight">Semis</p>
            <p className="text-[12px] text-neutral-400 mt-1 tracking-wide uppercase">Focus Area</p>
          </div>
          <div className="pl-6 sm:pl-10">
            <p className="text-[22px] lg:text-[26px] font-bold text-neutral-900 leading-tight">2028</p>
            <p className="text-[12px] text-neutral-400 mt-1 tracking-wide uppercase">Class of</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
