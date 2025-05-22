
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface BusinessType {
  id: string;
  icon: string;
  title: string;
  titleEN: string;
  bgImage: string;
}

interface BusinessTypeScreenProps {
  selectedType: string;
  onSelect: (type: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BusinessTypeScreen: React.FC<BusinessTypeScreenProps> = ({
  selectedType,
  onSelect,
  onNext,
  onBack
}) => {
  const { t, language } = useLanguage();

  const businessTypes: BusinessType[] = [
    {
      id: 'retail',
      icon: '🛍️',
      title: 'Maloobchod',
      titleEN: 'Retail',
      bgImage: 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'restaurant',
      icon: '🍽️',
      title: 'Reštaurácia',
      titleEN: 'Restaurant',
      bgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'cafe',
      icon: '☕',
      title: 'Kaviareň',
      titleEN: 'Café',
      bgImage: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop'
    },
    {
      id: 'hotel',
      icon: '🏨',
      title: 'Hotel',
      titleEN: 'Hotel',
      bgImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'ecommerce',
      icon: '🛒',
      title: 'E-commerce',
      titleEN: 'E-commerce',
      bgImage: 'https://images.unsplash.com/photo-1519782990308-d44b39a0c605?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: 'services',
      icon: '🔧',
      title: 'Služby',
      titleEN: 'Services',
      bgImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop'
    },
    {
      id: 'other',
      icon: '📦',
      title: 'Iné',
      titleEN: 'Other',
      bgImage: 'https://images.unsplash.com/photo-1551286923-c82d6a8ae079?q=80&w=2071&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900">
      <header className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 dark:text-blue-300 hover:bg-slate-200/50 dark:hover:bg-blue-900/20"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Button>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>
      
      <AnimatePresence mode="wait">
        <motion.main 
          className="flex-1 flex flex-col items-center justify-center px-6 py-8"
          key="business-type"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {t('select.business.type')}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-blue-300">
                {t('business.type.subtitle')}
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              initial="hidden"
              animate="visible"
            >
              {businessTypes.map((type) => (
                <motion.div
                  key={type.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer rounded-xl overflow-hidden shadow-lg"
                  onClick={() => onSelect(type.id)}
                >
                  <div 
                    className={`h-40 bg-cover bg-center relative`}
                    style={{ backgroundImage: `url("${type.bgImage}")` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute inset-0 flex items-end p-4">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{type.icon}</span>
                          <h3 className="text-xl font-semibold text-white">
                            {language === 'sk' ? type.title : type.titleEN}
                          </h3>
                        </div>
                        
                        {selectedType === type.id && (
                          <div className="bg-emerald-500 rounded-full h-6 w-6 flex items-center justify-center">
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={onNext} 
                className="px-8 py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-full hover:scale-[1.02] transition-all duration-300"
                disabled={!selectedType}
              >
                <span>{t('continue')}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
      
      <footer className="py-4 text-center text-sm text-slate-500 dark:text-blue-300/70">
        © 2025 Utopia. {t('all.rights.reserved')}
      </footer>
    </div>
  );
};
