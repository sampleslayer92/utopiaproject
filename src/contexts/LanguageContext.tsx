
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'sk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Basic translations for demo purposes
const translations: Record<string, Record<string, string>> = {
  sk: {
    'save.later': 'Uložiť a pokračovať neskôr',
    'back': 'Späť',
    'next': 'Ďalej',
    'step': 'Krok',
    'remaining.steps': 'Zostáva krokov',
    'remaining.time': 'Zostáva cca',
    'minutes': 'minút',
    'last.step': 'Posledný krok',
    'need.help': 'Potrebujete pomôcť?',
    'contact.us': 'Kontaktujte nás na',
    'welcome': 'Vitajte v Utopia',
    'welcome.subtitle': 'Vaša cesta k inteligentnejšiemu predaju začína tu',
    'start.onboarding': 'Začať onboarding',
    'select.business.type': 'Vyberte typ vášho podnikania',
    'business.type.subtitle': 'Tento výber nám pomôže prispôsobiť riešenie vašim potrebám',
    'continue': 'Pokračovať',
  },
  en: {
    'save.later': 'Save and continue later',
    'back': 'Back',
    'next': 'Next',
    'step': 'Step',
    'remaining.steps': 'Steps remaining',
    'remaining.time': 'Approx.',
    'minutes': 'minutes left',
    'last.step': 'Last step',
    'need.help': 'Need help?',
    'contact.us': 'Contact us at',
    'welcome': 'Welcome to Utopia',
    'welcome.subtitle': 'Your journey to smarter selling starts here',
    'start.onboarding': 'Start onboarding',
    'select.business.type': 'Select your business type',
    'business.type.subtitle': 'This will help us customize the solution to your needs',
    'continue': 'Continue',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('sk');

  // Load language preference from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('utopiaLanguage');
    if (savedLanguage && (savedLanguage === 'sk' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference when changed
  useEffect(() => {
    localStorage.setItem('utopiaLanguage', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
