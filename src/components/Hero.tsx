import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { BackgroundVideo } from './BackgroundVideo';
import { PERSONAL_CONFIG } from '../data/portfolioData';
import { getScrollRevealProps } from '../utils/heroLogic';

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full flex flex-col lg:block lg:min-h-screen overflow-hidden"
    >
      {/* Preserved 3D Iridescent Human Sculpture with Mouse Tracking */}
      <BackgroundVideo />

      {/* Foreground Editorial Content */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-[#FAFAFC] lg:bg-transparent pt-24 pb-10 lg:pt-28 lg:pb-12 lg:min-h-screen justify-between">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.p
              {...getScrollRevealProps(0.05, 18)}
              className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.18em] text-[#2D46B9] font-medium mb-6"
            >
              {PERSONAL_CONFIG.roleEyebrow}
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              id="hero-heading"
              {...getScrollRevealProps(0.12, 24)}
              className="text-4xl sm:text-6xl lg:text-[72px] font-medium tracking-[-0.03em] text-neutral-950 leading-[1.05] mb-7"
            >
              {PERSONAL_CONFIG.heroHeadline}
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              {...getScrollRevealProps(0.2, 24)}
              className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal mb-10 max-w-xl"
            >
              {PERSONAL_CONFIG.heroSupportingText}
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              {...getScrollRevealProps(0.28, 20)}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-neutral-950 text-white text-sm sm:text-[15px] font-medium tracking-tight hover:bg-[#2D46B9] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
              >
                <span>Explore My Work</span>
                <ArrowDown aria-hidden="true" className="w-4 h-4 stroke-[2]" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-sm sm:text-[15px] font-medium text-neutral-900 underline decoration-neutral-900/30 underline-offset-4 hover:text-[#2D46B9] hover:decoration-[#2D46B9] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
              >
                <span>Get in Touch</span>
                <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[2]" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Subtle Animated Scroll Indicator at Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-10 lg:pt-4 flex items-center justify-between text-xs font-mono uppercase tracking-[0.16em] text-neutral-500"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-3 hover:text-neutral-950 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
          >
            <span className="relative flex h-6 w-[1px] bg-neutral-300 overflow-hidden">
              <motion.span
                animate={{ y: ['-100%', '100%'] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="block w-full h-3 bg-[#2D46B9]"
              />
            </span>
            <span>Scroll to explore</span>
          </a>

          <span className="hidden sm:inline text-neutral-400">
            Interactive 3D · Move cursor to scrub
          </span>
        </motion.div>
      </div>
    </section>
  );
}
