import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageLoader } from '@/components/ui';

const Home = lazy(() => import('@/pages/Home'));
const Institution = lazy(() => import('@/pages/Institution'));
const Teaching = lazy(() => import('@/pages/Teaching'));
const NewsPage = lazy(() => import('@/pages/News'));
const Contact = lazy(() => import('@/pages/Contact'));
const Enrollment = lazy(() => import('@/pages/Enrollment'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/instituicao" element={<Institution />} />
            <Route path="/ensino" element={<Teaching />} />
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/matricula" element={<Enrollment />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}

export default App;
