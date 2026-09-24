import { GraduationCap, ArrowRight, CalendarClock } from 'lucide-react';
import { Container, Button, Reveal } from '@/components/ui';
import { useScholarshipTestModal } from '@/hooks/useScholarshipTestModal';
import { SCHOLARSHIP_TEST } from '@/constants/content';

/**
 * Destaque temporário na Home para o Teste Bolsa — a escola pediu que
 * apareça já na tela inicial, antes de existir uma página própria. Ao ficar
 * mais completo (data confirmada, página dedicada), isso pode migrar de um
 * banner para uma seção maior.
 */
export function ScholarshipTestBanner() {
  const { openScholarshipTest } = useScholarshipTestModal();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900">
      <div className="absolute inset-0 bg-dot-grid opacity-[0.06]" aria-hidden="true" />
      <Container className="relative py-8 sm:py-9">
        <Reveal direction="up" className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300">
              <GraduationCap className="h-6 w-6" strokeWidth={2} />
            </span>
            <div>
              <p className="label-mono text-xs text-gold-300">Novidade</p>
              <h2 className="font-display text-lg font-semibold text-white sm:text-xl">
                Teste Bolsa {new Date().getFullYear() + 1} — inscrições abertas
              </h2>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-white/60 sm:justify-start">
                <CalendarClock className="h-4 w-4 shrink-0" />
                {SCHOLARSHIP_TEST.period}
              </p>
              <p className="mt-0.5 flex items-center justify-center gap-1.5 text-sm text-white/60 sm:justify-start">
                <GraduationCap className="h-4 w-4 shrink-0" />
                {SCHOLARSHIP_TEST.scope}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            className="w-full shrink-0 justify-center sm:w-auto"
            icon={<ArrowRight className="h-4 w-4" />}
            onClick={() => openScholarshipTest({ origin: 'home-banner-teste-bolsa' })}
          >
            Inscrever no Teste Bolsa
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
