
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { motion } from 'framer-motion';
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
  const { language } = useLanguage();
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendCode = () => {
    // In a real app, we would send the code via SMS API
    // For now, we'll just simulate it
    if (phone.length < 10) {
      toast.error(language === 'sk' ? "Zadajte platné telefónne číslo" : "Please enter a valid phone number");
      return;
    }
    
    toast.success(
      language === 'sk' 
        ? "SMS kód bol odoslaný na číslo " + phone
        : "SMS code was sent to " + phone
    );
    setCodeSent(true);
  };

  const handleSubmitCode = () => {
    if (verificationCode.length !== 4) {
      toast.error(language === 'sk' ? "Kód musí mať 4 číslice" : "Code must be 4 digits");
      return;
    }
    
    onVerify(verificationCode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-blue-900">
      <header className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-blue-300 hover:bg-blue-900/20"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === 'sk' ? 'Späť' : 'Back'}
        </Button>
        <LanguageSwitcher />
      </header>
      
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              {language === 'sk' ? 'Overenie telefónneho čísla' : 'Phone Verification'}
            </h1>
            <p className="mt-2 text-blue-300">
              {language === 'sk' ? 'Pre overenie vašej identity potrebujeme overiť telefónne číslo' : 'To verify your identity, we need to verify your phone number'}
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 space-y-6 rounded-2xl border border-white/20 shadow-xl">
            <div className="space-y-6">
              <div>
                <Label htmlFor="phone" className="text-base text-white">
                  {language === 'sk' ? 'Telefónne číslo' : 'Phone Number'}
                </Label>
                <div className="flex mt-1">
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => onChangePhone(e.target.value)}
                    placeholder="+421 9XX XXX XXX"
                    className="rounded-l-xl py-6 text-lg flex-1 bg-white/20 text-white border-r-0 placeholder:text-blue-300/70"
                  />
                  <Button
                    type="button"
                    onClick={handleSendCode}
                    disabled={codeSent}
                    className="rounded-r-xl bg-emerald-500 hover:bg-emerald-600 text-white px-4 min-h-[3.5rem] flex items-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {language === 'sk' ? 'Poslať kód' : 'Send Code'}
                  </Button>
                </div>
              </div>

              {codeSent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="code" className="text-base text-white">
                    {language === 'sk' ? 'Verifikačný kód' : 'Verification Code'}
                  </Label>
                  <div className="mt-1 flex justify-center">
                    <Input
                      id="code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                      placeholder="0000"
                      className="py-6 text-center text-3xl tracking-widest w-40 bg-white/20 text-white placeholder:text-blue-300/70"
                      maxLength={4}
                    />
                  </div>
                  <p className="mt-2 text-center text-sm text-blue-300">
                    {language === 'sk' ? 'Zadajte 4-miestny kód, ktorý sme vám poslali SMS správou' : 'Enter the 4-digit code we sent you by SMS'}
                  </p>
                </motion.div>
              )}
            </div>
            
            <div className="flex justify-center pt-4">
              {codeSent ? (
                <Button 
                  type="button"
                  onClick={handleSubmitCode}
                  disabled={verificationCode.length < 4}
                  className="px-8 py-6 text-lg bg-emerald-500 hover:bg-emerald-600 rounded-full hover-lift"
                >
                  <span>{language === 'sk' ? 'Overiť kód' : 'Verify Code'}</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <p className="text-blue-300 text-center">
                  {language === 'sk' ? 'Pre pokračovanie si nechajte poslať overovací kód' : 'Get your verification code to continue'}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.main>
      
      <footer className="py-4 text-center text-sm text-blue-300/70">
        © 2025 Utopia. Všetky práva vyhradené.
      </footer>
    </div>
  );
};
