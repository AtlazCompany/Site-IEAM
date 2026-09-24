import { jsPDF } from 'jspdf';
import { SITE } from '../../src/constants/site.js';
import { SCHOLARSHIP_TEST } from '../../src/constants/scholarshipTest.js';

export interface ScholarshipTestPdfData {
  level: string;
  grade: string;
  studentName: string;
  birthDate: string;
  guardianName: string;
  relationship: string;
  phone: string;
  email: string;
}

/**
 * Gera a mesma ficha que antes era baixada pelo navegador de quem se
 * inscrevia — agora só como anexo do e-mail de notificação (NOTIFY_EMAIL),
 * já que a ficha é de uso interno da secretaria, não do inscrito.
 */
export function buildScholarshipTestPdf(data: ScholarshipTestPdfData): Buffer {
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
    ['Nível de ensino', data.level],
    ['Série / ano pretendido', data.grade],
    ['Aluno', data.studentName],
    ['Data de nascimento', data.birthDate],
    ['Responsável', data.guardianName],
    ['Parentesco', data.relationship],
    ['Telefone / WhatsApp', data.phone],
    ['E-mail', data.email],
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

  return Buffer.from(doc.output('arraybuffer'));
}
