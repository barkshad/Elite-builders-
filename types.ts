
export type UserRole = 'BUYER' | 'SUPPLIER' | 'ADMIN';

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  categoryId: string;
  supplierId: string;
  supplierName: string;
  name: string;
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
