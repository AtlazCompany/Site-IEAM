import { useContext } from 'react';
import { ScheduleVisitModalContext } from '@/context/scheduleVisitModalContextValue';

export function useScheduleVisitModal() {
  const ctx = useContext(ScheduleVisitModalContext);
  if (!ctx) throw new Error('useScheduleVisitModal deve ser usado dentro de <ScheduleVisitModalProvider>.');
  return ctx;
}
