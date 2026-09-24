import { EDUCATION_LEVELS, SCHOLARSHIP_TEST } from '@/constants/content';
import { RELATIONSHIP_OPTIONS } from '@/config/enrollmentOptions';
import { SITE } from '@/constants/site';
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

/**
 * Ficha de inscrição em PDF — baixada no navegador de quem preenche o
 * formulário, para levar impressa (ou anexar por WhatsApp/e-mail) à
 * secretaria. Gerada no cliente: o site não tem armazenamento persistente
 * das inscrições, então cada ficha é independente, sem lista acumulada.
 *
 * `jspdf` (~130kB gzip) é importado dinamicamente aqui, não no topo do
 * arquivo — assim ele só é baixado quando alguém realmente clica em "baixar
 * PDF" (depois de inscrito), em vez de inflar o chunk do modal para todo
 * mundo que apenas abre o formulário.
 */
export async function generateScholarshipTestPdf(values: ScholarshipTestSchema): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const marginX = 56;
  let y = 64;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Ficha de Inscrição — Teste Bolsa', marginX, y);

  y += 20;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(SITE.name, marginX, y);

  y += 32;
  doc.setDrawColor(200);
  doc.line(marginX, y, 595 - marginX, y);
  y += 28;

  const rows: [string, string][] = [
    ['Nível de ensino', levelLabel(values.levelId)],
    ['Série / ano pretendido', values.grade],
    ['Aluno', values.studentName],
    ['Data de nascimento', values.birthDate ? formatBirthDate(values.birthDate) : ''],
    ['Responsável', values.guardianName],
    ['Parentesco', labelFor(RELATIONSHIP_OPTIONS, values.relationship)],
    ['Telefone / WhatsApp', values.phone],
    ['E-mail', values.email],
    ['Data da inscrição', new Date().toLocaleString('pt-BR')],
  ];

  doc.setFontSize(12);
  for (const [label, value] of rows) {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, marginX, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value || '—', marginX + 170, y);
    y += 24;
  }

  y += 16;
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(
    `Teste em ${SCHOLARSHIP_TEST.date}, das ${SCHOLARSHIP_TEST.time}. ${SCHOLARSHIP_TEST.location}.`,
    marginX,
    y,
  );

  const fileName = `ficha-teste-bolsa-${values.studentName.trim().toLowerCase().replace(/\s+/g, '-')}.pdf`;
  doc.save(fileName);
}
