import React, { useState } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { 
  Home, Search, Bell, Moon, Sun, Shield, Wrench, User, 
  MapPin, HelpCircle, AlertTriangle, Car, Package, Sparkles
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNotifications: () => void;
  onOpenQuickAction: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenNotifications,
  onOpenQuickAction
}) => {
  const { userRole, userProfile, notifications, theme, toggleTheme } = useCommunity();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchResultClick = (targetTab: string) => {
    setActiveTab(targetTab);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 backdrop-blur-md border-b border-slate-800 dark:border-slate-800 light:border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Home className="w-5 h-5 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-emerald-300 dark:from-white dark:via-indigo-200 dark:to-emerald-300 light:from-slate-900 light:to-indigo-600 bg-clip-text text-transparent">
                HomeCircle
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              One Community. One Platform. Better Living.
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search announcements, complaints, workers, help, rides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 dark:text-slate-200 light:text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Search Dropdown Results */}
          {isSearchFocused && searchQuery.length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 p-2 text-xs space-y-1">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Quick Jump
              </div>
              <button
                onClick={() => handleSearchResultClick('complaints')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700/60 flex items-center space-x-2 text-slate-200"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Search Complaints for "{searchQuery}"</span>
              </button>
              <button
                onClick={() => handleSearchResultClick('workers')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700/60 flex items-center space-x-2 text-slate-200"
              >
                <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                <span>Search House Workers for "{searchQuery}"</span>
              </button>
              <button
                onClick={() => handleSearchResultClick('announcements')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700/60 flex items-center space-x-2 text-slate-200"
              >
                <Bell className="w-3.5 h-3.5 text-indigo-400" />
                <span>Search Announcements for "{searchQuery}"</span>
              </button>
              <button
                onClick={() => handleSearchResultClick('pooling')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700/60 flex items-center space-x-2 text-slate-200"
              >
                <Car className="w-3.5 h-3.5 text-cyan-400" />
                <span>Search Ride Pooling for "{searchQuery}"</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Quick Action Button */}
          <button
            onClick={onOpenQuickAction}
            className="hidden sm:flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-medium text-xs px-3 py-1.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quick Action</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Badge */}
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center space-x-2 pl-2 border-l border-slate-800 cursor-pointer group"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition-all"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                <span>{userProfile.name}</span>
                {userRole === 'admin' && <Shield className="w-3 h-3 text-purple-400" />}
                {userRole === 'worker' && <Wrench className="w-3 h-3 text-amber-400" />}
              </div>
              <div className="text-[10px] text-slate-400">
                {userProfile.flatNumber} • {userRole.toUpperCase()}
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
