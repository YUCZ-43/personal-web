import { CONTACT_SERVICE_OPTIONS } from '../data/portfolioData';
import { TRANSLATIONS, type SupportedLanguage } from '../data/translations';
import { COSMIC_TOKENS } from '../data/designTokens';

export const SERVICE_OPTIONS = CONTACT_SERVICE_OPTIONS;
export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

/**
 * Resolves the initial language preference.
 * Defaults to 'zh-CN' for first-time visitors unless a valid manual preference is saved.
 */
export function resolveInitialLanguage(storedValue?: string | null): SupportedLanguage {
  if (storedValue === 'en' || storedValue === 'zh-CN') {
    return storedValue;
  }
  return 'zh-CN';
}

/**
 * Pure helper to toggle a service option inside the selected services list.
 */
export function toggleService(current: string[], service: string): string[] {
  if (current.includes(service)) {
    return current.filter((item) => item !== service);
  }
  return [...current, service];
}

/**
 * Pure helper to calculate the next target scrub time for the background video.
 */
export function calculateScrubTime(
  currentTime: number,
  deltaX: number,
  viewportWidth: number,
  duration: number
): number {
  if (!duration || Number.isNaN(duration) || duration <= 0 || viewportWidth <= 0) {
    return 0;
  }
  const scrubDelta = (deltaX / viewportWidth) * 0.8 * duration;
  const nextTime = currentTime + scrubDelta;
  return Math.max(0, Math.min(duration, nextTime));
}

/**
 * Linear interpolation for smooth cursor-tracking displacement & rotation.
 */
export function lerpValue(current: number, target: number, factor: number): number {
  const clampedFactor = Math.max(0, Math.min(1, factor));
  return current + (target - current) * clampedFactor;
}

/**
 * Computes normalized pointer offset in [-1, 1] with restrained amplitude clamping.
 */
export function calculatePointerOffset(
  clientX: number,
  clientY: number,
  viewportWidth: number,
  viewportHeight: number
): { nx: number; ny: number } {
  if (viewportWidth <= 0 || viewportHeight <= 0) {
    return { nx: 0, ny: 0 };
  }
  const rawX = (clientX / viewportWidth - 0.5) * 2;
  const rawY = (clientY / viewportHeight - 0.5) * 2;
  return {
    nx: Math.max(-1, Math.min(1, rawX)),
    ny: Math.max(-1, Math.min(1, rawY)),
  };
}

/**
 * Computes the restrained idle breathing state for the digital human (6–8s cycle).
 */
export function calculateBreathingState(
  elapsedSeconds: number,
  periodSeconds: number = COSMIC_TOKENS.motion.breathingPeriodSeconds
): {
  floatY: number;
  scale: number;
  rimGlow: number;
} {
  const safePeriod = periodSeconds > 0 ? periodSeconds : 7.2;
  const phase = (elapsedSeconds / safePeriod) * Math.PI * 2;
  const wave = Math.sin(phase);
  const normalizedWave = (wave + 1) * 0.5; // [0, 1]

  return {
    floatY: wave * COSMIC_TOKENS.motion.breathingFloatPx,
    scale: 1 + normalizedWave * COSMIC_TOKENS.motion.breathingScaleDelta,
    rimGlow: 0.45 + normalizedWave * 0.55,
  };
}

/**
 * Deterministic 3D spiral galaxy point calculation for an Andromeda-inspired disc.
 */
export function calculateSpiralStarPoint(
  index: number,
  total: number,
  arms = 3,
  maxRadius = 14
): { x: number; y: number; z: number; coreFactor: number } {
  const safeTotal = Math.max(1, total);
  const t = index / safeTotal;
  // Bias distribution toward the luminous galactic core
  const radius = Math.pow(t, 1.35) * maxRadius;
  const armIndex = index % arms;
  const armAngle = (armIndex / arms) * Math.PI * 2;
  const spinAngle = radius * 0.52;

  // Deterministic pseudo-random offsets so no Math.random() instability occurs in tests
  const h1 = Math.sin(index * 12.9898) * 43758.5453;
  const r1 = h1 - Math.floor(h1) - 0.5;
  const h2 = Math.sin(index * 78.233) * 43758.5453;
  const r2 = h2 - Math.floor(h2) - 0.5;
  const h3 = Math.sin(index * 39.425) * 43758.5453;
  const r3 = h3 - Math.floor(h3) - 0.5;

  const spread = 0.35 + radius * 0.14;
  const angle = armAngle + spinAngle;

  const x = Math.cos(angle) * radius + r1 * spread;
  // Disc thickness tapers away from core
  const y = r2 * (0.45 + (1 - t) * 0.65);
  const z = Math.sin(angle) * radius + r3 * spread;
  const coreFactor = Math.max(0, 1 - radius / maxRadius);

  return { x, y, z, coreFactor };
}

/**
 * Pure helper to compute typewriter slice and completion status for a given step index.
 */
export function getTypewriterState(fullText: string, charIndex: number): {
  displayed: string;
  done: boolean;
} {
  const clampedIndex = Math.max(0, Math.min(fullText.length, charIndex));
  return {
    displayed: fullText.slice(0, clampedIndex),
    done: clampedIndex >= fullText.length,
  };
}

/**
 * Formats the inquiry banner text from selected services with bilingual support.
 */
export function formatInquiryBanner(
  services: string[],
  lang: SupportedLanguage = 'en'
): string {
  const dict = TRANSLATIONS[lang].contact;
  if (services.length === 0) {
    return dict.emptyAreasHint;
  }
  const localizedNames = services.map((id) => {
    const found = dict.serviceOptions.find((opt) => opt.id === id);
    return found ? found.label : id;
  });
  return `${dict.selectedAreasPrefix}${localizedNames.join(lang === 'zh-CN' ? '、' : ', ')}`;
}

/**
 * Generates Framer Motion scroll-triggered fade-in-up props using whileInView.
 */
export function getScrollRevealProps(delay = 0, yOffset = 24) {
  return {
    initial: { opacity: 0, y: yOffset },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  };
}

export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
  selectedServices: string[];
}

export interface ContactValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

/**
 * Validates the contact form fields with localized error messages.
 */
export function validateContactForm(
  input: ContactFormInput,
  lang: SupportedLanguage = 'en'
): ContactValidationResult {
  const errDict = TRANSLATIONS[lang].contact.form.errors;
  const errors: ContactValidationResult['errors'] = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = errDict.nameRequired;
  }

  if (!trimmedEmail) {
    errors.email = errDict.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = errDict.emailInvalid;
  }

  if (!trimmedMessage) {
    errors.message = errDict.messageRequired;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds a transparent mailto URL and plain-text summary for the email-based contact fallback.
 */
export function buildMailtoPayload(
  recipientEmail: string,
  input: ContactFormInput
): { mailtoUrl: string; subject: string; bodyText: string } {
  const areas =
    input.selectedServices.length > 0
      ? input.selectedServices.join(', ')
      : 'General Inquiry';

  const subject = `Portfolio Inquiry [魚橙子 YU CHENGZI]: ${areas} — ${input.name.trim()}`;
  const bodyLines = [
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    `Areas of Interest: ${areas}`,
    '',
    'Project / Message:',
    input.message.trim(),
  ];
  const bodyText = bodyLines.join('\n');
  const mailtoUrl = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(bodyText)}`;

  return { mailtoUrl, subject, bodyText };
}
