
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const OnboardingClientCard: React.FC = () => {
  const navigate = useNavigate();

  const handleStartOnboarding = () => {
    toast.success('Spúšťa sa onboarding nového klienta...');
    // Store context that this is partner-initiated onboarding
    localStorage.setItem('partner_onboarding', 'true');
    navigate('/onboarding/company');
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-emerald-200 dark:border-emerald-800">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
      <CardHeader className="relative">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-emerald-800 dark:text-emerald-200">
              Onboarding nového klienta
            </CardTitle>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
              Pridajte a nastavte nového klienta v systéme
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <span>Rýchly a jednoduchý proces</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <span>Automatické nastavenie zariadení</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <span>Okamžité spustenie služieb</span>
        </div>
        
        <Button 
          onClick={handleStartOnboarding}
          className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Spustiť onboarding
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
