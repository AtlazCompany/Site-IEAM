import { Section, SectionHeading, CountUp, Reveal, StaggerGroup, StaggerItem } from '@/components/ui';
import { CONFIRMED_TENURE, TRUST_POINTS } from '@/constants/content';

export function Stats() {
  const { icon: TenureIcon, value, suffix, label } = CONFIRMED_TENURE;

  return (
    <Section background="white">
      <SectionHeading
        eyebrow="Marca de aprovação"
        title="Um compromisso que atravessa gerações"
        description="O mesmo selo que já pertence à nossa história segue guiando cada nova turma que chega ao IEAM."
      />

      <div className="mt-14 flex flex-col items-center gap-10">
        <Reveal direction="scale">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[1.5px] border-gold-400 sm:h-48 sm:w-48">
            <div className="absolute inset-[8px] rounded-full border border-ink-200" />
            <div className="flex flex-col items-center">
              <p className="font-display text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
                <CountUp value={value} suffix={suffix} />
              </p>
              <TenureIcon className="mt-1.5 h-5 w-5 text-gold-600" strokeWidth={1.75} />
            </div>
          </div>
          <p className="label-mono mt-4 text-center text-[11px] text-ink-500">{label}</p>
        </Reveal>

        <StaggerGroup className="flex flex-wrap items-center justify-center gap-3">
          {TRUST_POINTS.map(({ icon: Icon, label: pointLabel }) => (
            <StaggerItem key={pointLabel}>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-ink-50 px-4 py-2 text-sm text-ink-600">
                <Icon className="h-4 w-4 text-brand-600" strokeWidth={1.75} />
                {pointLabel}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
