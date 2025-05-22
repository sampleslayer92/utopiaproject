
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const ChatSupportBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 h-96 shadow-lg animate-scale-in border-2 border-primary">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="font-medium">Podpora</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 h-72 overflow-y-auto">
            <div className="bg-muted rounded-lg p-3 mb-2 max-w-[80%]">
              <p className="text-sm">Dobrý deň, ako vám môžem pomôcť s onboardingom?</p>
            </div>
            {/* More messages would go here */}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Napíšte správu..."
              className="flex-1 px-3 py-1 border rounded"
            />
            <Button size="sm" className="bg-utopia-600 hover:bg-utopia-700">
              Odoslať
            </Button>
          </div>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="h-14 w-14 rounded-full shadow-lg bg-utopia-600 hover:bg-utopia-700"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};
