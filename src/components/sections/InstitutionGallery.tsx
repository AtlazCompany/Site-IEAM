import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { MorphSliderHandle, MorphSliderItem } from '@/components/ui/MorphSlider';
import { GALLERY_SLIDES, GALLERY_CATEGORY_META, type GalleryCategory, type GallerySlide } from '@/constants/gallery';
import { cn } from '@/utils/cn';

const AUTOPLAY_DELAY_S = 6;

// MorphSlider carrega ogl + gsap (~renderer WebGL) — separado do bundle
// principal e buscado só quando a galeria monta. Enquanto isso, a imagem
// estática abaixo ocupa o mesmo espaço sem salto de layout.
const MorphSlider = lazy(() => import('@/components/ui/MorphSlider').then((m) => ({ default: m.MorphSlider })));

function GalleryFallback({ slide }: { slide: GallerySlide }) {
  return (
    <div className="relative h-full w-full">
      <img src={slide.imageWebp ?? slide.image} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/90 via-brand-950/35 to-transparent p-6 pt-16">
        <p className="text-xs label-mono text-gold-300">{GALLERY_CATEGORY_META[slide.category].label}</p>
        <p className="mt-1 font-display text-lg font-semibold text-white">{slide.title}</p>
        <p className="mt-1 text-sm leading-snug text-white/75">{slide.caption}</p>
      </div>
    </div>
  );
}

interface InstitutionGalleryProps {
  activeCategory: GalleryCategory;
  className?: string;
}

/**
 * Carrossel institucional dentro da moldura verde. As trocas de imagem usam
 * o MorphSlider (WebGL + GSAP, porte do componente React Bits) para uma
 * transição orgânica de "derretimento" entre fotos, em vez de crossfade.
 * Troca automática a cada ~6s, pausa com o ponteiro sobre o slider, com foco
 * em qualquer elemento interno, com a aba oculta, ou fora da viewport;
 * navegação por teclado (setas, herdada do MorphSlider), arraste e
 * setas/indicadores manuais. Os slides são filtrados pelo pilar ativo
 * (História/Missão/Visão/Valores) definido pelas abas em About.tsx.
 */
export function InstitutionGallery({ activeCategory, className }: InstitutionGalleryProps) {
  const slides = GALLERY_SLIDES.filter((s) => s.category === activeCategory);
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [tabHidden, setTabHidden] = useState(() => document.hidden);
  const [inView, setInView] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<MorphSliderHandle>(null);

  // Memoizado por categoria: `slides` é recriado a cada render (novo array
  // filtrado), e MorphSlider recria o WebGLRenderer sempre que a referência
  // de `items` muda — sem isso, alternar foco/visibilidade destruiria e
  // reconstruiria o slider a cada re-render do wrapper.
  const items: MorphSliderItem[] = useMemo(
    () => GALLERY_SLIDES.filter((s) => s.category === activeCategory).map((s) => ({ image: s.imageWebp ?? s.image ?? '' })),
    [activeCategory],
  );

  useEffect(() => {
    setIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    function handleVisibilityChange() {
      setTabHidden(document.hidden);
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sinal separado de "nearViewport": o WebGL do MorphSlider (ogl + GSAP)
  // estava sendo montado assim que a Home carregava, mesmo com a galeria
  // ~1900px abaixo da dobra — um segundo contexto WebGL ativo ao lado do
  // ShaderBackground do Hero sem necessidade nenhuma. rootMargin generoso
  // pré-carrega antes do usuário chegar perto, evitando pop-in; dispara uma
  // vez só (não precisa "desmontar" de novo ao rolar pra longe).
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (slides.length === 0) return null;

  const slide = slides[index] ?? slides[0];
  const autoplayActive = !focused && !prefersReducedMotion && !tabHidden && inView && slides.length > 1;

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-3 shadow-[var(--shadow-lift)]">
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label={`Galeria institucional — ${GALLERY_CATEGORY_META[slide.category].label}`}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={() => setFocused(false)}
          className="group/gallery relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
        >
          {/* O canvas WebGL não carrega texto alternativo nativo — expõe a descrição objetiva da foto atual para leitores de tela. */}
          <span className="sr-only" aria-live="polite">
            {slide.alt}
          </span>
          {!nearViewport ? (
            <GalleryFallback slide={slide} />
          ) : (
          <Suspense fallback={<GalleryFallback slide={slide} />}>
            <MorphSlider
              ref={sliderRef}
              key={activeCategory}
              items={items}
              transition="melt"
              duration={1}
              intensity={0.5}
              scale={2.2}
              aberration={0.18}
              drift={0.28}
              autoplay={autoplayActive}
              autoplayDelay={AUTOPLAY_DELAY_S}
              radius={16}
              overlayColor="#142a22"
              ariaLabel={`Galeria institucional — ${GALLERY_CATEGORY_META[slide.category].label}`}
              showCaptions={false}
              showControls={false}
              showIndicators={false}
              className="h-full w-full"
              onIndexChange={setIndex}
            >
              {/* Legenda com gradiente escuro — sobreposta ao canvas, no estilo da marca */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-brand-950/90 via-brand-950/35 to-transparent p-6 pt-16">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-xs label-mono text-gold-300">{GALLERY_CATEGORY_META[slide.category].label}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-white">{slide.title}</p>
                    <p className="mt-1 text-sm leading-snug text-white/75">{slide.caption}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => sliderRef.current?.prev()}
                    aria-label="Slide anterior"
                    className="pointer-events-auto absolute left-3 top-1/2 z-[3] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 focus-visible:opacity-100 group-hover/gallery:opacity-100 group-focus-within/gallery:opacity-100"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => sliderRef.current?.next()}
                    aria-label="Próximo slide"
                    className="pointer-events-auto absolute right-3 top-1/2 z-[3] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 focus-visible:opacity-100 group-hover/gallery:opacity-100 group-focus-within/gallery:opacity-100"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <div className="pointer-events-none absolute inset-x-0 top-4 z-[3] flex items-center justify-center gap-1.5">
                    {slides.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => sliderRef.current?.goTo(i)}
                        aria-label={`Ir para o slide ${i + 1} de ${slides.length}`}
                        aria-current={i === index}
                        className={cn(
                          'pointer-events-auto h-1 rounded-full transition-all duration-500',
                          i === index ? 'w-6 bg-gold-400' : 'w-2.5 bg-white/40 hover:bg-white/60',
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </MorphSlider>
          </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}
