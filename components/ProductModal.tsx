
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ICONS } from '../constants';

interface ProductModalProps {
  product?: Product;
  onClose: () => void;
  onSave: (p: any) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    sku: '',
    category: 'Headphones',
    price: 0,
    stock: 0,
    status: 'Available' as Product['status'],
    isFeatured: false,
    isNew: false,
    image: '',
  });

  useEffect(() => {
    if (product) {
      // Fix: Explicitly map properties from Product to match the expected state structure
      // and provide default values for optional fields (isFeatured, isNew) to resolve type mismatch
      setFormData({
        name: product.name,
        brand: product.brand,
        sku: product.sku,
        category: product.category,
        price: product.price,
        stock: product.stock,
        status: product.status,
        isFeatured: product.isFeatured ?? false,
        isNew: product.isNew ?? false,
        image: product.image,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(product ? { ...formData, id: product.id } : formData);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-surface-light rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-border-light flex justify-between items-center">
          <h3 className="text-2xl font-black text-text-main">{product ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-background-light rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-text-main">Product Name</span>
              <input
                required
                className="rounded-2xl border-2 border-border-light bg-background-light/50 h-12 px-4 focus:border-primary focus:ring-0 transition-all font-medium"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-text-main">Brand</span>
              <input
                required
                className="rounded-2xl border-2 border-border-light bg-background-light/50 h-12 px-4 focus:border-primary focus:ring-0 transition-all font-medium"
                value={formData.brand}
                onChange={e => setFormData({ ...formData, brand: e.target.value })}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-text-main">SKU</span>
              <input
                required
                className="rounded-2xl border-2 border-border-light bg-background-light/50 h-12 px-4 focus:border-primary focus:ring-0 transition-all font-medium"
                value={formData.sku}
                onChange={e => setFormData({ ...formData, sku: e.target.value })}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-text-main">Category</span>
              <select
                className="rounded-2xl border-2 border-border-light bg-background-light/50 h-12 px-4 focus:border-primary focus:ring-0 transition-all font-medium"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option>Headphones</option>
                <option>Speakers</option>
                <option>Microphones</option>
                <option>Turntables</option>
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-text-main">Price ($)</span>
              <input
                type="number"
                step="0.01"
                required
                className="rounded-2xl border-2 border-border-light bg-background-light/50 h-12 px-4 focus:border-primary focus:ring-0 transition-all font-medium"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-text-main">Stock</span>
              <input
                type="number"
                required
                className="rounded-2xl border-2 border-border-light bg-background-light/50 h-12 px-4 focus:border-primary focus:ring-0 transition-all font-medium"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              />
            </label>
          </div>

          <div className="flex gap-8 py-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-border-light text-primary focus:ring-primary/20"
                checked={formData.isFeatured}
                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
              />
              <span className="text-sm font-bold text-text-main">Featured Product</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-border-light text-primary focus:ring-primary/20"
                checked={formData.isNew}
                onChange={e => setFormData({ ...formData, isNew: e.target.checked })}
              />
              <span className="text-sm font-bold text-text-main">New Arrival</span>
            </label>
          </div>
        </form>
        <div className="px-8 py-6 bg-background-light/50 border-t border-border-light flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-3 rounded-2xl border-2 border-border-light font-black text-text-muted hover:bg-white transition-all">Cancel</button>
          <button onClick={handleSubmit} className="px-8 py-3 rounded-2xl bg-primary hover:bg-primary-dark text-white font-black shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">{ICONS.success}</span>
            {product ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
