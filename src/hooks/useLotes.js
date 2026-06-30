import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';

let nextId = 1;

export function useLotes() {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    api.get('/lotes').then(response => {
      const data = response.data || [];
      if (data.length > 0) {
        const maxId = data.reduce((max, l) => {
          if (!l.id) return max;
          const num = parseInt(l.id.replace('L', ''), 10);
          return num > max ? num : max;
        }, 0);
        nextId = maxId + 1;
      }
      // O backend pode retornar garrafas ao invés de garrafaIds, 
      // precisaremos mapear para manter a compatibilidade com o front.
      const mappedLotes = data.map(l => ({
        ...l,
        garrafaIds: l.garrafa ? l.garrafa.map(g => g.id) : (l.garrafaIds || []),
        processado: l.filamentoProd > 0
      }));
      setLotes(mappedLotes);
    }).catch(error => console.error("Erro ao carregar lotes:", error));
  }, []);

  const addLote = useCallback(async (data) => {
    const id = `L${String(nextId++).padStart(3, '0')}`;
    const novo = { id, data, garrafaIds: [], filamentoProd: 0, processado: false };
    
    try {
      await api.post('/lotes', { id, data, garrafa: [], filamentoProd: 0 });
      setLotes(prev => [...prev, novo]);
      return novo;
    } catch (error) {
      console.error("Erro ao criar lote:", error);
      throw error;
    }
  }, []);

  const removeLote = useCallback(async (id) => {
    try {
      await api.delete(`/lotes/${id}`);
      setLotes(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error("Erro ao deletar lote:", error);
      throw error;
    }
  }, []);

  const addGarrafaToLote = useCallback(async (loteId, garrafa) => {
    try {
      // Backend: @PostMapping("/{id}/garrafas") => espera uma Garrafa
      // Enviamos o objeto completo para evitar erros de validação (400 Bad Request)
      await api.post(`/lotes/${loteId}/garrafas`, garrafa);
      
      setLotes(prev => prev.map(l =>
        l.id === loteId
          ? { ...l, garrafaIds: [...l.garrafaIds, garrafa.id] }
          : l
      ));
    } catch (error) {
      console.error("Erro ao adicionar garrafa ao lote:", error);
      throw error;
    }
  }, []);

  const removeGarrafaFromLote = useCallback(async (loteId, garrafaId) => {
    try {
      await api.delete(`/lotes/${loteId}/garrafas/${garrafaId}`);
      setLotes(prev => prev.map(l =>
        l.id === loteId
          ? { ...l, garrafaIds: l.garrafaIds.filter(id => id !== garrafaId) }
          : l
      ));
    } catch (error) {
      console.error("Erro ao remover garrafa do lote:", error);
      throw error;
    }
  }, []);

  const markAsProcessed = useCallback((loteId, filamentoProd) => {
    // Backend não tem endpoint PUT para lote, a lógica é tratada no processo de extrusão
    setLotes(prev => prev.map(l =>
      l.id === loteId
        ? { ...l, processado: true, filamentoProd }
        : l
    ));
  }, []);

  const getLotesDisponiveis = useCallback(() => {
    return lotes.filter(l => !l.processado && l.garrafaIds.length > 0);
  }, [lotes]);

  const getPesoTotal = useCallback((loteId, garrafas) => {
    const lote = lotes.find(l => l.id === loteId);
    if (!lote) return 0;
    return lote.garrafaIds.reduce((sum, gId) => {
      const g = garrafas.find(gar => gar.id === gId);
      return sum + (g ? g.peso : 0);
    }, 0);
  }, [lotes]);

  const setAll = useCallback((newLotes) => {
    const maxId = newLotes.reduce((max, l) => {
      if (!l.id) return max;
      const num = parseInt(l.id.replace('L', ''), 10);
      return num > max ? num : max;
    }, 0);
    nextId = maxId + 1;
    setLotes(newLotes);
  }, []);

  return {
    lotes,
    addLote,
    removeLote,
    addGarrafaToLote,
    removeGarrafaFromLote,
    markAsProcessed,
    getLotesDisponiveis,
    getPesoTotal,
    setAll,
  };
}
