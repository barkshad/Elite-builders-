
import React, { useState } from 'react';
import { UserRole } from '../types';
import { 
  Package, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  MapPin, 
  ArrowUpRight,
  PlusCircle,
  FileText,
  ShieldCheck,
  Bot,
  Sparkles,
  Send
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { estimateMaterials } from '../services/geminiService';

const MOCK_SALES_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

interface DashboardProps {
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiEstimate = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    const result = await estimateMaterials(aiInput);
    setAiResponse(result);
    setIsAiLoading(false);
  };

  const renderBuyer = () => (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Clock className="text-blue-500" />} label="Active Projects" value="3" />
        <StatCard icon={<Package className="text-orange-500" />} label="Pending Deliveries" value="5" />
        <StatCard icon={<CheckCircle className="text-green-500" />} label="Completed Orders" value="12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">Recent Orders</h3>
            <button className="text-orange-600 text-sm font-bold hover:underline">View History</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Supplier</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Site</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <OrderRow id="#EB-1092" supplier="Bamburi Direct" status="IN TRANSIT" site="Lavington Site" />
                <OrderRow id="#EB-1088" supplier="Devki Steel" status="CONFIRMED" site="Karen Project" />
                <OrderRow id="#EB-1085" supplier="Elite Hardware" status="DELIVERED" site="Ruiru Extension" />
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Assistant */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Bot className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <h3 className="font-black uppercase tracking-widest text-xs">Elite Assistant</h3>
              </div>
              <h4 className="text-xl font-bold mb-4">Need an estimate?</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Describe your project, and our AI will estimate the materials you need.
              </p>
              <div className="space-y-4">
                <textarea 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="E.g. I am building a 3-bedroom house, foundation slab is 150sqm..."
                  className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-slate-500 h-32 resize-none"
                />
                <button 
                  onClick={handleAiEstimate}
                  disabled={isAiLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isAiLoading ? 'Calculating...' : (
                    <>
                      Calculate Estimate <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          {aiResponse && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm animate-in fade-in duration-500">
               <h4 className="font-bold text-slate-900 mb-2">Estimated Quantities:</h4>
               <div className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                 {aiResponse}
               </div>
               <button 
                 onClick={() => setAiResponse(null)}
                 className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-600"
               >
                 Clear Estimate
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSupplier = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<TrendingUp className="text-green-500" />} label="Monthly Volume" value="KES 4.2M" />
        <StatCard icon={<Package className="text-blue-500" />} label="Inventory Items" value="142" />
        <StatCard icon={<Clock className="text-orange-500" />} label="Open Orders" value="18" />
        <StatCard icon={<PlusCircle className="text-slate-900" />} label="New Listing" value="+" action />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-black text-slate-900 mb-6 uppercase tracking-tight">Sales Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `K${value/1000}k`} />
                <Tooltip />
                <Bar dataKey="sales" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-black text-slate-900 uppercase tracking-tight">Order Queue</h3>
            <button className="text-orange-600 text-sm font-bold">Process All</button>
          </div>
          <div className="p-6 space-y-4">
            <SupplierOrderNotification id="#1201" customer="James Mwangi" items="100 Bags Cement" time="2 mins ago" />
            <SupplierOrderNotification id="#1199" customer="BuildCo Kenya" items="500pcs D12 Rebar" time="1 hour ago" />
            <SupplierOrderNotification id="#1195" customer="Sarah Otieno" items="10 Linear m Roofing" time="4 hours ago" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdmin = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users className="text-indigo-500" />} label="Active Users" value="8,492" />
        <StatCard icon={<TrendingUp className="text-green-500" />} label="Gross GMV" value="KES 142M" />
        <StatCard icon={<ShieldCheck className="text-blue-500" />} label="Verification Requests" value="14" />
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-black text-slate-900 mb-6 uppercase tracking-tight">Platform Scaling</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_SALES_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={4} dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">{role} HUB</h1>
          <p className="text-slate-500 mt-2 font-medium">Professional command center for Elite Builders.</p>
        </div>
        <div className="flex space-x-3">
          <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
            <FileText className="w-5 h-5 text-slate-500" />
          </button>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center shadow-lg shadow-slate-900/20">
            Account Settings
          </button>
        </div>
      </div>

      {role === 'BUYER' && renderBuyer()}
      {role === 'SUPPLIER' && renderSupplier()}
      {role === 'ADMIN' && renderAdmin()}
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; action?: boolean }> = ({ icon, label, value, action }) => (
  <div className={`bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group transition-all duration-300 hover:shadow-xl hover:border-orange-500/20 ${action ? 'cursor-pointer hover:bg-slate-50 border-dashed border-2' : ''}`}>
    <div className="flex justify-between items-start mb-6">
      <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-orange-50 transition-colors">{icon}</div>
      <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500 transition-colors" />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
    </div>
  </div>
);

const OrderRow: React.FC<{ id: string; supplier: string; status: string; site: string }> = ({ id, supplier, status, site }) => (
  <tr className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
    <td className="px-6 py-5 font-black text-slate-900">{id}</td>
    <td className="px-6 py-5 font-medium text-slate-600">{supplier}</td>
    <td className="px-6 py-5">
      <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
        status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
        status === 'IN TRANSIT' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-5 text-slate-500 flex items-center gap-2">
      <MapPin className="w-3 h-3 text-slate-400" /> {site}
    </td>
  </tr>
);

const SupplierOrderNotification: React.FC<{ id: string; customer: string; items: string; time: string }> = ({ id, customer, items, time }) => (
  <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-orange-500/20 transition-all">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-lg">
        {customer.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-black text-slate-900">{customer} <span className="text-slate-400 font-medium">#{id}</span></p>
        <p className="text-xs text-slate-500 mt-0.5">{items}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-[10px] text-slate-400 font-black mb-3 uppercase tracking-widest">{time}</p>
      <button className="text-[10px] bg-slate-900 text-white px-4 py-2 rounded-xl font-black uppercase tracking-widest hover:bg-orange-500 transition-colors">Accept</button>
    </div>
  </div>
);

export default Dashboard;
