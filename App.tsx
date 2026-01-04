
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import MapDashboard from './pages/MapDashboard';
import ImpactAnalytics from './pages/ImpactAnalytics';
import AddItem from './pages/AddItem';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import { MaterialItem, MaterialCategory } from './types';

const INITIAL_MATERIALS: MaterialItem[] = [
  {
    id: '1',
    name: 'Aluminum Extrusion Scraps',
    category: MaterialCategory.METAL,
    description: 'High-grade 6063 aluminum scraps from a fabrication project. Pieces vary from 30cm to 1m.',
    quantity: 'approx 25kg',
    weightKg: 25,
    location: { lat: 40.7128, lng: -74.006, address: 'Engineering Hall, Main Campus' },
    imageUrl: 'https://images.unsplash.com/photo-1558363352-03d350901e13?auto=format&fit=crop&q=80&w=400',
    donorName: 'Dr. Sarah Wilson',
    postedAt: '2h ago'
  },
  {
    id: '2',
    name: 'Borosilicate Glass Tubes',
    category: MaterialCategory.LAB_EQUIPMENT,
    description: 'Surplus laboratory glassware. Excellent for student chemistry projects or artistic blowing.',
    quantity: '12 units',
    weightKg: 4,
    location: { lat: 40.7138, lng: -74.007, address: 'Bio-Chem Lab, West Wing' },
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400',
    donorName: 'Chemistry Dept',
    postedAt: '5h ago'
  },
  {
    id: '3',
    name: 'Pine Timber Offcuts',
    category: MaterialCategory.TIMBER,
    description: 'Clean pine wood offcuts from furniture workshop. Various thicknesses and lengths.',
    quantity: '1 large bin',
    weightKg: 45,
    location: { lat: 40.7118, lng: -74.005, address: 'Industrial Arts Workshop' },
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400',
    donorName: 'Workshop Manager',
    postedAt: '1d ago'
  },
  {
    id: '4',
    name: 'Circuit Board Components',
    category: MaterialCategory.ELECTRONICS,
    description: 'Unused capacitors, resistors, and empty breadboards from a terminated project.',
    quantity: '2 small boxes',
    weightKg: 2,
    location: { lat: 40.7148, lng: -74.008, address: 'Robotics Lab' },
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
    donorName: 'RoboClub Admin',
    postedAt: '3h ago'
  }
];

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [materials, setMaterials] = useState<MaterialItem[]>(INITIAL_MATERIALS);
  const [selectedItem, setSelectedItem] = useState<MaterialItem | null>(null);

  // Persistence (Simulated Database)
  useEffect(() => {
    const savedUser = localStorage.getItem('upcycle_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('upcycle_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('upcycle_user');
  };

  const handleAddItem = (newItem: MaterialItem) => {
    setMaterials([newItem, ...materials]);
    setActiveTab('marketplace');
  };

  const handleConfirmClaim = () => {
    if (selectedItem) {
      setMaterials(materials.filter(m => m.id !== selectedItem.id));
      setSelectedItem(null);
      setActiveTab('impact');
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      activeTab={selectedItem ? 'checkout' : activeTab} 
      setActiveTab={setActiveTab} 
      user={user} 
      onLogout={handleLogout}
    >
      {selectedItem ? (
        <Checkout 
          item={selectedItem} 
          onCancel={() => setSelectedItem(null)} 
          onConfirm={handleConfirmClaim}
        />
      ) : (
        <>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'marketplace' && <Marketplace items={materials} onSelectItem={setSelectedItem} />}
          {activeTab === 'map' && <MapDashboard items={materials} />}
          {activeTab === 'impact' && <ImpactAnalytics />}
          {activeTab === 'add-item' && <AddItem onAdd={handleAddItem} />}
          {activeTab === 'requests' && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
               <h3 className="text-xl font-bold text-slate-800">Request Board coming soon!</h3>
               <p className="text-slate-500">Feature for students to post requirements is in development.</p>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
