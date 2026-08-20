import { ArrowRight, Calendar } from 'lucide-react';
import { Section, SectionHeading, Card, Button, Badge, StaggerGroup, StaggerItem, AnimatedEquation } from '@/components/ui';
import { NEWS_ITEMS } from '@/constants/content';

export function News() {
  return (
    <Section background="white">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
          <SectionHeading
            eyebrow="Notícias"
            title="O que está acontecendo no IEAM"
            align="left"
            className="mx-0 sm:max-w-lg text-left"
          />
          {/* Honesto sobre o estado atual: os 3 itens abaixo são exemplos
              ("Em breve"), não notícias reais publicadas ainda — em vez de
              fingir que é conteúdo pronto, a própria seção assume isso como
              parte da história ainda sendo escrita. */}
          <AnimatedEquation
            expression="as próximas páginas desta história ainda estão sendo escritas"
            delay={0.3}
            className="-rotate-2 text-2xl leading-snug text-ink-400 sm:max-w-[13rem] sm:text-[1.75rem]"
          />
        </div>
        <Button href="/noticias" variant="outline-dark" icon={<ArrowRight className="h-4 w-4" />}>
          Ver todas as notícias
        </Button>
      </div>

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {NEWS_ITEMS.map((item) => (
          <StaggerItem key={item.id}>
            <Card className="group flex h-full flex-col overflow-hidden p-0" hoverLift>
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-600 to-brand-900">
                {item.image ? (
                  <picture>
                    {item.imageWebp && <source srcSet={item.imageWebp} type="image/webp" />}
                    <img
                      src={item.image}
                      alt={item.imageAlt ?? ''}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-110"
                    />
                  </picture>
                ) : (
                  <div className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-110">
                    <Badge variant="light">{item.category}</Badge>
                  </div>
                )}
                {item.image && (
                  <Badge variant="light" className="absolute left-4 top-4">
                    {item.category}
                  </Badge>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-1.5 text-xs font-medium text-ink-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.date}
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug text-ink-900">{item.title}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-500">{item.excerpt}</p>
                <Button href="/noticias" variant="ghost" size="sm" className="mt-5 self-start px-0" icon={<ArrowRight className="h-4 w-4" />}>
                  Ler mais
                </Button>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
