
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './button';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 border rounded-full overflow-hidden shadow-sm bg-white/70 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('sk')}
        className={cn(
          "px-3 py-1 rounded-full h-8 transition-all duration-300 flex items-center gap-1.5",
          language === 'sk' 
            ? "bg-emerald-500 text-white hover:bg-emerald-600" 
            : "bg-transparent hover:bg-gray-100"
        )}
      >
        <span className="text-base">🇸🇰</span>
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
            : "bg-transparent hover:bg-gray-100"
        )}
      >
        <span className="text-base">🇬🇧</span>
        <span className="font-medium">EN</span>
      </Button>
    </div>
  );
}
