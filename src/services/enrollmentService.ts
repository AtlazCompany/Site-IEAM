import { ENROLLMENT_CONFIG } from '@/config/enrollment';
import { EDUCATION_LEVELS } from '@/constants/content';
import { SHIFT_OPTIONS, RELATIONSHIP_OPTIONS, HOW_FOUND_OPTIONS, BEST_TIME_OPTIONS, CONTACT_CHANNEL_OPTIONS } from '@/config/enrollmentOptions';
import type { EnrollmentSchema } from '@/schemas/enrollmentSchema';
import type { EnrollmentSubmissionResult } from '@/types/enrollment';

function labelFor(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label || value || '—';
}

export function levelLabel(levelId: string) {
  return EDUCATION_LEVELS.find((l) => l.id === levelId)?.title ?? levelId;
}

function effectiveWhatsapp(values: EnrollmentSchema) {
  return values.sameAsPhone ? values.phone : values.whatsapp;
}

function formatBirthDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-BR');
}

export function buildSubmissionPayload(values: EnrollmentSchema) {
  return {
    subject: `Novo interesse de matrícula — ${values.studentName}`,
    submittedAt: new Date().toISOString(),
    level: levelLabel(values.levelId),
    grade: values.grade,
    shift: values.shift ? labelFor(SHIFT_OPTIONS, values.shift) : null,
    student: {
      name: values.studentName,
      birthDate: values.birthDate ? formatBirthDate(values.birthDate) : values.birthDate,
    },
    guardian: {
      name: values.guardianName,
      relationship: labelFor(RELATIONSHIP_OPTIONS, values.relationship),
      phone: values.phone,
      whatsapp: effectiveWhatsapp(values),
      email: values.email,
    },
    preferredChannel: labelFor(CONTACT_CHANNEL_OPTIONS as unknown as { value: string; label: string }[], values.contactChannel),
    origin: {
      currentSchool: values.currentSchool || null,
      neighborhood: values.neighborhood || null,
      howFound: values.howFound ? labelFor(HOW_FOUND_OPTIONS, values.howFound) : null,
      bestTime: values.bestTime ? labelFor(BEST_TIME_OPTIONS, values.bestTime) : null,
    },
    notes: values.notes || null,
    consent: values.consent,
  };
}

export async function submitEnrollment(values: EnrollmentSchema): Promise<EnrollmentSubmissionResult> {
  if (!ENROLLMENT_CONFIG.apiEnabled || !ENROLLMENT_CONFIG.apiEndpoint) {
    return { attempted: false, emailSent: false, apiSent: false };
  }

  try {
    const response = await fetch(ENROLLMENT_CONFIG.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildSubmissionPayload(values)),
    });

    if (!response.ok) {
      throw new Error(`O servidor respondeu com status ${response.status}.`);
    }

    return {
      attempted: true,
      apiSent: true,
      emailSent: ENROLLMENT_CONFIG.emailEnabled,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Não foi possível conectar ao servidor.';
    return { attempted: true, apiSent: false, emailSent: false, apiError: message };
  }
}

export function buildWhatsAppMessage(values: EnrollmentSchema): string {
  const lines = [
    'Olá! Gostaria de iniciar o atendimento para matrícula no Instituto Educacional Afonso Mafrense.',
    '',
    `Nível de ensino: ${levelLabel(values.levelId)}`,
    `Aluno: ${values.studentName}`,
    `Série ou ano pretendido: ${values.grade}`,
    `Responsável: ${values.guardianName}`,
    `Telefone: ${values.phone}`,
  ];

  if (values.email) lines.push(`E-mail: ${values.email}`);
  if (values.bestTime) lines.push(`Melhor horário para contato: ${labelFor(BEST_TIME_OPTIONS, values.bestTime)}`);
  if (values.notes) lines.push(`Observações: ${values.notes}`);

  return lines.join('\n');
}

export function getWhatsAppUrl(values: EnrollmentSchema): string {
  const number = ENROLLMENT_CONFIG.whatsappNumber ?? '';
  const text = encodeURIComponent(buildWhatsAppMessage(values));
  return `https://wa.me/${number}?text=${text}`;
}
