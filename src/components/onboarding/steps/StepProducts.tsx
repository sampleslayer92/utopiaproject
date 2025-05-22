
import React, { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductWizard } from './ProductWizard';

export const StepProducts: React.FC = () => {
  const { nextStep, prevStep, updateZariadenie, data } = useOnboarding();
  const { t } = useLanguage();
  
  return (
    <StepContainer
      title={t('products.select')}
      subtitle={t('products.subtitle')}
      helpText={t('products.help.text')}
    >
      <ProductWizard 
        onNext={nextStep} 
        onBack={prevStep} 
      />
    </StepContainer>
  );
};
