import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { CommunityPulseWidget } from './CommunityPulseWidget';
import { 
  Users, AlertTriangle, CheckCircle2, Clock, Sparkles, Megaphone, 
  Car, HeartHandshake, Search, ArrowRight, ShieldCheck, Plus, Wrench, Shield
} from 'lucide-react';

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
  onOpenQuickAction: () => void;
  onOpenComplaintModal: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ 
  setActiveTab, 
  onOpenQuickAction,
  onOpenComplaintModal
}) => {
  const { 
    userProfile, 
    residents, 
    complaints, 
    announcements, 
    ridePools, 
    helpPosts, 
    lostFoundItems 
  } = useCommunity();

  const totalResidentsCount = 342; // Ecosystem total residents
  const activeComplaintsCount = complaints.filter(c => c.status !== 'Resolved').length;
  const resolvedComplaintsCount = complaints.filter(c => c.status === 'Resolved').length;
  const activeRidesCount = ridePools.filter(r => r.status === 'Active').length;
  const openHelpCount = helpPosts.filter(h => !h.isResolved).length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-emerald-950 border border-indigo-500/20 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Crestview Heights Eco-Community
              </span>
              <span className="text-xs text-slate-400">Block B • Flat {userProfile.flatNumber}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-emerald-300 bg-clip-text text-transparent">{userProfile.name}</span>!
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Your community is thriving today. Track complaints, connect with neighbors, share rides, and view live analytics — all in one unified digital ecosystem.
            </p>

            {/* Tagline */}
            <div className="mt-4 text-xs font-medium text-indigo-300 italic flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              “One Community. One Platform. Better Living.”
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
            <button
              onClick={onOpenComplaintModal}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-1.5 hover:scale-105"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report Complaint</span>
            </button>

            <button
              onClick={onOpenQuickAction}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-1.5 hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Quick Actions</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Key Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        
        {/* Residents */}
        <div 
          onClick={() => setActiveTab('residents')}
          className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 hover:border-indigo-500/50 hover:bg-slate-800 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Residents</span>
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">{totalResidentsCount}</div>
          <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5">
            <span>Verified community members</span>
          </p>
        </div>

        {/* Active Complaints */}
        <div 
          onClick={() => setActiveTab('complaints')}
          className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 hover:border-amber-500/50 hover:bg-slate-800 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Complaints</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-400 mt-2">{activeComplaintsCount}</div>
          <p className="text-[10px] text-slate-400 mt-1">Currently in progress</p>
        </div>

        {/* Resolved Complaints */}
        <div 
          onClick={() => setActiveTab('history')}
          className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 hover:border-emerald-500/50 hover:bg-slate-800 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Resolved Items</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-2">{resolvedComplaintsCount}</div>
          <p className="text-[10px] text-emerald-400 mt-1">94% resolution efficiency</p>
        </div>

        {/* Active Rides */}
        <div 
          onClick={() => setActiveTab('pooling')}
          className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 hover:border-cyan-500/50 hover:bg-slate-800 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Pool Rides</span>
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-cyan-300 mt-2">{activeRidesCount}</div>
          <p className="text-[10px] text-slate-400 mt-1">Active ride offers today</p>
        </div>

        {/* Help Requests */}
        <div 
          onClick={() => setActiveTab('help')}
          className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 hover:border-purple-500/50 hover:bg-slate-800 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Help Requests</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-purple-300 mt-2">{openHelpCount}</div>
          <p className="text-[10px] text-purple-300 mt-1">Active Q&A threads</p>
        </div>

      </div>

      {/* Community Pulse Widget */}
      <CommunityPulseWidget onNavigateToPulse={() => setActiveTab('pulse')} />

      {/* Main Grid Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Announcements & Discussion */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Announcements Card */}
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div className="flex items-center space-x-2">
                <Megaphone className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Latest Community Announcements</h3>
              </div>
              <button 
                onClick={() => setActiveTab('announcements')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 3).map((anc) => (
                <div 
                  key={anc.id}
                  onClick={() => setActiveTab('announcements')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    anc.priority === 'Emergency'
                      ? 'bg-rose-500/10 border-rose-500/40 hover:bg-rose-500/20'
                      : anc.priority === 'Important'
                      ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'
                      : 'bg-slate-900/50 border-slate-700/60 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                      anc.priority === 'Emergency' ? 'bg-rose-500/20 text-rose-300' :
                      anc.priority === 'Important' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-indigo-500/20 text-indigo-300'
                    }`}>
                      {anc.category}
                    </span>
                    <span className="text-slate-400 text-[11px]">{anc.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">{anc.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{anc.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhood Help Preview */}
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div className="flex items-center space-x-2">
                <HeartHandshake className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Neighborhood Help & Q&A</h3>
              </div>
              <button 
                onClick={() => setActiveTab('help')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
              >
                <span>Browse Forum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {helpPosts.slice(0, 2).map((post) => (
                <div 
                  key={post.id}
                  onClick={() => setActiveTab('help')}
                  className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-700/60 hover:bg-slate-900 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Posted by <strong className="text-slate-200">{post.author}</strong> ({post.flatNumber})</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">{post.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100">{post.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{post.content}</p>
                  
                  <div className="flex items-center space-x-4 mt-2 text-[11px] text-slate-400">
                    <span>👍 {post.upvotes} upvotes</span>
                    <span>💬 {post.comments.length} comments</span>
                    {post.isResolved && <span className="text-emerald-400 font-medium">✓ Solution Found</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Ride Share & Lost & Found */}
        <div className="space-y-6">
          
          {/* Active Rides */}
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div className="flex items-center space-x-2">
                <Car className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Community Ride Sharing</h3>
              </div>
              <button 
                onClick={() => setActiveTab('pooling')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                View Rides
              </button>
            </div>

            <div className="space-y-3">
              {ridePools.slice(0, 2).map((ride) => (
                <div key={ride.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{ride.driverName} ({ride.flatNumber})</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                      {ride.availableSeats} seats left
                    </span>
                  </div>
                  <div className="text-slate-300 space-y-0.5 text-[11px]">
                    <p>📍 <strong>From:</strong> {ride.startLocation}</p>
                    <p>🎯 <strong>To:</strong> {ride.destination}</p>
                    <p>⏰ <strong>Time:</strong> {ride.date} at {ride.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lost & Found Recent */}
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Lost & Found Updates</h3>
              </div>
              <button 
                onClick={() => setActiveTab('lostfound')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
              >
                Browse All
              </button>
            </div>

            <div className="space-y-3">
              {lostFoundItems.slice(0, 2).map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-start space-x-3 text-xs">
                  {item.image && (
                    <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        item.type === 'Lost' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {item.type.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-slate-400">{item.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-200 mt-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 truncate">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
