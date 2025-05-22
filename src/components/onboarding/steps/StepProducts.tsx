
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
      title="Produkty a služby"
      subtitle="Vyberte si produkty a služby, ktoré chcete využívať"
    >
      <ProductSelectionWizard 
        onNext={nextStep} 
        onBack={prevStep} 
      />
    </StepContainer>
  );
};
