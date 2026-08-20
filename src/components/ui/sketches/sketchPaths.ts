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

/**
 * Ilustrações de margem no estilo "giz/lápis de cor" — usadas pelo
 * `ChalkDoodle` na seção "Por que o IEAM". Cada uma é 1–3 traços num
 * viewBox 64×64, propositalmente imperfeitos (o mesmo espírito de
 * SKETCH_PATHS acima), pensados para serem desenhados a mão pelo próprio
 * componente (pathLength), não para serem imagens estáticas.
 */
export const DOODLE_PATHS = {
  sun: {
    viewBox: '0 0 64 64',
    strokes: [
      'M32,16 C41,16 48,23 48,32 C48,41 41,48 32,48 C23,48 16,41 16,32 C16,23 23,16 32,16 Z',
      'M32,2 L32,9 M32,55 L32,62 M2,32 L9,32 M55,32 L62,32 M10,10 L15,15 M49,49 L54,54 M10,54 L15,49 M49,15 L54,10',
    ],
  },
  cloud: {
    viewBox: '0 0 64 64',
    strokes: [
      'M16,42 C9,42 4,37 6,30 C7,24 13,21 18,23 C19,13 28,7 37,10 C44,12 48,19 47,26 C55,25 60,31 58,38 C57,44 50,46 44,45 L20,45 C18,45 16,44 16,42 Z',
    ],
  },
  star: {
    viewBox: '0 0 48 48',
    strokes: [SKETCH_PATHS.star as string],
  },
  heart: {
    viewBox: '0 0 64 64',
    strokes: [
      'M32,54 C8,38 2,24 11,14 C18,6 29,9 32,20 C35,9 46,6 53,14 C62,24 56,38 32,54 Z',
    ],
  },
  paperPlane: {
    viewBox: '0 0 64 64',
    strokes: ['M6,36 L58,8 L36,58 L28,36 L6,36 Z', 'M28,36 L58,8'],
  },
  apple: {
    viewBox: '0 0 64 64',
    strokes: [
      'M32,22 C17,19 8,30 11,42 C13,52 22,60 32,58 C42,60 51,52 53,42 C56,30 47,19 32,22 Z',
      'M32,22 C30,15 34,9 41,7',
    ],
  },
  pencil: {
    viewBox: '0 0 64 64',
    strokes: ['M9,56 L42,23 L52,13 L57,18 L47,28 L14,61 Z', 'M42,23 L47,28', 'M9,56 L5,60 L9,52 Z'],
  },
  globe: {
    viewBox: '0 0 64 64',
    strokes: [
      'M32,7 C46,7 57,18 57,32 C57,46 46,57 32,57 C18,57 7,46 7,32 C7,18 18,7 32,7 Z',
      'M8,32 L56,32',
      'M32,7 C41,16 41,48 32,57 C23,48 23,16 32,7 Z',
    ],
  },
  /**
   * Símbolos matemáticos desenhados à mão — mesma técnica dos doodles
   * acima, só que para a timeline de Metodologia, que pediu operações/
   * símbolos em vez de ilustrações infantis (sol, nuvem etc.).
   */
  check: {
    viewBox: '0 0 64 64',
    strokes: ['M8,32 L25,49 L57,12'],
  },
  root: {
    viewBox: '0 0 64 64',
    strokes: ['M4,29 L15,38 L27,6 L60,6'],
  },
  multiply: {
    viewBox: '0 0 64 64',
    strokes: ['M11,11 L53,53', 'M53,11 L11,53'],
  },
  divide: {
    viewBox: '0 0 64 64',
    strokes: [
      'M6,32 L58,32',
      'M28,13 C31,13 33,15 33,18 C33,21 31,23 28,23 C25,23 23,21 23,18 C23,15 25,13 28,13 Z',
      'M28,41 C31,41 33,43 33,46 C33,49 31,51 28,51 C25,51 23,49 23,46 C23,43 25,41 28,41 Z',
    ],
  },
  /** Capelo de formatura — usado no selo "30+ anos" (Stats.tsx). */
  graduationCap: {
    viewBox: '0 0 64 64',
    strokes: [
      'M5,25 L32,11 L59,25 L32,39 Z',
      'M20,28 L20,39 C20,44 25,48 32,48 C39,48 44,44 44,39 L44,28',
      'M50,23 L52,40 C52,43 50,45 47,46',
    ],
  },
} as const;

export type DoodleName = keyof typeof DOODLE_PATHS;
