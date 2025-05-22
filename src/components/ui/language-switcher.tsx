
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './button';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 border rounded-lg overflow-hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('sk')}
        className={cn(
          "px-3 py-1 rounded-none h-8",
          language === 'sk' ? "bg-primary text-white" : "bg-transparent"
        )}
      >
        SK
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage('en')}
        className={cn(
          "px-3 py-1 rounded-none h-8",
          language === 'en' ? "bg-primary text-white" : "bg-transparent"
        )}
      >
        EN
      </Button>
    </div>
  );
}
