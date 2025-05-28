
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
          className="w-full max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Vitajte v Utopia
            </h1>
            <p className="text-xl text-slate-600 dark:text-blue-300">
              Vyberte si, ako chcete pokračovať
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full bg-white/80 dark:bg-white/10 backdrop-blur-md border-slate-200 dark:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      Nový klient
                    </h2>
                    <p className="text-slate-600 dark:text-blue-300 mb-6">
                      Začnite registráciu a nastavte si svoj nový účet v systéme Utopia
                    </p>
                  </div>
                  <Button 
                    onClick={onNewClient}
                    className="w-full py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    Začať registráciu
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full bg-white/80 dark:bg-white/10 backdrop-blur-md border-slate-200 dark:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      Existujúci klient
                    </h2>
                    <p className="text-slate-600 dark:text-blue-300 mb-6">
                      Už máte účet? Prihláste sa pomocou svojho emailu a hesla
                    </p>
                  </div>
                  <Button 
                    onClick={onExistingClient}
                    variant="outline"
                    className="w-full py-6 text-lg border-2 border-slate-300 dark:border-white/30 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    Prihlásiť sa
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
