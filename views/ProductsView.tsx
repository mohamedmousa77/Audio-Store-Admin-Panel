
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { useStore } from '../context/StoreContext';
import ProductModal from '../components/ProductModal';
import { Product } from '../types';

const ProductsView: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterStatus, setFilterStatus] = useState('Status: All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'All Categories' || p.category === filterCategory;
    const matchesStatus = filterStatus === 'Status: All' || p.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingProduct(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingProduct) {
      updateProduct(data);
    } else {
      addProduct(data);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-text-muted text-sm font-bold uppercase tracking-widest">Inventory</p>
          <h2 className="text-3xl font-black text-text-main">Product Catalog</h2>
        </div>
        <button onClick={handleOpenAdd} className="bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-2xl text-base font-black shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group">
          <span className="material-symbols-outlined transition-transform group-hover:rotate-90">{ICONS.add}</span>
          Add New Product
        </button>
      </div>

      <div className="bg-surface-light p-5 rounded-3xl border border-border-light shadow-sm flex flex-col xl:flex-row gap-5 items-center">
        <div className="relative w-full xl:w-96">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[22px]">{ICONS.search}</span>
          <input
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-none bg-background-light text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-text-muted/60"
            placeholder="Search products or SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3 w-full xl:w-auto">
          <select
            className="flex-1 min-w-[140px] px-4 py-3.5 rounded-2xl border-none bg-background-light text-sm font-bold text-text-main focus:ring-4 focus:ring-primary/10 cursor-pointer"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Headphones</option>
            <option>Speakers</option>
            <option>Microphones</option>
            <option>Turntables</option>
          </select>
          <select
            className="flex-1 min-w-[140px] px-4 py-3.5 rounded-2xl border-none bg-background-light text-sm font-bold text-text-main focus:ring-4 focus:ring-primary/10 cursor-pointer"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option>Status: All</option>
            <option>Available</option>
            <option>Low Stock</option>
            <option>Unavailable</option>
          </select>
        </div>
      </div>

      <div className="bg-surface-light rounded-3xl border border-border-light shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background-light text-[10px] font-black uppercase text-text-muted tracking-widest">
              <tr>
                <th className="px-8 py-5">Product</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5 text-center">Price</th>
                <th className="px-8 py-5 text-center">Stock</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-background-light/40 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-background-light p-1 border border-border-light overflow-hidden flex-shrink-0">
                        <img src={`https://picsum.photos/seed/${p.sku}/100/100`} className="w-full h-full object-cover rounded-xl" alt={p.name} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-text-main text-base group-hover:text-primary transition-colors leading-tight">{p.name}</span>
                        <span className="text-xs text-text-muted font-bold tracking-tight">{p.brand} • SKU: {p.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-text-main">{p.category}</td>
                  <td className="px-8 py-6 text-center font-black text-text-main text-base">${p.price.toFixed(2)}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`w-6 text-center font-black ${p.stock === 0 ? 'text-red-500' : 'text-text-main'}`}>{p.stock}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      p.stock > 10 ? 'bg-green-100 text-green-700' :
                      p.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-50 text-red-500'
                    }`}>
                      {p.stock > 10 ? 'Available' : p.stock > 0 ? 'Low Stock' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleOpenEdit(p)} className="p-2 hover:bg-background-light rounded-xl text-text-muted hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">{ICONS.edit}</span></button>
                      <button onClick={() => deleteProduct(p.id)} className="p-2 hover:bg-red-50 rounded-xl text-text-muted hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[20px]">{ICONS.delete}</span></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-text-muted font-bold">No products found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <ProductModal product={editingProduct} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
    </div>
  );
};

export default ProductsView;
