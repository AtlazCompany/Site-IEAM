/**
 * Eventos de produto sem dados pessoais. Nunca passe nome, telefone, e-mail,
 * data de nascimento, mensagens ou qualquer dado do aluno/responsável aqui —
 * apenas metadados de navegação (etapa, origem do clique, nível selecionado).
 */

type EnrollmentEvent =
  | { name: 'enrollment_form_opened'; origin: string; level?: string }
  | { name: 'enrollment_step_completed'; step: number; stepId: string }
  | { name: 'enrollment_form_abandoned'; step: number; stepId: string }
  | { name: 'enrollment_form_submitted'; channel: string }
  | { name: 'whatsapp_opened'; origin: string }
  | { name: 'contact_button_clicked'; origin: string };

export function trackEvent(event: EnrollmentEvent) {
  const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push({ event: event.name, ...event });
  }
}
