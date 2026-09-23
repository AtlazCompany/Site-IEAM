import { useContext } from 'react';
import { ScholarshipTestModalContext } from '@/context/scholarshipTestModalContextValue';

export function useScholarshipTestModal() {
  const ctx = useContext(ScholarshipTestModalContext);
  if (!ctx) throw new Error('useScholarshipTestModal deve ser usado dentro de <ScholarshipTestModalProvider>.');
  return ctx;
}
