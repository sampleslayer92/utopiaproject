
import React from 'react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OnboardingHeader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-slate-700 hover:text-emerald-600">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <div className="w-px h-6 bg-gray-200"></div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Utopia</h1>
          <p className="text-xs text-gray-500">{t('onboarding.process')}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
      </div>
    </header>
  );
};
