import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MutableRefObject,
} from 'react';
import {
  detectPerformanceTier,
  type PerformanceTier,
} from '../data/designTokens';
import { calculatePointerOffset, lerpValue } from '../utils/heroLogic';

export interface SharedMotionSignals {
  /** Normalized raw pointer in [-1, 1] */
  pointerX: number;
  pointerY: number;
  /** Damped pointer in [-1, 1] for smooth spatial parallax */
  smoothX: number;
  smoothY: number;
  /** Delayed foreground particle pointer in [-1, 1] */
  delayedX: number;
  delayedY: number;
  /** Normalized scroll progress in [0, 1] */
  scrollProgress: number;
  /** Timestamp (performance.now() in seconds) of last radial energy click pulse */
  lastPulseTime: number;
  /** Normalized click origin in [-1, 1] */
  pulseOriginX: number;
  pulseOriginY: number;
  /** Interaction intensity [0, 1] */
  interactionIntensity: number;
}

interface GlobalMotionContextValue {
  signalsRef: MutableRefObject<SharedMotionSignals>;
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  performanceTier: PerformanceTier;
  triggerEnergyPulse: (clientX?: number, clientY?: number) => void;
}

const GlobalMotionContext = createContext<GlobalMotionContextValue | null>(null);

export function GlobalMotionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [systemReducedMotion, setSystemReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [manualReducedMotion, setManualReducedMotion] = useState<boolean>(false);
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>(() =>
    typeof window !== 'undefined'
      ? detectPerformanceTier(window.innerWidth)
      : 'desktop'
  );

  const reducedMotion = systemReducedMotion || manualReducedMotion;

  const signalsRef = useRef<SharedMotionSignals>({
    pointerX: 0,
    pointerY: 0,
    smoothX: 0,
    smoothY: 0,
    delayedX: 0,
    delayedY: 0,
    scrollProgress: 0,
    lastPulseTime: -10,
    pulseOriginX: 0,
    pulseOriginY: 0,
    interactionIntensity: 0,
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemReducedMotion(e.matches);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const updateScrollAndResize = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      signalsRef.current.scrollProgress = Math.max(
        0,
        Math.min(1, window.scrollY / maxScroll)
      );
      setPerformanceTier(detectPerformanceTier(window.innerWidth));
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (reducedMotion) return;
      const { nx, ny } = calculatePointerOffset(
        event.clientX,
        event.clientY,
        window.innerWidth,
        window.innerHeight
      );
      signalsRef.current.pointerX = nx;
      signalsRef.current.pointerY = ny;
      signalsRef.current.interactionIntensity = Math.min(
        1,
        signalsRef.current.interactionIntensity + 0.12
      );
    };

    const handleMouseLeave = () => {
      signalsRef.current.pointerX = 0;
      signalsRef.current.pointerY = 0;
    };

    const handleWindowClick = (event: MouseEvent) => {
      if (reducedMotion) return;
      const { nx, ny } = calculatePointerOffset(
        event.clientX,
        event.clientY,
        window.innerWidth,
        window.innerHeight
      );
      signalsRef.current.lastPulseTime = performance.now() * 0.001;
      signalsRef.current.pulseOriginX = nx;
      signalsRef.current.pulseOriginY = ny;
      signalsRef.current.interactionIntensity = 1;
    };

    updateScrollAndResize();
    window.addEventListener('scroll', updateScrollAndResize, { passive: true });
    window.addEventListener('resize', updateScrollAndResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleWindowClick, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollAndResize);
      window.removeEventListener('resize', updateScrollAndResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleWindowClick);
    };
  }, [reducedMotion]);

  // Shared lightweight signal damping helper that scenes can advance or sample
  const triggerEnergyPulse = useCallback((clientX?: number, clientY?: number) => {
    const s = signalsRef.current;
    s.lastPulseTime = performance.now() * 0.001;
    if (typeof clientX === 'number' && typeof clientY === 'number') {
      const { nx, ny } = calculatePointerOffset(
        clientX,
        clientY,
        window.innerWidth,
        window.innerHeight
      );
      s.pulseOriginX = nx;
      s.pulseOriginY = ny;
    } else {
      s.pulseOriginX = s.smoothX;
      s.pulseOriginY = s.smoothY;
    }
    s.interactionIntensity = 1;
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setManualReducedMotion((prev) => !prev);
  }, []);

  return (
    <GlobalMotionContext.Provider
      value={{
        signalsRef,
        activeSection,
        setActiveSection,
        reducedMotion,
        toggleReducedMotion,
        performanceTier,
        triggerEnergyPulse,
      }}
    >
      {children}
    </GlobalMotionContext.Provider>
  );
}

/**
 * Advances damped pointer values once per frame from the master animation loop.
 */
export function stepSharedMotionSignals(signals: SharedMotionSignals) {
  signals.smoothX = lerpValue(signals.smoothX, signals.pointerX, 0.075);
  signals.smoothY = lerpValue(signals.smoothY, signals.pointerY, 0.075);
  signals.delayedX = lerpValue(signals.delayedX, signals.smoothX, 0.045);
  signals.delayedY = lerpValue(signals.delayedY, signals.smoothY, 0.045);
  signals.interactionIntensity = lerpValue(
    signals.interactionIntensity,
    0,
    0.03
  );
}

export function useGlobalMotion(): GlobalMotionContextValue {
  const ctx = useContext(GlobalMotionContext);
  if (!ctx) {
    throw new Error('useGlobalMotion must be used within a GlobalMotionProvider');
  }
  return ctx;
}
