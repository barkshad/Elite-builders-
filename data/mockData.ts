
import { Category, Product, Supplier } from '../types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Cement', image: 'https://picsum.photos/seed/cement/400/300', description: 'Premium Portland and composite cement' },
  { id: '2', name: 'Steel & Rebar', image: 'https://picsum.photos/seed/steel/400/300', description: 'Structural steel and reinforcement bars' },
  { id: '3', name: 'Sand & Aggregates', image: 'https://picsum.photos/seed/sand/400/300', description: 'River sand, ballast, and hardcore' },
  { id: '4', name: 'Roofing', image: 'https://picsum.photos/seed/roof/400/300', description: 'Iron sheets and stone-coated tiles' },
  { id: '5', name: 'Tiles & Finishes', image: 'https://picsum.photos/seed/tiles/400/300', description: 'Ceramic, porcelain and granite tiles' },
  { id: '6', name: 'Plumbing', image: 'https://picsum.photos/seed/pipes/400/300', description: 'Pipes, fittings, and sanitary ware' },
  { id: '7', name: 'Electrical', image: 'https://picsum.photos/seed/wire/400/300', description: 'Wiring, switches, and lighting' },
  { id: '8', name: 'Paint', image: 'https://picsum.photos/seed/paint/400/300', description: 'Interior and exterior finishes' },
];

export const SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'Bamburi Direct', verified: true, rating: 4.8, location: 'Nairobi', description: 'Official distribution hub for Bamburi Cement.', logo: 'https://picsum.photos/seed/bamburi/100/100' },
  { id: 's2', name: 'Devki Steel Mills', verified: true, rating: 4.5, location: 'Ruiru', description: 'Leaders in structural steel production.', logo: 'https://picsum.photos/seed/devki/100/100' },
  { id: 's3', name: 'Elite Hardware Ltd', verified: true, rating: 4.2, location: 'Mombasa Road', description: 'General construction materials and tools.', logo: 'https://picsum.photos/seed/elitehw/100/100' },
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
    image: 'https://picsum.photos/seed/cementbag/400/400',
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
    image: 'https://picsum.photos/seed/rebar/400/400',
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
    image: 'https://picsum.photos/seed/roofsheet/400/400',
    description: '28 Gauge prepainted box profile sheets.',
  }
];
