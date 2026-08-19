import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'mb-4 inline-block text-xs label-mono',
            light ? 'text-gold-300' : 'text-brand-600',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'text-balance text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem]',
          light ? 'text-white' : 'text-ink-900',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-lg leading-relaxed', light ? 'text-white/70' : 'text-ink-500')}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
