import { Resend } from 'resend';

/**
 * process.env aqui é o ambiente do runtime serverless da Vercel — nunca o
 * bundle do navegador. RESEND_API_KEY e NOTIFY_EMAIL não devem ter o
 * prefixo VITE_ (isso os exporia ao cliente). Configure-os no painel da
 * Vercel em Project Settings → Environment Variables.
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;
/**
 * onboarding@resend.dev é o remetente de sandbox do Resend — funciona sem
 * verificação de domínio, mas só entrega para o e-mail dono da conta Resend.
 * Assim que o domínio ieamafrense.com.br for verificado no Resend, troque
 * RESEND_FROM (env var) para algo como "IEAM <contato@ieamafrense.com.br>".
 */
const RESEND_FROM = process.env.RESEND_FROM || 'IEAM — Site <onboarding@resend.dev>';

export interface SendEmailInput {
  subject: string;
  html: string;
  replyTo?: string;
}

export interface SendEmailResult {
  ok: boolean;
  error?: string;
}

export async function sendNotificationEmail({ subject, html, replyTo }: SendEmailInput): Promise<SendEmailResult> {
  if (!RESEND_API_KEY) {
    return { ok: false, error: 'RESEND_API_KEY não configurada no servidor.' };
  }
  if (!NOTIFY_EMAIL) {
    return { ok: false, error: 'NOTIFY_EMAIL não configurada no servidor.' };
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: RESEND_FROM,
      to: NOTIFY_EMAIL,
      subject,
      html,
      replyTo,
    });

    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Falha desconhecida ao enviar e-mail.';
    return { ok: false, error: message };
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Monta uma tabela HTML simples e limpa a partir de pares label/valor — usada pelos três formulários. */
export function renderFieldsTable(rows: { label: string; value: string }[]): string {
  const trs = rows
    .filter((r) => r.value.trim().length > 0)
    .map(
      (r) => `
      <tr>
        <td style="padding:8px 12px;border:1px solid #dbdcd3;background:#f7f8f5;font-weight:600;color:#16211c;white-space:nowrap;">${escapeHtml(r.label)}</td>
        <td style="padding:8px 12px;border:1px solid #dbdcd3;color:#232b26;">${escapeHtml(r.value)}</td>
      </tr>`,
    )
    .join('');

  return `<table style="border-collapse:collapse;width:100%;max-width:560px;font-family:Arial,sans-serif;font-size:14px;">${trs}</table>`;
}
