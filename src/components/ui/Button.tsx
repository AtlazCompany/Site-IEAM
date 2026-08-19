import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

const VARIANTS = {
  primary:
    'bg-gold-400 text-brand-950 hover:bg-gold-300 shadow-[var(--shadow-gold)] hover:-translate-y-0.5',
  secondary:
    'bg-brand-600 text-white hover:bg-brand-700 shadow-[var(--shadow-card)] hover:-translate-y-0.5',
  outline:
    'border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm',
  'outline-dark':
    'border border-brand-200 text-brand-700 hover:bg-brand-50',
  ghost: 'text-brand-700 hover:bg-brand-50',
} as const;

const SIZES = {
  sm: 'h-10 px-4 text-sm gap-1.5',
  md: 'h-12 px-6 text-[15px] gap-2',
  lg: 'h-14 px-8 text-base gap-2.5',
} as const;

type Variant = keyof typeof VARIANTS;
type Size = keyof typeof SIZES;

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    external?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses =
  'group inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-all duration-300 ease-[var(--ease-premium)] whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500';

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon, iconPosition = 'right', className, children, ...props }, ref) => {
    const classes = cn(baseClasses, VARIANTS[variant], SIZES[size], className);
    const content = (
      <>
        {icon && iconPosition === 'left' && (
          <span className="shrink-0 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="shrink-0 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </>
    );

    if ('href' in props && props.href) {
      const { href, external, ...rest } = props;
      if (external || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            {...rest}
          >
            {content}
          </a>
        );
      }
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} to={href} className={classes} {...rest}>
          {content}
        </Link>
      );
    }

    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...buttonProps}>
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';
