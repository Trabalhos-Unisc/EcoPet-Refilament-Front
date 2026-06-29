import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';

export default function ImpactChart({ lotes, totalFilProd, pecas, pesoTotal }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const maxFilamento = Math.max(...lotes.map(l => l.filamentoProd || 0), 1);

  return (
    <Card className="lg:col-span-2" delay={5}>
      <h3 className="text-xl font-bold text-eco-text mb-1 font-display tracking-wide">Filamento por Lote</h3>
      <p className="text-sm text-eco-muted mb-6">Resultado de cada extrusão</p>
      {lotes.filter(l=>l.processado).length === 0 ? (
        <p className="text-center py-8 text-eco-muted text-sm">Nenhum lote processado</p>
      ) : (
        <div className="space-y-4">
          {lotes.filter(l => l.processado).map(l => (
            <div key={l.id} className="space-y-2 group">
              <div className="flex justify-between text-xs font-semibold text-eco-muted group-hover:text-eco-text transition-colors">
                <span>{l.id}</span>
                <span>{l.filamentoProd?.toFixed(2)} m</span>
              </div>
              <div className="h-4 bg-eco-surface/30 rounded-full overflow-hidden shadow-inner relative">
                <div className="absolute inset-0 bg-eco-dark-2/50 backdrop-blur-sm" />
                <div 
                  className="h-full progress-bar rounded-full transition-all duration-1000 ease-out relative z-10 shadow-[0_0_12px_rgba(16,185,129,0.5)]" 
                  style={{width: mounted ? `${(l.filamentoProd / maxFilamento) * 100}%` : '0%'}}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-eco-surface/50">
        <div className="text-center">
          <p className="text-2xl font-bold text-eco-emerald font-display drop-shadow-sm">{totalFilProd.toFixed(2)}</p>
          <p className="text-[10px] text-eco-muted uppercase tracking-[0.15em] font-semibold mt-1">Metros Produzidos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-eco-teal font-display drop-shadow-sm">{pecas}</p>
          <p className="text-[10px] text-eco-muted uppercase tracking-[0.15em] font-semibold mt-1">Peças Estimadas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-eco-lime font-display drop-shadow-sm">{(pesoTotal*1000).toFixed(0)}</p>
          <p className="text-[10px] text-eco-muted uppercase tracking-[0.15em] font-semibold mt-1">Gramas Recicladas</p>
        </div>
      </div>
    </Card>
  );
}
