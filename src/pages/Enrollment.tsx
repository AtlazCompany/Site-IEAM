import { FileCheck2, CalendarCheck, GraduationCap, PhoneCall, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { Seo } from '@/components/layout/Seo';
import { PageHero, Faq } from '@/components/sections';
import { Section, Reveal, StaggerGroup, StaggerItem } from '@/components/ui';
import { EnrollmentWizard } from '@/components/enrollment/EnrollmentWizard';
import { SITE } from '@/constants/site';
import { useScheduleVisitModal } from '@/hooks/useScheduleVisitModal';

const STEPS = [
  { icon: FileCheck2, title: 'Preencha o formulário', description: 'Conte um pouco sobre o aluno e a série de interesse, em poucas etapas.' },
  { icon: PhoneCall, title: 'Fale com nossa equipe', description: 'Entraremos em contato pelo canal que você escolher para orientar os próximos passos.' },
  {
    icon: CalendarCheck,
    title: 'Agende sua visita',
    description: 'Conheça a estrutura do IEAM e tire todas as suas dúvidas pessoalmente.',
    action: 'schedule-visit',
  },
  { icon: GraduationCap, title: 'Comece a jornada', description: 'Garanta a vaga e prepare-se para um novo ano letivo de conquistas.' },
];

const CONTACT_ITEMS = [
  { icon: MapPin, label: 'Endereço', value: SITE.address },
  { icon: Phone, label: 'Telefone', value: SITE.phone, href: `tel:${SITE.phone.replace(/\D/g, '')}` },
  { icon: Mail, label: 'E-mail', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Fale conosco agora', href: `https://wa.me/${SITE.whatsapp}` },
];

export default function Enrollment() {
  const { openScheduleVisit } = useScheduleVisitModal();

  return (
    <>
      <Seo
        title="Matrícula"
        description="Inicie o processo de matrícula no IEAM em poucas etapas. Preencha o formulário e nossa equipe entra em contato pelo canal de sua preferência."
        path="/matricula"
      />
      <PageHero
        eyebrow="Matrícula"
        title="Comece agora a jornada do seu filho no IEAM"
        description="Preencha o formulário abaixo em poucas etapas e dê o primeiro passo para garantir uma vaga no Instituto Educacional Afonso Mafrense."
        breadcrumb="Matrícula"
      />

      <Section background="light">
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, description, action }, i) => {
            const cardContent = (
              <>
                <span className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-brand-950">
                  {i + 1}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-ink-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{description}</p>
                {action === 'schedule-visit' && (
                  <span className="mt-3 inline-block text-xs font-semibold text-brand-600">Agendar agora →</span>
                )}
              </>
            );

            return (
              <StaggerItem key={title}>
                {action === 'schedule-visit' ? (
                  <button
                    type="button"
                    onClick={() => openScheduleVisit({ origin: 'matricula-steps' })}
                    className="relative w-full cursor-pointer rounded-2xl border border-ink-100 bg-white p-6 text-left shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-card)]"
                  >
                    {cardContent}
                  </button>
                ) : (
                  <div className="relative rounded-2xl border border-ink-100 bg-white p-6 shadow-[var(--shadow-soft)]">{cardContent}</div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Section>

      <Section background="white" id="formulario">
        <Reveal direction="scale" className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-ink-100 shadow-[var(--shadow-lift)]">
          <EnrollmentWizard origin="pagina-matricula" />
        </Reveal>
      </Section>

      <Faq />

      <Section background="light">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">Outras formas de falar com a gente</h2>
            <div className="mt-6 space-y-4">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <div className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-[var(--shadow-soft)] transition-colors hover:border-brand-100">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="label-mono text-[10px] text-ink-400">{label}</p>
                      <p className="mt-1 font-semibold text-ink-900">{value}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>
          </Reveal>

          <Reveal direction="left" className="overflow-hidden rounded-3xl border border-ink-100 shadow-[var(--shadow-soft)]">
            <iframe
              title="Localização do IEAM no mapa"
              src={`https://maps.google.com/maps?q=${SITE.mapsEmbedQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="h-full min-h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
