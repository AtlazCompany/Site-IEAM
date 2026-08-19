import { Seo } from '@/components/layout/Seo';
import { DeferredSection } from '@/components/ui';
import {
  Hero,
  Differentials,
  Stats,
  About,
  EducationLevels,
  Methodology,
  Infrastructure,
  Location,
  News,
  Faq,
  NextSteps,
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
        observers/estilos de várias seções inteiras tudo de uma vez no
        carregamento inicial, que era a maior long task da página.

        Depoimentos fica fora da Home por enquanto — os depoimentos atuais
        em constants/content.ts são exemplos, não pessoas reais; a seção
        volta assim que tivermos depoimentos confirmados pela instituição.
      */}
      <Hero />
      <Differentials />
      <Stats />
      <About />
      <EducationLevels />
      <DeferredSection minHeight={1100}>
        <Methodology />
      </DeferredSection>
      <DeferredSection minHeight={1400}>
        <Infrastructure />
      </DeferredSection>
      <DeferredSection minHeight={750}>
        <Location />
      </DeferredSection>
      <DeferredSection minHeight={750}>
        <News />
      </DeferredSection>
      <DeferredSection minHeight={550}>
        <Faq />
      </DeferredSection>
      <DeferredSection minHeight={550}>
        <NextSteps />
      </DeferredSection>
      <DeferredSection minHeight={400}>
        <CtaFinal />
      </DeferredSection>
    </>
  );
}
