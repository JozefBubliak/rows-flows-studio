import React from 'react';
import { cn } from '@/lib/utils';

interface StickyActionBarProps {
  children: React.ReactNode;
  className?: string;
}

export function StickyActionBar({ children, className }: StickyActionBarProps) {
  return (
    <div className={cn(
      'sticky bottom-0 z-30 border-t bg-card/95 backdrop-blur-sm px-6 py-4',
      'flex items-center justify-between gap-3',
      className
    )}>
      {children}
    </div>
  );
}
