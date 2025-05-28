
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserDataFormProps {
  fullName: string;
  email: string;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

export const UserDataForm: React.FC<UserDataFormProps> = ({
  fullName,
  email,
  onChange,
  onSubmit
}) => {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-base text-slate-800 dark:text-white">
                    {t('full.name')}
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => onChange('fullName', e.target.value)}
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
                    value={email}
                    onChange={(e) => onChange('email', e.target.value)}
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
  );
};
