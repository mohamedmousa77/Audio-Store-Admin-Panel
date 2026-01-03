
export interface Product {
  id: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'Available' | 'Low Stock' | 'Unavailable';
  image: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  totalOrders: number;
  lastOrderDate: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}
