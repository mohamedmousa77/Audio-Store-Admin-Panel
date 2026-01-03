
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { useStore } from '../context/StoreContext';

const CategoriesView: React.FC = () => {
  const { categories, addCategory, deleteCategory } = useStore();
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleSave = () => {
    if (!newName) return;
    addCategory({
      name: newName,
      description: newDesc,
      icon: 'category',
    });
    setNewName('');
    setNewDesc('');
  };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col gap-1">
        <p className="text-text-muted text-sm font-bold uppercase tracking-widest">Taxonomy</p>
        <h2 className="text-3xl font-black text-text-main">Category Management</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-surface-light rounded-3xl border border-border-light shadow-sm overflow-hidden flex flex-col h-fit">
          <div className="px-8 py-6 border-b border-border-light">
            <h3 className="text-xl font-black text-text-main">All Categories</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background-light text-[10px] font-black uppercase text-text-muted tracking-widest">
                <tr>
                  <th className="px-8 py-5 w-20">Icon</th>
                  <th className="px-8 py-5">Name & Description</th>
                  <th className="px-8 py-5 text-center">Items</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {categories.map((c) => (
                  <tr key={c.id} className="group hover:bg-background-light/40 transition-all">
                    <td className="px-8 py-6">
                      <div className="w-12 h-12 rounded-2xl bg-background-light flex items-center justify-center text-text-muted group-hover:bg-primary/10 group-hover:text-primary transition-all">
                        <span className="material-symbols-outlined text-[24px]">{c.icon}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-text-main text-base group-hover:text-primary transition-colors leading-tight">{c.name}</p>
                      <p className="text-xs text-text-muted font-medium mt-1">{c.description}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex px-3 py-1 rounded-xl bg-background-light text-[11px] font-black text-text-main">{c.productCount}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button onClick={() => deleteCategory(c.id)} className="p-2 hover:bg-red-50 rounded-xl text-text-muted hover:text-red-500 transition-all">
                        <span className="material-symbols-outlined text-[20px]">{ICONS.delete}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-1">
          <div className="bg-surface-light rounded-3xl border border-border-light shadow-sm p-8 sticky top-24">
            <h3 className="text-xl font-black text-text-main mb-6">Add New Category</h3>
            <div className="space-y-6">
              <label className="block">
                <span className="text-sm font-bold text-text-main px-1">Category Name</span>
                <input
                  className="mt-2 w-full rounded-2xl border-2 border-border-light bg-background-light/50 text-sm font-bold focus:border-primary transition-all p-4 outline-none"
                  placeholder="e.g. Wireless Speakers"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-text-main px-1">Description</span>
                <textarea
                  className="mt-2 w-full rounded-2xl border-2 border-border-light bg-background-light/50 text-sm font-bold focus:border-primary transition-all p-4 resize-none outline-none"
                  placeholder="Short description..."
                  rows={4}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                ></textarea>
              </label>
              <button
                onClick={handleSave}
                disabled={!newName}
                className="w-full px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary-dark text-white text-sm font-black shadow-xl shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[20px]">save</span>
                Save Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesView;
