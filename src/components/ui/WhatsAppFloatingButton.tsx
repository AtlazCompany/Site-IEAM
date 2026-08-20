import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { WhatsAppIcon } from './SocialIcons';
import { ENROLLMENT_CONFIG } from '@/config/enrollment';
import { trackEvent } from '@/services/analytics';

const DEFAULT_MESSAGE = 'Olá! Gostaria de agendar uma visita e tirar dúvidas sobre as matrículas.';

/**
 * Botão fixo de WhatsApp, presente em todas as páginas via MainLayout.
 * Usa o mesmo número já resolvido para o restante do site (env var com
 * fallback em SITE.whatsapp) para nunca ficar dessincronizado.
 */
export function WhatsAppFloatingButton() {
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  if (!ENROLLMENT_CONFIG.whatsappEnabled || !ENROLLMENT_CONFIG.whatsappNumber) return null;

  const href = `https://wa.me/${ENROLLMENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com o IEAM"
      onClick={() => trackEvent({ name: 'whatsapp_opened', origin: 'floating-button' })}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-40 flex items-center rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-3.5 text-white shadow-[0_10px_30px_-8px_rgba(20,42,34,0.45)] transition-[padding,box-shadow] duration-300 ease-[var(--ease-premium)] hover:pr-5 hover:shadow-[0_14px_36px_-8px_rgba(20,42,34,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7 shrink-0" />
      <span
        className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 ease-[var(--ease-premium)] ${
          hovered ? 'ml-2.5 max-w-[10rem] opacity-100' : 'ml-0 max-w-0 opacity-0'
        }`}
      >
        Fale conosco
      </span>
    </motion.a>
  );
}
