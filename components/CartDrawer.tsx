
import React from 'react';
import { X, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove }) => {
  const subtotal = items.reduce((sum, item) => {
    // Basic bulk pricing calculation
    let price = item.product.price;
    if (item.product.bulkPricing) {
      const bestPrice = [...item.product.bulkPricing]
        .sort((a, b) => b.quantity - a.quantity)
        .find(bp => item.quantity >= bp.quantity);
      if (bestPrice) price = bestPrice.price;
    }
    return sum + (price * item.quantity);
  }, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center">
              <ShoppingBag className="w-6 h-6 mr-2 text-orange-500" />
              Your Construction Cart
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <p className="font-medium">Your cart is empty</p>
                <button onClick={onClose} className="mt-4 text-orange-600 font-bold hover:underline">Start Shopping</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex space-x-4 animate-fadeIn">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover border border-slate-200" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-slate-800 text-sm">{item.product.name}</h3>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{item.product.supplierName}</p>
                    <div className="flex justify-between items-end mt-2">
                      <div className="text-xs">
                        <span className="font-bold text-slate-900">{item.quantity}</span> {item.product.unit} @ 
                        <span className="text-slate-500 ml-1">KES {item.product.price.toLocaleString()}</span>
                      </div>
                      <button 
                        onClick={() => onRemove(item.product.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Estimated Subtotal</span>
                <span className="text-2xl font-black text-slate-900">KES {subtotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-slate-400 text-center">Delivery costs calculated at checkout based on site location.</p>
              <button className="w-full bg-slate-900 hover:bg-orange-500 text-white py-4 rounded-xl font-bold flex items-center justify-center transition-colors shadow-lg group">
                <CreditCard className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
