
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useNavigate } from 'react-router-dom';
import { WelcomeScreen } from './WelcomeScreen';
import { BusinessTypeScreen } from './BusinessTypeScreen';
import { motion, AnimatePresence } from 'framer-motion';

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  businessType: string;
}

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: Welcome, 1: Language, 2: Business Type, 3: Personal Info
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '+421',
    businessType: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleBusinessTypeSelect = (type: string) => {
    setUserData({
      ...userData,
      businessType: type
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save data to localStorage or context
    localStorage.setItem('utopiaRegistration', JSON.stringify(userData));
    // Redirect to dashboard
    navigate('/dashboard');
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  if (step === 0) {
    return <WelcomeScreen onNext={nextStep} />;
  }
  
  if (step === 1) {
    return <BusinessTypeScreen 
      onSelect={handleBusinessTypeSelect} 
      selectedType={userData.businessType}
      onNext={nextStep} 
    />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-emerald-50">
      <header className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          onClick={prevStep}
          className="flex items-center gap-2 text-gray-600 hover:bg-emerald-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Späť
        </Button>
        <LanguageSwitcher />
      </header>
      
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-1 flex flex-col items-center justify-center px-6 py-8"
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Dokončite registráciu
              </h1>
              <p className="mt-2 text-gray-600">
                Potrebujeme od vás len pár základných údajov pre vytvorenie účtu
              </p>
            </div>
            
            <div className="glass-card p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-base">
                      Meno a priezvisko
                      <span className="text-sm text-gray-400 ml-1">(Voliteľné)</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleChange}
                      placeholder="Zadajte vaše meno a priezvisko"
                      className="mt-1 glass-input rounded-xl py-6 text-lg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-base">
                      E-mailová adresa
                      <span className="text-sm text-gray-400 ml-1">(Voliteľné)</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleChange}
                      placeholder="vasa@adresa.sk"
                      className="mt-1 glass-input rounded-xl py-6 text-lg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-base">
                      Telefónne číslo
                      <span className="text-sm text-gray-400 ml-1">(Voliteľné)</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      placeholder="+421"
                      className="mt-1 glass-input rounded-xl py-6 text-lg"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    className="px-8 py-6 text-lg bg-emerald-500 hover:bg-emerald-600 rounded-full hover-lift"
                  >
                    <span>Vytvoriť účet a vstúpiť do portálu</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        © 2025 Utopia. Všetky práva vyhradené.
      </footer>
    </div>
  );
};
