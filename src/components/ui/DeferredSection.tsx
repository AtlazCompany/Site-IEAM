import { Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface DeferredSectionProps {
  children: ReactNode;
  /**
   * Altura estimada do placeholder (px), para reservar o espaço da seção
   * real e não gerar layout shift quando ela montar. Não precisa ser exata
   * — só precisa ser próxima o bastante, e o `rootMargin` generoso garante
   * que a montagem acontece bem antes da seção entrar na viewport.
   */
  minHeight: number;
  className?: string;
}

/**
 * Adia a montagem de uma seção até ela se aproximar da viewport.
 *
 * No carregamento da Home, montar as 11 seções de uma vez (cada uma com
 * várias instâncias de Reveal/StaggerGroup do Framer Motion) gera uma única
 * long task grande na thread principal, mesmo para seções que o usuário só
 * veria depois de rolar bastante. Isto adia esse custo para quando a seção
 * realmente importa.
 *
 * Trade-off consciente: como o site é uma SPA sem SSR/pré-renderização, o
 * conteúdo adiado já não existe no HTML inicial de qualquer forma (é tudo
 * client-rendered); isto não piora a indexação em relação ao que já era
 * verdade antes. Rastreadores que executam JS e aguardam/rolam a página
 * (caso do Googlebot) continuam vendo o conteúdo normalmente.
 */
export function DeferredSection({ children, minHeight, className }: DeferredSectionProps) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mounted) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      // Margem generosa: a seção monta bem antes de entrar na tela, então o
      // swap placeholder → conteúdo real acontece fora da viewport visível.
      { rootMargin: '800px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  const placeholder = <div ref={ref} aria-hidden="true" className={className} style={{ minHeight }} />;

  if (mounted) {
    // `children` pode ser um componente `lazy()` (é o caso das seções
    // abaixo da dobra, ver Home.tsx) — o Suspense cobre o intervalo entre
    // "entrou na viewport" e "chunk JS baixado", mantendo a mesma altura
    // reservada em vez de dar um salto de layout.
    return <Suspense fallback={placeholder}>{children}</Suspense>;
  }

  return placeholder;
}
