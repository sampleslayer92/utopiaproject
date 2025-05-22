
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Card, CardContent } from '@/components/ui/card';
import { StepContainer } from '../StepContainer';
import { BackButton } from '../BackButton';
import { NextButton } from '../NextButton';
import { SaveContinueLater } from '../SaveContinueLater';
import { ProductSelectionWizard } from './ProductSelectionWizard';

export const StepProducts: React.FC = () => {
  const { t } = useLanguage();
  const { nextStep, prevStep, isStepComplete } = useOnboarding();
  
  return (
    <StepContainer>
      <ProductSelectionWizard 
        onNext={nextStep} 
        onBack={prevStep} 
      />
      
      <div className="flex justify-between mt-6">
        <BackButton onClick={prevStep} />
        <SaveContinueLater />
        <NextButton 
          onClick={nextStep}
          disabled={!isStepComplete('products')}
        />
      </div>
    </StepContainer>
  );
};
