
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useLanguage } from '@/contexts/LanguageContext';

interface RegistrationLayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const RegistrationLayout: React.FC<RegistrationLayoutProps> = ({
  children,
  onBack,
  showBackButton = true
}) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900">
      <header className="flex justify-between items-center p-4">
        {showBackButton && onBack ? (
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-blue-300 hover:bg-slate-200/50 dark:hover:bg-blue-900/20"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
          </Button>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>
      
      {children}
      
      <footer className="py-4 text-center text-sm text-slate-500 dark:text-blue-300/70">
        © 2025 Utopia. {t('all.rights.reserved')}
      </footer>
    </div>
  );
};
