import { Section, SectionHeading, StaggerGroup, StaggerItem } from '@/components/ui';
import { GALLERY_ITEMS, GALLERY_ICONS } from '@/constants/content';

const SPANS = ['lg:col-span-2 lg:row-span-2', '', '', 'lg:col-span-2', '', ''];

export function Infrastructure() {
  return (
    <Section background="brand">
      <SectionHeading
        eyebrow="Infraestrutura"
        title="Espaços pensados para aprender de verdade"
        description="Ambientes modernos, seguros e equipados para apoiar cada etapa da jornada educacional."
        light
      />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[11rem]">
        {GALLERY_ITEMS.map((item, i) => {
          const Icon = GALLERY_ICONS[item.category];
          return (
            <StaggerItem key={item.id} className={SPANS[i] ?? ''}>
              <div className="group relative h-full min-h-[11rem] overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.03] ring-1 ring-inset ring-white/10 transition-all duration-300 hover:ring-gold-400/40">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-16 w-16" strokeWidth={1.25} />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs label-mono text-gold-300">{item.category}</p>
                  <p className="mt-1 font-semibold text-white">{item.title}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
