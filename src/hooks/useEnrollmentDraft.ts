import { ENROLLMENT_DRAFT_STORAGE_KEY } from '@/config/enrollment';
import { ENROLLMENT_DEFAULT_VALUES, type EnrollmentFormValues } from '@/types/enrollment';

interface StoredDraft {
  values: EnrollmentFormValues;
  step: number;
}

export function loadEnrollmentDraft(): StoredDraft | null {
  try {
    const raw = sessionStorage.getItem(ENROLLMENT_DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredDraft;
    if (!parsed || typeof parsed !== 'object' || !parsed.values) return null;
    return { values: { ...ENROLLMENT_DEFAULT_VALUES, ...parsed.values }, step: parsed.step ?? 0 };
  } catch {
    return null;
  }
}

export function saveEnrollmentDraft(values: EnrollmentFormValues, step: number) {
  try {
    sessionStorage.setItem(ENROLLMENT_DRAFT_STORAGE_KEY, JSON.stringify({ values, step }));
  } catch {
    // sessionStorage indisponível (modo privado, quota excedida) — não é crítico.
  }
}

export function clearEnrollmentDraft() {
  try {
    sessionStorage.removeItem(ENROLLMENT_DRAFT_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function hasMeaningfulDraftData(values: EnrollmentFormValues): boolean {
  return Boolean(
    values.levelId ||
      values.studentName.trim() ||
      values.guardianName.trim() ||
      values.phone.trim() ||
      values.email.trim(),
  );
}
