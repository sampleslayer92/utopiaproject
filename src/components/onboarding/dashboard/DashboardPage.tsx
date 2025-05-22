
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  title: string;
  completed: boolean;
  timeEstimate: number;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, completed, timeEstimate, onClick }) => {
  return (
    <Card className="mb-3 cursor-pointer hover:border-utopia-300 transition-all" onClick={onClick}>
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-1 bg-gray-200">
        <div 
          className="h-1 bg-utopia-600" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex">
        {/* Left sidebar */}
        <div className="w-64 bg-white border-r h-screen p-4 flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-utopia-700">Utopia</h2>
            <p className="text-sm text-gray-500">Merchant Portal</p>
          </div>
          
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">Domov</Button>
            <Button variant="ghost" className="w-full justify-start">Produkty</Button>
            <Button variant="ghost" className="w-full justify-start">Prevádzky</Button>
            <Button variant="ghost" className="w-full justify-start">Tím</Button>
            <Button variant="ghost" className="w-full justify-start">Fakturácia</Button>
            <Button variant="ghost" className="w-full justify-start">Nastavenia</Button>
          </nav>
          
          <div className="mt-auto">
            <p className="text-sm text-gray-500">© 2025 Utopia</p>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Dobrý deň, <span className="text-utopia-700">Michal</span>!</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Welcome card */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-r from-utopia-700 to-utopia-600 text-white">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">Aktivujte si svoj účet</h2>
                  <p className="mb-4">Dokončite onboarding proces a aktivujte si všetky funkcie platformy Utopia.</p>
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
                  >
                    Dokončiť nastavenie
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Stats card */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-2">Onboarding Progress</h3>
                  <div className="text-4xl font-bold text-utopia-700 mb-2">{completedTasks}/{totalTasks}</div>
                  <p className="text-sm text-gray-500">krokov dokončených</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Task list */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-medium mb-3">Zostávajúce úlohy</h2>
              <div>
                {tasks.map((task, index) => (
                  <TaskCard
                    key={index}
                    title={task.title}
                    completed={task.completed}
                    timeEstimate={task.timeEstimate}
                    onClick={() => handleTaskClick(task.step)}
                  />
                ))}
              </div>
            </div>
            
            {/* Help card */}
            <div>
              <h2 className="text-lg font-medium mb-3">Potrebujete pomoc?</h2>
              <Card>
                <CardContent className="p-6">
                  <p className="mb-4 text-gray-600">Naši špecialisti sú vám k dispozícii počas celého onboardingu.</p>
                  <Button variant="outline" className="w-full">
                    Kontaktovať podporu
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
