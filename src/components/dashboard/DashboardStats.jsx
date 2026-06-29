import React from 'react';
import StatCard from '../ui/StatCard';
import { Beaker, Package, Zap, Leaf } from 'lucide-react';

export default function DashboardStats({ garrafas, lotes, estoque, co2 }) {
  const lotesCriados = lotes.length;
  const lotesProc = lotes.filter(l => l.processado).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard icon={<Beaker className="w-7 h-7" />} label="Garrafas Coletadas" value={garrafas.length} color="teal" delay={1} />
      <StatCard icon={<Package className="w-7 h-7" />} label="Lotes Criados" value={`${lotesProc}/${lotesCriados}`} color="lime" delay={2} />
      <StatCard icon={<Zap className="w-7 h-7" />} label="Filamento em Estoque" value={estoque.totalMetros.toFixed(2)} unit="m" color="blue" delay={3} />
      <StatCard icon={<Leaf className="w-7 h-7" />} label="CO₂ Evitado" value={co2.toFixed(3)} unit="kg" color="amber" delay={4} />
    </div>
  );
}
