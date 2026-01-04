
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Wand2, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  Leaf, 
  MapPin, 
  Weight, 
  Package,
  CheckCircle2,
  Camera,
  Layers
} from 'lucide-react';
import { MaterialCategory, MaterialItem } from '../types';
import { suggestCategory, getImpactEstimation } from '../services/geminiService';

interface AddItemProps {
  onAdd: (item: MaterialItem) => void;
}

const AddItem: React.FC<AddItemProps> = ({ onAdd }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: '' as MaterialCategory | '',
    description: '',
    quantity: '',
    weightKg: 0,
    address: '',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600'
  });

  const [aiAnalysis, setAiAnalysis] = useState<{ category?: string; impact?: any } | null>(null);

  const handleAiAnalysis = async () => {
    if (!formData.description) return;
    setLoading(true);
    try {
      const catSuggestion = await suggestCategory(formData.description);
      const impact = await getImpactEstimation(formData.name || 'Material', catSuggestion.category, formData.weightKg || 5);
      
      setAiAnalysis({ category: catSuggestion.category, impact });
      setFormData(prev => ({ 
        ...prev, 
        category: catSuggestion.category as MaterialCategory 
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: MaterialItem = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      category: (formData.category || MaterialCategory.METAL) as MaterialCategory,
      postedAt: 'Just now',
      location: { lat: 40.7128, lng: -74.0060, address: formData.address || 'Campus Central' },
      donorName: 'Current User',
      imageUrl: formData.imageUrl
    };
    onAdd(newItem);
  };

  const progress = (step / 3) * 100;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Form Section */}
        <div className="flex-1 w-full">
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            {/* Progress Bar */}
            <div className="h-1.5 bg-slate-100">
              <motion.div 
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "circOut" }}
              />
            </div>

            <div className="p-8 md:p-12">
              <div className="mb-8">
                <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest">Step {step} of 3</span>
                <h2 className="text-3xl font-bold text-slate-800 mt-1">
                  {step === 1 && "What are you sharing?"}
                  {step === 2 && "The details matter"}
                  {step === 3 && "Finalize & Impact"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Material Name</label>
                        <input 
                          required
                          type="text" 
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400 text-emerald-900"
                          placeholder="e.g. Industrial Copper Wire"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Format / Unit</label>
                          <div className="relative">
                            <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                              required
                              type="text" 
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-emerald-900"
                              placeholder="e.g. 5 Rolls"
                              value={formData.quantity}
                              onChange={e => setFormData({...formData, quantity: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Estimated Weight (kg)</label>
                          <div className="relative">
                            <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                              type="number" 
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-emerald-900"
                              placeholder="10"
                              value={formData.weightKg || ''}
                              onChange={e => setFormData({...formData, weightKg: Number(e.target.value)})}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Description & Condition</label>
                        <textarea 
                          rows={4}
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none text-emerald-900"
                          placeholder="Tell potential users about the quality, origin, or suggested reuse projects..."
                          value={formData.description}
                          onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                        <button 
                          type="button"
                          onClick={handleAiAnalysis}
                          disabled={loading || !formData.description}
                          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-bold text-sm transition-colors group"
                        >
                          <div className="p-1.5 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                          </div>
                          <span>AI: Auto-categorize & Impact</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Visual Evidence</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-emerald-400 hover:text-emerald-500 transition-all cursor-pointer group">
                            <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold">Add Photo</span>
                          </div>
                          <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative group">
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button type="button" className="text-white text-xs font-bold bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">Change</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {aiAnalysis && (
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="p-5 bg-emerald-50 rounded-[1.5rem] border border-emerald-100 relative overflow-hidden group"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                             <Leaf className="w-16 h-16 text-emerald-600" />
                          </div>
                          <div className="relative z-10 flex items-start space-x-4">
                            <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-200">
                              <Leaf className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="font-bold text-emerald-900">AI Environmental Insight</h4>
                              <p className="text-sm text-emerald-700 leading-relaxed mt-1">{aiAnalysis.impact.impactStatement}</p>
                              <div className="flex items-center space-x-2 mt-3">
                                <span className="px-2 py-0.5 bg-white rounded-full text-[10px] font-bold text-emerald-600 border border-emerald-100">
                                  {aiAnalysis.impact.co2Saved}kg CO2 PREVENTED
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Category</label>
                          <div className="relative">
                            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <select 
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none text-emerald-900"
                              value={formData.category}
                              onChange={e => setFormData({...formData, category: e.target.value as MaterialCategory})}
                            >
                              <option value="">Choose category...</option>
                              {Object.values(MaterialCategory).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Pickup Location</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                              type="text" 
                              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-emerald-900"
                              placeholder="e.g. Science Block, Room 402"
                              value={formData.address}
                              onChange={e => setFormData({...formData, address: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-3">
                         <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                         <p className="text-sm text-slate-600">I confirm that the materials are safe for redistribution.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                  {step > 1 ? (
                    <button 
                      type="button" 
                      onClick={() => setStep(s => s - 1)}
                      className="flex items-center space-x-2 text-slate-400 hover:text-slate-800 font-bold transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : <div />}

                  <div className="flex items-center space-x-4">
                    {step < 3 ? (
                      <button 
                        type="button" 
                        disabled={step === 1 && !formData.name}
                        onClick={() => setStep(s => s + 1)}
                        className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center space-x-3 shadow-xl shadow-slate-200 disabled:opacity-50 disabled:shadow-none"
                      >
                        <span>Next Step</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button 
                        type="submit"
                        disabled={!formData.category}
                        className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all active:scale-95 disabled:opacity-50"
                      >
                        Publish Listing
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Live Preview Section */}
        <div className="lg:w-80 w-full sticky top-24">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Live Preview</h3>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">Real-time</span>
          </div>
          
          <motion.div 
            layout
            className="bg-white rounded-[1.5rem] overflow-hidden shadow-2xl border border-slate-100 group perspective-1000"
          >
            <motion.div 
              whileHover={{ rotateY: 5, rotateX: -5 }}
              className="transition-transform duration-300"
            >
              <div className="relative h-44 bg-slate-100">
                <img src={formData.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Preview" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-emerald-600 shadow-sm border border-emerald-100">
                  {formData.category || 'CATEGORY'}
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-slate-800 truncate">{formData.name || 'Material Name'}</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 h-8">
                  {formData.description || 'Description will appear here as you type...'}
                </p>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <Weight className="w-3 h-3" />
                    <span className="text-[10px] font-bold">{formData.weightKg || 0} kg</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] font-bold truncate max-w-[80px]">{formData.address || 'Location'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-6 p-5 bg-slate-900 rounded-[1.5rem] text-white">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Platform Tip</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Detailed descriptions attract <span className="text-white font-bold">2.5x more</span> claims. Be sure to mention if any specialized tools are needed for transport.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
