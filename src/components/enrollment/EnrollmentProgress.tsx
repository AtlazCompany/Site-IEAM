import { Check } from 'lucide-react';
import { WIZARD_STEPS } from '@/types/enrollment';
import { cn } from '@/utils/cn';

interface EnrollmentProgressProps {
  stepIndex: number;
  onStepClick?: (index: number) => void;
}

export function EnrollmentProgress({ stepIndex, onStepClick }: EnrollmentProgressProps) {
  const total = WIZARD_STEPS.length;
  const percent = Math.round(((stepIndex + 1) / total) * 100);

  return (
    <div className="w-full">
      {/* Mobile: compact label + thin bar */}
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <span className="label-mono text-[10px] text-ink-500">
          Etapa {stepIndex + 1} de {total}
        </span>
        <span className="label-mono text-[10px] text-brand-600">{percent}%</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-100 sm:hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-gold-400 transition-all duration-500 ease-[var(--ease-premium)]"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Desktop: numbered steps */}
      <ol className="hidden items-center sm:flex" aria-label="Progresso da matrícula">
        {WIZARD_STEPS.map((step, i) => {
          const state = i < stepIndex ? 'done' : i === stepIndex ? 'current' : 'upcoming';
          const clickable = Boolean(onStepClick) && state === 'done';
          return (
            <li key={step.id} className="flex flex-1 items-center last:flex-none">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick?.(i)}
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-300',
                  state === 'done' && 'bg-brand-600 text-white',
                  state === 'current' && 'bg-gold-400 text-brand-950 ring-4 ring-gold-100',
                  state === 'upcoming' && 'bg-ink-100 text-ink-400',
                  clickable && 'cursor-pointer hover:bg-brand-700',
                )}
                aria-current={state === 'current' ? 'step' : undefined}
                aria-label={`${step.title}${state === 'done' ? ' (concluída)' : ''}`}
              >
                {state === 'done' ? <Check className="h-4 w-4" /> : i + 1}
              </button>
              {i < total - 1 && (
                <span
                  className={cn(
                    'mx-1.5 h-px flex-1 transition-colors duration-500',
                    state === 'done' ? 'bg-brand-500' : 'bg-ink-100',
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-2 hidden text-xs text-ink-500 sm:block">{WIZARD_STEPS[stepIndex].title}</p>
    </div>
  );
}
