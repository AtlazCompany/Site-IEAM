import type { ScheduleVisitSchema } from '@/schemas/scheduleVisitSchema';

export interface ScheduleVisitResult {
  success: boolean;
  message: string;
}

export async function submitScheduleVisit(values: ScheduleVisitSchema): Promise<ScheduleVisitResult> {
  try {
    const response = await fetch('/api/schedule-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
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
