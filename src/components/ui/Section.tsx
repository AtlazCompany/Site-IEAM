import type { ReactNode } from 'react';
import { Container } from './Container';
import { cn } from '@/utils/cn';

const BACKGROUNDS = {
  white: 'bg-white',
  light: 'bg-ink-50',
  brand: 'bg-gradient-to-b from-brand-950 to-brand-900 text-white',
  'brand-solid': 'bg-brand-950 text-white',
} as const;

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  background?: keyof typeof BACKGROUNDS;
  containerClassName?: string;
}

export function Section({ id, children, className, background = 'white', containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 sm:py-24 lg:py-28 scroll-mt-20', BACKGROUNDS[background], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
