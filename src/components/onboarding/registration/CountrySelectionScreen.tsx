
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface CountryInfo {
  code: string;
  name: string;
  nameEN: string;
  flag: string;
}

interface CountrySelectionScreenProps {
  selectedCountry: string;
  onSelect: (country: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CountrySelectionScreen: React.FC<CountrySelectionScreenProps> = ({
  selectedCountry,
  onSelect,
  onNext,
  onBack
}) => {
  const { t, language } = useLanguage();

  const countries: CountryInfo[] = [
    { code: 'SK', name: 'Slovensko', nameEN: 'Slovakia', flag: '/flags/sk.svg' },
    { code: 'CZ', name: 'Česká republika', nameEN: 'Czech Republic', flag: '/flags/cz.svg' },
    { code: 'AT', name: 'Rakúsko', nameEN: 'Austria', flag: '/flags/at.svg' },
    { code: 'HU', name: 'Maďarsko', nameEN: 'Hungary', flag: '/flags/hu.svg' },
    { code: 'PL', name: 'Poľsko', nameEN: 'Poland', flag: '/flags/pl.svg' },
    { code: 'DE', name: 'Nemecko', nameEN: 'Germany', flag: '/flags/de.svg' },
    { code: 'GB', name: 'Spojené kráľovstvo', nameEN: 'United Kingdom', flag: '/flags/gb.svg' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-blue-900 dark:from-slate-950 dark:to-blue-950 text-white">
      <header className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-blue-300 hover:bg-blue-900/20"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Button>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>
      
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-1 flex flex-col items-center justify-center px-6 py-8"
          key="country-selection"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full max-w-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">
                {t('select.country')}
              </h1>
              <p className="mt-2 text-blue-300">
                {t('country.subtitle')}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-8 space-y-6 rounded-2xl border border-white/20 shadow-xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {countries.map((country) => (
                  <motion.div
                    key={country.code}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 flex flex-col items-center gap-3 ${
                      selectedCountry === country.code
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    onClick={() => onSelect(country.code)}
                  >
                    <div className="w-16 h-12 rounded-md overflow-hidden shadow-md">
                      <img
                        src={country.flag}
                        alt={`${country.name} flag`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `/flags/placeholder.svg`;
                        }}
                      />
                    </div>
                    <span className="font-medium text-sm text-center">
                      {language === 'sk' ? country.name : country.nameEN}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={onNext} 
                  className="px-8 py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-full hover:scale-[1.02] transition-all duration-300"
                  disabled={!selectedCountry}
                >
                  <span>{t('continue')}</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
      
      <footer className="py-4 text-center text-sm text-blue-300/70">
        © 2025 Utopia. {t('all.rights.reserved')}
      </footer>
    </div>
  );
};
