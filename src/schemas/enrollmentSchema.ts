import { z } from 'zod';

const phoneRegex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
const LEVEL_IDS = ['infantil', 'fundamental', 'medio'] as const;
const CHANNELS = ['whatsapp', 'email', 'phone'] as const;

/**
 * Campos tipados como `string`/`boolean` simples (não `z.enum`) para casar
 * estruturalmente com `EnrollmentFormValues` — o formulário usa `''` como
 * estado inicial de campos de seleção, o que `z.enum` não aceitaria.
 */
export const enrollmentSchema = z
  .object({
    levelId: z
      .string()
      .refine((v): v is (typeof LEVEL_IDS)[number] => (LEVEL_IDS as readonly string[]).includes(v), {
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
    shift: z.string(),

    guardianName: z.string().trim().min(3, 'Informe o nome completo do responsável.').max(120, 'Nome muito longo.'),
    relationship: z.string().min(1, 'Selecione o grau de parentesco.'),
    phone: z
      .string()
      .trim()
      .min(8, 'Informe um telefone válido.')
      .regex(phoneRegex, 'Use um telefone válido, ex: (86) 99999-9999.'),
    whatsapp: z.string(),
    sameAsPhone: z.boolean(),
    email: z.string().trim().min(1, 'Informe um e-mail.').email('E-mail inválido.'),

    currentSchool: z.string().max(120, 'Máximo de 120 caracteres.'),
    neighborhood: z.string().max(120, 'Máximo de 120 caracteres.'),
    howFound: z.string(),
    notes: z.string().max(600, 'Máximo de 600 caracteres.'),
    bestTime: z.string(),

    contactChannel: z
      .string()
      .refine((v): v is (typeof CHANNELS)[number] => (CHANNELS as readonly string[]).includes(v), {
        message: 'Selecione como prefere continuar o atendimento.',
      }),

    consent: z.boolean().refine((v) => v === true, {
      message: 'É necessário autorizar o contato para enviar o formulário.',
    }),
  })
  .superRefine((data, ctx) => {
    if (!data.sameAsPhone) {
      if (!data.whatsapp.trim()) {
        ctx.addIssue({ code: 'custom', path: ['whatsapp'], message: 'Informe o WhatsApp ou marque "é o mesmo número".' });
      } else if (!phoneRegex.test(data.whatsapp)) {
        ctx.addIssue({ code: 'custom', path: ['whatsapp'], message: 'Use um WhatsApp válido, ex: (86) 99999-9999.' });
      }
    }
  });

export type EnrollmentSchema = z.infer<typeof enrollmentSchema>;
