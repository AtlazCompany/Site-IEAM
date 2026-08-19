export const SITE = {
  name: 'Instituto Educacional Afonso Mafrense',
  shortName: 'IEAM',
  tagline: 'Transformando conhecimento em futuro.',
  tenure: 'mais de 30 anos',
  /** Ano letivo das matrículas em destaque no site. Atualizar anualmente. */
  enrollmentYear: 2026,
  phone: '(86) 3227-3835',
  whatsapp: '5586999006021',
  email: 'contato@ieamafrense.com.br',
  address: 'Rua Francisca de Melo Lobo, 5540 — Bairro Saci, Teresina - PI',
  mapsEmbedQuery: 'Rua%20Francisca%20de%20Melo%20Lobo%2C%205540%2C%20Teresina%2C%20PI',
  social: {
    instagram: 'https://instagram.com/ieamafrense',
    facebook: 'https://facebook.com/ieamafrense',
    /**
     * Sem canal oficial confirmado ainda — deixe undefined para que o ícone
     * do YouTube não apareça no rodapé. Preencha com a URL real assim que o
     * canal existir.
     */
    youtube: undefined as string | undefined,
  },
} as const;

export const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Instituição', href: '/instituicao' },
  { label: 'Ensino', href: '/ensino' },
  { label: 'Notícias', href: '/noticias' },
  { label: 'Contato', href: '/contato' },
  { label: 'Matrícula', href: '/matricula' },
];
