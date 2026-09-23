import { useCallback, useState, lazy, Suspense, type ReactNode } from 'react';
import { ScholarshipTestModalContext, type OpenScholarshipTestOptions } from './scholarshipTestModalContextValue';

const ScholarshipTestModal = lazy(() =>
  import('@/components/scholarship-test/ScholarshipTestModal').then((m) => ({ default: m.ScholarshipTestModal })),
);

export function ScholarshipTestModalProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<OpenScholarshipTestOptions | null>(null);

  const openScholarshipTest = useCallback((options: OpenScholarshipTestOptions) => {
    setRequest(options);
  }, []);

  return (
    <ScholarshipTestModalContext.Provider value={{ openScholarshipTest }}>
      {children}
      {request && (
        <Suspense fallback={null}>
          <ScholarshipTestModal origin={request.origin} onExited={() => setRequest(null)} />
        </Suspense>
      )}
    </ScholarshipTestModalContext.Provider>
  );
}
