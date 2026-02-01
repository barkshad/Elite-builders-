
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Dashboard from './pages/Dashboard';
import CartDrawer from './components/CartDrawer';
import { UserRole, CartItem, Product } from './types';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('BUYER');
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onShopNow={() => setCurrentPage('shop')} onNavigate={setCurrentPage} />;
      case 'shop':
        return <Shop onAddToCart={addToCart} />;
      case 'dashboard':
        return <Dashboard role={role} />;
      case 'suppliers':
        return (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Verified Suppliers</h2>
            <p className="text-slate-500 mt-2">Connect with our network of audited material providers.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Suppliers list would go here */}
               <div className="p-8 bg-white border border-slate-200 rounded-2xl">Bamburi Direct</div>
               <div className="p-8 bg-white border border-slate-200 rounded-2xl">Devki Steel</div>
               <div className="p-8 bg-white border border-slate-200 rounded-2xl">Elite Hardware</div>
            </div>
          </div>
        );
      default:
        return <Home onShopNow={() => setCurrentPage('shop')} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
      <Navbar 
        role={role} 
        onRoleChange={setRole} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        onNavigate={setCurrentPage}
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <footer className="bg-slate-900 text-white py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-xl font-black tracking-tight">ELITE<span className="text-orange-500">BUILDERS</span></span>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              Transforming the construction supply chain through transparency and verified logistics.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><button onClick={() => setCurrentPage('shop')}>Shop Materials</button></li>
              <li><button onClick={() => setCurrentPage('suppliers')}>Suppliers</button></li>
              <li><button>Price Indices</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">Support</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><button>Help Center</button></li>
              <li><button>Logistics Support</button></li>
              <li><button>Contact Us</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">Account</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><button onClick={() => setCurrentPage('dashboard')}>Dashboard</button></li>
              <li><button>Supplier Portal</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} Elite Builders Marketplace. All rights reserved. Built for professional builders.
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
      />
    </div>
  );
};

export default App;
