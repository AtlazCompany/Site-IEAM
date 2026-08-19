import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { GALLERY_SLIDES, GALLERY_CATEGORY_META, type GalleryCategory } from '@/constants/gallery';
import { cn } from '@/utils/cn';

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 40;

interface InstitutionGalleryProps {
  activeCategory: GalleryCategory;
  className?: string;
}

/**
 * Carrossel institucional dentro da moldura verde. Troca automática a cada
 * ~6s, pausa em qualquer interação (hover, foco, swipe), com a aba oculta,
 * ou fora da viewport; navegação por teclado e setas/indicadores manuais.
 * Os slides são filtrados pelo pilar ativo (História/Missão/Visão/Valores)
 * definido pelas abas em About.tsx.
 */
export function InstitutionGallery({ activeCategory, className }: InstitutionGalleryProps) {
  const slides = GALLERY_SLIDES.filter((s) => s.category === activeCategory);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(() => document.hidden);
  const [inView, setInView] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const resumeTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIndex(0);
    setDirection(1);
  }, [activeCategory]);

  const go = useCallback((dir: number, total: number) => {
    setDirection(dir);
    setIndex((v) => (v + dir + total) % total);
  }, []);

  // Autoplay pausa com a aba oculta e quando a galeria sai da viewport —
  // nada de ciclos rodando às cegas fora do que o usuário está vendo.
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

  const autoplayActive = !paused && !prefersReducedMotion && !tabHidden && inView && slides.length > 1;

  useEffect(() => {
    if (!autoplayActive) return;
    const id = window.setInterval(() => go(1, slides.length), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplayActive, go, slides.length]);

  function pauseThenResume(delayMs = 2000) {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), delayMs);
  }

  useEffect(() => () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
  }, []);

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    touchStartX.current = e.clientX;
    setPaused(true);
  }

  function handlePointerUp(e: PointerEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const delta = e.clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1, slides.length);
    touchStartX.current = null;
    pauseThenResume();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1, slides.length);
      pauseThenResume();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1, slides.length);
      pauseThenResume();
    }
  }

  if (slides.length === 0) return null;
  const slide = slides[index];
  const CategoryIcon = GALLERY_CATEGORY_META[slide.category].icon;

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-3 shadow-[var(--shadow-lift)]">
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label={`Galeria institucional — ${GALLERY_CATEGORY_META[slide.category].label}`}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={handleKeyDown}
          className="group/gallery relative aspect-[4/5] w-full touch-pan-y select-none overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
        >
          <AnimatePresence mode="sync" custom={direction} initial={false}>
            <motion.div
              key={slide.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 18 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {slide.image ? (
                <picture>
                  {slide.imageWebp && <source srcSet={slide.imageWebp} type="image/webp" />}
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      'h-full w-full object-cover',
                      !prefersReducedMotion && 'animate-[kenburns_9s_ease-in-out_infinite_alternate]',
                    )}
                  />
                </picture>
              ) : (
                <div
                  className={cn(
                    'relative flex h-full w-full items-center justify-center bg-gradient-to-br',
                    slide.gradient,
                    !prefersReducedMotion && 'animate-[kenburns_9s_ease-in-out_infinite_alternate]',
                  )}
                >
                  <div className="absolute inset-0 bg-dot-grid opacity-[0.12]" />
                  <CategoryIcon className="relative h-16 w-16 text-white/20" strokeWidth={1.1} />
                </div>
              )}

              {/* Legenda com gradiente escuro */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/90 via-brand-950/35 to-transparent p-6 pt-16">
                <p className="text-xs label-mono text-gold-300">{GALLERY_CATEGORY_META[slide.category].label}</p>
                <p className="mt-1 font-display text-lg font-semibold text-white">{slide.title}</p>
                <p className="mt-1 text-sm leading-snug text-white/75">{slide.caption}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => {
                  go(-1, slides.length);
                  pauseThenResume();
                }}
                aria-label="Slide anterior"
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 focus-visible:opacity-100 group-hover/gallery:opacity-100 group-focus-within/gallery:opacity-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  go(1, slides.length);
                  pauseThenResume();
                }}
                aria-label="Próximo slide"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 focus-visible:opacity-100 group-hover/gallery:opacity-100 group-focus-within/gallery:opacity-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="absolute inset-x-0 top-4 flex items-center justify-center gap-1.5">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                      pauseThenResume();
                    }}
                    aria-label={`Ir para o slide ${i + 1} de ${slides.length}`}
                    aria-current={i === index}
                    className={cn(
                      'h-1 rounded-full transition-all duration-500',
                      i === index ? 'w-6 bg-gold-400' : 'w-2.5 bg-white/40 hover:bg-white/60',
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
