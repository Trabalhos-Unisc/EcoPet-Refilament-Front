import React, { useState } from 'react';
import { useExtrusao } from '../hooks/useExtrusao';
import { useLotes } from '../hooks/useLotes';
import { useGarrafas } from '../hooks/useGarrafas';
import { useToast } from '../contexts/ToastContext';
import ExtrusaoForm from '../components/extrusao/ExtrusaoForm';
import ExtrusaoResult from '../components/extrusao/ExtrusaoResult';
import ProcessoList from '../components/extrusao/ProcessoList';

export default function ExtrusaoPage() {
  const { processos, processarLote } = useExtrusao();
  const { lotes } = useLotes();
  const { garrafas } = useGarrafas();
  const { addToast } = useToast();

  const [loteId, setLoteId] = useState('');
  const [percPerda, setPercPerda] = useState('0.05');
  const [dataProc, setDataProc] = useState(new Date().toISOString().split('T')[0]);

  const lotesDisponiveis = lotes.filter(l => !l.processado);

  const handleProcessar = (e) => {
    e.preventDefault();
    try {
      processarLote(loteId, parseFloat(percPerda), dataProc);
      addToast('Extrusão processada com sucesso!', 'success');
      setLoteId('');
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const loteSelecionado = lotes.find(l => l.id === loteId);
  let preview = null;
  if (loteSelecionado) {
    const garrafasDoLote = garrafas.filter(g => loteSelecionado.garrafaIds.includes(g.id));
    const pesoTotal = garrafasDoLote.reduce((acc, curr) => acc + curr.peso, 0);
    const pesoPerda = pesoTotal * parseFloat(percPerda || 0);
    const pesoLiquido = pesoTotal - pesoPerda;
    const densidadeLinear = 0.003; 
    const comprimentoGerado = pesoLiquido / densidadeLinear;
    preview = { pesoTotal, pesoPerda, pesoLiquido, comprimentoGerado };
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ExtrusaoForm 
          lotesDisponiveis={lotesDisponiveis}
          loteId={loteId}
          setLoteId={setLoteId}
          percPerda={percPerda}
          setPercPerda={setPercPerda}
          dataProc={dataProc}
          setDataProc={setDataProc}
          handleProcessar={handleProcessar}
        />
        <ExtrusaoResult preview={preview} />
        <ProcessoList processos={processos} />
      </div>
    </div>
  );
}
