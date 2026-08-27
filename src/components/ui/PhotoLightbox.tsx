import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

interface PhotoLightboxProps {
  images: LightboxImage[];
  index: number;
  onIndexChange?: (index: number) => void;
  onExited: () => void;
}

const NAV_BUTTON =
  'flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20';

/**
 * Visualização em tela cheia de uma foto — aberta ao clicar em uma imagem
 * na galeria institucional ou no mosaico de Estrutura. Mesmo padrão de
 * modal em portal (foco, ESC, scroll lock) do ScheduleVisitModal.
 */
export function PhotoLightbox({ images, index, onIndexChange, onExited }: PhotoLightboxProps) {
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);
  const image = images[index];
  const hasMultiple = images.length > 1;

  const close = useCallback(() => setVisible(false), []);
  const goPrev = useCallback(() => onIndexChange?.((index - 1 + images.length) % images.length), [index, images.length, onIndexChange]);
  const goNext = useCallback(() => onIndexChange?.((index + 1) % images.length), [index, images.length, onIndexChange]);

  useEffect(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
      lastFocusedRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowLeft' && hasMultiple) {
        goPrev();
      } else if (e.key === 'ArrowRight' && hasMultiple) {
        goNext();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [close, goPrev, goNext, hasMultiple]);

  if (!image) return null;

  return createPortal(
    <AnimatePresence onExitComplete={onExited}>
      {visible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-brand-950/92 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={image.title ?? image.alt}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-full w-full max-w-4xl flex-col items-center"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[75dvh] w-auto max-w-full rounded-2xl object-contain shadow-[var(--shadow-lift)]"
            />

            {(image.title || image.caption) && (
              <div className="mt-5 max-w-xl px-4 text-center">
                {image.title && <p className="font-display text-lg font-semibold text-white">{image.title}</p>}
                {image.caption && <p className="mt-1 text-sm leading-relaxed text-white/70">{image.caption}</p>}
              </div>
            )}
          </motion.div>

          <button type="button" onClick={close} aria-label="Fechar visualização da foto" className={`${NAV_BUTTON} fixed right-4 top-4 z-10`}>
            <X className="h-5 w-5" />
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Foto anterior"
                className={`${NAV_BUTTON} fixed left-2 top-1/2 z-10 -translate-y-1/2 sm:left-4`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Próxima foto"
                className={`${NAV_BUTTON} fixed right-2 top-1/2 z-10 -translate-y-1/2 sm:right-4`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
