import { Landmark, Compass, Eye, HeartHandshake } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import historia1Jpg from '@/assets/gallery/img_7774.jpg';
import historia1Webp from '@/assets/gallery/img_7774.webp';
import historia2Jpg from '@/assets/gallery/img_7750.jpg';
import historia2Webp from '@/assets/gallery/img_7750.webp';

import missao1Jpg from '@/assets/gallery/img_1889.jpg';
import missao1Webp from '@/assets/gallery/img_1889.webp';
import missao2Jpg from '@/assets/gallery/img_6730.jpg';
import missao2Webp from '@/assets/gallery/img_6730.webp';
import missao3Jpg from '@/assets/gallery/img_6737.jpg';
import missao3Webp from '@/assets/gallery/img_6737.webp';

import visao1Jpg from '@/assets/gallery/img_7749.jpg';
import visao1Webp from '@/assets/gallery/img_7749.webp';

import valores1Jpg from '@/assets/gallery/img_1996.jpg';
import valores1Webp from '@/assets/gallery/img_1996.webp';
import valores2Jpg from '@/assets/gallery/img_1997.jpg';
import valores2Webp from '@/assets/gallery/img_1997.webp';
import valores3Jpg from '@/assets/gallery/img_7663.jpg';
import valores3Webp from '@/assets/gallery/img_7663.webp';
import valores4Jpg from '@/assets/gallery/img_7669.jpg';
import valores4Webp from '@/assets/gallery/img_7669.webp';

export type GalleryCategory = 'historia' | 'missao' | 'visao' | 'valores';

export interface GallerySlide {
  id: string;
  category: GalleryCategory;
  title: string;
  caption: string;
  /** Descrição objetiva da cena, para leitores de tela — separada do título/legenda de marketing. */
  alt: string;
  /** Fallback universal (JPEG). */
  image?: string;
  /** Formato preferencial, mais leve — usado via <picture><source type="image/webp">. */
  imageWebp?: string;
  gradient: string;
}

export const GALLERY_CATEGORY_META: Record<GalleryCategory, { label: string; icon: LucideIcon }> = {
  historia: { label: 'História', icon: Landmark },
  missao: { label: 'Missão', icon: Compass },
  visao: { label: 'Visão', icon: Eye },
  valores: { label: 'Valores', icon: HeartHandshake },
};

/**
 * Conteúdo da galeria institucional, centralizado aqui para fácil edição.
 * Fotos reais do dia a dia do IEAM — a associação com cada pilar
 * (História/Missão/Visão/Valores) é ilustrativa, não factual sobre o
 * conteúdo específico de cada foto.
 */
export const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: 'historia-1',
    category: 'historia',
    title: 'Orgulho de vestir o IEAM',
    caption: 'Alunos que carregam a identidade do instituto com orgulho, dentro e fora da sala de aula.',
    alt: 'Aluna sorridente apontando para o logotipo do IEAM em sua camiseta escolar, em frente a uma parede verde-clara.',
    image: historia1Jpg,
    imageWebp: historia1Webp,
    gradient: 'from-brand-800 via-brand-900 to-brand-950',
  },
  {
    id: 'historia-2',
    category: 'historia',
    title: 'Gerações de estudantes',
    caption: 'Diferentes turmas, o mesmo compromisso com a formação que atravessa o instituto há décadas.',
    alt: 'Três alunos do Ensino Médio uniformizados, lado a lado, em frente a uma parede verde-clara do IEAM.',
    image: historia2Jpg,
    imageWebp: historia2Webp,
    gradient: 'from-brand-700 via-brand-800 to-brand-950',
  },
  {
    id: 'missao-1',
    category: 'missao',
    title: 'Formação para o mundo real',
    caption: 'Estudantes do Ensino Médio em atividades que unem consciência social e vida escolar.',
    alt: 'Grupo de alunos do Ensino Médio reunido em sala de aula, ao lado de cartazes sobre temas sociais e ambientais.',
    image: missao1Jpg,
    imageWebp: missao1Webp,
    gradient: 'from-brand-600 via-brand-800 to-brand-950',
  },
  {
    id: 'missao-2',
    category: 'missao',
    title: 'Disciplina em prática',
    caption: 'Aulas de artes marciais reforçam foco, respeito e disciplina desde cedo.',
    alt: 'Instrutor de artes marciais orientando alunos durante aula de judô em um tatame ao ar livre.',
    image: missao2Jpg,
    imageWebp: missao2Webp,
    gradient: 'from-brand-700 via-brand-900 to-brand-950',
  },
  {
    id: 'missao-3',
    category: 'missao',
    title: 'Acompanhamento próximo',
    caption: 'Instrutores presentes em cada etapa do aprendizado, dentro e fora da sala.',
    alt: 'Instrutor auxiliando dois alunos pequenos durante atividade de artes marciais.',
    image: missao3Jpg,
    imageWebp: missao3Webp,
    gradient: 'from-brand-800 via-brand-700 to-brand-950',
  },
  {
    id: 'visao-1',
    category: 'visao',
    title: 'Prontos para o futuro',
    caption: 'Alunos preparados para seguir em frente com confiança em cada etapa da jornada.',
    alt: 'Aluno com mochila escolar sorrindo e apontando para cima, em área de recreação do IEAM.',
    image: visao1Jpg,
    imageWebp: visao1Webp,
    gradient: 'from-brand-900 via-brand-800 to-brand-950',
  },
  {
    id: 'valores-1',
    category: 'valores',
    title: 'Momentos de convivência',
    caption: 'Atividades recreativas que fortalecem vínculos e o cuidado com cada aluno.',
    alt: 'Grupo de alunas sorrindo dentro de uma piscina recreativa, segurando uma boia de espuma.',
    image: valores1Jpg,
    imageWebp: valores1Webp,
    gradient: 'from-brand-700 via-brand-800 to-brand-900',
  },
  {
    id: 'valores-2',
    category: 'valores',
    title: 'Cuidado em cada fase',
    caption: 'Espaços pensados para o bem-estar e a diversão dos alunos mais novos.',
    alt: 'Grupo de alunos sorrindo dentro de uma piscina recreativa, fazendo sinal de positivo com as mãos.',
    image: valores2Jpg,
    imageWebp: valores2Webp,
    gradient: 'from-brand-600 via-brand-900 to-brand-950',
  },
  {
    id: 'valores-3',
    category: 'valores',
    title: 'Educação Infantil acolhedora',
    caption: 'Ambientes lúdicos que tornam a descoberta e o aprendizado parte da brincadeira.',
    alt: 'Três alunas da Educação Infantil sorrindo dentro de uma piscina de bolinhas coloridas.',
    image: valores3Jpg,
    imageWebp: valores3Webp,
    gradient: 'from-brand-800 via-brand-900 to-brand-950',
  },
  {
    id: 'valores-4',
    category: 'valores',
    title: 'Aprender brincando',
    caption: 'A infância tem espaço garantido na rotina pedagógica do IEAM.',
    alt: 'Aluno da Educação Infantil sorrindo em cima de um brinquedo de parquinho no formato de animal.',
    image: valores4Jpg,
    imageWebp: valores4Webp,
    gradient: 'from-brand-700 via-brand-800 to-brand-950',
  },
];
