import { useCallback } from 'react';

export function useRelatorio() {
  const gerarRelatorio = useCallback((lotes, garrafas, calcCO2, calcPecas, calcYield, rendMedioPorGarrafa) => {
    let totalPlastico = 0;
    let totalFilamento = 0;
    let totalGarrafas = 0;

    const detalhes = lotes.map(lote => {
      const garrafasDoLote = garrafas.filter(g => g.loteId === lote.id);
      const pesoTotal = garrafasDoLote.reduce((sum, g) => sum + g.peso, 0);
      const yieldVal = calcYield(lote.filamentoProd, pesoTotal);
      const rendMedio = rendMedioPorGarrafa(lote.filamentoProd, garrafasDoLote.length);

      totalPlastico += pesoTotal;
      totalFilamento += lote.filamentoProd;
      totalGarrafas += garrafasDoLote.length;

      return {
        loteId: lote.id,
        data: lote.data,
        garrafas: garrafasDoLote.length,
        plasticoSalvo: pesoTotal,
        filamentoProduzido: lote.filamentoProd,
        yield: yieldVal,
        rendMedioPorGarrafa: rendMedio,
      };
    });

    const co2Total = calcCO2(totalPlastico);
    const pecasTotal = calcPecas(totalFilamento);

    return {
      detalhes,
      totais: {
        lotes: lotes.length,
        garrafas: totalGarrafas,
        plasticoSalvo: totalPlastico,
        filamentoProduzido: totalFilamento,
        co2Evitado: co2Total,
        pecasEstimadas: pecasTotal,
      },
    };
  }, []);

  const exportar = useCallback((lotes, garrafas) => {
    let text = 'RELATÓRIO ECOPET - EXPORTAÇÃO\n';
    text += `Total de lotes: ${lotes.length}\n\n`;

    lotes.forEach(lote => {
      const garrafasDoLote = garrafas.filter(g => g.loteId === lote.id);
      text += `Lote ${lote.id} | Garrafas: ${garrafasDoLote.length} | Filamento: ${lote.filamentoProd.toFixed(2)} m\n`;
    });

    return text;
  }, []);

  return { gerarRelatorio, exportar };
}
