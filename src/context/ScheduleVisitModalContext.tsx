import { useCallback, useState, lazy, Suspense, type ReactNode } from 'react';
import { ScheduleVisitModalContext, type OpenScheduleVisitOptions } from './scheduleVisitModalContextValue';

const ScheduleVisitModal = lazy(() =>
  import('@/components/schedule-visit/ScheduleVisitModal').then((m) => ({ default: m.ScheduleVisitModal })),
);

export function ScheduleVisitModalProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<OpenScheduleVisitOptions | null>(null);

  const openScheduleVisit = useCallback((options: OpenScheduleVisitOptions) => {
    setRequest(options);
  }, []);

  return (
    <ScheduleVisitModalContext.Provider value={{ openScheduleVisit }}>
      {children}
      {request && (
        <Suspense fallback={null}>
          <ScheduleVisitModal origin={request.origin} onExited={() => setRequest(null)} />
        </Suspense>
      )}
    </ScheduleVisitModalContext.Provider>
  );
}
