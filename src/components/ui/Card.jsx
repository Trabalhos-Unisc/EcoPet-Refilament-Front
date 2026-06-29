import React from 'react';

export default function Card({ children, className = '', hover = false, padding = 'p-6 lg:p-8', delay = 0 }) {
  return (
    <div
      className={`
        glass-card ${hover ? 'glass-card-hover' : ''} 
        ${padding} 
        animate-fade-in stagger-${delay} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
