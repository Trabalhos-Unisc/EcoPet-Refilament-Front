import React from 'react';
import Card from '../ui/Card';
import { Info } from 'lucide-react';

export default function EntradaForm() {
  return (
    <Card delay={1}>
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-eco-blue/20 text-eco-blue flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-eco-text">Entrada Automática</h4>
          <p className="text-sm text-eco-muted mt-1 leading-relaxed">
            As entradas no estoque são realizadas automaticamente ao processar uma extrusão. 
            Acesse a página de <strong>Extrusão</strong> para converter lotes em filamento.
          </p>
        </div>
      </div>
    </Card>
  );
}
