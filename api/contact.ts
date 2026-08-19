import type { VercelRequest, VercelResponse } from './_lib/types';
import { sendNotificationEmail, renderFieldsTable, escapeHtml } from './_lib/resend';

interface ContactBody {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Método não permitido.' });
    return;
  }

  const body = req.body as ContactBody;
  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const phone = (body.phone ?? '').trim();
  const subject = (body.subject ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !email || !message) {
    res.status(400).json({ success: false, message: 'Nome, e-mail e mensagem são obrigatórios.' });
    return;
  }

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#142a22;">Nova mensagem pelo formulário de contato</h2>
    ${renderFieldsTable([
      { label: 'Nome', value: name },
      { label: 'E-mail', value: email },
      { label: 'Telefone', value: phone },
      { label: 'Assunto', value: subject },
    ])}
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#232b26;margin-top:16px;"><strong>Mensagem:</strong></p>
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#232b26;white-space:pre-wrap;border-left:3px solid #2f6e4e;padding-left:12px;">${escapeHtml(message)}</p>
  `;

  const result = await sendNotificationEmail({
    subject: `[Site IEAM] Contato — ${subject || name}`,
    html,
    replyTo: email,
  });

  if (!result.ok) {
    res.status(502).json({ success: false, message: result.error ?? 'Falha ao enviar e-mail.' });
    return;
  }

  res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso.' });
}
