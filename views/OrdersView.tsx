
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

const OrdersView: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-text-muted text-sm font-bold uppercase tracking-widest">Transactions</p>
          <h2 className="text-3xl font-black text-text-main">Order History</h2>
        </div>
      </div>

      <div className="bg-surface-light p-5 rounded-3xl border border-border-light shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px]">{ICONS.search}</span>
          <input
            className="w-full pl-11 pr-4 py-3 rounded-2xl border-none bg-background-light text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-text-muted/60"
            placeholder="Search order ID or customer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-surface-light rounded-3xl border border-border-light shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background-light text-[10px] font-black uppercase text-text-muted tracking-widest">
              <tr>
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5 text-center">Total</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-background-light/40 transition-colors group">
                  <td className="px-8 py-6 font-black text-text-main group-hover:text-primary transition-colors text-base">{order.id}</td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-text-main text-base">{order.customerName}</span>
                      <span className="text-[10px] text-text-muted font-bold uppercase tracking-tighter">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center font-black text-text-main text-base">${order.total.toFixed(2)}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-flex px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Canceled' ? 'bg-red-50 text-red-500' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <select
                        className="bg-background-light border-none rounded-xl text-xs font-black uppercase focus:ring-2 focus:ring-primary/20"
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                      </select>
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

export default OrdersView;
