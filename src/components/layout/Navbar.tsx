import { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './Logo';
import { Button } from '@/components/ui';
import { NAV_LINKS } from '@/constants/site';
import { useScrolled } from '@/hooks/useScrolled';
import { useEnrollmentModal } from '@/hooks/useEnrollmentModal';
import { cn } from '@/utils/cn';

export function Navbar() {
  const scrolled = useScrolled(16);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { openEnrollment } = useEnrollmentModal();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-premium)]',
        solid ? 'glass border-b border-ink-100 shadow-[var(--shadow-soft)]' : 'bg-transparent',
      )}
    >
      <div
        className={cn(
          'container-page flex items-center justify-between transition-[height] duration-300 ease-[var(--ease-premium)]',
          solid ? 'h-16' : 'h-20',
        )}
      >
        <Link to="/" aria-label="IEAM — Página inicial" className="shrink-0">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <Logo dark={solid} />
          </motion.div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <RouterNavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  'group relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400',
                  solid ? 'text-ink-600 hover:text-gold-700' : 'text-white/85 hover:text-gold-200',
                  isActive && (solid ? 'text-gold-700' : 'text-gold-200'),
                )
              }
              end={link.href === '/'}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className={cn('absolute inset-0 -z-10 rounded-full', solid ? 'bg-gold-50' : 'bg-white/10')}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 -bottom-0.5 h-px scale-x-0 rounded-full transition-transform duration-200 ease-[var(--ease-premium)] group-hover:scale-x-100',
                        solid ? 'bg-gold-500' : 'bg-gold-300',
                        isActive && 'scale-x-100',
                      )}
                    />
                  </span>
                </>
              )}
            </RouterNavLink>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Button
            type="button"
            variant="primary"
            size="sm"
            icon={<ArrowRight className="h-4 w-4" />}
            onClick={() => openEnrollment({ origin: 'header' })}
          >
            Matrículas Abertas
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden',
            solid ? 'text-ink-800 hover:bg-ink-100' : 'text-white hover:bg-white/10',
          )}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-ink-100 bg-white shadow-[var(--shadow-lift)] lg:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-4" aria-label="Navegação mobile">
              {NAV_LINKS.map((link) => (
                <RouterNavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-4 py-3 text-base font-semibold text-ink-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400',
                      isActive ? 'bg-gold-50 text-gold-700' : 'hover:bg-gold-50/60 hover:text-gold-700 active:bg-gold-50',
                    )
                  }
                  end={link.href === '/'}
                >
                  {link.label}
                </RouterNavLink>
              ))}
              <Button
                type="button"
                variant="primary"
                className="mt-3 w-full"
                icon={<ArrowRight className="h-4 w-4" />}
                onClick={() => {
                  setOpen(false);
                  openEnrollment({ origin: 'header-mobile' });
                }}
              >
                Matrículas Abertas
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
