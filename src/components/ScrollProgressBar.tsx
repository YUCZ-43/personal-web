import { motion, useScroll, useSpring } from 'motion/react';
import { useGlobalMotion } from '../context/GlobalMotionContext';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const { reducedMotion } = useGlobalMotion();

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
        scaleX: reducedMotion ? scrollYProgress : smoothProgress,
      }}
      className="fixed top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#854DFF] via-[#BC9AFF] to-[#E8C879] origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(133,77,255,0.8)]"
    />
  );
}
