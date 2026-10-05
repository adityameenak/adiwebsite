import { useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Mono, uppercase section eyebrow with a hairline rule that draws in
 * from the left when the label scrolls into view.
 */
export default function SectionLabel({ children, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <div ref={ref} className={`sec-label${inView ? ' is-inview' : ''}`} style={style}>
      <span>{children}</span>
    </div>
  );
}
