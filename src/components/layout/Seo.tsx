import { useEffect } from 'react';
import { SITE } from '@/constants/site';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  /** Quando true, omite a tag canonical (usado pela página 404, que não representa uma URL real e indexável). */
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function Seo({ title, description, path = '', noindex = false }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE.shortName}`;
    document.title = fullTitle;
    const ogImage = 'https://www.ieamafrense.com.br/og-cover.png';

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', `https://www.ieamafrense.com.br${path}`);
    setMeta('property', 'og:site_name', SITE.name);
    setMeta('property', 'og:image', ogImage);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');

    const existingCanonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (noindex) {
      existingCanonical?.remove();
      return;
    }

    const canonical = existingCanonical ?? document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', `https://www.ieamafrense.com.br${path}`);
    if (!existingCanonical) document.head.appendChild(canonical);
  }, [title, description, path, noindex]);

  return null;
}
