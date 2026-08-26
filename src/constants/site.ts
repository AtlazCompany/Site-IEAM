export const SITE = {
  name: 'Instituto Educacional Afonso Mafrense',
  shortName: 'IEAM',
  tagline: 'Transformando conhecimento em futuro.',
  tenure: 'mais de 30 anos',
  /** Ano letivo das matrículas em destaque no site. Atualizar anualmente. */
  enrollmentYear: 2026,
  phone: '(86) 3227-3835',
  whatsapp: '5586994863802',
  email: 'amafrense@gmail.com',
  address: 'R. Maria de Lurdes Paixão, 5540-5550 - Saci, Teresina - PI',
  /** Inclui o nome do estabelecimento na busca — é o que faz o Google Maps
   * resolver para a ficha oficial do IEAM (com a foto da fachada) em vez de
   * um ponto genérico no meio da rua. */
  mapsEmbedQuery:
    'Instituto%20Educacional%20Afonso%20Mafrense%20-%20IEAM%2C%20R.%20Maria%20de%20Lurdes%20Paix%C3%A3o%2C%205540-5550%20-%20Saci%2C%20Teresina%20-%20PI',
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
