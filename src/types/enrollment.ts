export type EducationLevelId = 'infantil' | 'fundamental' | 'medio';

export type ContactChannel = 'whatsapp' | 'email' | 'phone';

export interface EnrollmentFormValues {
  /** Plain string (not the narrow union) so it matches the zod-inferred type used by the resolver. Valid values are enforced by the schema + EDUCATION_LEVELS options. */
  levelId: string;
  studentName: string;
  birthDate: string;
  grade: string;
  shift: string;
  guardianName: string;
  relationship: string;
  phone: string;
  whatsapp: string;
  sameAsPhone: boolean;
  email: string;
  currentSchool: string;
  neighborhood: string;
  howFound: string;
  notes: string;
  bestTime: string;
  /** Plain string for the same reason as levelId — validated against CONTACT_CHANNEL_OPTIONS. */
  contactChannel: string;
  consent: boolean;
}

export function isEducationLevelId(value: string): value is EducationLevelId {
  return value === 'infantil' || value === 'fundamental' || value === 'medio';
}

export const ENROLLMENT_DEFAULT_VALUES: EnrollmentFormValues = {
  levelId: '',
  studentName: '',
  birthDate: '',
  grade: '',
  shift: '',
  guardianName: '',
  relationship: '',
  phone: '',
  whatsapp: '',
  sameAsPhone: true,
  email: '',
  currentSchool: '',
  neighborhood: '',
  howFound: '',
  notes: '',
  bestTime: '',
  contactChannel: '',
  consent: false,
};

export type WizardStepId =
  | 'level'
  | 'student'
  | 'guardian'
  | 'additional'
  | 'channel'
  | 'review'
  | 'consent';

export interface WizardStepDef {
  id: WizardStepId;
  title: string;
  fields: (keyof EnrollmentFormValues)[];
}

export const WIZARD_STEPS: WizardStepDef[] = [
  { id: 'level', title: 'Nível de ensino', fields: ['levelId'] },
  { id: 'student', title: 'Dados do aluno', fields: ['studentName', 'birthDate', 'grade', 'shift'] },
  {
    id: 'guardian',
    title: 'Dados do responsável',
    fields: ['guardianName', 'relationship', 'phone', 'whatsapp', 'sameAsPhone', 'email'],
  },
  {
    id: 'additional',
    title: 'Informações complementares',
    fields: ['currentSchool', 'neighborhood', 'howFound', 'notes', 'bestTime'],
  },
  { id: 'channel', title: 'Canal de atendimento', fields: ['contactChannel'] },
  { id: 'review', title: 'Revisão', fields: [] },
  { id: 'consent', title: 'Consentimento e envio', fields: ['consent'] },
];

export function reviewStepIndex(stepId: WizardStepId) {
  return WIZARD_STEPS.findIndex((s) => s.id === stepId);
}

export interface EnrollmentSubmissionResult {
  emailSent: boolean;
  apiSent: boolean;
  emailError?: string;
  apiError?: string;
  attempted: boolean;
}
