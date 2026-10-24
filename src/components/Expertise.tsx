import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { EXPERTISE_ITEMS } from '../data/portfolioData';
import { getScrollRevealProps } from '../utils/heroLogic';

export function Expertise() {
  const [activeId, setActiveId] = useState<string | null>(
    EXPERTISE_ITEMS[0]?.id ?? null
  );

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="w-full py-24 sm:py-32 bg-[#F4F5FA] border-y border-neutral-900/[0.06]"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.p
            {...getScrollRevealProps(0, 16)}
            className="font-mono text-xs uppercase tracking-[0.18em] text-[#2D46B9] mb-4"
          >
            03 / Capabilities
          </motion.p>
          <motion.h2
            id="expertise-heading"
            {...getScrollRevealProps(0.06, 24)}
            className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.03em] text-neutral-950 leading-[1.08]"
          >
            What I Do
          </motion.h2>
        </div>

        {/* Interactive Capability Rows */}
        <div className="border-t border-neutral-900/15">
          {EXPERTISE_ITEMS.map((item, idx) => {
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
                className="group relative border-b border-neutral-900/15"
              >
                {/* Animated Active Top Highlight Bar */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 -top-[1px] h-[2px] bg-[#2D46B9] origin-left transition-transform duration-500 ${
                    isExpanded ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />

                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => handleToggle(item.id)}
                  className="w-full py-8 sm:py-10 text-left flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 items-start lg:items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
                >
                  <span className="lg:col-span-2 font-mono text-sm text-neutral-400 group-hover:text-[#2D46B9] transition-colors">
                    {item.index}
                  </span>

                  <span
                    className={`lg:col-span-4 text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 transition-transform duration-300 ${
                      isExpanded ? 'lg:translate-x-2 text-[#1A2556]' : 'group-hover: lg:group-hover:translate-x-1'
                    }`}
                  >
                    {item.title}
                  </span>

                  <span className="lg:col-span-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
                    {item.summary}
                  </span>

                  <span className="lg:col-span-1 lg:justify-self-end inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-900/15 text-neutral-700 group-hover:border-[#2D46B9] group-hover:text-[#2D46B9] transition-colors">
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-45 text-[#2D46B9]' : ''
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
                        <div className="lg:col-start-3 lg:col-span-9 pt-2 border-t border-neutral-900/[0.07] flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                          <ul className="space-y-2.5 max-w-xl">
                            {item.focusAreas.map((detail) => (
                              <li
                                key={detail}
                                className="text-sm sm:text-[15px] text-neutral-600 flex items-start gap-2.5"
                              >
                                <span
                                  aria-hidden="true"
                                  className="text-[#2D46B9] font-mono text-xs mt-1"
                                >
                                  →
                                </span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="font-mono text-xs text-neutral-500 sm:text-right shrink-0">
                            <div className="uppercase tracking-wider text-neutral-400 mb-1">
                              Focus Areas
                            </div>
                            <div className="text-neutral-800">{item.deliverables}</div>
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
