import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { NAV_ITEMS } from '../data/portfolioData';
import { BRAND_IDENTITY } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';
import { useGlobalMotion } from '../context/GlobalMotionContext';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  const { lang, t, toggleLanguage } = useLanguage();
  const {
    activeSection,
    setActiveSection,
    reducedMotion,
    toggleReducedMotion,
    triggerEnergyPulse,
  } = useGlobalMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', ...NAV_ITEMS.map((item) => item.sectionId)];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id === 'hero' ? '' : id);
          }
        });
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: 0.05,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const focusTimer = window.setTimeout(() => {
      firstMobileLinkRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isMobileMenuOpen]);

  const handleLanguageSwitch = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerEnergyPulse(e.clientX, e.clientY);
    toggleLanguage();
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#0B071C]/92 border-b border-[#BC9AFF]/15 shadow-[0_8px_32px_rgba(11,7,28,0.65)]'
            : 'bg-gradient-to-b from-[#0B071C]/80 to-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-3.5 sm:py-4 flex flex-row justify-between items-center">
          {/* Bilingual Brand Identity: 魚橙子 / YU CHENGZI */}
          <a
            href="#hero"
            aria-label={`${BRAND_IDENTITY.zh} ${BRAND_IDENTITY.en}`}
            className="group inline-flex items-center gap-3 select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C879]"
          >
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-semibold tracking-wider text-[#F4F0FF] group-hover:text-[#E8C879] transition-colors leading-tight">
                {BRAND_IDENTITY.zh}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-[#ACA1C7] group-hover:text-[#BC9AFF] transition-colors uppercase leading-none mt-0.5">
                {BRAND_IDENTITY.en}
              </span>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="w-3.5 h-3.5 text-[#E8C879]/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>

          {/* Desktop Navigation & Right Controls */}
          <div className="hidden md:flex items-center gap-7">
            <nav
              aria-label="Primary Navigation"
              className="flex flex-row items-center gap-7 text-sm font-medium text-[#ACA1C7]"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.sectionId;
                const localizedLabel = t.nav[item.key];
                return (
                  <a
                    key={item.sectionId}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative py-1 transition-colors duration-200 hover:text-[#F4F0FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C879] ${
                      isActive ? 'text-[#F4F0FF]' : 'text-[#ACA1C7]'
                    }`}
                  >
                    {localizedLabel}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-gradient-to-r from-[#854DFF] to-[#E8C879] transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            <span aria-hidden="true" className="h-4 w-[1px] bg-[#BC9AFF]/20" />

            {/* Bilingual Language Switcher (中 / EN) */}
            <button
              type="button"
              onClick={handleLanguageSwitch}
              aria-label={t.nav.langSwitchLabel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#21103F]/80 border border-[#BC9AFF]/30 hover:border-[#E8C879]/75 text-xs font-mono tracking-wider cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C879]"
            >
              <span
                className={
                  lang === 'zh-CN'
                    ? 'text-[#E8C879] font-semibold'
                    : 'text-[#ACA1C7]'
                }
              >
                中
              </span>
              <span aria-hidden="true" className="text-[#ACA1C7]/40">
                /
              </span>
              <span
                className={
                  lang === 'en'
                    ? 'text-[#E8C879] font-semibold'
                    : 'text-[#ACA1C7]'
                }
              >
                EN
              </span>
            </button>

            {/* Desktop Right CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#854DFF]/20 border border-[#BC9AFF]/35 text-xs sm:text-sm font-medium text-[#F4F0FF] hover:bg-[#854DFF]/35 hover:border-[#E8C879]/75 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C879]"
            >
              <span>{t.nav.letsTalk}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="w-3.5 h-3.5 text-[#E8C879]"
              />
            </a>
          </div>

          {/* Mobile Controls: Compact Language Switch + Hamburger */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              type="button"
              onClick={handleLanguageSwitch}
              aria-label={t.nav.langSwitchLabel}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#21103F]/90 border border-[#BC9AFF]/30 text-xs font-mono text-[#F4F0FF] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#E8C879]"
            >
              <span
                className={
                  lang === 'zh-CN'
                    ? 'text-[#E8C879] font-semibold'
                    : 'text-[#ACA1C7]'
                }
              >
                中
              </span>
              <span aria-hidden="true" className="text-[#ACA1C7]/40">
                /
              </span>
              <span
                className={
                  lang === 'en'
                    ? 'text-[#E8C879] font-semibold'
                    : 'text-[#ACA1C7]'
                }
              >
                EN
              </span>
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={
                isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-overlay"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex flex-col justify-center items-center gap-[5px] w-11 h-11 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8C879]"
            >
              <span
                className={`w-6 h-[2px] bg-[#F4F0FF] transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`w-6 h-[2px] bg-[#F4F0FF] transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-[2px] bg-[#F4F0FF] transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <div
        id="mobile-navigation-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`md:hidden fixed inset-0 z-30 bg-[#0B071C]/96 transition-opacity duration-300 flex flex-col justify-center items-center px-6 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav
          aria-label="Mobile Navigation Links"
          className="flex flex-col items-center gap-7 text-center"
        >
          {NAV_ITEMS.map((item, idx) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.sectionId}
                ref={idx === 0 ? firstMobileLinkRef : undefined}
                href={item.href}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-display text-3xl font-medium tracking-tight transition-colors ${
                  isActive
                    ? 'text-[#E8C879]'
                    : 'text-[#F4F0FF] hover:text-[#BC9AFF]'
                }`}
              >
                {t.nav[item.key]}
              </a>
            );
          })}

          <a
            href="#contact"
            tabIndex={isMobileMenuOpen ? 0 : -1}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#854DFF]/30 border border-[#E8C879]/50 text-lg font-medium text-[#F4F0FF]"
          >
            <span>{t.nav.letsTalk}</span>
            <ArrowUpRight aria-hidden="true" className="w-5 h-5 text-[#E8C879]" />
          </a>

          <button
            type="button"
            tabIndex={isMobileMenuOpen ? 0 : -1}
            onClick={toggleReducedMotion}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-[#ACA1C7] hover:text-[#E8C879]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8C879]" />
            <span>
              {reducedMotion ? t.nav.reducedMotionOn : t.nav.reducedMotionOff}
            </span>
          </button>
        </nav>
      </div>
    </>
  );
}
