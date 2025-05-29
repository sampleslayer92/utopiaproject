
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Smartphone, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { demoLocations } from '@/data/demoData';

interface AddDeviceDialogProps {
  onDeviceAdded?: () => void;
}

const deviceTypes = [
  { id: 'terminal', name: 'POS Terminál', description: 'Stolný platobný terminál' },
  { id: 'mobile', name: 'Mobilný čítač', description: 'Prenosný platobný čítač' },
  { id: 'kiosk', name: 'Kiosk', description: 'Samoobslužný platobný kiosk' },
  { id: 'online', name: 'Online brána', description: 'E-commerce platobná brána' }
];

const deviceModels = {
  terminal: [
    { brand: 'Ingenico', model: 'iWL250', price: '€299' },
    { brand: 'Verifone', model: 'V240m', price: '€345' },
    { brand: 'PAX', model: 'A920Pro', price: '€285' }
  ],
  mobile: [
    { brand: 'Square', model: 'mPOP', price: '€199' },
    { brand: 'SumUp', model: 'Air', price: '€89' },
    { brand: 'iZettle', model: 'Reader 2', price: '€79' }
  ],
  kiosk: [
    { brand: 'Utopia', model: 'Self Service Pro', price: '€1299' },
    { brand: 'Custom', model: 'Kiosk Standard', price: '€899' }
  ],
  online: [
    { brand: 'Utopia', model: 'Payment Gateway', price: '€0' },
    { brand: 'Stripe', model: 'Connect', price: '€0' }
  ]
};

export const AddDeviceDialog: React.FC<AddDeviceDialogProps> = ({ onDeviceAdded }) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const handleAddDevice = () => {
    if (!selectedType || !selectedModel || !selectedLocation || !deviceName) {
      toast.error('Vyplňte všetky povinné polia');
      return;
    }

    // Generate TID
    const tid = `${selectedType.toUpperCase().slice(0, 1)}${Date.now().toString().slice(-4)}`;
    
    toast.success(`Zariadenie "${deviceName}" bolo úspešne pridané s TID: ${tid}`);
    setOpen(false);
    
    // Reset form
    setSelectedType('');
    setSelectedModel('');
    setSelectedLocation('');
    setDeviceName('');
    
    onDeviceAdded?.();
  };

  const selectedTypeData = deviceTypes.find(t => t.id === selectedType);
  const availableModels = selectedType ? deviceModels[selectedType as keyof typeof deviceModels] : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Pridať zariadenie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-emerald-600" />
            Pridať nové zariadenie
          </DialogTitle>
          <DialogDescription>
            Vyberte typ zariadenia a priradite ho k prevádzke.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="device-type">Typ zariadenia *</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Vyberte typ zariadenia" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div>
                      <div className="font-medium">{type.name}</div>
                      <div className="text-xs text-gray-500">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedType && (
            <div className="space-y-2">
              <Label htmlFor="device-model">Model zariadenia *</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model, index) => (
                    <SelectItem key={index} value={`${model.brand}-${model.model}`}>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="font-medium">{model.brand} {model.model}</div>
                        </div>
                        <div className="text-emerald-600 font-semibold">{model.price}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="device-location">Prevádzka *</Label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Vyberte prevádzku" />
              </SelectTrigger>
              <SelectContent>
                {demoLocations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-xs text-gray-500">{location.address}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="device-name">Názov zariadenia *</Label>
            <Input
              id="device-name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="napr. Terminal 1, Kasa hlavná..."
            />
          </div>

          {selectedType && selectedModel && selectedLocation && deviceName && (
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold text-emerald-800 dark:text-emerald-200">Pripravené na pridanie</span>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Zariadenie:</strong> {deviceName}</p>
                <p><strong>Type:</strong> {selectedTypeData?.name}</p>
                <p><strong>Model:</strong> {selectedModel.replace('-', ' ')}</p>
                <p><strong>Prevádzka:</strong> {demoLocations.find(l => l.id === selectedLocation)?.name}</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Zrušiť
            </Button>
            <Button 
              onClick={handleAddDevice}
              disabled={!selectedType || !selectedModel || !selectedLocation || !deviceName}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              Pridať zariadenie
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
