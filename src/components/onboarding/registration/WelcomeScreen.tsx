
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <header className="flex justify-end p-4">
        <LanguageSwitcher />
      </header>
      
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-2xl text-center space-y-8">
          <div className="flex justify-center mb-8">
            <motion.div 
              className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-xl"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <span className="text-6xl font-bold bg-gradient-to-r from-emerald-300 to-blue-300 text-transparent bg-clip-text">U</span>
            </motion.div>
          </div>
          
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-5xl font-bold text-white">
              {t('welcome')}
            </h1>
            <p className="text-xl text-blue-200">
              {t('welcome.subtitle')}
            </p>
          </motion.div>
          
          <motion.div
            className="glass-card p-8 max-w-lg mx-auto space-y-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-blue-100">
              Zistíme, čo potrebujete. Pomôžeme vám vybrať riešenie, prispôsobíme služby a vybavíme všetko za vás.
            </p>
            
            <div className="flex justify-center items-center space-x-6 py-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600/50 flex items-center justify-center mb-1">
                  <span role="img" aria-label="account" className="text-lg">👤</span>
                </div>
                <span className="text-xs text-blue-200">Účet</span>
              </div>
              <div className="flex-grow h-0.5 bg-blue-600/30"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600/50 flex items-center justify-center mb-1">
                  <span role="img" aria-label="company" className="text-lg">🏢</span>
                </div>
                <span className="text-xs text-blue-200">Firma</span>
              </div>
              <div className="flex-grow h-0.5 bg-blue-600/30"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600/50 flex items-center justify-center mb-1">
                  <span role="img" aria-label="services" className="text-lg">🛍️</span>
                </div>
                <span className="text-xs text-blue-200">Služby</span>
              </div>
              <div className="flex-grow h-0.5 bg-blue-600/30"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600/50 flex items-center justify-center mb-1">
                  <span role="img" aria-label="contract" className="text-lg">📄</span>
                </div>
                <span className="text-xs text-blue-200">Zmluva</span>
              </div>
            </div>
            
            <Button 
              onClick={onNext}
              className="w-full rounded-full py-6 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg font-medium shadow-lg border border-white/10 hover:shadow-emerald-500/20"
            >
              <span>Začať onboarding</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.main>
      
      <footer className="py-4 text-center text-sm text-blue-300/70">
        © 2025 Utopia. Všetky práva vyhradené.
      </footer>
    </div>
  );
};
