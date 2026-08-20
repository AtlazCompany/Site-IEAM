import { useEffect, useState } from 'react';

/**
 * true em dispositivos sem hover confiável (touch) — usado para decidir
 * quando uma anotação "descoberta no hover" deve ficar sempre visível em
 * vez de depender de passar o mouse.
 */
export function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    setCoarse(window.matchMedia('(hover: none), (pointer: coarse)').matches);
  }, []);
  return coarse;
}
