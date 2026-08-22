import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { Activity, AlertCircle, MessageSquare, TrendingUp, CheckCircle, HeartHandshake, ArrowRight } from 'lucide-react';

interface CommunityPulseWidgetProps {
  onNavigateToPulse: () => void;
}

export const CommunityPulseWidget: React.FC<CommunityPulseWidgetProps> = ({ onNavigateToPulse }) => {
  const { communityPulse } = useCommunity();

  return (
    <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
      {/* Glow background accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">Community Pulse</h3>
            <p className="text-[10px] text-slate-400">Real-time health & diagnostic summary</p>
          </div>
        </div>

        <button
          onClick={onNavigateToPulse}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1 group/btn"
        >
          <span>Full Diagnostics</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        
        {/* Urgent Issue */}
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">🔴 Urgent Concern</span>
            <h4 className="font-semibold text-slate-200 mt-0.5 line-clamp-1">{communityPulse.urgentIssue.title}</h4>
            <p className="text-[10px] text-slate-400">{communityPulse.urgentIssue.location}</p>
          </div>
        </div>

        {/* Most Discussed */}
        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start space-x-2.5">
          <MessageSquare className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">💬 Top Topic</span>
            <h4 className="font-semibold text-slate-200 mt-0.5 line-clamp-1">{communityPulse.mostDiscussedTopic.topic}</h4>
            <p className="text-[10px] text-slate-400">{communityPulse.mostDiscussedTopic.commentsCount} resident comments</p>
          </div>
        </div>

        {/* Trending Problem */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start space-x-2.5">
          <TrendingUp className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">📈 Trending Trend</span>
            <h4 className="font-semibold text-slate-200 mt-0.5 line-clamp-1">{communityPulse.trendingProblem.problem}</h4>
            <p className="text-[10px] text-amber-300 font-medium">+{communityPulse.trendingProblem.percentageIncrease}% increase this week</p>
          </div>
        </div>

        {/* Recently Resolved */}
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start space-x-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">✅ Latest Win</span>
            <h4 className="font-semibold text-slate-200 mt-0.5 line-clamp-1">{communityPulse.recentlyResolved.title}</h4>
            <p className="text-[10px] text-slate-400">{communityPulse.recentlyResolved.timeAgo}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
