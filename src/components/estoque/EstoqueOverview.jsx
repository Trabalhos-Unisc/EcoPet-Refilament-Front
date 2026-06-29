import React from 'react';
import Card from '../ui/Card';

import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { Package } from 'lucide-react';

export default function EstoqueOverview({ filamentos }) {
  return (
    <Card className="lg:col-span-2" delay={4}>
      <h3 className="text-xl font-bold text-eco-text mb-1 font-display tracking-wide">Filamentos em Estoque (FIFO)</h3>
      <p className="text-sm text-eco-muted mb-6">Ordem de entrada — o primeiro a entrar é o primeiro a sair</p>
      {filamentos.length === 0 ? (
        <EmptyState message="Estoque vazio" icon={<Package className="w-12 h-12 text-eco-emerald" />} />
      ) : (
        <div className="space-y-4">
          {filamentos.map((f, i) => {
            const pct = f.comprimento > 0 ? (f.estoqueAtual / f.comprimento) * 100 : 0;
            const isEsgotado = f.estoqueAtual <= 0;
            return (
              <div key={f.id} className={`p-5 rounded-2xl border transition-all ${isEsgotado ? 'border-eco-surface/20 opacity-50 bg-eco-dark/30' : 'border-eco-surface/40 hover:border-eco-emerald/30 bg-eco-dark/50 shadow-inner'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-eco-muted px-2 py-1 rounded-md bg-eco-surface/30 border border-eco-surface/30">#{i+1}</span>
                    <span className="text-sm font-semibold text-eco-text tracking-wide">{f.id}</span>
                  </div>
                  <Badge variant={isEsgotado ? 'danger' : 'emerald'}>
                    {isEsgotado ? 'Esgotado' : 'Disponível'}
                  </Badge>
                </div>
                <div className="flex justify-between text-xs font-medium text-eco-muted mb-2">
                  <span>Lote Origem: <span className="text-eco-text">{f.loteOrigemId}</span></span>
                  <span className="font-display tracking-wide text-sm">{f.estoqueAtual.toFixed(2)} / {f.comprimento.toFixed(2)} m</span>
                </div>
                <div className="h-3 bg-eco-surface/40 rounded-full overflow-hidden shadow-inner">
                  <div className={`h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.3)] ${isEsgotado ? 'bg-eco-danger/50 shadow-none' : 'progress-bar'}`} style={{width:`${pct}%`}}/>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
