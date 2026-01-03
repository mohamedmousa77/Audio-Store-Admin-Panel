
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import ProductsView from './views/ProductsView';
import OrdersView from './views/OrdersView';
import CustomersView from './views/CustomersView';
import CategoriesView from './views/CategoriesView';
import { StoreProvider } from './context/StoreContext';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <StoreProvider>
      <HashRouter>
        <div className="flex h-screen overflow-hidden bg-background-light">
          <Sidebar onLogout={() => setIsAuthenticated(false)} />
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
              <div className="max-w-[1200px] mx-auto pb-12">
                <Routes>
                  <Route path="/" element={<DashboardView />} />
                  <Route path="/products" element={<ProductsView />} />
                  <Route path="/orders" element={<OrdersView />} />
                  <Route path="/customers" element={<CustomersView />} />
                  <Route path="/categories" element={<CategoriesView />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
