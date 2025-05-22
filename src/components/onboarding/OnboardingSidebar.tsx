
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { OnboardingStep } from '@/types/onboarding';

const steps: { id: OnboardingStep; label: string }[] = [
  { id: 'company', label: 'Adresa firmy' },
  { id: 'business', label: 'Údaje o prevádzke' },
  { id: 'products', label: 'Výber produktov a služieb' },
  { id: 'persons', label: 'Osoby' },
  { id: 'beneficialOwners', label: 'Skutočný majiteľ' },
  { id: 'billing', label: 'Fakturačné údaje' },
  { id: 'sign', label: 'Podpis a súhlasy' },
];

export const OnboardingSidebar: React.FC = () => {
  const { currentStep, setStep, isStepComplete } = useOnboarding();

  const getStepStatus = (stepId: OnboardingStep) => {
    if (currentStep === stepId) return 'active';
    if (isStepComplete(stepId)) return 'complete';
    
    // Find current step index
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    const thisIndex = steps.findIndex(s => s.id === stepId);
    
    // Check if step is before current or next
    if (thisIndex < currentIndex) return 'complete';
    if (thisIndex === currentIndex + 1) return 'next';
    
    return 'disabled';
  };

  const handleStepClick = (stepId: OnboardingStep) => {
    const status = getStepStatus(stepId);
    if (status !== 'disabled') {
      setStep(stepId);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-r-xl py-8 px-6 flex flex-col h-full min-h-screen w-80">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-utopia-700 mb-2">Utopia</h1>
        <p className="text-gray-500 text-sm">Onboarding do platformy</p>
      </div>
      
      <div className="flex flex-col space-y-1 relative">
        {/* Vertical line connecting steps */}
        <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200 z-0"></div>
        
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          
          return (
            <div 
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className={cn(
                "relative z-10 flex items-center py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer",
                status === 'active' ? "bg-utopia-50 border border-utopia-100" : "",
                status === 'disabled' ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              )}
            >
              <div className="mr-4 flex items-center justify-center">
                {status === 'complete' ? (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                ) : (
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2",
                    status === 'active' ? "border-utopia-500 bg-utopia-50 text-utopia-700" : "border-gray-300 bg-white"
                  )}>
                    {index + 1}
                  </div>
                )}
              </div>
              
              <div>
                <p className={cn(
                  "font-medium",
                  status === 'active' ? "text-utopia-700" : "text-gray-700"
                )}>
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-auto">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700">Potrebujete pomôcť?</p>
          <p className="text-sm text-gray-500 mt-1">
            Kontaktujte nás na <span className="text-utopia-600 font-medium">+421 XXX XXX XXX</span>
          </p>
        </div>
      </div>
    </div>
  );
};
