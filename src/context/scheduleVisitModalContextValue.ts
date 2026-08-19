import { createContext } from 'react';

export interface OpenScheduleVisitOptions {
  origin: string;
}

export interface ScheduleVisitModalContextValue {
  openScheduleVisit: (options: OpenScheduleVisitOptions) => void;
}

export const ScheduleVisitModalContext = createContext<ScheduleVisitModalContextValue | null>(null);
