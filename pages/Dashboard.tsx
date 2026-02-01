
import React from 'react';
import { UserRole } from '../types';
// Fixed: Added 'ShieldCheck' to the lucide-react imports
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
  ShieldCheck
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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
  const renderBuyer = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Clock className="text-blue-500" />} label="Ongoing Projects" value="3" />
        <StatCard icon={<Package className="text-orange-500" />} label="Active Orders" value="5" />
        <StatCard icon={<CheckCircle className="text-green-500" />} label="Completed Deliveries" value="12" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Recent Orders</h3>
          <button className="text-orange-600 text-sm font-bold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Delivery Site</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <OrderRow id="#EB-1092" supplier="Bamburi Direct" amount="KES 68,000" status="IN TRANSIT" site="Lavington Site" />
              <OrderRow id="#EB-1088" supplier="Devki Steel" amount="KES 125,400" status="CONFIRMED" site="Karen Project" />
              <OrderRow id="#EB-1085" supplier="Elite Hardware" amount="KES 12,000" status="DELIVERED" site="Ruiru Extension" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSupplier = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<TrendingUp className="text-green-500" />} label="Total Sales (Monthly)" value="KES 4.2M" />
        <StatCard icon={<Package className="text-blue-500" />} label="Active Stock Items" value="142" />
        <StatCard icon={<Clock className="text-orange-500" />} label="Pending Orders" value="18" />
        <StatCard icon={<PlusCircle className="text-slate-900" />} label="Create New Listing" value="+" action />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-6">Sales Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `K${value/1000}k`} />
                <Tooltip />
                <Bar dataKey="sales" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">New Orders</h3>
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
        <StatCard icon={<Users className="text-indigo-500" />} label="Total Users" value="8,492" />
        <StatCard icon={<TrendingUp className="text-green-500" />} label="Gross Merchandise Value" value="KES 142M" />
        <StatCard icon={<ShieldCheck className="text-blue-500" />} label="Supplier Verification Requests" value="14" />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-6">Platform Growth</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_SALES_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} dot={{ r: 6, fill: '#2563eb' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{role.charAt(0) + role.slice(1).toLowerCase()} Dashboard</h1>
          <p className="text-slate-500">Welcome back to Elite Builders Hub.</p>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <FileText className="w-5 h-5 text-slate-500" />
          </button>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center">
            Settings
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
  <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between ${action ? 'cursor-pointer hover:bg-slate-50 border-dashed border-2' : ''}`}>
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
      <ArrowUpRight className="w-4 h-4 text-slate-300" />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

const OrderRow: React.FC<{ id: string; supplier: string; amount: string; status: string; site: string }> = ({ id, supplier, amount, status, site }) => (
  <tr className="hover:bg-slate-50 transition-colors">
    <td className="px-6 py-4 font-bold text-slate-900">{id}</td>
    <td className="px-6 py-4">{supplier}</td>
    <td className="px-6 py-4 font-medium">{amount}</td>
    <td className="px-6 py-4">
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
        status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
        status === 'IN TRANSIT' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-slate-500 flex items-center">
      <MapPin className="w-3 h-3 mr-1" /> {site}
    </td>
  </tr>
);

const SupplierOrderNotification: React.FC<{ id: string; customer: string; items: string; time: string }> = ({ id, customer, items, time }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
        {customer.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900">{customer} <span className="text-slate-400 font-medium">#{id}</span></p>
        <p className="text-xs text-slate-500">{items}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-[10px] text-slate-400 font-bold mb-2 uppercase">{time}</p>
      <button className="text-[10px] bg-slate-900 text-white px-3 py-1 rounded-md font-bold uppercase tracking-wider">Accept</button>
    </div>
  </div>
);

export default Dashboard;
