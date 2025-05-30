
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, LogIn, ArrowRight } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';

interface WelcomeChoiceScreenProps {
  onNewClient: () => void;
  onExistingClient: () => void;
}

export const WelcomeChoiceScreen: React.FC<WelcomeChoiceScreenProps> = ({
  onNewClient,
  onExistingClient
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900">
      <header className="flex justify-end items-center p-4">
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <motion.div 
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Vitajte v Utopia
            </h1>
            <p className="text-lg text-slate-600 dark:text-blue-300">
              Pokračujte do portálu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="h-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <LogIn className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    Prihlásiť sa
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    Vstúpte do portálu pomocou výberu role
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    onClick={onExistingClient}
                    className="w-full py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <span>Pokračovať</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="h-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <UserPlus className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    Registrácia
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    Vytvorte si nový účet v systéme
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    onClick={onNewClient}
                    variant="outline"
                    className="w-full py-6 text-lg border-2 border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <span>Registrovať sa</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      <footer className="py-4 text-center text-sm text-slate-500 dark:text-blue-300/70">
        © 2025 Utopia. Všetky práva vyhradené.
      </footer>
    </div>
  );
};
