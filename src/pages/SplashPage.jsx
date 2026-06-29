import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recycle } from 'lucide-react';

export default function SplashPage() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Começa a sumir depois de 2s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // Navega para o dashboard após o fade out
    const navigateTimer = setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div className={`min-h-screen bg-[#050b14] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-eco-emerald/10 via-transparent to-eco-blue/10 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full border-t-2 border-eco-emerald border-r-2 border-r-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full border-b-2 border-eco-teal border-l-2 border-l-transparent animate-[spin_2s_linear_infinite]" />
          <div className="w-16 h-16 rounded-full bg-eco-emerald/10 flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <Recycle className="w-8 h-8 text-eco-emerald animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-4xl font-display font-bold gradient-text tracking-wide mb-2 drop-shadow-sm">EcoPet</h1>
        <p className="text-sm font-medium text-eco-muted uppercase tracking-[0.2em] animate-pulse">Refilament</p>
      </div>
    </div>
  );
}
