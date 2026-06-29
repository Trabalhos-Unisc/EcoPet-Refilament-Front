import React from 'react';
import Card from '../ui/Card';
import EmptyState from '../ui/EmptyState';
import { FileText } from 'lucide-react';

export default function HistoricoSaidas({ historicoSaidas }) {
  return (
    <Card delay={5}>
      <h3 className="text-xl font-bold text-eco-text mb-1 font-display tracking-wide">Histórico de Saídas</h3>
      <p className="text-sm text-eco-muted mb-6">Registro de retiradas</p>
      {historicoSaidas.length === 0 ? (
        <EmptyState message="Nenhuma saída registrada" icon={<FileText className="w-12 h-12 text-eco-emerald" />} />
      ) : (
        <div className="space-y-4">
          {[...historicoSaidas].reverse().map(s => (
            <div key={s.id} className="p-4 rounded-xl bg-eco-dark/50 border border-eco-surface/30 shadow-inner group hover:bg-eco-surface/20 transition-all">
              <div className="flex justify-between mb-3 border-b border-eco-surface/30 pb-2">
                <span className="text-sm font-bold text-eco-danger font-display tracking-wide drop-shadow-sm">-{s.metros.toFixed(2)} m</span>
                <span className="text-[10px] font-semibold text-eco-muted uppercase tracking-wider">{new Date(s.data).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="space-y-1.5">
                {s.rastreio.map((r, j) => (
                  <p key={j} className="text-xs text-eco-muted flex items-center gap-2">
                    <span className="text-eco-surface">↳</span> 
                    <span className="font-medium text-eco-text">{r.metros.toFixed(2)}m</span> de 
                    <span className="text-eco-teal font-medium bg-eco-teal/10 px-1.5 py-0.5 rounded text-[10px]">{r.filamentoId}</span> 
                    <span className="opacity-70">(lote {r.loteId})</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
