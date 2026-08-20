import type { VercelRequest, VercelResponse } from './_lib/types.js';
import { sendNotificationEmail, renderFieldsTable, escapeHtml } from './_lib/resend.js';
import { getClientIp, isRateLimited } from './_lib/rateLimit.js';

interface ScheduleVisitBody {
  name?: string;
  phone?: string;
  email?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Método não permitido.' });
    return;
  }

  if (isRateLimited(getClientIp(req.headers))) {
    res.status(429).json({ success: false, message: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' });
    return;
  }

  const body = req.body as ScheduleVisitBody;
  const name = (body.name ?? '').trim();
  const phone = (body.phone ?? '').trim();
  const email = (body.email ?? '').trim();
  const preferredDate = (body.preferredDate ?? '').trim();

  if (!name || !phone || !email || !preferredDate) {
    res.status(400).json({ success: false, message: 'Nome, telefone, e-mail e data preferida são obrigatórios.' });
    return;
  }

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#142a22;">Novo agendamento de visita</h2>
    ${renderFieldsTable([
      { label: 'Nome', value: name },
      { label: 'Telefone', value: phone },
      { label: 'E-mail', value: email },
      { label: 'Data preferida', value: preferredDate },
      { label: 'Horário preferido', value: body.preferredTime ?? '' },
    ])}
    ${
      body.message?.trim()
        ? `<p style="font-family:Arial,sans-serif;font-size:14px;color:#232b26;margin-top:16px;"><strong>Mensagem:</strong></p>
           <p style="font-family:Arial,sans-serif;font-size:14px;color:#232b26;white-space:pre-wrap;border-left:3px solid #2f6e4e;padding-left:12px;">${escapeHtml(body.message.trim())}</p>`
        : ''
    }
  `;

  const result = await sendNotificationEmail({
    subject: `[Site IEAM] Agendamento de visita — ${name}`,
    html,
    replyTo: email,
  });

  if (!result.ok) {
    res.status(502).json({ success: false, message: result.error ?? 'Falha ao enviar e-mail.' });
    return;
  }

  res.status(200).json({ success: true, message: 'Visita agendada com sucesso.' });
}
