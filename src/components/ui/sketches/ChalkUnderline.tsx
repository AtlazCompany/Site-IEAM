import type { ReactNode } from 'react';
import { HandDrawnLine } from './HandDrawnLine';
import { cn } from '@/utils/cn';

interface ChalkUnderlineProps {
  children: ReactNode;
  className?: string;
  /**
   * Cor da tinta — sempre explícita. `currentColor` não é confiável aqui:
   * palavras em degradê usam `bg-clip-text text-transparent`, o que
   * tornaria o traço invisível se ele apenas herdasse a cor do texto.
   */
  lineClassName?: string;
  delay?: number;
}

/**
 * Sublinhado desenhado à mão sob uma palavra ou frase curta — desenha uma
 * vez, ao entrar na viewport.
 */
export function ChalkUnderline({ children, className, lineClassName = 'text-gold-400', delay = 0.5 }: ChalkUnderlineProps) {
  return (
    <span className={cn('relative inline-block', className)}>
      {children}
      <HandDrawnLine
        orientation="horizontal"
        delay={delay}
        strokeWidth={4}
        className={cn('absolute inset-x-0 -bottom-2', lineClassName)}
      />
    </span>
  );
}
