import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface CircledWordProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Respiro entre o texto e o traço, em `em` — escala com o tamanho da fonte
 * em vez de um valor fixo em px, que fica largo demais numa palavra curta e
 * apertado demais numa frase longa. */
const PAD_X_EM = 0.34;
const PAD_Y_EM = 0.32;

/**
 * Pontos de controle (fração da largura/altura da caixa) do mesmo traço
 * imperfeito de `SKETCH_PATHS.circle`, só que parametrizados — assim
 * qualquer palavra ou frase recebe a mesma "personalidade" de rabisco,
 * esticada com uniformidade (não achatada) para a proporção real do texto.
 */
const CONTROL_POINTS: [number, number][] = [
  [0.5, 0.048],
  [0.74, 0.024],
  [0.92, 0.214],
  [0.92, 0.476],
  [0.92, 0.762],
  [0.72, 0.952],
  [0.48, 0.929],
  [0.24, 0.905],
  [0.06, 0.69],
  [0.08, 0.429],
  [0.1, 0.19],
  [0.28, 0.048],
  [0.5, 0.048],
];

function buildPath(w: number, h: number): string {
  const p = CONTROL_POINTS.map(([fx, fy]) => `${(fx * w).toFixed(1)},${(fy * h).toFixed(1)}`);
  return `M${p[0]} C${p[1]} ${p[2]} ${p[3]} C${p[4]} ${p[5]} ${p[6]} C${p[7]} ${p[8]} ${p[9]} C${p[10]} ${p[11]} ${p[12]}`;
}

/**
 * Círculo/oval desenhado à mão ao redor de uma palavra ou frase curta —
 * mede o texto de verdade (largura/altura renderizadas, via
 * `ResizeObserver`) em vez de esticar um traço de tamanho fixo sobre uma
 * caixa arbitrária. Isso resolve dois problemas do rabisco fixo anterior:
 * (1) o respiro em px virava desproporcional em palavras muito curtas ou
 * muito longas; (2) quando a frase quebrava de linha em telas estreitas, o
 * contorno não acompanhava. Como a medição reage ao próprio elemento, o
 * traço se recalcula sozinho em qualquer largura de tela ou quebra de linha.
 */
export function CircledWord({ children, delay = 0.35, className }: CircledWordProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState<{ w: number; h: number; padX: number; padY: number } | null>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return undefined;

    const measure = () => {
      const fontSize = parseFloat(getComputedStyle(el).fontSize) || 16;
      const padX = fontSize * PAD_X_EM;
      const padY = fontSize * PAD_Y_EM;
      setBox({ w: el.offsetWidth + padX * 2, h: el.offsetHeight + padY * 2, padX, padY });
    };

    measure();

    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span className="relative inline-block px-0.5">
      <span ref={textRef} className="relative">
        {children}
      </span>
      {box && (
        <svg
          viewBox={`0 0 ${box.w} ${box.h}`}
          className={cn('pointer-events-none absolute text-gold-500', className)}
          style={{ left: -box.padX, top: -box.padY, width: box.w, height: box.h }}
          aria-hidden="true"
        >
          <motion.path
            d={buildPath(box.w, box.h)}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
            transition={{ duration: 2.6, delay, times: [0, 0.4, 1], ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>
      )}
    </span>
  );
}
