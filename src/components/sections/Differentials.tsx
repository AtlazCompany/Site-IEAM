import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Section, SectionHeading, Card, StaggerGroup, StaggerItem, AnimatedEquation, HandwrittenNote } from '@/components/ui';
import { DIFFERENTIALS } from '@/constants/content';
import { useCoarsePointer } from '@/hooks/useCoarsePointer';

/**
 * Traço manuscrito pontual em 5 dos 8 cards — cada um ecoando o próprio
 * título real do diferencial (nunca um dado novo). Os outros 3 ficam sem
 * doodle de propósito: nem todo card pede uma "descoberta" escrita, e
 * forçar um símbolo em todos viraria decoração, não comunicação (regra dos
 * 80% clareza / 20% surpresa).
 */
const DOODLES: Record<string, { expression?: string; note?: string }> = {
  'Professores qualificados': { note: '✓' },
  'Preparação para vestibulares': { expression: 'Σ' },
  'Laboratórios completos': { note: 'descobrir' },
  'Tecnologia em sala': { expression: '</>' },
  'Biblioteca': { note: 'ler' },
};

interface DifferentialCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function DifferentialCard({ icon: Icon, title, description }: DifferentialCardProps) {
  const doodle = DOODLES[title];
  const [hovered, setHovered] = useState(false);
  const isCoarsePointer = useCoarsePointer();
  const doodleVisible = isCoarsePointer || hovered;

  return (
    <Card className="relative h-full overflow-hidden" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <h3 className="mt-5 text-lg font-bold text-ink-900">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{description}</p>
      {doodle?.expression && (
        <AnimatedEquation
          expression={doodle.expression}
          visible={doodleVisible}
          delay={0.05}
          className="absolute right-5 top-5 text-xl text-gold-500/70"
        />
      )}
      {doodle?.note && (
        <HandwrittenNote visible={doodleVisible} delay={0.05} rotate={-6} className="absolute right-5 top-6 text-lg text-gold-600/70">
          {doodle.note}
        </HandwrittenNote>
      )}
    </Card>
  );
}

export function Differentials() {
  return (
    <Section background="light">
      <SectionHeading
        eyebrow="Por que o IEAM"
        title="Diferenciais que preparam para a vida"
        description="Uma estrutura completa pensada para o desenvolvimento acadêmico, humano e social dos nossos alunos."
      />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DIFFERENTIALS.map((differential) => (
          <StaggerItem key={differential.title}>
            <DifferentialCard {...differential} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
