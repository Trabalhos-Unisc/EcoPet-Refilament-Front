import React, { useState } from 'react';
import { useRelatorio } from '../hooks/useRelatorio';
import { useLotes } from '../hooks/useLotes';
import { useGarrafas } from '../hooks/useGarrafas';
import { useImpacto } from '../hooks/useImpacto';
import ImpactoCards from '../components/relatorio/ImpactoCards';
import LoteDetail from '../components/relatorio/LoteDetail';
import ExportButton from '../components/relatorio/ExportButton';
import Button from '../components/ui/Button';
import { Settings } from 'lucide-react';

export default function RelatorioPage() {
  const { gerarRelatorio, exportar } = useRelatorio();
  const { lotes } = useLotes();
  const { garrafas } = useGarrafas();
  const { config, calcCO2, calcPecas, calcYield, rendMedioPorGarrafa } = useImpacto();

  const rel = gerarRelatorio(lotes, garrafas, calcCO2, calcPecas, calcYield, rendMedioPorGarrafa);
  const [configOpen, setConfigOpen] = useState(false);

  const handleExport = () => {
    const text = exportar(lotes, garrafas);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-ecopet-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setConfigOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <ExportButton handleExport={handleExport} />
        <Button variant="secondary" onClick={() => setConfigOpen(!configOpen)}>
          <Settings className="w-4 h-4 mr-1 inline-block" /> {configOpen ? 'Fechar Config' : 'Configurações'}
        </Button>
      </div>

      {configOpen && (
        <div className="glass-card p-6 animate-fade-in border-eco-emerald/30">
          <h3 className="text-base font-bold text-eco-emerald mb-2">Parâmetros de Cálculo</h3>
          <ul className="text-sm text-eco-muted space-y-1">
            <li>Densidade Linear: <span className="text-eco-text">{config.densidadeLinear} kg/m</span></li>
            <li>Fator CO₂: <span className="text-eco-text">{config.fatorCO2} kg CO₂ / kg Plástico</span></li>
            <li>Metros por Peça: <span className="text-eco-text">{config.metrosPorPecaEstimada} m</span></li>
          </ul>
        </div>
      )}

      <LoteDetail detalhes={rel.detalhes} />
      <ImpactoCards totais={rel.totais} />
    </div>
  );
}
