
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { OnboardingStep } from '@/types/onboarding';
import { motion } from 'framer-motion';

const steps: { id: OnboardingStep; label: string; description: string }[] = [
  { id: 'company', label: 'Adresa firmy', description: 'Základné informácie o vašej spoločnosti' },
  { id: 'business', label: 'Údaje o prevádzke', description: 'Kde a ako podnikáte' },
  { id: 'products', label: 'Výber produktov a služieb', description: 'Riešenia pre vaše podnikanie' },
  { id: 'persons', label: 'Osoby', description: 'Kontaktné a zodpovedné osoby' },
  { id: 'beneficialOwners', label: 'Skutočný majiteľ', description: 'Konečný užívateľ výhod' },
  { id: 'billing', label: 'Fakturačné údaje', description: 'Spôsob platby a fakturácie' },
  { id: 'sign', label: 'Podpis a súhlasy', description: 'Dokončenie objednávky' },
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

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="bg-white shadow-lg rounded-r-2xl py-8 px-6 flex flex-col h-full min-h-screen w-80"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-emerald-700 mb-2">Utopia</h1>
        <p className="text-gray-500 text-sm">Onboarding do platformy</p>
      </div>
      
      <div className="flex flex-col space-y-2 relative">
        {/* Vertical line connecting steps */}
        <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200 z-0"></div>
        
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          
          return (
            <motion.div 
              key={step.id}
              variants={itemVariants}
              onClick={() => handleStepClick(step.id)}
              className={cn(
                "relative z-10 flex items-start py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer",
                status === 'active' ? "bg-emerald-50 border border-emerald-100" : "",
                status === 'disabled' ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              )}
            >
              <div className="mr-4 flex-shrink-0">
                {status === 'complete' ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center transition-all duration-300">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                ) : (
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    status === 'active' ? "border-emerald-500 bg-emerald-50 text-emerald-700" : 
                    status === 'next' ? "border-gray-400 bg-white text-gray-500" :
                    "border-gray-300 bg-white text-gray-400"
                  )}>
                    {index + 1}
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <p className={cn(
                  "font-medium",
                  status === 'active' ? "text-emerald-700" : 
                  status === 'complete' ? "text-gray-700" :
                  "text-gray-500"
                )}>
                  {step.label}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{step.description}</p>
              </div>
              
              {status !== 'disabled' && status !== 'active' && (
                <div className="flex items-center self-center">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-auto">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
          <p className="text-sm font-medium text-emerald-800">Potrebujete pomôcť?</p>
          <p className="text-sm text-gray-600 mt-1">
            Kontaktujte nás na <span className="text-emerald-600 font-medium">+421 XXX XXX XXX</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
