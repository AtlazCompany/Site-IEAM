import { useEffect, useState } from 'react';

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    function check() {
      setScrolled(window.scrollY > threshold);
      ticking = false;
    }

    // Throttle via rAF: o navegador já pode disparar 'scroll' várias vezes
    // por frame; isto garante no máximo uma leitura de layout por frame.
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    }

    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
