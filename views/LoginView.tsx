
import React, { useState } from 'react';
import { ICONS } from '../constants';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@audiostore.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === 'admin@audiostore.com' && password === 'password') {
        onLogin();
      } else {
        setError(true);
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-background-light/90 backdrop-blur-md"></div>
      <div className="relative z-10 w-full max-w-[480px] p-6">
        <div className="bg-surface-light shadow-2xl rounded-3xl p-10 border border-border-light transition-all">
          <div className="flex flex-col gap-4 mb-10 text-center">
            <div className="mx-auto bg-primary/15 w-20 h-20 rounded-2xl flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-primary text-5xl">graphic_eq</span>
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-text-main">Admin Login</h1>
            <p className="text-text-muted text-sm font-medium">Welcome back to Audio Store Management</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-8 flex items-start gap-3 animate-shake">
              <span className="material-symbols-outlined text-red-500 text-[20px] mt-0.5">{ICONS.warning}</span>
              <p className="text-red-600 text-sm font-medium leading-relaxed">Invalid credentials. Please check your email and password.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col gap-2">
              <p className="text-sm font-bold text-text-main px-1">Email</p>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[22px] group-focus-within:text-primary transition-colors">{ICONS.mail}</span>
                <input
                  required
                  className="w-full rounded-2xl border-2 border-border-light bg-background-light/50 h-14 pl-12 pr-4 text-base font-medium placeholder:text-text-muted/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                  placeholder="admin@audiostore.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <p className="text-sm font-bold text-text-main">Password</p>
                <a className="text-xs text-primary font-bold hover:underline" href="#">Forgot password?</a>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[22px] group-focus-within:text-primary transition-colors">{ICONS.lock}</span>
                <input
                  required
                  className="w-full rounded-2xl border-2 border-border-light bg-background-light/50 h-14 pl-12 pr-4 text-base font-medium placeholder:text-text-muted/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </label>

            <button
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center overflow-hidden rounded-2xl h-14 px-5 bg-primary hover:bg-primary-dark text-white text-lg font-black tracking-tight transition-all shadow-xl shadow-primary/25 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>
        <div className="mt-12 flex flex-col items-center gap-3 animate-bounce">
          <p className="text-text-muted text-xs font-black uppercase tracking-[0.2em]">Scroll to Explore Panel</p>
          <span className="material-symbols-outlined text-text-muted">{ICONS.arrowDown}</span>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
