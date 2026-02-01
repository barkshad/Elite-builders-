
import React, { useState, useEffect } from 'react';
import { UserRole, CartItem, Product, Category, Order } from './types';
import { PRODUCTS, CATEGORIES } from './data/mockData';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Dashboard from './pages/Dashboard';
import CartDrawer from './components/CartDrawer';
// Fixed: Added 'X' to the lucide-react imports
import { Truck, ShieldCheck, Clock, Star, MessageSquare, X } from 'lucide-react';
import { getBuilderAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('BUYER');
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;
    setIsAiLoading(true);
    const response = await getBuilderAdvice(aiMessage);
    setAiResponse(response || "I couldn't process that. Try asking about material quantities for a specific room size.");
    setIsAiLoading(false);
    setAiMessage('');
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
        return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Suppliers Directory</h2><p className="mt-4 text-slate-600">Explore verified construction partners across East Africa.</p></div>;
      case 'tracking':
        return <div className="p-8 text-center"><h2 className="text-2xl font-bold">Track Your Order</h2><p className="mt-4 text-slate-600">Enter your order ID to see real-time delivery status.</p></div>;
      default:
        return <Home onShopNow={() => setCurrentPage('shop')} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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

      <footer className="bg-slate-900 text-slate-300 py-12 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-xl font-bold mb-4">ELITE BUILDERS</h3>
            <p className="text-sm max-w-sm mb-6">
              The premier digital platform for construction materials in East Africa. 
              We empower builders by simplifying sourcing, logistics, and payments.
            </p>
            <div className="flex space-x-4">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <span className="text-sm">Verified Suppliers</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white">Shop Materials</button></li>
              <li><button onClick={() => setCurrentPage('suppliers')} className="hover:text-white">Our Suppliers</button></li>
              <li><button onClick={() => setCurrentPage('tracking')} className="hover:text-white">Order Tracking</button></li>
              <li><button className="hover:text-white">Become a Supplier</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-white">Terms of Service</button></li>
              <li><button className="hover:text-white">Privacy Policy</button></li>
              <li><button className="hover:text-white">Contact Us</button></li>
              <li><button className="hover:text-white">FAQs</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} Elite Builders Ltd. All rights reserved.
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
      />

      {/* AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!aiAssistantOpen ? (
          <button 
            onClick={() => setAiAssistantOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center space-x-2"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="hidden md:inline font-bold">Ask AI Expert</span>
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 overflow-hidden border border-slate-200">
            <div className="bg-slate-900 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold text-sm">Elite AI Assistant</h3>
              </div>
              <button onClick={() => setAiAssistantOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-96 p-4 overflow-y-auto bg-slate-50 flex flex-col space-y-4">
              {aiResponse ? (
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-sm">
                  <p className="whitespace-pre-wrap">{aiResponse}</p>
                </div>
              ) : (
                <div className="text-slate-500 text-center mt-12 text-sm">
                  <Star className="w-8 h-8 text-orange-200 mx-auto mb-2" />
                  <p>Ask me about material quantities, project costs, or construction tips!</p>
                </div>
              )}
              {isAiLoading && (
                <div className="bg-slate-200 animate-pulse h-12 w-3/4 rounded-xl"></div>
              )}
            </div>
            <form onSubmit={handleAskAi} className="p-4 border-t border-slate-200 flex space-x-2">
              <input 
                type="text" 
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                placeholder="How many bags for 100sqm?" 
                className="flex-grow bg-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button type="submit" disabled={isAiLoading} className="bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-bold disabled:opacity-50">
                Ask
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
