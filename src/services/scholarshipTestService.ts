import { EDUCATION_LEVELS } from '@/constants/content';
import { RELATIONSHIP_OPTIONS } from '@/config/enrollmentOptions';
import type { ScholarshipTestSchema } from '@/schemas/scholarshipTestSchema';

export interface ScholarshipTestResult {
  success: boolean;
  message: string;
}

function labelFor(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label || value || '—';
}

export function levelLabel(levelId: string) {
  return EDUCATION_LEVELS.find((l) => l.id === levelId)?.title ?? levelId;
}

function formatBirthDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-BR');
}

export function buildScholarshipTestPayload(values: ScholarshipTestSchema) {
  return {
    level: levelLabel(values.levelId),
    grade: values.grade,
    student: {
      name: values.studentName,
      birthDate: values.birthDate ? formatBirthDate(values.birthDate) : values.birthDate,
    },
    guardian: {
      name: values.guardianName,
      relationship: labelFor(RELATIONSHIP_OPTIONS, values.relationship),
      phone: values.phone,
      email: values.email,
    },
    consent: values.consent,
  };
}

export async function submitScholarshipTest(values: ScholarshipTestSchema): Promise<ScholarshipTestResult> {
  try {
    const response = await fetch('/api/scholarship-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildScholarshipTestPayload(values)),
    });
    const data = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;

    if (!response.ok || !data?.success) {
      return {
        success: false,
        message: data?.message ?? 'Não foi possível enviar a inscrição agora. Tente novamente ou fale pelo WhatsApp.',
      };
    }
    return { success: true, message: data.message ?? 'Inscrição no Teste Bolsa recebida com sucesso!' };
  } catch {
    return { success: false, message: 'Falha de conexão. Verifique sua internet e tente novamente.' };
  }
}
