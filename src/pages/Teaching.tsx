import { Seo } from '@/components/layout/Seo';
import { PageHero, EducationLevels, Methodology, CtaFinal } from '@/components/sections';

export default function Teaching() {
  return (
    <>
      <Seo
        title="Ensino"
        description="Conheça os níveis de ensino do IEAM — Educação Infantil, Ensino Fundamental e Ensino Médio — e a metodologia que orienta cada etapa."
        path="/ensino"
      />
      <PageHero
        eyebrow="Ensino"
        title="Uma proposta pedagógica para cada etapa da vida"
        description="Do primeiro contato com a escola à preparação para o vestibular, cada fase conta com metodologia própria e acompanhamento individualizado."
        breadcrumb="Ensino"
      />
      <EducationLevels />
      <Methodology />
      <CtaFinal />
    </>
  );
}
