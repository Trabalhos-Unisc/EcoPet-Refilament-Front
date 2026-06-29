import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyState({ message, icon }) {
  const IconNode = icon || <Inbox className="w-12 h-12" />;
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-eco-surface/30 rounded-2xl bg-eco-dark/20">
      <span className="text-eco-muted/50 mb-4 flex items-center justify-center">{IconNode}</span>
      <p className="text-center text-eco-muted text-sm font-medium">{message}</p>
    </div>
  );
}
