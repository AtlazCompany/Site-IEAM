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
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
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
