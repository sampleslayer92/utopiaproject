
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface CountryOption {
  id: string;
  flag: string;
  name: string;
  englishName: string;
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
  const { language } = useLanguage();
  
  const countries: CountryOption[] = [
    {
      id: 'SK',
      flag: '🇸🇰',
      name: 'Slovensko',
      englishName: 'Slovakia'
    },
    {
      id: 'CZ',
      flag: '🇨🇿',
      name: 'Česká republika',
      englishName: 'Czech Republic'
    },
    {
      id: 'GB',
      flag: '🇬🇧',
      name: 'Spojené kráľovstvo',
      englishName: 'United Kingdom'
    },
    {
      id: 'AT',
      flag: '🇦🇹',
      name: 'Rakúsko',
      englishName: 'Austria'
    },
    {
      id: 'HU',
      flag: '🇭🇺',
      name: 'Maďarsko',
      englishName: 'Hungary'
    },
    {
      id: 'PL',
      flag: '🇵🇱',
      name: 'Poľsko',
      englishName: 'Poland'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-blue-900">
      <header className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-blue-300 hover:bg-blue-900/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Späť
        </Button>
        <LanguageSwitcher />
      </header>
      
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              {language === 'sk' ? 'Vyberte vašu krajinu' : 'Select your country'}
            </h1>
            <p className="mt-2 text-blue-300">
              {language === 'sk' ? 'Lokalizujeme služby podľa vašej krajiny' : 'We will localize services based on your country'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {countries.map((country, index) => (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20",
                    selectedCountry === country.id
                      ? "border-emerald-500 shadow-md ring-2 ring-emerald-400/50"
                      : "hover:border-blue-300/50"
                  )}
                  onClick={() => onSelect(country.id)}
                >
                  <CardContent className="p-6 flex items-center space-x-4">
                    <span className="text-4xl">{country.flag}</span>
                    <div>
                      <h3 className="font-medium text-white">
                        {language === 'sk' ? country.name : country.englishName}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={onNext}
              disabled={!selectedCountry}
              className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 hover-lift shadow-md disabled:opacity-50"
            >
              <span>{language === 'sk' ? 'Pokračovať' : 'Continue'}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.main>
      
      <footer className="py-4 text-center text-sm text-blue-300/70">
        © 2025 Utopia. Všetky práva vyhradené.
      </footer>
    </div>
  );
};
