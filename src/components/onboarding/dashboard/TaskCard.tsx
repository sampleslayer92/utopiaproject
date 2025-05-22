
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
      className="bg-slate-700/30 rounded-lg border border-slate-600/30 p-3 cursor-pointer hover:bg-slate-700/50 transition-all"
      whileHover={{ x: 5 }}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            completed ? 'bg-emerald-600/20 border border-emerald-500/30' : 'bg-blue-600/20 border border-blue-500/30'
          }`}>
            {completed ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Clock className="h-4 w-4 text-blue-300" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-white">{title}</h3>
            <p className="text-sm text-blue-300">
              {completed ? 'Vyplnené' : `Odhad: ${timeEstimate} minút`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            completed 
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' 
              : 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
          }`}>
            {completed ? '✅ Vyplnené' : '🕓 Vyžaduje vyplnenie'}
          </span>
          <ArrowRight className="h-5 w-5 text-blue-300" />
        </div>
      </div>
    </motion.div>
  );
};
