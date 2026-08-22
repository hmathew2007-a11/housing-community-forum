import React, { useState } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { UserRole } from '../../types';
import { Shield, User, Wrench, CheckCircle2, ChevronDown, ChevronUp, Sparkles, RefreshCw } from 'lucide-react';

interface DemoBannerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ activeTab, setActiveTab }) => {
  const { userRole, setUserRole, resetDemoData } = useCommunity();
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const demoSteps = [
    { id: 1, label: 'Resident Dashboard Overview', role: 'resident', tab: 'dashboard' },
    { id: 2, label: 'Explore Interactive Community Map', role: 'resident', tab: 'map' },
    { id: 3, label: 'File a New Complaint (Water Leak)', role: 'resident', tab: 'complaints' },
    { id: 4, label: 'Switch to Admin / Management View', role: 'admin', tab: 'admin' },
    { id: 5, label: 'Assign Worker & Update Complaint Status', role: 'admin', tab: 'admin' },
    { id: 6, label: 'Switch to Worker View to Resolve Job', role: 'worker', tab: 'workers' },
    { id: 7, label: 'View Real-time Dynamic Community Analytics', role: 'admin', tab: 'analytics' },
    { id: 8, label: 'Check Community Pulse Diagnostics', role: 'resident', tab: 'pulse' },
    { id: 9, label: 'Explore Ride Pooling & Neighborhood Help', role: 'resident', tab: 'pooling' },
    { id: 10, label: 'Post / Claim Lost & Found Items', role: 'resident', tab: 'lostfound' },
    { id: 11, label: 'View Transparent Community History Log', role: 'resident', tab: 'history' },
    { id: 12, label: 'Check Gamified Contribution Score', role: 'resident', tab: 'profile' }
  ];

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role === 'admin' && activeTab !== 'admin' && activeTab !== 'analytics') {
      setActiveTab('admin');
    }
  };

  const executeDemoStep = (step: typeof demoSteps[0]) => {
    setUserRole(step.role as UserRole);
    setActiveTab(step.tab);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900/90 via-slate-900 to-emerald-950/90 border-b border-indigo-500/20 text-white px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
        
        {/* Left Badge */}
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            COMPETITION DEMO MODE
          </span>
          <span className="hidden lg:inline text-slate-400">| Switch roles to test real-time data sync across views</span>
        </div>

        {/* Role Switcher Pills */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 space-x-1">
          <span className="text-xs text-slate-400 px-2 font-medium hidden sm:inline">Active Role:</span>
          
          <button
            onClick={() => handleRoleChange('resident')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
              userRole === 'resident' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Resident</span>
          </button>

          <button
            onClick={() => handleRoleChange('admin')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
              userRole === 'admin' 
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin / Management</span>
          </button>

          <button
            onClick={() => handleRoleChange('worker')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
              userRole === 'worker' 
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30' 
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>House Worker</span>
          </button>
        </div>

        {/* Actions & Checklist Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsGuideOpen(!isGuideOpen)}
            className="flex items-center space-x-1 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 px-2.5 py-1 rounded-lg text-indigo-300 hover:text-white transition-all text-xs"
          >
            <span>Demo Flow Guide</span>
            {isGuideOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={resetDemoData}
            title="Reset to default demo data"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Collapsible Demo Flow Checklist */}
      {isGuideOpen && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-700/50 animate-fadeIn">
          <p className="text-xs text-slate-300 mb-2 font-medium">
            Follow this 12-step sequence to judge HomeCircle's real-time cross-component data flow:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {demoSteps.map(step => {
              const isActive = activeTab === step.tab && userRole === step.role;
              return (
                <button
                  key={step.id}
                  onClick={() => executeDemoStep(step)}
                  className={`text-left p-2 rounded-lg border text-xs flex items-center space-x-2 transition-all ${
                    isActive
                      ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-sm'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-500 hover:bg-slate-800/80'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    isActive ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {step.id}
                  </span>
                  <span className="truncate">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
