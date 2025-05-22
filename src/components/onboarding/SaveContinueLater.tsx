
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { toast } from 'sonner';

export const SaveContinueLater: React.FC = () => {
  const { saveProgress } = useOnboarding();

  const handleSave = () => {
    saveProgress();
    toast.success("Váš pokrok bol uložený", {
      description: "Môžete sa kedykoľvek vrátiť a pokračovať."
    });
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleSave}
      className="flex items-center gap-2 rounded-full border-emerald-200 bg-white/70 backdrop-blur-sm hover:bg-emerald-50 transition-all duration-300 hover-lift shadow-sm"
    >
      <Save className="h-4 w-4 text-emerald-600" />
      Uložiť a pokračovať neskôr
    </Button>
  );
};
