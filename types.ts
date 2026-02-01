
export type UserRole = 'BUYER' | 'SUPPLIER' | 'ADMIN';

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  supplierId: string;
  supplierName: string;
  price: number;
  unit: string;
  minOrder: number;
  stock: number;
  image: string;
  description: string;
  bulkPricing?: { quantity: number; price: number }[];
}

export interface Supplier {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  location: string;
  description: string;
  logo: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'IN_TRANSIT' | 'DELIVERED';

export interface Order {
  id: string;
  buyerId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  deliveryDate: string;
  address: string;
  createdAt: string;
}
