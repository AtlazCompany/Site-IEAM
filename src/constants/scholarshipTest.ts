/**
 * Isolado de content.ts (que importa imagens via Vite) para que a função
 * serverless de /api/scholarship-test.ts também possa importar este arquivo
 * sem arrastar assets que só o bundler do navegador sabe resolver.
 */
export const SCHOLARSHIP_TEST = {
  date: '24 de outubro de 2026',
  time: '8h às 10h',
  location: 'No próprio Instituto Educacional Afonso Mafrense',
  period: '24 de outubro, das 8h às 10h — no próprio Instituto',
};
