import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Cog } from 'lucide-react';

export default function ExtrusaoForm({ 
  lotesDisponiveis, 
  loteId, 
  setLoteId, 
  percPerda, 
  setPercPerda, 
  dataProc, 
  setDataProc, 
  handleProcessar 
}) {
  return (
    <Card delay={1}>
      <h3 className="text-xl font-bold text-eco-text mb-1 font-display tracking-wide">Processar Extrusão</h3>
      <p className="text-sm text-eco-muted mb-6">Converta um lote de garrafas em filamento</p>
      <form onSubmit={handleProcessar} className="space-y-6">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-eco-muted tracking-wide">Lote</label>
          <select 
            className="w-full bg-eco-dark/50 border border-eco-surface/50 rounded-xl px-4 py-3 text-sm text-eco-text focus:outline-none focus:border-eco-emerald focus:ring-2 focus:ring-eco-emerald/20 transition-all shadow-inner"
            value={loteId} 
            onChange={e => setLoteId(e.target.value)} 
            required
          >
            <option value="" disabled>Selecione um lote</option>
            {lotesDisponiveis.map(l => (
              <option key={l.id} value={l.id}>{l.id} ({l.garrafaIds.length} garrafas)</option>
            ))}
          </select>
          {lotesDisponiveis.length === 0 && (
            <div className="flex items-start gap-2 p-3 mt-3 bg-eco-amber/10 border border-eco-amber/20 rounded-lg">
              <span className="text-eco-amber text-sm mt-0.5">⚠️</span>
              <p className="text-xs text-eco-amber/90 font-medium leading-relaxed">
                Nenhum lote disponível para extrusão. Vá em "Garrafas & Lotes" e agrupe algumas garrafas.
              </p>
            </div>
          )}
        </div>
        <Input 
          label="Percentual de Perda"
          type="number"
          step="0.01"
          min="0"
          max="1"
          placeholder="Ex: 0.08 = 8%"
          value={percPerda}
          onChange={e => setPercPerda(e.target.value)}
          required
        />
        <Input 
          label="Data do Processamento"
          type="date"
          value={dataProc}
          onChange={e => setDataProc(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          fullWidth 
          disabled={!loteId || lotesDisponiveis.length === 0}
          className="mt-2"
        >
          <Cog className="w-4 h-4 mr-1" /> Processar Extrusão
        </Button>
      </form>
    </Card>
  );
}
