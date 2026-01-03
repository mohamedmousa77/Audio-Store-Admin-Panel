
import React from 'react';

export const COLORS = {
  primary: '#f49d25',
  primaryDark: '#d68310',
  backgroundLight: '#f8f7f5',
  backgroundDark: '#1a140c',
  surfaceLight: '#ffffff',
  surfaceDark: '#2d2418',
  textMain: '#1c160d',
  textMuted: '#9c7a49',
  borderLight: '#e8ddce',
};

export const ICONS = {
  dashboard: 'dashboard',
  products: 'inventory_2',
  orders: 'shopping_cart',
  customers: 'group',
  categories: 'category',
  analytics: 'bar_chart',
  settings: 'settings',
  logout: 'logout',
  search: 'search',
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  visibility: 'visibility',
  filter: 'filter_list',
  mail: 'mail',
  lock: 'lock',
  warning: 'warning',
  success: 'check_circle',
  calendar: 'calendar_today',
  notifications: 'notifications',
  menu: 'menu',
  arrowDown: 'keyboard_arrow_down',
  arrowForward: 'arrow_forward',
};

export const NAVIGATION = [
  { label: 'Dashboard', icon: ICONS.dashboard, path: '/' },
  { label: 'Products', icon: ICONS.products, path: '/products' },
  { label: 'Orders', icon: ICONS.orders, path: '/orders' },
  { label: 'Customers', icon: ICONS.customers, path: '/customers' },
  { label: 'Categories', icon: ICONS.categories, path: '/categories' },
];
