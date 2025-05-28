
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export const GlobalChatbot: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `Dobrý deň ${user?.fullName || 'užívateľ'}! Som váš Utopia asistent. Ako vám môžem pomôcť?`,
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(message),
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('tiket') || msg.includes('ticket')) {
      return 'Môžem vám pomôcť s vytvorením tiketu. Choďte do sekcie Tikety a kliknite na "Nový tiket". Aký typ problému máte?';
    }
    
    if (msg.includes('zariadenie') || msg.includes('device')) {
      return 'Ohľadom zariadení vám môžem poradiť. Môžete si pozrieť stav všetkých zariadení v sekcii Zariadenia. Potrebujete pomoc s konkrétnym zariadením?';
    }
    
    if (msg.includes('faktura') || msg.includes('platba')) {
      return 'Pre otázky týkajúce sa fakturácie a platieb vám odporúčam kontaktovať váš obchodný tím alebo si pozrieť sekciu Zmluvy.';
    }
    
    if (msg.includes('help') || msg.includes('pomoc')) {
      return 'Som tu, aby som vám pomohol! Môžem vám poradiť s:\n• Vytváraním tiketov\n• Správou zariadení\n• Navigáciou v systéme\n• Základnými otázkami\n\nO čom by ste sa chceli dozvedieť viac?';
    }
    
    return 'Ďakujem za vašu otázku. Ak potrebujete špecializovanú pomoc, neváhajte vytvoriť tiket alebo kontaktovať náš podporný tím. Môžem vám pomôcť s navigáciou v systéme alebo základnými otázkami.';
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
            <Card className="w-80 h-96 shadow-xl flex flex-col rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <h3 className="font-semibold">Utopia Asistent</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)} 
                  className="h-7 w-7 rounded-full hover:bg-white/20 text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2 ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{msg.text}</p>
                        <span className={`text-xs mt-1 block ${
                          msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                        }`}>
                          {new Date(msg.timestamp).toLocaleTimeString('sk-SK', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-3 border-t bg-white dark:bg-gray-800 flex gap-2">
                <Input 
                  placeholder="Napíšte správu..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage}
                  size="icon" 
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={!message.trim()}
                >
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
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-white"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};
