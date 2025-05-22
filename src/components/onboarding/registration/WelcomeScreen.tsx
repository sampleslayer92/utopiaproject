
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle'; 
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-300/70 dark:from-slate-900 dark:via-indigo-900 dark:to-blue-800 text-white">
      <header className="flex justify-end p-4 gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
      </header>
      
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-2xl text-center space-y-8">
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <div className="w-24 h-24 rounded-full bg-blue-900/80 backdrop-blur-sm flex items-center justify-center border border-blue-700/40 shadow-xl">
              <span className="text-5xl font-bold text-[#00C28B]">U</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-5xl font-bold text-white">
              {language === 'sk' ? 'Vitajte v Utopia' : 'Welcome to Utopia'}
            </h1>
            <p className="text-xl text-blue-100">
              {language === 'sk' 
                ? 'Váš nový štart k jednoduchšiemu predaju a správe služieb' 
                : 'Your smart start to easier sales and service management'}
            </p>
          </motion.div>
          
          <motion.div
            className="glass-card p-8 max-w-lg mx-auto space-y-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_0_15px_rgba(0,194,139,0.15)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-blue-50">
              {language === 'sk' 
                ? 'Pomôžeme Vám vybrať riešenie na mieru, prispôsobiť služby a postaráme sa o celý proces. Začnime rýchlo a pohodlne – krok za krokom.' 
                : 'We\'ll help you choose the right solution, tailor your services, and take care of the entire process. Let\'s start step by step – quickly and easily.'}
            </p>
            
            <div className="flex justify-center items-center space-x-6 py-5">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#00C28B]/20 border border-[#00C28B]/30 flex items-center justify-center mb-1">
                  <span role="img" aria-label="account" className="text-xl">👤</span>
                </div>
                <span className="text-xs text-blue-100">{language === 'sk' ? 'Účet' : 'Account'}</span>
              </div>
              <div className="flex-grow h-0.5 bg-[#00C28B]/20"></div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#00C28B]/20 border border-[#00C28B]/30 flex items-center justify-center mb-1">
                  <span role="img" aria-label="country" className="text-xl">🌍</span>
                </div>
                <span className="text-xs text-blue-100">{language === 'sk' ? 'Krajina' : 'Country'}</span>
              </div>
              <div className="flex-grow h-0.5 bg-[#00C28B]/20"></div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#00C28B]/20 border border-[#00C28B]/30 flex items-center justify-center mb-1">
                  <span role="img" aria-label="company" className="text-xl">🏢</span>
                </div>
                <span className="text-xs text-blue-100">{language === 'sk' ? 'Firma' : 'Company'}</span>
              </div>
              <div className="flex-grow h-0.5 bg-[#00C28B]/20"></div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#00C28B]/20 border border-[#00C28B]/30 flex items-center justify-center mb-1">
                  <span role="img" aria-label="services" className="text-xl">🛍️</span>
                </div>
                <span className="text-xs text-blue-100">{language === 'sk' ? 'Služby' : 'Services'}</span>
              </div>
            </div>
            
            <Button 
              onClick={onNext}
              className="w-full rounded-full py-6 bg-[#00C28B] hover:bg-[#00b07d] text-lg font-medium shadow-lg border border-white/10 hover:shadow-[#00C28B]/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <span>{language === 'sk' ? 'Začať onboarding' : 'Start onboarding'}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.main>
      
      <footer className="py-4 text-center text-sm text-blue-300/70">
        © 2025 Utopia. {language === 'sk' ? 'Všetky práva vyhradené' : 'All rights reserved'}
      </footer>
    </div>
  );
};
