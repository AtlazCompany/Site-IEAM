import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { EnrollmentWizard } from './EnrollmentWizard';
import { Button } from '@/components/ui';
import { trackEvent } from '@/services/analytics';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface EnrollmentModalProps {
  /** Parent mounts this component only while the modal should exist; unmount happens after the exit animation via onExited. */
  initialLevel?: string;
  origin: string;
  onExited: () => void;
}

export function EnrollmentModal({ initialLevel, origin, onExited }: EnrollmentModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [confirmingClose, setConfirmingClose] = useState(false);

  const requestClose = useCallback(() => {
    if (isDirty) {
      setConfirmingClose(true);
      return;
    }
    setVisible(false);
  }, [isDirty]);

  const forceClose = useCallback(() => {
    setConfirmingClose(false);
    trackEvent({ name: 'enrollment_form_abandoned', step: -1, stepId: 'closed' });
    setVisible(false);
  }, []);

  useEffect(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => titleRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(focusTimer);
      lastFocusedRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (confirmingClose) {
          setConfirmingClose(false);
        } else {
          requestClose();
        }
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
          (el) => el.offsetParent !== null,
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [confirmingClose, requestClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <AnimatePresence onExitComplete={onExited}>
        {visible && (
          <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm"
            onClick={requestClose}
            aria-hidden="true"
          />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enrollment-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-[var(--shadow-lift)] sm:h-auto sm:max-h-[min(90dvh,52rem)] sm:w-full sm:max-w-2xl sm:rounded-3xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-ink-100 px-5 py-4 sm:px-8">
              <h2
                id="enrollment-modal-title"
                ref={titleRef}
                tabIndex={-1}
                className="font-display text-base font-semibold text-ink-900 outline-none sm:text-lg"
              >
                Matrícula IEAM
              </h2>
              <button
                type="button"
                onClick={requestClose}
                aria-label="Fechar formulário de matrícula"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <EnrollmentWizard initialLevel={initialLevel} origin={origin} active onDirtyChange={setIsDirty} />
            </div>

            <AnimatePresence>
              {confirmingClose && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white/95 p-6 backdrop-blur-sm"
                >
                  <div className="w-full max-w-sm rounded-2xl border border-ink-100 bg-white p-6 text-center shadow-[var(--shadow-lift)]">
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                      <AlertTriangle className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold text-ink-900">Fechar sem terminar?</h3>
                    <p className="mt-2 text-sm text-ink-500">
                      Você preencheu informações que ainda não foram enviadas. Elas ficam salvas nesta sessão se
                      você quiser continuar depois.
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      <Button variant="primary" className="w-full justify-center" onClick={() => setConfirmingClose(false)}>
                        Continuar preenchendo
                      </Button>
                      <Button variant="ghost" className="w-full justify-center" onClick={forceClose}>
                        Fechar mesmo assim
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
