import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enrollmentSchema, type EnrollmentSchema } from '@/schemas/enrollmentSchema';
import { ENROLLMENT_DEFAULT_VALUES, WIZARD_STEPS, type EnrollmentFormValues } from '@/types/enrollment';
import { loadEnrollmentDraft, saveEnrollmentDraft, clearEnrollmentDraft, hasMeaningfulDraftData } from '@/hooks/useEnrollmentDraft';
import { submitEnrollment, getWhatsAppUrl } from '@/services/enrollmentService';
import { trackEvent } from '@/services/analytics';
import { ENROLLMENT_CONFIG } from '@/config/enrollment';

export type SubmitOutcome =
  | { kind: 'api-success' }
  | { kind: 'not-configured' }
  | { kind: 'api-error'; message: string };

interface UseEnrollmentWizardOptions {
  initialLevel?: string;
  origin: string;
  active: boolean;
}

export function useEnrollmentWizard({ initialLevel, origin, active }: UseEnrollmentWizardOptions) {
  const draft = useRef(loadEnrollmentDraft());
  const [stepIndex, setStepIndex] = useState(() => {
    if (initialLevel) return 0;
    return draft.current?.step ?? 0;
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitOutcome, setSubmitOutcome] = useState<SubmitOutcome | null>(null);
  const [whatsappConfirmed, setWhatsappConfirmed] = useState(false);
  const openedTracked = useRef(false);

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      ...ENROLLMENT_DEFAULT_VALUES,
      ...draft.current?.values,
      ...(initialLevel ? { levelId: initialLevel } : {}),
    },
    mode: 'onTouched',
  });

  const { watch, trigger, getValues, reset } = form;
  const [isDirty, setIsDirty] = useState(() => hasMeaningfulDraftData(getValues() as EnrollmentFormValues));

  // Persist draft on every field change while the wizard is open, and track
  // "isDirty" from the same subscription instead of calling watch() during
  // render — watch() with no args re-renders this hook's consumer (the
  // whole wizard: progress bar, current step, nav buttons) on every single
  // keystroke, which was the main source of jank while typing. setIsDirty
  // with an unchanged boolean is a no-op re-render-wise, so this only
  // re-renders when the dirty state actually flips.
  useEffect(() => {
    if (!active) return;
    const subscription = watch((values) => {
      const typed = values as EnrollmentFormValues;
      saveEnrollmentDraft(typed, stepIndex);
      setIsDirty(hasMeaningfulDraftData(typed));
    });
    return () => subscription.unsubscribe();
  }, [watch, stepIndex, active]);

  // Also persist immediately when the step itself changes (e.g. user advances
  // without touching a field yet) so the saved step never lags behind.
  useEffect(() => {
    if (!active) return;
    saveEnrollmentDraft(getValues(), stepIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, active]);

  useEffect(() => {
    if (active && !openedTracked.current) {
      openedTracked.current = true;
      trackEvent({ name: 'enrollment_form_opened', origin, level: initialLevel });
    }
    if (!active) {
      openedTracked.current = false;
    }
  }, [active, origin, initialLevel]);

  const totalSteps = WIZARD_STEPS.length;
  const currentStep = WIZARD_STEPS[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === totalSteps - 1;

  const goNext = useCallback(async () => {
    const valid = currentStep.fields.length === 0 ? true : await trigger(currentStep.fields, { shouldFocus: true });
    if (!valid) return false;
    trackEvent({ name: 'enrollment_step_completed', step: stepIndex, stepId: currentStep.id });
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
    return true;
  }, [currentStep, trigger, stepIndex, totalSteps]);

  const goBack = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goToStep = useCallback(
    (index: number) => {
      setStepIndex(Math.max(0, Math.min(index, totalSteps - 1)));
    },
    [totalSteps],
  );

  const submit = useCallback(async () => {
    const valid = await trigger(currentStep.fields, { shouldFocus: true });
    if (!valid) return false;

    setSubmitting(true);
    setSubmitOutcome(null);
    try {
      const values = getValues() as EnrollmentSchema;
      const result = await submitEnrollment(values);
      if (!result.attempted) {
        setSubmitOutcome({ kind: 'not-configured' });
      } else if (result.apiSent) {
        trackEvent({ name: 'enrollment_form_submitted', channel: values.contactChannel });
        clearEnrollmentDraft();
        setSubmitOutcome({ kind: 'api-success' });
      } else {
        setSubmitOutcome({ kind: 'api-error', message: result.apiError ?? 'Não foi possível enviar agora.' });
      }
      return true;
    } finally {
      setSubmitting(false);
    }
  }, [getValues, trigger, currentStep]);

  const openWhatsApp = useCallback(() => {
    const values = getValues() as EnrollmentSchema;
    const url = getWhatsAppUrl(values);
    window.open(url, '_blank', 'noopener,noreferrer');
    trackEvent({ name: 'whatsapp_opened', origin });
    setWhatsappConfirmed(true);
  }, [getValues, origin]);

  const resetWizard = useCallback(() => {
    clearEnrollmentDraft();
    reset({ ...ENROLLMENT_DEFAULT_VALUES, ...(initialLevel ? { levelId: initialLevel } : {}) });
    setStepIndex(0);
    setSubmitOutcome(null);
    setWhatsappConfirmed(false);
  }, [reset, initialLevel]);

  return {
    form,
    stepIndex,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    goNext,
    goBack,
    goToStep,
    submit,
    submitting,
    submitOutcome,
    openWhatsApp,
    whatsappConfirmed,
    resetWizard,
    isDirty,
    whatsappEnabled: ENROLLMENT_CONFIG.whatsappEnabled,
  };
}
