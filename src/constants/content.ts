import {
  GraduationCap,
  FlaskConical,
  Laptop,
  BookOpen,
  Dumbbell,
  Users,
  Sparkles,
  Baby,
  School,
  Target,
  Rocket,
  ClipboardCheck,
  LineChart,
  Presentation,
  Wifi,
  Brain,
} from 'lucide-react';
import type {
  Differential,
  EducationLevel,
  MethodologyStep,
  StatItem,
  Testimonial,
  NewsItem,
  FaqItem,
} from '@/types';

import newsMatriculasImg from '@/assets/news/foto noticia Matrículas abertas para o próximo ano letivo.png';
import newsMatriculasWebp from '@/assets/news/foto noticia Matrículas abertas para o próximo ano letivo.webp';
import newsTecnologiaImg from '@/assets/news/foto noticia Tecnologia e inovação no dia a dia das aulas.png';
import newsTecnologiaWebp from '@/assets/news/foto noticia Tecnologia e inovação no dia a dia das aulas.webp';
import newsNovidadesImg from '@/assets/news/foto noticia Acompanhe as novidades do IEAM.png';
import newsNovidadesWebp from '@/assets/news/foto noticia Acompanhe as novidades do IEAM.webp';

export const DIFFERENTIALS: Differential[] = [
  {
    icon: Users,
    title: 'Professores qualificados',
    description: 'Corpo docente com formação de excelência e atualização pedagógica contínua.',
  },
  {
    icon: Laptop,
    title: 'Ensino moderno',
    description: 'Metodologias ativas integradas à tecnologia em todas as etapas de ensino.',
  },
  {
    icon: Target,
    title: 'Preparação para o seu futuro',
    description: 'Programa intensivo de resolução, simulados e acompanhamento individualizado em todos os segmentos.',
  },
  {
    icon: FlaskConical,
    title: 'Laboratórios completos',
    description: 'Espaços equipados para ciências, informática e experimentação prática.',
  },
  {
    icon: Wifi,
    title: 'Tecnologia em sala',
    description: 'Lousas atualizadas, plataformas próprias e conectividade em todo o campus.',
  },
  {
    icon: Dumbbell,
    title: 'Esportes',
    description: 'Estrutura esportiva completa com equipes competitivas em diversas modalidades.',
  },
  {
    icon: BookOpen,
    title: 'Biblioteca',
    description: 'Acervo físico bem estruturado que incentiva a leitura e a pesquisa autônoma.',
  },
  {
    icon: Sparkles,
    title: 'Atividades extracurriculares',
    description: 'Arte, música e clubes de interesse para um desenvolvimento integral.',
  },
  {
    icon: Brain,
    title: 'Apoio psicológico',
    description: 'Psicóloga escolar dedicada ao acompanhamento emocional e ao bem-estar dos alunos dentro do instituto.',
  },
];

export const EDUCATION_LEVELS: EducationLevel[] = [
  {
    id: 'infantil',
    title: 'Educação Infantil',
    ageRange: '2 a 5 anos',
    description: 'Um ambiente acolhedor que estimula a descoberta, a autonomia e o brincar como forma de aprender.',
    highlights: ['Estímulo sensorial e motor', 'Alfabetização lúdica', 'Espaços seguros e acolhedores'],
    icon: Baby,
  },
  {
    id: 'fundamental',
    title: 'Ensino Fundamental',
    ageRange: '6 a 14 anos',
    description: 'Base sólida em todas as áreas do conhecimento, com foco em raciocínio, escrita e cidadania.',
    highlights: ['Metodologia ativa', 'BNCC e BNCC Computação', 'Projetos interdisciplinares', 'Acompanhamento individual'],
    icon: School,
  },
  {
    id: 'medio',
    title: 'Ensino Médio',
    ageRange: '15 a 17 anos',
    description: 'Preparação acadêmica de alto desempenho com foco em vestibulares e no Enem.',
    highlights: ['Trilhas de aprofundamento', 'Simulados frequentes', 'Orientação vocacional'],
    icon: GraduationCap,
  },
];

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    step: '01',
    title: 'Aprendizagem ativa',
    description: 'O aluno é protagonista: discute, questiona e constrói conhecimento de forma prática.',
    icon: Rocket,
  },
  {
    step: '02',
    title: 'Projetos interdisciplinares',
    description: 'Disciplinas conectadas em projetos reais que dão sentido ao que é aprendido.',
    icon: Presentation,
  },
  {
    step: '03',
    title: 'Tecnologia integrada',
    description: 'Plataformas digitais e ferramentas próprias apoiam o ensino dentro e fora da sala.',
    icon: Laptop,
  },
  {
    step: '04',
    title: 'Acompanhamento próximo',
    description: 'Coordenação pedagógica presente, com feedback constante para alunos e famílias.',
    icon: ClipboardCheck,
  },
  {
    step: '05',
    title: 'Avaliação contínua',
    description: 'Simulados e indicadores de desempenho orientam decisões pedagógicas em tempo real.',
    icon: LineChart,
  },
];

/**
 * Apenas fatos confirmados entram aqui. Não adicionar números de alunos,
 * aprovação, professores ou unidades sem confirmação da instituição.
 */
export const CONFIRMED_TENURE: StatItem = {
  icon: GraduationCap,
  value: 30,
  suffix: '+',
  label: 'anos de tradição em Teresina',
};

export const TRUST_POINTS = [
  { icon: School, label: 'Do Infantil ao Ensino Médio' },
  { icon: Laptop, label: 'Metodologia própria' },
  { icon: Users, label: 'Acompanhamento próximo às famílias' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marina Souza',
    role: 'Mãe de aluno do Fundamental',
    quote:
      'O acompanhamento individual fez toda a diferença. Meu filho ganhou autonomia e amor pelos estudos desde os primeiros meses.',
    initials: 'MS',
  },
  {
    id: 't2',
    name: 'Rafael Almeida',
    role: 'Ex-aluno do Ensino Médio',
    quote:
      'O acompanhamento próximo dos professores no Ensino Médio me deu a base e a disciplina que precisava para chegar bem preparado ao vestibular.',
    initials: 'RA',
  },
  {
    id: 't3',
    name: 'Camila Ferreira',
    role: 'Aluna do Ensino Médio',
    quote:
      'As aulas são dinâmicas e os professores realmente se importam com o nosso aprendizado. Me sinto preparada para o futuro.',
    initials: 'CF',
  },
  {
    id: 't4',
    name: 'Eduardo Lima',
    role: 'Pai de aluna da Educação Infantil',
    quote:
      'A estrutura e o acolhimento impressionam. Minha filha adora ir à escola todos os dias — isso não tem preço.',
    initials: 'EL',
  },
];

/**
 * Conteúdo de exemplo — substituir pelas notícias reais do IEAM antes de publicar.
 * Nenhum dado, número ou evento aqui representa fato confirmado pela instituição.
 */
export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Matrículas abertas para o próximo ano letivo',
    excerpt:
      'Famílias já podem iniciar o processo de matrícula em todos os níveis de ensino oferecidos pelo IEAM.',
    date: 'Em breve',
    category: 'Matrículas',
    image: newsMatriculasImg,
    imageWebp: newsMatriculasWebp,
    imageAlt: 'Divulgação das matrículas abertas do IEAM para 2027',
  },
  {
    id: 'n2',
    title: 'Tecnologia e inovação no dia a dia das aulas',
    excerpt:
      'Conheça como o IEAM integra ferramentas digitais à rotina pedagógica, do Infantil ao Ensino Médio.',
    date: 'Em breve',
    category: 'Ensino',
    image: newsTecnologiaImg,
    imageWebp: newsTecnologiaWebp,
    imageAlt: 'Divulgação da Feira Tecnológica do IEAM',
  },
  {
    id: 'n3',
    title: 'Acompanhe as novidades do IEAM',
    excerpt:
      'Este espaço será atualizado com notícias, eventos e conquistas reais da comunidade escolar.',
    date: 'Em breve',
    category: 'Institucional',
    image: newsNovidadesImg,
    imageWebp: newsNovidadesWebp,
    imageAlt: 'Divulgação institucional do IEAM sobre educação que transforma o futuro',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Como faço a matrícula do meu filho no IEAM?',
    answer:
      'A matrícula pode ser iniciada diretamente pelo nosso site ou presencialmente na secretaria. Nossa equipe orienta cada etapa, desde a documentação até a definição da turma.',
  },
  {
    question: 'Quais níveis de ensino o IEAM oferece?',
    answer:
      'Oferecemos Educação Infantil, Ensino Fundamental e Ensino Médio, com metodologia própria em cada etapa.',
  },
  {
    question: 'O instituto oferece bolsas ou descontos?',
    answer:
      'Sim. Trabalhamos com condições especiais para matrículas antecipadas, para famílias com parentes matriculados que chegaram até nós por indicação, e com um programa dedicado a filhos de ex-alunos.',
  },
  {
    question: 'Como é o acompanhamento pedagógico das famílias?',
    answer:
      'O responsável comparece presencialmente ao instituto para assinar os boletins mensais do aluno e, ao final do ano letivo, recebe o boletim anual completo com todo o histórico de desempenho.',
  },
  {
    question: 'Onde ficam os meios de contato?',
    answer:
      'Todos os nossos canais — telefone, e-mail, endereço e redes sociais — estão reunidos no rodapé do site. Se preferir algo mais rápido, é só mandar uma mensagem pelo botão flutuante do WhatsApp, disponível em qualquer página.',
  },
];
