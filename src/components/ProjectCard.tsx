import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectEntry } from '../data/portfolioData';
import { getScrollRevealProps } from '../utils/heroLogic';

interface ProjectCardProps {
  project: ProjectEntry;
  index: number;
  onDiscussProject?: (project: ProjectEntry) => void;
}

function ProductPreviewGraphic({
  previewType,
}: {
  previewType: ProjectEntry['previewType'];
}) {
  if (previewType === 'env-checker') {
    return (
      <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#0F1424] via-[#131B36] to-[#1D1836] text-white select-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[11px] text-neutral-400">
          <span>env-inspector — diagnostic session</span>
          <span className="text-cyan-300">local runtime check</span>
        </div>

        <div className="my-auto py-6 space-y-3.5 font-mono text-xs sm:text-[13px]">
          <div className="flex items-center justify-between py-2 px-3.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
            <span className="text-neutral-300">System Runtime &amp; Path</span>
            <span className="text-cyan-300">Detected</span>
          </div>
          <div className="flex items-center justify-between py-2 px-3.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
            <span className="text-neutral-300">Local Compute Acceleration</span>
            <span className="text-indigo-300">Configured</span>
          </div>
          <div className="flex items-center justify-between py-2 px-3.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
            <span className="text-neutral-300">Model Weights Directory</span>
            <span className="text-purple-300">Verified</span>
          </div>
          <div className="pt-2 pl-1 text-[11px] text-neutral-400">
            → Automated environment validation &amp; dependency resolution
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-[11px] text-neutral-400">
          <span>CLI &amp; Local Interface</span>
          <span className="text-white/70">Diagnostic Architecture</span>
        </div>
      </div>
    );
  }

  if (previewType === 'exam-master') {
    return (
      <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#F2F4FB] via-[#ECEFF9] to-[#E6E9F8] text-neutral-900 select-none">
        <div className="flex items-center justify-between border-b border-neutral-900/10 pb-4 font-mono text-[11px] text-neutral-500">
          <span>Knowledge Workspace</span>
          <span className="text-[#2D46B9]">Structured Study Flow</span>
        </div>

        <div className="my-auto py-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-5 p-4 rounded-xl bg-white/80 border border-neutral-900/[0.07] space-y-2.5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Topic Hierarchy
            </div>
            <div className="h-2 w-4/5 rounded bg-neutral-900/80" />
            <div className="h-2 w-3/5 rounded bg-[#2D46B9]/70" />
            <div className="h-2 w-2/3 rounded bg-neutral-300" />
            <div className="h-2 w-1/2 rounded bg-neutral-300" />
          </div>

          <div className="sm:col-span-7 p-4 rounded-xl bg-white shadow-xs border border-neutral-900/[0.08] space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#2D46B9]">
              Concept Synthesis
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed">
              Organizes domain materials into connected study nodes and interactive review prompts.
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between font-mono text-[10px] text-neutral-500">
              <span>Active Recall Module</span>
              <span className="text-neutral-900">Local-First</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-900/10 font-mono text-[11px] text-neutral-500">
          <span>Curriculum Indexing</span>
          <span>Knowledge Exploration</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#12131C] via-[#191B2C] to-[#231C38] text-white select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[11px] text-neutral-400">
        <span>Semantic Knowledge Graph</span>
        <span className="text-purple-300">Retrieval &amp; Linking</span>
      </div>

      <div className="my-auto py-6 space-y-4">
        <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
          <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 mb-1.5">
            Query &amp; Context Pipeline
          </div>
          <div className="text-xs sm:text-sm text-neutral-200 font-normal">
            Structured notes, technical documentation, and contextual synthesis linked across topics.
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 font-mono text-[11px]">
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.07] text-neutral-300">
            <div className="text-neutral-500 text-[10px] mb-1">01</div>
            Ingestion
          </div>
          <div className="p-3 rounded-lg bg-white/[0.06] border border-cyan-400/30 text-cyan-200">
            <div className="text-cyan-400 text-[10px] mb-1">02</div>
            Indexing
          </div>
          <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.07] text-neutral-300">
            <div className="text-neutral-500 text-[10px] mb-1">03</div>
            Synthesis
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-[11px] text-neutral-400">
        <span>Structured Search</span>
        <span className="text-white/70">AI-Assisted Workflows</span>
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  onDiscussProject,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isReversed = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [18, -18]
  );

  return (
    <motion.article
      ref={cardRef}
      {...getScrollRevealProps(0.08, 32)}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 lg:py-16 border-t border-neutral-900/10"
    >
      {/* Oversized Project Preview Area */}
      <div
        className={`lg:col-span-7 ${
          isReversed ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-neutral-900/10 bg-[#F2F4FA] aspect-[16/10] shadow-xs transition-colors duration-500 group-hover:border-[#2D46B9]/40">
          <motion.div
            style={{ y: parallaxY }}
            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          >
            <ProductPreviewGraphic previewType={project.previewType} />
          </motion.div>
        </div>
      </div>

      {/* Editorial Project Details */}
      <div
        className={`lg:col-span-5 flex flex-col justify-between ${
          isReversed ? 'lg:order-1 lg:pr-6' : 'lg:order-2 lg:pl-6'
        }`}
      >
        <div>
          {/* Large Project Number + Unboxed Category Label */}
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <span className="font-mono text-4xl sm:text-5xl font-light tracking-tight text-neutral-300 group-hover:text-[#2D46B9] transition-colors duration-300">
              {project.number}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#2D46B9]">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight text-neutral-950 leading-[1.15] mb-4 group-hover:translate-x-1 transition-transform duration-300">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Architectural Focus List */}
          <ul className="space-y-2 mb-8 border-t border-neutral-900/[0.07] pt-5">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="text-sm text-neutral-600 flex items-start gap-2.5"
              >
                <span
                  aria-hidden="true"
                  className="text-[#2D46B9] font-mono text-xs mt-0.5"
                >
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Row: Active Verified Link (if configured) or Inquiry Trigger */}
        <div className="flex flex-wrap items-center gap-5 pt-2">
          {project.externalUrl ? (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-950 hover:text-[#2D46B9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
            >
              <span>View Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onDiscussProject?.(project)}
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-[#2D46B9] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
            >
              <span>Discuss this system</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
