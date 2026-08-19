import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'brand' | 'gold' | 'light';
}

const VARIANTS = {
  brand: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100',
  gold: 'bg-gold-50 text-gold-700 ring-1 ring-inset ring-gold-200',
  light: 'bg-white/10 text-white ring-1 ring-inset ring-white/20',
};

export function Badge({ children, className, variant = 'brand' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs label-mono',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
