import type { ContactPayload, SubmissionResult } from '@/types/forms';

export async function submitContactForm(payload: ContactPayload): Promise<SubmissionResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;

    if (!response.ok || !data?.success) {
      return { success: false, message: data?.message ?? 'Não foi possível enviar sua mensagem agora. Tente novamente ou fale pelo WhatsApp.' };
    }
    return { success: true, message: data.message ?? 'Recebemos sua mensagem! Nossa equipe entrará em contato em breve.' };
  } catch {
    return { success: false, message: 'Falha de conexão. Verifique sua internet e tente novamente.' };
  }
}
