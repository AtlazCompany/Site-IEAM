import { ArrowLeft, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { Seo } from '@/components/layout/Seo';
import { Container, Button, Reveal, AnimatedEquation, HandwrittenNote } from '@/components/ui';
import { SKETCH_PATHS } from '@/components/ui/sketches/sketchPaths';

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

            {/* Easter egg — uma conta errada, riscada, como no caderno. */}
            <div className="mt-10 flex flex-col items-center gap-3" aria-hidden="true">
              <span className="relative inline-block px-2">
                <AnimatedEquation expression="1 + 1 = 3" delay={0.6} className="text-2xl text-gold-300/70" />
                <svg viewBox="0 0 40 40" preserveAspectRatio="none" className="pointer-events-none absolute -inset-2 text-red-400/80">
                  <motion.path
                    d={SKETCH_PATHS.cross}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 1.7, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
              </span>
              <HandwrittenNote delay={2.2} rotate={-1} className="text-xl text-white/60">
                Essa página não existe, mas o conhecimento sim.
              </HandwrittenNote>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
