import { motion } from 'motion/react';
import { getLocalizedProjects, type ProjectEntry } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { ProjectCard } from './ProjectCard';
import { getScrollRevealProps } from '../utils/heroLogic';

interface SelectedWorkProps {
  onSelectProjectInquiry?: (project: ProjectEntry) => void;
}

export function SelectedWork({ onSelectProjectInquiry }: SelectedWorkProps) {
  const { lang, t, isTransitioning } = useLanguage();
  const localizedProjects = getLocalizedProjects(lang);

  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className={`relative w-full py-24 sm:py-32 transition-opacity duration-200 ${
        isTransitioning ? 'opacity-80' : 'opacity-100'
      }`}
    >
      {/* Subtle Ambient Nebula Illumination (No Solid Hard-Cut Block) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#21103F]/35 to-transparent"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <motion.p
            {...getScrollRevealProps(0, 16)}
            className="font-mono text-xs uppercase tracking-[0.18em] text-[#E8C879] mb-4"
          >
            {t.work.eyebrow}
          </motion.p>
          <motion.h2
            id="selected-work-heading"
            {...getScrollRevealProps(0.06, 24)}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#F4F0FF] leading-[1.08] mb-5"
          >
            {t.work.heading}
          </motion.h2>
          <motion.p
            {...getScrollRevealProps(0.12, 20)}
            className="text-lg sm:text-xl text-[#ACA1C7] leading-relaxed"
          >
            {t.work.subtitle}
          </motion.p>
        </div>

        {/* Project Entries */}
        <div className="divide-y divide-[#BC9AFF]/15">
          {localizedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onDiscussProject={onSelectProjectInquiry}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
