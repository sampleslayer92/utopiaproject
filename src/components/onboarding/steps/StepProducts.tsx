
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
      title={t('products.title')}
      subtitle={t('products.subtitle')}
    >
      <ProductSelectionWizard 
        onNext={nextStep} 
        onBack={prevStep} 
      />
      
      {/* Navigation buttons are now handled in StepContainer */}
    </StepContainer>
  );
};
