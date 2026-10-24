import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy, Mail, ArrowUpRight } from 'lucide-react';
import { PERSONAL_CONFIG } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { useGlobalMotion } from '../context/GlobalMotionContext';
import { InteractiveButton } from './InteractiveButton';
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
  const { lang, t, isTransitioning } = useLanguage();
  const { triggerEnergyPulse } = useGlobalMotion();

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

  const [lastSyncedNote, setLastSyncedNote] = useState<string | undefined>(
    projectNote
  );
  if (projectNote !== lastSyncedNote) {
    setLastSyncedNote(projectNote);
    if (projectNote && !message.trim()) {
      setMessage(projectNote);
    }
  }

  const handleToggleArea = (
    optionId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    triggerEnergyPulse(e.clientX, e.clientY);
    setSelectedServices((prev) => toggleService(prev, optionId));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContactForm(
      {
        name,
        email,
        message,
        selectedServices,
      },
      lang
    );

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

  const selectedAreaLabels = selectedServices.map((id) => {
    const found = t.contact.serviceOptions.find((opt) => opt.id === id);
    return found ? found.label : id;
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`relative w-full py-24 sm:py-32 transition-opacity duration-200 ${
        isTransitioning ? 'opacity-80' : 'opacity-100'
      }`}
    >
      {/* Gradual Return Toward a Luminous Violet/Lavender Atmospheric Horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#21103F]/55 via-[#150A2E]/35 to-transparent"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Editorial Prompt & Service Multi-Select */}
          <div className="lg:col-span-6">
            <motion.p
              {...getScrollRevealProps(0, 16)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-[#E8C879] mb-4"
            >
              {t.contact.eyebrow}
            </motion.p>

            <motion.h2
              id="contact-heading"
              {...getScrollRevealProps(0.06, 24)}
              className="font-display text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] text-[#F4F0FF] leading-[1.1] mb-6"
            >
              {t.contact.heading}
            </motion.h2>

            <motion.p
              {...getScrollRevealProps(0.12, 20)}
              className="text-lg sm:text-xl text-[#ACA1C7] leading-relaxed mb-12 max-w-xl"
            >
              {t.contact.supportingText}
            </motion.p>

            {/* Multi-Select Areas of Interest */}
            <motion.div {...getScrollRevealProps(0.18, 20)}>
              <h3 className="font-display text-lg font-medium tracking-tight text-[#F4F0FF] mb-1.5">
                {t.contact.areasTitle}
              </h3>
              <p className="text-sm text-[#ACA1C7] mb-5">
                {t.contact.areasSubtitle}
              </p>

              <div
                role="group"
                aria-label={t.contact.areasTitle}
                className="flex flex-wrap gap-3 mb-5"
              >
                {t.contact.serviceOptions.map((option) => {
                  const isSelected = selectedServices.includes(option.id);
                  return (
                    <motion.button
                      key={option.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={(e) => handleToggleArea(option.id, e)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      layout
                      className={`px-5 py-3 rounded-full text-sm sm:text-[15px] font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8C879] ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#854DFF] to-[#6332D9] text-[#F4F0FF] border border-[#E8C879]/80 shadow-[0_0_24px_rgba(133,77,255,0.45)]'
                          : 'bg-[#150B2E]/85 text-[#ACA1C7] border border-[#BC9AFF]/25 hover:border-[#BC9AFF]/60 hover:text-[#F4F0FF]'
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
                            className="inline-flex items-center justify-center overflow-hidden text-[#E8C879]"
                          >
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <span>{option.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Status Feedback Line */}
              <p className="font-mono text-xs text-[#BC9AFF] min-h-[24px]">
                {formatInquiryBanner(selectedServices, lang)}
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
              className="bg-[#120A2A]/90 rounded-2xl border border-[#BC9AFF]/25 p-6 sm:p-10 space-y-6 shadow-[0_24px_64px_rgba(11,7,28,0.8)]"
            >
              {/* Name Field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono text-xs uppercase tracking-wider text-[#BC9AFF] mb-2"
                >
                  {t.contact.form.nameLabel}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? 'contact-name-error' : undefined
                  }
                  placeholder={t.contact.form.namePlaceholder}
                  className="w-full px-4 py-3.5 rounded-xl border border-[#BC9AFF]/25 bg-[#0B071C]/85 text-base text-[#F4F0FF] placeholder:text-[#ACA1C7]/45 focus:outline-none focus:border-[#E8C879] transition-colors"
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    role="alert"
                    className="mt-1.5 text-xs text-[#FF8A8A] font-medium"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono text-xs uppercase tracking-wider text-[#BC9AFF] mb-2"
                >
                  {t.contact.form.emailLabel}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? 'contact-email-error' : undefined
                  }
                  placeholder={t.contact.form.emailPlaceholder}
                  className="w-full px-4 py-3.5 rounded-xl border border-[#BC9AFF]/25 bg-[#0B071C]/85 text-base text-[#F4F0FF] placeholder:text-[#ACA1C7]/45 focus:outline-none focus:border-[#E8C879] transition-colors"
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    role="alert"
                    className="mt-1.5 text-xs text-[#FF8A8A] font-medium"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Read-Only Selected Areas Summary Input for Accessibility */}
              <div>
                <label
                  htmlFor="contact-selected-areas"
                  className="block font-mono text-xs uppercase tracking-wider text-[#BC9AFF] mb-2"
                >
                  {t.contact.form.selectedAreasLabel}
                </label>
                <input
                  id="contact-selected-areas"
                  name="selectedAreas"
                  type="text"
                  readOnly
                  value={
                    selectedAreaLabels.length > 0
                      ? selectedAreaLabels.join(lang === 'zh-CN' ? '、' : ', ')
                      : t.contact.form.noneSelectedValue
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#BC9AFF]/15 bg-[#21103F]/50 text-sm text-[#E8C879] focus:outline-none"
                />
              </div>

              {/* Project or Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs uppercase tracking-wider text-[#BC9AFF] mb-2"
                >
                  {t.contact.form.messageLabel}
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
                  placeholder={t.contact.form.messagePlaceholder}
                  className="w-full px-4 py-3.5 rounded-xl border border-[#BC9AFF]/25 bg-[#0B071C]/85 text-base text-[#F4F0FF] placeholder:text-[#ACA1C7]/45 focus:outline-none focus:border-[#E8C879] transition-colors resize-y"
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-1.5 text-xs text-[#FF8A8A] font-medium"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <InteractiveButton
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  <span>{t.contact.form.submitButton}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="w-4 h-4 stroke-[2] text-[#E8C879]"
                  />
                </InteractiveButton>
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
                      className="mt-4 p-5 rounded-xl bg-[#21103F]/90 border border-[#E8C879]/45 space-y-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#E8C879] mb-1">
                          {t.contact.form.fallback.title}
                        </p>
                        <p className="text-xs text-[#ACA1C7] leading-relaxed">
                          {t.contact.form.fallback.descriptionPrefix}
                          <span className="font-mono text-[#F4F0FF]">
                            {PERSONAL_CONFIG.email}
                          </span>
                          .
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={preparedPayload.mailtoUrl}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#854DFF] text-[#F4F0FF] text-xs font-medium hover:bg-[#6E36EB] transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{t.contact.form.fallback.openEmailButton}</span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="w-3.5 h-3.5 text-[#E8C879]"
                          />
                        </a>

                        <button
                          type="button"
                          onClick={handleCopyInquiry}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B071C]/90 border border-[#BC9AFF]/35 text-[#F4F0FF] text-xs font-medium hover:border-[#E8C879] transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#E8C879]" />
                          <span>
                            {copied
                              ? t.contact.form.fallback.copiedButton
                              : t.contact.form.fallback.copyButton}
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
