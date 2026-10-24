import { motion } from 'motion/react';
import { PROJECTS, type ProjectEntry } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { getScrollRevealProps } from '../utils/heroLogic';

interface SelectedWorkProps {
  onSelectProjectInquiry?: (project: ProjectEntry) => void;
}

export function SelectedWork({ onSelectProjectInquiry }: SelectedWorkProps) {
  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="w-full py-24 sm:py-32 bg-[#FAFAFC]"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <motion.p
            {...getScrollRevealProps(0, 16)}
            className="font-mono text-xs uppercase tracking-[0.18em] text-[#2D46B9] mb-4"
          >
            02 / Selected Work
          </motion.p>
          <motion.h2
            id="selected-work-heading"
            {...getScrollRevealProps(0.06, 24)}
            className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.03em] text-neutral-950 leading-[1.08] mb-5"
          >
            Selected Work
          </motion.h2>
          <motion.p
            {...getScrollRevealProps(0.12, 20)}
            className="text-lg sm:text-xl text-neutral-600 leading-relaxed"
          >
            A selection of products, experiments, and systems I&apos;ve been
            building.
          </motion.p>
        </div>

        {/* Project Entries */}
        <div className="divide-y divide-neutral-900/10">
          {PROJECTS.map((project, index) => (
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
