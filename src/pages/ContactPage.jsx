import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LenisProvider } from '../hooks/useLenis';
import SparseHeader from '../components/SparseHeader';
import FooterContact from '../components/FooterContact';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { FiMail, FiLinkedin, FiArrowUpRight } from 'react-icons/fi';

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
];

function ContactSection() {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reducedMotion ? 0 : 0.09, delayChildren: 0.1 },
    },
  };

  const fadeUp = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <section ref={ref} id="contact" className="section-padding relative">
      <div className="absolute top-0 inset-x-0 h-px section-divider" />

      <div className="container-wide">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-lg"
        >
          {/* Label */}
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium text-accent tracking-wide uppercase mb-4"
          >
            Contact
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-3"
          >
            Get in touch.
          </motion.h2>

          {/* Subline */}
          <motion.p
            variants={fadeUp}
            className="text-[16px] text-neutral-500 leading-relaxed mb-10"
          >
            Feel free to reach out for research opportunities, collaborations, or just to connect.
          </motion.p>

          {/* Contact links */}
          <motion.div variants={fadeUp} className="space-y-3">
            {CONTACT_LINKS.map(({ label, value, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between px-5 py-4 rounded-xl
                           bg-white border border-neutral-200
                           hover:border-accent/30 hover:shadow-soft
                           transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-accent-subtle flex items-center justify-center border border-accent/15 flex-shrink-0">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">
                      {label}
                    </p>
                    <p className="text-[13px] text-neutral-700 font-medium mt-0.5">{value}</p>
                  </div>
                </div>
                <FiArrowUpRight
                  className="w-4 h-4 text-neutral-300 flex-shrink-0
                             group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                             transition-all duration-200"
                />
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
      <div className="min-h-screen" style={{ background: '#E8E4E0' }}>
        <div className="px-3 sm:px-5 lg:px-9 pt-3 pb-8">
          <div
            className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden fine-grid"
            style={{
              background: '#FEFCF9',
              minHeight: 'calc(100vh - 2.75rem)',
              boxShadow:
                '0 0 0 1px rgba(180,130,110,0.10), 0 4px 12px rgba(120,70,50,0.06), 0 20px 60px -12px rgba(120,70,50,0.09)',
            }}
          >
            <SparseHeader />
            <main>
              <ContactSection />
              <FooterContact />
            </main>
          </div>
        </div>
      </div>
    </LenisProvider>
  );
}
