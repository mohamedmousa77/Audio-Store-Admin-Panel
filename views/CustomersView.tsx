
import React from 'react';
import { ICONS } from '../constants';

const CustomersView: React.FC = () => {
  const customers = [
    { name: 'Alice Freeman', email: 'alice.f@example.com', date: 'Oct 24, 2023', orders: 12, lastOrder: '2 days ago', initials: 'AF', color: 'bg-primary' },
    { name: 'Bob Smith', email: 'bob.smith@email.com', date: 'Sep 12, 2023', orders: 3, lastOrder: '13 days ago', initials: 'BS', color: 'bg-blue-500' },
    { name: 'Charlie Brown', email: 'charlie.b@test.com', date: 'Aug 05, 2023', orders: 0, lastOrder: 'No orders yet', initials: 'CB', color: 'bg-purple-500' },
    { name: 'Emily Miller', email: 'emily.m@studio.com', date: 'Jul 22, 2023', orders: 24, lastOrder: 'Just now', initials: 'EM', color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <p className="text-text-muted text-sm font-bold uppercase tracking-widest">Directory</p>
          <h2 className="text-3xl font-black text-text-main">Customer Management</h2>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-2xl text-sm font-black shadow-xl shadow-primary/20 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Add New Customer
        </button>
      </div>

      <div className="bg-surface-light p-6 rounded-3xl border border-border-light shadow-sm flex flex-col xl:flex-row gap-6 justify-between">
        <div className="relative w-full xl:w-96">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[22px]">{ICONS.search}</span>
          <input className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-none bg-background-light text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-text-muted/60" placeholder="Search by name, email or phone..." type="text" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto items-center">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest px-2">Filter:</p>
          <select className="flex-1 min-w-[140px] px-4 py-3.5 rounded-2xl border-none bg-background-light text-sm font-bold text-text-main focus:ring-4 focus:ring-primary/10 cursor-pointer">
            <option>Registration Date</option>
            <option>Last 30 Days</option>
            <option>VIP Only</option>
          </select>
          <select className="flex-1 min-w-[140px] px-4 py-3.5 rounded-2xl border-none bg-background-light text-sm font-bold text-text-main focus:ring-4 focus:ring-primary/10 cursor-pointer">
            <option>Orders: Any</option>
            <option>0 Orders</option>
            <option>1-5 Orders</option>
            <option>20+ Orders</option>
          </select>
        </div>
      </div>

      <div className="bg-surface-light rounded-3xl border border-border-light shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background-light text-[10px] font-black uppercase text-text-muted tracking-widest">
              <tr>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5 hidden md:table-cell">Email</th>
                <th className="px-8 py-5">Registration</th>
                <th className="px-8 py-5 text-center">Orders</th>
                <th className="px-8 py-5">Last Activity</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {customers.map((c, i) => (
                <tr key={i} className={`hover:bg-background-light/40 transition-all group ${i === 0 ? 'bg-primary/5 border-l-4 border-primary' : ''} cursor-pointer`}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl ${c.color} text-white flex items-center justify-center font-black text-sm shadow-lg shadow-black/10 transition-transform group-hover:scale-110`}>{c.initials}</div>
                      <div className="flex flex-col">
                        <p className="font-black text-text-main text-base group-hover:text-primary transition-colors">{c.name}</p>
                        <p className="text-[10px] text-text-muted font-bold uppercase md:hidden">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 hidden md:table-cell font-bold text-text-muted">{c.email}</td>
                  <td className="px-8 py-6 font-bold text-text-main">{c.date}</td>
                  <td className="px-8 py-6 text-center">
                    <span className="inline-flex px-3 py-1 rounded-xl bg-surface-light border border-border-light text-[11px] font-black text-text-main shadow-sm">{c.orders}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className={`text-sm font-black ${c.lastOrder === 'Just now' ? 'text-green-600' : 'text-text-main'}`}>{c.lastOrder}</span>
                      <span className="text-[10px] text-text-muted font-bold uppercase">Activity Tracked</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-all">
                      <button className="p-2 hover:bg-white rounded-xl text-primary border border-transparent hover:border-border-light transition-all"><span className="material-symbols-outlined text-[22px]">{ICONS.visibility}</span></button>
                      <button className="p-2 hover:bg-white rounded-xl text-text-muted hover:text-text-main border border-transparent hover:border-border-light transition-all"><span className="material-symbols-outlined text-[22px]">{ICONS.edit}</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersView;
