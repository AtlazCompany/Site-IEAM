import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { SKETCH_PATHS } from './sketchPaths';

interface HandDrawnLineProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

/**
 * Traço desenhado à mão que "cresce" quando entra na viewport — usa
 * `pathLength` do Framer Motion (suporte nativo a SVG, sem lib extra). A
 * cor segue `currentColor`: herda do texto do elemento pai, então o
 * chamador controla a tinta via `text-*` do Tailwind.
 *
 * `prefers-reduced-motion` já é tratado globalmente pelo
 * `<MotionConfig reducedMotion="user">` em App.tsx — não precisa de
 * lógica extra aqui (mesmo padrão de Reveal.tsx).
 */
export function HandDrawnLine({
  orientation = 'horizontal',
  className,
  strokeWidth = 3,
  delay = 0,
  duration = 0.9,
  once = true,
  amount = 0.5,
}: HandDrawnLineProps) {
  const isHorizontal = orientation === 'horizontal';
  const d = isHorizontal ? SKETCH_PATHS.underline : SKETCH_PATHS.connector;
  const viewBox = isHorizontal ? '0 0 200 16' : '0 0 16 400';

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      className={cn(isHorizontal ? 'h-3 w-full' : 'h-full w-3', className)}
      aria-hidden="true"
    >
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once, amount }}
        transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
