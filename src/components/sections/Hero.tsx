import { useEffect, useRef } from 'react';
import { ArrowRight, PlayCircle, GraduationCap, School, Laptop, Building2 } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Button, Container, ShaderBackground } from '@/components/ui';
import { useEnrollmentModal } from '@/hooks/useEnrollmentModal';
import { SITE } from '@/constants/site';

/** Subtle cursor-follow depth — desktop pointer only, off for touch and reduced motion. */
function useHeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;

    function handleMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    }
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, [prefersReducedMotion, mx, my]);

  return { ref, springX, springY };
}

const INDICATORS = [
  { icon: GraduationCap, value: '+30 anos', label: 'de tradição' },
  { icon: School, value: 'Infantil ao Médio', label: 'níveis de ensino' },
  { icon: Laptop, value: 'Metodologia', label: 'própria e ativa' },
  { icon: Building2, value: 'Infraestrutura', label: 'moderna' },
];

export function Hero() {
  const { openEnrollment } = useEnrollmentModal();
  const { ref: parallaxRef, springX, springY } = useHeroParallax();
  const blob1X = useTransform(springX, [-1, 1], [-18, 18]);
  const blob1Y = useTransform(springY, [-1, 1], [-18, 18]);
  const blob2X = useTransform(springX, [-1, 1], [14, -14]);
  const blob2Y = useTransform(springY, [-1, 1], [14, -14]);
  const panelX = useTransform(springX, [-1, 1], [-6, 6]);
  const panelY = useTransform(springY, [-1, 1], [-6, 6]);

  return (
    <section
      ref={parallaxRef}
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-brand-950 pt-32 pb-20 text-white"
    >
      {/* Camada atmosférica — shader "Mesh drift" atrás do conteúdo, lento e sutil */}
      <ShaderBackground className="-z-20" speed={0.85} intensity={0.9} />

      {/* Overlays de legibilidade: mais escuro à esquerda (título), mais luminoso à direita (cards) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/88 via-brand-950/55 to-brand-950/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-brand-950 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-[0.08]" />

      {/*
        Decorative glow blobs — subtle cursor-follow depth on desktop.
        will-change fica restrito a estes dois elementos (os únicos que
        realmente animam em resposta ao ponteiro) e o blur foi reduzido de
        110px para 80px: continua lendo como um brilho suave, mas custa
        bem menos compositing a cada frame de movimento do mouse.
      */}
      <motion.div
        style={{ x: blob1X, y: blob1Y, willChange: 'transform' }}
        className="pointer-events-none absolute -top-24 -right-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand-500/25 blur-[80px]"
      />
      <motion.div
        style={{ x: blob2X, y: blob2Y, willChange: 'transform' }}
        className="pointer-events-none absolute bottom-0 -left-24 -z-10 h-[24rem] w-[24rem] rounded-full bg-gold-400/15 blur-[80px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs label-mono text-gold-300 ring-1 ring-inset ring-white/15"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Matrículas abertas para {SITE.enrollmentYear}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-balance text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
            >
              Transformando conhecimento em{' '}
              <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent">
                futuro.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
            >
              Há mais de 30 anos formando pessoas preparadas para os desafios do mundo, unindo tradição
              acadêmica, tecnologia e acolhimento em cada etapa do ensino.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button
                type="button"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                onClick={() => openEnrollment({ origin: 'hero' })}
              >
                Faça sua matrícula
              </Button>
              <Button href="/instituicao" variant="outline" size="lg" icon={<PlayCircle className="h-5 w-5" />}>
                Conheça o IEAM
              </Button>
            </motion.div>
          </div>

          {/* Indicators panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              style={{ x: panelX, y: panelY }}
              className="glass-dark rounded-3xl border border-white/10 p-6 shadow-[var(--shadow-lift)] sm:p-8"
            >
              <div className="grid grid-cols-2 gap-5">
                {INDICATORS.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="group rounded-2xl bg-white/5 p-5 ring-1 ring-inset ring-white/10 transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:bg-white/[0.08] hover:ring-gold-300/30"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 transition-colors duration-300 group-hover:bg-gold-400/20 group-hover:text-gold-200">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div className="font-display mt-4 text-2xl font-semibold tracking-tight text-white">{value}</div>
                    <div className="label-mono mt-1.5 text-[10px] text-white/55">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
