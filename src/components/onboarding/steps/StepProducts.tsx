
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { StepContainer } from '../StepContainer';
import { ProductSelectionWizard } from './ProductSelectionWizard';
import { BackButton } from '../BackButton';
import { NextButton } from '../NextButton';

export const StepProducts: React.FC = () => {
  const { t } = useLanguage();
  const { nextStep, prevStep, isStepComplete } = useOnboarding();
  
  return (
    <StepContainer
      title="Výber produktov a služieb"
      subtitle="Vyberte si zariadenia a služby, ktoré potrebujete"
    >
      <ProductSelectionWizard />
      
      <div className="mt-8 flex justify-between">
        <BackButton onClick={prevStep} />
        <NextButton 
          onClick={nextStep}
          disabled={!isStepComplete('products')}
        />
      </div>
    </StepContainer>
  );
};
