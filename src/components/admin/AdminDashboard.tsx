import React, { useState } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { 
  Shield, Users, Wrench, AlertTriangle, Megaphone, BarChart3, 
  CheckCircle2, Clock, Plus, Filter, ArrowUpRight, Sparkles 
} from 'lucide-react';

interface AdminDashboardProps {
  setActiveTab: (tab: string) => void;
  onOpenComplaintModal: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveTab, onOpenComplaintModal }) => {
  const { complaints, workers, residents, announcements, updateComplaintStatus } = useCommunity();
  const [selectedSubTab, setSelectedSubTab] = useState<'overview' | 'complaints' | 'workers' | 'residents'>('overview');

  const pendingComplaints = complaints.filter(c => c.status !== 'Resolved');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Community Management Command Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            HOA Board Admin view: Assign workers, update complaints, manage residents, and view real-time analytics.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('analytics')}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center space-x-1.5"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Open Live Analytics</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Sub-tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setSelectedSubTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedSubTab === 'overview' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Management Overview
        </button>
        <button
          onClick={() => setSelectedSubTab('complaints')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            selectedSubTab === 'complaints' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Pending Complaints</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500 text-white">
            {pendingComplaints.length}
          </span>
        </button>
        <button
          onClick={() => setSelectedSubTab('workers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedSubTab === 'workers' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Worker Dispatch ({workers.length})
        </button>
        <button
          onClick={() => setSelectedSubTab('residents')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedSubTab === 'residents' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Resident Registry ({residents.length})
        </button>
      </div>

      {/* Overview Grid */}
      {selectedSubTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Executive Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Residents</span>
              <div className="text-2xl font-extrabold text-white mt-1">342</div>
              <span className="text-[10px] text-emerald-400 font-semibold">100% verified</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-rose-400">Queue Workload</span>
              <div className="text-2xl font-extrabold text-rose-400 mt-1">{pendingComplaints.length}</div>
              <span className="text-[10px] text-slate-400">Active tickets</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Active Workers</span>
              <div className="text-2xl font-extrabold text-emerald-300 mt-1">{workers.length}</div>
              <span className="text-[10px] text-emerald-400 font-semibold">Ready for dispatch</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-purple-400">SLA Efficiency</span>
              <div className="text-2xl font-extrabold text-purple-300 mt-1">94.2%</div>
              <span className="text-[10px] text-purple-300 font-semibold">&lt; 48hr turnaround</span>
            </div>
          </div>

          {/* Rapid Action Queue */}
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Urgent Complaints Awaiting Action ({pendingComplaints.length})</span>
              </h3>
              <button 
                onClick={() => setSelectedSubTab('complaints')}
                className="text-xs text-purple-400 font-semibold hover:text-purple-300"
              >
                Manage Queue
              </button>
            </div>

            <div className="space-y-3">
              {pendingComplaints.map(cmp => (
                <div key={cmp.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-purple-400">{cmp.id}</span>
                      <span className="font-bold text-white">{cmp.title}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300">
                        {cmp.priority}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{cmp.block} • {cmp.location} • Reported by {cmp.reportedBy}</p>
                  </div>

                  <div className="flex items-center space-x-2 self-end md:self-auto">
                    <button
                      onClick={() => updateComplaintStatus(cmp.id, 'In Progress', workers[0].id, workers[0].name, 'Dispatched via Admin')}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px]"
                    >
                      Assign Worker
                    </button>
                    <button
                      onClick={() => updateComplaintStatus(cmp.id, 'Resolved', undefined, undefined, 'Resolved by HOA Admin')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SubTab: Complaints */}
      {selectedSubTab === 'complaints' && (
        <div className="space-y-4">
          {pendingComplaints.map(cmp => (
            <div key={cmp.id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{cmp.id}: {cmp.title}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300">
                  STATUS: {cmp.status}
                </span>
              </div>
              <p className="text-slate-300">{cmp.description}</p>
              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-700">
                <button
                  onClick={() => updateComplaintStatus(cmp.id, 'In Progress')}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
                >
                  Set In Progress
                </button>
                <button
                  onClick={() => updateComplaintStatus(cmp.id, 'Resolved', undefined, undefined, 'Resolved in Admin')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Resolve & Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab: Workers */}
      {selectedSubTab === 'workers' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {workers.map(w => (
            <div key={w.id} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-xs space-y-2">
              <div className="flex items-center space-x-3">
                <img src={w.avatar} alt={w.name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-white">{w.name}</h4>
                  <p className="text-indigo-400">{w.category} • {w.hourlyRate}</p>
                </div>
              </div>
              <p className="text-slate-400 text-[11px]">Completed: {w.completedJobs} jobs • Rating: {w.rating}★</p>
            </div>
          ))}
        </div>
      )}

      {/* SubTab: Residents */}
      {selectedSubTab === 'residents' && (
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-4 text-xs">
          <p className="text-slate-300 mb-3">Admin full access mode active for resident management.</p>
          <div className="space-y-2">
            {residents.map(r => (
              <div key={r.id} className="p-3 rounded-xl bg-slate-900/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white">{r.name}</span> ({r.flatNumber})
                  <p className="text-[11px] text-slate-400">Emergency Contact: {r.emergencyContactName} ({r.emergencyContactPhone})</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                  {r.ownerStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
