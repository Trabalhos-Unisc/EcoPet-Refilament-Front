import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Save } from 'lucide-react';

export default function GarrafaForm({ isOpen, onClose, garrafasHook }) {
  const [peso, setPeso] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!peso) return;
    
    setLoading(true);
    try {
      const hoje = new Date().toISOString().split('T')[0];
      await garrafasHook.addGarrafa(parseFloat(peso), hoje);
      setPeso('');
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar garrafa na API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Garrafa">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Peso (kg)"
          type="number"
          step="0.001"
          min="0.001"
          placeholder="Ex: 0.028"
          value={peso}
          onChange={e => setPeso(e.target.value)}
          required
        />
        <Button type="submit" fullWidth disabled={!peso || parseFloat(peso) <= 0 || loading}>
          <Save className="w-4 h-4 mr-1" /> {loading ? "Salvando..." : "Salvar Garrafa"}
        </Button>
      </form>
    </Modal>
  );
}
