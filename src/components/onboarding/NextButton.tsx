
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOnboarding } from '@/contexts/OnboardingContext';

interface NextButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  onBeforeNext?: () => boolean;
}

export const NextButton: React.FC<NextButtonProps> = ({ 
  className,
  disabled: externalDisabled,
  onClick,
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
    
    if (onClick) {
      onClick();
    } else {
      nextStep();
    }
  };

  return (
    <Button
      variant={isLastStep ? "default" : "default"}
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        "gap-2 bg-blue-600 hover:bg-blue-700 text-white",
        isDisabled ? "opacity-50" : "",
        className
      )}
    >
      {isLastStep ? "Dokončiť onboarding" : "Pokračovať"}
      {!isLastStep && <ArrowRight className="h-4 w-4" />}
    </Button>
  );
};
