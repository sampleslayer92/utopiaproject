
import React from 'react';
import { cn } from '@/lib/utils';
import { BackButton } from './BackButton';
import { NextButton } from './NextButton';
import { SaveContinueLater } from './SaveContinueLater';
import { motion } from 'framer-motion';
import { HelpCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface StepContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  helpText?: string;
  className?: string;
  actionBar?: React.ReactNode;
  nextButtonDisabled?: boolean;
  onBeforeNext?: () => boolean;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  children,
  title,
  subtitle,
  helpText,
  className,
  actionBar,
  nextButtonDisabled,
  onBeforeNext
}) => {
  const [showHelp, setShowHelp] = React.useState(false);
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className={cn("flex-1 max-w-4xl mx-auto py-8 px-4", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex items-center justify-between mb-8">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
        </motion.div>
        
        <motion.div variants={itemVariants} className="hidden sm:block">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('back.to.dashboard')}
            </Button>
          </Link>
        </motion.div>
      </div>
        
      {helpText && (
        <motion.div variants={itemVariants} className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
            onClick={() => setShowHelp(!showHelp)}
          >
            <Info className="h-4 w-4 mr-2" />
            {showHelp ? "Skryť informáciu" : "Prečo to potrebujeme?"}
          </Button>
          
          {showHelp && (
            <motion.div 
              className="mt-3 p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {helpText}
            </motion.div>
          )}
        </motion.div>
      )}

      <motion.div className="space-y-6 mt-6 bg-white p-6 rounded-xl border shadow-sm" variants={itemVariants}>
        {children}
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mt-12 pt-4 border-t flex items-center justify-between"
      >
        <SaveContinueLater />
        
        <div className="flex items-center gap-4">
          {actionBar}
          <NextButton 
            disabled={nextButtonDisabled}
            onBeforeNext={onBeforeNext}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Need to add the ArrowLeft import
import { ArrowLeft } from 'lucide-react';
