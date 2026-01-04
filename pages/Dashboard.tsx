
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Leaf, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Mon', kg: 45 },
  { name: 'Tue', kg: 52 },
  { name: 'Wed', kg: 38 },
  { name: 'Thu', kg: 65 },
  { name: 'Fri', kg: 48 },
  { name: 'Sat', kg: 24 },
  { name: 'Sun', kg: 15 },
];

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Waste Diverted', value: '1,284 kg', icon: Package, color: 'bg-blue-500' },
    { label: 'Carbon Saved', value: '3,210 kg', icon: Leaf, color: 'bg-emerald-500' },
    { label: 'Active Users', value: '482', icon: Users, color: 'bg-amber-500' },
    { label: 'Impact Growth', value: '+12.5%', icon: TrendingUp, color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4 hover:shadow-md transition-shadow cursor-default"
          >
            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-slate-800`}>
              <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Weekly Recycling Volume</h3>
            <select className="text-sm border-none bg-slate-50 rounded-lg p-2 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="kg" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#10b981' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Impact Spotlight</h3>
          <div className="space-y-6">
            <div className="relative h-40 bg-emerald-600 rounded-xl overflow-hidden flex flex-col justify-end p-4 text-white">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400" 
                className="absolute inset-0 object-cover opacity-40" 
                alt="Impact"
              />
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-wider opacity-80">Top Contributor</p>
                <h4 className="text-lg font-bold">Horizon Lab Systems</h4>
                <p className="text-sm opacity-90">Saved 420kg of glass this month</p>
              </div>
            </div>
            
            <div className="space-y-4">
               <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">JD</div>
                   <p className="text-sm font-medium text-slate-700">James D. requested Copper</p>
                 </div>
                 <span className="text-xs text-slate-400">2m ago</span>
               </div>
               <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">MT</div>
                   <p className="text-sm font-medium text-slate-700">Metro Ind. listed Timber</p>
                 </div>
                 <span className="text-xs text-slate-400">15m ago</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
