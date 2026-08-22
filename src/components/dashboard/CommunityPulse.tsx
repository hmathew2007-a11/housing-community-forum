import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { 
  Activity, AlertCircle, MessageSquare, TrendingUp, CheckCircle2, 
  HeartHandshake, ShieldCheck, ArrowUpRight, Sparkles 
} from 'lucide-react';

interface CommunityPulseProps {
  setActiveTab: (tab: string) => void;
}

export const CommunityPulseScreen: React.FC<CommunityPulseProps> = ({ setActiveTab }) => {
  const { communityPulse, complaints, helpPosts, ridePools } = useCommunity();

  const activeComplaints = complaints.filter(c => c.status !== 'Resolved');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-indigo-400 animate-pulse" />
            <h1 className="text-xl font-bold text-white">Community Pulse 🧠</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time diagnostic monitor summarizing current estate health, top concerns, and resolved wins.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Estate Health Status: OPTIMAL (94%)</span>
        </div>
      </div>

      {/* Main Diagnostic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 🔴 Most Urgent Issue */}
        <div className="bg-slate-800/80 border border-rose-500/30 rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400 animate-bounce" />
              🔴 Most Urgent Issue
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
              {communityPulse.urgentIssue.level} Priority
            </span>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-white">{communityPulse.urgentIssue.title}</h3>
            <p className="text-xs text-slate-400 mt-1">Location: {communityPulse.urgentIssue.location}</p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
            Water valve joint dripping near Block B corridor. Plumber Marcus Vance dispatched to replace seal.
          </p>

          <button
            onClick={() => setActiveTab('complaints')}
            className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all"
          >
            Inspect Complaint Log
          </button>
        </div>

        {/* 💬 Most Discussed Topic */}
        <div className="bg-slate-800/80 border border-indigo-500/30 rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              💬 Most Discussed Topic
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
              {communityPulse.mostDiscussedTopic.commentsCount} Comments
            </span>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-white">{communityPulse.mostDiscussedTopic.topic}</h3>
            <p className="text-xs text-slate-400 mt-1">Community Forum Thread</p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
            Residents discussing proposed solar docks and EV charging bay rules ahead of Q3 Townhall meeting.
          </p>

          <button
            onClick={() => setActiveTab('announcements')}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            View Forum Discussion
          </button>
        </div>

        {/* 📈 Trending Problem */}
        <div className="bg-slate-800/80 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              📈 Trending Concern
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
              +{communityPulse.trendingProblem.percentageIncrease}% Spike
            </span>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-white">{communityPulse.trendingProblem.problem}</h3>
            <p className="text-xs text-slate-400 mt-1">Electrical Category</p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
            Slight increase in reported corridor light bulb flickers across Block C and D due to voltage fluctuation.
          </p>

          <button
            onClick={() => setActiveTab('analytics')}
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 transition-all"
          >
            Check Category Analytics
          </button>
        </div>

        {/* ✅ Recently Resolved */}
        <div className="bg-slate-800/80 border border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ✅ Recently Resolved
            </span>
            <span className="text-[10px] text-slate-400">{communityPulse.recentlyResolved.timeAgo}</span>
          </div>

          <div>
            <h3 className="text-base font-bold text-white">{communityPulse.recentlyResolved.title}</h3>
            <p className="text-xs text-emerald-400 font-semibold mt-1">Certified Safe & Inspected</p>
          </div>
        </div>

        {/* 🤝 Active Community Requests */}
        <div className="bg-slate-800/80 border border-purple-500/30 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-purple-400" />
              🤝 Active Help Requests
            </span>
            <span className="text-2xl font-extrabold text-purple-300">{communityPulse.activeRequestsCount}</span>
          </div>

          <p className="text-xs text-slate-300">
            Residents seeking neighborhood advice, tool borrowing, or service recommendations.
          </p>
        </div>

      </div>

    </div>
  );
};
