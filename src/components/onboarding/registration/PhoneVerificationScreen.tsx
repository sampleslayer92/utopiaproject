
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface PhoneVerificationScreenProps {
  phone: string;
  onChangePhone: (phone: string) => void;
  onVerify: (code: string) => void;
  onBack: () => void;
}

export const PhoneVerificationScreen: React.FC<PhoneVerificationScreenProps> = ({
  phone,
  onChangePhone,
  onVerify,
  onBack
}) => {
  const { t } = useLanguage();
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']); // 4-digit code
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleSendCode = () => {
    if (phone.length < 10) {
      toast.error(t('language') === 'sk' ? "Zadajte platné telefónne číslo" : "Enter a valid phone number");
      return;
    }
    
    toast.success(t('language') === 'sk' ? "Kód bol odoslaný" : "Code has been sent");
    setCodeSent(true);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.match(/^[0-9]?$/) || value === '') {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const code = verificationCode.join('');
    if (code.length === 4) {
      onVerify(code);
    } else {
      toast.error(t('language') === 'sk' ? "Zadajte 4-miestny kód" : "Enter a 4-digit code");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900">
      <header className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          onClick={onBack}
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
          key={codeSent ? "code-verification" : "phone-input"}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {t('verify.phone')}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-blue-300">
                {codeSent ? t('enter.code') : t('phone.subtitle')}
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md p-8 space-y-6 rounded-2xl border border-slate-200 dark:border-white/20 shadow-xl">
              {!codeSent ? (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="phone" className="text-base text-slate-800 dark:text-white">
                      {t('phone')}
                    </Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => onChangePhone(e.target.value)}
                      placeholder="+421 XXX XXX XXX"
                      className="mt-2 glass-input rounded-xl py-6 text-lg bg-white/50 dark:bg-white/20 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-blue-300/70"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-center pt-4">
                    <Button 
                      onClick={handleSendCode}
                      className="px-8 py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-full hover:scale-[1.02] transition-all duration-300"
                    >
                      {t('send.code')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <p className="text-center text-slate-600 dark:text-blue-300">
                    {t('language') === 'sk' 
                      ? `Kód sme poslali na číslo ${phone}`
                      : `We've sent a code to ${phone}`
                    }
                  </p>
                  
                  <div className="flex justify-center gap-4 my-6">
                    {verificationCode.map((digit, index) => (
                      <Input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-14 h-14 text-center text-xl font-bold bg-white/50 dark:bg-white/20 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500"
                      />
                    ))}
                  </div>
                  
                  <div className="flex justify-center gap-4 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setCodeSent(false)}
                      className="px-6 py-5 text-slate-700 dark:text-blue-300 border-slate-300 dark:border-slate-600"
                    >
                      {t('language') === 'sk' ? 'Zmeniť číslo' : 'Change number'}
                    </Button>
                    <Button 
                      onClick={handleVerify}
                      className="px-8 py-5 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-xl hover:scale-[1.02] transition-all duration-300"
                      disabled={verificationCode.join('').length !== 4}
                    >
                      {t('verify.code')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
      
      <footer className="py-4 text-center text-sm text-slate-500 dark:text-blue-300/70">
        © 2025 Utopia. {t('all.rights.reserved')}
      </footer>
    </div>
  );
};
