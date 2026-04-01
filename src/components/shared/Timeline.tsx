import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineItem {
  label: string;
  date: string;
  description?: string;
  active?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {items.map((item, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={cn(
              'h-2.5 w-2.5 rounded-full mt-1.5 shrink-0',
              item.active ? 'bg-primary ring-4 ring-primary/10' : 'bg-border'
            )} />
            {i < items.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
          </div>
          <div className="pb-5">
            <p className="text-sm font-medium text-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.date}</p>
            {item.description && <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
