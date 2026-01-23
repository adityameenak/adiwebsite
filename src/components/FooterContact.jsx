import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import MagneticButton from './MagneticButton';
import { FiMail, FiLinkedin, FiGithub, FiArrowUpRight } from 'react-icons/fi';

/**
 * FooterContact - Combined contact section and footer
 *
 * Features:
 * - Large CTA headline
 * - Clean contact links
 * - Minimal footer with copyright
 * - Magnetic buttons for social links
 */
export default function FooterContact() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      };

  return (
    <>
      {/* Contact Section */}
      <section
        ref={sectionRef}
        id="contact"
        className="section-padding bg-neutral-950 text-white relative overflow-hidden"
      >
        {/* Gradient background accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-accent/10 to-transparent blur-3xl pointer-events-none" />

        <div className="container-wide relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Section label */}
            <motion.p
              variants={itemVariants}
              className="text-sm font-medium text-accent tracking-wide uppercase mb-6"
            >
              Get in Touch
            </motion.p>

            {/* Large headline */}
            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                         font-medium tracking-tight leading-tight mb-8"
            >
              Let's build something{' '}
              <span className="text-accent">together.</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto mb-12"
            >
              I'm always interested in discussing research opportunities, internships,
              or collaborations in semiconductors and sustainable technology.
            </motion.p>

            {/* Contact buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <MagneticButton
                as="a"
                href={`mailto:${personalInfo.email}`}
                magnetStrength={0.15}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900
                         rounded-lg font-medium hover:bg-accent hover:text-white
                         transition-colors duration-200"
              >
                <FiMail className="w-5 h-5" />
                Email Me
              </MagneticButton>

              <MagneticButton
                as="a"
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                magnetStrength={0.15}
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white
                         rounded-lg font-medium border border-neutral-700
                         hover:border-accent hover:text-accent transition-colors duration-200"
              >
                <FiLinkedin className="w-5 h-5" />
                LinkedIn
              </MagneticButton>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="w-full h-px bg-neutral-800 mb-12"
            />

            {/* Quick links */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm"
            >
              <QuickLink href="#home" label="Home" />
              <QuickLink href="#experience" label="Experience" />
              <QuickLink href="#projects" label="Projects" />
              <QuickLink href="#writing" label="Writing" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-neutral-950 border-t border-neutral-900">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-neutral-500">
              © {currentYear} {personalInfo.fullName}. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <SocialLink
                href={`mailto:${personalInfo.email}`}
                icon={FiMail}
                label="Email"
              />
              <SocialLink
                href={personalInfo.linkedin}
                icon={FiLinkedin}
                label="LinkedIn"
              />
              <SocialLink
                href="https://github.com/adimeenakshi"
                icon={FiGithub}
                label="GitHub"
              />
            </div>

            {/* Location */}
            <p className="text-sm text-neutral-500">
              {personalInfo.location}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

/**
 * Quick navigation link
 */
function QuickLink({ href, label }) {
  return (
    <a
      href={href}
      className="group flex items-center justify-center gap-1 text-neutral-400
               hover:text-white transition-colors duration-200"
    >
      {label}
      <FiArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-1 translate-x-1
                                group-hover:opacity-100 group-hover:translate-y-0
                                group-hover:translate-x-0 transition-all duration-200" />
    </a>
  );
}

/**
 * Social icon link
 */
function SocialLink({ href, icon: Icon, label }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="p-2 text-neutral-500 hover:text-accent transition-colors duration-200"
      whileHover={reducedMotion ? {} : { scale: 1.1 }}
      whileTap={reducedMotion ? {} : { scale: 0.95 }}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}
