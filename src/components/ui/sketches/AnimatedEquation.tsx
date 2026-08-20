import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { cn } from '@/utils/cn';

interface AnimatedEquationProps {
  /** Fórmula ou frase curta — evite o caractere "→" (fora do charset latino
   * da Caveat, cairia para uma fonte de fallback no meio do texto
   * manuscrito). Use "·" para separar passos/palavras. */
  expression: string;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  /** Ver HandwrittenNote — mesmo mecanismo de visibilidade controlada externamente. */
  visible?: boolean;
}

const NBSP = ' ';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 6, rotate: -2 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Curta expressão (fórmula, sequência de palavras) revelada caractere a
 * caractere na fonte manuscrita, como se estivesse sendo escrita. Não é
 * traço SVG — inviável para texto arbitrário; o stagger de opacidade +
 * leve rotação já sustenta a sensação de escrita à mão.
 */
export function AnimatedEquation({ expression, className, delay = 0, once = true, amount = 0.5, visible }: AnimatedEquationProps) {
  const trigger = visible === undefined ? { whileInView: 'visible', viewport: { once, amount } } : { animate: visible ? 'visible' : 'hidden' };

  return (
    <motion.span
      className={cn('font-hand inline-block', className)}
      initial="hidden"
      variants={containerVariants}
      transition={{ delayChildren: delay }}
      aria-label={expression}
      {...trigger}
    >
      {expression.split('').map((char, i) => (
        <motion.span key={i} variants={charVariants} className="inline-block" aria-hidden="true">
          {char === ' ' ? NBSP : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
