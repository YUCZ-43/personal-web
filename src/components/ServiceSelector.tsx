import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { SERVICE_OPTIONS, toggleService } from '../utils/heroLogic';

interface ServiceSelectorProps {
  services: string[];
  setServices: React.Dispatch<React.SetStateAction<string[]>>;
  onLetsGo?: () => void;
}

export function ServiceSelector({
  services,
  setServices,
  onLetsGo,
}: ServiceSelectorProps) {
  const handleToggle = (option: string) => {
    setServices((prev) => toggleService(prev, option));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="text-2xl font-medium tracking-tight mb-2 text-black"
      >
        What sort of service?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
        className="opacity-85 text-[#738273] mb-8"
      >
        Select all that apply
      </motion.p>

      {/* Multi-Select Service Pills */}
      <div
        role="group"
        aria-label="Service options"
        className="flex flex-wrap gap-3 mb-6"
      >
        {SERVICE_OPTIONS.map((option, index) => {
          const isSelected = services.includes(option);
          return (
            <motion.button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleToggle(option)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: 0.3 + index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileTap={{ scale: 0.97 }}
              layout
              className={`px-6 py-3.5 rounded-full text-base font-medium transition-colors duration-200 flex items-center gap-2.5 cursor-pointer select-none ${
                isSelected
                  ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform border border-transparent'
                  : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
              }`}
            >
              <AnimatePresence initial={false}>
                {isSelected && (
                  <motion.span
                    key="check-icon"
                    initial={{ scale: 0, opacity: 0, width: 0 }}
                    animate={{ scale: 1, opacity: 1, width: 'auto' }}
                    exit={{ scale: 0, opacity: 0, width: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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

      {/* Contingent Feedback Status Banner */}
      <div className="min-h-[64px]">
        <AnimatePresence mode="wait">
          {services.length === 0 ? (
            <motion.p
              key="empty-banner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="opacity-50 italic text-xs text-neutral-700 py-2"
            >
              Please click to select services above.
            </motion.p>
          ) : (
            <motion.div
              key="active-banner"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="overflow-hidden"
            >
              <div className="bg-[#FAFBF9] border border-[#E6EAE5] rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-sm text-[#1C2E1E] font-medium">
                  Ready to inquire about: {services.join(', ')}
                </span>
                <button
                  type="button"
                  onClick={onLetsGo}
                  className="inline-flex items-center gap-1.5 text-[#4D6D47] uppercase text-xs font-semibold tracking-wider hover:opacity-75 transition-opacity cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <span>Let&apos;s Go</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
