
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOnboarding } from '@/contexts/OnboardingContext';

interface BackButtonProps {
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const { prevStep, currentStep } = useOnboarding();

  // First step doesn't need a back button
  if (currentStep === 'company') {
    return null;
  }

  return (
    <Button
      variant="ghost"
      onClick={prevStep}
      className={cn("gap-2", className)}
    >
      <ArrowLeft className="h-4 w-4" />
      Späť
    </Button>
  );
};
