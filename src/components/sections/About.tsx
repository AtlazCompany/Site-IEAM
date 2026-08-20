import { useRef, useState } from 'react';
import type { KeyboardEvent, MutableRefObject, ReactNode } from 'react';
import { Compass, Eye, HeartHandshake, Landmark, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section, Badge, Button, Reveal, HandDrawnLine } from '@/components/ui';
import { SKETCH_PATHS } from '@/components/ui/sketches/sketchPaths';
import { InstitutionGallery } from './InstitutionGallery';
import type { GalleryCategory } from '@/constants/gallery';
import { cn } from '@/utils/cn';

const PILLARS: { id: GalleryCategory; label: string; icon: typeof Landmark; text: string; keywords: string[] }[] = [
  {
    id: 'historia',
    label: 'História',
    icon: Landmark,
    text: 'Fundado há mais de 30 anos, o IEAM nasceu do compromisso de oferecer uma educação de excelência à comunidade, crescendo ao lado de gerações de famílias que confiaram em nosso trabalho.',
    // Duas frases reais marcadas — não uma timeline com datas (não temos
    // marcos catalogados ainda). O que existe de fato é "há quanto tempo" e
    // "quem atravessou esse tempo com a gente"; é isso que fica em destaque.
    keywords: ['mais de 30 anos', 'gerações de famílias'],
  },
  {
    id: 'missao',
    label: 'Missão',
    icon: Compass,
    text: 'Formar cidadãos críticos, éticos e preparados para os desafios acadêmicos e profissionais, unindo tradição pedagógica e inovação constante.',
    keywords: ['cidadãos'],
  },
  {
    id: 'visao',
    label: 'Visão',
    icon: Eye,
    text: 'Ser reconhecido como referência regional em excelência acadêmica, aliando alta performance em aprovações a uma formação humana sólida.',
    keywords: ['excelência'],
  },
  {
    id: 'valores',
    label: 'Valores',
    icon: HeartHandshake,
    text: 'Ética, disciplina, acolhimento, inovação e compromisso com o desenvolvimento integral de cada aluno guiam todas as nossas decisões.',
    keywords: ['compromisso'],
  },
];

/**
 * As 5 palavras reais do pilar Valores, na ordem em que aparecem no texto
 * institucional acima — usadas apenas para dar a cada uma sua própria
 * entrada/círculo manuscrito no painel "valores" (ver ValoresReveal).
 * Nenhuma definição nova: a frase real completa continua sendo a única
 * explicação exibida.
 */
const VALORES_WORDS = ['Ética', 'Disciplina', 'Acolhimento', 'Inovação', 'Compromisso'];

/**
 * Círculo desenhado à mão ao redor de uma palavra — desenha e, depois de
 * um instante, some suavemente (como uma marcação feita "ao vivo" sobre o
 * texto, não um sublinhado permanente).
 */
function CircledWord({ children, delay = 0.35 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="relative inline-block px-0.5">
      {children}
      <svg viewBox="0 0 100 84" preserveAspectRatio="none" className="pointer-events-none absolute -inset-x-2 -inset-y-2 text-gold-500" aria-hidden="true">
        <motion.path
          d={SKETCH_PATHS.circle}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 2.6, delay, times: [0, 0.4, 1], ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  );
}

/**
 * Insere um CircledWord em cada frase de `keywords` encontrada dentro de
 * `text`, na ordem em que aparecem (não na ordem do array) — usado pelo
 * pilar História (2 frases reais) e Missão/Visão (1 palavra cada).
 */
function renderTextWithKeywords(text: string, keywords: string[]) {
  const matches = keywords
    .map((kw) => ({ kw, idx: text.indexOf(kw) }))
    .filter((m) => m.idx !== -1)
    .sort((a, b) => a.idx - b.idx);
  if (matches.length === 0) return text;

  const parts: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((m, i) => {
    parts.push(text.slice(cursor, m.idx));
    parts.push(
      <CircledWord key={m.kw} delay={0.35 + i * 0.55}>
        {m.kw}
      </CircledWord>,
    );
    cursor = m.idx + m.kw.length;
  });
  parts.push(text.slice(cursor));
  return parts;
}

/**
 * Painel do pilar "Valores" — as 5 palavras reais entram em sequência, cada
 * uma com seu próprio círculo manuscrito (a "descoberta" individual que o
 * briefing pediu), e só depois a frase institucional completa se assenta
 * embaixo como explicação única e real. Nenhuma definição por palavra é
 * inventada — é a mesma frase de sempre, só revelada em duas camadas.
 */
function ValoresReveal({ text }: { text: string }) {
  const wordsDone = 0.15 + VALORES_WORDS.length * 0.14;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-x-1 gap-y-2">
        {VALORES_WORDS.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 8, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-base font-bold text-brand-800"
          >
            <CircledWord delay={0.3 + i * 0.14}>{word}</CircledWord>
            {i < VALORES_WORDS.length - 1 && <span className="text-ink-300">,</span>}
          </motion.span>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: wordsDone }}
        className="text-[15px] leading-relaxed text-ink-600"
      >
        {text}
      </motion.p>
    </div>
  );
}

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
            {/* Brilho dourado sutil quando a aba História está ativa — a
                galeria "responde" à leitura, em vez de ser um elemento
                puramente decorativo ao lado do texto. */}
            <InstitutionGallery
              activeCategory={active}
              className={cn(
                'aspect-[4/5] w-full rounded-3xl transition-shadow duration-700 ease-[var(--ease-premium)]',
                active === 'historia' && 'shadow-[0_0_0_3px_var(--tw-shadow-color)] shadow-gold-400/30',
              )}
            />
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
                    // `isolate` cria um contexto de empilhamento próprio no
                    // botão — sem isso, `position: relative` sozinho não
                    // basta e o pill com z-index negativo "vaza" para trás
                    // do fundo branco da seção em vez de ficar só atrás do
                    // texto do botão, deixando o texto branco invisível.
                    'relative isolate rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
                    isSelected ? 'text-white' : 'bg-ink-50 text-ink-600 hover:bg-ink-100',
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="about-pillar-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{pillar.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative mt-6 min-h-[7.5rem] overflow-hidden rounded-2xl bg-ink-50">
            {/* "Fio" desenhado à mão, sem datas — símbolo de continuidade
                para a aba História, não uma timeline de marcos que não
                temos catalogados ainda. */}
            {current.id === 'historia' && (
              <HandDrawnLine
                orientation="vertical"
                duration={1.4}
                strokeWidth={2}
                className="pointer-events-none absolute inset-y-3 left-2 hidden w-2 text-brand-200 sm:block"
              />
            )}
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
                className={cn('flex gap-4 p-6', current.id === 'historia' && 'sm:pl-9')}
              >
                {current.id === 'valores' ? (
                  <ValoresReveal text={current.text} />
                ) : (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-[var(--shadow-soft)]">
                      <current.icon className="h-5 w-5" />
                    </span>
                    <p className="text-[15px] leading-relaxed text-ink-600">
                      {renderTextWithKeywords(current.text, current.keywords)}
                    </p>
                  </>
                )}
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
