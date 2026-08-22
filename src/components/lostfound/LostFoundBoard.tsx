import React, { useState } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { LostFoundItem } from '../../types';
import { Search, Plus, MapPin, Calendar, CheckCircle2, ShieldCheck, X, Sparkles } from 'lucide-react';

export const LostFoundBoard: React.FC = () => {
  const { lostFoundItems, addLostFoundItem, updateLostFoundStatus, userProfile } = useCommunity();
  const [activeTab, setActiveTab] = useState<'All' | 'Lost' | 'Found'>('All');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Form State
  const [reportType, setReportType] = useState<'Lost' | 'Found'>('Lost');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contactPhone, setContactPhone] = useState(userProfile.phone || '+1 (555) 234-5678');
  const [imageUrl, setImageUrl] = useState('');

  const filteredItems = lostFoundItems.filter(i => activeTab === 'All' || i.type === activeTab);

  const sampleImages = [
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=600'
  ];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLostFoundItem({
      type: reportType,
      title,
      description,
      location,
      contactPhone,
      image: imageUrl || sampleImages[0]
    });
    setIsReportModalOpen(false);
    setTitle('');
    setDescription('');
    setLocation('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <Search className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Lost & Found Registry</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Report lost keys, wallets, gadgets or claim items recovered near community areas.
          </p>
        </div>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center space-x-1.5 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Report Item</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2">
        {(['All', 'Lost', 'Found'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'All' ? 'All Items' : `${tab} Items`}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="bg-slate-800/80 border border-slate-700/70 rounded-3xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-purple-500/50 transition-all"
          >
            <div>
              {item.image && (
                <div className="h-44 w-full rounded-2xl overflow-hidden mb-3">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  item.type === 'Lost' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {item.type} ITEM
                </span>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.status === 'Open' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  STATUS: {item.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-2">{item.title}</h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.description}</p>

              <div className="text-[11px] text-slate-400 space-y-1 mt-3 pt-2 border-t border-slate-700/60">
                <p className="flex items-center gap-1">📍 <strong>Location:</strong> {item.location}</p>
                <p className="flex items-center gap-1">📅 <strong>Date:</strong> {item.date}</p>
                <p className="flex items-center gap-1">👤 <strong>Posted by:</strong> {item.postedBy} ({item.flatNumber})</p>
              </div>
            </div>

            {/* Actions */}
            {item.status === 'Open' ? (
              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={() => updateLostFoundStatus(item.id, 'Claimed')}
                  className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                >
                  Mark Claimed
                </button>
                <button
                  onClick={() => updateLostFoundStatus(item.id, 'Returned')}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30"
                >
                  Mark Returned
                </button>
              </div>
            ) : (
              <div className="py-2 text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                ✓ Safely Resolved & Archived
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative">
            <button onClick={() => setIsReportModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-400" />
              <span>Report Lost or Found Item</span>
            </h3>

            <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Item Report Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setReportType('Lost')}
                    className={`py-2 rounded-xl font-bold ${reportType === 'Lost' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    I Lost Something
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportType('Found')}
                    className={`py-2 rounded-xl font-bold ${reportType === 'Found' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    I Found Something
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Car Key Fob or Apple Watch"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Central Park Jogging Track"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Distinct marks, color, brand..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/30 transition-all"
              >
                Submit Lost & Found Entry
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
