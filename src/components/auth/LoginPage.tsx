
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LoginPageProps {
  onBack: () => void;
  onForgotPassword: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack, onForgotPassword }) => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email je povinný';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Neplatný formát emailu';
    }
    
    if (!formData.password) {
      newErrors.password = 'Heslo je povinné';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Prosím, opravte chyby vo formulári');
      return;
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      });
    } catch (error) {
      // Error is handled in the auth context
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
              Prihlásenie do Utopia
            </h1>
            <p className="text-slate-600 dark:text-blue-300">
              Zadajte svoje prihlasovacie údaje
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vas@email.com"
                    className={`pl-10 rounded-xl py-6 text-lg bg-white/50 dark:bg-white/20 ${
                      errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    }`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="password" className="text-base text-slate-800 dark:text-white">
                  Heslo
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Vaše heslo"
                    className={`pl-10 pr-10 rounded-xl py-6 text-lg bg-white/50 dark:bg-white/20 ${
                      errors.password ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                    }
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-slate-700 dark:text-slate-300">
                    Zapamätať si prihlásenie
                  </Label>
                </div>
                
                <Button
                  type="button"
                  variant="link"
                  onClick={onForgotPassword}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Zabudnuté heslo?
                </Button>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-xl hover:scale-[1.02] transition-all duration-300"
              >
                {isLoading ? 'Prihlasovanie...' : 'Prihlásiť sa'}
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Demo prihlasovacie údaje:
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Admin:</p>
                    <p>admin@utopia.sk</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Partner 1:</p>
                    <p>partner1@utopia.sk</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Klient 1:</p>
                    <p>client1@utopia.sk</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Prevádzka 1:</p>
                    <p>location1@utopia.sk</p>
                  </div>
                </div>
                <p className="text-center border-t border-slate-300 dark:border-slate-600 pt-2 mt-2">
                  <span className="font-semibold">Heslo pre všetky účty:</span> password
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      <footer className="py-4 text-center text-sm text-slate-500 dark:text-blue-300/70">
        © 2025 Utopia. Všetky práva vyhradené.
      </footer>
    </div>
  );
};
