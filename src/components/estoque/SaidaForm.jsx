import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Package } from 'lucide-react';

export default function SaidaForm({ metrosSaida, setMetrosSaida, handleSaida }) {
  return (
    <Card delay={4}>
      <h3 className="text-xl font-bold text-eco-text mb-1 font-display tracking-wide">Registrar Saída</h3>
      <p className="text-sm text-eco-muted mb-6">Uso de filamento para impressão 3D</p>
      <form onSubmit={handleSaida} className="space-y-6">
        <Input 
          label="Metros Utilizados"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Ex: 50.5"
          value={metrosSaida}
          onChange={e => setMetrosSaida(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          fullWidth 
          disabled={!metrosSaida || parseFloat(metrosSaida) <= 0}
        >
          <Package className="w-4 h-4 mr-1" /> Registrar Saída
        </Button>
      </form>
    </Card>
  );
}
