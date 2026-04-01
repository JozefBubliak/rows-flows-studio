import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <nav className={cn('flex items-center gap-2', className)}>
      {steps.map((step, i) => {
        const isComplete = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2.5">
              <div className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors shrink-0',
                isComplete && 'bg-primary text-primary-foreground',
                isCurrent && 'bg-primary text-primary-foreground ring-4 ring-primary/15',
                !isComplete && !isCurrent && 'bg-muted text-muted-foreground',
              )}>
                {isComplete ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn(
                'text-sm font-medium hidden sm:inline whitespace-nowrap',
                isCurrent ? 'text-foreground' : 'text-muted-foreground',
              )}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                'h-px flex-1 min-w-[24px]',
                i < currentStep ? 'bg-primary' : 'bg-border'
              )} />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
