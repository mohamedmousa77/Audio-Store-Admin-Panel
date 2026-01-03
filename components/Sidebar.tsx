
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION, ICONS } from '../constants';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border-light bg-surface-light h-full shrink-0">
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white w-9 h-9 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-2xl">graphic_eq</span>
            </div>
            <div>
              <h1 className="text-text-main text-lg font-bold leading-none">Audio Store</h1>
              <p className="text-text-muted text-[10px] font-bold uppercase tracking-wider mt-1">Admin Panel</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1.5">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 px-3">Menu</p>
            {NAVIGATION.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-muted hover:bg-background-light hover:text-text-main'
                  }`
                }
              >
                <span className={`material-symbols-outlined text-[22px] transition-colors`}>
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 border-t border-border-light pt-6">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-text-muted hover:bg-background-light hover:text-text-main transition-all group">
            <span className="material-symbols-outlined text-[22px] group-hover:text-primary">{ICONS.settings}</span>
            Settings
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all group"
          >
            <span className="material-symbols-outlined text-[22px]">{ICONS.logout}</span>
            Logout
          </button>

          <div className="flex items-center gap-3 px-3 mt-2">
            <img
              src="https://picsum.photos/seed/admin/100/100"
              className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover"
              alt="Admin"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-main">Admin User</span>
              <span className="text-[10px] text-text-muted font-semibold uppercase tracking-tight">Super Admin</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
