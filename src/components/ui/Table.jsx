import React from 'react';

export function Table({ children, className = '' }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        {children}
      </table>
    </div>
  );
}

export function Thead({ children }) {
  return (
    <thead>
      <tr className="text-eco-muted text-xs uppercase tracking-wider border-b border-eco-surface/30 bg-eco-dark/20">
        {children}
      </tr>
    </thead>
  );
}

export function Th({ children, className = '', align = 'left' }) {
  const alignClass = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
  return (
    <th className={`py-4 px-4 ${alignClass} font-semibold ${className}`}>
      {children}
    </th>
  );
}

export function Tbody({ children }) {
  return <tbody>{children}</tbody>;
}

export function Tr({ children, className = '', onClick }) {
  const hoverClass = onClick ? 'hover:bg-eco-surface/20 cursor-pointer transition-colors' : '';
  return (
    <tr 
      className={`border-b border-eco-surface/10 ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function Td({ children, className = '', align = 'left' }) {
  const alignClass = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
  return (
    <td className={`py-4 px-4 ${alignClass} text-eco-text ${className}`}>
      {children}
    </td>
  );
}
