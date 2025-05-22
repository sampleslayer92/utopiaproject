
import React from 'react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';

const stepTimeEstimates: Record<string, number> = {
  'company': 2,
  'business': 3,
  'products': 4,
  'persons': 3,
  'beneficialOwners': 2,
  'billing': 2,
  'sign': 3
};

export const OnboardingHeader: React.FC = () => {
  const { currentStep, prevStep } = useOnboarding();
  
  // Get the current step number based on the step name
  const getStepNumber = (step: string) => {
    const steps = ['company', 'business', 'products', 'persons', 'beneficialOwners', 'billing', 'sign'];
    return steps.indexOf(step) + 1;
  };
  
  // Calculate remaining time based on current and future steps
  const calculateRemainingTime = (current: string) => {
    const steps = ['company', 'business', 'products', 'persons', 'beneficialOwners', 'billing', 'sign'];
    const currentIndex = steps.indexOf(current);
    
    // Sum up time for remaining steps including current
    return steps
      .slice(currentIndex)
      .reduce((total, step) => total + (stepTimeEstimates[step] || 0), 0);
  };

  const currentStepNumber = getStepNumber(currentStep);
  const remainingTime = calculateRemainingTime(currentStep);

  return (
    <header className="flex items-center justify-between py-4 px-6 border-b">
      <div className="flex items-center gap-4">
        {currentStep !== 'company' && (
          <Button
            variant="ghost"
            onClick={prevStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Späť
          </Button>
        )}
      </div>
      
      <div className="flex flex-col items-center">
        <div className="text-sm font-medium">
          Krok {currentStepNumber} z 7
        </div>
        <div className="text-xs text-muted-foreground">
          {currentStep === 'sign' ? 'Posledný krok' : `Zostáva ${currentStepNumber === 1 ? 6 : 7 - currentStepNumber} krokov`}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          Zostáva cca {remainingTime} minút
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
};
