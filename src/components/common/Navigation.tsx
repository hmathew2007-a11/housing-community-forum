import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { 
  Home, MapPin, Wrench, Users, AlertTriangle, BarChart3, Activity, 
  Car, Megaphone, HeartHandshake, Search, Clock, UserCheck, Shield
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { userRole, complaints, announcements } = useCommunity();

  const activeComplaintsCount = complaints.filter(c => c.status !== 'Resolved').length;

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'map', label: 'Community Map', icon: MapPin },
    { id: 'workers', label: 'House Workers', icon: Wrench },
    { id: 'residents', label: 'Residents', icon: Users },
    { id: 'complaints', label: 'Complaints', icon: AlertTriangle, badge: activeComplaintsCount },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, highlight: true },
    { id: 'pulse', label: 'Community Pulse', icon: Activity },
    { id: 'pooling', label: 'Ride Pooling', icon: Car },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'help', label: 'Neighborhood Help', icon: HeartHandshake },
    { id: 'lostfound', label: 'Lost & Found', icon: Search },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'profile', label: 'Profile', icon: UserCheck }
  ];

  if (userRole === 'admin') {
    navItems.push({ id: 'admin', label: 'Admin Desk', icon: Shield, highlight: true });
  }

  return (
    <nav className="bg-slate-900/95 border-b border-slate-800 backdrop-blur-md sticky top-16 z-30 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1 sm:space-x-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? item.id === 'admin'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400/50'
                    : item.highlight
                    ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
