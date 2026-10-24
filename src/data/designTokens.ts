export const COSMIC_TOKENS = {
  colors: {
    deepCosmicViolet: '#0B071C',
    nebulaPurple: '#21103F',
    electricViolet: '#854DFF',
    softLavender: '#BC9AFF',
    champagneGold: '#E8C879',
    spectralCyan: '#6AD9FF',
    moonlightWhite: '#F4F0FF',
    mutedLavender: '#ACA1C7',
  },
  motion: {
    /** Breathing cycle period in seconds (6–8s range) */
    breathingPeriodSeconds: 7.2,
    /** Vertical float amplitude in pixels */
    breathingFloatPx: 3.5,
    /** Scale expansion amplitude */
    breathingScaleDelta: 0.011,
    /** Damping factor for pointer tracking */
    pointerDamping: 0.075,
  },
  particles: {
    desktop: {
      distantStars: 1400,
      galaxySpiral: 3600,
      foregroundInteractive: 90,
    },
    tablet: {
      distantStars: 800,
      galaxySpiral: 2000,
      foregroundInteractive: 55,
    },
    mobile: {
      distantStars: 450,
      galaxySpiral: 1100,
      foregroundInteractive: 30,
    },
  },
} as const;

export type PerformanceTier = 'desktop' | 'tablet' | 'mobile';

export function detectPerformanceTier(viewportWidth: number): PerformanceTier {
  if (viewportWidth < 768) return 'mobile';
  if (viewportWidth < 1024) return 'tablet';
  return 'desktop';
}
