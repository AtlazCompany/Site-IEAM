import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { SKETCH_PATHS } from './sketchPaths';

interface HandDrawnArrowProps {
  className?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  /** Ver HandwrittenNote — mesmo mecanismo de visibilidade controlada externamente. */
  visible?: boolean;
}

const arrowVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1 },
};

/**
 * Seta curva desenhada à mão — mesma técnica de HandDrawnLine (`pathLength`
 * do Framer Motion), com uma ponta em V ao final do traço.
 */
export function HandDrawnArrow({
  className,
  strokeWidth = 3,
  delay = 0,
  duration = 0.9,
  once = true,
  amount = 0.5,
  visible,
}: HandDrawnArrowProps) {
  const trigger = visible === undefined ? { whileInView: 'visible', viewport: { once, amount } } : { animate: visible ? 'visible' : 'hidden' };

  return (
    <svg viewBox="0 0 120 90" className={cn('h-16 w-20', className)} aria-hidden="true">
      <motion.path
        d={SKETCH_PATHS.arrow}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="hidden"
        variants={arrowVariants}
        transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
        {...trigger}
      />
    </svg>
  );
}
