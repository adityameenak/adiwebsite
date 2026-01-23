import { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * MagneticButton - Subtle magnetic hover effect on buttons
 *
 * Features:
 * - Button content follows cursor within bounds
 * - Smooth spring physics
 * - Respects reduced motion
 * - Works with any children
 */
export default function MagneticButton({
  children,
  className = '',
  as: Component = 'button',
  magnetStrength = 0.3, // 0-1, how strong the magnetic pull is
  ...props
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Spring configuration for smooth movement
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  // Scale on hover
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e) => {
    if (reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Distance from center
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    // Apply magnetic effect (scaled by strength)
    x.set(distX * magnetStrength);
    y.set(distY * magnetStrength);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!reducedMotion) {
      scale.set(1.02);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  // Create motion component based on 'as' prop
  const MotionComponent = motion[Component] || motion.button;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={{ x, y, scale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * MagneticLink - Magnetic effect for links
 */
export function MagneticLink({
  children,
  href,
  className = '',
  magnetStrength = 0.2,
  ...props
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const springConfig = { stiffness: 200, damping: 20, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * magnetStrength);
    y.set((e.clientY - centerY) * magnetStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.a>
  );
}

/**
 * MagneticWrapper - Wrap any element with magnetic effect
 */
export function MagneticWrapper({
  children,
  className = '',
  magnetStrength = 0.25,
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const rotate = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    x.set(distX * magnetStrength);
    y.set(distY * magnetStrength);
    rotate.set(distX * 0.02); // Subtle tilt
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotate.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, rotate }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
