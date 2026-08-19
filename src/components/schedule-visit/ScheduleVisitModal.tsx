import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CalendarCheck, Loader2, CheckCircle2, AlertTriangle, MessageCircle } from 'lucide-react';
import { Button, InputField, SelectField, TextareaField } from '@/components/ui';
import { scheduleVisitSchema, SCHEDULE_VISIT_DEFAULT_VALUES, VISIT_TIME_OPTIONS, type ScheduleVisitSchema } from '@/schemas/scheduleVisitSchema';
import { submitScheduleVisit } from '@/services/scheduleVisitService';
import { trackEvent } from '@/services/analytics';
import { SITE } from '@/constants/site';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ScheduleVisitModalProps {
  origin: string;
  onExited: () => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ScheduleVisitModal({ origin, onExited }: ScheduleVisitModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleVisitSchema>({
    resolver: zodResolver(scheduleVisitSchema),
    defaultValues: SCHEDULE_VISIT_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  useEffect(() => {
    if (status === 'idle') {
      trackEvent({ name: 'enrollment_form_opened', origin, level: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(() => setVisible(false), []);

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
        close();
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
  }, [close]);

  async function onSubmit(values: ScheduleVisitSchema) {
    setStatus('submitting');
    const result = await submitScheduleVisit(values);
    setFeedback(result.message);
    if (result.success) {
      trackEvent({ name: 'enrollment_form_submitted', channel: 'visita' });
      setStatus('success');
    } else {
      setStatus('error');
    }
  }

  const todayISO = new Date().toISOString().slice(0, 10);

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
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="schedule-visit-modal-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-[var(--shadow-lift)] sm:max-h-[min(90dvh,42rem)] sm:w-full sm:max-w-lg sm:rounded-3xl"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-ink-100 px-5 py-4 sm:px-8">
                <h2
                  id="schedule-visit-modal-title"
                  ref={titleRef}
                  tabIndex={-1}
                  className="font-display flex items-center gap-2.5 text-base font-semibold text-ink-900 outline-none sm:text-lg"
                >
                  <CalendarCheck className="h-5 w-5 text-brand-600" />
                  Agendar visita
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fechar formulário de agendamento"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
                {status === 'success' ? (
                  <div className="flex flex-col items-center px-2 py-6 text-center">
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600"
                    >
                      <CheckCircle2 className="h-9 w-9" strokeWidth={1.75} />
                    </motion.span>
                    <h3 className="font-display mt-5 text-xl font-semibold text-ink-900">Visita agendada!</h3>
                    <p className="mt-2 max-w-sm text-[15px] text-ink-500">{feedback}</p>
                    <Button variant="ghost" className="mt-6" onClick={close}>
                      Fechar
                    </Button>
                  </div>
                ) : status === 'error' ? (
                  <div className="flex flex-col items-center px-2 py-6 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                      <AlertTriangle className="h-9 w-9" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display mt-5 text-xl font-semibold text-ink-900">Não conseguimos agendar agora</h3>
                    <p className="mt-2 max-w-sm text-[15px] text-ink-500">{feedback}</p>
                    <div className="mt-6 flex w-full max-w-xs flex-col gap-2">
                      <Button variant="primary" className="w-full" onClick={() => setStatus('idle')}>
                        Tentar novamente
                      </Button>
                      <Button
                        variant="outline-dark"
                        className="w-full"
                        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de agendar uma visita ao IEAM.')}`}
                        external
                        icon={<MessageCircle className="h-4 w-4" />}
                      >
                        Agendar pelo WhatsApp
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5">
                    <p className="text-sm text-ink-500">
                      Preencha seus dados e a data de preferência — nossa equipe confirma o horário exato pelo canal que você
                      informar.
                    </p>

                    <InputField
                      label="Nome completo"
                      id="visit-name"
                      autoComplete="name"
                      placeholder="Seu nome"
                      required
                      error={errors.name?.message}
                      {...register('name')}
                    />

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <InputField
                        label="Telefone / WhatsApp"
                        id="visit-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(86) 99999-9999"
                        required
                        error={errors.phone?.message}
                        {...register('phone')}
                      />
                      <InputField
                        label="E-mail"
                        id="visit-email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@email.com"
                        required
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <InputField
                        label="Data preferida"
                        id="visit-date"
                        type="date"
                        min={todayISO}
                        required
                        error={errors.preferredDate?.message}
                        {...register('preferredDate')}
                      />
                      <SelectField label="Horário preferido" id="visit-time" {...register('preferredTime')}>
                        <option value="">Sem preferência definida</option>
                        {VISIT_TIME_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </SelectField>
                    </div>

                    <TextareaField
                      label="Mensagem (opcional)"
                      id="visit-message"
                      rows={3}
                      placeholder="Conte algo mais que possa ajudar a organizar sua visita"
                      error={errors.message?.message}
                      {...register('message')}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full justify-center"
                      disabled={status === 'submitting'}
                      icon={status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
                    >
                      {status === 'submitting' ? 'Enviando...' : 'Confirmar agendamento'}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
