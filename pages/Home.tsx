
import React from 'react';
import { CATEGORIES } from '../data/mockData';
// Added missing MapPin import to the list
import { ArrowRight, ShieldCheck, Truck, BarChart, Users, HardHat, PackageCheck, Award, MapPin } from 'lucide-react';

interface HomeProps {
  onShopNow: () => void;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onShopNow, onNavigate }) => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative bg-[#0F172A] pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1920" 
            alt="Elite Construction Site" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-8">
              <Award className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500 text-xs font-extrabold uppercase tracking-widest">Kenya's #1 B2B Material Hub</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
              SOURCE BETTER. <br />
              <span className="text-orange-500 italic">BUILD ELITE.</span>
            </h1>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-xl">
              Elite Builders simplifies the construction supply chain by connecting you directly with manufacturers for bulk materials, verified logistics, and site-ready delivery.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={onShopNow}
                className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center transition-all transform hover:-translate-y-1 shadow-2xl shadow-orange-500/20"
              >
                Shop Marketplace
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white backdrop-blur-xl px-10 py-5 rounded-2xl font-black text-lg border border-white/10 transition-all">
                Become a Supplier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={<ShieldCheck />} label="Verified" value="500+ Suppliers" />
          <StatCard icon={<PackageCheck />} label="Logistics" value="Direct Delivery" />
          <StatCard icon={<BarChart />} label="Pricing" value="Wholesale Rates" />
          <StatCard icon={<Users />} label="Community" value="20k+ Builders" />
        </div>
      </section>

      {/* Product Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Everything you need, <br />from foundation to roof.</h2>
            <p className="text-slate-500 mt-4 text-lg">Browse curated categories of professional-grade materials from top regional brands.</p>
          </div>
          <button onClick={onShopNow} className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center transition-colors">
            Explore All Categories <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              className="group cursor-pointer bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              onClick={onShopNow}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">Premium</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-xl text-slate-900">{cat.name}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logistics CTA */}
      <section className="bg-slate-900 py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Reliable Logistics. <br />No Hidden Costs.</h2>
            <p className="text-slate-400 text-lg mb-12">
              Our fleet is ready to deliver materials directly to your site. Track your delivery in real-time and manage off-loading directly from your dashboard.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="bg-orange-500/20 p-3 rounded-2xl">
                  <Truck className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-bold">Same-Day Dispatch</h4>
                  <p className="text-slate-500 text-sm mt-1">For materials in stock within regional hubs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-500/20 p-3 rounded-2xl">
                  <MapPin className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-bold">Site Mapping</h4>
                  <p className="text-slate-500 text-sm mt-1">Precise delivery to even the most remote sites.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="bg-orange-500 w-full h-96 rounded-[3rem] overflow-hidden rotate-3 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1600518464441-9154a4dba216?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover -rotate-3 scale-110"
                alt="Logistics"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:bg-orange-500 transition-colors duration-300">
    <div className="p-4 bg-orange-50 rounded-2xl mb-6 group-hover:bg-white/20 transition-colors">
      {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 text-orange-500 group-hover:text-white" })}
    </div>
    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-white/70">{label}</p>
    <h3 className="text-xl font-black text-slate-900 group-hover:text-white">{value}</h3>
  </div>
);

export default Home;
