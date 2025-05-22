
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Check, 
  Clock, 
  MessageCircle, 
  Home, 
  ShoppingBag, 
  Building2, 
  FileText, 
  HelpCircle,
  Monitor,
  CreditCard,
  Smartphone,
  Battery
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { TaskCard } from './TaskCard'; // We'll create this component

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Get registration data from localStorage
  const registrationData = localStorage.getItem('utopiaRegistration') 
    ? JSON.parse(localStorage.getItem('utopiaRegistration')!) 
    : { fullName: 'Používateľ', selectedProducts: [] };
  
  // Mapping of tasks to steps in the wizard
  const tasks = [
    { title: 'Adresa firmy', completed: false, timeEstimate: 2, step: 'company' },
    { title: 'Povaha podnikania', completed: false, timeEstimate: 3, step: 'business' },
    { title: 'Výber produktov', completed: false, timeEstimate: 4, step: 'products' },
    { title: 'Firemné osoby', completed: false, timeEstimate: 3, step: 'persons' },
    { title: 'Skutočný majiteľ', completed: false, timeEstimate: 2, step: 'beneficialOwners' },
    { title: 'Fakturačné údaje', completed: false, timeEstimate: 2, step: 'billing' },
  ];
  
  const handleTaskClick = (step: string) => {
    navigate(`/onboarding/${step}`);
  };
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const firstName = registrationData.fullName.split(' ')[0] || 'Používateľ';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="h-1 bg-gray-200">
        <div 
          className="h-1 bg-emerald-600" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex">
        {/* Left sidebar */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-slate-800 border-r border-slate-700 h-screen p-4 flex flex-col shadow-md"
        >
          <div className="mb-6 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600/50 flex items-center justify-center mr-3">
              <span className="text-2xl font-bold text-white">U</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Utopia</h2>
              <p className="text-xs text-blue-300">Merchant Portal</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start font-medium bg-blue-900/30 text-white border-l-2 border-emerald-500">
              <Home className="mr-2 h-4 w-4" />
              Domov
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Moje služby
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white">
              <Building2 className="mr-2 h-4 w-4" />
              Zariadenia
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white">
              <FileText className="mr-2 h-4 w-4" />
              Zmluvy
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white">
              <HelpCircle className="mr-2 h-4 w-4" />
              Podpora
            </Button>
          </nav>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-slate-400">© 2025 Utopia</div>
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
        
        {/* Main content */}
        <div className="flex-1 p-6 text-white">
          <div className="flex justify-between items-center mb-6">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              Dobrý deň, <span className="text-emerald-400">{firstName}</span>!
            </motion.h1>
            
            <LanguageSwitcher />
          </div>
          
          {/* Central content - Activate Your Account */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 text-center py-10"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-600/30 rounded-xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                <span className="text-4xl font-bold text-white">U</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-2">{t('activate.account')}</h2>
              <p className="text-blue-300 mb-6">{t('activate.subtitle')}</p>
              
              <div className="flex justify-center items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{totalTasks - completedTasks}</span>
                </div>
                <span className="text-blue-200">{t('tasks.remaining')}</span>
              </div>
              
              <Button
                onClick={() => navigate('/onboarding/company')}
                className="rounded-full py-6 px-8 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 font-medium shadow-lg border border-white/10 hover:shadow-emerald-500/20"
              >
                Pokračovať v nastavení
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tasks list */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h2 className="text-lg font-medium mb-4 text-white flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-emerald-400" />
                  Zostávajúce úlohy
                </h2>
                
                <div className="space-y-2">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                      <TaskCard
                        title={task.title}
                        completed={task.completed}
                        timeEstimate={task.timeEstimate}
                        onClick={() => handleTaskClick(task.step)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Selected solutions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h2 className="text-lg font-medium mb-4 text-white flex items-center">
                  <ShoppingBag className="h-4 w-4 mr-2 text-emerald-400" />
                  Zhrnutie vybraného riešenia
                </h2>
                
                {registrationData.selectedProducts?.length > 0 ? (
                  <div className="space-y-4">
                    {registrationData.selectedProducts?.includes('pos') && (
                      <div className="flex items-center bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
                        <div className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center mr-3 border border-emerald-500/30">
                          <Monitor className="h-4 w-4 text-emerald-400" />
                        </div>
                        <p className="text-blue-100">Pokladničné riešenie</p>
                      </div>
                    )}
                    {registrationData.selectedProducts?.includes('terminal') && (
                      <div className="flex items-center bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
                        <div className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center mr-3 border border-emerald-500/30">
                          <CreditCard className="h-4 w-4 text-emerald-400" />
                        </div>
                        <p className="text-blue-100">Platobný terminál</p>
                      </div>
                    )}
                    {registrationData.selectedProducts?.includes('softpos') && (
                      <div className="flex items-center bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
                        <div className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center mr-3 border border-emerald-500/30">
                          <Smartphone className="h-4 w-4 text-emerald-400" />
                        </div>
                        <p className="text-blue-100">Mobilný terminál (SoftPOS)</p>
                      </div>
                    )}
                    {registrationData.selectedProducts?.includes('charging') && (
                      <div className="flex items-center bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
                        <div className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center mr-3 border border-emerald-500/30">
                          <Battery className="h-4 w-4 text-emerald-400" />
                        </div>
                        <p className="text-blue-100">Nabíjacia stanica</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-blue-200">Zatiaľ ste nevybrali žiadne riešenie</p>
                )}
                
                <div className="mt-6 pt-4 border-t border-slate-700/50">
                  <h3 className="font-medium mb-3 text-white">Potrebujete pomoc?</h3>
                  <Button variant="outline" className="w-full rounded-lg border-slate-600 text-blue-100 hover:bg-slate-700/50">
                    Kontaktovať podporu
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Floating chat bubble */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6"
      >
        <Button 
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-lg flex items-center justify-center hover-scale"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};
