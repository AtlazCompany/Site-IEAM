/**
 * Meta Pixel (Facebook/Instagram Ads) — ativo apenas se VITE_META_PIXEL_ID
 * estiver definida no `.env` (vazio = desativado, sem custo de rede extra).
 *
 * Implementado como módulo próprio, não como o snippet inline padrão da
 * Meta, porque a CSP do site (vercel.json) não libera 'unsafe-inline' em
 * script-src — um <script> inline seria bloqueado pelo navegador. Este
 * módulo injeta a tag <script src="https://connect.facebook.net/..."> via
 * DOM, com esse domínio liberado explicitamente na CSP.
 */

type FbqFn = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: FbqFn;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || null;

export const metaPixelEnabled = Boolean(PIXEL_ID);

/** Chamado uma vez na inicialização do app (main.tsx). */
export function initMetaPixel(): void {
  if (!PIXEL_ID || window.fbq) return;

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as FbqFn;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.push = fbq;

  window.fbq = fbq;
  window._fbq = window._fbq || fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');
}

/**
 * Eventos padrão da Meta (ex: 'Lead') para otimizar campanhas de tráfego
 * pago — sem dados pessoais, só metadados (mesma regra de
 * services/analytics.ts).
 */
export function trackMetaPixelEvent(event: string, params?: Record<string, string | number>): void {
  if (!metaPixelEnabled || !window.fbq) return;
  window.fbq('track', event, params);
}
