import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const fieldClasses =
  'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10';

const errorFieldClasses = 'border-red-300 focus:border-red-400 focus:ring-red-500/10';

interface WrapperProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
  error?: string;
  hint?: string;
  errorId: string;
}

function FieldWrapper({ label, htmlFor, required, className, children, error, hint, errorId }: WrapperProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink-700">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-ink-400">{hint}</p>}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            id={errorId}
            role="alert"
            className="text-xs font-medium text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  hint?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, required, className, error, hint, ...props }, ref) => {
    const errorId = useId();
    return (
      <FieldWrapper label={label} htmlFor={id} required={required} className={className} error={error} hint={hint} errorId={errorId}>
        <input
          ref={ref}
          id={id}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(fieldClasses, error && errorFieldClasses)}
          {...props}
        />
      </FieldWrapper>
    );
  },
);
InputField.displayName = 'InputField';

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
  hint?: string;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, id, required, className, error, hint, ...props }, ref) => {
    const errorId = useId();
    return (
      <FieldWrapper label={label} htmlFor={id} required={required} className={className} error={error} hint={hint} errorId={errorId}>
        <textarea
          ref={ref}
          id={id}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(fieldClasses, 'resize-none', error && errorFieldClasses)}
          {...props}
        />
      </FieldWrapper>
    );
  },
);
TextareaField.displayName = 'TextareaField';

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  children: ReactNode;
  error?: string;
  hint?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, id, required, className, children, error, hint, ...props }, ref) => {
    const errorId = useId();
    return (
      <FieldWrapper label={label} htmlFor={id} required={required} className={className} error={error} hint={hint} errorId={errorId}>
        <select
          ref={ref}
          id={id}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(fieldClasses, error && errorFieldClasses)}
          {...props}
        >
          {children}
        </select>
      </FieldWrapper>
    );
  },
);
SelectField.displayName = 'SelectField';
