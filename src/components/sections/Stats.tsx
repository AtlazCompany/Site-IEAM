import { motion } from 'framer-motion';
import { Section, SectionHeading, CountUp, Reveal, StaggerGroup, StaggerItem } from '@/components/ui';
import { CONFIRMED_TENURE, TRUST_POINTS } from '@/constants/content';

// Duração do CountUp — o traço de selo só começa a se fechar quando o
// número termina de subir, para ler como "confirmação", não decoração solta.
const COUNT_DURATION = 1.6;

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
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="relative flex h-40 w-40 items-center justify-center rounded-full border-[1.5px] border-gold-400 sm:h-48 sm:w-48"
          >
            <div className="absolute inset-[8px] rounded-full border border-ink-200" />
            {/*
              O selo se "fecha" assim que o número termina de contar — não é
              um enfeite girando à toa, é a virada de tom da jornada: daqui
              em diante a linguagem manuscrita das seções anteriores vira
              certificação. Um só traço, uma só vez (aria-hidden).
            */}
            <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 text-gold-500" aria-hidden="true">
              <motion.circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, delay: COUNT_DURATION - 0.1, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
            <div className="flex flex-col items-center">
              <p className="font-display text-3xl font-semibold tracking-tight text-brand-950 sm:text-4xl">
                <CountUp value={value} suffix={suffix} duration={COUNT_DURATION} />
              </p>
              <TenureIcon className="mt-1.5 h-5 w-5 text-gold-600" strokeWidth={1.75} />
            </div>
          </motion.div>
          <p className="label-mono mt-4 text-center text-[11px] text-ink-500">{label}</p>
        </Reveal>

        <StaggerGroup className="flex flex-wrap items-center justify-center gap-3">
          {TRUST_POINTS.map(({ icon: Icon, label: pointLabel }) => (
            <StaggerItem key={pointLabel}>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-ink-50 px-4 py-2 text-sm text-ink-600 transition-colors duration-200 hover:border-gold-300 hover:bg-ink-100">
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
