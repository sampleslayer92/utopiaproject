
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SolutionSelection } from '../steps/SolutionSelection';

interface ProductSelectionScreenProps {
  selectedProducts: string[];
  onSelect: (products: string[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const ProductSelectionScreen: React.FC<ProductSelectionScreenProps> = ({
  selectedProducts,
  onSelect,
  onSubmit,
  onBack
}) => {
  const { t } = useLanguage();
  
  const handleToggleProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      onSelect(selectedProducts.filter(p => p !== id));
    } else {
      onSelect([...selectedProducts, id]);
    }
  };

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
          key="product-selection"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full max-w-5xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {t('products.select')}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-blue-300">
                {t('products.subtitle')}
              </p>
            </div>
            
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md p-8 space-y-8 rounded-2xl border border-slate-200 dark:border-white/20 shadow-xl">
              <SolutionSelection
                selectedSolutions={selectedProducts}
                onSelect={handleToggleProduct}
                className="mb-4"
              />
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={onSubmit} 
                  className="px-8 py-6 text-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 rounded-full hover:scale-[1.02] transition-all duration-300"
                  disabled={selectedProducts.length === 0}
                >
                  <span>{t('continue.to.portal')}</span>
                  <Check className="ml-2 h-5 w-5" />
                </Button>
              </div>
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
