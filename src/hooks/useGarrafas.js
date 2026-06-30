import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';

let nextId = 1;

export function useGarrafas() {
  const [garrafas, setGarrafas] = useState([]);

  // Fetch initial data from backend
  useEffect(() => {
    api.get('/garrafas').then(response => {
      const data = response.data || [];
      if (data.length > 0) {
        const maxId = data.reduce((max, g) => {
          if (!g.id) return max;
          const num = parseInt(g.id.replace('G', ''), 10);
          return num > max ? num : max;
        }, 0);
        nextId = maxId + 1;
      }
      setGarrafas(data);
    }).catch(error => console.error("Erro ao carregar garrafas:", error));
  }, []);

  const addGarrafa = useCallback(async (peso, dataColeta) => {
    const id = `G${String(nextId++).padStart(3, '0')}`;
    const nova = { id, peso: parseFloat(peso), dataColeta, loteId: null };
    
    try {
      await api.post('/garrafas', nova);
      setGarrafas(prev => [...prev, nova]);
      return nova;
    } catch (error) {
      console.error("Erro ao adicionar garrafa:", error);
      throw error; // Let the UI handle the error (Toast)
    }
  }, []);

  const removeGarrafa = useCallback(async (id) => {
    try {
      await api.delete(`/garrafas/${id}`);
      setGarrafas(prev => prev.filter(g => g.id !== id));
    } catch (error) {
      console.error("Erro ao deletar garrafa:", error);
      throw error;
    }
  }, []);

  const assignToLote = useCallback((garrafaId, loteId) => {
    setGarrafas(prev => prev.map(g =>
      g.id === garrafaId ? { ...g, loteId } : g
    ));
  }, []);

  const unassignFromLote = useCallback((garrafaId) => {
    setGarrafas(prev => prev.map(g =>
      g.id === garrafaId ? { ...g, loteId: null } : g
    ));
  }, []);

  const getGarrafasDisponiveis = useCallback(() => {
    return garrafas.filter(g => g.loteId === null);
  }, [garrafas]);

  const getGarrafasByLote = useCallback((loteId) => {
    return garrafas.filter(g => g.loteId === loteId);
  }, [garrafas]);

  const setAll = useCallback((newGarrafas) => {
    const maxId = newGarrafas.reduce((max, g) => {
      if (!g.id) return max;
      const num = parseInt(g.id.replace('G', ''), 10);
      return num > max ? num : max;
    }, 0);
    nextId = maxId + 1;
    setGarrafas(newGarrafas);
  }, []);

  return {
    garrafas,
    addGarrafa,
    removeGarrafa,
    assignToLote,
    unassignFromLote,
    getGarrafasDisponiveis,
    getGarrafasByLote,
    setAll,
  };
}
