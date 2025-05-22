
import React from 'react';
import { OnboardingSidebar } from './OnboardingSidebar';
import { OnboardingHeader } from './OnboardingHeader';
import { ChatSupportBubble } from './ChatSupportBubble';
import { StepContainer } from './StepContainer';
import { StepCompany } from './steps/StepCompany';
import { StepBusiness } from './steps/StepBusiness';
import { StepProducts } from './steps/StepProducts';
import { StepPersons } from './steps/StepPersons';
import { StepBeneficialOwners } from './steps/StepBeneficialOwners';
import { StepBilling } from './steps/StepBilling';
import { StepSign } from './steps/StepSign';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AnimatePresence, motion } from 'framer-motion';

// Step renderer component
const StepRenderer: React.FC = () => {
  const { currentStep } = useOnboarding();

  // Define animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.3 }}
        className="flex-1 w-full"
      >
        {currentStep === 'company' && <StepCompany />}
        {currentStep === 'business' && <StepBusiness />}
        {currentStep === 'products' && <StepProducts />}
        {currentStep === 'persons' && <StepPersons />}
        {currentStep === 'beneficialOwners' && <StepBeneficialOwners />}
        {currentStep === 'billing' && <StepBilling />}
        {currentStep === 'sign' && <StepSign />}
      </motion.div>
    </AnimatePresence>
  );
};

export const OnboardingWizard: React.FC = () => {
  return (
    <div className="flex h-full min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
      <OnboardingSidebar />
      <div className="flex-1 flex flex-col">
        <OnboardingHeader />
        <div className="flex-1 px-6 py-2 overflow-auto">
          <StepRenderer />
        </div>
      </div>
      <ChatSupportBubble />
    </div>
  );
};
