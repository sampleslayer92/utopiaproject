
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ForgotPasswordPageProps {
  onBack: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBack }) => {
  const { forgotPassword, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900">
        <header className="flex justify-between items-center p-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-blue-300 hover:bg-slate-200/50 dark:hover:bg-blue-900/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Späť na prihlásenie
          </Button>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </header>
        
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <motion.div 
            className="w-full max-w-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-slate-200 dark:border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Email odoslaný
              </h1>
              <p className="text-slate-600 dark:text-blue-300 mb-6">
                Odkaz na reset hesla bol odoslaný na adresu <strong>{email}</strong>. 
                Skontrolujte svoju e-mailovú schránku a postupujte podľa inštrukcií.
              </p>
              <Button 
                onClick={onBack}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
              >
                Späť na prihlásenie
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900">
      <header className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 dark:text-blue-300 hover:bg-slate-200/50 dark:hover:bg-blue-900/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Späť
        </Button>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Zabudnuté heslo
            </h1>
            <p className="text-slate-600 dark:text-blue-300">
              Zadajte svoj email a pošleme vám odkaz na reset hesla
            </p>
          </div>
          
          <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-slate-200 dark:border-white/20 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-base text-slate-800 dark:text-white">
                  Email
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vas@email.com"
                    className="pl-10 rounded-xl py-6 text-lg bg-white/50 dark:bg-white/20 border-slate-300 dark:border-slate-600"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading || !email}
                className="w-full py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-xl hover:scale-[1.02] transition-all duration-300"
              >
                {isLoading ? 'Odosielanie...' : 'Odoslať reset hesla'}
              </Button>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
