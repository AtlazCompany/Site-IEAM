import { ArrowLeft, Compass } from 'lucide-react';
import { Seo } from '@/components/layout/Seo';
import { Container, Button, Reveal } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <Seo title="Página não encontrada" description="A página que você procura não existe ou foi movida." noindex />
      <section className="flex min-h-[80vh] items-center bg-brand-950 pt-24 text-white">
        <Container className="text-center">
          <Reveal direction="scale">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <Compass className="h-8 w-8 text-gold-300" />
            </span>
            <p className="mt-8 text-sm label-mono text-gold-300">Erro 404</p>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Página não encontrada</h1>
            <p className="mx-auto mt-4 max-w-md text-lg text-white/70">
              O conteúdo que você procura pode ter sido movido ou não existe mais.
            </p>
            <Button href="/" variant="primary" size="lg" className="mt-8" icon={<ArrowLeft className="h-5 w-5" />} iconPosition="left">
              Voltar para o início
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
