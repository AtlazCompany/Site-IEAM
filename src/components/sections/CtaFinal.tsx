import { ArrowRight, MessageCircle } from 'lucide-react';
import { Container, Button, Reveal } from '@/components/ui';
import { SITE } from '@/constants/site';
import { useEnrollmentModal } from '@/hooks/useEnrollmentModal';
import { trackEvent } from '@/services/analytics';

export function CtaFinal() {
  const { openEnrollment } = useEnrollmentModal();
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 py-24 text-white sm:py-28">
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-[0.12]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-gold-400/15 blur-[120px]" />

      <Container>
        <Reveal direction="scale" className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-xs label-mono text-gold-300">
            Vagas limitadas
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
            Matrículas Abertas. O futuro do seu filho começa{' '}
            <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent">
              aqui.
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Garanta a vaga em uma das instituições mais tradicionais da região e ofereça a educação que
            transforma trajetórias.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button
              type="button"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
              onClick={() => openEnrollment({ origin: 'cta-final' })}
            >
              Fazer minha matrícula
            </Button>
            <Button
              href={`https://wa.me/${SITE.whatsapp}`}
              external
              variant="outline"
              size="lg"
              icon={<MessageCircle className="h-5 w-5" />}
              onClick={() => trackEvent({ name: 'whatsapp_opened', origin: 'cta-final' })}
            >
              Falar no WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
