
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Store, Coffee, Scissors, HelpCircle } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
}

export const BusinessTypeScreen: React.FC<BusinessTypeScreenProps> = ({ 
  onSelect, 
  selectedType,
  onNext 
}) => {
  const businessTypes: BusinessTypeOption[] = [
    { 
      id: 'retail', 
      icon: <Store className="h-10 w-10 text-emerald-600" />, 
      label: 'Maloobchod', 
      description: 'Pre klasické obchody a predajne s tovarom' 
    },
    { 
      id: 'hospitality', 
      icon: <Coffee className="h-10 w-10 text-emerald-600" />, 
      label: 'Pohostinstvo', 
      description: 'Pre reštaurácie, kaviarne a iné gastro prevádzky' 
    },
    { 
      id: 'services', 
      icon: <Scissors className="h-10 w-10 text-emerald-600" />, 
      label: 'Služby', 
      description: 'Pre poskytovateľov služieb a profesionálov' 
    },
    { 
      id: 'other', 
      icon: <HelpCircle className="h-10 w-10 text-emerald-600" />, 
      label: 'Iné', 
      description: 'Iný typ podnikania, ktorý nezapadá do uvedených kategórií' 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-emerald-50">
      <header className="flex justify-end p-4">
        <LanguageSwitcher />
      </header>
      
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center px-6 py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Vyberte typ vášho podnikania</h1>
            <p className="mt-2 text-gray-600">
              Tento výber nám pomôže prispôsobiť riešenie vašim potrebám
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {businessTypes.map((type, index) => (
              <motion.div 
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  className={cn(
                    "cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden h-full",
                    selectedType === type.id 
                      ? "border-emerald-500 shadow-md ring-2 ring-emerald-200" 
                      : "hover:border-emerald-200"
                  )}
                  onClick={() => onSelect(type.id)}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className={cn(
                      "rounded-full p-4 mb-4 transition-all",
                      selectedType === type.id ? "bg-emerald-100" : "bg-gray-100"
                    )}>
                      {type.icon}
                    </div>
                    <div className="font-bold text-lg mb-2">{type.label}</div>
                    <p className="text-gray-500 text-sm">{type.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={onNext}
              disabled={!selectedType}
              className="px-8 py-6 text-lg rounded-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 hover-lift disabled:hover:bg-emerald-400"
            >
              <span>Pokračovať do portálu</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        © 2025 Utopia. Všetky práva vyhradené.
      </footer>
    </div>
  );
};
