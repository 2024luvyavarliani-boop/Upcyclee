
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Package, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import { MaterialItem } from '../types';

interface CheckoutProps {
  item: MaterialItem;
  onCancel: () => void;
  onConfirm: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ item, onCancel, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClaim = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onConfirm(), 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12" />
        </motion.div>
        <h2 className="text-3xl font-bold text-slate-800">Resource Claimed!</h2>
        <p className="text-slate-500 max-w-md">You've successfully claimed {item.name}. Check your email for pickup instructions and your impact certificate.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <button 
        onClick={onCancel}
        className="flex items-center space-x-2 text-slate-500 hover:text-slate-800 mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Marketplace</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Confirm Pickup</h2>
            <p className="text-slate-500">This resource is provided free of charge by the donor to encourage upcycling. Please ensure you can transport the items.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
             <div className="flex items-start space-x-4">
               <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                 <MapPin className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-slate-800">Pickup Location</h4>
                 <p className="text-slate-600">{item.location.address}</p>
                 <p className="text-xs text-slate-400 mt-1">Contact: {item.donorName}</p>
               </div>
             </div>

             <div className="flex items-start space-x-4">
               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                 <Calendar className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-slate-800">Available Until</h4>
                 <p className="text-slate-600">Friday, Oct 25 • 4:00 PM</p>
                 <p className="text-xs text-slate-400 mt-1">Please arrive within the window.</p>
               </div>
             </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-800">Transportation Notes</h4>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600">
              This item weighs approx <strong>{item.weightKg}kg</strong>. We recommend {item.weightKg > 20 ? 'a small truck or van' : 'a standard car'} for transport.
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl -mr-16 -mt-16 rounded-full" />
          
          <h3 className="text-xl font-bold mb-8 relative z-10">Resource Summary</h3>
          
          <div className="space-y-6 mb-8 relative z-10">
            <div className="flex items-center space-x-4">
              <img src={item.imageUrl} className="w-20 h-20 rounded-2xl object-cover border border-white/10" alt={item.name} />
              <div>
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-white/60 text-sm">{item.category}</p>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Quantity</span>
                <span>{item.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Processing Fee</span>
                <span className="text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Environmental Credit</span>
                <span>+50 Points</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total Cost</span>
                <span className="text-2xl font-bold">$0.00</span>
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            onClick={handleClaim}
            className="w-full bg-emerald-500 hover:bg-emerald-400 py-4 rounded-2xl font-bold transition-all relative z-10 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Package className="w-5 h-5" />}
            <span>Confirm Claim</span>
          </button>
          
          <p className="text-center text-xs text-white/40 mt-6 relative z-10">By claiming, you agree to our terms of safe material handling.</p>
        </div>
      </div>
    </div>
  );
};

const Loader2: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export default Checkout;
