import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, PERSONAL_CONFIG } from '../data/portfolioData';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Track scroll state for subtle sticky header refinement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section using IntersectionObserver
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
  }, []);

  // Escape key & focus management for mobile navigation
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

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#FAFAFC]/85 backdrop-blur-md border-b border-neutral-900/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center">
          {/* Personal Wordmark (Left) */}
          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 text-[18px] sm:text-[20px] tracking-tight text-neutral-950 font-medium select-none hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
          >
            <span>{PERSONAL_CONFIG.wordmark}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="w-4 h-4 text-neutral-500 stroke-[2]"
            />
          </a>

          {/* Desktop Navigation Links (Center) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex flex-row items-center gap-8 text-[15px] font-medium text-neutral-700"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.sectionId}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 transition-colors duration-200 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9] ${
                    isActive ? 'text-neutral-950' : 'text-neutral-600'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#2D46B9] transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1 text-[15px] font-medium text-neutral-950 underline decoration-neutral-900/30 underline-offset-4 hover:decoration-[#2D46B9] hover:text-[#2D46B9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[2]" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={
              isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-overlay"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D46B9]"
          >
            <span
              className={`w-6 h-[2px] bg-neutral-950 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-neutral-950 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-neutral-950 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <div
        id="mobile-navigation-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`md:hidden fixed inset-0 z-30 bg-[#FAFAFC]/95 backdrop-blur-md transition-opacity duration-300 flex flex-col justify-center items-center px-6 ${
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
                className={`text-3xl font-medium tracking-tight transition-colors ${
                  isActive
                    ? 'text-[#2D46B9]'
                    : 'text-neutral-950 hover:text-[#2D46B9]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="#contact"
            tabIndex={isMobileMenuOpen ? 0 : -1}
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 inline-flex items-center gap-1.5 text-2xl font-medium text-neutral-950 underline underline-offset-4 hover:text-[#2D46B9] transition-colors"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight aria-hidden="true" className="w-5 h-5 stroke-[2]" />
          </a>
        </nav>
      </div>
    </>
  );
}
