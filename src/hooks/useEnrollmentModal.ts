import { useContext } from 'react';
import { EnrollmentModalContext } from '@/context/enrollmentModalContextValue';

export function useEnrollmentModal() {
  const ctx = useContext(EnrollmentModalContext);
  if (!ctx) throw new Error('useEnrollmentModal deve ser usado dentro de <EnrollmentModalProvider>.');
  return ctx;
}
