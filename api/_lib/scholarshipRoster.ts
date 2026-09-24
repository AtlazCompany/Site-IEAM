import { Redis } from '@upstash/redis';
import { jsPDF } from 'jspdf';
import { SITE } from '../../src/constants/site.js';
import { SCHOLARSHIP_TEST } from '../../src/constants/scholarshipTest.js';

export interface ScholarshipRosterEntry {
  studentName: string;
  grade: string;
  guardianName: string;
  phone: string;
  submittedAt: string;
}

/**
 * A chave embute a data do teste (SCHOLARSHIP_TEST.date) — assim, quando a
 * escola abrir o próximo Teste Bolsa e essa data for atualizada em
 * scholarshipTest.ts, a lista começa vazia automaticamente, sem precisar de
 * reset manual no Redis.
 */
function rosterKey(): string {
  return `scholarship-test:${SCHOLARSHIP_TEST.date}`;
}

let redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redis === undefined) {
    try {
      redis = Redis.fromEnv();
    } catch {
      redis = null;
    }
  }
  return redis;
}

/** Adiciona a inscrição à lista do ciclo atual e retorna todas as inscrições até agora. */
export async function appendToRoster(entry: ScholarshipRosterEntry): Promise<ScholarshipRosterEntry[]> {
  const client = getRedis();
  if (!client) {
    return [entry];
  }
  try {
    const key = rosterKey();
    await client.rpush(key, JSON.stringify(entry));
    const raw = await client.lrange<string>(key, 0, -1);
    return raw.map((item) => (typeof item === 'string' ? (JSON.parse(item) as ScholarshipRosterEntry) : (item as ScholarshipRosterEntry)));
  } catch (err) {
    console.error('Falha ao atualizar a lista de inscrições no Redis:', err);
    return [entry];
  }
}

/** Gera o PDF com a lista completa de inscritos no Teste Bolsa deste ciclo, um por linha. */
export function buildScholarshipRosterPdf(entries: ScholarshipRosterEntry[]): Buffer {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const marginX = 40;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const columns: { label: string; x: number; width: number }[] = [
    { label: 'Nº', x: marginX, width: 24 },
    { label: 'Aluno', x: marginX + 24, width: 150 },
    { label: 'Série', x: marginX + 174, width: 70 },
    { label: 'Responsável', x: marginX + 244, width: 140 },
    { label: 'Telefone', x: marginX + 384, width: 90 },
  ];
  let y = 56;

  function drawHeader() {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('Lista de Inscrições — Teste Bolsa', marginX, y);
    y += 20;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(
      `${SITE.name} — ${SCHOLARSHIP_TEST.date}, das ${SCHOLARSHIP_TEST.time}. ${SCHOLARSHIP_TEST.location}.`,
      marginX,
      y,
    );
    doc.text(`Total de inscritos: ${entries.length}`, marginX, (y += 14));
    doc.setTextColor(0);
    y += 22;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    for (const col of columns) doc.text(col.label, col.x, y);
    doc.setDrawColor(180);
    doc.line(marginX, y + 4, pageWidth - marginX, y + 4);
    y += 18;
    doc.setFont('helvetica', 'normal');
  }

  drawHeader();

  entries.forEach((entry, index) => {
    if (y > pageHeight - 48) {
      doc.addPage();
      y = 56;
      drawHeader();
    }
    const row = [String(index + 1), entry.studentName, entry.grade, entry.guardianName, entry.phone];
    row.forEach((value, i) => {
      const col = columns[i];
      const text = doc.splitTextToSize(value || '—', col.width - 4);
      doc.text(text[0] ?? '—', col.x, y);
    });
    y += 18;
  });

  return Buffer.from(doc.output('arraybuffer'));
}
