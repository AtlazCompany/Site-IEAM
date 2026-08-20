import { ArrowRight, Calendar } from 'lucide-react';
import { Seo } from '@/components/layout/Seo';
import { PageHero, CtaFinal } from '@/components/sections';
import { Section, Card, Button, Badge, StaggerGroup, StaggerItem } from '@/components/ui';
import { NEWS_ITEMS } from '@/constants/content';

export default function NewsPage() {
  return (
    <>
      <Seo
        title="Notícias"
        description="Fique por dentro das novidades, conquistas e eventos do Instituto Educacional Afonso Mafrense."
        path="/noticias"
      />
      <PageHero
        eyebrow="Notícias"
        title="Novidades e conquistas do IEAM"
        description="Acompanhe os principais acontecimentos, resultados e eventos da nossa comunidade escolar."
        breadcrumb="Notícias"
      />

      <Section background="white">
        <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {NEWS_ITEMS.map((item) => (
            <StaggerItem key={item.id}>
              <Card className="flex h-full flex-col overflow-hidden p-0" hoverLift>
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-600 to-brand-900">
                  {item.image ? (
                    <picture>
                      {item.imageWebp && <source srcSet={item.imageWebp} type="image/webp" />}
                      <img
                        src={item.image}
                        alt={item.imageAlt ?? ''}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </picture>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
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
                  <Button variant="ghost" size="sm" className="mt-5 self-start px-0" icon={<ArrowRight className="h-4 w-4" />}>
                    Ler mais
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <CtaFinal />
    </>
  );
}
