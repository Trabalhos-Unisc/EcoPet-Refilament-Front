import React, { useState } from 'react';
import { useExtrusao } from '../hooks/useExtrusao';
import { useLotes } from '../hooks/useLotes';
import { useGarrafas } from '../hooks/useGarrafas';
import { useToast } from '../contexts/ToastContext';
import ExtrusaoForm from '../components/extrusao/ExtrusaoForm';
import ExtrusaoResult from '../components/extrusao/ExtrusaoResult';
import ProcessoList from '../components/extrusao/ProcessoList';

export default function ExtrusaoPage() {
  const { processos, processar } = useExtrusao();
  const { lotes } = useLotes();
  const { garrafas } = useGarrafas();
  const { addToast } = useToast();

  const [loteId, setLoteId] = useState('');
  const [percPerda, setPercPerda] = useState('0.05');
  const [dataProc, setDataProc] = useState(new Date().toISOString().split('T')[0]);

  const lotesDisponiveis = lotes.filter(l => !l.processado);

  const [loading, setLoading] = useState(false);

  const handleProcessar = async (e) => {
    e.preventDefault();
    const loteSelecionado = lotes.find(l => l.id === loteId);
    if (!loteSelecionado) return;
    
    setLoading(true);
    try {
      const densidadeLinear = 0.003;
      const rendimento = 1 / densidadeLinear;
      
      await processar(loteSelecionado, garrafas, rendimento, dataProc, parseFloat(percPerda));
      addToast('Extrusão processada com sucesso!', 'success');
      setLoteId('');
    } catch (err) {
      addToast(err.message || "Erro ao processar na API", 'error');
    } finally {
      setLoading(false);
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
          loading={loading}
        />
        <ExtrusaoResult preview={preview} />
        <ProcessoList processos={processos} />
      </div>
    </div>
  );
}
