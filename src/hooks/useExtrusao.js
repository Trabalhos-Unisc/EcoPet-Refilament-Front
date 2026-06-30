import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';

export function useExtrusao() {
  const [processos, setProcessos] = useState([]);

  useEffect(() => {
    api.get('/extrusao').then(response => {
      const data = response.data || [];
      // Map backend fields to frontend fields
      const mapped = data.map(p => ({
        id: p.id || `PROC-${Date.now()}-${Math.random()}`,
        loteId: p.lote?.id,
        rendimento: p.rendimento,
        dataProc: p.dataProc,
        percentualPerda: p.percentualPerda,
        pesoPerda: p.pesoPerda,
        pesoTotal: p.lote ? p.lote.pesoTotal : 0,
        pesoAproveitado: (p.lote ? p.lote.pesoTotal : 0) - p.pesoPerda,
        comprimentoGerado: ((p.lote ? p.lote.pesoTotal : 0) - p.pesoPerda) * p.rendimento,
        filamentoId: `FIL-${p.lote?.id}-${p.dataProc}`,
      }));
      setProcessos(mapped);
    }).catch(err => console.error("Erro ao carregar processos de extrusão", err));
  }, []);

  /**
   * Processa um lote e retorna o filamento gerado.
   */
  const processar = useCallback(async (lote, garrafas, rendimento, dataProc, percentualPerda) => {
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

    try {
      // Backend: POST /api/extrusao/processar expects ProcessoExtrusao
      await api.post('/extrusao/processar', {
        lote: { id: lote.id }, // Só precisa mandar o ID para o Spring associar
        rendimento: parseFloat(rendimento),
        dataProc,
        percentualPerda: parseFloat(percentualPerda)
      });
      setProcessos(prev => [...prev, processo]);
      return { filamento, processo };
    } catch (err) {
      console.error("Erro ao processar lote na API:", err);
      throw err;
    }
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
