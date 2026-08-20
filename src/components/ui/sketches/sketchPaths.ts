/**
 * Traçados SVG reutilizáveis para a camada de anotações "caderno vivo" —
 * levemente ondulados de propósito (nunca perfeitamente retos), para lerem
 * como feitos à mão em vez de formas geométricas.
 */
export const SKETCH_PATHS = {
  /** Sublinhado curto — usado por ChalkUnderline. viewBox "0 0 200 16". */
  underline: 'M3,10 C42,4 68,15 98,8 C128,2 162,14 197,7',
  /** Traço vertical alto — timeline/conector. viewBox "0 0 16 400". */
  connector: 'M8,4 C2,60 14,140 6,200 C-2,260 12,340 7,396',
  /** Seta curva — usada por HandDrawnArrow. viewBox "0 0 120 90". */
  arrow: 'M4,6 C36,22 58,14 82,46 C90,56 94,62 98,70 M98,70 L80,60 M98,70 L88,88',
  /** Círculo imperfeito ao redor de uma palavra. viewBox "0 0 100 84". */
  circle: 'M50,4 C74,2 92,18 92,40 C92,64 72,80 48,78 C24,76 6,58 8,36 C10,16 28,4 50,4',
  /** Estrelinha de 5 pontas. viewBox "0 0 48 48". */
  star: 'M24,2 L29,17 L44,17 L32,26 L36,41 L24,32 L12,41 L16,26 L4,17 L19,17 Z',
  /** X riscado, tipo caneta corrigindo uma conta errada. viewBox "0 0 40 40". */
  cross: 'M4,5 L35,34 M36,6 L5,36',
} as const;

export type SketchPathName = keyof typeof SKETCH_PATHS;
