import { createContext } from 'react';

export interface OpenEnrollmentOptions {
  level?: string;
  origin: string;
}

export interface EnrollmentModalContextValue {
  openEnrollment: (options: OpenEnrollmentOptions) => void;
}

export const EnrollmentModalContext = createContext<EnrollmentModalContextValue | null>(null);
