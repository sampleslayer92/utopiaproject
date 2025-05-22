
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'sk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Enhanced translations with more keys
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
    'onboarding.process': 'Proces onboardingu',
    'activate.account': 'Aktivujte svoj účet',
    'activate.subtitle': 'Dokončite zostávajúce kroky pre aktiváciu',
    'back.to.dashboard': 'Späť na dashboard',
    'tasks.remaining': 'úloh zostáva',
    'select.country': 'Vyberte krajinu',
    'country.subtitle': 'Lokalizujeme služby podľa vašej krajiny',
    'create.account': 'Vytvorte si účet',
    'account.subtitle': 'Potrebujeme od vás len pár základných údajov',
    'verify.phone': 'Overte telefónne číslo',
    'phone.subtitle': 'Pošleme vám SMS kód pre overenie',
    'send.code': 'Poslať kód',
    'verification.code': 'Verifikačný kód',
    'verify.code': 'Overiť kód',
    'enter.code': 'Zadajte 4-miestny kód, ktorý sme vám poslali SMS správou',
    'products.select': 'Výber riešenia',
    'products.subtitle': 'Čo potrebujete? Vyberte si jedno alebo viac riešení',
    'continue.to.portal': 'Pokračovať do portálu',
    'hello': 'Dobrý deň',
    'verify.company': 'Overenie spoločnosti',
    'complete.profile': 'Dokončite svoj profil',
    'back.to.business': 'Späť k podnikaniu',
    'why.needed': 'Prečo to potrebujeme?',
    'hide.info': 'Skryť informáciu',
    'light.mode': 'Svetlý režim',
    'dark.mode': 'Tmavý režim',
    'light': 'Svetlý',
    'dark': 'Tmavý',
    'all.rights.reserved': 'Všetky práva vyhradené',
    'first.name': 'Meno',
    'last.name': 'Priezvisko',
    'email': 'Email',
    'phone': 'Telefónne číslo',
    'password': 'Heslo',
    'confirm.password': 'Potvrďte heslo',
    'agree.terms': 'Súhlasím s podmienkami',
    'personal.info': 'Osobné údaje',
    'company.info': 'Firemné údaje',
    'beneficial.owners': 'Koneční užívatelia výhod',
    'billing': 'Fakturačné údaje',
    'sign': 'Podpis',
    'company.name': 'Názov spoločnosti',
    'company.id': 'IČO',
    'tax.id': 'DIČ',
    'vat.id': 'IČ DPH',
    'address': 'Adresa',
    'city': 'Mesto',
    'postal.code': 'PSČ',
    'country': 'Krajina',
    'chat.with.us': 'Chatujte s nami',
    'how.can.we.help': 'Ako Vám môžeme pomôcť?'
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
    'onboarding.process': 'Onboarding process',
    'activate.account': 'Activate your account',
    'activate.subtitle': 'Complete the remaining steps to activate',
    'back.to.dashboard': 'Back to dashboard',
    'tasks.remaining': 'tasks remaining',
    'select.country': 'Select country',
    'country.subtitle': 'We will localize services based on your country',
    'create.account': 'Create an account',
    'account.subtitle': 'We need just a few basic details from you',
    'verify.phone': 'Verify phone number',
    'phone.subtitle': 'We will send you an SMS code for verification',
    'send.code': 'Send code',
    'verification.code': 'Verification code',
    'verify.code': 'Verify code',
    'enter.code': 'Enter the 4-digit code we sent you by SMS',
    'products.select': 'Select solutions',
    'products.subtitle': 'What do you need? Select one or more solutions',
    'continue.to.portal': 'Continue to portal',
    'hello': 'Hello',
    'verify.company': 'Verify company',
    'complete.profile': 'Complete your profile',
    'back.to.business': 'Back to business',
    'why.needed': 'Why do we need this?',
    'hide.info': 'Hide information',
    'light.mode': 'Light mode',
    'dark.mode': 'Dark mode',
    'light': 'Light',
    'dark': 'Dark',
    'all.rights.reserved': 'All rights reserved',
    'first.name': 'First name',
    'last.name': 'Last name',
    'email': 'Email',
    'phone': 'Phone number',
    'password': 'Password',
    'confirm.password': 'Confirm password',
    'agree.terms': 'I agree to the terms',
    'personal.info': 'Personal information',
    'company.info': 'Company information',
    'beneficial.owners': 'Beneficial owners',
    'billing': 'Billing information',
    'sign': 'Signature',
    'company.name': 'Company name',
    'company.id': 'Company ID',
    'tax.id': 'Tax ID',
    'vat.id': 'VAT ID',
    'address': 'Address',
    'city': 'City',
    'postal.code': 'Postal code',
    'country': 'Country',
    'chat.with.us': 'Chat with us',
    'how.can.we.help': 'How can we help you?'
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
