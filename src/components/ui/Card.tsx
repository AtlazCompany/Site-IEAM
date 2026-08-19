import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hoverLift?: boolean;
}

export function Card({ children, className, hoverLift = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-ink-100 bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-300 ease-[var(--ease-premium)]',
        hoverLift && 'hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)] hover:border-brand-100',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
