
import React from 'react';
import { cn } from '@/lib/utils';
import { BackButton } from './BackButton';
import { NextButton } from './NextButton';
import { SaveContinueLater } from './SaveContinueLater';
import { motion } from 'framer-motion';
import { HelpCircle, Info, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface StepContainerProps {
  children: React.ReactNode;
  title?: string; // Made optional
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
      {title && (
        <div className="flex items-center justify-between mb-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
            {subtitle && <p className="mt-2 text-slate-600 dark:text-blue-300">{subtitle}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants} className="hidden sm:block">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20 hover:bg-emerald-100/80 dark:hover:bg-emerald-800/30">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('back.to.dashboard')}
              </Button>
            </Link>
          </motion.div>
        </div>
      )}
        
      {helpText && (
        <motion.div variants={itemVariants} className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-blue-700 dark:text-blue-300 border-blue-500/30 bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100/50 dark:hover:bg-blue-800/30"
            onClick={() => setShowHelp(!showHelp)}
            aria-expanded={showHelp}
          >
            <Info className="h-4 w-4 mr-2" />
            {showHelp ? t('hide.info') : t('why.needed')}
          </Button>
          
          {showHelp && (
            <motion.div 
              className="mt-3 p-4 bg-blue-50/70 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/20 rounded-lg text-sm text-blue-800 dark:text-blue-200"
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

      <motion.div className="space-y-6 mt-6 bg-white/90 dark:bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/20 shadow-md" variants={itemVariants}>
        {children}
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mt-12 pt-4 border-t border-gray-200 dark:border-slate-700/50 flex items-center justify-between"
      >
        <SaveContinueLater />
        
        <div className="flex items-center gap-4">
          {actionBar}
          <BackButton className="border-blue-500/30 bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100/50 dark:hover:bg-blue-800/30 text-blue-700 dark:text-blue-300" />
          <NextButton 
            disabled={nextButtonDisabled}
            onBeforeNext={onBeforeNext}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
