
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';

export const SaveContinueLater: React.FC = () => {
  const { saveProgress } = useOnboarding();

  return (
    <Button 
      variant="outline" 
      onClick={saveProgress}
      className="flex items-center gap-2"
    >
      <Save className="h-4 w-4" />
      Uložiť a pokračovať neskôr
    </Button>
  );
};
