import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import type { EnrollmentFormValues } from '@/types/enrollment';
import { cn } from '@/utils/cn';

export function ConsentStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EnrollmentFormValues>();
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    checkboxRef.current?.focus();
  }, []);

  const { ref, ...consentField } = register('consent');

  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">Consentimento e envio</h3>
      <p className="mt-2 text-sm text-ink-500">Só uma confirmação antes de enviarmos seu interesse de matrícula.</p>

      <div className="mt-6 flex gap-4 rounded-2xl border border-ink-100 bg-ink-50 p-5">
        <ShieldCheck className="h-6 w-6 shrink-0 text-brand-600" strokeWidth={1.75} />
        <p className="text-sm leading-relaxed text-ink-600">
          Usamos seus dados apenas para retornar este contato sobre matrícula e atendimento escolar. Nada é
          compartilhado com terceiros para fins comerciais. Saiba mais na{' '}
          <Link to="/privacidade" target="_blank" rel="noopener" className="font-semibold text-brand-600 underline underline-offset-2">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>

      <label
        className={cn(
          'mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-5 transition-colors',
          errors.consent ? 'border-red-300 bg-red-50/50' : 'border-ink-100 hover:border-brand-200',
        )}
      >
        <input
          type="checkbox"
          ref={(el) => {
            ref(el);
            checkboxRef.current = el;
          }}
          {...consentField}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-500/30"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
        />
        <span className="text-sm leading-relaxed text-ink-700">
          Autorizo o Instituto Educacional Afonso Mafrense a utilizar estes dados para entrar em contato comigo
          sobre matrícula e atendimento escolar.
        </span>
      </label>
      {errors.consent && (
        <p id="consent-error" role="alert" className="mt-2 text-xs font-medium text-red-500">
          {errors.consent.message}
        </p>
      )}
    </div>
  );
}
