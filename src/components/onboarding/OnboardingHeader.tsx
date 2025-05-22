
import React from 'react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OnboardingHeader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-950 dark:to-blue-950 shadow-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white hover:text-emerald-300 hover:bg-slate-800/50">
            <ArrowLeft className="h-4 w-4" />
            {t('back.to.dashboard')}
          </Button>
        </Link>
        <div className="w-px h-6 bg-slate-700"></div>
        <div>
          <h1 className="text-xl font-bold text-white">Utopia</h1>
          <p className="text-xs text-blue-300">{t('onboarding.process')}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </header>
  );
};
