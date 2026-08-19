import { MapPin, Navigation, CalendarCheck } from 'lucide-react';
import { Section, SectionHeading, Button, Reveal } from '@/components/ui';
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
        <Reveal
          direction="right"
          className="flex flex-col justify-between rounded-3xl border border-ink-100 bg-ink-50 p-8"
        >
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow-[var(--shadow-soft)]">
              <MapPin className="h-6 w-6" />
            </span>
            <p className="mt-5 text-lg font-semibold leading-snug text-ink-900">{SITE.address}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
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
          </div>
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
