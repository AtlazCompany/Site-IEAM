import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputField, SelectField, TextareaField } from '@/components/ui';
import { HOW_FOUND_OPTIONS, BEST_TIME_OPTIONS } from '@/config/enrollmentOptions';
import type { EnrollmentFormValues } from '@/types/enrollment';

export function AdditionalDataStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EnrollmentFormValues>();
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  const { ref: currentSchoolRef, ...currentSchoolField } = register('currentSchool');

  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">Informações complementares</h3>
      <p className="mt-2 text-sm text-ink-500">Ajudam nossa equipe a preparar o atendimento — nada aqui é obrigatório.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputField
          label="Escola atual do aluno"
          id="currentSchool"
          placeholder="Opcional"
          error={errors.currentSchool?.message}
          ref={(el) => {
            currentSchoolRef(el);
            firstFieldRef.current = el;
          }}
          {...currentSchoolField}
        />

        <InputField
          label="Cidade ou bairro"
          id="neighborhood"
          placeholder="Opcional"
          error={errors.neighborhood?.message}
          {...register('neighborhood')}
        />

        <SelectField label="Como conheceu o IEAM" id="howFound" {...register('howFound')}>
          <option value="">Prefiro não informar</option>
          {HOW_FOUND_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <SelectField label="Melhor horário para contato" id="bestTime" {...register('bestTime')}>
          <option value="">Sem preferência</option>
          {BEST_TIME_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <TextareaField
          label="Observações ou dúvidas"
          id="notes"
          rows={4}
          placeholder="Conte algo mais que possa ajudar no atendimento"
          error={errors.notes?.message}
          className="sm:col-span-2"
          {...register('notes')}
        />
      </div>
    </div>
  );
}
