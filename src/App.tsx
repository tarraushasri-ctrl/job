import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { UniversalSearchModal } from './components/UniversalSearchModal';

// Views
import { HomeView } from './views/HomeView';
import { CareerView } from './views/CareerView';
import { InternshipsView } from './views/InternshipsView';
import { JobsView } from './views/JobsView';
import { SkillsView } from './views/SkillsView';
import { CareerQuizView } from './views/CareerQuizView';
import { ResumeBuilderView } from './views/ResumeBuilderView';
import { MentorsView } from './views/MentorsView';
import { DashboardView } from './views/DashboardView';

const MainContent: React.FC = () => {
  const { currentTab } = useApp();
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Navigation Bar adhering to Top Bar Contract */}
      <Navbar onOpenSearch={() => setSearchModalOpen(true)} />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'home' && <HomeView onOpenSearch={() => setSearchModalOpen(true)} />}
        {currentTab === 'careers' && <CareerView />}
        {currentTab === 'internships' && <InternshipsView />}
        {currentTab === 'jobs' && <JobsView />}
        {currentTab === 'skills' && <SkillsView />}
        {currentTab === 'quiz' && <CareerQuizView />}
        {currentTab === 'resume' && <ResumeBuilderView />}
        {currentTab === 'mentors' && <MentorsView />}
        {currentTab === 'dashboard' && <DashboardView />}
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Universal Instant Search Command Palette */}
      <UniversalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      {/* Toast Feedback Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
