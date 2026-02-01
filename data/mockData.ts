
import { Category, Product, Supplier } from '../types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Cement', image: 'https://images.unsplash.com/photo-1517646281042-749510d7e572?auto=format&fit=crop&q=80&w=800', description: 'Premium Portland and composite cement' },
  { id: '2', name: 'Steel & Rebar', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&q=80&w=800', description: 'Structural steel and reinforcement bars' },
  { id: '3', name: 'Sand & Aggregates', image: 'https://images.unsplash.com/photo-1590059379762-8418f7736e4b?auto=format&fit=crop&q=80&w=800', description: 'River sand, ballast, and hardcore' },
  { id: '4', name: 'Roofing', image: 'https://images.unsplash.com/photo-1632759162351-375eaa44234c?auto=format&fit=crop&q=80&w=800', description: 'Iron sheets and stone-coated tiles' },
  { id: '5', name: 'Tiles & Finishes', image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=800', description: 'Ceramic, porcelain and granite tiles' },
  { id: '6', name: 'Plumbing', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800', description: 'Pipes, fittings, and sanitary ware' },
  { id: '7', name: 'Electrical', image: 'https://images.unsplash.com/photo-1558489580-faa74691fdc5?auto=format&fit=crop&q=80&w=800', description: 'Wiring, switches, and lighting' },
  { id: '8', name: 'Paint', image: 'https://images.unsplash.com/photo-1562648524-709f2328b17f?auto=format&fit=crop&q=80&w=800', description: 'Interior and exterior finishes' },
];

export const SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'Bamburi Direct', verified: true, rating: 4.8, location: 'Nairobi', description: 'Official distribution hub for Bamburi Cement.', logo: 'https://images.unsplash.com/photo-1590633441617-573024840506?auto=format&fit=crop&q=80&w=200' },
  { id: 's2', name: 'Devki Steel Mills', verified: true, rating: 4.5, location: 'Ruiru', description: 'Leaders in structural steel production.', logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=200' },
  { id: 's3', name: 'Elite Hardware Ltd', verified: true, rating: 4.2, location: 'Mombasa Road', description: 'General construction materials and tools.', logo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=200' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    categoryId: '1',
    supplierId: 's1',
    supplierName: 'Bamburi Direct',
    name: 'Bamburi Tembo Cement (32.5N)',
    price: 680,
    unit: '50kg Bag',
    minOrder: 40,
    stock: 2000,
    image: 'https://images.unsplash.com/photo-1589939705384-5185138a04b9?auto=format&fit=crop&q=80&w=800',
    description: 'General purpose cement for masonry and concrete work.',
    bulkPricing: [{ quantity: 100, price: 650 }, { quantity: 500, price: 630 }]
  },
  {
    id: 'p2',
    categoryId: '2',
    supplierId: 's2',
    supplierName: 'Devki Steel Mills',
    name: 'D12 Reinforcement Bar (TMT)',
    price: 1250,
    unit: '12m Length',
    minOrder: 50,
    stock: 500,
    image: 'https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&q=80&w=800',
    description: 'High strength thermo-mechanically treated bars.',
  },
  {
    id: 'p3',
    categoryId: '4',
    supplierId: 's3',
    supplierName: 'Elite Hardware Ltd',
    name: 'Box Profile Iron Sheets (Blue)',
    price: 950,
    unit: 'Linear Meter',
    minOrder: 10,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=800',
    description: '28 Gauge prepainted box profile sheets.',
  }
];
