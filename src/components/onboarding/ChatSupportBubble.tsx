
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';

export const ChatSupportBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <Card className="w-80 h-96 shadow-lg flex flex-col rounded-2xl overflow-hidden border-emerald-100">
              <div className="bg-emerald-500 p-4 flex items-center justify-between text-white">
                <h3 className="font-semibold">Podpora Utopia</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleChat} 
                  className="h-7 w-7 rounded-full hover:bg-emerald-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
                <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%] self-start">
                  <p className="text-sm">Dobrý deň, ako vám môžem pomôcť?</p>
                  <span className="text-xs text-gray-400 mt-1 block">14:32</span>
                </div>
                
                <div className="bg-emerald-100 p-3 rounded-lg rounded-tr-none shadow-sm max-w-[80%] self-end">
                  <p className="text-sm">Mám otázku ohľadom onboardingu...</p>
                  <span className="text-xs text-gray-400 mt-1 block">14:33</span>
                </div>
                
                <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%] self-start">
                  <p className="text-sm">Samozrejme, pýtajte sa. Som tu, aby som vám pomohol s onboardingom.</p>
                  <span className="text-xs text-gray-400 mt-1 block">14:34</span>
                </div>
              </div>
              
              <div className="p-3 border-t bg-white flex">
                <Input 
                  placeholder="Napíšte správu..." 
                  className="rounded-full mr-2"
                />
                <Button size="icon" className="rounded-full bg-emerald-500 hover:bg-emerald-600">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg bg-emerald-500 hover:bg-emerald-600 transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};
