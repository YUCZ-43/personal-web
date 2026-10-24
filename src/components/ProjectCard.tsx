import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectEntry } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { useGlobalMotion } from '../context/GlobalMotionContext';
import { InteractiveButton } from './InteractiveButton';
import { getScrollRevealProps } from '../utils/heroLogic';

interface ProjectCardProps {
  project: ProjectEntry;
  index: number;
  onDiscussProject?: (project: ProjectEntry) => void;
}

function ProductPreviewGraphic({
  project,
}: {
  project: ProjectEntry;
}) {
  const { t, lang } = useLanguage();
  const loc = t.work.projects[project.id];
  const labels = loc?.previewLabels ?? {
    headerLeft: 'System Session',
    headerRight: 'Active',
    footerLeft: 'Architecture',
    footerRight: 'Verified',
  };

  if (project.previewType === 'env-checker') {
    return (
      <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#120A2A]/95 via-[#1B103E]/95 to-[#0D1A3A]/95 text-[#F4F0FF] select-none">
        <div className="flex items-center justify-between border-b border-[#BC9AFF]/15 pb-4 font-mono text-[11px] text-[#ACA1C7]">
          <span>{labels.headerLeft}</span>
          <span className="text-[#6AD9FF]">{labels.headerRight}</span>
        </div>

        <div className="my-auto py-5 space-y-3 font-mono text-xs sm:text-[13px]">
          <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#0B071C]/65 border border-[#854DFF]/30">
            <span className="text-[#F4F0FF]">
              {lang === 'zh-CN' ? '系统运行时与路径检测' : 'System Runtime & Path'}
            </span>
            <span className="text-[#6AD9FF]">
              {lang === 'zh-CN' ? '已就绪' : 'Detected'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#0B071C]/65 border border-[#BC9AFF]/25">
            <span className="text-[#F4F0FF]">
              {lang === 'zh-CN' ? '本地 GPU 算力加速环境' : 'Local Compute Acceleration'}
            </span>
            <span className="text-[#E8C879]">
              {lang === 'zh-CN' ? '已配置' : 'Configured'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#0B071C]/65 border border-[#BC9AFF]/20">
            <span className="text-[#F4F0FF]">
              {lang === 'zh-CN' ? '本地模型权重与依赖库' : 'Model Weights Directory'}
            </span>
            <span className="text-[#BC9AFF]">
              {lang === 'zh-CN' ? '校验通过' : 'Verified'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#BC9AFF]/15 font-mono text-[11px] text-[#ACA1C7]">
          <span>{labels.footerLeft}</span>
          <span className="text-[#E8C879]">{labels.footerRight}</span>
        </div>
      </div>
    );
  }

  if (project.previewType === 'exam-master') {
    return (
      <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#231244]/95 via-[#1A0D36]/95 to-[#2D154E]/95 text-[#F4F0FF] select-none">
        <div className="flex items-center justify-between border-b border-[#E8C879]/20 pb-4 font-mono text-[11px] text-[#ACA1C7]">
          <span>{labels.headerLeft}</span>
          <span className="text-[#E8C879]">{labels.headerRight}</span>
        </div>

        <div className="my-auto py-5 grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-5 p-4 rounded-xl bg-[#0B071C]/70 border border-[#BC9AFF]/20 space-y-2.5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#E8C879]">
              {lang === 'zh-CN' ? '知识课题拓扑' : 'Topic Hierarchy'}
            </div>
            <div className="h-2 w-4/5 rounded bg-[#854DFF]/80" />
            <div className="h-2 w-3/5 rounded bg-[#E8C879]/75" />
            <div className="h-2 w-2/3 rounded bg-[#BC9AFF]/45" />
            <div className="h-2 w-1/2 rounded bg-[#6AD9FF]/45" />
          </div>

          <div className="sm:col-span-7 p-4 rounded-xl bg-[#0B071C]/80 border border-[#E8C879]/30 space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#BC9AFF]">
              {lang === 'zh-CN' ? '智能概念提炼' : 'Concept Synthesis'}
            </div>
            <p className="text-xs text-[#F4F0FF]/90 leading-relaxed">
              {lang === 'zh-CN'
                ? '将复杂学科文献转化为结构化知识节点与主动回忆探索路径。'
                : 'Organizes domain materials into connected study nodes and interactive review prompts.'}
            </p>
            <div className="pt-2 border-t border-[#BC9AFF]/15 flex items-center justify-between font-mono text-[10px] text-[#ACA1C7]">
              <span>{lang === 'zh-CN' ? '主动研习模块' : 'Active Recall Module'}</span>
              <span className="text-[#E8C879]">Local-First</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#E8C879]/20 font-mono text-[11px] text-[#ACA1C7]">
          <span>{labels.footerLeft}</span>
          <span className="text-[#BC9AFF]">{labels.footerRight}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#0F0B26]/95 via-[#1C1240]/95 to-[#132242]/95 text-[#F4F0FF] select-none">
      <div className="flex items-center justify-between border-b border-[#6AD9FF]/20 pb-4 font-mono text-[11px] text-[#ACA1C7]">
        <span>{labels.headerLeft}</span>
        <span className="text-[#6AD9FF]">{labels.headerRight}</span>
      </div>

      <div className="my-auto py-5 space-y-4">
        <div className="p-4 rounded-xl bg-[#0B071C]/70 border border-[#854DFF]/35">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#E8C879] mb-1.5">
            {lang === 'zh-CN' ? '语义向量与上下文管线' : 'Query & Context Pipeline'}
          </div>
          <div className="text-xs sm:text-sm text-[#F4F0FF]/90 font-normal">
            {lang === 'zh-CN'
              ? '跨技术笔记、架构文档与实验记录的多维语义关联与智能检索。'
              : 'Structured notes, technical documentation, and contextual synthesis linked across topics.'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 font-mono text-[11px]">
          <div className="p-3 rounded-lg bg-[#0B071C]/60 border border-[#BC9AFF]/20 text-[#ACA1C7]">
            <div className="text-[#854DFF] text-[10px] mb-1">01</div>
            {lang === 'zh-CN' ? '多源采集' : 'Ingestion'}
          </div>
          <div className="p-3 rounded-lg bg-[#21103F]/80 border border-[#6AD9FF]/45 text-[#F4F0FF]">
            <div className="text-[#6AD9FF] text-[10px] mb-1">02</div>
            {lang === 'zh-CN' ? '向量索引' : 'Indexing'}
          </div>
          <div className="p-3 rounded-lg bg-[#0B071C]/60 border border-[#E8C879]/35 text-[#E8C879]">
            <div className="text-[#E8C879] text-[10px] mb-1">03</div>
            {lang === 'zh-CN' ? '知识综合' : 'Synthesis'}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#6AD9FF]/20 font-mono text-[11px] text-[#ACA1C7]">
        <span>{labels.footerLeft}</span>
        <span className="text-[#6AD9FF]">{labels.footerRight}</span>
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
  const { t } = useLanguage();
  const { reducedMotion } = useGlobalMotion();
  const isReversed = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [20, -20]
  );

  return (
    <motion.article
      ref={cardRef}
      {...getScrollRevealProps(0.08, 32)}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-14 lg:py-20 border-t border-[#BC9AFF]/15"
    >
      {/* Oversized Atmospheric Project Preview */}
      <div
        className={`lg:col-span-7 ${
          isReversed ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-[#BC9AFF]/25 bg-[#120A2A]/80 aspect-[16/10] shadow-[0_24px_60px_rgba(11,7,28,0.75)] transition-all duration-500 group-hover:border-[#E8C879]/60 group-hover:shadow-[0_28px_72px_rgba(133,77,255,0.28)]">
          <motion.div
            style={{ y: parallaxY }}
            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          >
            <ProductPreviewGraphic project={project} />
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
            <span className="font-display text-4xl sm:text-5xl font-light tracking-tight text-[#BC9AFF]/35 group-hover:text-[#E8C879] transition-colors duration-300">
              {project.number}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#BC9AFF]">
              {project.category}
            </span>
          </div>

          {/* Official Project Title */}
          <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-semibold tracking-tight text-[#F4F0FF] leading-[1.15] mb-4 group-hover:translate-x-1 transition-transform duration-300">
            {project.title}
          </h3>

          {/* Localized Project Description */}
          <p className="text-base sm:text-lg text-[#ACA1C7] leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Architectural Focus List */}
          <ul className="space-y-2.5 mb-8 border-t border-[#BC9AFF]/15 pt-5">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="text-sm text-[#F4F0FF]/85 flex items-start gap-2.5"
              >
                <span
                  aria-hidden="true"
                  className="text-[#E8C879] font-mono text-xs mt-0.5"
                >
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.externalUrl ? (
            <InteractiveButton
              href={project.externalUrl}
              external
              variant="secondary"
            >
              <span>{t.work.viewAction}</span>
              <ArrowUpRight className="w-4 h-4 text-[#E8C879] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </InteractiveButton>
          ) : (
            <InteractiveButton
              onClick={() => onDiscussProject?.(project)}
              variant="secondary"
            >
              <span>{t.work.discussAction}</span>
              <ArrowUpRight className="w-4 h-4 text-[#E8C879] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </InteractiveButton>
          )}
        </div>
      </div>
    </motion.article>
  );
}
