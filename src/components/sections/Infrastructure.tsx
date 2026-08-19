import { Section, SectionHeading, StaggerGroup, StaggerItem } from '@/components/ui';
import { GALLERY_SLIDES, GALLERY_CATEGORY_META } from '@/constants/gallery';

const SPANS = ['lg:col-span-2 lg:row-span-2', '', '', 'lg:col-span-2', '', '', '', 'lg:col-span-2', '', ''];

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
          <StaggerItem key={slide.id} className={SPANS[i] ?? ''}>
            <div className="group relative h-full min-h-[9rem] overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10 transition-all duration-300 hover:ring-gold-400/40 sm:min-h-[10rem]">
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
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
