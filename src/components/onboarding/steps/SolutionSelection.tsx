
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Monitor, BatteryCharging, Smartphone, Check, Store, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Solution = {
  id: string;
  title: string; 
  icon: React.ReactNode;
  description: string;
};

interface SolutionSelectionProps {
  selectedSolutions: string[];
  onSelect: (id: string) => void;
  className?: string;
}

export const SolutionSelection: React.FC<SolutionSelectionProps> = ({
  selectedSolutions,
  onSelect,
  className
}) => {
  const { t } = useLanguage();

  const solutions: Solution[] = [
    {
      id: 'payment-terminal',
      title: t('payment.terminal'),
      icon: <CreditCard className="h-6 w-6" />,
      description: t('payment.terminal.description')
    },
    {
      id: 'payment-gateway',
      title: t('payment.gateway'),
      icon: <Globe className="h-6 w-6" />,
      description: t('payment.gateway.description')
    },
    {
      id: 'pos-system',
      title: t('pos.system'),
      icon: <Monitor className="h-6 w-6" />,
      description: t('pos.system.description')
    },
    {
      id: 'charging-station',
      title: t('charging.station'),
      icon: <BatteryCharging className="h-6 w-6" />,
      description: t('charging.station.description')
    },
    {
      id: 'mobile-pos',
      title: t('mobile.pos'),
      icon: <Smartphone className="h-6 w-6" />,
      description: t('mobile.pos.description')
    },
    {
      id: 'retail-solution',
      title: t('retail.solution'),
      icon: <Store className="h-6 w-6" />,
      description: t('retail.solution.description')
    }
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {solutions.map((solution, index) => {
        const isSelected = selectedSolutions.includes(solution.id);
        
        return (
          <motion.div
            key={solution.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className={cn(
                "cursor-pointer transition-all border-2 hover:shadow-md",
                isSelected
                  ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20"
                  : "border-gray-200 hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-600"
              )}
              onClick={() => onSelect(solution.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    "p-3 rounded-full",
                    isSelected 
                      ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/70 dark:text-emerald-300" 
                      : "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-300"
                  )}>
                    {solution.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg">{solution.title}</h3>
                      {isSelected && (
                        <span className="text-emerald-500 dark:text-emerald-400">
                          <Check className="h-5 w-5" />
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
