import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy, Mail, ArrowUpRight } from 'lucide-react';
import {
  CONTACT_SERVICE_OPTIONS,
  PERSONAL_CONFIG,
} from '../data/portfolioData';
import {
  toggleService,
  validateContactForm,
  buildMailtoPayload,
  getScrollRevealProps,
  formatInquiryBanner,
} from '../utils/heroLogic';

interface ContactProps {
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
  projectNote?: string;
}

export function Contact({
  selectedServices,
  setSelectedServices,
  projectNote,
}: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(projectNote ?? '');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [preparedPayload, setPreparedPayload] = useState<{
    mailtoUrl: string;
    subject: string;
    bodyText: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync message if user clicks "Discuss this system" on a project card
  const [lastSyncedNote, setLastSyncedNote] = useState<string | undefined>(
    projectNote
  );
  if (projectNote !== lastSyncedNote) {
    setLastSyncedNote(projectNote);
    if (projectNote && !message.trim()) {
      setMessage(projectNote);
    }
  }

  const handleToggleArea = (option: string) => {
    setSelectedServices((prev) => toggleService(prev, option));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContactForm({
      name,
      email,
      message,
      selectedServices,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedPayload(null);
      return;
    }

    setErrors({});
    const payload = buildMailtoPayload(PERSONAL_CONFIG.email, {
      name,
      email,
      message,
      selectedServices,
    });
    setPreparedPayload(payload);
  };

  const handleCopyInquiry = async () => {
    if (!preparedPayload) return;
    try {
      await navigator.clipboard.writeText(preparedPayload.bodyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full py-24 sm:py-32 bg-[#F4F5FA] border-t border-neutral-900/10"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Editorial Prompt & Service Multi-Select */}
          <div className="lg:col-span-6">
            <motion.p
              {...getScrollRevealProps(0, 16)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-[#2D46B9] mb-4"
            >
              05 / Contact
            </motion.p>

            <motion.h2
              id="contact-heading"
              {...getScrollRevealProps(0.06, 24)}
              className="text-4xl sm:text-5xl lg:text-[54px] font-medium tracking-[-0.03em] text-neutral-950 leading-[1.08] mb-6"
            >
              Have an idea worth building?
            </motion.h2>

            <motion.p
              {...getScrollRevealProps(0.12, 20)}
              className="text-lg sm:text-xl text-neutral-600 leading-relaxed mb-12 max-w-xl"
            >
              Whether it&apos;s an AI product, a development workflow, or an
              experimental digital experience, I&apos;d be interested in hearing
              about it.
            </motion.p>

            {/* Multi-Select Areas of Interest */}
            <motion.div {...getScrollRevealProps(0.18, 20)}>
              <h3 className="text-lg font-medium tracking-tight text-neutral-950 mb-1.5">
                Areas of interest
              </h3>
              <p className="text-sm text-neutral-500 mb-5">
                Select all that apply
              </p>

              <div
                role="group"
                aria-label="Areas of interest"
                className="flex flex-wrap gap-3 mb-5"
              >
                {CONTACT_SERVICE_OPTIONS.map((option) => {
                  const isSelected = selectedServices.includes(option);
                  return (
                    <motion.button
                      key={option}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => handleToggleArea(option)}
                      whileTap={{ scale: 0.97 }}
                      layout
                      className={`px-5 py-3 rounded-full text-sm sm:text-[15px] font-medium transition-colors duration-200 flex items-center gap-2 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D46B9] ${
                        isSelected
                          ? 'bg-neutral-950 text-white shadow-sm border border-neutral-950'
                          : 'bg-white text-neutral-900 border border-neutral-900/15 hover:border-neutral-900/40'
                      }`}
                    >
                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <motion.span
                            key="check-icon"
                            initial={{ scale: 0, opacity: 0, width: 0 }}
                            animate={{ scale: 1, opacity: 1, width: 'auto' }}
                            exit={{ scale: 0, opacity: 0, width: 0 }}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 20,
                            }}
                            className="inline-flex items-center justify-center overflow-hidden"
                          >
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <span>{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Status Feedback Line */}
              <p className="font-mono text-xs text-neutral-600 min-h-[24px]">
                {formatInquiryBanner(selectedServices)}
              </p>
            </motion.div>
          </div>

          {/* Right Column: Accessible Contact Form & Honest Email Fallback */}
          <motion.div
            {...getScrollRevealProps(0.16, 28)}
            className="lg:col-span-6"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl border border-neutral-900/10 p-6 sm:p-10 space-y-6"
            >
              {/* Name Field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono text-xs uppercase tracking-wider text-neutral-700 mb-2"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  placeholder="Your name"
                  className="w-full px-4 py-3.5 rounded-xl border border-neutral-900/15 bg-[#FAFAFC] text-base text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-[#2D46B9] transition-colors"
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    role="alert"
                    className="mt-1.5 text-xs text-red-600 font-medium"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono text-xs uppercase tracking-wider text-neutral-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-neutral-900/15 bg-[#FAFAFC] text-base text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-[#2D46B9] transition-colors"
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    role="alert"
                    className="mt-1.5 text-xs text-red-600 font-medium"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Read-Only Selected Areas Summary Input for Accessibility */}
              <div>
                <label
                  htmlFor="contact-selected-areas"
                  className="block font-mono text-xs uppercase tracking-wider text-neutral-700 mb-2"
                >
                  Selected areas of interest
                </label>
                <input
                  id="contact-selected-areas"
                  name="selectedAreas"
                  type="text"
                  readOnly
                  value={
                    selectedServices.length > 0
                      ? selectedServices.join(', ')
                      : 'None selected (General Inquiry)'
                  }
                  className="w-full px-4 py-3 rounded-xl border border-neutral-900/10 bg-neutral-100/80 text-sm text-neutral-700 focus:outline-none"
                />
              </div>

              {/* Project or Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs uppercase tracking-wider text-neutral-700 mb-2"
                >
                  Project or message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) {
                      setErrors((prev) => ({ ...prev, message: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'contact-message-error' : undefined
                  }
                  placeholder="Tell me about the problem, timeline, or idea you're exploring..."
                  className="w-full px-4 py-3.5 rounded-xl border border-neutral-900/15 bg-[#FAFAFC] text-base text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-[#2D46B9] transition-colors resize-y"
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-1.5 text-xs text-red-600 font-medium"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-neutral-950 text-white text-sm sm:text-[15px] font-medium hover:bg-[#2D46B9] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2D46B9]"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 stroke-[2]" />
                </button>
              </div>

              {/* Honest Email-Based Fallback Panel */}
              <AnimatePresence>
                {preparedPayload && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div
                      role="status"
                      aria-live="polite"
                      className="mt-4 p-5 rounded-xl bg-[#F4F6FD] border border-[#2D46B9]/25 space-y-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-neutral-950 mb-1">
                          Direct Email Handoff Ready
                        </p>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          No backend mail server is configured on this static deployment. Your inquiry has been formatted for direct email delivery to{' '}
                          <span className="font-mono text-neutral-900">
                            {PERSONAL_CONFIG.email}
                          </span>
                          .
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={preparedPayload.mailtoUrl}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2D46B9] text-white text-xs font-medium hover:bg-neutral-950 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Open in Email Client</span>
                          <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={handleCopyInquiry}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-neutral-900/15 text-neutral-900 text-xs font-medium hover:border-neutral-900/40 transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>
                            {copied ? 'Copied to Clipboard' : 'Copy Formatted Message'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
