
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { CountryFlag } from './country-flag';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center space-x-1 border rounded-full overflow-hidden shadow-sm bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('sk')}
        className={cn(
          "px-3 py-1 rounded-full h-8 transition-all duration-300 flex items-center gap-1.5",
          language === 'sk' 
            ? "bg-emerald-500 text-white hover:bg-emerald-600" 
            : "bg-transparent hover:bg-gray-100 dark:hover:bg-slate-700"
        )}
        aria-label={t('slovak.language')}
      >
        <CountryFlag countryCode="SK" className="w-5 h-4 object-cover rounded" />
        <span className="font-medium">SK</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('en')}
        className={cn(
          "px-3 py-1 rounded-full h-8 transition-all duration-300 flex items-center gap-1.5",
          language === 'en' 
            ? "bg-emerald-500 text-white hover:bg-emerald-600" 
            : "bg-transparent hover:bg-gray-100 dark:hover:bg-slate-700"
        )}
        aria-label={t('english.language')}
      >
        <CountryFlag countryCode="GB" className="w-5 h-4 object-cover rounded" />
        <span className="font-medium">EN</span>
      </Button>
    </div>
  );
}
