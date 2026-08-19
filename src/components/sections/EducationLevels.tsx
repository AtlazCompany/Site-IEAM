import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, Button, StaggerGroup, StaggerItem } from '@/components/ui';
import { EDUCATION_LEVELS } from '@/constants/content';
import { useEnrollmentModal } from '@/hooks/useEnrollmentModal';

const BANDS = [
  'from-brand-500 to-brand-800',
  'from-brand-700 to-brand-950',
  'from-gold-500 to-brand-900',
];

export function EducationLevels() {
  const { openEnrollment } = useEnrollmentModal();

  return (
    <Section id="ensino" background="white">
      <SectionHeading
        eyebrow="Níveis de Ensino"
        title="Uma jornada pensada para cada fase"
        description="Da Educação Infantil ao Ensino Médio, cada etapa tem metodologia e acompanhamento próprios."
      />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EDUCATION_LEVELS.map(({ id, title, ageRange, description, highlights, icon: Icon }, i) => (
          <StaggerItem key={id}>
            <div
              id={id}
              className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:border-brand-100 hover:shadow-[var(--shadow-card)]"
            >
              <div className={`relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br ${BANDS[i % BANDS.length]}`}>
                <div className="absolute inset-0 bg-dot-grid opacity-20" />
                <Sparkles className="absolute right-4 top-4 h-5 w-5 text-white/30" strokeWidth={1.5} />
                <motion.span
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
                >
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </motion.span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="label-mono text-[10px] text-brand-600">{ageRange}</p>
                <h3 className="mt-1.5 text-xl font-bold text-ink-900">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{description}</p>

                <ul className="mt-5 space-y-2.5">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-ink-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Button
                    href={`/ensino#${id}`}
                    variant="ghost"
                    size="sm"
                    className="self-start px-0"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Conhecer este nível
                  </Button>
                  <button
                    type="button"
                    onClick={() => openEnrollment({ origin: `educacao-${id}`, level: id })}
                    className="text-sm font-semibold text-gold-600 underline-offset-2 transition-colors hover:text-gold-700 hover:underline"
                  >
                    Tenho interesse
                  </button>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
