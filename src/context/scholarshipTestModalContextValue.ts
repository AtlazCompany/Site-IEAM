import { createContext } from 'react';

export interface OpenScholarshipTestOptions {
  origin: string;
}

export interface ScholarshipTestModalContextValue {
  openScholarshipTest: (options: OpenScholarshipTestOptions) => void;
}

export const ScholarshipTestModalContext = createContext<ScholarshipTestModalContextValue | null>(null);
