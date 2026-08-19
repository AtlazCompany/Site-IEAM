import { Compass, Eye, HeartHandshake, Landmark } from 'lucide-react';
import { Seo } from '@/components/layout/Seo';
import { PageHero, Differentials, Stats, CtaFinal } from '@/components/sections';
import { Section, SectionHeading, Card, Reveal, StaggerGroup, StaggerItem } from '@/components/ui';

const PILLARS = [
  {
    icon: Landmark,
    title: 'História',
    text: 'Fundado há mais de 30 anos em Teresina, o IEAM nasceu do compromisso de oferecer uma educação de excelência à comunidade. Ao longo de décadas, consolidou-se como referência regional, acompanhando gerações de famílias que confiaram no nosso trabalho.',
  },
  {
    icon: Compass,
    title: 'Missão',
    text: 'Formar cidadãos críticos, éticos e preparados para os desafios acadêmicos e profissionais, unindo tradição pedagógica, inovação constante e acompanhamento humano em cada etapa da jornada escolar.',
  },
  {
    icon: Eye,
    title: 'Visão',
    text: 'Ser reconhecido como referência regional em excelência acadêmica, aliando alta performance em aprovações a uma formação humana sólida, preparando líderes para transformar suas comunidades.',
  },
  {
    icon: HeartHandshake,
    title: 'Valores',
    text: 'Ética, disciplina, acolhimento, inovação e compromisso com o desenvolvimento integral do aluno guiam todas as decisões pedagógicas e institucionais do IEAM.',
  },
];

export default function Institution() {
  return (
    <>
      <Seo
        title="Instituição"
        description="Conheça a história, missão, visão e valores do Instituto Educacional Afonso Mafrense — mais de 30 anos formando trajetórias de sucesso."
        path="/instituicao"
      />
      <PageHero
        eyebrow="Instituição"
        title="Tradição, propósito e visão de futuro"
        description="Conheça a trajetória que faz do IEAM uma referência em educação de excelência há mais de três décadas."
        breadcrumb="Instituição"
      />

      <Section background="white">
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <Card className="h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink-900">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{text}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Stats />

      <Section background="light">
        <SectionHeading
          eyebrow="Governança"
          title="Um instituto guiado por pessoas comprometidas com a educação"
          description="Nossa equipe pedagógica e administrativa trabalha em conjunto para garantir consistência, qualidade e cuidado em cada decisão institucional."
        />
        <Reveal className="mx-auto mt-12 max-w-3xl rounded-2xl border border-ink-100 bg-white p-8 text-center shadow-[var(--shadow-soft)]">
          <p className="text-[15px] leading-relaxed text-ink-600">
            Da coordenação pedagógica à direção geral, cada equipe do IEAM compartilha o mesmo compromisso:
            oferecer uma educação que una excelência acadêmica, inovação tecnológica e acolhimento humano —
            valores que orientam nossas decisões desde a sala de aula até o planejamento estratégico do
            instituto.
          </p>
        </Reveal>
      </Section>

      <Differentials />
      <CtaFinal />
    </>
  );
}
