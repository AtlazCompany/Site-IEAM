import { useEffect, useRef, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { useEnrollmentWizard } from '@/hooks/useEnrollmentWizard';
import { EnrollmentProgress } from './EnrollmentProgress';
import { EnrollmentNavigation } from './EnrollmentNavigation';
import { EnrollmentSuccess } from './EnrollmentSuccess';
import { EducationLevelStep } from './steps/EducationLevelStep';
import { StudentDataStep } from './steps/StudentDataStep';
import { GuardianDataStep } from './steps/GuardianDataStep';
import { AdditionalDataStep } from './steps/AdditionalDataStep';
import { ContactPreferenceStep } from './steps/ContactPreferenceStep';
import { ReviewStep } from './steps/ReviewStep';
import { ConsentStep } from './steps/ConsentStep';
import { buildWhatsAppMessage } from '@/services/enrollmentService';
import type { EnrollmentSchema } from '@/schemas/enrollmentSchema';
import { reviewStepIndex, type WizardStepId } from '@/types/enrollment';

interface EnrollmentWizardProps {
  initialLevel?: string;
  origin: string;
  active?: boolean;
  onDirtyChange?: (dirty: boolean) => void;
}

export function EnrollmentWizard({ initialLevel, origin, active = true, onDirtyChange }: EnrollmentWizardProps) {
  const wizard = useEnrollmentWizard({ initialLevel, origin, active });
  const [direction, setDirection] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { form, stepIndex, currentStep, isFirstStep, isLastStep, submitOutcome, isDirty } = wizard;

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  // Scroll the step content back to the top every time the step changes, so
  // a long step (e.g. Revisão) never leaves the user stranded mid-scroll
  // with the "Continuar" button out of view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentStep.id]);

  async function handleNext() {
    if (isLastStep) {
      await wizard.submit();
      return;
    }
    setDirection(1);
    await wizard.goNext();
  }

  function handleBack() {
    setDirection(-1);
    wizard.goBack();
  }

  function handleEdit(stepId: WizardStepId) {
    setDirection(-1);
    wizard.goToStep(reviewStepIndex(stepId));
  }

  const nextDisabled =
    (currentStep.id === 'level' && !form.watch('levelId')) ||
    (currentStep.id === 'channel' && !form.watch('contactChannel'));

  if (submitOutcome) {
    const values = form.getValues() as EnrollmentSchema;
    return (
      <EnrollmentSuccess
        variant={submitOutcome.kind}
        errorMessage={submitOutcome.kind === 'api-error' ? submitOutcome.message : undefined}
        whatsappMessage={buildWhatsAppMessage(values)}
        whatsappConfirmed={wizard.whatsappConfirmed}
        onOpenWhatsApp={wizard.openWhatsApp}
        onRetry={submitOutcome.kind === 'api-error' ? () => wizard.submit() : undefined}
        onStartNew={wizard.resetWizard}
      />
    );
  }

  return (
    <FormProvider {...form}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-ink-100 px-5 pb-4 pt-5 sm:px-8 sm:pt-6">
          <EnrollmentProgress stepIndex={stepIndex} onStepClick={wizard.goToStep} />
        </div>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentStep.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 24 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentStep.id === 'level' && <EducationLevelStep />}
              {currentStep.id === 'student' && <StudentDataStep />}
              {currentStep.id === 'guardian' && <GuardianDataStep />}
              {currentStep.id === 'additional' && <AdditionalDataStep />}
              {currentStep.id === 'channel' && <ContactPreferenceStep />}
              {currentStep.id === 'review' && <ReviewStep onEdit={handleEdit} />}
              {currentStep.id === 'consent' && <ConsentStep />}
            </motion.div>
          </AnimatePresence>
        </div>

        <EnrollmentNavigation
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          submitting={wizard.submitting}
          nextDisabled={nextDisabled}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </FormProvider>
  );
}
