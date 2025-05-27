import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import { BarLoader } from 'react-spinners'; 

const HomePage = lazy(() => import('@/pages/HomePage'));
const CareerPathAssessmentPage = lazy(() => import('@/pages/CareerPathAssessmentPage'));
const LearningPathsPage = lazy(() => import('@/pages/LearningPathsPage'));
const SkillsPage = lazy(() => import('@/pages/SkillsPage'));
const CommunityPage = lazy(() => import('@/pages/CommunityPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const AIChatPage = lazy(() => import('@/pages/AIChatPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const SuspenseFallback = () => (
  <div className="flex justify-center items-center h-screen w-full">
    <BarLoader color="hsl(var(--primary))" height={4} width={150} />
  </div>
);

function App() {
  return (
    <Layout>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<CareerPathAssessmentPage />} />
          <Route path="/learning-paths" element={<LearningPathsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ai-chat" element={<AIChatPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;