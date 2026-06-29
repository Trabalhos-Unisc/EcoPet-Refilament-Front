import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  type = 'button',
  className = '',
  fullWidth = false
}) {
  const base = "py-3 px-6 text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2";
  const w = fullWidth ? "w-full" : "";

  const variants = {
    primary: "bg-gradient-to-r from-eco-emerald to-eco-teal text-white hover:shadow-[0_4px_16px_rgba(16,185,129,0.4)] hover:-translate-y-0.5",
    secondary: "bg-eco-surface/30 text-eco-text border border-eco-surface/50 hover:bg-eco-surface/70 hover:border-eco-surface",
    danger: "bg-eco-danger/10 text-eco-danger border border-eco-danger/30 hover:bg-eco-danger/20 hover:border-eco-danger/50"
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${w} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
