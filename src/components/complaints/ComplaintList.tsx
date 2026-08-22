import React, { useState } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { Complaint, ComplaintStatus } from '../../types';
import { 
  AlertTriangle, Search, Filter, Plus, CheckCircle2, Clock, 
  Wrench, Shield, User, ArrowUpRight, MessageSquare 
} from 'lucide-react';

interface ComplaintListProps {
  onOpenComplaintModal: () => void;
}

export const ComplaintList: React.FC<ComplaintListProps> = ({ onOpenComplaintModal }) => {
  const { complaints, updateComplaintStatus, workers, userRole } = useCommunity();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedBlock, setSelectedBlock] = useState<string>('All');

  // Selected complaint for details / resolution modal
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(null);
  const [resolutionNoteInput, setResolutionNoteInput] = useState('');
  const [assignedWorkerIdInput, setAssignedWorkerIdInput] = useState('');

  const categories = ['All', 'Water', 'Electricity', 'Parking', 'Security', 'Maintenance', 'Cleanliness', 'Noise', 'Other'];
  const statuses = ['All', 'Reported', 'Acknowledged', 'In Progress', 'Resolved'];

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    const matchesBlock = selectedBlock === 'All' || c.block === selectedBlock;

    return matchesSearch && matchesCategory && matchesStatus && matchesBlock;
  });

  const handleUpdateStatus = (id: string, status: ComplaintStatus) => {
    const worker = workers.find(w => w.id === assignedWorkerIdInput);
    updateComplaintStatus(
      id, 
      status, 
      worker?.id, 
      worker ? `${worker.name} (${worker.category})` : undefined,
      resolutionNoteInput
    );
    setActiveComplaint(null);
    setResolutionNoteInput('');
    setAssignedWorkerIdInput('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            <h1 className="text-xl font-bold text-white">Complaint Management Workflow</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track reported issues through: Reported ➔ Acknowledged ➔ In Progress ➔ Resolved.
          </p>
        </div>

        <button
          onClick={onOpenComplaintModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Report New Complaint</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search complaint ID, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {statuses.map(st => (
                <option key={st} value={st}>{st === 'All' ? 'All Statuses' : st}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Blocks</option>
              <option value="Block A">Block A</option>
              <option value="Block B">Block B</option>
              <option value="Block C">Block C</option>
              <option value="Block D">Block D</option>
              <option value="Villa Sector">Villa Sector</option>
            </select>
          </div>

        </div>
      </div>

      {/* Complaint List Grid */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-12 text-center text-slate-400 text-xs">
            No complaints match the selected filters.
          </div>
        ) : (
          filteredComplaints.map((cmp) => (
            <div 
              key={cmp.id}
              className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-indigo-500/40 transition-all"
            >
              <div className="flex items-start space-x-4 flex-1">
                {cmp.image && (
                  <img src={cmp.image} alt={cmp.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                )}

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-extrabold text-indigo-400">{cmp.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      cmp.priority === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      cmp.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-slate-700 text-slate-300'
                    }`}>
                      {cmp.priority} Priority
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900 text-slate-300">
                      {cmp.category}
                    </span>
                    <span className="text-slate-400 text-[11px]">📍 {cmp.location} ({cmp.block})</span>
                  </div>

                  <h3 className="text-base font-bold text-white">{cmp.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{cmp.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span>Reported by: <strong className="text-slate-200">{cmp.reportedBy}</strong> ({cmp.flatNumber})</span>
                    <span>Time: {cmp.reportedAt}</span>
                    {cmp.assignedWorkerName && (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Wrench className="w-3 h-3" /> Worker: {cmp.assignedWorkerName}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Badge & Control */}
              <div className="flex flex-col items-end space-y-2 flex-shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-700">
                <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                  cmp.status === 'Reported' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  cmp.status === 'Acknowledged' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  cmp.status === 'In Progress' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {cmp.status.toUpperCase()}
                </span>

                <button
                  onClick={() => {
                    setActiveComplaint(cmp);
                    setResolutionNoteInput(cmp.resolutionNote || '');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
                >
                  Manage Status
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Manage Status Modal */}
      {activeComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Manage Complaint #{activeComplaint.id}</h3>
              <button onClick={() => setActiveComplaint(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300 font-medium">{activeComplaint.title}</p>

            {/* Worker Assignment Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Assign House Worker</label>
              <select
                value={assignedWorkerIdInput}
                onChange={(e) => setAssignedWorkerIdInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select worker to dispatch...</option>
                {workers.map(w => (
                  <option key={w.id} value={w.id}>{w.name} ({w.category}) - {w.status}</option>
                ))}
              </select>
            </div>

            {/* Resolution note */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Resolution / Action Note</label>
              <textarea
                rows={2}
                placeholder="e.g. Dispatched plumber. Main joint fixed..."
                value={resolutionNoteInput}
                onChange={(e) => setResolutionNoteInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
              <button
                onClick={() => handleUpdateStatus(activeComplaint.id, 'In Progress')}
                className="py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all"
              >
                Set In Progress
              </button>
              <button
                onClick={() => handleUpdateStatus(activeComplaint.id, 'Resolved')}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-600/30"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
