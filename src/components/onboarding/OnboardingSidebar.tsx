
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { OnboardingStep } from '@/types/onboarding';

const steps: { id: OnboardingStep; label: string }[] = [
  { id: 'company', label: 'Výber firmy' },
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
    <div className="bg-gradient-to-b from-utopia-900 to-utopia-700 text-white rounded-l-xl py-8 px-6 flex flex-col h-full min-h-screen w-80">
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-2">Utopia</h1>
        <p className="text-white/70 text-sm">Onboarding do platformy</p>
      </div>
      
      <div className="flex flex-col space-y-1 relative">
        {/* Vertical line connecting steps */}
        <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-white/20 z-0"></div>
        
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          
          return (
            <div 
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className={cn(
                "relative z-10 flex items-center py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer",
                status === 'active' ? "bg-white/10" : "",
                status === 'disabled' ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"
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
                    status === 'active' ? "border-white bg-utopia-500" : "border-white/40 bg-transparent"
                  )}>
                    {index + 1}
                  </div>
                )}
              </div>
              
              <div>
                <p className={cn(
                  "font-medium",
                  status === 'active' ? "text-white" : "text-white/80"
                )}>
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-auto">
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm text-white/90">Potrebujete pomôcť?</p>
          <p className="text-sm text-white/70 mt-1">
            Kontaktujte nás na <span className="text-white">+421 XXX XXX XXX</span>
          </p>
        </div>
      </div>
    </div>
  );
};
