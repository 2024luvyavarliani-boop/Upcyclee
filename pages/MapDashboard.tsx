
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Layers, Info } from 'lucide-react';
import { MaterialItem } from '../types';

interface MapDashboardProps {
  items: MaterialItem[];
}

const MapDashboard: React.FC<MapDashboardProps> = ({ items }) => {
  const [selectedPin, setSelectedPin] = useState<MaterialItem | null>(null);

  return (
    <div className="h-[calc(100vh-10rem)] relative rounded-3xl overflow-hidden bg-slate-200 border border-slate-300">
      {/* Fake Map UI */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-74.006,40.7128,12,0/800x600?access_token=pk.eyJ1IjoiYWFyb25tZWRlciIsImEiOiJjazZ4Y3h6bGQwMTdzM21vNHh6eXhhN3F6In0.6gQ_S4UoYvL8X_Z-qL6m_g')` }}
      />
      
      {/* Grid Overlay for feel */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Pins */}
      {items.map((item, idx) => (
        <motion.button
          key={item.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => setSelectedPin(item)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ 
            left: `${30 + (idx * 15) % 40}%`, 
            top: `${20 + (idx * 20) % 60}%` 
          }}
        >
          <div className="relative">
             <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
               <MapPin className="w-5 h-5" />
             </div>
             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white px-2 py-1 rounded text-[10px] font-bold shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
               {item.name}
             </div>
          </div>
        </motion.button>
      ))}

      {/* Map Controls */}
      <div className="absolute top-6 right-6 flex flex-col space-y-2">
        <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-100 flex flex-col space-y-2">
          <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-600"><Layers className="w-5 h-5" /></button>
          <button className="p-2 hover:bg-slate-50 rounded-lg text-emerald-600"><Navigation className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Info Panel */}
      {selectedPin && (
        <motion.div 
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:top-6 lg:bottom-auto w-auto lg:w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-10"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg text-slate-800">{selectedPin.name}</h3>
            <button onClick={() => setSelectedPin(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
          </div>
          <img src={selectedPin.imageUrl} className="w-full h-32 object-cover rounded-2xl mb-4" alt={selectedPin.name} />
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2 text-slate-500 text-sm">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>{selectedPin.location.address}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500 text-sm">
              <Info className="w-4 h-4 text-emerald-500" />
              <span>{selectedPin.quantity} available</span>
            </div>
          </div>
          <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
            View Details
          </button>
        </motion.div>
      )}

      {/* Search Overlay */}
      <div className="absolute top-6 left-6">
        <div className="bg-white shadow-lg border border-slate-100 rounded-2xl px-4 py-2 flex items-center space-x-3 w-64">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-sm font-medium text-slate-600">Active area: Campus Center</span>
        </div>
      </div>
    </div>
  );
};

export default MapDashboard;
