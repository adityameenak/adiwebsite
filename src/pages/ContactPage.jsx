import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LenisProvider } from '../hooks/useLenis';
import SparseHeader from '../components/SparseHeader';
import FooterContact from '../components/FooterContact';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionLabel from '../components/effects/SectionLabel';
import { FiMail, FiLinkedin, FiGithub, FiArrowUpRight } from 'react-icons/fi';

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'adityameenakshisundaram@gmail.com',
    href: `mailto:${personalInfo.email}`,
    icon: FiMail,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/adityameenakshi',
    href: personalInfo.linkedin,
    icon: FiLinkedin,
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/adityameenak',
    href: personalInfo.github,
    icon: FiGithub,
    external: true,
  },
];

function ContactSection() {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reducedMotion ? 0 : 0.09, delayChildren: 0.05 } },
  };

  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        paddingTop: '64px',
        paddingBottom: '64px',
        background: 'var(--bg)',
      }}
    >
      <div className="container-wide">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ maxWidth: '480px' }}
        >
          <SectionLabel>Contact</SectionLabel>

          <motion.h2
            variants={fadeUp}
            style={{ fontSize: 'clamp(30px, 3.6vw, 40px)', fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '12px', lineHeight: 1.05 }}
          >
            Get in touch.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '40px' }}
          >
            Feel free to reach out for research opportunities, collaborations, or just to connect.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CONTACT_LINKS.map(({ label, value, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: 'var(--surface)',
                  border: '1px solid var(--rule)',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s',
                }}
                className="group contact-link"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'var(--surface-strong)',
                      border: '1px solid var(--rule)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ width: '16px', height: '16px', color: 'var(--muted)' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--ink)', fontWeight: 500 }}>{value}</p>
                  </div>
                </div>
                <FiArrowUpRight style={{ width: '16px', height: '16px', color: 'var(--faint)', flexShrink: 0 }} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <LenisProvider>
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <SparseHeader />
        <main>
          <ContactSection />
        </main>
        <FooterContact />
      </div>
    </LenisProvider>
  );
}
