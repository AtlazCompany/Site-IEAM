const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
/** Teto de IPs rastreados simultaneamente — protege contra crescimento ilimitado de memória entre invocações "quentes" da função. */
const MAX_TRACKED_IPS = 5000;

const hits = new Map<string, number[]>();

/**
 * Limitador em memória por instância da função serverless. Não é distribuído
 * (cada instância "fria" da Vercel começa do zero, e instâncias diferentes
 * não compartilham estado) — é uma barreira simples contra scripts abusando
 * de um endpoint repetidamente, não uma proteção de nível empresarial. Se o
 * volume de spam justificar, trocar por um rate limit distribuído (ex:
 * Upstash Redis) sem mudar a assinatura desta função.
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);

  if (hits.size >= MAX_TRACKED_IPS && !hits.has(ip)) {
    hits.clear();
  }
  hits.set(ip, recent);

  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

export function getClientIp(headers: Record<string, string | string[] | undefined>): string {
  const forwarded = headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value?.split(',')[0]?.trim() || 'unknown';
}
