
import React from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProductWizard } from './ProductWizard';

export const StepProducts: React.FC = () => {
  const { nextStep, prevStep } = useOnboarding();
  const { t } = useLanguage();

  return (
    <StepContainer
      title={t('products.select')}
      subtitle={t('products.subtitle')}
    >
      <ProductWizard onNext={nextStep} onBack={prevStep} />
    </StepContainer>
  );
};
