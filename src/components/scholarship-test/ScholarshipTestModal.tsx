import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, GraduationCap, Loader2, CheckCircle2, AlertTriangle, MessageCircle, ShieldCheck, Download } from 'lucide-react';
import { Button, InputField, SelectField } from '@/components/ui';
import { cn } from '@/utils/cn';
import {
  scholarshipTestSchema,
  SCHOLARSHIP_TEST_DEFAULT_VALUES,
  gradeOptionsFor,
  RELATIONSHIP_OPTIONS,
  type ScholarshipTestSchema,
  type ScholarshipTestFormValues,
} from '@/schemas/scholarshipTestSchema';
import { submitScholarshipTest, generateScholarshipTestPdf } from '@/services/scholarshipTestService';
import { EDUCATION_LEVELS } from '@/constants/content';
import { trackEvent } from '@/services/analytics';
import { trackMetaPixelEvent } from '@/services/metaPixel';
import { SITE } from '@/constants/site';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ScholarshipTestModalProps {
  origin: string;
  onExited: () => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ScholarshipTestModal({ origin, onExited }: ScholarshipTestModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ScholarshipTestFormValues>({
    resolver: zodResolver(scholarshipTestSchema),
    defaultValues: SCHOLARSHIP_TEST_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const levelId = watch('levelId');
  const gradeOptions = gradeOptionsFor(levelId);

  useEffect(() => {
    if (status === 'idle') {
      trackEvent({ name: 'scholarship_test_form_opened', origin });
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

  async function onSubmit(values: ScholarshipTestFormValues) {
    setStatus('submitting');
    const result = await submitScholarshipTest(values as ScholarshipTestSchema);
    setFeedback(result.message);
    if (result.success) {
      trackEvent({ name: 'scholarship_test_form_submitted' });
      trackMetaPixelEvent('Lead', { content_name: 'teste-bolsa' });
      setStatus('success');
    } else {
      setStatus('error');
    }
  }

  async function handleDownloadPdf() {
    setPdfError(false);
    try {
      await generateScholarshipTestPdf(getValues() as ScholarshipTestSchema);
      setPdfDownloaded(true);
    } catch {
      setPdfError(true);
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
              aria-labelledby="scholarship-test-modal-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-[var(--shadow-lift)] sm:max-h-[min(90dvh,46rem)] sm:w-full sm:max-w-lg sm:rounded-3xl"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-ink-100 px-5 py-4 sm:px-8">
                <h2
                  id="scholarship-test-modal-title"
                  ref={titleRef}
                  tabIndex={-1}
                  className="font-display flex items-center gap-2.5 text-base font-semibold text-ink-900 outline-none sm:text-lg"
                >
                  <GraduationCap className="h-5 w-5 text-brand-600" />
                  Inscrição — Teste Bolsa
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fechar formulário de inscrição do Teste Bolsa"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
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
                    <h3 className="font-display mt-5 text-xl font-semibold text-ink-900">Inscrição confirmada!</h3>
                    <p className="mt-2 max-w-sm text-[15px] text-ink-500">{feedback}</p>
                    <p className="mt-1 max-w-sm text-xs text-ink-400">
                      Data e horário do teste serão divulgados posteriormente pela secretaria.
                    </p>
                    <div className="mt-6 flex w-full max-w-xs flex-col gap-2">
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={handleDownloadPdf}
                        icon={<Download className="h-4 w-4" />}
                      >
                        {pdfDownloaded ? 'Baixar novamente a ficha' : 'Baixar ficha de inscrição (PDF)'}
                      </Button>
                      {pdfError && (
                        <p className="text-xs font-medium text-red-500">
                          Não foi possível gerar o PDF agora. Verifique sua internet e tente novamente.
                        </p>
                      )}
                      <Button variant="ghost" className="w-full" onClick={close}>
                        Fechar
                      </Button>
                    </div>
                  </div>
                ) : status === 'error' ? (
                  <div className="flex flex-col items-center px-2 py-6 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                      <AlertTriangle className="h-9 w-9" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display mt-5 text-xl font-semibold text-ink-900">Não conseguimos inscrever agora</h3>
                    <p className="mt-2 max-w-sm text-[15px] text-ink-500">{feedback}</p>
                    <div className="mt-6 flex w-full max-w-xs flex-col gap-2">
                      <Button variant="primary" className="w-full" onClick={() => setStatus('idle')}>
                        Tentar novamente
                      </Button>
                      <Button
                        variant="outline-dark"
                        className="w-full"
                        href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de inscrever meu filho(a) no Teste Bolsa do IEAM.')}`}
                        external
                        icon={<MessageCircle className="h-4 w-4" />}
                      >
                        Inscrever pelo WhatsApp
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5">
                    <p className="text-sm text-ink-500">
                      Preencha os dados do aluno e do responsável para garantir a vaga no Teste Bolsa.
                    </p>

                    <SelectField label="Nível de ensino" id="scholarship-level" error={errors.levelId?.message} {...register('levelId')}>
                      <option value="">Selecione</option>
                      {EDUCATION_LEVELS.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.title}
                        </option>
                      ))}
                    </SelectField>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <InputField
                        label="Nome completo do aluno"
                        id="scholarship-student-name"
                        autoComplete="name"
                        placeholder="Nome do aluno"
                        required
                        error={errors.studentName?.message}
                        {...register('studentName')}
                      />
                      <InputField
                        label="Data de nascimento"
                        id="scholarship-birth-date"
                        type="date"
                        max={todayISO}
                        required
                        error={errors.birthDate?.message}
                        {...register('birthDate')}
                      />
                    </div>

                    <SelectField
                      label="Série / ano pretendido"
                      id="scholarship-grade"
                      disabled={!levelId}
                      error={errors.grade?.message}
                      hint={!levelId ? 'Selecione o nível de ensino primeiro.' : undefined}
                      {...register('grade')}
                    >
                      <option value="">Selecione</option>
                      {gradeOptions.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </SelectField>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <InputField
                        label="Nome do responsável"
                        id="scholarship-guardian-name"
                        autoComplete="name"
                        placeholder="Nome do responsável"
                        required
                        error={errors.guardianName?.message}
                        {...register('guardianName')}
                      />
                      <SelectField label="Parentesco" id="scholarship-relationship" error={errors.relationship?.message} {...register('relationship')}>
                        <option value="">Selecione</option>
                        {RELATIONSHIP_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </SelectField>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <InputField
                        label="Telefone / WhatsApp"
                        id="scholarship-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(86) 99999-9999"
                        required
                        error={errors.phone?.message}
                        {...register('phone')}
                      />
                      <InputField
                        label="E-mail"
                        id="scholarship-email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@email.com"
                        required
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </div>

                    <label
                      className={cn(
                        'flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-5 transition-colors',
                        errors.consent ? 'border-red-300 bg-red-50/50' : 'border-ink-100 hover:border-brand-200',
                      )}
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-500/30"
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? 'scholarship-consent-error' : undefined}
                        {...register('consent')}
                      />
                      <span className="text-sm leading-relaxed text-ink-700">
                        <ShieldCheck className="mb-0.5 mr-1 inline h-4 w-4 text-brand-600" />
                        Autorizo o Instituto Educacional Afonso Mafrense a utilizar estes dados para a inscrição e
                        contato sobre o Teste Bolsa. Saiba mais na{' '}
                        <Link to="/privacidade" target="_blank" rel="noopener" className="font-semibold text-brand-600 underline underline-offset-2">
                          Política de Privacidade
                        </Link>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="scholarship-consent-error" role="alert" className="-mt-3 text-xs font-medium text-red-500">
                        {errors.consent.message}
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full justify-center"
                      disabled={status === 'submitting'}
                      icon={status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <GraduationCap className="h-4 w-4" />}
                    >
                      {status === 'submitting' ? 'Enviando...' : 'Confirmar inscrição'}
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
