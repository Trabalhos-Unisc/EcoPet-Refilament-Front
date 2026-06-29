import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'ecopet_processos';

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveToStorage(processos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(processos));
}

export function useExtrusao() {
  const [processos, setProcessos] = useState(() => loadFromStorage());

  useEffect(() => { saveToStorage(processos); }, [processos]);

  /**
   * Processa um lote e retorna o filamento gerado.
   * Equivalent to ProcessoExtrusao.processar() in Java.
   */
  const processar = useCallback((lote, garrafas, rendimento, dataProc, percentualPerda) => {
    const pesoTotal = lote.garrafaIds.reduce((sum, gId) => {
      const g = garrafas.find(gar => gar.id === gId);
      return sum + (g ? g.peso : 0);
    }, 0);

    const pesoPerda = pesoTotal * percentualPerda;
    const pesoAproveitado = pesoTotal - pesoPerda;
    const comprimentoGerado = pesoAproveitado * rendimento;

    const filamentoId = `FIL-${lote.id}-${dataProc}`;
    const filamento = {
      id: filamentoId,
      comprimento: comprimentoGerado,
      loteOrigemId: lote.id,
      estoqueAtual: comprimentoGerado,
    };

    const processo = {
      id: `PROC-${Date.now()}`,
      loteId: lote.id,
      rendimento,
      dataProc,
      percentualPerda,
      pesoPerda,
      pesoTotal,
      pesoAproveitado,
      comprimentoGerado,
      filamentoId: filamento.id,
    };

    setProcessos(prev => [...prev, processo]);

    return { filamento, processo };
  }, []);

  const setAll = useCallback((newProcessos) => {
    setProcessos(newProcessos);
  }, []);

  return {
    processos,
    processar,
    setAll,
  };
}
