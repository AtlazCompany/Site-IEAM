import { lazy } from 'react';
import { Seo } from '@/components/layout/Seo';
import { DeferredSection } from '@/components/ui';
// Import direto do arquivo, não do barrel `@/components/sections` — o
// barrel reexporta as 14 seções num só módulo, e isso é o que fazia o
// Rollup fundir tudo num único chunk mesmo com `lazy()` abaixo: bastava
// UM import estático do barrel (para pegar Hero/Differentials/etc.) para
// arrastar Methodology/Infrastructure/Stats/... junto, porque o bundler
// trata o barrel inteiro como uma unidade só. Importando cada seção do seu
// próprio arquivo, só as 4 realmente usadas de imediato entram no chunk
// eager da Home.
import { Hero } from '@/components/sections/Hero';
import { Differentials } from '@/components/sections/Differentials';
import { About } from '@/components/sections/About';
import { EducationLevels } from '@/components/sections/EducationLevels';

/**
 * Das seções abaixo em diante, `DeferredSection` só adiava a *montagem* — o
 * JS delas continuava saindo tudo junto no bundle principal, baixado e
 * interpretado de imediato mesmo para conteúdo lá embaixo. Isso também vira
 * código dividido de verdade, mesmo padrão já usado pelo MorphSlider em
 * InstitutionGallery.tsx.
 */
const Methodology = lazy(() => import('@/components/sections/Methodology').then((m) => ({ default: m.Methodology })));
const Infrastructure = lazy(() =>
  import('@/components/sections/Infrastructure').then((m) => ({ default: m.Infrastructure })),
);
const Stats = lazy(() => import('@/components/sections/Stats').then((m) => ({ default: m.Stats })));
const Location = lazy(() => import('@/components/sections/Location').then((m) => ({ default: m.Location })));
const News = lazy(() => import('@/components/sections/News').then((m) => ({ default: m.News })));
const Faq = lazy(() => import('@/components/sections/Faq').then((m) => ({ default: m.Faq })));
const NextSteps = lazy(() => import('@/components/sections/NextSteps').then((m) => ({ default: m.NextSteps })));
const CtaFinal = lazy(() => import('@/components/sections/CtaFinal').then((m) => ({ default: m.CtaFinal })));

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

        Ordem narrativa (aprovada): Apresentação → Diferenciais (prévia
        rápida) → Sobre o IEAM (História → Valores) → Níveis de Ensino →
        Metodologia → Estrutura → Selo de 30+ anos (prova de confiança
        depois da prova visual) → Localização → Notícias → FAQ → Comece
        por aqui → CTA Final. Ver mapa completo aprovado na conversa —
        cada seção carrega uma pergunta-guia própria (About.tsx,
        EducationLevels.tsx etc. documentam a sua).

        Depoimentos fica fora da Home por enquanto — os depoimentos atuais
        em constants/content.ts são exemplos, não pessoas reais; a seção
        volta assim que tivermos depoimentos confirmados pela instituição.
      */}
      <Hero />
      <Differentials />
      <About />
      <EducationLevels />
      <DeferredSection minHeight={1100}>
        <Methodology />
      </DeferredSection>
      <DeferredSection minHeight={1400}>
        <Infrastructure />
      </DeferredSection>
      <DeferredSection minHeight={520}>
        <Stats />
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
