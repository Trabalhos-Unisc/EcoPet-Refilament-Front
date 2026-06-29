import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'ecopet_estoque';

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { filamentos: [], totalMetros: 0, historicoSaidas: [] };
  } catch { return { filamentos: [], totalMetros: 0, historicoSaidas: [] }; }
}

function saveToStorage(estoque) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estoque));
}

export function useEstoque() {
  const [estoque, setEstoque] = useState(() => loadFromStorage());

  useEffect(() => { saveToStorage(estoque); }, [estoque]);

  const entrada = useCallback((filamento) => {
    setEstoque(prev => ({
      ...prev,
      filamentos: [...prev.filamentos, filamento],
      totalMetros: prev.totalMetros + filamento.comprimento,
    }));
  }, []);

  const saida = useCallback((metros) => {
    setEstoque(prev => {
      if (metros > prev.totalMetros) {
        throw new Error(`Estoque insuficiente! Solicitado: ${metros.toFixed(2)} m | Disponível: ${prev.totalMetros.toFixed(2)} m`);
      }

      let restante = metros;
      const rastreio = [];
      const newFilamentos = prev.filamentos.map(f => {
        if (restante <= 0) return f;
        const disponivel = f.estoqueAtual;
        if (disponivel <= 0) return f;

        if (disponivel >= restante) {
          rastreio.push({ filamentoId: f.id, metros: restante, loteId: f.loteOrigemId });
          const updated = { ...f, estoqueAtual: disponivel - restante };
          restante = 0;
          return updated;
        } else {
          rastreio.push({ filamentoId: f.id, metros: disponivel, loteId: f.loteOrigemId });
          restante -= disponivel;
          return { ...f, estoqueAtual: 0 };
        }
      });

      const registro = {
        id: Date.now(),
        metros,
        rastreio,
        data: new Date().toISOString(),
      };

      return {
        filamentos: newFilamentos,
        totalMetros: prev.totalMetros - metros,
        historicoSaidas: [...prev.historicoSaidas, registro],
      };
    });
  }, []);

  const setAll = useCallback((newEstoque) => {
    setEstoque(newEstoque);
  }, []);

  return {
    filamentos: estoque.filamentos,
    totalMetros: estoque.totalMetros,
    historicoSaidas: estoque.historicoSaidas,
    entrada,
    saida,
    setAll,
  };
}
