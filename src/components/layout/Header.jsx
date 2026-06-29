import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const TITLES = {
  '/dashboard': 'Dashboard',
  '/garrafas': 'Garrafas & Lotes',
  '/extrusao': 'Extrusão',
  '/estoque': 'Estoque',
  '/relatorio': 'Relatório'
};

export default function Header({ setSidebarOpen }) {
  const location = useLocation();
  const title = TITLES[location.pathname] || 'Dashboard';

  return (
    <header className="sticky top-0 z-30 bg-eco-dark/70 backdrop-blur-xl border-b border-eco-surface/50 px-4 lg:px-8 py-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden w-10 h-10 rounded-xl bg-eco-surface/30 flex items-center justify-center text-eco-muted hover:text-eco-text hover:bg-eco-surface/50 transition-colors cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-eco-text font-display tracking-wide">
              {title}
            </h2>
            <p className="text-xs text-eco-muted mt-0.5">
              Sistema de Reciclagem PET → Filamento 3D
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-eco-emerald/10 border border-eco-emerald/20 text-xs text-eco-emerald font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-eco-emerald shadow-[0_0_8px_var(--color-eco-emerald)] animate-pulse" />
          Sistema Online
        </div>
      </div>
    </header>
  );
}
