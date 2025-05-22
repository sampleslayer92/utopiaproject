
import React from 'react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, HelpCircle } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { motion } from 'framer-motion';

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
  const progress = ((currentStepNumber - 1) / 6) * 100;

  return (
    <header className="flex flex-col border-b">
      {/* Progress bar */}
      <div className="relative h-1 bg-gray-100 w-full">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-4">
          {currentStep !== 'company' && (
            <Button
              variant="ghost"
              onClick={prevStep}
              className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
              Späť
            </Button>
          )}
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium text-emerald-700">
            Krok {currentStepNumber} z 7
          </div>
          <div className="text-xs text-gray-500">
            {currentStep === 'sign' ? 'Posledný krok' : `Zostáva ${currentStepNumber === 1 ? 6 : 7 - currentStepNumber} krokov`}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2 text-emerald-500" />
            <span>Zostáva cca <b className="text-emerald-700">{remainingTime} minút</b></span>
          </div>
          <Button variant="ghost" className="rounded-full p-2 hover:bg-emerald-50" size="icon">
            <HelpCircle className="h-5 w-5 text-gray-400" />
          </Button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
