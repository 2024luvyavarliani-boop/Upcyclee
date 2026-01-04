
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Cloud, Trash2, Award, Zap } from 'lucide-react';

const categoryData = [
  { name: 'Metal', value: 400, color: '#10b981' },
  { name: 'Timber', value: 300, color: '#3b82f6' },
  { name: 'Electronics', value: 200, color: '#f59e0b' },
  { name: 'Chemicals', value: 100, color: '#ef4444' },
];

const timelineData = [
  { month: 'Jan', co2: 120 },
  { month: 'Feb', co2: 180 },
  { month: 'Mar', co2: 150 },
  { month: 'Apr', co2: 240 },
  { month: 'May', co2: 290 },
  { month: 'Jun', co2: 320 },
];

const ImpactAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-2">CO2 Savings Timeline</h3>
          <p className="text-sm text-slate-500 mb-8">Cumulative kg of CO2 emissions prevented through upcycling.</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip />
                <Area type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Material Diversion</h3>
          <p className="text-sm text-slate-500 mb-8">Breakdown of waste diverted by category.</p>
          <div className="h-72 flex flex-col md:flex-row items-center">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col space-y-3 p-4">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm font-medium text-slate-600">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between">
           <Cloud className="w-10 h-10 text-emerald-400 mb-4" />
           <div>
             <h4 className="text-3xl font-bold">1.2 Tons</h4>
             <p className="text-white/60">Total CO2 Reduced</p>
           </div>
        </div>
        <div className="bg-emerald-600 rounded-3xl p-8 text-white flex flex-col justify-between">
           <Award className="w-10 h-10 text-white mb-4" />
           <div>
             <h4 className="text-3xl font-bold">Top 5%</h4>
             <p className="text-emerald-100">Global Upcycler Rank</p>
           </div>
        </div>
        <div className="bg-blue-600 rounded-3xl p-8 text-white flex flex-col justify-between">
           <Zap className="w-10 h-10 text-blue-200 mb-4" />
           <div>
             <h4 className="text-3xl font-bold">15 kWh</h4>
             <p className="text-blue-100">Energy Embodiment Saved</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactAnalytics;
