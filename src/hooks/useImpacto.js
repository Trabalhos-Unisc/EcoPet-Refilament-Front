import { useState, useCallback } from 'react';

export function useImpacto() {
  const [config, setConfig] = useState({
    co2PorKgPet: 2.9,
    metrosPorPeca: 5.0,
  });

  const calcCO2 = useCallback((kg) => {
    return kg * config.co2PorKgPet;
  }, [config.co2PorKgPet]);

  const calcPecas = useCallback((metros) => {
    return Math.floor(metros / config.metrosPorPeca);
  }, [config.metrosPorPeca]);

  const calcYield = useCallback((filamentoProd, pesoTotal) => {
    if (pesoTotal === 0) return 0;
    return filamentoProd / pesoTotal;
  }, []);

  const rendMedioPorGarrafa = useCallback((filamentoProd, totalGarrafas) => {
    if (totalGarrafas === 0) return 0;
    return filamentoProd / totalGarrafas;
  }, []);

  const updateConfig = useCallback((newConfig) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  return {
    config,
    calcCO2,
    calcPecas,
    calcYield,
    rendMedioPorGarrafa,
    updateConfig,
  };
}
