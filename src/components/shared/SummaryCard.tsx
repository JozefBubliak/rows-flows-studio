import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
  onClick?: () => void;
}

export function SummaryCard({ label, value, icon: Icon, trend, className, onClick }: SummaryCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative rounded-xl border bg-card p-5 shadow-card transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-label">{label}</p>
          <p className="text-2xl font-bold font-display tracking-tight text-foreground">{value}</p>
          {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
