
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingStep } from '@/types/onboarding';

interface NextButtonProps {
  className?: string;
  disabled?: boolean;
  onBeforeNext?: () => boolean;
}

export const NextButton: React.FC<NextButtonProps> = ({ 
  className,
  disabled: externalDisabled,
  onBeforeNext
}) => {
  const { nextStep, currentStep, isStepComplete } = useOnboarding();

  const isLastStep = currentStep === 'sign';
  
  const isDisabled = externalDisabled || !isStepComplete(currentStep);

  const handleClick = () => {
    if (isDisabled) return;
    
    if (onBeforeNext) {
      const canProceed = onBeforeNext();
      if (!canProceed) return;
    }
    
    nextStep();
  };

  return (
    <Button
      variant={isLastStep ? "default" : "default"}
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        "gap-2 bg-utopia-600 hover:bg-utopia-700",
        isDisabled ? "opacity-50" : "",
        className
      )}
    >
      {isLastStep ? "Dokončiť" : "Pokračovať"}
      {!isLastStep && <ArrowRight className="h-4 w-4" />}
    </Button>
  );
};
