import { ArrowLeft, ArrowRight, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui';

interface EnrollmentNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  submitting: boolean;
  nextDisabled?: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function EnrollmentNavigation({
  isFirstStep,
  isLastStep,
  submitting,
  nextDisabled,
  onBack,
  onNext,
}: EnrollmentNavigationProps) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-2 border-t border-ink-100 bg-white px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:gap-3 sm:px-8">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        disabled={isFirstStep || submitting}
        className="disabled:invisible"
        icon={<ArrowLeft className="h-4 w-4" />}
        iconPosition="left"
      >
        Voltar
      </Button>

      <Button
        type="button"
        variant="primary"
        onClick={onNext}
        disabled={nextDisabled || submitting}
        icon={
          submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isLastStep ? (
            <Send className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )
        }
      >
        {submitting ? (
          'Enviando...'
        ) : isLastStep ? (
          <>
            <span className="sm:hidden">Enviar matrícula</span>
            <span className="hidden sm:inline">Enviar interesse de matrícula</span>
          </>
        ) : (
          'Continuar'
        )}
      </Button>
    </div>
  );
}
