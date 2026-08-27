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

import fachadaJpg from '@/assets/gallery/instituto-fachada.jpg';
import fachadaWebp from '@/assets/gallery/instituto-fachada.webp';
import alunasMint1Jpg from '@/assets/gallery/alunas-mint-1.jpg';
import alunasMint1Webp from '@/assets/gallery/alunas-mint-1.webp';
import alunasMint2Jpg from '@/assets/gallery/alunas-mint-2.jpg';
import alunasMint2Webp from '@/assets/gallery/alunas-mint-2.webp';

import bibliotecaTurmaJpg from '@/assets/gallery/convivencia-biblioteca-turma.jpg';
import bibliotecaTurmaWebp from '@/assets/gallery/convivencia-biblioteca-turma.webp';
import bibliotecaAlunaJpg from '@/assets/gallery/convivencia-biblioteca-aluna.jpg';
import bibliotecaAlunaWebp from '@/assets/gallery/convivencia-biblioteca-aluna.webp';

import alunoMedalhaJpg from '@/assets/gallery/aluno-medalha.jpg';
import alunoMedalhaWebp from '@/assets/gallery/aluno-medalha.webp';

import pingPongJpg from '@/assets/gallery/convivencia-ping-pong.jpg';
import pingPongWebp from '@/assets/gallery/convivencia-ping-pong.webp';
import amarelinhaJpg from '@/assets/gallery/convivencia-amarelinha-piscina.jpg';
import amarelinhaWebp from '@/assets/gallery/convivencia-amarelinha-piscina.webp';
import parquinhoJpg from '@/assets/gallery/infra-parquinho.jpg';
import parquinhoWebp from '@/assets/gallery/infra-parquinho.webp';

import labMicroscopio1Jpg from '@/assets/gallery/lab-microscopio-1.jpg';
import labMicroscopio1Webp from '@/assets/gallery/lab-microscopio-1.webp';
import labMicroscopio2Jpg from '@/assets/gallery/lab-microscopio-2.jpg';
import labMicroscopio2Webp from '@/assets/gallery/lab-microscopio-2.webp';
import labQuimicaExperimentoJpg from '@/assets/gallery/lab-quimica-experimento.jpg';
import labQuimicaExperimentoWebp from '@/assets/gallery/lab-quimica-experimento.webp';
import labQuimicaAlunaJpg from '@/assets/gallery/lab-quimica-aluna.jpg';
import labQuimicaAlunaWebp from '@/assets/gallery/lab-quimica-aluna.webp';
import elevadorAcessibilidadeJpg from '@/assets/gallery/infra-elevador-acessibilidade.jpg';
import elevadorAcessibilidadeWebp from '@/assets/gallery/infra-elevador-acessibilidade.webp';
import cantinaJpg from '@/assets/gallery/convivencia-cantina.jpg';
import cantinaWebp from '@/assets/gallery/convivencia-cantina.webp';
import bibliotecaAlunoLeituraJpg from '@/assets/gallery/biblioteca-aluno-leitura.jpg';
import bibliotecaAlunoLeituraWebp from '@/assets/gallery/biblioteca-aluno-leitura.webp';
import bibliotecaAlunaLeitura1Jpg from '@/assets/gallery/biblioteca-aluna-leitura-1.jpg';
import bibliotecaAlunaLeitura1Webp from '@/assets/gallery/biblioteca-aluna-leitura-1.webp';
import bibliotecaAlunaLeitura2Jpg from '@/assets/gallery/biblioteca-aluna-leitura-2.jpg';
import bibliotecaAlunaLeitura2Webp from '@/assets/gallery/biblioteca-aluna-leitura-2.webp';
import bibliotecaAlunoSentadoJpg from '@/assets/gallery/biblioteca-aluno-sentado.jpg';
import bibliotecaAlunoSentadoWebp from '@/assets/gallery/biblioteca-aluno-sentado.webp';

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
  {
    id: 'historia-3',
    category: 'historia',
    title: 'Nossa fachada, seu novo endereço',
    caption: 'A entrada do IEAM, no coração de Teresina — o começo de cada dia letivo.',
    alt: 'Fachada do Instituto Educacional Afonso Mafrense, com letreiro verde e telefones de contato, vista da calçada.',
    image: fachadaJpg,
    imageWebp: fachadaWebp,
    gradient: 'from-brand-800 via-brand-900 to-brand-950',
  },
  {
    id: 'historia-4',
    category: 'historia',
    title: 'Amizades que ficam',
    caption: 'Colegas de turma, unidas pelo mesmo uniforme e pela mesma trajetória.',
    alt: 'Duas alunas sorridentes, de camiseta verde-água do IEAM, posando lado a lado em frente a um mural pintado.',
    image: alunasMint1Jpg,
    imageWebp: alunasMint1Webp,
    gradient: 'from-brand-700 via-brand-900 to-brand-950',
  },
  {
    id: 'historia-5',
    category: 'historia',
    title: 'Momentos entre aulas',
    caption: 'Pausas que também fazem parte da experiência escolar no IEAM.',
    alt: 'Duas alunas sorridentes sentadas em poltronas coloridas, com uma piscina ao fundo.',
    image: alunasMint2Jpg,
    imageWebp: alunasMint2Webp,
    gradient: 'from-brand-600 via-brand-800 to-brand-950',
  },
  {
    id: 'missao-4',
    category: 'missao',
    title: 'Estudo em grupo',
    caption: 'Alunos do Ensino Médio dividem dúvidas e aprendizado na biblioteca do instituto.',
    alt: 'Grupo de seis alunos do Ensino Médio estudando juntos ao redor de uma mesa na biblioteca, cercados de estantes de livros.',
    image: bibliotecaTurmaJpg,
    imageWebp: bibliotecaTurmaWebp,
    gradient: 'from-brand-800 via-brand-700 to-brand-950',
  },
  {
    id: 'missao-5',
    category: 'missao',
    title: 'Concentração que rende',
    caption: 'Cada aluno no seu ritmo, com todo o acervo da biblioteca à disposição.',
    alt: 'Aluna de óculos concentrada lendo um caderno de atividades na biblioteca do IEAM.',
    image: bibliotecaAlunaJpg,
    imageWebp: bibliotecaAlunaWebp,
    gradient: 'from-brand-600 via-brand-800 to-brand-950',
  },
  {
    id: 'visao-2',
    category: 'visao',
    title: 'Conquistas que orgulham',
    caption: 'Resultados que mostram do que a dedicação dos nossos alunos é capaz.',
    alt: 'Aluno sorridente exibindo uma medalha de ouro, em frente a uma parede de azulejos verdes e brancos.',
    image: alunoMedalhaJpg,
    imageWebp: alunoMedalhaWebp,
    gradient: 'from-brand-900 via-brand-800 to-brand-950',
  },
  {
    id: 'visao-3',
    category: 'visao',
    title: 'Prontas para o que vier',
    caption: 'Confiança que se constrói, ano após ano, dentro do IEAM.',
    alt: 'Duas alunas sorridentes, de camiseta verde-água do IEAM, posando lado a lado em frente a um mural pintado.',
    image: alunasMint1Jpg,
    imageWebp: alunasMint1Webp,
    gradient: 'from-brand-700 via-brand-900 to-brand-950',
  },
  {
    id: 'valores-5',
    category: 'valores',
    title: 'Espaço de convivência',
    caption: 'Ping-pong, conversa e descontração — o intervalo também educa.',
    alt: 'Alunos jogando ping-pong e conversando em mesas ao ar livre, na área de convivência do IEAM.',
    image: pingPongJpg,
    imageWebp: pingPongWebp,
    gradient: 'from-brand-700 via-brand-800 to-brand-900',
  },
  {
    id: 'valores-6',
    category: 'valores',
    title: 'Brincar também é aprender',
    caption: 'Amarelinha no chão, piscina ao fundo — espaço pensado para o lazer dos alunos.',
    alt: 'Área de convivência com jogo de amarelinha pintado no chão, cadeiras coloridas e piscina ao fundo.',
    image: amarelinhaJpg,
    imageWebp: amarelinhaWebp,
    gradient: 'from-brand-600 via-brand-900 to-brand-950',
  },
  {
    id: 'valores-7',
    category: 'valores',
    title: 'Diversão para os pequenos',
    caption: 'Escorregadores, piscina de bolinhas e cama elástica para a Educação Infantil aproveitar o recreio.',
    alt: 'Parquinho colorido com escorregadores, piscina de bolinhas e cama elástica, em área coberta da Educação Infantil.',
    image: parquinhoJpg,
    imageWebp: parquinhoWebp,
    gradient: 'from-brand-800 via-brand-900 to-brand-950',
  },
  {
    id: 'missao-6',
    category: 'missao',
    title: 'Ciência de perto',
    caption: 'Aulas de laboratório aproximam os alunos do Ensino Médio da prática científica.',
    alt: 'Dois alunos do Ensino Médio observando uma lâmina em um microscópio no laboratório do IEAM.',
    image: labMicroscopio1Jpg,
    imageWebp: labMicroscopio1Webp,
    gradient: 'from-brand-700 via-brand-800 to-brand-950',
  },
  {
    id: 'missao-7',
    category: 'missao',
    title: 'Foco na experimentação',
    caption: 'Cada aluno tem a chance de manusear os próprios equipamentos de laboratório.',
    alt: 'Aluno concentrado observando através de um microscópio no laboratório do IEAM.',
    image: labMicroscopio2Jpg,
    imageWebp: labMicroscopio2Webp,
    gradient: 'from-brand-800 via-brand-700 to-brand-950',
  },
  {
    id: 'missao-8',
    category: 'missao',
    title: 'Química na prática',
    caption: 'Experimentos guiados transformam a teoria da sala de aula em aprendizado concreto.',
    alt: 'Duas alunas realizando um experimento de química, transferindo líquido entre frascos no laboratório do IEAM.',
    image: labQuimicaExperimentoJpg,
    imageWebp: labQuimicaExperimentoWebp,
    gradient: 'from-brand-600 via-brand-800 to-brand-950',
  },
  {
    id: 'missao-9',
    category: 'missao',
    title: 'Orgulho de experimentar',
    caption: 'O laboratório de química é espaço de descoberta desde os primeiros experimentos.',
    alt: 'Aluna sorridente segurando dois frascos de laboratório, um deles com substância azul, no laboratório de química do IEAM.',
    image: labQuimicaAlunaJpg,
    imageWebp: labQuimicaAlunaWebp,
    gradient: 'from-brand-900 via-brand-800 to-brand-950',
  },
  {
    id: 'missao-10',
    category: 'missao',
    title: 'Leitura que forma',
    caption: 'Momentos individuais de leitura fazem parte da rotina na biblioteca do IEAM.',
    alt: 'Aluno lendo um livro apoiado em uma estante na biblioteca do IEAM.',
    image: bibliotecaAlunoLeituraJpg,
    imageWebp: bibliotecaAlunoLeituraWebp,
    gradient: 'from-brand-700 via-brand-900 to-brand-950',
  },
  {
    id: 'missao-11',
    category: 'missao',
    title: 'Descobrindo nas páginas',
    caption: 'O acervo da biblioteca convida os alunos a explorar novos assuntos.',
    alt: 'Aluna sorridente lendo um livro apoiada em uma estante na biblioteca do IEAM.',
    image: bibliotecaAlunaLeitura1Jpg,
    imageWebp: bibliotecaAlunaLeitura1Webp,
    gradient: 'from-brand-800 via-brand-900 to-brand-950',
  },
  {
    id: 'missao-12',
    category: 'missao',
    title: 'Gosto pela leitura',
    caption: 'Incentivar a leitura desde cedo é parte da formação pedagógica do IEAM.',
    alt: 'Aluna sorridente lendo um livro apoiada em uma estante na biblioteca do IEAM.',
    image: bibliotecaAlunaLeitura2Jpg,
    imageWebp: bibliotecaAlunaLeitura2Webp,
    gradient: 'from-brand-600 via-brand-900 to-brand-950',
  },
  {
    id: 'missao-13',
    category: 'missao',
    title: 'Tempo de estudo',
    caption: 'Um espaço tranquilo para revisar conteúdos e se aprofundar nas disciplinas.',
    alt: 'Aluno sentado lendo um livro na biblioteca do IEAM.',
    image: bibliotecaAlunoSentadoJpg,
    imageWebp: bibliotecaAlunoSentadoWebp,
    gradient: 'from-brand-700 via-brand-800 to-brand-900',
  },
  {
    id: 'valores-8',
    category: 'valores',
    title: 'Acessibilidade em primeiro lugar',
    caption: 'Elevador próprio garante que toda a estrutura do instituto seja acessível a todos.',
    alt: 'Porta do elevador de acessibilidade do IEAM, sinalizada com o símbolo internacional de acesso para cadeirantes.',
    image: elevadorAcessibilidadeJpg,
    imageWebp: elevadorAcessibilidadeWebp,
    gradient: 'from-brand-800 via-brand-900 to-brand-950',
  },
  {
    id: 'valores-9',
    category: 'valores',
    title: 'Hora do lanche',
    caption: 'A cantina é ponto de encontro e descontração entre uma aula e outra.',
    alt: 'Alunos reunidos na fila da cantina do IEAM, sob o letreiro "A Hora do Lanche".',
    image: cantinaJpg,
    imageWebp: cantinaWebp,
    gradient: 'from-brand-600 via-brand-800 to-brand-950',
  },
];
