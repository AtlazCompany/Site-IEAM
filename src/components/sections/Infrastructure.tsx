import { useState } from 'react';
import { Section, SectionHeading, StaggerGroup, StaggerItem, HandwrittenNote, HandDrawnArrow } from '@/components/ui';
import { GALLERY_SLIDES, GALLERY_CATEGORY_META, type GallerySlide } from '@/constants/gallery';
import { useCoarsePointer } from '@/hooks/useCoarsePointer';

const SPANS = ['lg:col-span-2 lg:row-span-2', '', '', 'lg:col-span-2', '', '', '', 'lg:col-span-2', '', ''];

/**
 * Anotações manuscritas em 6 das 10 fotos — só reaproveitando palavras que
 * já existem nas legendas reais dessas fotos (ecoam slide.title/caption em
 * gallery.ts). Nunca um rótulo de instalação inventado (ex.: "Laboratório")
 * que a foto não mostre de verdade. As outras 4 ficam limpas — a fotografia
 * segue sendo a protagonista, não cada centímetro precisa de anotação.
 */
const PHOTO_NOTES: Record<string, { note: string; withArrow?: boolean }> = {
  'historia-1': { note: 'Orgulho' },
  'historia-2': { note: 'Gerações' },
  'missao-2': { note: 'Disciplina', withArrow: true },
  'visao-1': { note: 'Prontos' },
  'valores-1': { note: 'Convivência' },
  'valores-4': { note: 'Aprender brincando' },
};

function PhotoCell({ slide, span }: { slide: GallerySlide; span: string }) {
  const photoNote = PHOTO_NOTES[slide.id];
  const [hovered, setHovered] = useState(false);
  const isCoarsePointer = useCoarsePointer();
  const noteVisible = isCoarsePointer || hovered;

  return (
    <StaggerItem className={span}>
      <div
        className="group relative h-full min-h-[9rem] overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10 transition-all duration-300 hover:ring-gold-400/40 sm:min-h-[10rem]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <picture>
          {slide.imageWebp && <source srcSet={slide.imageWebp} type="image/webp" />}
          <img
            src={slide.image}
            alt={slide.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-105"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[10px] label-mono text-gold-300">{GALLERY_CATEGORY_META[slide.category].label}</p>
          <p className="mt-1 text-sm font-semibold leading-snug text-white">{slide.title}</p>
        </div>

        {/*
          No desktop, a anotação é uma descoberta de hover (mouse sobre a
          foto); em touch não há hover confiável, então fica sempre visível
          assim que a foto entra na viewport (StaggerItem já cuida disso).
        */}
        {photoNote && (
          <div className="absolute left-3 top-3 flex items-start gap-1">
            <HandwrittenNote
              visible={noteVisible}
              delay={0.05}
              rotate={-4}
              className="rounded-md bg-brand-950/45 px-2 py-1 text-lg text-white backdrop-blur-sm"
            >
              {photoNote.note}
            </HandwrittenNote>
            {photoNote.withArrow && (
              <HandDrawnArrow visible={noteVisible} delay={0.25} strokeWidth={2.5} className="-mt-1 h-8 w-8 rotate-90 text-white/80" />
            )}
          </div>
        )}
      </div>
    </StaggerItem>
  );
}

/**
 * Mosaico com fotos reais do dia a dia do IEAM (as mesmas curadas em
 * constants/gallery.ts) — substitui o antigo mosaico de ícones genéricos
 * com legendas de instalações não confirmadas ("Laboratório de Ciências",
 * "Auditório" etc.). Nada aqui afirma a existência de um espaço específico
 * além do que a própria foto mostra.
 */
export function Infrastructure() {
  return (
    <Section background="brand">
      <SectionHeading
        eyebrow="Estrutura"
        title="Espaços que fazem parte da rotina do IEAM"
        description="Registros reais do dia a dia dos nossos alunos — dos primeiros passos na Educação Infantil às atividades que marcam a trajetória no instituto."
        light
      />

      <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[11rem]">
        {GALLERY_SLIDES.map((slide, i) => (
          <PhotoCell key={slide.id} slide={slide} span={SPANS[i] ?? ''} />
        ))}
      </StaggerGroup>
    </Section>
  );
}
