import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { UserCheck, Star, ShieldCheck, Award, HeartHandshake, AlertTriangle, Car, CheckCircle2 } from 'lucide-react';

export const UserProfileScreen: React.FC = () => {
  const { userProfile, userRole } = useCommunity();

  const getRankBadge = (score: number) => {
    if (score >= 400) return { title: 'Neighborhood Champion ⭐', color: 'from-amber-400 to-yellow-500', text: 'text-amber-300' };
    if (score >= 200) return { title: 'Community Guardian 🛡️', color: 'from-indigo-400 to-purple-500', text: 'text-indigo-300' };
    return { title: 'Active Resident 🏠', color: 'from-emerald-400 to-teal-500', text: 'text-emerald-300' };
  };

  const badge = getRankBadge(userProfile.contributionScore);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Hero Profile Card */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-500/40 shadow-xl"
          />

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-white">{userProfile.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                {userRole}
              </span>
            </div>

            <p className="text-xs text-indigo-400 font-semibold">
              Flat {userProfile.flatNumber} ({userProfile.block}) • {userProfile.occupancyType}
            </p>

            <div className="text-xs text-slate-400 space-x-3 pt-1">
              <span>Joined: {userProfile.moveInDate}</span>
              <span>•</span>
              <span>Email: {userProfile.email}</span>
            </div>
          </div>

          {/* Contribution Rank Badge */}
          <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-2xl text-center space-y-1 min-w-[200px]">
            <span className="text-[10px] uppercase font-bold text-slate-400">Contribution Rank</span>
            <div className={`text-base font-extrabold ${badge.text}`}>
              {badge.title}
            </div>
            <div className="text-2xl font-extrabold text-amber-400 mt-1 flex items-center justify-center gap-1">
              <Star className="w-5 h-5 fill-amber-400" />
              <span>{userProfile.contributionScore} Pts</span>
            </div>
          </div>
        </div>

        {/* User Community Activity Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700/60">
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400">Complaints Logged</span>
              <div className="text-xl font-extrabold text-white">{userProfile.complaintsCount} Reports</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400">Help Answers Provided</span>
              <div className="text-xl font-extrabold text-white">{userProfile.helpProvidedCount} Solutions</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400">Rides Shared</span>
              <div className="text-xl font-extrabold text-white">{userProfile.ridesSharedCount} Pool Trips</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
