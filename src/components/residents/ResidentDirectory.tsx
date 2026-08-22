import React, { useState } from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { 
  Users, Search, ShieldAlert, ShieldCheck, Eye, EyeOff, 
  Building, Phone, Mail, Calendar, Filter 
} from 'lucide-react';

export const ResidentDirectory: React.FC = () => {
  const { residents, userRole } = useCommunity();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const blocks = ['All', 'Block A', 'Block B', 'Block C', 'Block D', 'Villa Sector'];

  const filteredResidents = residents.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.flatNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBlock = selectedBlock === 'All' || r.block === selectedBlock;
    const matchesStatus = selectedStatus === 'All' || r.ownerStatus === selectedStatus;

    return matchesSearch && matchesBlock && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Resident & Tenant Roster</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Community registry of verified apartment owners and tenants across Crestview Heights.
          </p>
        </div>

        {/* Role-Based Access Indicator */}
        <div className={`flex items-center space-x-2 text-xs px-3.5 py-2 rounded-xl border font-semibold ${
          userRole === 'admin'
            ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
            : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
        }`}>
          {userRole === 'admin' ? (
            <>
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Admin Mode: Full Contact Privacy Unlocked</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4 text-indigo-400" />
              <span>Resident Mode: Sensitive Contacts Protected</span>
            </>
          )}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by resident name or flat #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Block filter */}
          <div>
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {blocks.map(b => (
                <option key={b} value={b}>{b === 'All' ? 'All Blocks' : b}</option>
              ))}
            </select>
          </div>

          {/* Owner/Tenant Status */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Residency Types</option>
              <option value="Owner">Owners Only</option>
              <option value="Tenant">Tenants Only</option>
            </select>
          </div>

        </div>
      </div>

      {/* Resident Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResidents.map((res) => (
          <div 
            key={res.id}
            className="bg-slate-800/80 border border-slate-700/70 rounded-3xl p-5 shadow-lg space-y-4 hover:border-indigo-500/50 transition-all group"
          >
            <div className="flex items-start space-x-3">
              {res.avatar ? (
                <img src={res.avatar} alt={res.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30" />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-lg">
                  {res.name[0]}
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {res.name}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    res.ownerStatus === 'Owner' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {res.ownerStatus}
                  </span>
                </div>
                <p className="text-xs text-indigo-400 font-semibold mt-0.5">
                  Flat {res.flatNumber} ({res.block})
                </p>
              </div>
            </div>

            {/* Resident Details */}
            <div className="space-y-2 text-xs text-slate-300 border-t border-slate-700/60 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Occupancy Status:</span>
                <span className="font-semibold text-emerald-400">{res.occupancyStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Move-in Date:</span>
                <span className="font-medium text-slate-200">{res.moveInDate}</span>
              </div>

              {/* Protected Phone / Emergency Contacts */}
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-semibold">Emergency Contact:</span>
                  {userRole === 'admin' ? (
                    <span className="text-purple-300 font-bold flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {res.emergencyContactName}
                    </span>
                  ) : (
                    <span className="text-slate-500 italic flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Confidential (Admin Only)
                    </span>
                  )}
                </div>

                {userRole === 'admin' && (
                  <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800 flex items-center justify-between">
                    <span>Phone: {res.emergencyContactPhone}</span>
                    <span>Email: {res.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
