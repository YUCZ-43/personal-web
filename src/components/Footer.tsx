import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { PERSONAL_CONFIG } from '../data/portfolioData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#FAFAFC] border-t border-neutral-900/10 py-12 sm:py-16">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        {/* Editable Personal Wordmark & Copyright */}
        <div className="space-y-1.5">
          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 text-lg font-medium tracking-tight text-neutral-950 hover:text-[#2D46B9] transition-colors"
          >
            <span>{PERSONAL_CONFIG.wordmark}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="w-4 h-4 text-neutral-400"
            />
          </a>
          <p className="text-xs font-mono text-neutral-500">
            &copy; {currentYear} · {PERSONAL_CONFIG.roleEyebrow}
          </p>
        </div>

        {/* Configurable Links & Back to Top */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-medium text-neutral-700">
          <a
            href={PERSONAL_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#2D46B9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
          >
            <span>GitHub</span>
            <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
          </a>

          <a
            href={`mailto:${PERSONAL_CONFIG.email}`}
            className="inline-flex items-center gap-1 hover:text-[#2D46B9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
          >
            <span>Email</span>
            <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleBackToTop}
            className="inline-flex items-center gap-1.5 text-neutral-950 hover:text-[#2D46B9] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
          >
            <span>Back to Top</span>
            <ArrowUp aria-hidden="true" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
