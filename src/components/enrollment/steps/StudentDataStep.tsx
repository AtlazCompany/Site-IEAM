import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputField, SelectField } from '@/components/ui';
import { GRADE_OPTIONS_BY_LEVEL, SHIFT_OPTIONS } from '@/config/enrollmentOptions';
import { EDUCATION_LEVELS } from '@/constants/content';
import { isEducationLevelId, type EnrollmentFormValues } from '@/types/enrollment';

export function StudentDataStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<EnrollmentFormValues>();
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const levelId = watch('levelId');

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  const levelTitle = EDUCATION_LEVELS.find((l) => l.id === levelId)?.title ?? '';
  const gradeOptions = isEducationLevelId(levelId) ? GRADE_OPTIONS_BY_LEVEL[levelId] : [];
  const { ref: studentNameRef, ...studentNameField } = register('studentName');

  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">Dados do aluno</h3>
      <p className="mt-2 text-sm text-ink-500">Conte um pouco sobre quem vai estudar no IEAM.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <span className="label-mono text-[10px] text-ink-400">Nível de ensino selecionado</span>
          <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700">
            {levelTitle}
          </div>
        </div>

        <InputField
          label="Nome completo do aluno"
          id="studentName"
          placeholder="Nome completo"
          required
          error={errors.studentName?.message}
          className="sm:col-span-2"
          ref={(el) => {
            studentNameRef(el);
            firstFieldRef.current = el;
          }}
          {...studentNameField}
        />

        <InputField
          label="Data de nascimento"
          id="birthDate"
          type="date"
          required
          max={new Date().toISOString().slice(0, 10)}
          error={errors.birthDate?.message}
          {...register('birthDate')}
        />

        <SelectField label="Série ou ano pretendido" id="grade" required error={errors.grade?.message} {...register('grade')}>
          <option value="">Selecione</option>
          {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="Turno de preferência"
          id="shift"
          hint="Preferência sujeita à disponibilidade de turmas."
          className="sm:col-span-2"
          {...register('shift')}
        >
          <option value="">Sem preferência definida</option>
          {SHIFT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>
    </div>
  );
}
