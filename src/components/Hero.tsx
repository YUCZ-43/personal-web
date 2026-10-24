import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { BackgroundVideo } from './BackgroundVideo';
import { InteractiveButton } from './InteractiveButton';
import { useLanguage } from '../context/LanguageContext';
import { useGlobalMotion } from '../context/GlobalMotionContext';
import { BRAND_IDENTITY } from '../data/translations';

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { t, isTransitioning } = useLanguage();
  const { reducedMotion } = useGlobalMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headlineParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, -55]
  );

  const watermarkParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [0, 40]
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full flex flex-col lg:block lg:min-h-screen overflow-hidden"
    >
      {/* LAYER 1 (z-[1]): Monumental Editorial Watermark Partially Behind Digital Human */}
      <motion.div
        aria-hidden="true"
        style={{ y: watermarkParallaxY }}
        className="pointer-events-none select-none hidden lg:flex flex-col justify-center items-end absolute inset-x-0 top-24 bottom-20 z-[1] px-8 max-w-7xl mx-auto overflow-hidden"
      >
        <span className="font-display text-[110px] xl:text-[148px] font-bold tracking-[-0.04em] leading-none text-[#BC9AFF]/[0.055] uppercase">
          {BRAND_IDENTITY.en}
        </span>
        <span className="font-serif-accent italic text-[72px] xl:text-[96px] tracking-tight leading-none text-[#E8C879]/[0.06] -mt-4">
          {t.hero.backdropWatermark}
        </span>
      </motion.div>

      {/* LAYER 2 (z-[2]): Breathing 3D Digital Human Centerpiece with Mouse Scrubbing */}
      <BackgroundVideo />

      {/* LAYER 3 (z-10): Primary Readable Editorial Typography & Interactive CTAs */}
      <div
        className={`relative z-10 flex flex-col order-first lg:order-none w-full pt-28 pb-10 lg:pt-32 lg:pb-12 lg:min-h-screen justify-between transition-opacity duration-200 ${
          isTransitioning ? 'opacity-80' : 'opacity-100'
        }`}
      >
        <motion.div
          style={{ y: headlineParallaxY }}
          className="w-full max-w-7xl mx-auto px-5 sm:px-8 flex-1 flex flex-col justify-center"
        >
          <div className="max-w-2xl">
            {/* Bilingual Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 mb-6"
            >
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-[#E8C879] shadow-[0_0_10px_#E8C879]"
              />
              <p className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.18em] text-[#BC9AFF] font-medium">
                {t.hero.eyebrow}
              </p>
            </motion.div>

            {/* Expressive Editorial Headline (Single accessible h1 for assistive tech) */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.72,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-4xl sm:text-6xl lg:text-[68px] font-semibold tracking-[-0.03em] text-[#F4F0FF] leading-[1.1] mb-7"
            >
              <span className="block mb-1.5">{t.hero.headlineLine1}</span>
              <span className="block text-cosmic-gradient">
                {t.hero.headlineHighlight}
              </span>
            </motion.h1>

            {/* Supporting Editorial Description */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-base sm:text-xl text-[#ACA1C7] leading-relaxed font-normal mb-10 max-w-xl"
            >
              {t.hero.supportingText}
            </motion.p>

            {/* Spring & Energy Response CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.26,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <InteractiveButton href="#work" variant="primary">
                <span>{t.hero.primaryCta}</span>
                <ArrowDown
                  aria-hidden="true"
                  className="w-4 h-4 stroke-[2] transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </InteractiveButton>

              <InteractiveButton href="#contact" variant="secondary">
                <span>{t.hero.secondaryCta}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-4 h-4 stroke-[2] text-[#E8C879] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </InteractiveButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Scroll & Cosmic Interaction Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-10 lg:pt-4 flex items-center justify-between text-xs font-mono uppercase tracking-[0.15em] text-[#ACA1C7]/80"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-3 hover:text-[#E8C879] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C879]"
          >
            <span className="relative flex h-6 w-[1px] bg-[#BC9AFF]/30 overflow-hidden">
              <motion.span
                animate={{ y: ['-100%', '100%'] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="block w-full h-3 bg-[#E8C879]"
              />
            </span>
            <span>{t.hero.scrollExplore}</span>
          </a>

          <span className="hidden sm:inline text-[#ACA1C7]/60">
            {t.hero.interactionHint}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
