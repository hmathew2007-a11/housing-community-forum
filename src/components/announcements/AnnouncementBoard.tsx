import React, { useState } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { Announcement } from '../../types';
import { Megaphone, Plus, Bell, AlertTriangle, Calendar, ShieldCheck, X, Sparkles } from 'lucide-react';

export const AnnouncementBoard: React.FC = () => {
  const { announcements, addAnnouncement, userRole } = useCommunity();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Announcement['category']>('General Notice');
  const [priority, setPriority] = useState<Announcement['priority']>('Normal');

  const categories = ['All', 'Water Supply', 'Security Alert', 'Maintenance', 'Community Meeting', 'Festival Event', 'General Notice'];

  const filteredAnnouncements = announcements.filter(a => 
    selectedCategory === 'All' || a.category === selectedCategory
  );

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      title,
      description,
      category,
      priority,
      publishedBy: userRole === 'admin' ? 'HOA Board Management' : 'Resident Committee',
      isPinned: priority === 'Emergency' || priority === 'Important'
    });
    setIsPublishModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <Megaphone className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Community Announcement Board</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Official notices, water supply schedules, security alerts, and community meeting updates.
          </p>
        </div>

        {userRole === 'admin' && (
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-1.5 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Announcement</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((anc) => (
          <div 
            key={anc.id}
            className={`p-6 rounded-3xl border shadow-xl space-y-3 transition-all ${
              anc.priority === 'Emergency'
                ? 'bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border-rose-500/50 shadow-rose-950/50 ring-1 ring-rose-500/30'
                : anc.priority === 'Important'
                ? 'bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border-amber-500/40'
                : 'bg-slate-800/80 border-slate-700/70'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  anc.priority === 'Emergency' ? 'bg-rose-500 text-white animate-pulse' :
                  anc.priority === 'Important' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                }`}>
                  {anc.category}
                </span>

                {anc.isPinned && (
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Pinned Notice
                  </span>
                )}
              </div>

              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" /> {anc.date}
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-white">{anc.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{anc.description}</p>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Published by: <strong className="text-slate-200">{anc.publishedBy}</strong></span>
              <span className="text-emerald-400 font-medium">✓ Verified Official Broadcast</span>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative">
            <button onClick={() => setIsPublishModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-indigo-400" />
              <span>Publish Official Notice</span>
            </h3>

            <form onSubmit={handlePublish} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Overhead Water Tank Cleaning Schedule"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  >
                    <option value="Water Supply">Water Supply</option>
                    <option value="Security Alert">Security Alert</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Community Meeting">Community Meeting</option>
                    <option value="Festival Event">Festival Event</option>
                    <option value="General Notice">General Notice</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Important">Important</option>
                    <option value="Emergency">Emergency Alert 🔴</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Notice Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detailed notification text..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all"
              >
                Broadcast Announcement to Community
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
