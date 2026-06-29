import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-eco-dark/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="glass-card w-full max-w-md relative z-10 animate-slide-up shadow-2xl shadow-eco-emerald/10 border-eco-emerald/20">
        <div className="flex items-center justify-between px-6 py-5 border-b border-eco-surface/50 bg-eco-dark/50 rounded-t-[20px]">
          <h3 className="text-lg font-bold text-eco-text font-display tracking-wide">{title}</h3>
          <button 
            onClick={onClose}
            className="text-eco-muted hover:text-eco-text p-1 rounded-lg hover:bg-eco-surface/50 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
