import { VISIT_TIME_OPTIONS, type ScheduleVisitSchema } from '@/schemas/scheduleVisitSchema';

export interface ScheduleVisitResult {
  success: boolean;
  message: string;
}

function formatPreferredDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-BR');
}

function timeLabel(value: string): string {
  return VISIT_TIME_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export async function submitScheduleVisit(values: ScheduleVisitSchema): Promise<ScheduleVisitResult> {
  try {
    const payload = {
      ...values,
      preferredDate: values.preferredDate ? formatPreferredDate(values.preferredDate) : values.preferredDate,
      preferredTime: values.preferredTime ? timeLabel(values.preferredTime) : values.preferredTime,
    };
    const response = await fetch('/api/schedule-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;

    if (!response.ok || !data?.success) {
      return {
        success: false,
        message: data?.message ?? 'Não foi possível agendar agora. Tente novamente ou fale pelo WhatsApp.',
      };
    }
    return { success: true, message: data.message ?? 'Visita agendada! Em breve nossa equipe confirma o horário.' };
  } catch {
    return { success: false, message: 'Falha de conexão. Verifique sua internet e tente novamente.' };
  }
}
