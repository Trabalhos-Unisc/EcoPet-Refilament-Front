import React, { useState } from 'react';
import { useEstoque } from '../hooks/useEstoque';
import { useToast } from '../contexts/ToastContext';
import EstoqueOverview from '../components/estoque/EstoqueOverview';
import EntradaForm from '../components/estoque/EntradaForm';
import SaidaForm from '../components/estoque/SaidaForm';
import HistoricoSaidas from '../components/estoque/HistoricoSaidas';

export default function EstoquePage() {
  const { filamentos, totalMetros, historicoSaidas, saida } = useEstoque();
  const estoque = { filamentos, totalMetros, historicoSaidas };
  const [metrosSaida, setMetrosSaida] = useState('');
  const { addToast } = useToast();

  const handleSaida = (e) => {
    e.preventDefault();
    try {
      saida(parseFloat(metrosSaida));
      addToast(`Retirada de ${metrosSaida}m registrada com sucesso!`, 'success');
      setMetrosSaida('');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 animate-fade-in stagger-1 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-10 bg-eco-text group-hover:opacity-20 transition-opacity" />
          <p className="text-xs font-semibold text-eco-muted uppercase tracking-[0.15em] mb-2">Filamentos</p>
          <p className="text-3xl font-bold text-eco-text font-display drop-shadow-md">{estoque.filamentos.length}</p>
        </div>
        <div className="glass-card p-6 animate-fade-in stagger-2 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-10 bg-eco-emerald group-hover:opacity-30 transition-opacity" />
          <p className="text-xs font-semibold text-eco-muted uppercase tracking-[0.15em] mb-2">Total Disponível</p>
          <p className="text-3xl font-bold text-eco-emerald font-display drop-shadow-md">{estoque.totalMetros.toFixed(2)} <span className="text-base font-medium text-eco-muted/80 tracking-normal">m</span></p>
        </div>
        <div className="glass-card p-6 animate-fade-in stagger-3 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-10 bg-eco-text group-hover:opacity-20 transition-opacity" />
          <p className="text-xs font-semibold text-eco-muted uppercase tracking-[0.15em] mb-2">Saídas Registradas</p>
          <p className="text-3xl font-bold text-eco-text font-display drop-shadow-md">{estoque.historicoSaidas.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col space-y-8">
          <EntradaForm />
          <EstoqueOverview filamentos={estoque.filamentos} />
        </div>
        <div className="space-y-8">
          <SaidaForm metrosSaida={metrosSaida} setMetrosSaida={setMetrosSaida} handleSaida={handleSaida} />
          <HistoricoSaidas historicoSaidas={estoque.historicoSaidas} />
        </div>
      </div>
    </div>
  );
}
