import { useFormContext } from 'react-hook-form';
import { Check } from 'lucide-react';
import { EDUCATION_LEVELS } from '@/constants/content';
import type { EnrollmentFormValues } from '@/types/enrollment';
import { cn } from '@/utils/cn';

export function EducationLevelStep() {
  const { watch, setValue, trigger } = useFormContext<EnrollmentFormValues>();
  const selected = watch('levelId');

  function select(id: string) {
    setValue('levelId', id, { shouldValidate: true, shouldDirty: true });
    void trigger('levelId');
  }

  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">
        Qual nível de ensino você procura?
      </h3>
      <p className="mt-2 text-sm text-ink-500">Selecione uma opção para continuar.</p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Nível de ensino">
        {EDUCATION_LEVELS.map(({ id, title, ageRange, icon: Icon }) => {
          const isSelected = selected === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => select(id)}
              className={cn(
                'group relative flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-all duration-200 ease-[var(--ease-premium)]',
                isSelected
                  ? 'border-brand-600 bg-brand-50 shadow-[var(--shadow-card)]'
                  : 'border-ink-100 bg-white hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[var(--shadow-soft)]',
              )}
            >
              <span
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-xl transition-colors',
                  isSelected ? 'bg-brand-600 text-white' : 'bg-ink-50 text-brand-600 group-hover:bg-brand-50',
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <p className="mt-4 font-semibold text-ink-900">{title}</p>
              <p className="mt-1 text-xs text-ink-500">{ageRange}</p>

              <span
                className={cn(
                  'absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-colors',
                  isSelected ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-200 text-transparent',
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
