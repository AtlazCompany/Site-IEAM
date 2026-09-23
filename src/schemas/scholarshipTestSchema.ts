import { z } from 'zod';
import { isEducationLevelId, type EducationLevelId } from '@/types/enrollment';
import { GRADE_OPTIONS_BY_LEVEL, RELATIONSHIP_OPTIONS } from '@/config/enrollmentOptions';
import { phoneRegex } from '@/utils/phone';

export const scholarshipTestSchema = z.object({
  levelId: z.string().refine(isEducationLevelId, {
    message: 'Selecione um nível de ensino.',
  }),
  studentName: z.string().trim().min(3, 'Informe o nome completo do aluno.').max(120, 'Nome muito longo.'),
  birthDate: z
    .string()
    .min(1, 'Informe a data de nascimento.')
    .refine((value) => {
      const date = new Date(value);
      return !Number.isNaN(date.getTime()) && date <= new Date();
    }, 'Data de nascimento inválida.'),
  grade: z.string().min(1, 'Selecione a série ou ano pretendido.'),

  guardianName: z.string().trim().min(3, 'Informe o nome completo do responsável.').max(120, 'Nome muito longo.'),
  relationship: z.string().min(1, 'Selecione o grau de parentesco.'),
  phone: z
    .string()
    .trim()
    .min(8, 'Informe um telefone válido.')
    .regex(phoneRegex, 'Use um telefone válido, ex: (86) 99999-9999.'),
  email: z.string().trim().min(1, 'Informe um e-mail.').email('E-mail inválido.'),

  consent: z.boolean().refine((v) => v === true, {
    message: 'É necessário autorizar o contato para enviar a inscrição.',
  }),
});

export type ScholarshipTestSchema = z.infer<typeof scholarshipTestSchema>;

/**
 * Tipo "largo" (campos de seleção como `string` simples, não a união literal
 * inferida pelo zod) usado como generic do `useForm` — mesma razão do
 * `EnrollmentFormValues` em types/enrollment.ts: o formulário usa `''` como
 * estado inicial de `levelId`, o que a união literal de `ScholarshipTestSchema`
 * não aceitaria. Os valores validados (já estreitados) são obtidos via
 * `getValues() as ScholarshipTestSchema` no callback de submit.
 */
export interface ScholarshipTestFormValues {
  levelId: string;
  studentName: string;
  birthDate: string;
  grade: string;
  guardianName: string;
  relationship: string;
  phone: string;
  email: string;
  consent: boolean;
}

export const SCHOLARSHIP_TEST_DEFAULT_VALUES: ScholarshipTestFormValues = {
  levelId: '',
  studentName: '',
  birthDate: '',
  grade: '',
  guardianName: '',
  relationship: '',
  phone: '',
  email: '',
  consent: false,
};

export function gradeOptionsFor(levelId: string): string[] {
  return GRADE_OPTIONS_BY_LEVEL[levelId as EducationLevelId] ?? [];
}

export { RELATIONSHIP_OPTIONS };
