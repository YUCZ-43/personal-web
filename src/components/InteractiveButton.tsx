import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useGlobalMotion } from '../context/GlobalMotionContext';

interface InteractiveButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}

export function InteractiveButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  ariaLabel,
  external = false,
}: InteractiveButtonProps) {
  const { triggerEnergyPulse, reducedMotion } = useGlobalMotion();
  const [rippleKey, setRippleKey] = useState<number>(0);

  const handleInteraction = (event: React.MouseEvent<HTMLElement>) => {
    setRippleKey((prev) => prev + 1);
    triggerEnergyPulse(event.clientX, event.clientY);
    onClick?.(event);
  };

  const baseClasses =
    'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium transition-colors duration-300 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C879]';

  const variantClasses = {
    primary:
      'px-7 py-4 text-sm sm:text-[15px] text-[#F4F0FF] bg-gradient-to-r from-[#854DFF]/90 via-[#6B38E8]/90 to-[#5224C7]/90 border border-[#BC9AFF]/45 shadow-[0_0_28px_rgba(133,77,255,0.35)] hover:border-[#E8C879]/80 hover:shadow-[0_0_36px_rgba(232,200,121,0.32)]',
    secondary:
      'px-6 py-3.5 text-sm sm:text-[15px] text-[#F4F0FF] bg-[#21103F]/75 border border-[#BC9AFF]/30 hover:bg-[#2E1759]/85 hover:border-[#E8C879]/65 shadow-[0_0_20px_rgba(11,7,28,0.5)]',
    ghost:
      'px-4 py-2.5 text-sm sm:text-[15px] text-[#BC9AFF] hover:text-[#E8C879] border border-transparent hover:border-[#BC9AFF]/25 bg-transparent',
  }[variant];

  const motionProps = reducedMotion
    ? {}
    : {
        whileHover: { y: -2.5, scale: 1.015 },
        whileTap: { y: 0.5, scale: 0.965 },
        transition: { type: 'spring' as const, stiffness: 380, damping: 22 },
      };

  const innerContent = (
    <>
      {/* Subtle Top Gold Specular Reflection Line */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8C879]/60 to-transparent opacity-65 group-hover:opacity-100 transition-opacity"
      />

      {/* Contained Radial Energy Pulse on Click */}
      {rippleKey > 0 && !reducedMotion && (
        <motion.span
          key={rippleKey}
          aria-hidden="true"
          initial={{ scale: 0.2, opacity: 0.55 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 m-auto w-16 h-16 rounded-full bg-radial from-[#E8C879]/60 via-[#854DFF]/35 to-transparent"
        />
      )}

      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={handleInteraction}
        {...motionProps}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      onClick={handleInteraction}
      {...motionProps}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {innerContent}
    </motion.button>
  );
}
