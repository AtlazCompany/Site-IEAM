import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { Container, Button, InstagramIcon, FacebookIcon, YoutubeIcon, StaggerGroup, StaggerItem, Reveal } from '@/components/ui';
import { SKETCH_PATHS } from '@/components/ui/sketches/sketchPaths';
import { SITE, NAV_LINKS } from '@/constants/site';
import { useEnrollmentModal } from '@/hooks/useEnrollmentModal';
import { trackEvent } from '@/services/analytics';
import { cn } from '@/utils/cn';

const LEVELS = [
  { label: 'Educação Infantil', href: '/ensino#infantil' },
  { label: 'Ensino Fundamental', href: '/ensino#fundamental' },
  { label: 'Ensino Médio', href: '/ensino#medio' },
];

/**
 * Sublinhado que cresce da esquerda no hover — CSS puro (::after +
 * transform), sem SVG/Framer: os links do rodapé são muitos (16+), então a
 * mesma linha de giz usada no Hero/CTA aqui pesaria e repetiria o mesmo
 * efeito em excesso.
 */
const LINK_UNDERLINE =
  'relative w-fit transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-300 after:transition-transform after:duration-300 after:ease-[var(--ease-premium)] hover:text-gold-300 hover:after:scale-x-100';

export function Footer() {
  const year = new Date().getFullYear();
  const { openEnrollment } = useEnrollmentModal();

  return (
    <footer className="bg-brand-950 text-white">
      <Container>
        <StaggerGroup className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <StaggerItem>
          {/*
            Easter egg — raro de propósito: só quem passa o mouse pelo selo
            no rodapé encontra. Decorativo (aria-hidden), não afeta a marca
            IEAM em si nem o link/uso do Logo em nenhum outro lugar do site.
          */}
          <div className="group/logo relative inline-block">
            <Logo />
            <div className="pointer-events-none absolute -right-2 -top-2 opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100" aria-hidden="true">
              <svg viewBox="0 0 48 48" className="h-5 w-5 text-gold-300">
                <path d={SKETCH_PATHS.star} fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span
              className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/10 px-2.5 py-1 font-hand text-base text-gold-200 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/logo:opacity-100"
              aria-hidden="true"
            >
              Você encontrou!
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Tradição e inovação a serviço da educação. Formando pessoas preparadas para os desafios do futuro
            há {SITE.tenure}.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { icon: InstagramIcon, href: SITE.social.instagram, label: 'Instagram' },
              { icon: FacebookIcon, href: SITE.social.facebook, label: 'Facebook' },
              { icon: YoutubeIcon, href: SITE.social.youtube, label: 'YouTube' },
            ]
              .filter((item): item is typeof item & { href: string } => Boolean(item.href))
              .map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-400 hover:text-brand-950"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="mt-6"
            icon={<ArrowRight className="h-4 w-4" />}
            onClick={() => openEnrollment({ origin: 'footer' })}
          >
            Matricule-se
          </Button>
        </StaggerItem>

        <StaggerItem>
          <h3 className="text-sm label-mono text-white/65">Navegação</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className={cn('text-sm text-white/75', LINK_UNDERLINE)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <h3 className="text-sm label-mono text-white/65">Níveis de Ensino</h3>
          <ul className="mt-5 space-y-3">
            {LEVELS.map((level) => (
              <li key={level.href}>
                <Link to={level.href} className={cn('text-sm text-white/75', LINK_UNDERLINE)}>
                  {level.label}
                </Link>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <h3 className="text-sm label-mono text-white/65">Contato</h3>
          <ul className="mt-5 space-y-4">
            <li className="flex gap-3 text-sm text-white/75">
              <MapPin className="h-5 w-5 shrink-0 text-gold-300" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-3 text-sm text-white/75">
              <Phone className="h-5 w-5 shrink-0 text-gold-300" />
              <a href={`tel:${SITE.phone.replace(/\D/g, '')}`} className={LINK_UNDERLINE}>
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-3 text-sm text-white/75">
              <Mail className="h-5 w-5 shrink-0 text-gold-300" />
              <a href={`mailto:${SITE.email}`} className={LINK_UNDERLINE}>
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-3 text-sm text-white/75">
              <MessageCircle className="h-5 w-5 shrink-0 text-gold-300" />
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_UNDERLINE}
                onClick={() => trackEvent({ name: 'whatsapp_opened', origin: 'footer' })}
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </StaggerItem>
      </StaggerGroup>
      </Container>

      <div className="border-t border-white/10">
        <Container className="aspect-[21/6] w-full overflow-hidden rounded-t-2xl sm:aspect-[21/4]">
          <iframe
            title="Localização do IEAM no mapa"
            src={`https://maps.google.com/maps?q=${SITE.mapsEmbedQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            className="h-full w-full grayscale-[40%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/65 sm:flex-row">
          <p>© {year} {SITE.name}. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <Link to="/privacidade" className="hover:text-white/80">Política de Privacidade</Link>
            <Link to="/contato" className="hover:text-white/80">Fale Conosco</Link>
          </div>
        </Container>
      </div>

      <div className="border-t border-white/5">
        <Container className="flex justify-center py-4">
          <Reveal>
            <p className="text-[11px] tracking-wide text-white/35">
              Criado por <span className="credit-shine font-semibold">Atlaz Company</span>
            </p>
          </Reveal>
        </Container>
      </div>
    </footer>
  );
}
