import { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Section,
  SectionHeading,
  Button,
  StaggerGroup,
  StaggerItem,
  HandDrawnLine,
  AnimatedEquation,
  HandwrittenNote,
} from '@/components/ui';
import { SKETCH_PATHS } from '@/components/ui/sketches/sketchPaths';
import { EDUCATION_LEVELS } from '@/constants/content';
import { useEnrollmentModal } from '@/hooks/useEnrollmentModal';
import { useCoarsePointer } from '@/hooks/useCoarsePointer';
import type { EducationLevel } from '@/types';

const BANDS = [
  'from-brand-500 to-brand-800',
  'from-brand-700 to-brand-950',
  'from-gold-500 to-brand-900',
];

/**
 * Elemento manuscrito por nível — só o suficiente pra cada card ter a sua
 * "descoberta", sem repetir o mesmo efeito nos três (Infantil já tem a
 * estrela no ícone, Médio a equação — aqui fica um rótulo curto revelado
 * no hover, ecoando "Projetos interdisciplinares"/"Metodologia ativa").
 */
const HOVER_NOTES: Record<string, string> = {
  fundamental: 'praticar',
};

interface LevelCardProps {
  level: EducationLevel;
  index: number;
  onInterest: (id: string) => void;
}

function LevelCard({ level, index, onInterest }: LevelCardProps) {
  const { id, title, ageRange, description, highlights, icon: Icon } = level;
  const [hovered, setHovered] = useState(false);
  const isCoarsePointer = useCoarsePointer();
  const noteVisible = isCoarsePointer || hovered;
  const hoverNote = HOVER_NOTES[id];

  return (
    <div
      id={id}
      className="group relative z-10 flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:border-brand-100 hover:shadow-[var(--shadow-card)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br ${BANDS[index % BANDS.length]}`}>
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
        <Sparkles className="absolute right-4 top-4 h-5 w-5 text-white/30" strokeWidth={1.5} />
        <motion.span
          whileHover={{ scale: 1.08, rotate: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
        >
          <Icon className="h-7 w-7" strokeWidth={1.8} />
          {/* Único card com um traço mais lúdico — Educação Infantil pede
              uma leitura visual um pouco mais leve, sem virar desenho animado. */}
          {index === 0 && (
            <svg viewBox="0 0 48 48" className="pointer-events-none absolute -bottom-2 -left-2 h-5 w-5 text-white" aria-hidden="true">
              <motion.path
                d={SKETCH_PATHS.star}
                fill="none"
                stroke="currentColor"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
          )}
        </motion.span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <p className="label-mono text-[10px] text-brand-600">{ageRange}</p>
          {hoverNote && (
            <HandwrittenNote visible={noteVisible} rotate={-5} className="text-base text-gold-600/80">
              {hoverNote}
            </HandwrittenNote>
          )}
        </div>
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

        {/* Único ponto do site com uma equação — ecoa "preparação para
            vestibulares", que já está na descrição deste card, com
            matemática de verdade em vez de um ícone. */}
        {id === 'medio' && (
          <AnimatedEquation expression="2x + 4 = 10 · x = 3" delay={0.2} className="mt-4 text-lg text-gold-600/80" />
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Button href={`/ensino#${id}`} variant="ghost" size="sm" className="self-start px-0" icon={<ArrowRight className="h-4 w-4" />}>
            Conhecer este nível
          </Button>
          <button
            type="button"
            onClick={() => onInterest(id)}
            className="text-sm font-semibold text-gold-600 underline-offset-2 transition-colors hover:text-gold-700 hover:underline"
          >
            Tenho interesse
          </button>
        </div>
      </div>
    </div>
  );
}

export function EducationLevels() {
  const { openEnrollment } = useEnrollmentModal();

  return (
    <Section id="ensino" background="white">
      <SectionHeading
        eyebrow="Níveis de Ensino"
        title="Uma jornada pensada para cada fase"
        description="Da Educação Infantil ao Ensino Médio, cada etapa tem metodologia e acompanhamento próprios."
      />

      <div className="relative mt-14">
        {/*
          Traço desenhado à mão conectando Infantil → Fundamental → Médio —
          só faz sentido geometricamente quando os 3 cards estão numa única
          linha (lg:grid-cols-3); em telas menores os cards empilham e a
          própria sequência de entrada (stagger) já comunica a jornada.
        */}
        <HandDrawnLine
          orientation="horizontal"
          delay={0.3}
          duration={1.1}
          strokeWidth={3}
          className="pointer-events-none absolute inset-x-10 top-14 z-0 hidden text-brand-200 lg:block"
        />

        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EDUCATION_LEVELS.map((level, i) => (
            <StaggerItem key={level.id}>
              <LevelCard
                level={level}
                index={i}
                onInterest={(id) => openEnrollment({ origin: `educacao-${id}`, level: id })}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
