import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

// ─── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(text, { speed = 60, delay = 380 } = {}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    setDisplayed('');
    setDone(false);
    let idx = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        idx += 1;
        setDisplayed(text.slice(0, idx));
        if (idx >= text.length) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 800);
        }
      }, speed);
    }, delay);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [text, speed, delay, reducedMotion]);

  return { displayed, done };
}

function Cursor({ done }) {
  if (done) return null;
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
      style={{
        display: 'inline-block',
        width: '3px',
        height: '0.78em',
        background: '#0a0a0a',
        marginLeft: '4px',
        verticalAlign: 'middle',
        borderRadius: '1px',
      }}
      aria-hidden="true"
    />
  );
}

// ─── Main hero component ────────────────────────────────────────────────────
export default function HeroChapter() {
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  const { displayed, done } = useTypewriter("Hi, I'm Adi.", { speed: 60, delay: 380 });

  // Subtle mouse parallax on the photo card only
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(rawY, { stiffness: 40, damping: 20 });
  const cardX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const cardY = useTransform(smoothY, [-1, 1], [-5, 5]);

  const handleMouseMove = useCallback((e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }, [rawX, rawY, reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0); rawY.set(0);
  }, [rawX, rawY]);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

  const fadeIn = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } } };

  // Split typewriter text for name highlight
  const PREFIX = "Hi, I'm ";
  const nameDisplayed = displayed.length > PREFIX.length ? displayed.slice(PREFIX.length) : '';
  const prefixDisplayed = displayed.slice(0, Math.min(displayed.length, PREFIX.length));

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: '#fffaf0',
        paddingTop: '80px',
        paddingBottom: '96px',
        overflow: 'hidden',
      }}
    >
      <div className="container-wide">
        {/* 7/5 grid — text left, photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left — 7 columns */}
          <motion.div
            className="lg:col-span-7"
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Eyebrow label */}
            <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8">
              <span style={{ display: 'block', width: '32px', height: '1px', background: '#e5e5e5' }} />
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#9a9a9a', textTransform: 'uppercase' }}>
                Portfolio
              </span>
            </motion.div>

            {/* Display headline */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(52px, 7.5vw, 80px)',
                fontWeight: 500,
                lineHeight: 1.0,
                letterSpacing: '-2.5px',
                color: '#0a0a0a',
                marginBottom: '24px',
                minHeight: '2.1em',
              }}
            >
              {prefixDisplayed}
              {displayed.length > PREFIX.length && (
                <>
                  <br />
                  <span style={{ color: '#0a0a0a' }}>{nameDisplayed}</span>
                </>
              )}
              <Cursor done={done} />
            </motion.h1>

            {/* Personal positioning statement */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: 1.55,
                color: '#3a3a3a',
                maxWidth: '38ch',
                marginBottom: '8px',
              }}
            >
              Chemical Engineering student at Texas A&M, focused on semiconductors, advanced materials, and sustainable energy systems.
            </motion.p>

            {/* Location tagline */}
            <motion.p
              variants={fadeUp}
              style={{ fontSize: '13px', color: '#9a9a9a', fontWeight: 500, marginBottom: '40px' }}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/projects')}
                className="btn-primary"
                style={{ height: '44px', padding: '0 20px', borderRadius: '12px' }}
              >
                View Projects
              </button>
              <button
                onClick={() => navigate('/experience')}
                className="btn-secondary"
                style={{ height: '44px', padding: '0 20px', borderRadius: '12px' }}
              >
                Experience
              </button>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  height: '44px',
                  padding: '0 20px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#6a6a6a',
                  textDecoration: 'none',
                  border: '1px solid transparent',
                }}
                className="hover:text-ink transition-colors"
              >
                LinkedIn
              </a>
            </motion.div>

          </motion.div>

          {/* Right — 5 columns — photo card */}
          <motion.div
            className="lg:col-span-5 hidden lg:block"
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div
              style={{
                x: reducedMotion ? 0 : cardX,
                y: reducedMotion ? 0 : cardY,
              }}
            >
              <div
                style={{
                  background: '#faf5e8',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  position: 'relative',
                  border: '1px solid #e5e5e5',
                }}
              >
                <img
                  src="/linkedinpfp.png"
                  alt="Adi"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 10%',
                    filter: 'brightness(0.98) saturate(0.92)',
                  }}
                />

                {/* Focus areas chip — overlaid bottom-left */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    background: 'rgba(255,250,240,0.88)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(229,229,229,0.6)',
                    padding: '14px 16px',
                  }}
                >
                  <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.2px', color: '#9a9a9a', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Focus Areas
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {['Semiconductors', 'Materials', 'Sustainable Energy', 'AI Tools'].map((area) => (
                      <span
                        key={area}
                        style={{
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          background: '#f5f0e0',
                          border: '1px solid #e5e5e5',
                          fontSize: '11px',
                          fontWeight: 500,
                          color: '#3a3a3a',
                        }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
