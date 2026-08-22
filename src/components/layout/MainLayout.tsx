import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { EnrollmentModalProvider } from '@/context/EnrollmentModalContext';
import { ScheduleVisitModalProvider } from '@/context/ScheduleVisitModalContext';
import { WhatsAppFloatingButton } from '@/components/ui/WhatsAppFloatingButton';

export function MainLayout() {
  useScrollToTop();
  const { pathname } = useLocation();

  return (
    <EnrollmentModalProvider>
      <ScheduleVisitModalProvider>
        {/* Sem overflow-x aqui de propósito: o corte horizontal vive em
            `html` (index.css) — qualquer combinação de overflow-x:hidden
            com overflow-y não-hidden nesta div (mesmo "visible" explícito)
            faz o CSS forçar overflow-y para "auto" (spec), transformando
            esta própria div num contêiner de rolagem independente quando o
            conteúdo passa a altura da viewport por poucos pixels — a
            "segunda rolagem" no lado direito. Cortar no <html> evita o
            problema porque ali o overflow-y "auto" resultante É a rolagem
            principal da página, não uma segunda. */}
        <div className="flex min-h-screen flex-col bg-white">
          <Navbar />
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
          <Footer />
          <WhatsAppFloatingButton />
        </div>
      </ScheduleVisitModalProvider>
    </EnrollmentModalProvider>
  );
}
