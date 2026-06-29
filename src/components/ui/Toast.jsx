import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Toast({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation in
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for transition
  };

  const types = {
    success: {
      bg: 'bg-eco-emerald/15',
      border: 'border-eco-emerald/30',
      text: 'text-eco-emerald',
      icon: <CheckCircle className="w-5 h-5 text-eco-emerald" />
    },
    error: {
      bg: 'bg-eco-danger/15',
      border: 'border-eco-danger/30',
      text: 'text-eco-danger',
      icon: <XCircle className="w-5 h-5 text-eco-danger" />
    }
  };

  const style = types[type] || types.success;

  return (
    <div 
      className={`flex items-center gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out transform ${style.bg} ${style.border} ${style.text}
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} max-w-sm w-full`}
    >
      <div className="flex-shrink-0">
        {style.icon}
      </div>
      <p className="text-sm font-semibold flex-1">{message}</p>
      <button 
        onClick={handleClose} 
        className="opacity-70 hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-black/10"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
