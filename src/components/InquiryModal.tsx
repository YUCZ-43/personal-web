import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: string[];
}

export function InquiryModal({
  isOpen,
  onClose,
  selectedServices,
}: InquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please enter both your name and email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError('');
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-dialog-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EAECE9]"
          >
            <button
              type="button"
              onClick={handleResetAndClose}
              aria-label="Close inquiry dialog"
              className="absolute top-6 right-6 p-2 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#EAECE9] text-[#1C2E1E] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3
                  id="inquiry-dialog-title"
                  className="text-2xl font-medium tracking-tight text-black mb-2"
                >
                  Inquiry Received
                </h3>
                <p className="text-[#5A635A] text-sm mb-6">
                  Thanks, {name}. Our studio team will follow up with you shortly regarding{' '}
                  <span className="font-medium text-[#1C2E1E]">
                    {selectedServices.length > 0
                      ? selectedServices.join(', ')
                      : 'your project'}
                  </span>
                  .
                </p>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-6 py-3 rounded-full bg-[#1C2E1E] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Back to Mainframe
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3
                  id="inquiry-dialog-title"
                  className="text-2xl font-medium tracking-tight text-black mb-1"
                >
                  Start a Conversation
                </h3>
                <p className="text-sm text-[#5A635A] mb-5">
                  {selectedServices.length > 0
                    ? `Inquiring about: ${selectedServices.join(', ')}`
                    : 'Tell us about your upcoming initiative.'}
                </p>

                {error && (
                  <p role="alert" className="text-xs text-red-600 mb-4 font-medium">
                    {error}
                  </p>
                )}

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-xs font-medium text-[#1C2E1E] uppercase tracking-wider mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E6E2] bg-[#FAFBF9] text-sm text-black focus:outline-none focus:border-[#1C2E1E] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-xs font-medium text-[#1C2E1E] uppercase tracking-wider mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E6E2] bg-[#FAFBF9] text-sm text-black focus:outline-none focus:border-[#1C2E1E] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-xs font-medium text-[#1C2E1E] uppercase tracking-wider mb-1.5"
                    >
                      Project Brief (Optional)
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Timeline, goals, or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E6E2] bg-[#FAFBF9] text-sm text-black focus:outline-none focus:border-[#1C2E1E] transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-5 py-2.5 rounded-full text-sm text-[#5A635A] hover:text-black transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C2E1E] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <span>Send Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
