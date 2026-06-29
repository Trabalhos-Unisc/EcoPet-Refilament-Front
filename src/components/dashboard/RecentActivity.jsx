import React from 'react';
import Card from '../ui/Card';

export default function RecentActivity({ activities }) {
  return (
    <Card delay={6}>
      <h3 className="text-xl font-bold text-eco-text mb-1 font-display tracking-wide">Atividade Recente</h3>
      <p className="text-sm text-eco-muted mb-6">Últimas movimentações</p>
      {activities.length === 0 ? (
        <p className="text-center py-8 text-eco-muted text-sm">Nenhuma atividade</p>
      ) : (
        <div className="space-y-4">
          {activities.slice(0, 5).map(act => (
            <div key={act.id} className="flex gap-4 p-4 rounded-2xl bg-eco-dark/50 border border-eco-surface/30 shadow-inner group hover:bg-eco-surface/30 transition-all">
              <div className="text-2xl mt-1 drop-shadow-md">{act.icon}</div>
              <div>
                <p className="text-sm font-medium text-eco-text group-hover:text-eco-emerald transition-colors">{act.title}</p>
                <p className="text-xs text-eco-muted mt-1 font-medium">{new Date(act.date).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
