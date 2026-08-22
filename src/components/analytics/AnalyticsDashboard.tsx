import React from 'react';
import { useCommunity } from '../../context/CommunityContext';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, 
  Tooltip, XAxis, YAxis, Legend, CartesianGrid 
} from 'recharts';
import { 
  BarChart3, TrendingUp, PieChart as PieIcon, Activity, Clock, 
  Filter, CheckCircle2, AlertTriangle, Users, Car, HeartHandshake, Sparkles 
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { complaints, analyticsFilters, setAnalyticsFilters, ridePools, helpPosts, lostFoundItems } = useCommunity();

  // Filter complaints based on active filters
  const filteredComplaints = complaints.filter(c => {
    const matchesBlock = analyticsFilters.block === 'all' || c.block === analyticsFilters.block;
    const matchesCat = analyticsFilters.category === 'all' || c.category === analyticsFilters.category;
    return matchesBlock && matchesCat;
  });

  // Calculate live statistics
  const totalCount = filteredComplaints.length;
  const resolvedCount = filteredComplaints.filter(c => c.status === 'Resolved').length;
  const pendingCount = totalCount - resolvedCount;
  const resolutionRate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 100;

  // Chart 1 Data: Complaints by Category
  const categoryCounts: Record<string, number> = {
    Water: 0, Electricity: 0, Parking: 0, Security: 0, Maintenance: 0, Cleanliness: 0, Noise: 0
  };
  filteredComplaints.forEach(c => {
    if (categoryCounts[c.category] !== undefined) {
      categoryCounts[c.category] += 1;
    }
  });
  const categoryChartData = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    count: categoryCounts[cat]
  }));

  // Chart 2 Data: Resolution Trend Over 4 Weeks
  const trendChartData = [
    { week: 'Week 1', received: 12, resolved: 10 },
    { week: 'Week 2', received: 15, resolved: 14 },
    { week: 'Week 3', received: 18, resolved: 16 },
    { week: 'Week 4', received: totalCount, resolved: resolvedCount }
  ];

  // Chart 3 Data: Status Distribution
  const statusCounts = {
    Reported: filteredComplaints.filter(c => c.status === 'Reported').length,
    Acknowledged: filteredComplaints.filter(c => c.status === 'Acknowledged').length,
    InProgress: filteredComplaints.filter(c => c.status === 'In Progress').length,
    Resolved: resolvedCount
  };

  const pieData = [
    { name: 'Reported', value: statusCounts.Reported, color: '#ef4444' },
    { name: 'Acknowledged', value: statusCounts.Acknowledged, color: '#f59e0b' },
    { name: 'In Progress', value: statusCounts.InProgress, color: '#06b6d4' },
    { name: 'Resolved', value: statusCounts.Resolved, color: '#10b981' }
  ].filter(d => d.value > 0);

  // Chart 4 Data: Community Participation Rate Across Features
  const participationChartData = [
    { feature: 'Complaints', count: complaints.length, color: '#6366f1' },
    { feature: 'Help Posts', count: helpPosts.length, color: '#10b981' },
    { feature: 'Ride Pooling', count: ridePools.length, color: '#06b6d4' },
    { feature: 'Lost & Found', count: lostFoundItems.length, color: '#a855f7' },
    { feature: 'Discussions', count: 24, color: '#f59e0b' }
  ];

  // Chart 5 Data: Resolution Performance (Avg Days to resolve)
  const performanceChartData = [
    { category: 'Water', avgDays: 1.8 },
    { category: 'Electricity', avgDays: 1.2 },
    { category: 'Parking', avgDays: 3.5 },
    { category: 'Security', avgDays: 0.9 },
    { category: 'Maintenance', avgDays: 2.4 },
    { category: 'Cleanliness', avgDays: 1.5 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/70 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Community Analytics Dashboard</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time management intelligence transforming community activity into actionable insights.
          </p>
        </div>

        {/* Dynamic Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700 text-xs">
          <span className="text-slate-400 px-2 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </span>

          {/* Date range filter */}
          <select
            value={analyticsFilters.dateRange}
            onChange={(e) => setAnalyticsFilters({ dateRange: e.target.value as any })}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="3months">Last 3 Months</option>
          </select>

          {/* Block filter */}
          <select
            value={analyticsFilters.block}
            onChange={(e) => setAnalyticsFilters({ block: e.target.value })}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none"
          >
            <option value="all">All Blocks</option>
            <option value="Block A">Block A</option>
            <option value="Block B">Block B</option>
            <option value="Block C">Block C</option>
            <option value="Block D">Block D</option>
            <option value="Villa Sector">Villa Sector</option>
          </select>
        </div>
      </div>

      {/* Analytics KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Complaints</span>
          <div className="text-2xl font-extrabold text-white mt-1">{totalCount}</div>
          <span className="text-[10px] text-slate-400">Logged issues</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-emerald-400">Resolved Items</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">{resolvedCount}</div>
          <span className="text-[10px] text-emerald-400 font-semibold">{resolutionRate}% efficiency</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-amber-400">Pending Issues</span>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">{pendingCount}</div>
          <span className="text-[10px] text-slate-400">In work queue</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-cyan-400">Avg Resolution</span>
          <div className="text-2xl font-extrabold text-cyan-300 mt-1">1.8 Days</div>
          <span className="text-[10px] text-cyan-400 font-semibold">-0.4 days vs Q2</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-purple-400">Top Issue Category</span>
          <div className="text-xl font-extrabold text-purple-300 mt-1 truncate">Water</div>
          <span className="text-[10px] text-slate-400">38% of total logs</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/70 p-4 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-indigo-400">Participation</span>
          <div className="text-2xl font-extrabold text-indigo-300 mt-1">88%</div>
          <span className="text-[10px] text-indigo-400 font-semibold">Active residents</span>
        </div>

      </div>

      {/* Charts Row 1: Category Bar & Trend Line */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Complaints by Category */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-3xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Chart 1 — Complaints by Category</h3>
            </div>
            <span className="text-[10px] text-slate-400">Live category breakdown</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Resolution Trend Line */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-3xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Chart 2 — Complaint Resolution Trend</h3>
            </div>
            <span className="text-[10px] text-slate-400">Received vs Resolved over 4 Weeks</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="received" stroke="#ef4444" strokeWidth={3} name="Received" />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Charts Row 2: Status Donut, Participation Bar, Performance Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Chart 3: Status Donut */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-3xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
            <div className="flex items-center space-x-2">
              <PieIcon className="w-5 h-5 text-amber-400" />
              <h3 className="text-xs font-bold text-white">Chart 3 — Status Distribution</h3>
            </div>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Community Participation */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-3xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xs font-bold text-white">Chart 4 — Feature Participation</h3>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participationChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                <YAxis dataKey="feature" type="category" stroke="#94a3b8" fontSize={10} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Resolution Performance */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-3xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <h3 className="text-xs font-bold text-white">Chart 5 — Resolution Days</h3>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="avgDays" fill="#a855f7" radius={[6, 6, 0, 0]} name="Avg Resolution Days" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
