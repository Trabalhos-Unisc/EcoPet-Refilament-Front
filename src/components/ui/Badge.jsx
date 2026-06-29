import React from 'react';

const variants = {
  emerald: 'bg-eco-emerald/15 text-eco-emerald border-eco-emerald/30',
  teal: 'bg-eco-teal/15 text-eco-teal border-eco-teal/30',
  lime: 'bg-eco-lime/15 text-eco-lime border-eco-lime/30',
  amber: 'bg-eco-amber/15 text-eco-amber border-eco-amber/30',
  danger: 'bg-eco-danger/15 text-eco-danger border-eco-danger/30',
  muted: 'bg-eco-surface/30 text-eco-muted border-eco-surface/50'
};

export default function Badge({ children, variant = 'emerald', className = '' }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
