import { z } from 'zod';

const phoneRegex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;

export const scheduleVisitSchema = z.object({
  name: z.string().trim().min(3, 'Informe seu nome completo.').max(120, 'Nome muito longo.'),
  phone: z
    .string()
    .trim()
    .min(8, 'Informe um telefone válido.')
    .regex(phoneRegex, 'Use um telefone válido, ex: (86) 99999-9999.'),
  email: z.string().trim().min(1, 'Informe um e-mail.').email('E-mail inválido.'),
  preferredDate: z
    .string()
    .min(1, 'Escolha uma data.')
    .refine((value) => {
      const date = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !Number.isNaN(date.getTime()) && date >= today;
    }, 'Escolha uma data a partir de hoje.'),
  preferredTime: z.string(),
  message: z.string().max(400, 'Máximo de 400 caracteres.'),
});

export type ScheduleVisitSchema = z.infer<typeof scheduleVisitSchema>;

export const SCHEDULE_VISIT_DEFAULT_VALUES: ScheduleVisitSchema = {
  name: '',
  phone: '',
  email: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
};

export const VISIT_TIME_OPTIONS = [
  { value: 'manha', label: 'Manhã (8h às 12h)' },
  { value: 'tarde', label: 'Tarde (14h às 17h)' },
  { value: 'qualquer', label: 'Sem preferência' },
] as const;
