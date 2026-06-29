import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Beaker, Cog, Package, BarChart2, X, Leaf, Recycle } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'garrafas', path: '/garrafas', label: 'Garrafas & Lotes', icon: Beaker },
  { id: 'extrusao', path: '/extrusao', label: 'Extrusão', icon: Cog },
  { id: 'estoque', path: '/estoque', label: 'Estoque', icon: Package },
  { id: 'relatorio', path: '/relatorio', label: 'Relatório', icon: BarChart2 },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-eco-dark/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-eco-dark/95 backdrop-blur-2xl border-r border-eco-surface/50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col shadow-2xl lg:shadow-none
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-eco-surface/50 bg-eco-dark/50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eco-emerald to-eco-teal flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text font-display tracking-wide">EcoPet</h1>
            <p className="text-[10px] text-eco-emerald font-semibold tracking-[0.2em] uppercase mt-0.5">Refilament</p>
          </div>
          <button
            className="ml-auto lg:hidden text-eco-muted hover:text-eco-text cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  text-sm font-medium transition-all duration-300 cursor-pointer
                  ${isActive
                    ? 'bg-gradient-to-r from-eco-emerald/20 to-transparent text-eco-emerald shadow-[inset_2px_0_0_var(--color-eco-emerald)]'
                    : 'text-eco-muted hover:text-eco-text hover:bg-eco-surface/30'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-eco-emerald drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-eco-muted'}`} />
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-eco-surface/30">
          <div className="px-4 py-3 rounded-xl bg-eco-surface/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-eco-emerald/20 flex items-center justify-center text-eco-emerald">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-eco-text whitespace-nowrap">Reciclando PET</p>
              <p className="text-[10px] text-eco-teal whitespace-nowrap">em filamento 3D</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
