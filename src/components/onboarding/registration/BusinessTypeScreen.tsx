
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Coffee, Store, Scissors, HelpCircle, ShoppingCart, Terminal, Hotel, Truck } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface BusinessTypeOption {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

interface BusinessTypeScreenProps {
  onSelect: (businessType: string) => void;
  selectedType: string;
  onNext: () => void;
  onBack: () => void;
}

export const BusinessTypeScreen: React.FC<BusinessTypeScreenProps> = ({ 
  onSelect, 
  selectedType,
  onNext,
  onBack
}) => {
  const { language } = useLanguage();
  
  const businessTypes: BusinessTypeOption[] = [
    { 
      id: 'restaurant', 
      icon: <Coffee className="h-10 w-10 text-emerald-400" />, 
      label: 'Reštaurácia', 
      description: 'Reštaurácie, bary a stravovacie zariadenia' 
    },
    { 
      id: 'cafe', 
      icon: <Coffee className="h-10 w-10 text-emerald-400" />, 
      label: 'Kaviareň', 
      description: 'Kaviarne a čajovne' 
    },
    { 
      id: 'eshop', 
      icon: <ShoppingCart className="h-10 w-10 text-emerald-400" />, 
      label: 'E-shop', 
      description: 'Online obchod a predaj cez internet' 
    },
    { 
      id: 'retail', 
      icon: <Terminal className="h-10 w-10 text-emerald-400" />, 
      label: 'Prevádzka s POS', 
      description: 'Kamenné obchody a predajne' 
    },
    { 
      id: 'services', 
      icon: <Scissors className="h-10 w-10 text-emerald-400" />, 
      label: 'Služby', 
      description: 'Služby ako kaderníctvo, kozmetika, opravy' 
    },
    { 
      id: 'hotel', 
      icon: <Hotel className="h-10 w-10 text-emerald-400" />, 
      label: 'Hotel', 
      description: 'Ubytovacie zariadenia a hotely' 
    },
    { 
      id: 'mobile', 
      icon: <Truck className="h-10 w-10 text-emerald-400" />, 
      label: 'Mobilný predaj', 
      description: 'Predaj na trhoch, festivaloch a mimo prevádzky' 
    },
    { 
      id: 'other', 
      icon: <HelpCircle className="h-10 w-10 text-emerald-400" />, 
      label: 'Iné', 
      description: 'Iný typ podnikania' 
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
          {language === 'sk' ? 'Späť' : 'Back'}
        </Button>
        <LanguageSwitcher />
      </header>
      
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center px-6 py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              {language === 'sk' ? 'Segment výberu' : 'Business Segment'}
            </h1>
            <p className="mt-2 text-blue-300">
              {language === 'sk' ? 'Vyberte typ vášho podnikania pre lepšie prispôsobenie služieb' : 'Select your business type for better service customization'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {businessTypes.map((type, index) => (
              <motion.div 
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  className={cn(
                    "cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden h-full bg-white/10 backdrop-blur-sm border border-white/20",
                    selectedType === type.id 
                      ? "border-emerald-500 shadow-md ring-2 ring-emerald-400/50" 
                      : "hover:border-blue-300/50"
                  )}
                  onClick={() => onSelect(type.id)}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className={cn(
                      "rounded-full p-4 mb-4 transition-all",
                      selectedType === type.id ? "bg-emerald-900/50" : "bg-slate-800/50"
                    )}>
                      {type.icon}
                    </div>
                    <div className="font-bold text-lg mb-2 text-white">{type.label}</div>
                    <p className="text-blue-200 text-sm">{type.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={onNext}
              disabled={!selectedType}
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
