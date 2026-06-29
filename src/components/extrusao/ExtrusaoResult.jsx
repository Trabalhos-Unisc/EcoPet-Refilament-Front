import React from 'react';
import Card from '../ui/Card';
import { Eye } from 'lucide-react';

export default function ExtrusaoResult({ preview }) {
  return (
    <Card delay={2}>
      <h3 className="text-xl font-bold text-eco-text mb-1 font-display tracking-wide">Preview</h3>
      <p className="text-sm text-eco-muted mb-6">Resultado estimado antes de processar</p>
      {!preview ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-eco-surface/30 rounded-2xl bg-eco-dark/20">
          <Eye className="w-10 h-10 text-eco-muted/50 mb-4" />
          <p className="text-center text-eco-muted text-sm font-medium">Selecione um lote para ver o preview</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-eco-surface/50 bg-eco-dark/50">
            <p className="text-xs text-eco-muted mb-1 uppercase tracking-wider font-semibold">Peso Total do Lote</p>
            <p className="text-lg font-bold text-eco-text">{(preview.pesoTotal * 1000).toFixed(0)} <span className="text-sm text-eco-muted font-normal">g</span></p>
          </div>
          <div className="p-4 rounded-xl border border-eco-amber/20 bg-eco-amber/5">
            <p className="text-xs text-eco-amber mb-1 uppercase tracking-wider font-semibold">Perda Estimada</p>
            <p className="text-lg font-bold text-eco-amber/90">{(preview.pesoPerda * 1000).toFixed(0)} <span className="text-sm text-eco-amber/70 font-normal">g</span></p>
          </div>
          <div className="p-5 rounded-2xl border border-eco-emerald/30 bg-eco-emerald/10 shadow-inner">
            <p className="text-xs text-eco-emerald mb-1 uppercase tracking-wider font-semibold">Filamento a Produzir</p>
            <p className="text-3xl font-bold text-eco-emerald font-display tracking-wide drop-shadow-sm">{preview.comprimentoGerado.toFixed(2)} <span className="text-base text-eco-emerald/70 font-medium">m</span></p>
          </div>
        </div>
      )}
    </Card>
  );
}
