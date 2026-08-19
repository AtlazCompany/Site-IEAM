import type { EducationLevelId } from '@/types/enrollment';

/**
 * Séries/anos por nível de ensino, usando a nomenclatura nacional padrão
 * (LDB/BNCC) — não são específicas do IEAM. A confirmação de turmas e vagas
 * por série cabe à secretaria no contato pós-formulário.
 */
export const GRADE_OPTIONS_BY_LEVEL: Record<EducationLevelId, string[]> = {
  infantil: ['Berçário', 'Maternal I', 'Maternal II', 'Pré I', 'Pré II'],
  fundamental: [
    '1º ano',
    '2º ano',
    '3º ano',
    '4º ano',
    '5º ano',
    '6º ano',
    '7º ano',
    '8º ano',
    '9º ano',
  ],
  medio: ['1º ano', '2º ano', '3º ano'],
};

/** Preferência informada pela família — sujeita à disponibilidade confirmada pela secretaria. */
export const SHIFT_OPTIONS = [
  { value: 'matutino', label: 'Matutino' },
  { value: 'vespertino', label: 'Vespertino' },
  { value: 'integral', label: 'Integral' },
  { value: 'sem-preferencia', label: 'Sem preferência' },
];

export const RELATIONSHIP_OPTIONS = [
  { value: 'mae', label: 'Mãe' },
  { value: 'pai', label: 'Pai' },
  { value: 'avo', label: 'Avó / Avô' },
  { value: 'tio', label: 'Tio / Tia' },
  { value: 'responsavel-legal', label: 'Responsável legal' },
  { value: 'outro', label: 'Outro' },
];

export const HOW_FOUND_OPTIONS = [
  { value: 'indicacao', label: 'Indicação de amigos ou família' },
  { value: 'redes-sociais', label: 'Redes sociais' },
  { value: 'busca-online', label: 'Busca na internet' },
  { value: 'ja-sou-aluno', label: 'Já sou ou fui aluno do IEAM' },
  { value: 'passei-em-frente', label: 'Passei em frente à escola' },
  { value: 'outro', label: 'Outro' },
];

export const BEST_TIME_OPTIONS = [
  { value: 'manha', label: 'Manhã' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'noite', label: 'Noite' },
  { value: 'qualquer', label: 'Qualquer horário' },
];

export const CONTACT_CHANNEL_OPTIONS = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'E-mail' },
  { value: 'phone', label: 'Ligação telefônica' },
] as const;
