import { ArrowUp, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_CONFIG } from '../data/portfolioData';
import { BRAND_IDENTITY } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';
import { useGlobalMotion } from '../context/GlobalMotionContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const { reducedMotion, toggleReducedMotion } = useGlobalMotion();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full border-t border-[#BC9AFF]/15 py-12 sm:py-16 bg-[#0B071C]/80">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        {/* Editable Personal Wordmark: 魚橙子 / YU CHENGZI */}
        <div className="space-y-2">
          <a
            href="#hero"
            className="group inline-flex items-center gap-2.5 text-lg font-medium tracking-tight text-[#F4F0FF] hover:text-[#E8C879] transition-colors"
          >
            <span className="font-display font-semibold tracking-wider">
              {BRAND_IDENTITY.zh}
            </span>
            <span className="font-mono text-xs tracking-[0.2em] text-[#BC9AFF]">
              {BRAND_IDENTITY.en}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="w-4 h-4 text-[#E8C879]/80"
            />
          </a>
          <p className="text-xs font-mono text-[#ACA1C7]">
            &copy; {currentYear} {BRAND_IDENTITY.zh} ({BRAND_IDENTITY.en}) ·{' '}
            {t.footer.roleSignature}
          </p>
        </div>

        {/* Configurable Links, Low-Motion Toggle & Back to Top */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-medium text-[#ACA1C7]">
          <button
            type="button"
            onClick={toggleReducedMotion}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#BC9AFF] hover:text-[#E8C879] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C879]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8C879]" />
            <span>
              {reducedMotion ? t.nav.reducedMotionOn : t.nav.reducedMotionOff}
            </span>
          </button>

          <a
            href={PERSONAL_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#E8C879] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C879]"
          >
            <span>{t.footer.github}</span>
            <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
          </a>

          <a
            href={`mailto:${PERSONAL_CONFIG.email}`}
            className="inline-flex items-center gap-1 hover:text-[#E8C879] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C879]"
          >
            <span>{t.footer.email}</span>
            <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleBackToTop}
            className="inline-flex items-center gap-1.5 text-[#F4F0FF] hover:text-[#E8C879] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C879]"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp
              aria-hidden="true"
              className="w-3.5 h-3.5 text-[#E8C879]"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
