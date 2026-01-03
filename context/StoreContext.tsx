
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, Customer, Category } from '../types';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addCategory: (category: Omit<Category, 'id' | 'productCount'>) => void;
  deleteCategory: (id: string) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Sony WH-1000XM5', brand: 'Sony', sku: 'SNY-XM5-BLK', category: 'Headphones', price: 348.00, stock: 12, status: 'Available', isFeatured: true, isNew: true, image: 'https://picsum.photos/seed/xm5/200/200' },
    { id: '2', name: 'Yeti Blue Microphone', brand: 'Logitech', sku: 'LOG-YET-SLV', category: 'Microphones', price: 120.00, stock: 0, status: 'Unavailable', isFeatured: false, isNew: false, image: 'https://picsum.photos/seed/yeti/200/200' },
    { id: '3', name: 'KRK Rokit 5 G4', brand: 'KRK Systems', sku: 'KRK-ROK-5', category: 'Speakers', price: 189.00, stock: 4, status: 'Low Stock', isFeatured: true, isNew: false, image: 'https://picsum.photos/seed/krk/200/200' },
    { id: '4', name: 'AirPods Pro 2', brand: 'Apple', sku: 'APP-PRO-2', category: 'Headphones', price: 249.00, stock: 85, status: 'Available', isFeatured: false, isNew: false, image: 'https://picsum.photos/seed/airpods/200/200' },
    { id: '5', name: 'AT-LP60X', brand: 'Audio-Technica', sku: 'AT-LP60', category: 'Turntables', price: 149.00, stock: 20, status: 'Available', isFeatured: false, isNew: true, image: 'https://picsum.photos/seed/atlp60/200/200' },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: '#ORD-7752', date: 'Oct 24, 2023', customerName: 'Alex Morgan', customerEmail: 'alex.m@example.com', total: 478.95, status: 'Shipped' },
    { id: '#ORD-7751', date: 'Oct 23, 2023', customerName: 'Sarah Jenkins', customerEmail: 's.jenkins@test.com', total: 129.99, status: 'Delivered' },
    { id: '#ORD-7750', date: 'Oct 23, 2023', customerName: 'Michael Chen', customerEmail: 'mchen88@gmail.com', total: 1299.00, status: 'Processing' },
    { id: '#ORD-7749', date: 'Oct 22, 2023', customerName: 'Emily Miller', customerEmail: 'emily.m@studio.com', total: 59.95, status: 'Canceled' },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    { id: '1', name: 'Alice Freeman', email: 'alice.f@example.com', phone: '+1 555-0101', registrationDate: 'Oct 24, 2023', totalOrders: 12, lastOrderDate: '2 days ago' },
    { id: '2', name: 'Bob Smith', email: 'bob.smith@email.com', phone: '+1 555-0102', registrationDate: 'Sep 12, 2023', totalOrders: 3, lastOrderDate: '13 days ago' },
    { id: '3', name: 'Charlie Brown', email: 'charlie.b@test.com', phone: '+1 555-0103', registrationDate: 'Aug 05, 2023', totalOrders: 0, lastOrderDate: 'No orders yet' },
    { id: '4', name: 'Emily Miller', email: 'emily.m@studio.com', phone: '+1 555-0104', registrationDate: 'Jul 22, 2023', totalOrders: 24, lastOrderDate: 'Just now' },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Headphones', description: 'Over-ear, On-ear, and In-ear solutions.', icon: 'headphones', productCount: 124 },
    { id: '2', name: 'Speakers', description: 'Portable Bluetooth and home audio.', icon: 'speaker', productCount: 89 },
    { id: '3', name: 'Microphones', description: 'Studio condenser and dynamic mics.', icon: 'mic', productCount: 42 },
    { id: '4', name: 'Turntables', description: 'Classic analog record players.', icon: 'album', productCount: 18 },
    { id: '5', name: 'Accessories', description: 'Cables, cases, and cleaning kits.', icon: 'cable', productCount: 230 },
  ]);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addProduct = (p: Omit<Product, 'id'>) => {
    const newProduct = { ...p, id: Math.random().toString(36).substr(2, 9) };
    setProducts([newProduct, ...products]);
    showToast('Product added successfully');
  };

  const updateProduct = (p: Product) => {
    setProducts(products.map(item => item.id === p.id ? p : item));
    showToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    showToast('Product deleted', 'error');
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    showToast(`Order status updated to ${status}`);
  };

  const addCategory = (c: Omit<Category, 'id' | 'productCount'>) => {
    const newCat = { ...c, id: Math.random().toString(36).substr(2, 9), productCount: 0 };
    setCategories([...categories, newCat]);
    showToast('Category created successfully');
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    showToast('Category removed', 'error');
  };

  return (
    <StoreContext.Provider value={{
      products, orders, customers, categories,
      addProduct, updateProduct, deleteProduct,
      updateOrderStatus, addCategory, deleteCategory,
      showToast
    }}>
      {children}
      {toast && (
        <div className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 ${
          toast.type === 'success' ? 'bg-primary text-white' : 'bg-red-500 text-white'
        }`}>
          <span className="material-symbols-outlined">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
          <span className="font-bold">{toast.message}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
