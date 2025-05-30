
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Building2, Wrench, Users } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface RoleSelectionScreenProps {
  onBack: () => void;
}

const roleData = [
  {
    role: 'admin' as UserRole,
    title: 'ISO Organizácia',
    description: 'Hlavná administrácia systému',
    icon: Building2,
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    role: 'business_partner' as UserRole,
    title: 'Servisný partner',
    description: 'Partner poskytujúci služby klientom',
    icon: Wrench,
    gradient: 'from-emerald-500 to-blue-500'
  },
  {
    role: 'client' as UserRole,
    title: 'Klient',
    description: 'Koncový používateľ systému',
    icon: Users,
    gradient: 'from-blue-500 to-cyan-500'
  }
];

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onBack }) => {
  const { loginWithRole, isLoading } = useAuth();

  const handleRoleSelect = async (role: UserRole) => {
    try {
      await loginWithRole(role);
    } catch (error) {
      console.error('Role selection error:', error);
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
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Vyberte si typ účtu
            </h1>
            <p className="text-lg text-slate-600 dark:text-blue-300">
              Pokračujte ako jeden z typov používateľov
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roleData.map((roleInfo, index) => {
              const IconComponent = roleInfo.icon;
              
              return (
                <motion.div
                  key={roleInfo.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${roleInfo.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                        {roleInfo.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-300">
                        {roleInfo.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button
                        onClick={() => handleRoleSelect(roleInfo.role)}
                        disabled={isLoading}
                        className={`w-full py-6 text-lg bg-gradient-to-r ${roleInfo.gradient} hover:opacity-90 rounded-xl hover:scale-[1.02] transition-all duration-300 text-white border-0`}
                      >
                        {isLoading ? 'Prihlasovanie...' : 'Pokračovať'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
      
      <footer className="py-4 text-center text-sm text-slate-500 dark:text-blue-300/70">
        © 2025 Utopia. Všetky práva vyhradené.
      </footer>
    </div>
  );
};
