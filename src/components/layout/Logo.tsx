import { cn } from '@/utils/cn';
import logoSealWebp from '@/assets/icons/logo-seal-144.webp';
import logoSealPng from '@/assets/icons/logo-seal-144.png';

interface LogoProps {
  dark?: boolean;
  className?: string;
}

export function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.75" stroke="currentColor" strokeWidth="1.15" />
      <path
        d="M7.6 9.3c2-1.35 6.8-1.35 8.8 0v6.1c-2-1.35-6.8-1.35-8.8 0z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <path d="M12 9.3v6.1" stroke="currentColor" strokeWidth="1.15" />
    </svg>
  );
}

export function Logo({ dark = false, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F8F7F2] p-1 ring-1',
          dark ? 'ring-brand-100' : 'ring-white/25',
        )}
      >
        <picture>
          <source srcSet={logoSealWebp} type="image/webp" />
          <img
            src={logoSealPng}
            alt="Selo do IEAM"
            width={144}
            height={144}
            decoding="async"
            className="h-full w-full object-contain"
          />
        </picture>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn('font-display text-lg font-bold tracking-tight', dark ? 'text-ink-900' : 'text-white')}>
          IEAM
        </span>
        <span className={cn('label-mono mt-1 text-[9.5px]', dark ? 'text-ink-500' : 'text-white/65')}>
          Afonso Mafrense
        </span>
      </span>
    </div>
  );
}
