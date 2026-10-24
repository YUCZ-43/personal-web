import { motion, useReducedMotion } from 'motion/react';
import { ABOUT_CONTENT } from '../data/portfolioData';
import { getScrollRevealProps } from '../utils/heroLogic';

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const headlineWords = ABOUT_CONTENT.headline.split(' ');

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full py-24 sm:py-32 bg-[#FAFAFC]"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
        {/* Eyebrow */}
        <motion.p
          {...getScrollRevealProps(0, 16)}
          className="font-mono text-xs uppercase tracking-[0.18em] text-[#2D46B9] mb-6"
        >
          04 / Perspective
        </motion.p>

        {/* Word-by-Word Scroll Reveal Headline */}
        <h2
          id="about-heading"
          className="text-3xl sm:text-5xl lg:text-[56px] font-medium tracking-[-0.03em] text-neutral-950 leading-[1.12] max-w-4xl mb-16 sm:mb-20 flex flex-wrap gap-x-[0.28em] gap-y-2"
        >
          {headlineWords.map((word, idx) => (
            <motion.span
              key={`${word}-${idx}`}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : idx * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Clean Two-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-10 border-t border-neutral-900/10">
          {/* Left Column: Narrative Body */}
          <div className="lg:col-span-7 space-y-6">
            {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                {...getScrollRevealProps(0.1 + index * 0.08, 22)}
                className="text-lg sm:text-xl text-neutral-700 leading-relaxed font-normal"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Right Column: Secondary Area — Currently Exploring */}
          <motion.div
            {...getScrollRevealProps(0.18, 24)}
            className="lg:col-span-5 lg:pl-8 lg:border-l border-neutral-900/10"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 mb-6">
              {ABOUT_CONTENT.exploringTitle}
            </h3>

            <ul className="divide-y divide-neutral-900/[0.08] border-y border-neutral-900/[0.08]">
              {ABOUT_CONTENT.exploringTopics.map((topic, idx) => (
                <li
                  key={topic}
                  className="py-3.5 flex items-center justify-between gap-4 text-base text-neutral-800"
                >
                  <span>{topic}</span>
                  <span className="font-mono text-xs text-neutral-400">
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
