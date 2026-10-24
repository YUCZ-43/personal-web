import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  TRANSLATIONS,
  type SupportedLanguage,
  type TranslationDictionary,
} from '../data/translations';
import { resolveInitialLanguage } from '../utils/heroLogic';

const STORAGE_KEY = 'yucz_portfolio_lang';

interface LanguageContextValue {
  lang: SupportedLanguage;
  t: TranslationDictionary;
  setLanguage: (next: SupportedLanguage) => void;
  toggleLanguage: () => void;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<SupportedLanguage>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return resolveInitialLanguage(saved);
    } catch {
      return 'zh-CN';
    }
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    const meta = TRANSLATIONS[lang].meta;
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage quota errors
    }
  }, [lang]);

  const setLanguage = useCallback((next: SupportedLanguage) => {
    setIsTransitioning(true);
    setLangState(next);
    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 180);
  }, []);

  const toggleLanguage = useCallback(() => {
    setIsTransitioning(true);
    setLangState((prev) => (prev === 'zh-CN' ? 'en' : 'zh-CN'));
    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 180);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        t: TRANSLATIONS[lang],
        setLanguage,
        toggleLanguage,
        isTransitioning,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
