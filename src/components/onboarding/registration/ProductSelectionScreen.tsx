
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CreditCard, Smartphone, Monitor, Battery } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductOption {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

interface ProductSelectionScreenProps {
  onSelect: (selectedProducts: string[]) => void;
  selectedProducts: string[];
  onSubmit: (e: React.FormEvent) => void;
}

export const ProductSelectionScreen: React.FC<ProductSelectionScreenProps> = ({
  onSelect,
  selectedProducts,
  onSubmit
}) => {
  const productOptions: ProductOption[] = [
    {
      id: 'pos',
      icon: <Monitor className="h-10 w-10 text-emerald-600" />,
      label: 'Pokladničné riešenie',
      description: 'Kompletný pokladničný systém pre vašu prevádzku'
    },
    {
      id: 'terminal',
      icon: <CreditCard className="h-10 w-10 text-emerald-600" />,
      label: 'Platobný terminál',
      description: 'Samostatný platobný terminál pre prijímanie kariet'
    },
    {
      id: 'softpos',
      icon: <Smartphone className="h-10 w-10 text-emerald-600" />,
      label: 'Mobilný terminál (SoftPOS)',
      description: 'Riešenie pre mobilné zariadenia Android'
    },
    {
      id: 'charging',
      icon: <Battery className="h-10 w-10 text-emerald-600" />,
      label: 'Nabíjacia stanica',
      description: 'Pre nabíjanie elektrických vozidiel'
    }
  ];

  const handleProductToggle = (productId: string) => {
    let newSelectedProducts;
    if (selectedProducts.includes(productId)) {
      newSelectedProducts = selectedProducts.filter(id => id !== productId);
    } else {
      newSelectedProducts = [...selectedProducts, productId];
    }
    onSelect(newSelectedProducts);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-emerald-50">
      <header className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:bg-emerald-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Späť
        </Button>
        <LanguageSwitcher />
      </header>
      
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center px-6 py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Výber riešenia</h1>
            <p className="mt-2 text-gray-600">
              Čo potrebujete? Vyberte si jedno alebo viac riešení.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {productOptions.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer hover:shadow-lg transition-all duration-300 h-full backdrop-blur-sm bg-white/70",
                    selectedProducts.includes(product.id)
                      ? "border-emerald-500 shadow-md ring-2 ring-emerald-200"
                      : "hover:border-emerald-200"
                  )}
                  onClick={() => handleProductToggle(product.id)}
                >
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className={cn(
                      "rounded-full p-4 transition-all flex-shrink-0",
                      selectedProducts.includes(product.id) ? "bg-emerald-100" : "bg-gray-100"
                    )}>
                      {product.icon}
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">{product.label}</div>
                      <p className="text-gray-500 text-sm">{product.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={onSubmit}
              disabled={selectedProducts.length === 0}
              className="px-8 py-6 text-lg rounded-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 hover-lift shadow-md disabled:hover:bg-emerald-400"
            >
              <span>Pokračovať do portálu</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        © 2025 Utopia. Všetky práva vyhradené.
      </footer>
    </div>
  );
};
