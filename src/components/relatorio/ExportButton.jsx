import React from 'react';
import Button from '../ui/Button';
import { Download } from 'lucide-react';

export default function ExportButton({ handleExport }) {
  return (
    <Button onClick={handleExport}>
      <Download className="w-4 h-4 mr-1" /> Exportar Relatório
    </Button>
  );
}
