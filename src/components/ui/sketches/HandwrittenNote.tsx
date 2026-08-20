import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface HandwrittenNoteProps {
  children: ReactNode;
  className?: string;
  /** Inclinação fixa, em graus — post-it/anotação de margem em vez de texto reto. */
  rotate?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
  /**
   * Quando definido, a visibilidade passa a ser controlada de fora (ex.:
   * hover do card/foto pai, via estado React) em vez de disparar sozinha
   * ao entrar na viewport — usado para anotações "descoberta no hover" no
   * desktop. Sem essa prop, o comportamento padrão (`whileInView`) não muda.
   */
  visible?: boolean;
}

const noteVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/**
 * Rótulo curto na fonte manuscrita, com leve inclinação fixa — usado para
 * anotações de margem (ex.: sobre uma fotografia). Some/aparece com fade,
 * não é traço SVG.
 */
export function HandwrittenNote({
  children,
  className,
  rotate = -3,
  delay = 0,
  once = true,
  amount = 0.5,
  visible,
}: HandwrittenNoteProps) {
  const trigger =
    visible === undefined ? { whileInView: 'visible', viewport: { once, amount } } : { animate: visible ? 'visible' : 'hidden' };

  return (
    <motion.span
      className={cn('font-hand inline-block', className)}
      style={{ rotate: `${rotate}deg` }}
      initial="hidden"
      variants={noteVariants}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      {...trigger}
    >
      {children}
    </motion.span>
  );
}
