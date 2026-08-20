import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, AlertTriangle, CalendarCheck } from 'lucide-react';
import { Seo } from '@/components/layout/Seo';
import { PageHero } from '@/components/sections';
import { Section, Container, Button, InputField, TextareaField, Reveal } from '@/components/ui';
import { SITE } from '@/constants/site';
import { submitContactForm } from '@/services/leadService';
import { trackEvent } from '@/services/analytics';
import { useScheduleVisitModal } from '@/hooks/useScheduleVisitModal';
import type { ContactPayload } from '@/types/forms';

const CONTACT_ITEMS = [
  { icon: MapPin, label: 'Endereço', value: SITE.address },
  { icon: Phone, label: 'Telefone', value: SITE.phone, href: `tel:${SITE.phone.replace(/\D/g, '')}` },
  { icon: Mail, label: 'E-mail', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Fale conosco agora', href: `https://wa.me/${SITE.whatsapp}` },
];

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const { openScheduleVisit } = useScheduleVisitModal();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: ContactPayload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      subject: String(data.get('subject') ?? ''),
      message: String(data.get('message') ?? ''),
    };
    const result = await submitContactForm(payload);
    setFeedback(result.message);
    if (result.success) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
    }
  }

  return (
    <>
      <Seo
        title="Contato"
        description="Entre em contato com o Instituto Educacional Afonso Mafrense. Endereço, telefone, WhatsApp e formulário de atendimento."
        path="/contato"
      />
      <PageHero
        eyebrow="Contato"
        title="Vamos conversar sobre o futuro do seu filho"
        description="Nossa equipe está pronta para tirar dúvidas sobre matrículas, metodologia e estrutura do IEAM."
        breadcrumb="Contato"
      />

      <Section background="white" className="pt-10 pb-0 sm:pt-12 sm:pb-0 lg:pt-14 lg:pb-0">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-brand-100 bg-brand-50 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-lg font-semibold text-ink-900">Prefere conhecer a estrutura pessoalmente?</p>
            <p className="mt-1 text-sm text-ink-500">Agende uma visita guiada e tire suas dúvidas presencialmente com a nossa equipe.</p>
          </div>
          <Button
            type="button"
            variant="secondary"
            icon={<CalendarCheck className="h-4 w-4" />}
            onClick={() => openScheduleVisit({ origin: 'pagina-contato' })}
            className="shrink-0"
          >
            Agendar visita
          </Button>
        </div>
      </Section>

      <Section background="white">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal direction="right">
            <div className="space-y-5">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <div className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-6 shadow-[var(--shadow-soft)] transition-colors hover:border-brand-100">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs label-mono text-ink-400">{label}</p>
                      <p className="mt-1 font-semibold text-ink-900">{value}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent(
                        href.includes('wa.me')
                          ? { name: 'whatsapp_opened', origin: 'contato' }
                          : { name: 'contact_button_clicked', origin: `contato-${label.toLowerCase()}` },
                      )
                    }
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>
          </Reveal>

          <Reveal direction="left">
            <div className="rounded-3xl border border-ink-100 bg-ink-50 p-6 sm:p-10">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="h-14 w-14 text-brand-600" strokeWidth={1.5} />
                  <h3 className="mt-5 text-xl font-bold text-ink-900">Mensagem enviada!</h3>
                  <p className="mt-2 max-w-sm text-[15px] text-ink-500">{feedback}</p>
                  <Button variant="secondary" className="mt-6" onClick={() => setStatus('idle')}>
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : status === 'error' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <AlertTriangle className="h-14 w-14 text-red-500" strokeWidth={1.5} />
                  <h3 className="mt-5 text-xl font-bold text-ink-900">Não conseguimos enviar agora</h3>
                  <p className="mt-2 max-w-sm text-[15px] text-ink-500">{feedback}</p>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <Button variant="secondary" onClick={() => setStatus('idle')}>
                      Tentar novamente
                    </Button>
                    <Button
                      variant="outline-dark"
                      href={`https://wa.me/${SITE.whatsapp}`}
                      external
                      icon={<MessageCircle className="h-4 w-4" />}
                    >
                      Continuar no WhatsApp
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <InputField label="Nome completo" id="name" name="name" placeholder="Seu nome" required />
                  <InputField label="E-mail" id="email" name="email" type="email" placeholder="voce@email.com" required />
                  <InputField label="Telefone" id="phone" name="phone" type="tel" placeholder="(00) 00000-0000" required />
                  <InputField label="Assunto" id="subject" name="subject" placeholder="Sobre o que deseja falar?" required />
                  <TextareaField
                    label="Mensagem"
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Escreva sua mensagem..."
                    required
                    className="sm:col-span-2"
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    className="sm:col-span-2"
                    disabled={status === 'loading'}
                    icon={<Send className="h-4 w-4" />}
                  >
                    {status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="border-t border-ink-100">
        <Container className="py-0">
          <div className="aspect-[21/9] w-full overflow-hidden rounded-none">
            <iframe
              title="Localização do IEAM no mapa"
              src={`https://maps.google.com/maps?q=${SITE.mapsEmbedQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
