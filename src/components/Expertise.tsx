import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { getLocalizedExpertise } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { useGlobalMotion } from '../context/GlobalMotionContext';
import { getScrollRevealProps } from '../utils/heroLogic';

export function Expertise() {
  const { lang, t, isTransitioning } = useLanguage();
  const { triggerEnergyPulse } = useGlobalMotion();
  const localizedItems = getLocalizedExpertise(lang);

  const [activeId, setActiveId] = useState<string | null>(
    localizedItems[0]?.id ?? null
  );

  const handleToggle = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerEnergyPulse(e.clientX, e.clientY);
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className={`relative w-full py-24 sm:py-32 transition-opacity duration-200 ${
        isTransitioning ? 'opacity-80' : 'opacity-100'
      }`}
    >
      {/* Seamless Nebula Gradient Veil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#160B30]/60 to-transparent"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.p
            {...getScrollRevealProps(0, 16)}
            className="font-mono text-xs uppercase tracking-[0.18em] text-[#E8C879] mb-4"
          >
            {t.expertise.eyebrow}
          </motion.p>
          <motion.h2
            id="expertise-heading"
            {...getScrollRevealProps(0.06, 24)}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#F4F0FF] leading-[1.08] mb-4"
          >
            {t.expertise.heading}
          </motion.h2>
          <motion.p
            {...getScrollRevealProps(0.12, 20)}
            className="text-lg sm:text-xl text-[#ACA1C7] leading-relaxed"
          >
            {t.expertise.subtitle}
          </motion.p>
        </div>

        {/* Interactive Capability Rows */}
        <div className="border-t border-[#BC9AFF]/20">
          {localizedItems.map((item, idx) => {
            const isExpanded = activeId === item.id;
            const panelId = `expertise-panel-${item.id}`;

            return (
              <motion.div
                key={item.id}
                {...getScrollRevealProps(0.06 * idx, 20)}
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) {
                    setActiveId(item.id);
                  }
                }}
                className="group relative border-b border-[#BC9AFF]/20"
              >
                {/* Animated Active Top Highlight Bar */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 -top-[1px] h-[2px] bg-gradient-to-r from-[#854DFF] via-[#E8C879] to-[#6AD9FF] origin-left transition-transform duration-500 ${
                    isExpanded ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />

                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={(e) => handleToggle(item.id, e)}
                  className="w-full py-8 sm:py-10 text-left flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 items-start lg:items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C879]"
                >
                  <span className="lg:col-span-2 font-mono text-sm text-[#ACA1C7] group-hover:text-[#E8C879] transition-colors">
                    {item.index}
                  </span>

                  <span
                    className={`lg:col-span-4 font-display text-2xl sm:text-3xl font-medium tracking-tight transition-all duration-300 ${
                      isExpanded
                        ? 'lg:translate-x-2 text-[#E8C879]'
                        : 'text-[#F4F0FF] lg:group-hover:translate-x-1'
                    }`}
                  >
                    {item.title}
                  </span>

                  <span className="lg:col-span-5 text-base sm:text-lg text-[#ACA1C7] leading-relaxed">
                    {item.summary}
                  </span>

                  <span className="lg:col-span-1 lg:justify-self-end inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#BC9AFF]/30 text-[#F4F0FF] group-hover:border-[#E8C879] group-hover:text-[#E8C879] transition-colors">
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-45 text-[#E8C879]' : ''
                      }`}
                    />
                  </span>
                </button>

                {/* Supporting Details Reveal */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 sm:pb-10 lg:grid lg:grid-cols-12 gap-8">
                        <div className="lg:col-start-3 lg:col-span-9 pt-4 border-t border-[#BC9AFF]/15 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                          <ul className="space-y-2.5 max-w-xl">
                            {item.focusAreas.map((detail) => (
                              <li
                                key={detail}
                                className="text-sm sm:text-[15px] text-[#F4F0FF]/85 flex items-start gap-2.5"
                              >
                                <span
                                  aria-hidden="true"
                                  className="text-[#E8C879] font-mono text-xs mt-1"
                                >
                                  →
                                </span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="font-mono text-xs text-[#ACA1C7] sm:text-right shrink-0">
                            <div className="uppercase tracking-wider text-[#BC9AFF]/70 mb-1">
                              {t.expertise.focusLabel}
                            </div>
                            <div className="text-[#E8C879]">
                              {item.deliverables}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
