import { Section, SectionHeading, Reveal } from '@/components/ui';
import { METHODOLOGY_STEPS } from '@/constants/content';

export function Methodology() {
  return (
    <Section background="light">
      <SectionHeading
        eyebrow="Metodologia"
        title="Como transformamos aprendizado em resultado"
        description="Um método estruturado em cinco pilares que conduz o aluno do primeiro conceito à aprovação."
      />

      <div className="relative mt-16">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-ink-200 lg:left-1/2 lg:block" />

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
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <div>
                    <span className="text-xs label-mono text-gold-600">Passo {step}</span>
                    <h3 className="mt-1 text-lg font-bold text-ink-900">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{description}</p>
                  </div>
                </div>
              </Reveal>

              <div
                className={`absolute left-6 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-gold-400 shadow-[var(--shadow-gold)] lg:left-1/2 lg:block ${
                  i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                }`}
              />

              <div className={i % 2 === 0 ? 'hidden lg:order-2 lg:block' : 'hidden lg:order-1 lg:block'} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
