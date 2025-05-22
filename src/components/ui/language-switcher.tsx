
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { GlobeIcon } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      <div className="hidden sm:flex items-center text-sm text-gray-500 mr-2">
        <GlobeIcon className="h-4 w-4 mr-1" />
      </div>
      <div className="flex items-center space-x-1 border rounded-full overflow-hidden shadow-sm bg-white">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage('sk')}
          className={cn(
            "px-3 py-1 rounded-full h-8 transition-all duration-300",
            language === 'sk' 
              ? "bg-emerald-500 text-white hover:bg-emerald-600" 
              : "bg-transparent hover:bg-gray-100"
          )}
        >
          🇸🇰 SK
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage('en')}
          className={cn(
            "px-3 py-1 rounded-full h-8 transition-all duration-300",
            language === 'en' 
              ? "bg-emerald-500 text-white hover:bg-emerald-600" 
              : "bg-transparent hover:bg-gray-100"
          )}
        >
          🇬🇧 EN
        </Button>
      </div>
    </div>
  );
}
