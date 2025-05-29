
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AddLocationDialogProps {
  onLocationAdded?: () => void;
}

export const AddLocationDialog: React.FC<AddLocationDialogProps> = ({ onLocationAdded }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleStartOnboarding = () => {
    toast.success('Spúšťa sa onboarding novej prevádzky...');
    localStorage.setItem('location_onboarding', 'true');
    navigate('/onboarding/company');
    setOpen(false);
    onLocationAdded?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Pridať prevádzku
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-emerald-600" />
            Pridať novú prevádzku
          </DialogTitle>
          <DialogDescription>
            Spustite onboarding proces pre nastavenie novej prevádzky s platobnými zariadeniami.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Čo zahŕňa onboarding:</h4>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Základné informácie o prevádzke</li>
              <li>• Výber platobných riešení</li>
              <li>• Konfigurácia zariadení</li>
              <li>• Testovanie a spustenie</li>
            </ul>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Zrušiť
            </Button>
            <Button 
              onClick={handleStartOnboarding}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              Spustiť onboarding
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
