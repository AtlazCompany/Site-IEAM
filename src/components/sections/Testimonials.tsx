import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section, SectionHeading } from '@/components/ui';
import { TESTIMONIALS } from '@/constants/content';
import { cn } from '@/utils/cn';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((v) => (v + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [go]);

  const t = TESTIMONIALS[index];

  return (
    <Section background="light">
      <SectionHeading eyebrow="Depoimentos" title="Quem vive o IEAM todos os dias" />

      <div className="relative mx-auto mt-14 max-w-3xl">
        <Quote className="mx-auto h-10 w-10 text-brand-200" strokeWidth={1.5} />

        <div className="relative mt-4 min-h-[220px] sm:min-h-[180px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center text-center"
            >
              <p className="font-display text-balance text-xl font-medium italic leading-relaxed text-ink-800 sm:text-2xl">
                “{t.quote}”
              </p>
              <div className="mt-7 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {t.initials}
                </span>
                <div className="text-left">
                  <p className="font-semibold text-ink-900">{t.name}</p>
                  <p className="text-sm text-ink-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Depoimento anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:bg-white hover:text-brand-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Ir para depoimento ${i + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === index ? 'w-8 bg-brand-600' : 'w-2 bg-ink-300 hover:bg-ink-400',
                )}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Próximo depoimento"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:bg-white hover:text-brand-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}
