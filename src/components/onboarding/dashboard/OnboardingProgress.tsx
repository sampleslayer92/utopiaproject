
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  route?: string;
}

export const OnboardingProgress: React.FC = () => {
  const navigate = useNavigate();

  // Mock onboarding tasks based on typical onboarding flow
  const tasks: OnboardingTask[] = [
    {
      id: 'company',
      title: 'Informácie o spoločnosti',
      description: 'Základné údaje o vašej firme',
      completed: true
    },
    {
      id: 'business',
      title: 'Obchodné informácie',
      description: 'Prevádzky a kontaktné údaje',
      completed: true
    },
    {
      id: 'products',
      title: 'Výber produktov',
      description: 'Zariadenia a licencie',
      completed: false,
      route: '/onboarding/products'
    },
    {
      id: 'persons',
      title: 'Kontaktné osoby',
      description: 'Obchodné a technické kontakty',
      completed: false,
      route: '/onboarding/persons'
    },
    {
      id: 'billing',
      title: 'Fakturačné údaje',
      description: 'Platobné a fakturačné informácie',
      completed: false,
      route: '/onboarding/billing'
    },
    {
      id: 'sign',
      title: 'Podpis a súhlasy',
      description: 'GDPR a obchodné podmienky',
      completed: false,
      route: '/onboarding/sign'
    }
  ];

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const nextTask = tasks.find(task => !task.completed);

  const handleContinueOnboarding = () => {
    if (nextTask?.route) {
      navigate(nextTask.route);
    }
  };

  const handleCompleteOnboarding = () => {
    // Mark onboarding as completed
    localStorage.setItem('onboarding_progress', JSON.stringify({
      completed: true,
      completedSteps: tasks.map(t => t.id)
    }));
    window.location.reload(); // Refresh to hide onboarding progress
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-blue-900 dark:text-blue-100">Dokončte onboarding</span>
          <span className="text-sm font-normal text-blue-700 dark:text-blue-300">
            {completedTasks} z {totalTasks} dokončených
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {progressPercentage.toFixed(0)}% dokončené
          </p>
        </div>

        <div className="grid gap-2">
          {tasks.slice(0, 4).map((task) => (
            <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-white/5">
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${task.completed ? 'text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                  {task.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {task.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          {nextTask ? (
            <Button 
              onClick={handleContinueOnboarding}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Pokračovať v onboardingu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleCompleteOnboarding}
              className="bg-green-600 hover:bg-green-700"
            >
              Dokončiť onboarding
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
          <Button variant="outline" onClick={handleCompleteOnboarding}>
            Preskočiť zatiaľ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
