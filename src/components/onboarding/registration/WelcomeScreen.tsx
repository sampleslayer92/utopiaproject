
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
        <div className="w-full max-w-2xl text-center space-y-8">
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
              Podnikať môže byť jednoduché
            </h1>
            <p className="text-xl text-gray-600">
              S Utopia vybavíte zmluvu a nastavenie služieb rýchlo, moderne a bez stresu.
            </p>
          </div>
          
          <div className="glass-card p-8 max-w-lg mx-auto space-y-6">
            <p className="text-gray-600">
              Zistíme, čo potrebujete. Pomôžeme vám vybrať riešenie, prispôsobíme služby a vybavíme všetko za vás. Stačí nám pár údajov.
            </p>
            
            <div className="flex justify-center items-center space-x-6 py-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                  <span role="img" aria-label="account" className="text-lg">👤</span>
                </div>
                <span className="text-xs text-gray-500">Účet</span>
              </div>
              <div className="flex-grow h-0.5 bg-emerald-100"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                  <span role="img" aria-label="company" className="text-lg">🏢</span>
                </div>
                <span className="text-xs text-gray-500">Firma</span>
              </div>
              <div className="flex-grow h-0.5 bg-emerald-100"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                  <span role="img" aria-label="services" className="text-lg">🛍️</span>
                </div>
                <span className="text-xs text-gray-500">Služby</span>
              </div>
              <div className="flex-grow h-0.5 bg-emerald-100"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                  <span role="img" aria-label="contract" className="text-lg">📄</span>
                </div>
                <span className="text-xs text-gray-500">Zmluva</span>
              </div>
              <div className="flex-grow h-0.5 bg-emerald-100"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                  <span role="img" aria-label="done" className="text-lg">✅</span>
                </div>
                <span className="text-xs text-gray-500">Hotovo</span>
              </div>
            </div>
            
            <Button 
              onClick={onNext}
              className="w-full rounded-full py-6 bg-emerald-500 hover:bg-emerald-600 text-lg font-medium hover-lift shadow-md"
            >
              <span>Začať onboarding</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            Neviete si rady? Kliknite na chat alebo nám napíšte.
          </p>
        </div>
      </motion.main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        © 2025 Utopia. Všetky práva vyhradené.
      </footer>
    </div>
  );
};
