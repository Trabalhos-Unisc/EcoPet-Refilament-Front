import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'ecopet_lotes';

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveToStorage(lotes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lotes));
}

let nextId = 1;

export function useLotes() {
  const [lotes, setLotes] = useState(() => {
    const loaded = loadFromStorage();
    if (loaded.length > 0) {
      const maxId = loaded.reduce((max, l) => {
        const num = parseInt(l.id.replace('L', ''), 10);
        return num > max ? num : max;
      }, 0);
      nextId = maxId + 1;
    }
    return loaded;
  });

  useEffect(() => { saveToStorage(lotes); }, [lotes]);

  const addLote = useCallback((data) => {
    const id = `L${String(nextId++).padStart(3, '0')}`;
    const novo = { id, data, garrafaIds: [], filamentoProd: 0, processado: false };
    setLotes(prev => [...prev, novo]);
    return novo;
  }, []);

  const removeLote = useCallback((id) => {
    setLotes(prev => prev.filter(l => l.id !== id));
  }, []);

  const addGarrafaToLote = useCallback((loteId, garrafaId) => {
    setLotes(prev => prev.map(l =>
      l.id === loteId
        ? { ...l, garrafaIds: [...l.garrafaIds, garrafaId] }
        : l
    ));
  }, []);

  const removeGarrafaFromLote = useCallback((loteId, garrafaId) => {
    setLotes(prev => prev.map(l =>
      l.id === loteId
        ? { ...l, garrafaIds: l.garrafaIds.filter(id => id !== garrafaId) }
        : l
    ));
  }, []);

  const markAsProcessed = useCallback((loteId, filamentoProd) => {
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
