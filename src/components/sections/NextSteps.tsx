import { GraduationCap, CalendarCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { Section, SectionHeading, Card, Button, StaggerGroup, StaggerItem } from '@/components/ui';
import { SITE } from '@/constants/site';
import { useEnrollmentModal } from '@/hooks/useEnrollmentModal';
import { useScheduleVisitModal } from '@/hooks/useScheduleVisitModal';
import { trackEvent } from '@/services/analytics';

/**
 * CTA final segmentado por estágio de decisão do visitante — cada família
 * chega à Home em um momento diferente (pronta para matricular, querendo
 * conhecer antes, ou só com uma dúvida pontual). Em vez de repetir a mesma
 * chamada "matricule-se" em todo canto, oferece o caminho certo para cada
 * um, todos ligados a canais reais já existentes no site.
 */
export function NextSteps() {
  const { openEnrollment } = useEnrollmentModal();
  const { openScheduleVisit } = useScheduleVisitModal();

  const PATHS: {
    icon: typeof GraduationCap;
    title: string;
    description: string;
    cta: string;
    href?: string;
    onClick?: () => void;
  }[] = [
    {
      icon: GraduationCap,
      title: 'Já decidi matricular',
      description: 'Preencha o formulário de matrícula e comece o processo em poucos minutos.',
      cta: 'Iniciar matrícula',
      onClick: () => openEnrollment({ origin: 'home-proximos-passos' }),
    },
    {
      icon: CalendarCheck,
      title: 'Quero visitar antes',
      description: 'Agende uma visita guiada e conheça a estrutura com a nossa equipe pedagógica.',
      cta: 'Agendar visita',
      onClick: () => openScheduleVisit({ origin: 'home-proximos-passos' }),
    },
    {
      icon: MessageCircle,
      title: 'Tenho uma pergunta',
      description: 'Fale direto com a nossa equipe pelo WhatsApp e tire suas dúvidas agora.',
      cta: 'Falar no WhatsApp',
      href: `https://wa.me/${SITE.whatsapp}`,
    },
  ];

  return (
    <Section background="light">
      <SectionHeading
        eyebrow="Comece por aqui"
        title="Dê o próximo passo, no seu ritmo"
        description="Cada família chega até aqui em um momento diferente. Escolha o caminho que faz mais sentido para você agora."
      />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {PATHS.map((path) => (
          <StaggerItem key={path.title}>
            <Card className="flex h-full flex-col items-start">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <path.icon className="h-6 w-6" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{path.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500">{path.description}</p>
              {path.href ? (
                <Button
                  href={path.href}
                  external
                  variant="secondary"
                  size="sm"
                  className="mt-6"
                  icon={<ArrowRight className="h-4 w-4" />}
                  onClick={() => trackEvent({ name: 'whatsapp_opened', origin: 'home-proximos-passos' })}
                >
                  {path.cta}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-6"
                  icon={<ArrowRight className="h-4 w-4" />}
                  onClick={path.onClick}
                >
                  {path.cta}
                </Button>
              )}
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
