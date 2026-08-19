import { useCallback, useState, lazy, Suspense, type ReactNode } from 'react';
import { EnrollmentModalContext, type OpenEnrollmentOptions } from './enrollmentModalContextValue';

const EnrollmentModal = lazy(() =>
  import('@/components/enrollment/EnrollmentModal').then((m) => ({ default: m.EnrollmentModal })),
);

export function EnrollmentModalProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<OpenEnrollmentOptions | null>(null);

  const openEnrollment = useCallback((options: OpenEnrollmentOptions) => {
    setRequest(options);
  }, []);

  return (
    <EnrollmentModalContext.Provider value={{ openEnrollment }}>
      {children}
      {request && (
        <Suspense fallback={null}>
          <EnrollmentModal initialLevel={request.level} origin={request.origin} onExited={() => setRequest(null)} />
        </Suspense>
      )}
    </EnrollmentModalContext.Provider>
  );
}
