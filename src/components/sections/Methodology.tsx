import { motion } from 'framer-motion';
import { Section, SectionHeading, Reveal, HandDrawnLine, AnimatedEquation, ChalkDoodle } from '@/components/ui';
import { SKETCH_PATHS } from '@/components/ui/sketches/sketchPaths';
import type { DoodleName } from '@/components/ui/sketches/sketchPaths';
import { METHODOLOGY_STEPS } from '@/constants/content';
import { cn } from '@/utils/cn';

/**
 * Uma anotação matemática por passo (exceto o 05, que já tem seu próprio
 * easter egg da conta corrigida) — vive na coluna vazia ao lado do card, não
 * mais espremida no canto do ícone, porque esse canto nunca teve espaço de
 * verdade para um texto legível. Cada uma vem acompanhada de um símbolo
 * desenhado traço a traço (mesmo mecanismo dos doodles de "Por que o
 * IEAM", mas com símbolos matemáticos em vez de ilustrações infantis).
 */
const STEP_EXPRESSIONS = ['2 + 3 = 5', '√49 = 7', '{ }', '50% + 50% = 100%'] as const;
const STEP_SYMBOLS: DoodleName[] = ['check', 'root', 'multiply', 'divide'];

export function Methodology() {
  return (
    <Section background="light">
      <SectionHeading
        eyebrow="Metodologia"
        title="Como transformamos aprendizado em resultado"
        description="Um método estruturado em cinco pilares que conduz o aluno do primeiro conceito à aprovação."
      />

      <div className="relative mt-16">
        {/* Antes era uma linha estática (bg-ink-200) — agora um traço
            desenhado à mão que cresce enquanto o usuário rola pelos 5
            passos, reforçando "conhecimento em movimento". */}
        <HandDrawnLine
          orientation="vertical"
          duration={1.6}
          strokeWidth={2.5}
          amount={0.15}
          className="absolute left-6 top-0 hidden text-ink-200 lg:left-1/2 lg:block"
        />

        <div className="space-y-10 lg:space-y-0">
          {METHODOLOGY_STEPS.map(({ step, title, description, icon: Icon }, i) => (
            <div
              key={step}
              className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-16 lg:py-10"
            >
              <Reveal
                direction={i % 2 === 0 ? 'right' : 'left'}
                className={i % 2 === 0 ? 'lg:order-1 lg:text-right' : 'lg:order-2'}
              >
                <div
                  className={`flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-[var(--shadow-soft)] ${
                    i % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                    className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </motion.span>
                  <div>
                    <span className="text-xs label-mono text-gold-600">Passo {step}</span>
                    <h3 className="mt-1 text-lg font-bold text-ink-900">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{description}</p>
                    {/* Errar faz parte do método — a mesma conta corrigida do
                        easter egg da 404, aqui no lugar que fala de
                        avaliação: "avaliação contínua" é justamente isso. */}
                    {i === 4 && (
                      <div
                        className={`mt-3 flex items-center gap-2 ${i % 2 === 0 ? 'lg:justify-end' : ''}`}
                        aria-hidden="true"
                      >
                        <span className="relative inline-block px-1">
                          <AnimatedEquation expression="1 + 1 = 3" delay={0.2} className="text-base text-ink-300" />
                          <svg viewBox="0 0 40 40" preserveAspectRatio="none" className="pointer-events-none absolute -inset-1.5 text-red-400/70">
                            <motion.path
                              d={SKETCH_PATHS.cross}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={3}
                              strokeLinecap="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              whileInView={{ pathLength: 1, opacity: 1 }}
                              viewport={{ once: true, amount: 0.6 }}
                              transition={{ duration: 0.35, delay: 0.9, ease: [0.65, 0, 0.35, 1] }}
                            />
                          </svg>
                        </span>
                        <span className="text-sm text-ink-300">→</span>
                        <AnimatedEquation expression="1 + 1 = 2" delay={1.1} className="text-base text-brand-600/80" />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.15 }}
                className={`absolute left-6 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-gold-400 shadow-[var(--shadow-gold)] lg:left-1/2 lg:block ${
                  i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                }`}
              />

              <div
                className={cn(
                  'hidden items-center gap-4 lg:flex',
                  i % 2 === 0 ? 'lg:order-2 lg:justify-start lg:pl-6' : 'lg:order-1 lg:justify-end lg:pr-6',
                )}
                aria-hidden="true"
              >
                {i !== 4 && i % 2 !== 0 && (
                  <ChalkDoodle name={STEP_SYMBOLS[i]} rotate={-6} strokeWidth={3} className="h-10 w-10 shrink-0 text-brand-400/50" delay={0.1} />
                )}
                {i !== 4 && (
                  <AnimatedEquation
                    expression={STEP_EXPRESSIONS[i]}
                    delay={0.2}
                    className={cn('text-3xl text-gold-500/55 xl:text-4xl', i % 2 === 0 ? '-rotate-2' : 'rotate-2')}
                  />
                )}
                {i !== 4 && i % 2 === 0 && (
                  <ChalkDoodle name={STEP_SYMBOLS[i]} rotate={6} strokeWidth={3} className="h-10 w-10 shrink-0 text-brand-400/50" delay={0.1} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
