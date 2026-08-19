import { useState } from 'react';
import { CheckCircle2, MessageCircle, Copy, Check, AlertTriangle, Info, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { SITE } from '@/constants/site';

type Variant = 'api-success' | 'not-configured' | 'api-error';

interface EnrollmentSuccessProps {
  variant: Variant;
  errorMessage?: string;
  whatsappMessage: string;
  whatsappConfirmed: boolean;
  onOpenWhatsApp: () => void;
  onRetry?: () => void;
  onStartNew: () => void;
}

export function EnrollmentSuccess({
  variant,
  errorMessage,
  whatsappMessage,
  whatsappConfirmed,
  onOpenWhatsApp,
  onRetry,
  onStartNew,
}: EnrollmentSuccessProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível — sem problema, o botão de copiar apenas não confirma.
    }
  }

  return (
    <div className="flex flex-col items-center px-6 py-10 text-center sm:px-10">
      {variant === 'api-success' && (
        <>
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600"
          >
            <CheckCircle2 className="h-9 w-9" strokeWidth={1.75} />
          </motion.span>
          <h3 className="font-display mt-5 text-xl font-semibold text-ink-900">Interesse de matrícula enviado!</h3>
          <p className="mt-2 max-w-sm text-[15px] text-ink-500">
            Recebemos suas informações. Nossa secretaria entrará em contato pelo canal que você escolheu.
          </p>
        </>
      )}

      {variant === 'not-configured' && (
        <>
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-50 text-gold-600">
            <Info className="h-9 w-9" strokeWidth={1.75} />
          </span>
          <h3 className="font-display mt-5 text-xl font-semibold text-ink-900">Envio automático ainda não configurado</h3>
          <p className="mt-2 max-w-sm text-[15px] text-ink-500">
            O canal de envio direto pelo site está sendo preparado. Para não perder seu contato, fale com a gente
            agora mesmo pelo WhatsApp — sua mensagem já sai pronta.
          </p>
        </>
      )}

      {variant === 'api-error' && (
        <>
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            <AlertTriangle className="h-9 w-9" strokeWidth={1.75} />
          </span>
          <h3 className="font-display mt-5 text-xl font-semibold text-ink-900">Não conseguimos enviar agora</h3>
          <p className="mt-2 max-w-sm text-[15px] text-ink-500">
            {errorMessage ?? 'Houve uma falha de conexão.'} Você pode tentar novamente ou continuar pelo WhatsApp.
          </p>
        </>
      )}

      {variant !== 'api-success' && (
        <div className="mt-7 w-full max-w-sm space-y-3">
          <Button variant="primary" className="w-full" onClick={onOpenWhatsApp} icon={<MessageCircle className="h-4 w-4" />}>
            Continuar no WhatsApp
          </Button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-3 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-50"
          >
            {copied ? <Check className="h-4 w-4 text-brand-600" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Mensagem copiada' : 'Copiar mensagem'}
          </button>
          {variant === 'api-error' && onRetry && (
            <Button variant="outline-dark" className="w-full" onClick={onRetry} icon={<RotateCcw className="h-4 w-4" />}>
              Tentar enviar novamente
            </Button>
          )}
          {whatsappConfirmed && (
            <p className="rounded-xl bg-ink-50 px-4 py-3 text-left text-xs leading-relaxed text-ink-500">
              Abrimos o WhatsApp com sua mensagem pronta. <strong className="text-ink-700">Toque em enviar dentro do WhatsApp</strong> para
              concluir o contato — abrir o aplicativo ainda não significa que a mensagem foi enviada.
            </p>
          )}
          <p className="text-xs text-ink-400">
            Prefere falar diretamente? Ligue para{' '}
            <a href={`tel:${SITE.phone.replace(/\D/g, '')}`} className="font-medium text-brand-600">
              {SITE.phone}
            </a>
            .
          </p>
        </div>
      )}

      <Button variant="ghost" className="mt-6" onClick={onStartNew}>
        {variant === 'api-success' ? 'Enviar outro interesse de matrícula' : 'Começar de novo'}
      </Button>
    </div>
  );
}
