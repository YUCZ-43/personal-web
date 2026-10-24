import { CONTACT_SERVICE_OPTIONS } from '../data/portfolioData';

export const SERVICE_OPTIONS = CONTACT_SERVICE_OPTIONS;
export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

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
 * Formats the inquiry banner text from selected services.
 */
export function formatInquiryBanner(services: string[]): string {
  if (services.length === 0) {
    return 'Select one or more areas above to tailor your inquiry.';
  }
  return `Selected areas: ${services.join(', ')}`;
}

/**
 * Generates Framer Motion scroll-triggered fade-in-up props using whileInView.
 */
export function getScrollRevealProps(delay = 0, yOffset = 24) {
  return {
    initial: { opacity: 0, y: yOffset },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.6,
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
 * Validates the contact form fields without faking submission or bypassing empty inputs.
 */
export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: ContactValidationResult['errors'] = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please share a brief overview of your project or idea.';
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

  const subject = `Portfolio Inquiry: ${areas} — ${input.name.trim()}`;
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
