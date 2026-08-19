import { Seo } from '@/components/layout/Seo';
import { PageHero } from '@/components/sections';
import { Section } from '@/components/ui';
import { SITE } from '@/constants/site';

const SECTIONS = [
  {
    title: '1. Dados coletados',
    text: 'Coletamos dados pessoais fornecidos voluntariamente em formulários do site, como nome, e-mail, telefone e informações relacionadas à matrícula, com a finalidade exclusiva de atendimento e comunicação institucional.',
  },
  {
    title: '2. Finalidade do tratamento',
    text: 'As informações são utilizadas para responder solicitações de contato, processar pré-matrículas, enviar comunicados institucionais e melhorar a experiência de navegação no site.',
  },
  {
    title: '3. Compartilhamento de dados',
    text: 'O IEAM não vende nem compartilha dados pessoais com terceiros para fins comerciais. Dados podem ser compartilhados apenas com prestadores de serviço estritamente necessários à operação institucional.',
  },
  {
    title: '4. Direitos do titular',
    text: 'Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você pode solicitar a qualquer momento acesso, correção, portabilidade ou exclusão dos seus dados pessoais, entrando em contato pelos canais oficiais do instituto.',
  },
  {
    title: '5. Segurança da informação',
    text: 'Adotamos medidas técnicas e organizacionais para proteger os dados pessoais contra acessos não autorizados, perda ou uso indevido.',
  },
  {
    title: '6. Contato do encarregado de dados',
    text: `Dúvidas sobre esta política podem ser encaminhadas para ${SITE.email}.`,
  },
];

export default function Privacy() {
  return (
    <>
      <Seo
        title="Política de Privacidade"
        description="Política de Privacidade e proteção de dados pessoais do Instituto Educacional Afonso Mafrense, em conformidade com a LGPD."
        path="/privacidade"
      />
      <PageHero
        eyebrow="LGPD"
        title="Política de Privacidade"
        description="Transparência sobre como coletamos, usamos e protegemos os dados pessoais de alunos, famílias e visitantes do nosso site."
        breadcrumb="Privacidade"
      />

      <Section background="white">
        <div className="mx-auto max-w-3xl space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-ink-900">{section.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{section.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
