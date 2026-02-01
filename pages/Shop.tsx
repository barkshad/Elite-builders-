
import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { Product } from '../types';
import { Filter, ShoppingBag, Info, AlertCircle } from 'lucide-react';

interface ShopProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Shop Materials</h1>
          <p className="text-slate-500 mt-1">Browse and order construction materials at wholesale prices.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              onChange={(e) => setSelectedCategory(e.target.value === 'all' ? null : e.target.value)}
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <input 
            type="text" 
            placeholder="Search products..." 
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 text-sm w-full sm:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-600">No products found</h3>
            <p className="text-slate-400">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; onAddToCart: (p: Product, q: number) => void }> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(product.minOrder);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-slate-900 border border-slate-200">
          MIN ORDER: {product.minOrder} {product.unit}
        </div>
      </div>
      <div className="p-5 flex-grow">
        <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">{product.supplierName}</div>
        <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-8">{product.description}</p>
        
        <div className="flex items-baseline mb-4">
          <span className="text-2xl font-black text-slate-900">KES {product.price.toLocaleString()}</span>
          <span className="text-xs text-slate-400 ml-1">/ {product.unit}</span>
        </div>

        {product.bulkPricing && (
          <div className="bg-slate-50 rounded-lg p-3 mb-4 space-y-2">
            <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase">
              <Info className="w-3 h-3 mr-1" /> Bulk Pricing
            </div>
            {product.bulkPricing.map((bp, i) => (
              <div key={i} className="flex justify-between text-xs font-medium">
                <span className="text-slate-600">{bp.quantity}+ units</span>
                <span className="text-slate-900">KES {bp.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-3 mt-auto">
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button 
              onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
            >
              -
            </button>
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
              className="bg-transparent text-center w-12 font-bold text-sm outline-none"
            />
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
            >
              +
            </button>
          </div>
          <button 
            onClick={() => onAddToCart(product, quantity)}
            className="flex-grow bg-slate-900 hover:bg-orange-500 text-white h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-colors group"
          >
            <ShoppingBag className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
