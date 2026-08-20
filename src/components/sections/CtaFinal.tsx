import { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Container, Button, ChalkUnderline, StaggerGroup, StaggerItem } from '@/components/ui';
import { SITE } from '@/constants/site';
import { useEnrollmentModal } from '@/hooks/useEnrollmentModal';
import { trackEvent } from '@/services/analytics';

// Recapitulação da jornada — 4 frases curtas, uma cadeia finita de
// setTimeout (nunca um loop), que fecha antes do headline se assentar.
const JOURNEY_RECAP = ['Você conheceu nossa história.', 'Conheceu nossos valores.', 'Conheceu nossa forma de ensinar.', 'Conheceu nosso espaço.'];

/**
 * Encerramento visual da jornada — não é "mais um fade", é a conclusão de
 * tudo que a Home mostrou. Puramente decorativo (aria-hidden): a headline
 * abaixo já carrega a mensagem real. Some inteiramente com movimento
 * reduzido, já que nenhuma informação depende dela.
 */
function JourneyRecap() {
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || step >= JOURNEY_RECAP.length - 1) return;
    const timer = setTimeout(() => setStep((s) => s + 1), 420);
    return () => clearTimeout(timer);
  }, [step, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden="true" className="mb-3 h-5 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="label-mono text-xs text-gold-300/70"
        >
          {JOURNEY_RECAP[step]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function CtaFinal() {
  const { openEnrollment } = useEnrollmentModal();
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 py-24 text-white sm:py-28">
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-[0.12]" />
      {/* Entrada única do glow ao aparecer na viewport — não um loop
          contínuo, só a "conclusão visual" da seção acontecendo uma vez. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-gold-400/15 blur-[120px]"
      />

      <Container>
        {/* Headline → subheadline → CTA entram em sequência — o
            encerramento da jornada, não um bloco só aparecendo de vez. */}
        <StaggerGroup className="mx-auto max-w-2xl text-center" staggerDelay={0.12}>
          <StaggerItem>
            <JourneyRecap />
            <span className="inline-block text-xs label-mono text-gold-300">Vagas limitadas</span>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
              Matrículas Abertas. O futuro do seu filho começa{' '}
              <ChalkUnderline lineClassName="text-gold-300">
                <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent">
                  aqui.
                </span>
              </ChalkUnderline>
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Garanta a vaga em uma das instituições mais tradicionais da região e ofereça a educação que
              transforma trajetórias.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-9 flex flex-wrap items-center justify-center gap-4">
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
          </StaggerItem>
        </StaggerGroup>
      </Container>
    </section>
  );
}
