import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      role="progressbar"
      aria-label="Page scroll progress"
      style={{
        scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress,
      }}
      className="fixed top-0 inset-x-0 h-[2px] bg-[#2D46B9] origin-left z-50 pointer-events-none"
    />
  );
}
