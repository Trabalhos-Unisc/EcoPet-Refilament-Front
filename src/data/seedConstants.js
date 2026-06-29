export const SEED_GARRAFAS = [
  { id: 'G001', peso: 0.028, dataColeta: '2024-06-01', loteId: 'L001' },
  { id: 'G002', peso: 0.028, dataColeta: '2024-06-01', loteId: 'L001' },
  { id: 'G003', peso: 0.042, dataColeta: '2024-06-02', loteId: 'L001' },
  { id: 'G004', peso: 0.028, dataColeta: '2024-06-03', loteId: 'L002' },
  { id: 'G005', peso: 0.042, dataColeta: '2024-06-03', loteId: 'L002' },
];

export const SEED_LOTES = [
  { id: 'L001', data: '2024-06-01', garrafaIds: ['G001', 'G002', 'G003'], filamentoProd: 9.016, processado: true },
  { id: 'L002', data: '2024-06-03', garrafaIds: ['G004', 'G005'], filamentoProd: 6.44, processado: true },
];

export const SEED_PROCESSOS = [
  {
    id: 'PROC-SEED-1',
    loteId: 'L001',
    rendimento: 100.0,
    dataProc: '2024-06-05',
    percentualPerda: 0.08,
    pesoPerda: 0.00784,
    pesoTotal: 0.098,
    pesoAproveitado: 0.09016,
    comprimentoGerado: 9.016,
    filamentoId: 'FIL-L001-2024-06-05',
  },
  {
    id: 'PROC-SEED-2',
    loteId: 'L002',
    rendimento: 100.0,
    dataProc: '2024-06-06',
    percentualPerda: 0.08,
    pesoPerda: 0.0056,
    pesoTotal: 0.07,
    pesoAproveitado: 0.0644,
    comprimentoGerado: 6.44,
    filamentoId: 'FIL-L002-2024-06-06',
  },
];

export const SEED_ESTOQUE = {
  filamentos: [
    { id: 'FIL-L001-2024-06-05', comprimento: 9.016, loteOrigemId: 'L001', estoqueAtual: 6.016 },
    { id: 'FIL-L002-2024-06-06', comprimento: 6.44, loteOrigemId: 'L002', estoqueAtual: 6.44 },
  ],
  totalMetros: 12.456,
  historicoSaidas: [
    {
      id: 1,
      metros: 3.0,
      rastreio: [{ filamentoId: 'FIL-L001-2024-06-05', metros: 3.0, loteId: 'L001' }],
      data: '2024-06-07T10:00:00.000Z',
    },
  ],
};
