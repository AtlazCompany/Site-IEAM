import { useRef, useState } from 'react';
import type { KeyboardEvent, MutableRefObject } from 'react';
import { Compass, Eye, HeartHandshake, Landmark, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section, Badge, Button, Reveal } from '@/components/ui';
import { InstitutionGallery } from './InstitutionGallery';
import type { GalleryCategory } from '@/constants/gallery';
import { cn } from '@/utils/cn';

const PILLARS: { id: GalleryCategory; label: string; icon: typeof Landmark; text: string }[] = [
  {
    id: 'historia',
    label: 'História',
    icon: Landmark,
    text: 'Fundado há mais de 30 anos, o IEAM nasceu do compromisso de oferecer uma educação de excelência à comunidade, crescendo ao lado de gerações de famílias que confiaram em nosso trabalho.',
  },
  {
    id: 'missao',
    label: 'Missão',
    icon: Compass,
    text: 'Formar cidadãos críticos, éticos e preparados para os desafios acadêmicos e profissionais, unindo tradição pedagógica e inovação constante.',
  },
  {
    id: 'visao',
    label: 'Visão',
    icon: Eye,
    text: 'Ser reconhecido como referência regional em excelência acadêmica, aliando alta performance em aprovações a uma formação humana sólida.',
  },
  {
    id: 'valores',
    label: 'Valores',
    icon: HeartHandshake,
    text: 'Ética, disciplina, acolhimento, inovação e compromisso com o desenvolvimento integral de cada aluno guiam todas as nossas decisões.',
  },
];

function useTabKeyboardNav(pillars: typeof PILLARS, tabRefs: MutableRefObject<Array<HTMLButtonElement | null>>, setActive: (id: GalleryCategory) => void) {
  return (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % pillars.length;
    else if (e.key === 'ArrowLeft') nextIndex = (index - 1 + pillars.length) % pillars.length;
    else if (e.key === 'Home') nextIndex = 0;
    else if (e.key === 'End') nextIndex = pillars.length - 1;
    if (nextIndex !== null) {
      e.preventDefault();
      setActive(pillars[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };
}

export function About() {
  const [active, setActive] = useState<GalleryCategory>(PILLARS[0].id);
  const current = PILLARS.find((p) => p.id === active)!;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const handleTabKeyDown = useTabKeyboardNav(PILLARS, tabRefs, setActive);

  return (
    <Section id="instituicao" background="white">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal direction="right">
          <div className="relative">
            <InstitutionGallery activeCategory={active} className="aspect-[4/5] w-full" />
            <div className="fold-corner absolute -bottom-8 -right-6 w-56 rounded-2xl border border-ink-100 bg-white p-5 shadow-[var(--shadow-lift)] sm:-right-10">
              <p className="text-3xl font-bold text-brand-700">30+</p>
              <p className="mt-1 text-sm text-ink-500">anos formando histórias de sucesso</p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="left">
          <Badge>Sobre o Instituto</Badge>
          <h2 className="mt-5 text-balance text-3xl font-bold leading-[1.15] text-ink-900 sm:text-4xl">
            Uma trajetória construída com excelência e propósito
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            O Instituto Educacional Afonso Mafrense combina tradição acadêmica com uma visão moderna de educação,
            formando alunos preparados intelectualmente e humanamente para o futuro.
          </p>

          <div role="tablist" aria-label="Pilares institucionais" className="mt-8 flex flex-wrap gap-2">
            {PILLARS.map((pillar, i) => {
              const isSelected = active === pillar.id;
              return (
                <button
                  key={pillar.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`about-tab-${pillar.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={`about-panel-${pillar.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActive(pillar.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, i)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
                    isSelected ? 'bg-brand-600 text-white' : 'bg-ink-50 text-ink-600 hover:bg-ink-100',
                  )}
                >
                  {pillar.label}
                </button>
              );
            })}
          </div>

          <div className="relative mt-6 min-h-[7.5rem] overflow-hidden rounded-2xl bg-ink-50">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                id={`about-panel-${current.id}`}
                role="tabpanel"
                aria-labelledby={`about-tab-${current.id}`}
                tabIndex={0}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4 p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-[var(--shadow-soft)]">
                  <current.icon className="h-5 w-5" />
                </span>
                <p className="text-[15px] leading-relaxed text-ink-600">{current.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <Button href="/instituicao" variant="ghost" className="mt-7 px-0" icon={<ArrowRight className="h-4 w-4" />}>
            Conheça toda a nossa história
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
