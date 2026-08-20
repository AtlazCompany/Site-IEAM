import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { cn } from '@/utils/cn';
import { DOODLE_PATHS } from './sketchPaths';
import type { DoodleName } from './sketchPaths';

interface ChalkDoodleProps {
  name: DoodleName;
  className?: string;
  /** Inclinação fixa, em graus — reforça o aspecto "desenhado à mão livre". */
  rotate?: number;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
};

const strokeVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

/**
 * Ilustração decorativa de margem (sol, nuvem, estrela, coração, aviãozinho
 * de papel, maçã, lápis, globo) que se desenha sozinha — traço a traço —
 * quando entra na viewport, como se alguém estivesse rabiscando na página
 * enquanto o usuário rola. Puramente decorativa: `aria-hidden`,
 * `pointer-events-none`, nunca deve receber foco ou bloquear cliques.
 *
 * `prefers-reduced-motion` já é tratado globalmente pelo
 * `<MotionConfig reducedMotion="user">` em App.tsx (mesmo padrão de
 * HandDrawnLine/CircledWord) — com a preferência ativa, o traço aparece
 * direto no estado final, sem animação.
 */
export function ChalkDoodle({
  name,
  className,
  rotate = 0,
  strokeWidth = 2.5,
  delay = 0,
  duration = 1.1,
  once = true,
  amount = 0.4,
}: ChalkDoodleProps) {
  const doodle = DOODLE_PATHS[name];

  return (
    <motion.svg
      viewBox={doodle.viewBox}
      className={cn('overflow-visible', className)}
      style={{ rotate: `${rotate}deg` }}
      aria-hidden="true"
      focusable="false"
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      transition={{ delayChildren: delay }}
    >
      {doodle.strokes.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={strokeVariants}
          transition={{ duration, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
    </motion.svg>
  );
}
