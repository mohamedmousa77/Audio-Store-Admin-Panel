
import React from 'react';
import { ICONS } from '../constants';
import { useStore } from '../context/StoreContext';

const DashboardView: React.FC = () => {
  const { products, orders, customers } = useStore();

  const totalSales = orders
    .filter(o => o.status !== 'Canceled')
    .reduce((acc, curr) => acc + curr.total, 0);

  const stats = [
    { label: 'Total Revenue', value: `$${totalSales.toLocaleString()}`, trend: '+12.5%', icon: 'payments', color: 'green' },
    { label: 'Total Orders', value: orders.length.toString(), trend: '+5.2%', icon: 'shopping_bag', color: 'blue' },
    { label: 'Customers', value: customers.length.toString(), trend: '0.0%', icon: 'group', color: 'orange' },
    { label: 'Active Products', value: products.filter(p => p.stock > 0).length.toString(), trend: 'LIVE', icon: 'inventory_2', color: 'purple' },
  ];

  const recentOrders = orders.slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface-light p-6 rounded-3xl border border-border-light shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl bg-background-light group-hover:bg-primary/10 transition-colors`}>
                <span className={`material-symbols-outlined group-hover:text-primary transition-colors text-2xl`}>{stat.icon}</span>
              </div>
              <span className={`flex items-center text-[11px] font-black text-text-muted bg-background-light px-3 py-1.5 rounded-full uppercase tracking-tighter`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-text-muted text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-text-main mt-1.5">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders by Status */}
        <div className="lg:col-span-2 bg-surface-light p-8 rounded-3xl border border-border-light shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-text-main">Order Status Breakdown</h3>
            <button className="text-primary text-sm font-bold hover:underline">View Details</button>
          </div>
          <div className="space-y-6">
            {['Delivered', 'Shipped', 'Processing', 'Canceled'].map((status) => {
              const count = orders.filter(o => o.status === status).length;
              const perc = Math.round((count / (orders.length || 1)) * 100);
              const color = status === 'Delivered' ? 'bg-green-500' : status === 'Shipped' ? 'bg-blue-500' : status === 'Canceled' ? 'bg-red-400' : 'bg-primary';
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-2.5">
                    <span className="font-bold text-text-main">{status}</span>
                    <span className="font-black text-text-main">{perc}% <span className="text-text-muted text-xs ml-1">({count})</span></span>
                  </div>
                  <div className="h-4 w-full bg-background-light rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${perc}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories Shortcut */}
        <div className="bg-surface-light p-8 rounded-3xl border border-border-light shadow-sm">
          <h3 className="text-xl font-black text-text-main mb-8">Inventory Snap</h3>
          <div className="space-y-6">
            {[
              { label: 'Out of Stock', val: products.filter(p => p.stock === 0).length, icon: 'error', color: 'text-red-500' },
              { label: 'Low Stock', val: products.filter(p => p.stock > 0 && p.stock < 10).length, icon: 'warning', color: 'text-orange-500' },
              { label: 'Available', val: products.filter(p => p.stock >= 10).length, icon: 'check_circle', color: 'text-green-500' },
            ].map((snap, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-background-light flex items-center justify-center">
                  <span className={`material-symbols-outlined ${snap.color}`}>{snap.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-black text-text-main">{snap.label}</p>
                  <p className="text-xs font-bold text-text-muted">{snap.val} Products</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-surface-light rounded-3xl border border-border-light shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-border-light flex justify-between items-center">
          <h3 className="text-xl font-black text-text-main">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background-light text-[10px] uppercase font-black text-text-muted tracking-widest">
              <tr>
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4 text-center">Status</th>
                <th className="px-8 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {recentOrders.map((order, i) => (
                <tr key={i} className="hover:bg-background-light/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-5 font-black text-text-main group-hover:text-primary">{order.id}</td>
                  <td className="px-8 py-5 font-bold text-text-main">{order.customerName}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-text-main">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
