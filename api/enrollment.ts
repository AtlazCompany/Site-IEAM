import type { VercelRequest, VercelResponse } from './_lib/types.js';
import { sendNotificationEmail, renderFieldsTable } from './_lib/resend.js';

/** Espelha o formato produzido por buildSubmissionPayload() em src/services/enrollmentService.ts. */
interface EnrollmentBody {
  subject?: string;
  level?: string;
  grade?: string;
  shift?: string | null;
  student?: { name?: string; birthDate?: string };
  guardian?: { name?: string; relationship?: string; phone?: string; whatsapp?: string; email?: string };
  preferredChannel?: string;
  origin?: { currentSchool?: string | null; neighborhood?: string | null; howFound?: string | null; bestTime?: string | null };
  notes?: string | null;
  consent?: boolean;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Método não permitido.' });
    return;
  }

  const body = req.body as EnrollmentBody;
  const studentName = (body.student?.name ?? '').trim();
  const guardianName = (body.guardian?.name ?? '').trim();
  const guardianPhone = (body.guardian?.phone ?? '').trim();

  if (!studentName || !guardianName || !guardianPhone || !body.consent) {
    res.status(400).json({ success: false, message: 'Dados obrigatórios ausentes ou consentimento não confirmado.' });
    return;
  }

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#142a22;">Novo interesse de matrícula</h2>
    ${renderFieldsTable([
      { label: 'Nível de ensino', value: body.level ?? '' },
      { label: 'Série / ano', value: body.grade ?? '' },
      { label: 'Turno', value: body.shift ?? '' },
      { label: 'Aluno', value: studentName },
      { label: 'Nascimento', value: body.student?.birthDate ?? '' },
      { label: 'Responsável', value: guardianName },
      { label: 'Parentesco', value: body.guardian?.relationship ?? '' },
      { label: 'Telefone', value: guardianPhone },
      { label: 'WhatsApp', value: body.guardian?.whatsapp ?? '' },
      { label: 'E-mail', value: body.guardian?.email ?? '' },
      { label: 'Canal preferido', value: body.preferredChannel ?? '' },
      { label: 'Escola atual', value: body.origin?.currentSchool ?? '' },
      { label: 'Bairro/cidade', value: body.origin?.neighborhood ?? '' },
      { label: 'Como conheceu', value: body.origin?.howFound ?? '' },
      { label: 'Melhor horário', value: body.origin?.bestTime ?? '' },
      { label: 'Observações', value: body.notes ?? '' },
    ])}
  `;

  const result = await sendNotificationEmail({
    subject: body.subject || `[Site IEAM] Novo interesse de matrícula — ${studentName}`,
    html,
    replyTo: body.guardian?.email || undefined,
  });

  if (!result.ok) {
    res.status(502).json({ success: false, message: result.error ?? 'Falha ao enviar e-mail.' });
    return;
  }

  res.status(200).json({ success: true, message: 'Interesse de matrícula enviado com sucesso.' });
}
