import React, { useState } from 'react';
import { useGarrafas } from '../hooks/useGarrafas';
import { useLotes } from '../hooks/useLotes';
import Button from '../components/ui/Button';
import GarrafaForm from '../components/garrafas/GarrafaForm';
import GarrafaList from '../components/garrafas/GarrafaList';
import LoteManager from '../components/garrafas/LoteManager';

export default function GarrafasPage() {
  const garrafasHook = useGarrafas();
  const lotesHook = useLotes();
  
  const [showGarrafaModal, setShowGarrafaModal] = useState(false);
  const [showLoteModal, setShowLoteModal] = useState(false);

  const garrafasDisponiveis = garrafasHook.garrafas.filter(g => g.loteId === null);

  return (
    <div className="space-y-8">
      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setShowGarrafaModal(true)}>+ Nova Garrafa</Button>
        <Button variant="secondary" onClick={() => setShowLoteModal(true)}>+ Novo Lote</Button>
      </div>

      <GarrafaList 
        garrafasDisponiveis={garrafasDisponiveis} 
        garrafasHook={garrafasHook} 
      />

      <LoteManager 
        lotes={lotesHook.lotes} 
        lotesHook={lotesHook} 
        garrafasDisponiveis={garrafasDisponiveis} 
        garrafas={garrafasHook.garrafas} 
        showLoteModal={showLoteModal} 
        setShowLoteModal={setShowLoteModal} 
      />

      <GarrafaForm 
        isOpen={showGarrafaModal} 
        onClose={() => setShowGarrafaModal(false)} 
        garrafasHook={garrafasHook} 
      />
    </div>
  );
}
