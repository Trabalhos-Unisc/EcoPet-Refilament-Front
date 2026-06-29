import React from 'react';
import Card from '../ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td } from '../ui/Table';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { BarChart3 } from 'lucide-react';

export default function LoteDetail({ detalhes }) {
  return (
    <Card delay={5}>
      <h3 className="text-xl font-bold text-eco-text mb-1 font-display tracking-wide">Detalhamento por Lote</h3>
      <p className="text-sm text-eco-muted mb-6">Métricas de sustentabilidade de cada lote processado</p>
      
      {detalhes.length === 0 ? (
        <EmptyState message="Nenhum lote processado" icon={<BarChart3 className="w-12 h-12 text-eco-emerald" />} />
      ) : (
        <Table>
          <Thead>
            <Th>Lote</Th>
            <Th align="right">Qtd. Garrafas</Th>
            <Th align="right">Plástico Salvo</Th>
            <Th align="right">Yield (Filamento)</Th>
            <Th align="right">Performance</Th>
          </Thead>
          <Tbody>
            {detalhes.map(d => (
              <Tr key={d.loteId}>
                <Td className="font-medium">{d.loteId}</Td>
                <Td align="right" className="text-eco-muted">{d.garrafas}</Td>
                <Td align="right" className="text-eco-muted">{(d.plasticoSalvo * 1000).toFixed(0)}g</Td>
                <Td align="right" className="font-bold text-eco-emerald font-display tracking-wide">{d.filamentoProduzido.toFixed(2)}m</Td>
                <Td align="right">
                  <Badge variant="teal">
                    {d.rendMedioPorGarrafa.toFixed(2)}m / garrafa
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Card>
  );
}
