
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Map as MapIcon, 
  ClipboardList, 
  BarChart3, 
  PlusCircle, 
  LogOut,
  Menu,
  X,
  Recycle,
  Key,
  ShieldAlert
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    checkKeyStatus();
  }, []);

  const checkKeyStatus = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleKeySelect = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Proceed assuming success as per guidelines
      setHasKey(true);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'marketplace', label: 'Marketplace', icon: Package },
    { id: 'map', label: 'Inventory Map', icon: MapIcon },
    { id: 'requests', label: 'Request Board', icon: ClipboardList },
    { id: 'impact', label: 'Impact Analytics', icon: BarChart3 },
    { id: 'add-item', label: 'List Material', icon: PlusCircle },
  ];

  const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
  }`;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="p-6 flex items-center space-x-2 text-emerald-600">
          <Recycle className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight text-slate-800">UpCycle<span className="text-emerald-500">Connect</span></span>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-emerald-50 text-emerald-600 font-semibold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* API Key Management */}
        <div className="mt-6 px-4">
          <button 
            onClick={handleKeySelect}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all group ${
              hasKey 
                ? 'bg-slate-50 border-slate-100 text-slate-600 hover:border-emerald-200' 
                : 'bg-amber-50 border-amber-200 text-amber-700 animate-pulse'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Key className={`w-4 h-4 ${hasKey ? 'text-slate-400' : 'text-amber-500'}`} />
              <span className="text-xs font-bold uppercase tracking-wider">AI Billing</span>
            </div>
            {!hasKey && <ShieldAlert className="w-4 h-4 text-amber-500" />}
          </button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-2 text-[10px] text-center text-slate-400 hover:text-emerald-500 underline"
          >
            Google Cloud Billing Docs
          </a>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 bg-white">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shadow-inner">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-700 truncate">{user?.name}</p>
              <p className="text-[10px] text-slate-400 truncate uppercase font-bold tracking-widest">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-semibold">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-30">
          <button 
            className="lg:hidden p-2 text-slate-500"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-slate-800 capitalize tracking-tight">
              {activeTab.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
             <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-widest">
               {user?.role}
             </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
