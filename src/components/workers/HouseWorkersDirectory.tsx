import React, { useState } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { Worker } from '../../types';
import { 
  Wrench, Search, Star, ShieldCheck, Phone, CheckCircle, 
  Calendar, DollarSign, Filter, X, Check, Sparkles 
} from 'lucide-react';

export const HouseWorkersDirectory: React.FC = () => {
  const { workers, userProfile } = useCommunity();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');
  const [minRatingFilter, setMinRatingFilter] = useState<number>(0);
  
  // Booking / Contact modal state
  const [bookingWorker, setBookingWorker] = useState<Worker | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');

  const categories = ['All', 'Plumber', 'Electrician', 'Carpenter', 'Cleaner', 'Gardener', 'Technician', 'Security'];

  const filteredWorkers = workers.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          w.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || w.category === selectedCategory;
    const matchesAvailability = availabilityFilter === 'All' || w.status === availabilityFilter;
    const matchesRating = w.rating >= minRatingFilter;

    return matchesSearch && matchesCategory && matchesAvailability && matchesRating;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingWorker(null);
      setJobDescription('');
      setPreferredDate('');
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <Wrench className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">Trusted House Workers Directory</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Verified neighborhood service providers for plumbing, electrical, carpentry, cleaning, and maintenance.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Background-Checked Community Partners</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by worker name or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category Filter */}
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

          {/* Availability Filter */}
          <div>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available Today</option>
              <option value="On Call">On Call</option>
              <option value="Busy">Busy</option>
            </select>
          </div>

          {/* Minimum Rating Filter */}
          <div>
            <select
              value={minRatingFilter}
              onChange={(e) => setMinRatingFilter(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value={0}>Any Rating</option>
              <option value={4.5}>4.5★ & Above</option>
              <option value={4.8}>4.8★ & Above</option>
              <option value={5.0}>5.0★ Rating Only</option>
            </select>
          </div>

        </div>
      </div>

      {/* Worker Profile Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <div 
            key={worker.id}
            className="bg-slate-800/80 border border-slate-700/70 rounded-3xl p-5 shadow-lg flex flex-col justify-between hover:border-indigo-500/50 transition-all group"
          >
            <div>
              {/* Header Profile Info */}
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition-all"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {worker.name}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      worker.status === 'Available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      worker.status === 'On Call' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      {worker.status}
                    </span>
                  </div>

                  <p className="text-xs text-indigo-400 font-semibold mt-0.5">{worker.category}</p>

                  <div className="flex items-center space-x-2 mt-1 text-xs">
                    <div className="flex items-center text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      <span>{worker.rating}</span>
                    </div>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 text-[11px]">{worker.reviewsCount} reviews</span>
                  </div>
                </div>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 text-[10px]">Completed Jobs</span>
                  <div className="text-sm font-extrabold text-white mt-0.5">{worker.completedJobs} Jobs</div>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                  <span className="text-slate-400 text-[10px]">Hourly Rate</span>
                  <div className="text-sm font-extrabold text-emerald-400 mt-0.5">{worker.hourlyRate}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Partner
              </span>

              <button
                onClick={() => setBookingWorker(worker)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/30 flex items-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Request Service</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking / Privacy-Conscious Modal */}
      {bookingWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setBookingWorker(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Service Request Dispatch Complete!</h3>
                <p className="text-xs text-slate-300">
                  {bookingWorker.name} has been notified for Apt {userProfile.flatNumber}. You will receive a notification when the job is accepted.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                  <img src={bookingWorker.avatar} alt={bookingWorker.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Request {bookingWorker.name}</h3>
                    <p className="text-xs text-indigo-400">{bookingWorker.category} • {bookingWorker.hourlyRate}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Service Task Details</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe the issue (e.g. leaking sink faucet in main bathroom)..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Time Slot</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Today at 3:00 PM or Tomorrow Morning"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 text-[11px] text-slate-400 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Privacy Note: Contact phone is securely encrypted and routed via HomeCircle dispatcher.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Send Direct Dispatch Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
