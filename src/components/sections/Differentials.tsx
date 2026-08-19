import { Section, SectionHeading, Card, StaggerGroup, StaggerItem } from '@/components/ui';
import { DIFFERENTIALS } from '@/constants/content';

export function Differentials() {
  return (
    <Section background="light">
      <SectionHeading
        eyebrow="Por que o IEAM"
        title="Diferenciais que preparam para a vida"
        description="Uma estrutura completa pensada para o desenvolvimento acadêmico, humano e social dos nossos alunos."
      />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DIFFERENTIALS.map(({ icon: Icon, title, description }) => (
          <StaggerItem key={title}>
            <Card className="h-full">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{description}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
