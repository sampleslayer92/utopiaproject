
import React from 'react';
import { cn } from '@/lib/utils';
import { BackButton } from './BackButton';
import { NextButton } from './NextButton';

interface StepContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  actionBar?: React.ReactNode;
  nextButtonDisabled?: boolean;
  onBeforeNext?: () => boolean;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  children,
  title,
  subtitle,
  className,
  actionBar,
  nextButtonDisabled,
  onBeforeNext
}) => {
  return (
    <div className={cn("animate-fade-in flex-1 max-w-4xl mx-auto py-8", className)}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
      </div>

      <div className="space-y-6">
        {children}
      </div>

      <div className="mt-12 pt-4 border-t flex items-center justify-between">
        <BackButton />
        
        <div className="flex items-center gap-4">
          {actionBar}
          <NextButton 
            disabled={nextButtonDisabled}
            onBeforeNext={onBeforeNext}
          />
        </div>
      </div>
    </div>
  );
};
