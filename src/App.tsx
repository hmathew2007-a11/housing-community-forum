import React, { useState } from 'react';
import { CommunityProvider, useCommunity } from './context/CommunityContext';
import { DemoBanner } from './components/common/DemoBanner';
import { Header } from './components/common/Header';
import { Navigation } from './components/common/Navigation';
import { NotificationCenter } from './components/common/NotificationCenter';
import { QuickActionModal } from './components/dashboard/QuickActionModal';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { CommunityPulseScreen } from './components/dashboard/CommunityPulse';
import { CommunityMap } from './components/map/CommunityMap';
import { HouseWorkersDirectory } from './components/workers/HouseWorkersDirectory';
import { ResidentDirectory } from './components/residents/ResidentDirectory';
import { ComplaintList } from './components/complaints/ComplaintList';
import { ComplaintFormModal } from './components/complaints/ComplaintFormModal';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { RidePooling } from './components/pooling/RidePooling';
import { AnnouncementBoard } from './components/announcements/AnnouncementBoard';
import { NeighborhoodHelp } from './components/help/NeighborhoodHelp';
import { LostFoundBoard } from './components/lostfound/LostFoundBoard';
import { CommunityHistory } from './components/history/CommunityHistory';
import { UserProfileScreen } from './components/profile/UserProfile';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <HomeDashboard 
            setActiveTab={setActiveTab}
            onOpenQuickAction={() => setIsQuickActionOpen(true)}
            onOpenComplaintModal={() => setIsComplaintModalOpen(true)}
          />
        );
      case 'map':
        return <CommunityMap setActiveTab={setActiveTab} />;
      case 'workers':
        return <HouseWorkersDirectory />;
      case 'residents':
        return <ResidentDirectory />;
      case 'complaints':
        return <ComplaintList onOpenComplaintModal={() => setIsComplaintModalOpen(true)} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'pulse':
        return <CommunityPulseScreen setActiveTab={setActiveTab} />;
      case 'pooling':
        return <RidePooling />;
      case 'announcements':
        return <AnnouncementBoard />;
      case 'help':
        return <NeighborhoodHelp />;
      case 'lostfound':
        return <LostFoundBoard />;
      case 'history':
        return <CommunityHistory />;
      case 'profile':
        return <UserProfileScreen />;
      case 'admin':
        return (
          <AdminDashboard 
            setActiveTab={setActiveTab}
            onOpenComplaintModal={() => setIsComplaintModalOpen(true)}
          />
        );
      default:
        return (
          <HomeDashboard 
            setActiveTab={setActiveTab}
            onOpenQuickAction={() => setIsQuickActionOpen(true)}
            onOpenComplaintModal={() => setIsComplaintModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Demo Banner */}
      <DemoBanner activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenQuickAction={() => setIsQuickActionOpen(true)}
      />

      {/* Tab Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderActiveTab()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-6 text-center text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-200">HomeCircle</span>
            <span>• “One Community. One Platform. Better Living.”</span>
          </div>
          <p>© 2026 Crestview Heights Community Ecosystem. All rights reserved.</p>
        </div>
      </footer>

      {/* Global Modals */}
      <NotificationCenter 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        setActiveTab={setActiveTab}
      />

      <QuickActionModal 
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        setActiveTab={setActiveTab}
        onOpenComplaintForm={() => setIsComplaintModalOpen(true)}
      />

      <ComplaintFormModal 
        isOpen={isComplaintModalOpen}
        onClose={() => setIsComplaintModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <CommunityProvider>
      <MainAppContent />
    </CommunityProvider>
  );
}

export default App;
