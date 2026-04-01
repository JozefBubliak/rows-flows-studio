import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'draft' | 'pending' | 'approved' | 'rejected' | 'submitted' | 'returned' | 'closed' | 'received';

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string }> = {
  draft: { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-status-draft' },
  pending: { bg: 'bg-status-pending/10', text: 'text-status-pending', dot: 'bg-status-pending' },
  approved: { bg: 'bg-status-approved/10', text: 'text-status-approved', dot: 'bg-status-approved' },
  rejected: { bg: 'bg-status-rejected/10', text: 'text-status-rejected', dot: 'bg-status-rejected' },
  submitted: { bg: 'bg-status-submitted/10', text: 'text-status-submitted', dot: 'bg-status-submitted' },
  returned: { bg: 'bg-status-returned/10', text: 'text-status-returned', dot: 'bg-status-returned' },
  closed: { bg: 'bg-status-closed/10', text: 'text-status-closed', dot: 'bg-status-closed' },
  received: { bg: 'bg-status-approved/10', text: 'text-status-approved', dot: 'bg-status-approved' },
};

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft;
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
      config.bg, config.text, className
    )}>
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
      {label}
    </span>
  );
}
