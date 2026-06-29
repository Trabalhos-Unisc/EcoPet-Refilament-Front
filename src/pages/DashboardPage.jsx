import React from 'react';
import { useGarrafas } from '../hooks/useGarrafas';
import { useLotes } from '../hooks/useLotes';
import { useEstoque } from '../hooks/useEstoque';
import { useImpacto } from '../hooks/useImpacto';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentActivity from '../components/dashboard/RecentActivity';
import ImpactChart from '../components/dashboard/ImpactChart';
import { Cog, Beaker, Package } from 'lucide-react';

export default function DashboardPage() {
  const { garrafas } = useGarrafas();
  const { lotes } = useLotes();
  const { filamentos, totalMetros, historicoSaidas } = useEstoque();
  const { calcCO2, calcPecas } = useImpacto();

  const estoque = { filamentos, totalMetros, historicoSaidas };

  const totalFilProd = lotes.reduce((acc, curr) => acc + (curr.filamentoProd || 0), 0);
  const pesoTotal = lotes.filter(l => l.processado).reduce((acc, l) => {
    return acc + garrafas.filter(g => l.garrafaIds.includes(g.id)).reduce((sum, g) => sum + g.peso, 0);
  }, 0);
  
  const co2Evitado = calcCO2(pesoTotal);
  const pecas = calcPecas(totalFilProd);

  // Generate recent activity dynamically based on items
  const activities = [
    ...lotes.map(l => ({ 
      id: `l-${l.id}`, 
      type: 'lote', 
      title: l.processado ? `Lote ${l.id} → ${l.filamentoProd?.toFixed(2)}m` : `Novo Lote: ${l.id}`, 
      date: l.data, 
      icon: <Cog className="w-6 h-6 text-eco-emerald" />
    })),
    ...garrafas.map(g => ({ 
      id: `g-${g.id}`, 
      type: 'garrafa', 
      title: `Garrafa ${g.id} (${(g.peso*1000).toFixed(0)}g)`, 
      date: g.dataColeta, 
      icon: <Beaker className="w-6 h-6 text-eco-teal" /> 
    })),
    ...estoque.historicoSaidas.map(s => ({
      id: `s-${s.id}`,
      type: 'saida',
      title: `Saída de ${s.metros.toFixed(2)}m`,
      date: s.data,
      icon: <Package className="w-6 h-6 text-eco-amber" />
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-8">
      <DashboardStats 
        garrafas={garrafas} 
        lotes={lotes} 
        estoque={estoque} 
        co2={co2Evitado} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ImpactChart 
          lotes={lotes} 
          totalFilProd={totalFilProd} 
          pecas={pecas} 
          pesoTotal={pesoTotal} 
        />
        <RecentActivity 
          activities={activities} 
        />
      </div>
    </div>
  );
}
