import React from 'react';
import Card from '../ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../ui/Table';
import EmptyState from '../ui/EmptyState';
import { CheckCircle } from 'lucide-react';

export default function GarrafaList({ garrafasDisponiveis, garrafasHook }) {
  return (
    <Card delay={1}>
      <h3 className="text-xl font-bold text-eco-text mb-1 font-display tracking-wide">Garrafas Disponíveis</h3>
      <p className="text-sm text-eco-muted mb-6">Garrafas não atribuídas a nenhum lote</p>
      
      {garrafasDisponiveis.length === 0 ? (
        <EmptyState message="Todas as garrafas estão atribuídas a lotes" icon={<CheckCircle className="w-12 h-12 text-eco-emerald" />} />
      ) : (
        <Table>
          <Thead>
            <Th>ID</Th>
            <Th>Peso</Th>
            <Th>Data Coleta</Th>
            <Th align="right">Ações</Th>
          </Thead>
          <Tbody>
            {garrafasDisponiveis.map(g => (
              <Tr key={g.id}>
                <Td className="font-medium">{g.id}</Td>
                <Td className="text-eco-muted">{(g.peso * 1000).toFixed(0)} g</Td>
                <Td className="text-eco-muted">{g.dataColeta}</Td>
                <Td align="right">
                  <button 
                    onClick={() => garrafasHook.remover(g.id)}
                    className="text-eco-danger hover:text-red-400 font-medium text-xs transition-colors cursor-pointer"
                  >
                    Remover
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Card>
  );
}
