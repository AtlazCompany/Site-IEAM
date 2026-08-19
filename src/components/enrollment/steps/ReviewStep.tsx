import { useFormContext } from 'react-hook-form';
import { Pencil, GraduationCap, UserRound, ClipboardList, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { EDUCATION_LEVELS } from '@/constants/content';
import {
  SHIFT_OPTIONS,
  RELATIONSHIP_OPTIONS,
  HOW_FOUND_OPTIONS,
  BEST_TIME_OPTIONS,
  CONTACT_CHANNEL_OPTIONS,
} from '@/config/enrollmentOptions';
import type { EnrollmentFormValues, WizardStepId } from '@/types/enrollment';

function labelFor(options: { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label || '—';
}

interface ReviewStepProps {
  onEdit: (stepId: WizardStepId) => void;
}

interface Block {
  stepId: WizardStepId;
  title: string;
  icon: LucideIcon;
  rows: { label: string; value: string }[];
}

export function ReviewStep({ onEdit }: ReviewStepProps) {
  const { getValues } = useFormContext<EnrollmentFormValues>();
  const v = getValues();

  const levelTitle = EDUCATION_LEVELS.find((l) => l.id === v.levelId)?.title ?? '—';
  const whatsapp = v.sameAsPhone ? v.phone : v.whatsapp;

  const blocks: Block[] = [
    {
      stepId: 'student',
      title: 'Aluno',
      icon: GraduationCap,
      rows: [
        { label: 'Nível de ensino', value: levelTitle },
        { label: 'Nome', value: v.studentName || '—' },
        { label: 'Data de nascimento', value: v.birthDate || '—' },
        { label: 'Série / ano', value: v.grade || '—' },
        { label: 'Turno', value: v.shift ? labelFor(SHIFT_OPTIONS, v.shift) : 'Sem preferência' },
      ],
    },
    {
      stepId: 'guardian',
      title: 'Responsável',
      icon: UserRound,
      rows: [
        { label: 'Nome', value: v.guardianName || '—' },
        { label: 'Parentesco', value: v.relationship ? labelFor(RELATIONSHIP_OPTIONS, v.relationship) : '—' },
        { label: 'Telefone', value: v.phone || '—' },
        { label: 'WhatsApp', value: whatsapp || '—' },
        { label: 'E-mail', value: v.email || '—' },
      ],
    },
    {
      stepId: 'additional',
      title: 'Informações complementares',
      icon: ClipboardList,
      rows: [
        { label: 'Escola atual', value: v.currentSchool || 'Não informado' },
        { label: 'Bairro / cidade', value: v.neighborhood || 'Não informado' },
        { label: 'Como conheceu o IEAM', value: v.howFound ? labelFor(HOW_FOUND_OPTIONS, v.howFound) : 'Não informado' },
        { label: 'Melhor horário', value: v.bestTime ? labelFor(BEST_TIME_OPTIONS, v.bestTime) : 'Sem preferência' },
        { label: 'Observações', value: v.notes || 'Nenhuma' },
      ],
    },
    {
      stepId: 'channel',
      title: 'Canal preferencial',
      icon: MessageCircle,
      rows: [
        {
          label: 'Prefere ser contatado por',
          value: v.contactChannel
            ? labelFor(CONTACT_CHANNEL_OPTIONS as unknown as { value: string; label: string }[], v.contactChannel)
            : '—',
        },
      ],
    },
  ];

  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">Revise antes de enviar</h3>
      <p className="mt-2 text-sm text-ink-500">Confira os dados. Você pode editar qualquer bloco antes de continuar.</p>

      <div className="mt-6 space-y-4">
        {blocks.map((block) => (
          <div key={block.stepId} className="rounded-2xl border border-ink-100 bg-ink-50/60 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-[var(--shadow-soft)]">
                  <block.icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <h4 className="font-semibold text-ink-900">{block.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => onEdit(block.stepId)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-600 transition-colors hover:bg-brand-50"
              >
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </button>
            </div>
            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {block.rows.map((row) => (
                <div key={row.label} className="flex justify-between gap-3 border-t border-ink-100 py-1.5 text-sm sm:justify-start">
                  <dt className="text-ink-500">{row.label}</dt>
                  <dd className="text-right font-medium text-ink-900 sm:ml-auto">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
