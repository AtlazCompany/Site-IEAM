import { MapPin, Navigation, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, Button, Reveal, StaggerGroup, StaggerItem } from '@/components/ui';
import { SITE } from '@/constants/site';
import { useScheduleVisitModal } from '@/hooks/useScheduleVisitModal';
import { trackEvent } from '@/services/analytics';

/**
 * Seção de localização em destaque na Home — antes só existia comprimida no
 * rodapé. Para uma família decidindo entre escolas, "onde fica" é
 * informação de decisão, não rodapé.
 */
export function Location() {
  const { openScheduleVisit } = useScheduleVisitModal();

  return (
    <Section background="white">
      <SectionHeading
        eyebrow="Localização"
        title="Venha conhecer o IEAM de perto"
        description="Fica mais fácil decidir depois de ver a estrutura pessoalmente — estamos à sua espera."
        align="left"
        className="mx-0 text-left"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
        <Reveal direction="right" className="rounded-3xl border border-ink-100 bg-ink-50 p-8">
          {/* Ícone → endereço → botões entram em sequência, não tudo de
              uma vez — reforça a ideia de "descobrir" as informações. */}
          <StaggerGroup className="flex h-full flex-col justify-between" staggerDelay={0.12}>
            <StaggerItem>
              <motion.span
                whileHover={{ scale: 1.08, rotate: 4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow-[var(--shadow-soft)]"
              >
                <MapPin className="h-6 w-6" />
              </motion.span>
              <p className="mt-5 text-lg font-semibold leading-snug text-ink-900">{SITE.address}</p>
            </StaggerItem>

            <StaggerItem className="mt-8 flex flex-col gap-3">
              <Button
                href={`https://www.google.com/maps/dir/?api=1&destination=${SITE.mapsEmbedQuery}`}
                external
                variant="secondary"
                icon={<Navigation className="h-4 w-4" />}
                onClick={() => trackEvent({ name: 'contact_button_clicked', origin: 'home-localizacao-como-chegar' })}
              >
                Como chegar
              </Button>
              <Button
                type="button"
                variant="outline-dark"
                icon={<CalendarCheck className="h-4 w-4" />}
                onClick={() => openScheduleVisit({ origin: 'home-localizacao' })}
              >
                Agendar visita
              </Button>
            </StaggerItem>
          </StaggerGroup>
        </Reveal>

        <Reveal direction="left" className="min-h-[320px] overflow-hidden rounded-3xl border border-ink-100 shadow-[var(--shadow-soft)]">
          <iframe
            title="Localização do IEAM no mapa"
            src={`https://maps.google.com/maps?q=${SITE.mapsEmbedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="h-full min-h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </Section>
  );
}
