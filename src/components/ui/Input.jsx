import React from 'react';

export default function Input({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  min,
  step,
  className = ''
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-xs font-semibold text-eco-muted tracking-wide">{label}</label>}
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        required={required}
        min={min}
        step={step}
        className="w-full bg-eco-dark/50 border border-eco-surface/50 rounded-xl px-4 py-3 text-sm text-eco-text focus:outline-none focus:border-eco-emerald focus:ring-2 focus:ring-eco-emerald/20 transition-all shadow-inner placeholder:text-eco-muted/50" 
      />
    </div>
  );
}
