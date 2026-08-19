import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputField, SelectField } from '@/components/ui';
import { RELATIONSHIP_OPTIONS } from '@/config/enrollmentOptions';
import type { EnrollmentFormValues } from '@/types/enrollment';

export function GuardianDataStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EnrollmentFormValues>();
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const sameAsPhone = watch('sameAsPhone');

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  const { ref: guardianNameRef, ...guardianNameField } = register('guardianName');

  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">Dados do responsável</h3>
      <p className="mt-2 text-sm text-ink-500">Quem vamos contatar para dar continuidade à matrícula?</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputField
          label="Nome completo do responsável"
          id="guardianName"
          placeholder="Nome completo"
          required
          error={errors.guardianName?.message}
          ref={(el) => {
            guardianNameRef(el);
            firstFieldRef.current = el;
          }}
          {...guardianNameField}
        />

        <SelectField
          label="Grau de parentesco"
          id="relationship"
          required
          error={errors.relationship?.message}
          {...register('relationship')}
        >
          <option value="">Selecione</option>
          {RELATIONSHIP_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <InputField
          label="Telefone"
          id="phone"
          type="tel"
          placeholder="(86) 99999-9999"
          required
          error={errors.phone?.message}
          {...register('phone')}
        />

        <InputField label="E-mail" id="email" type="email" placeholder="voce@email.com" required error={errors.email?.message} {...register('email')} />

        <div className="flex flex-col gap-3 sm:col-span-2">
          <label className="flex items-center gap-2.5 text-sm text-ink-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500/30"
              checked={sameAsPhone}
              onChange={(e) => setValue('sameAsPhone', e.target.checked, { shouldValidate: true, shouldDirty: true })}
            />
            O número de telefone também é WhatsApp
          </label>

          {!sameAsPhone && (
            <InputField
              label="WhatsApp"
              id="whatsapp"
              type="tel"
              placeholder="(86) 99999-9999"
              required
              error={errors.whatsapp?.message}
              {...register('whatsapp')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
