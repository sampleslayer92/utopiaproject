
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CreditCard, Smartphone, Monitor, Battery } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductOption {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

interface ProductSelectionScreenProps {
  onSelect: (selectedProducts: string[]) => void;
  selectedProducts: string[];
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const ProductSelectionScreen: React.FC<ProductSelectionScreenProps> = ({
  onSelect,
  selectedProducts,
  onSubmit,
  onBack
}) => {
  const { language } = useLanguage();
  
  const productOptions: ProductOption[] = [
    {
      id: 'pos',
      icon: <Monitor className="h-10 w-10 text-emerald-400" />,
      label: language === 'sk' ? 'Pokladničné riešenie' : 'POS Solution',
      description: language === 'sk' ? 'Kompletný pokladničný systém pre vašu prevádzku' : 'Complete point of sale system for your business'
    },
    {
      id: 'terminal',
      icon: <CreditCard className="h-10 w-10 text-emerald-400" />,
      label: language === 'sk' ? 'Platobný terminál' : 'Payment Terminal',
      description: language === 'sk' ? 'Samostatný platobný terminál pre prijímanie kariet' : 'Stand-alone payment terminal for accepting cards'
    },
    {
      id: 'softpos',
      icon: <Smartphone className="h-10 w-10 text-emerald-400" />,
      label: language === 'sk' ? 'Mobilný terminál (SoftPOS)' : 'Mobile Terminal (SoftPOS)',
      description: language === 'sk' ? 'Riešenie pre mobilné zariadenia Android' : 'Solution for Android mobile devices'
    },
    {
      id: 'charging',
      icon: <Battery className="h-10 w-10 text-emerald-400" />,
      label: language === 'sk' ? 'Nabíjacia stanica' : 'Charging Station',
      description: language === 'sk' ? 'Pre nabíjanie elektrických vozidiel' : 'For electric vehicle charging'
    }
  ];

  const handleProductToggle = (productId: string) => {
    let newSelectedProducts;
    if (selectedProducts.includes(productId)) {
      newSelectedProducts = selectedProducts.filter(id => id !== productId);
    } else {
      newSelectedProducts = [...selectedProducts, productId];
    }
    onSelect(newSelectedProducts);
  };

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
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              {language === 'sk' ? 'Výber riešenia' : 'Solution Selection'}
            </h1>
            <p className="mt-2 text-blue-300">
              {language === 'sk' ? 'Čo potrebujete? Vyberte si jedno alebo viac riešení.' : 'What do you need? Select one or more solutions.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {productOptions.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer hover:shadow-lg transition-all duration-300 h-full backdrop-blur-sm bg-white/10 border border-white/20",
                    selectedProducts.includes(product.id)
                      ? "border-emerald-500 shadow-md ring-2 ring-emerald-400/50"
                      : "hover:border-blue-300/50"
                  )}
                  onClick={() => handleProductToggle(product.id)}
                >
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className={cn(
                      "rounded-full p-4 transition-all flex-shrink-0",
                      selectedProducts.includes(product.id) ? "bg-emerald-900/50" : "bg-slate-800/50"
                    )}>
                      {product.icon}
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1 text-white">{product.label}</div>
                      <p className="text-blue-200 text-sm">{product.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={onSubmit}
              disabled={selectedProducts.length === 0}
              className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 hover-lift shadow-md disabled:opacity-50"
            >
              <span>{language === 'sk' ? 'Pokračovať do portálu' : 'Continue to portal'}</span>
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
