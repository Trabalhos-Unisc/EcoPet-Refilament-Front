import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'ecopet_garrafas';

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveToStorage(garrafas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(garrafas));
}

let nextId = 1;

export function useGarrafas() {
  const [garrafas, setGarrafas] = useState(() => {
    const loaded = loadFromStorage();
    if (loaded.length > 0) {
      const maxId = loaded.reduce((max, g) => {
        const num = parseInt(g.id.replace('G', ''), 10);
        return num > max ? num : max;
      }, 0);
      nextId = maxId + 1;
    }
    return loaded;
  });

  useEffect(() => { saveToStorage(garrafas); }, [garrafas]);

  const addGarrafa = useCallback((peso, dataColeta) => {
    const id = `G${String(nextId++).padStart(3, '0')}`;
    const nova = { id, peso: parseFloat(peso), dataColeta, loteId: null };
    setGarrafas(prev => [...prev, nova]);
    return nova;
  }, []);

  const removeGarrafa = useCallback((id) => {
    setGarrafas(prev => prev.filter(g => g.id !== id));
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
