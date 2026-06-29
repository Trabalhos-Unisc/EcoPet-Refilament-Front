import React from 'react';
import Card from '../ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../ui/Table';
import EmptyState from '../ui/EmptyState';
import { Cog } from 'lucide-react';

export default function ProcessoList({ processos }) {
  return (
    <Card className="lg:col-span-2" delay={3}>
      <h3 className="text-xl font-bold text-eco-text mb-1 font-display tracking-wide">Histórico de Processos</h3>
      <p className="text-sm text-eco-muted mb-6">Todos os processos de extrusão realizados</p>
      
      {processos.length === 0 ? (
        <EmptyState message="Nenhum processo realizado" icon={<Cog className="w-12 h-12 text-eco-emerald" />} />
      ) : (
        <Table>
          <Thead>
            <Th>Lote</Th>
            <Th>Data</Th>
            <Th align="right">Peso Total</Th>
            <Th align="right">Perda</Th>
            <Th align="right">Filamento Produzido</Th>
          </Thead>
          <Tbody>
            {[...processos].reverse().map(p => (
              <Tr key={p.id}>
                <Td className="font-medium text-eco-text">{p.loteId}</Td>
                <Td className="text-eco-muted">{p.dataProc}</Td>
                <Td align="right" className="text-eco-muted">{(p.pesoTotal * 1000).toFixed(0)}g</Td>
                <Td align="right" className="text-eco-amber">{(p.pesoPerda * 1000).toFixed(0)}g ({(p.percentualPerda*100).toFixed(0)}%)</Td>
                <Td align="right" className="text-eco-emerald font-bold font-display tracking-wide">{p.comprimentoGerado.toFixed(2)} m</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Card>
  );
}
