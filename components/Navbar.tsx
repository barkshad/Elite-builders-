
import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Search, HardHat } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  cartCount: number;
  onToggleCart: () => void;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, onRoleChange, cartCount, onToggleCart, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <HardHat className="w-8 h-8 text-orange-500 mr-2" />
            <span className="text-xl font-extrabold tracking-tight">ELITE<span className="text-orange-500">BUILDERS</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('shop')} className="hover:text-orange-400 transition-colors">Shop Materials</button>
            <button onClick={() => onNavigate('suppliers')} className="hover:text-orange-400 transition-colors">Suppliers</button>
            <button onClick={() => onNavigate('tracking')} className="hover:text-orange-400 transition-colors">Track Order</button>
            
            <div className="flex items-center bg-slate-800 rounded-full px-4 py-1.5 border border-slate-700">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search materials..." 
                className="bg-transparent border-none outline-none text-sm w-48 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <select 
                value={role} 
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="bg-slate-800 text-xs text-white border border-slate-700 rounded-md px-2 py-1 outline-none"
              >
                <option value="BUYER">Buyer View</option>
                <option value="SUPPLIER">Supplier View</option>
                <option value="ADMIN">Admin View</option>
              </select>
            </div>
            
            <button onClick={onToggleCart} className="relative p-2 hover:bg-slate-800 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900">
                  {cartCount}
                </span>
              )}
            </button>

            <button onClick={() => onNavigate('dashboard')} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <User className="w-6 h-6" />
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-slate-800">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 pb-4">
          <div className="px-2 pt-2 space-y-1">
            <button onClick={() => { onNavigate('shop'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 w-full text-left">Shop Materials</button>
            <button onClick={() => { onNavigate('suppliers'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 w-full text-left">Suppliers</button>
            <button onClick={() => { onNavigate('tracking'); setIsOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 w-full text-left">Track Order</button>
            <div className="p-3">
              <span className="text-xs text-slate-400 block mb-2">Switch View</span>
              <div className="flex space-x-2">
                <button onClick={() => onRoleChange('BUYER')} className={`px-3 py-1 text-xs rounded-full ${role === 'BUYER' ? 'bg-orange-500' : 'bg-slate-700'}`}>Buyer</button>
                <button onClick={() => onRoleChange('SUPPLIER')} className={`px-3 py-1 text-xs rounded-full ${role === 'SUPPLIER' ? 'bg-orange-500' : 'bg-slate-700'}`}>Supplier</button>
                <button onClick={() => onRoleChange('ADMIN')} className={`px-3 py-1 text-xs rounded-full ${role === 'ADMIN' ? 'bg-orange-500' : 'bg-slate-700'}`}>Admin</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
