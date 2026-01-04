
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Recycle, ArrowRight, Mail, Lock, User, Building2, ChevronLeft } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState<'student' | 'industry' | 'lab'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: isSignup ? (role === 'student' ? fullName : orgName) : email.split('@')[0],
      email: email,
      role: role,
      isNew: isSignup
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[650px]">
        {/* Left Side Branding */}
        <div className="lg:w-1/2 bg-emerald-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full" 
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 blur-3xl -ml-32 -mb-32 rounded-full" 
          />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-12">
              <Recycle className="w-10 h-10" />
              <span className="text-2xl font-bold tracking-tight">UpCycle<span className="text-emerald-300">Connect</span></span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={isSignup ? 'signup-text' : 'login-text'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h1 className="text-4xl font-extrabold mb-6 leading-tight">
                  {isSignup ? "Join the Circular\nEconomy Hub." : "Empowering the\nCircular Economy."}
                </h1>
                <p className="text-emerald-100 text-lg leading-relaxed mb-8">
                  {isSignup 
                    ? "Start listing your industrial surplus or requesting materials for your next project today." 
                    : "Join the hyper-local movement to turn industrial surplus into student innovation. Connect, claim, and create."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-2xl border border-white/10">
              <h4 className="text-2xl font-bold">12k+</h4>
              <p className="text-xs text-emerald-200">Kilos Diverted</p>
            </div>
            <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-2xl border border-white/10">
              <h4 className="text-2xl font-bold">450+</h4>
              <p className="text-xs text-emerald-200">Active Donors</p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignup ? 'signup-form' : 'login-form'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  {isSignup ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-slate-500">
                  {isSignup ? "Fill in the details to get started." : "Sign in to manage your upcycling projects."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Account Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['student', 'industry', 'lab'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`py-2.5 rounded-xl text-[11px] font-bold capitalize transition-all border-2 ${
                          role === r 
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                          : 'border-slate-100 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {isSignup && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="relative"
                    >
                      {role === 'student' ? (
                        <>
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            required
                            type="text"
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-900"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </>
                      ) : (
                        <>
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            required
                            type="text"
                            placeholder="Organization / Lab Name"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-900"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                          />
                        </>
                      )}
                    </motion.div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="email"
                      placeholder="Email address"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-900"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="password"
                      placeholder="Password"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-900"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {!isSignup && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm text-slate-500 cursor-pointer">
                      <input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-500" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Forgot password?</a>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 shadow-xl shadow-slate-200"
                >
                  <span>{isSignup ? "Create Account" : "Sign In"}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-slate-500 text-sm hover:text-slate-800 transition-colors"
                >
                  {isSignup ? (
                    <span className="flex items-center justify-center space-x-1">
                      <ChevronLeft className="w-4 h-4" />
                      <span>Already have an account? <b>Log in</b></span>
                    </span>
                  ) : (
                    <span>Don't have an account? <b className="text-emerald-600">Create account</b></span>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Login;
