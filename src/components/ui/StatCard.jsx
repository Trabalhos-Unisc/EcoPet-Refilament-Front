import React from 'react';

const colorClasses = {
  emerald: 'from-eco-emerald/20 to-eco-emerald/5 border border-eco-emerald/20',
  teal: 'from-eco-teal/20 to-eco-teal/5 border border-eco-teal/20',
  lime: 'from-eco-lime/20 to-eco-lime/5 border border-eco-lime/20',
  amber: 'from-eco-amber/20 to-eco-amber/5 border border-eco-amber/20',
  blue: 'from-eco-blue/20 to-eco-blue/5 border border-eco-blue/20',
};

const iconBgClasses = {
  emerald: 'bg-eco-emerald/20 text-eco-emerald shadow-[inset_0_0_12px_rgba(16,185,129,0.3)]',
  teal: 'bg-eco-teal/20 text-eco-teal shadow-[inset_0_0_12px_rgba(20,184,166,0.3)]',
  lime: 'bg-eco-lime/20 text-eco-lime shadow-[inset_0_0_12px_rgba(163,230,53,0.3)]',
  amber: 'bg-eco-amber/20 text-eco-amber shadow-[inset_0_0_12px_rgba(245,158,11,0.3)]',
  blue: 'bg-eco-blue/20 text-eco-blue shadow-[inset_0_0_12px_rgba(59,130,246,0.3)]',
};

export default function StatCard({ icon, label, value, unit, color = 'emerald', delay = 0 }) {
  return (
    <div
      className={`
        animate-fade-in stagger-${delay}
        glass-card glass-card-hover p-6 
        bg-gradient-to-br ${colorClasses[color]}
        transition-all duration-300 relative overflow-hidden group
      `}
    >
      {/* Decorative glow */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${iconBgClasses[color]}`} />
      
      <div className="flex items-center justify-between relative z-10 gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs font-semibold text-eco-muted uppercase tracking-wider mb-1 truncate" title={label}>{label}</p>
          <div className="flex items-baseline gap-1.5 truncate">
            <span className="text-2xl md:text-3xl font-bold text-eco-text font-display tracking-tight drop-shadow-md truncate">{value}</span>
            {unit && <span className="text-xs text-eco-muted font-medium ml-1">{unit}</span>}
          </div>
        </div>
        <div className={`w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-2xl flex items-center justify-center shadow-inner backdrop-blur-md ${iconBgClasses[color]}`}>
          <span className="text-xl md:text-2xl flex items-center justify-center drop-shadow-sm">{icon}</span>
        </div>
      </div>
    </div>
  );
}
