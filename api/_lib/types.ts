/**
 * Tipos mínimos e locais para as funções serverless da Vercel — evita a
 * dependência @vercel/node (árvore de pacotes profunda que conflitava com a
 * sincronização do Google Drive neste projeto). A Vercel injeta req/res
 * compatíveis com estas formas em tempo de execução independentemente do
 * que está listado em package.json.
 */
export interface VercelRequest {
  method?: string;
  body: unknown;
  headers: Record<string, string | string[] | undefined>;
  query: Record<string, string | string[] | undefined>;
}

export interface VercelResponse {
  status(code: number): VercelResponse;
  json(body: unknown): void;
}
