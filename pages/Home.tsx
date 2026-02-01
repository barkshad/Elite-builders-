
import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { ArrowRight, ShieldCheck, Truck, BarChart, Users } from 'lucide-react';

interface HomeProps {
  onShopNow: () => void;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onShopNow, onNavigate }) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-900 pt-32 pb-40 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Build Smarter. <br />
              <span className="text-orange-500">Source Better.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              The largest marketplace for verified construction materials. 
              Order from top suppliers and get delivery straight to your construction site.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={onShopNow}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all transform hover:translate-y-[-2px]"
              >
                Shop Materials
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-4 rounded-xl font-bold text-lg border border-white/30 transition-all">
                Become a Supplier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <BenefitCard 
            icon={<ShieldCheck className="w-8 h-8 text-orange-500" />}
            title="Verified Suppliers"
            desc="Every supplier is vetted for quality and reliability."
          />
          <BenefitCard 
            icon={<BarChart className="w-8 h-8 text-orange-500" />}
            title="Transparent Pricing"
            desc="No hidden costs. See real-time market prices instantly."
          />
          <BenefitCard 
            icon={<Truck className="w-8 h-8 text-orange-500" />}
            title="Site Delivery"
            desc="Logistics handled by us. Delivered to your site on time."
          />
          <BenefitCard 
            icon={<Users className="w-8 h-8 text-orange-500" />}
            title="Bulk & Retail"
            desc="Supporting both big developers and home builders."
          />
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Popular Categories</h2>
            <p className="text-slate-500 mt-2">Find exactly what you need for every phase of construction.</p>
          </div>
          <button onClick={onShopNow} className="text-orange-600 font-bold flex items-center hover:underline">
            View All Categories <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all"
              onClick={onShopNow}
            >
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800">{cat.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-slate-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How Elite Builders Works</h2>
            <p className="text-slate-500 mt-2">Get your materials on site in 4 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-slate-200 -z-0" />
            <Step number="1" title="Browse" desc="Select from thousands of high-quality construction products." />
            <Step number="2" title="Compare" desc="Review prices from multiple verified suppliers side-by-side." />
            <Step number="3" title="Order" desc="Pay securely online or arrange mobile money payment." />
            <Step number="4" title="Delivery" desc="Receive items directly on site with real-time tracking." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-orange-500 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-6">Ready to start your project?</h2>
            <p className="text-orange-100 text-xl max-w-2xl mx-auto mb-10">
              Join thousands of contractors and developers who source better with Elite Builders.
            </p>
            <button 
              onClick={onShopNow}
              className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-xl"
            >
              Start Shopping Now
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
      </section>
    </div>
  );
};

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center text-center space-y-4 hover:translate-y-[-4px] transition-transform">
    <div className="p-3 bg-orange-50 rounded-xl">{icon}</div>
    <h3 className="font-bold text-lg text-slate-900">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const Step: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
  <div className="relative z-10 flex flex-col items-center text-center">
    <div className="w-20 h-20 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-3xl font-extrabold text-orange-500 shadow-xl mb-6">
      {number}
    </div>
    <h3 className="font-bold text-xl text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500">{desc}</p>
  </div>
);

export default Home;
