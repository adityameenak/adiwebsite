import { motion } from 'framer-motion';
import { personalInfo } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeInUp, fadeInUpReduced, staggerContainer } from '../utils/animations';

export default function Contact() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? fadeInUpReduced : fadeInUp;

  const buttonVariants = reducedMotion
    ? {}
    : {
        hover: { scale: 1.02 },
        tap: { scale: 0.98 },
      };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const subject = formData.get('subject');
    const message = formData.get('message');

    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={variants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
          >
            Get in Touch
          </motion.h2>

          <motion.p variants={variants} className="text-lg text-gray-600 mb-8">
            I'm always open to discussing research opportunities, collaborative
            projects, or just connecting about semiconductors and sustainable energy.
          </motion.p>

          <motion.form
            variants={variants}
            onSubmit={handleSubmit}
            className="space-y-6 mb-8"
          >
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none"
                placeholder="Your message..."
              />
            </div>

            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/30"
            >
              Send Message
            </motion.button>
          </motion.form>

          <motion.div
            variants={variants}
            className="flex items-center justify-center gap-6 pt-8 border-t border-gray-100"
          >
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="font-medium">LinkedIn</span>
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Email</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
