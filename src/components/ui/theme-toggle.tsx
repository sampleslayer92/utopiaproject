
import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from './button';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <div className={cn("flex items-center space-x-1 rounded-full overflow-hidden shadow-sm bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme('light')}
        className={cn(
          "px-3 py-1 rounded-full h-8 transition-all duration-300 flex items-center gap-1.5",
          theme === 'light' 
            ? "bg-emerald-500 text-white hover:bg-emerald-600" 
            : "bg-transparent hover:bg-gray-100 dark:hover:bg-slate-700"
        )}
        aria-label={t('light.mode')}
      >
        <Sun className="h-4 w-4" />
        <span className="font-medium sr-only md:not-sr-only">{t('light')}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme('dark')}
        className={cn(
          "px-3 py-1 rounded-full h-8 transition-all duration-300 flex items-center gap-1.5",
          theme === 'dark' 
            ? "bg-emerald-500 text-white hover:bg-emerald-600" 
            : "bg-transparent hover:bg-gray-100 dark:hover:bg-slate-700"
        )}
        aria-label={t('dark.mode')}
      >
        <Moon className="h-4 w-4" />
        <span className="font-medium sr-only md:not-sr-only">{t('dark')}</span>
      </Button>
    </div>
  );
}
