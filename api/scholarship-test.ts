import type { VercelRequest, VercelResponse } from './_lib/types.js';
import { sendNotificationEmail, renderFieldsTable } from './_lib/resend.js';
import { getClientIp, isRateLimited } from './_lib/rateLimit.js';

/** Espelha o formato produzido por buildScholarshipTestPayload() em src/services/scholarshipTestService.ts. */
interface ScholarshipTestBody {
  level?: string;
  grade?: string;
  student?: { name?: string; birthDate?: string };
  guardian?: { name?: string; relationship?: string; phone?: string; email?: string };
  consent?: boolean;
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

  const body = req.body as ScholarshipTestBody;
  const studentName = (body.student?.name ?? '').trim();
  const guardianName = (body.guardian?.name ?? '').trim();
  const guardianPhone = (body.guardian?.phone ?? '').trim();

  if (!studentName || !guardianName || !guardianPhone || !body.consent) {
    res.status(400).json({ success: false, message: 'Dados obrigatórios ausentes ou consentimento não confirmado.' });
    return;
  }

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#142a22;">Nova inscrição — Teste Bolsa</h2>
    ${renderFieldsTable([
      { label: 'Nível de ensino', value: body.level ?? '' },
      { label: 'Série / ano', value: body.grade ?? '' },
      { label: 'Aluno', value: studentName },
      { label: 'Nascimento', value: body.student?.birthDate ?? '' },
      { label: 'Responsável', value: guardianName },
      { label: 'Parentesco', value: body.guardian?.relationship ?? '' },
      { label: 'Telefone', value: guardianPhone },
      { label: 'E-mail', value: body.guardian?.email ?? '' },
    ])}
  `;

  const result = await sendNotificationEmail({
    subject: `[Site IEAM] Nova inscrição — Teste Bolsa — ${studentName}`,
    html,
    replyTo: body.guardian?.email || undefined,
  });

  if (!result.ok) {
    res.status(502).json({ success: false, message: result.error ?? 'Falha ao enviar e-mail.' });
    return;
  }

  res.status(200).json({ success: true, message: 'Inscrição no Teste Bolsa enviada com sucesso.' });
}
