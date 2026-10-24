import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useGlobalMotion } from '../context/GlobalMotionContext';
import { getScrollRevealProps } from '../utils/heroLogic';

export function About() {
  const { lang, t, isTransitioning } = useLanguage();
  const { reducedMotion } = useGlobalMotion();

  // Segment tokens cleanly for both Chinese clauses and English words
  const tokens =
    lang === 'zh-CN'
      ? t.about.headline.split(/(?<=[，。])/)
      : t.about.headline.split(' ');

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={`relative w-full py-24 sm:py-32 transition-opacity duration-200 ${
        isTransitioning ? 'opacity-80' : 'opacity-100'
      }`}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
        {/* Eyebrow */}
        <motion.p
          {...getScrollRevealProps(0, 16)}
          className="font-mono text-xs uppercase tracking-[0.18em] text-[#E8C879] mb-6"
        >
          {t.about.eyebrow}
        </motion.p>

        {/* Accessible Headline with Staggered Visual Reveal */}
        <h2
          id="about-heading"
          aria-label={t.about.headline}
          className="font-display text-3xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] text-[#F4F0FF] leading-[1.15] max-w-4xl mb-16 sm:mb-20 flex flex-wrap gap-x-[0.26em] gap-y-2"
        >
          {tokens.map((token, idx) => (
            <motion.span
              key={`${lang}-${idx}`}
              aria-hidden="true"
              initial={
                reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.52,
                delay: reducedMotion ? 0 : idx * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {token}
            </motion.span>
          ))}
        </h2>

        {/* Clean Two-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-10 border-t border-[#BC9AFF]/20">
          {/* Left Column: Narrative Body */}
          <div className="lg:col-span-7 space-y-6">
            {t.about.paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                {...getScrollRevealProps(0.1 + index * 0.08, 22)}
                className="text-lg sm:text-xl text-[#ACA1C7] leading-relaxed font-normal"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Right Column: Secondary Area — Currently Exploring */}
          <motion.div
            {...getScrollRevealProps(0.18, 24)}
            className="lg:col-span-5 lg:pl-8 lg:border-l border-[#BC9AFF]/20"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#E8C879] mb-6">
              {t.about.exploringTitle}
            </h3>

            <ul className="divide-y divide-[#BC9AFF]/15 border-y border-[#BC9AFF]/15">
              {t.about.exploringTopics.map((topic, idx) => (
                <li
                  key={topic}
                  className="py-3.5 flex items-center justify-between gap-4 text-sm sm:text-base text-[#F4F0FF]/90"
                >
                  <span>{topic}</span>
                  <span className="font-mono text-xs text-[#BC9AFF]/60">
                    0{idx + 1}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
