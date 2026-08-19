import { Seo } from '@/components/layout/Seo';
import { DeferredSection } from '@/components/ui';
import {
  Hero,
  Differentials,
  About,
  EducationLevels,
  Methodology,
  Infrastructure,
  Stats,
  Testimonials,
  News,
  Faq,
  CtaFinal,
} from '@/components/sections';

export default function Home() {
  return (
    <>
      <Seo
        title="Educação de excelência há mais de 30 anos"
        description="O Instituto Educacional Afonso Mafrense (IEAM) oferece Educação Infantil, Ensino Fundamental e Ensino Médio com tradição, tecnologia e acompanhamento pedagógico próximo."
        path="/"
      />
      {/*
        As primeiras seções montam de imediato (o usuário as vê no primeiro
        scroll). Da Metodologia em diante, a montagem é adiada até a seção
        se aproximar da viewport — evita que Framer Motion registre
        observers/estilos de 7 seções inteiras (várias com múltiplas
        instâncias de Reveal/StaggerGroup) tudo de uma vez no carregamento
        inicial, que era a maior long task da página.
      */}
      <Hero />
      <Differentials />
      <About />
      <EducationLevels />
      <DeferredSection minHeight={1100}>
        <Methodology />
      </DeferredSection>
      <DeferredSection minHeight={650}>
        <Infrastructure />
      </DeferredSection>
      <DeferredSection minHeight={450}>
        <Stats />
      </DeferredSection>
      <DeferredSection minHeight={500}>
        <Testimonials />
      </DeferredSection>
      <DeferredSection minHeight={750}>
        <News />
      </DeferredSection>
      <DeferredSection minHeight={550}>
        <Faq />
      </DeferredSection>
      <DeferredSection minHeight={400}>
        <CtaFinal />
      </DeferredSection>
    </>
  );
}
