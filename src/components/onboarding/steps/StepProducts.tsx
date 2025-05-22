
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { StepContainer } from '../StepContainer';
import { ProductSelectionWizard } from './ProductSelectionWizard';

export const StepProducts: React.FC = () => {
  const { t } = useLanguage();
  const { nextStep, prevStep, isStepComplete } = useOnboarding();
  
  return (
    <StepContainer
      title="Výber produktov a služieb"
      subtitle="Vyberte si zariadenia a služby, ktoré potrebujete"
    >
      <ProductSelectionWizard 
        onNext={nextStep} 
        onBack={prevStep} 
      />
    </StepContainer>
  );
};
