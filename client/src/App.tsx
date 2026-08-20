import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { CVTest } from './pages/CVTest';
import { AssessmentWizard } from './pages/AssessmentWizard';
import { Statistics } from './pages/Statistics';
import { Physical } from './pages/Physical';
import { Report } from './pages/Report';
import { ScoutDashboard } from './pages/coach/ScoutDashboard';
import { Compare } from './pages/Compare';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { useStore } from './store/useStore';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [inspectPlayerId, setInspectPlayerId] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const { user, fetchCurrentUser } = useStore();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleInspectPlayer = (pid: string) => {
    setInspectPlayerId(pid);
    setCurrentTab('report');
  };

  const handleComparePlayers = (pids: string[]) => {
    setCompareIds(pids);
    setCurrentTab('compare');
  };

  return (
    <div className="min-h-screen bg-[#061220] text-slate-100 flex flex-col selection:bg-[#e2f939] selection:text-[#061220]">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-1">
        {currentTab === 'landing' && (
          <Landing
            onStartAssessment={() => setCurrentTab('assessment-wizard')}
            onExplore={() => setCurrentTab('scout-hub')}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            onStartCVLab={() => setCurrentTab('cv-lab')}
            onStartAssessmentWizard={() => setCurrentTab('assessment-wizard')}
            onViewReport={() => setCurrentTab('report')}
            onViewStats={() => setCurrentTab('statistics')}
          />
        )}

        {currentTab === 'cv-lab' && (
          <CVTest
            onComplete={() => setCurrentTab('report')}
            onViewReport={() => setCurrentTab('report')}
          />
        )}

        {currentTab === 'assessment-wizard' && (
          <AssessmentWizard onComplete={() => setCurrentTab('report')} />
        )}

        {currentTab === 'statistics' && <Statistics />}

        {currentTab === 'physical' && <Physical />}

        {currentTab === 'report' && (
          <Report
            onBack={() => setCurrentTab('dashboard')}
            onCompare={() => setCurrentTab('compare')}
          />
        )}

        {currentTab === 'scout-hub' && (
          <ScoutDashboard
            onInspectPlayer={handleInspectPlayer}
            onComparePlayers={handleComparePlayers}
          />
        )}

        {currentTab === 'compare' && (
          <Compare initialPlayerIds={compareIds.length >= 2 ? compareIds : undefined} />
        )}

        {currentTab === 'profile' && <Profile />}

        {currentTab === 'login' && (
          <Login
            onSuccess={() => setCurrentTab('dashboard')}
            onNavigateRegister={() => setCurrentTab('register')}
          />
        )}

        {currentTab === 'register' && (
          <Register
            onSuccess={() => setCurrentTab('dashboard')}
            onNavigateLogin={() => setCurrentTab('login')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
