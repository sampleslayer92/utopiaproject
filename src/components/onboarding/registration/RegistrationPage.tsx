import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { BusinessTypeScreen } from './BusinessTypeScreen';
import { ProductSelectionScreen } from './ProductSelectionScreen';
import { CountrySelectionScreen } from './CountrySelectionScreen';
import { PhoneVerificationScreen } from './PhoneVerificationScreen';
import { WelcomeChoiceScreen } from '@/components/auth/WelcomeChoiceScreen';
import { LoginPage } from '@/components/auth/LoginPage';
import { ForgotPasswordPage } from '@/components/auth/ForgotPasswordPage';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useNavigate } from 'react-router-dom';

interface UserData {
  country: string;
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
  selectedProducts: string[];
  verificationCode: string;
}

export const RegistrationPage: React.FC = () => {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'choice' | 'login' | 'register' | 'forgot-password'>('choice');
  // Start directly at country selection instead of welcome screen
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    country: 'SK',
    fullName: '',
    email: '',
    phone: '+421',
    businessType: '',
    selectedProducts: [],
    verificationCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleCountrySelect = (country: string) => {
    const phonePrefix = country === 'SK' ? '+421' : 
                        country === 'CZ' ? '+420' : 
                        country === 'GB' ? '+44' : 
                        country === 'AT' ? '+43' : 
                        country === 'HU' ? '+36' : 
                        country === 'PL' ? '+48' :
                        country === 'DE' ? '+49' : '+44';
    setUserData({
      ...userData,
      country,
      phone: phonePrefix
    });
  };
  
  const handleBusinessTypeSelect = (type: string) => {
    setUserData({
      ...userData,
      businessType: type
    });
  };
  
  const handleProductSelect = (products: string[]) => {
    setUserData({
      ...userData,
      selectedProducts: products
    });
  };

  const verifyPhone = (code: string) => {
    setUserData({
      ...userData,
      verificationCode: code
    });
    
    if (code.length === 4) {
      toast.success(t("phone.verified"));
      nextStep();
    } else {
      toast.error(t("invalid.code"));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let role: 'admin' | 'business_partner' | 'client' | 'location' = 'client';
      if (userData.businessType === 'business_partner') {
        role = 'business_partner';
      } else if (userData.businessType === 'location') {
        role = 'location';
      }

      await register({
        email: userData.email,
        password: 'defaultPassword123',
        fullName: userData.fullName,
        role
      });
      
      // Store onboarding progress - new user hasn't completed onboarding
      localStorage.setItem('onboarding_progress', JSON.stringify({
        completed: false,
        currentStep: 'company',
        completedSteps: [],
        userData: userData
      }));
      
      toast.success("Registrácia úspešná! Pokračujte s onboardingom.");
      navigate('/onboarding/company');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };

  if (currentView === 'choice') {
    return (
      <WelcomeChoiceScreen 
        onNewClient={() => {
          setCurrentView('register');
          // Skip welcome screen - start directly at country selection
          setStep(0);
        }}
        onExistingClient={() => setCurrentView('login')}
      />
    );
  }

  if (currentView === 'login') {
    return (
      <LoginPage 
        onBack={() => setCurrentView('choice')}
        onForgotPassword={() => setCurrentView('forgot-password')}
      />
    );
  }

  if (currentView === 'forgot-password') {
    return (
      <ForgotPasswordPage 
        onBack={() => setCurrentView('login')}
      />
    );
  }

  // Start directly with country selection (step 0)
  if (step === 0) {
    return <CountrySelectionScreen 
      selectedCountry={userData.country} 
      onSelect={handleCountrySelect}
      onNext={nextStep}
      onBack={() => setCurrentView('choice')}
    />;
  }

  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900">
        <header className="flex justify-between items-center p-4">
          <Button
            variant="ghost"
            onClick={prevStep}
            className="flex items-center gap-2 text-slate-600 dark:text-blue-300 hover:bg-slate-200/50 dark:hover:bg-blue-900/20"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
          </Button>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </header>
        
        <AnimatePresence mode="wait">
          <motion.main 
            className="flex-1 flex flex-col items-center justify-center px-6 py-8"
            key="account-creation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full max-w-lg">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {t('create.account')}
                </h1>
                <p className="mt-2 text-slate-600 dark:text-blue-300">
                  {t('account.subtitle')}
                </p>
              </div>
              
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md p-8 space-y-6 rounded-2xl border border-slate-200 dark:border-white/20 shadow-xl">
                <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName" className="text-base text-slate-800 dark:text-white">
                        {t('full.name')}
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleChange}
                        placeholder={t('enter.full.name')}
                        className="mt-1 glass-input rounded-xl py-6 text-lg bg-white/50 dark:bg-white/20 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-blue-300/70"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-base text-slate-800 dark:text-white">
                        {t('email')}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder={t('email.placeholder')}
                        className="mt-1 glass-input rounded-xl py-6 text-lg bg-white/50 dark:bg-white/20 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-blue-300/70"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-center pt-4">
                    <Button 
                      type="submit" 
                      className="px-8 py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-full hover:scale-[1.02] transition-all duration-300"
                    >
                      <span>{t('continue')}</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.main>
        </AnimatePresence>
        
        <footer className="py-4 text-center text-sm text-slate-500 dark:text-blue-300/70">
          © 2025 Utopia. {t('all.rights.reserved')}
        </footer>
      </div>
    );
  }

  if (step === 2) {
    return <PhoneVerificationScreen 
      phone={userData.phone}
      onChangePhone={(phone) => setUserData({...userData, phone})}
      onVerify={verifyPhone}
      onBack={prevStep}
    />;
  }
  
  if (step === 3) {
    return <BusinessTypeScreen 
      onSelect={handleBusinessTypeSelect} 
      selectedType={userData.businessType}
      onNext={nextStep}
      onBack={prevStep}
    />;
  }
  
  if (step === 4) {
    return <ProductSelectionScreen 
      onSelect={handleProductSelect} 
      selectedProducts={userData.selectedProducts}
      onSubmit={handleSubmit}
      onBack={prevStep}
    />;
  }

  return <CountrySelectionScreen 
    selectedCountry={userData.country} 
    onSelect={handleCountrySelect}
    onNext={nextStep}
    onBack={() => setCurrentView('choice')}
  />;
};
