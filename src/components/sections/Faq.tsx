import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Section, SectionHeading, Reveal } from '@/components/ui';
import { FAQ_ITEMS } from '@/constants/content';
import { cn } from '@/utils/cn';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section background="light">
      <SectionHeading eyebrow="Dúvidas Frequentes" title="Perguntas que podem te ajudar" />

      <div className="mx-auto mt-14 max-w-3xl divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.question} amount={0.1}>
              <div>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2 font-semibold text-ink-900">
                    {/* A dúvida em si já é uma pergunta — o "?" manuscrito
                        vira "✓" quando ela é respondida (aberta), reforçando
                        a própria função da seção, não decoração solta. */}
                    <span className="font-hand text-lg text-gold-500" aria-hidden="true">
                      {isOpen ? '✓' : '?'}
                    </span>
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-300',
                      isOpen && 'rotate-45 bg-brand-600 text-white',
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-500">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
