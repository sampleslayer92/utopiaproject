
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

interface TaskCardProps {
  title: string;
  completed: boolean;
  timeEstimate: number;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, completed, timeEstimate, onClick }) => {
  return (
    <Card className="mb-3 cursor-pointer hover:border-emerald-300 transition-all bg-white/80 backdrop-blur-sm" onClick={onClick}>
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            completed ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            {completed ? (
              <Check className="h-5 w-5 text-green-600" />
            ) : (
              <Clock className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500">
              {completed ? 'Vyplnené' : `Odhad: ${timeEstimate} minút`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium px-2 py-1 rounded ${
            completed ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {completed ? '✅ Vyplnené' : '🕓 Vyžaduje vyplnenie'}
          </span>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  
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
    { title: 'Podpis zmluvy', completed: false, timeEstimate: 3, step: 'sign' },
  ];
  
  const handleTaskClick = (step: string) => {
    navigate(`/onboarding/${step}`);
  };
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const firstName = registrationData.fullName.split(' ')[0] || 'Používateľ';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50">
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
          className="w-64 bg-white border-r h-screen p-4 flex flex-col shadow-md"
        >
          <div className="mb-6 flex items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
              <img src="/placeholder.svg" alt="Logo" className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-700">Utopia</h2>
              <p className="text-sm text-gray-500">Merchant Portal</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start font-medium bg-emerald-50 text-emerald-700">
              <Home className="mr-2 h-4 w-4" />
              Domov
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Moje služby
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Building2 className="mr-2 h-4 w-4" />
              Zariadenia
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Zmluvy
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" />
              Podpora
            </Button>
          </nav>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">© 2025 Utopia</div>
              <LanguageSwitcher />
            </div>
          </div>
        </motion.div>
        
        {/* Main content */}
        <div className="flex-1 p-6">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-6"
          >
            Dobrý deň, <span className="text-emerald-700">{firstName}</span>!
          </motion.h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Welcome card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white overflow-hidden backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">Vitajte v Utopia!</h2>
                  <p className="mb-4">Dokončite onboarding proces a aktivujte si všetky funkcie platformy Utopia. Ešte 5 krokov a je to hotové.</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2 flex-1 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-white rounded-full" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{progressPercentage}%</span>
                  </div>
                  <Button 
                    variant="secondary" 
                    onClick={() => navigate('/onboarding/company')}
                    className="rounded-full shadow-md hover-lift"
                  >
                    Dokončiť nastavenie
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Stats card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Onboarding Progress</h3>
                  <div className="text-4xl font-bold text-emerald-700 mb-2">{completedTasks}/{totalTasks}</div>
                  <p className="text-sm text-gray-500">krokov dokončených</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Task list */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h2 className="text-lg font-medium mb-3">Zostávajúce úlohy</h2>
              <div>
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
            </motion.div>
            
            {/* Selected solutions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-lg font-medium mb-3">Zhrnutie vybraného riešenia</h2>
              <Card className="backdrop-blur-sm bg-white/80 shadow-md">
                <CardContent className="p-6">
                  {registrationData.selectedProducts?.length > 0 ? (
                    <div className="space-y-3">
                      {registrationData.selectedProducts?.includes('pos') && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                            <Monitor className="h-4 w-4 text-emerald-600" />
                          </div>
                          <p>Pokladničné riešenie</p>
                        </div>
                      )}
                      {registrationData.selectedProducts?.includes('terminal') && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                            <CreditCard className="h-4 w-4 text-emerald-600" />
                          </div>
                          <p>Platobný terminál</p>
                        </div>
                      )}
                      {registrationData.selectedProducts?.includes('softpos') && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                            <Smartphone className="h-4 w-4 text-emerald-600" />
                          </div>
                          <p>Mobilný terminál (SoftPOS)</p>
                        </div>
                      )}
                      {registrationData.selectedProducts?.includes('charging') && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                            <Battery className="h-4 w-4 text-emerald-600" />
                          </div>
                          <p>Nabíjacia stanica</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">Zatiaľ ste nevybrali žiadne riešenie</p>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h3 className="font-medium mb-2">Potrebujete pomoc?</h3>
                    <Button variant="outline" className="w-full rounded-full">
                      Kontaktovať podporu
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg flex items-center justify-center hover-scale"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};
