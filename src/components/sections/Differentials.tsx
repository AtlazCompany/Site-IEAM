import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Section, SectionHeading, Card, StaggerGroup, StaggerItem, AnimatedEquation, HandwrittenNote, ChalkDoodle } from '@/components/ui';
import { DIFFERENTIALS } from '@/constants/content';
import { useCoarsePointer } from '@/hooks/useCoarsePointer';

/**
 * Ilustrações de giz nas duas colunas laterais vazias, dentro do container
 * (max-w-2xl do título) — para telas de `lg` (1024px) a `2xl` (1536px), a
 * margem lateral real não passa de ~171px, então ficam empilhadas e
 * compactas na faixa acima da grade de cards (única área garantidamente
 * vazia nessa largura). A partir de `2xl`, quando sobra margem de verdade
 * fora do container (até 323px em 1920px), a versão maior e mais
 * distribuída em `DifferentialsWideDoodles` assume e esta aqui some —
 * nunca as duas ao mesmo tempo.
 */
function DifferentialsDoodles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block 2xl:hidden">
      {/* Coluna esquerda — alterna entre "perto" e "longe" da borda em vez
          de empilhar tudo na mesma linha vertical, pra parecer espalhado. */}
      <ChalkDoodle name="sun" rotate={-8} strokeWidth={3} className="absolute left-1 top-0 h-16 w-16 text-gold-400/70" delay={0.1} />
      <ChalkDoodle name="star" rotate={16} strokeWidth={3} className="absolute left-[80px] top-[36px] h-12 w-12 text-brand-400/70" delay={0.5} />
      <ChalkDoodle name="paperPlane" rotate={-16} strokeWidth={3} className="absolute left-2 top-[96px] h-14 w-14 text-sky-400/70" delay={0.25} />
      <ChalkDoodle name="apple" rotate={10} strokeWidth={3} className="absolute left-[78px] top-[116px] h-12 w-12 text-red-400/70" delay={0.4} />

      {/* Coluna direita — mesmo zigue-zague, espelhado */}
      <ChalkDoodle name="cloud" rotate={6} strokeWidth={3} className="absolute right-1 top-[8px] h-16 w-16 text-sky-400/70" delay={0.15} />
      <ChalkDoodle name="heart" rotate={-12} strokeWidth={3} className="absolute right-[82px] top-[44px] h-12 w-12 text-rose-400/70" delay={0.3} />
      <ChalkDoodle name="pencil" rotate={14} strokeWidth={3} className="absolute right-2 top-[100px] h-14 w-14 text-brand-500/70" delay={0.45} />
      <ChalkDoodle name="globe" rotate={-8} strokeWidth={3} className="absolute right-[80px] top-[120px] h-12 w-12 text-gold-500/70" delay={0.2} />
    </div>
  );
}

/**
 * Versão "espalhada" — só a partir de `2xl` (1536px), quando existe margem
 * real fora do container (medi ao vivo: 131px em 1536px, 323px em 1920px).
 * Maiores (80–96px, contra 48–64px da versão compacta) e distribuídas ao
 * longo de toda a altura da seção — título e as DUAS fileiras de cards —,
 * não só na faixa acima delas. Posições em px absolutos porque é o que
 * garante a mesma distribuição vertical em qualquer altura de seção real;
 * a largura de cada uma foi calculada para caber nos ~131px mais
 * apertados (o pior caso, em 1536px), com folga.
 */
function DifferentialsWideDoodles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden 2xl:block">
      {/* Coluna esquerda — 4 formas espaçadas ao longo de toda a seção */}
      <ChalkDoodle name="sun" rotate={-10} strokeWidth={3} className="absolute left-2 top-[10px] h-24 w-24 text-gold-400/70" delay={0.1} />
      <ChalkDoodle name="star" rotate={18} strokeWidth={3} className="absolute left-[58px] top-[240px] h-14 w-14 text-brand-400/70" delay={0.5} />
      <ChalkDoodle name="paperPlane" rotate={-16} strokeWidth={3} className="absolute left-3 top-[480px] h-20 w-20 text-sky-400/70" delay={0.25} />
      <ChalkDoodle name="apple" rotate={12} strokeWidth={3} className="absolute left-[50px] top-[720px] h-16 w-16 text-red-400/70" delay={0.4} />

      {/* Coluna direita — mesmo espalhamento, espelhado */}
      <ChalkDoodle name="cloud" rotate={8} strokeWidth={3} className="absolute right-2 top-[30px] h-24 w-24 text-sky-400/70" delay={0.15} />
      <ChalkDoodle name="heart" rotate={-16} strokeWidth={3} className="absolute right-[58px] top-[260px] h-14 w-14 text-rose-400/70" delay={0.3} />
      <ChalkDoodle name="pencil" rotate={18} strokeWidth={3} className="absolute right-3 top-[500px] h-20 w-20 text-brand-500/70" delay={0.45} />
      <ChalkDoodle name="globe" rotate={-10} strokeWidth={3} className="absolute right-[50px] top-[740px] h-16 w-16 text-gold-500/70" delay={0.2} />
    </div>
  );
}

/**
 * Traço manuscrito pontual nos 8 cards — cada um ecoando o próprio título
 * real do diferencial (nunca um dado novo).
 */
const DOODLES: Record<string, { expression?: string; note?: string }> = {
  'Professores qualificados': { note: '✓' },
  'Ensino moderno': { note: 'inovar' },
  'Preparação para o seu futuro': { expression: 'Σ' },
  'Laboratórios completos': { note: 'descobrir' },
  'Tecnologia em sala': { expression: '</>' },
  'Esportes': { note: 'vencer' },
  'Biblioteca': { note: 'ler' },
  'Atividades extracurriculares': { note: 'criar' },
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
    <div className="relative isolate">
      {/* Espalhada: posicionada contra a seção inteira (título + as duas
          fileiras de cards), não contra o container interno — por isso
          vive fora dele, como irmã da Section. */}
      <DifferentialsWideDoodles />
      <Section background="light" containerClassName="relative isolate">
        <DifferentialsDoodles />
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
    </div>
  );
}
