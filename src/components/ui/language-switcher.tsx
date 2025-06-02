
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { CountryFlag } from './country-flag';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex flex-col space-y-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('sk')}
        className={cn(
          "px-3 py-1 rounded-full h-8 transition-all duration-300 flex items-center gap-1.5 w-full justify-center",
          language === 'sk' 
            ? "bg-emerald-500 text-white hover:bg-emerald-600" 
            : "bg-white/70 dark:bg-slate-800/70 hover:bg-gray-100 dark:hover:bg-slate-700"
        )}
        aria-label={t('slovak.language')}
      >
        <CountryFlag countryCode="SK" className="w-4 h-3 object-cover rounded" />
        <span className="font-medium text-xs">SK</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('en')}
        className={cn(
          "px-3 py-1 rounded-full h-8 transition-all duration-300 flex items-center gap-1.5 w-full justify-center",
          language === 'en' 
            ? "bg-emerald-500 text-white hover:bg-emerald-600" 
            : "bg-white/70 dark:bg-slate-800/70 hover:bg-gray-100 dark:hover:bg-slate-700"
        )}
        aria-label={t('english.language')}
      >
        <CountryFlag countryCode="GB" className="w-4 h-3 object-cover rounded" />
        <span className="font-medium text-xs">EN</span>
      </Button>
    </div>
  );
}
