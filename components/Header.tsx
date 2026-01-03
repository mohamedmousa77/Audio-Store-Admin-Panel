
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ICONS } from '../constants';

const Header: React.FC = () => {
  const location = useLocation();
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard Overview';
    return path.substring(1).charAt(0).toUpperCase() + path.substring(2) + ' Management';
  };

  return (
    <header className="flex items-center justify-between px-8 py-5 bg-surface-light border-b border-border-light sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-text-muted hover:text-text-main">
          <span className="material-symbols-outlined">{ICONS.menu}</span>
        </button>
        <h2 className="text-xl font-black text-text-main">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center bg-background-light rounded-xl px-4 py-2 border border-border-light">
          <span className="material-symbols-outlined text-text-muted text-[18px] mr-2">{ICONS.calendar}</span>
          <span className="text-sm font-bold text-text-main">Oct 27, 2023</span>
        </div>

        <div className="relative">
          <button className="text-text-muted hover:text-primary transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[26px]">{ICONS.notifications}</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-surface-light"></span>
          </button>
        </div>

        <div className="w-px h-6 bg-border-light"></div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden sm:flex">
            <p className="text-sm font-bold text-text-main">Jane Doe</p>
            <p className="text-[10px] text-text-muted font-bold uppercase">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary border-2 border-primary/20">JD</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
