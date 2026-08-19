import { useFormContext } from 'react-hook-form';
import { MessageCircle, Mail, Phone, Check } from 'lucide-react';
import { CONTACT_CHANNEL_OPTIONS } from '@/config/enrollmentOptions';
import type { EnrollmentFormValues } from '@/types/enrollment';
import { cn } from '@/utils/cn';

const ICONS = { whatsapp: MessageCircle, email: Mail, phone: Phone } as const;

export function ContactPreferenceStep() {
  const { watch, setValue, trigger } = useFormContext<EnrollmentFormValues>();
  const selected = watch('contactChannel');

  function select(value: string) {
    setValue('contactChannel', value, { shouldValidate: true, shouldDirty: true });
    void trigger('contactChannel');
  }

  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">
        Como você prefere continuar o atendimento?
      </h3>
      <p className="mt-2 text-sm text-ink-500">
        Essa é a forma que nossa equipe vai usar para retornar o seu contato.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Canal de atendimento">
        {CONTACT_CHANNEL_OPTIONS.map(({ value, label }) => {
          const Icon = ICONS[value];
          const isSelected = selected === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => select(value)}
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
              <p className="mt-4 font-semibold text-ink-900">{label}</p>

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
