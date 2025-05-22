
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-emerald-50">
      <header className="flex justify-end p-4">
        <LanguageSwitcher />
      </header>
      
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-lg text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center shadow-inner">
              <img 
                src="/placeholder.svg" 
                alt="Utopia Logo" 
                className="w-16 h-16"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900">
              Vitajte v Utopia
            </h1>
            <p className="text-xl text-gray-600">
              Vaša cesta k inteligentnejšiemu predaju začína tu
            </p>
          </div>
          
          <div className="glass-card p-8 max-w-md mx-auto space-y-6">
            <div className="h-40 flex items-center justify-center">
              <img 
                src="/placeholder.svg"
                alt="Merchant illustration" 
                className="max-h-full"
              />
            </div>
            
            <p className="text-gray-600">
              Utopia vám prináša moderné platobné a pokladničné riešenia prispôsobené vášmu podnikaniu. Začnime niekoľkými základnými krokmi.
            </p>
            
            <Button 
              onClick={onNext}
              className="w-full rounded-full py-6 bg-emerald-500 hover:bg-emerald-600 text-lg font-medium hover-lift"
            >
              <span>Začať onboarding</span>
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
