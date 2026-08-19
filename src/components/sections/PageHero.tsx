import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Reveal, ShaderBackground } from '@/components/ui';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, breadcrumb, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950 pb-20 pt-36 text-white sm:pb-24 sm:pt-40">
      {/* Uso secundário do shader — bem mais sutil que o hero, banner é curto e o texto precisa de contraste total */}
      <ShaderBackground className="-z-20" speed={0.6} intensity={0.55} opacity={0.55} />
      <div className="absolute inset-0 -z-10 bg-brand-950/55" />
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-[0.1]" />
      <div className="pointer-events-none absolute -top-32 right-0 -z-10 h-96 w-96 rounded-full bg-brand-500/20 blur-[110px]" />

      <Container>
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/65">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">{breadcrumb}</span>
          </nav>

          <span className="mt-6 inline-block text-xs label-mono text-gold-300">
            {eyebrow}
          </span>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
            {title}
          </h1>
          {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{description}</p>}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
