import React from 'react';
import Card from '../ui/Card';

export default function ImpactoCards({ totais }) {
  const cardsData = [
    { label: 'Lotes', value: totais.lotes },
    { label: 'Garrafas', value: totais.garrafas },
    { label: 'Plástico', value: `${(totais.plasticoSalvo*1000).toFixed(0)}g` },
    { label: 'Filamento', value: `${totais.filamentoProduzido.toFixed(2)}m` },
    { label: 'CO₂ Evitado', value: `${totais.co2Evitado.toFixed(3)}kg` },
    { label: 'Peças', value: totais.pecasEstimadas },
  ];

  return (
    <Card delay={6}>
      <h3 className="text-xl font-bold gradient-text mb-6 font-display tracking-wide drop-shadow-sm">Totais Consolidados</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {cardsData.map((item, i) => (
          <div key={i} className="text-center p-4 rounded-2xl bg-eco-dark/50 border border-eco-surface/30 shadow-inner group hover:bg-eco-surface/20 transition-all">
            <p className="text-2xl font-bold text-eco-text font-display group-hover:text-eco-emerald transition-colors drop-shadow-sm">{item.value}</p>
            <p className="text-[10px] text-eco-muted uppercase tracking-[0.15em] mt-1 font-semibold">{item.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
