
import React from 'react';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskCardProps {
  title: string;
  completed: boolean;
  timeEstimate: number;
  onClick: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ title, completed, timeEstimate, onClick }) => {
  return (
    <motion.div 
      className="p-3 border rounded-lg bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800/70 transition-all"
      whileHover={{ x: 5 }}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            completed ? 'bg-emerald-50 border border-emerald-500/30 dark:bg-emerald-900/20' : 'bg-blue-50 border border-blue-500/30 dark:bg-blue-900/20'
          }`}>
            {completed ? (
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-blue-300">
              {completed ? 'Vyplnené' : `Odhad: ${timeEstimate} minút`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            completed 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-500/30 dark:bg-emerald-900/20 dark:text-emerald-400' 
              : 'bg-blue-50 text-blue-700 border border-blue-500/30 dark:bg-blue-900/20 dark:text-blue-400'
          }`}>
            {completed ? '✅ Vyplnené' : '🕓 Vyžaduje vyplnenie'}
          </span>
          <ArrowRight className="h-5 w-5 text-gray-400 dark:text-blue-400" />
        </div>
      </div>
    </motion.div>
  );
};
