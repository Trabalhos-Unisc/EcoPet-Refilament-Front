import React, { useState } from 'react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { Package, ChevronDown } from 'lucide-react';

export default function LoteManager({ lotes, lotesHook, garrafasDisponiveis, garrafas, showLoteModal, setShowLoteModal }) {
  const [selectedGarrafas, setSelectedGarrafas] = useState([]);
  const [expandedLote, setExpandedLote] = useState(null);

  const toggleGarrafaSelection = (id) => {
    setSelectedGarrafas(prev => 
      prev.includes(id) ? prev.filter(gId => gId !== id) : [...prev, id]
    );
  };

  const [loading, setLoading] = useState(false);

  const handleCriarLote = async (e) => {
    e.preventDefault();
    if (selectedGarrafas.length === 0) return;
    setLoading(true);
    try {
      const hoje = new Date().toISOString().split('T')[0];
      const novoLote = await lotesHook.addLote(hoje);
      
      // Associa as garrafas uma a uma
      for (const garrafaId of selectedGarrafas) {
        const garrafaObj = garrafas.find(g => g.id === garrafaId);
        await lotesHook.addGarrafaToLote(novoLote.id, garrafaObj);
      }
      
      setSelectedGarrafas([]);
      setShowLoteModal(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao criar lote na API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card delay={2}>
        <h3 className="text-xl font-bold text-eco-text mb-1 font-display tracking-wide">Lotes</h3>
        <p className="text-sm text-eco-muted mb-6">Agrupamento de garrafas para processamento</p>
        
        {lotes.length === 0 ? (
          <EmptyState message="Nenhum lote criado" icon={<Package className="w-12 h-12" />} />
        ) : (
          <div className="space-y-4">
            {lotes.map(lote => {
              const garrafasDoLote = garrafas.filter(g => lote.garrafaIds.includes(g.id));
              const isExpanded = expandedLote === lote.id;
              const pesoLote = garrafasDoLote.reduce((acc, curr) => acc + curr.peso, 0);

              return (
                <div key={lote.id} className="rounded-xl border border-eco-surface/50 overflow-hidden bg-eco-dark/30 transition-all">
                  <div 
                    className="flex flex-wrap items-center justify-between p-4 cursor-pointer hover:bg-eco-surface/20 transition-colors"
                    onClick={() => setExpandedLote(isExpanded ? null : lote.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-eco-surface/50 flex items-center justify-center text-eco-muted">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-eco-text">{lote.id}</p>
                        <p className="text-[10px] text-eco-muted">{lote.data}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex text-xs text-eco-muted gap-4 text-right">
                        <span>{lote.garrafaIds.length} garrafas</span>
                        <span className="w-12">{(pesoLote*1000).toFixed(0)}g</span>
                      </div>
                      <Badge variant={lote.processado ? 'emerald' : 'muted'}>
                        {lote.processado ? 'Processado' : 'Aguardando'}
                      </Badge>
                      <button 
                        onClick={(e) => { e.stopPropagation(); lotesHook.removeLote(lote.id); }}
                        className="text-eco-danger hover:text-red-400 text-xs font-medium cursor-pointer"
                        title="Remover Lote"
                      >
                        Excluir
                      </button>
                      <span className={`text-eco-muted transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="p-4 bg-eco-dark-2/50 border-t border-eco-surface/30">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {garrafasDoLote.map(g => (
                          <div key={g.id} className="text-[11px] p-2 rounded-lg bg-eco-surface/20 border border-eco-surface/20 flex justify-between">
                            <span className="text-eco-muted">{g.id}</span>
                            <span className="text-eco-text font-medium">{(g.peso*1000).toFixed(0)}g</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Modal isOpen={showLoteModal} onClose={() => {setShowLoteModal(false); setSelectedGarrafas([]);}} title="Novo Lote">
        <form onSubmit={handleCriarLote} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-eco-muted tracking-wide mb-3">Selecione as garrafas para o lote</label>
            {garrafasDisponiveis.length === 0 ? (
              <p className="text-sm text-eco-muted bg-eco-dark-2 p-4 rounded-xl text-center">Não há garrafas disponíveis. Adicione garrafas primeiro.</p>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {garrafasDisponiveis.map(g => (
                  <label key={g.id} className="flex items-center gap-3 p-3 rounded-xl border border-eco-surface/30 hover:bg-eco-surface/20 cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded text-eco-emerald bg-eco-dark border-eco-surface/50 focus:ring-eco-emerald focus:ring-offset-eco-dark"
                      checked={selectedGarrafas.includes(g.id)}
                      onChange={() => toggleGarrafaSelection(g.id)}
                    />
                    <div className="flex-1 flex justify-between text-sm">
                      <span className="font-medium text-eco-text">{g.id}</span>
                      <span className="text-eco-muted">{(g.peso*1000).toFixed(0)}g</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="pt-2">
            <p className="text-xs text-eco-muted mb-4 text-center">
              {selectedGarrafas.length} garrafa(s) selecionada(s)
            </p>
            <Button type="submit" fullWidth disabled={selectedGarrafas.length === 0 || loading}>
              <Package className="w-4 h-4 mr-1" /> {loading ? "Criando Lote..." : "Criar Lote"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
