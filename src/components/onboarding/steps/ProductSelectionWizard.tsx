
import React, { useState, useEffect } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  ChevronDown, ChevronUp, Plus, Trash2, Check, X, 
  Wifi, Signal, Computer, CreditCard, ShoppingBag, 
  Store, Globe, Smartphone, Zap, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Types for our wizard
type WizardStep = 'solution' | 'devices' | 'software' | 'payment' | 'services';

interface ProductSelectionWizardProps {
  onNext: () => void;
  onBack: () => void;
}

export const ProductSelectionWizard: React.FC<ProductSelectionWizardProps> = ({ onNext, onBack }) => {
  const { 
    data, 
    updateZariadenie, 
    updateLicencia, 
    updatePlatobnaMetoda, 
    updateDoplnkovaSluzba 
  } = useOnboarding();
  
  const [currentStep, setCurrentStep] = useState<WizardStep>('solution');
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);

  // Solution selection
  const solutions = [
    { id: 'terminal', name: 'Platobný terminál', icon: <CreditCard className="w-8 h-8" /> },
    { id: 'pokladna', name: 'Pokladničné riešenie', icon: <ShoppingBag className="w-8 h-8" /> },
    { id: 'platobna-brana', name: 'Platobná brána', icon: <Globe className="w-8 h-8" /> },
    { id: 'softpos', name: 'Terminál v mobile (SoftPOS)', icon: <Smartphone className="w-8 h-8" /> },
    { id: 'nabijacia-stanica', name: 'Nabíjacia stanica', icon: <Zap className="w-8 h-8" /> },
  ];

  // Device connection types
  const connectionTypes = [
    { id: 'wifi', name: 'WiFi', icon: <Wifi className="h-4 w-4" /> },
    { id: 'sim', name: 'SIM karta', icon: <Signal className="h-4 w-4" /> },
    { id: 'eth', name: 'Ethernet', icon: <Computer className="h-4 w-4" /> }
  ];

  // Toggle solution selection
  const toggleSolution = (id: string) => {
    setSelectedSolutions(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Filter devices based on selected solutions
  const getFilteredDevices = () => {
    if (selectedSolutions.length === 0) {
      return data.zariadenia;
    }

    return data.zariadenia.filter(device => {
      // Map device IDs to solution categories
      if (selectedSolutions.includes('terminal')) {
        if (['a920-gprs', 'a920-wifi', 'a80-eth', 's800-eth', 'q80-wifi-eth', 'q80-eth', 'pax-a920', 'pax-a80', 'pax-a35', 'pinpad'].includes(device.id)) {
          return true;
        }
      }
      if (selectedSolutions.includes('pokladna')) {
        if (['a920-gprs', 'a920-wifi', 'pax-a920', 'pax-a80'].includes(device.id)) {
          return true;
        }
      }
      if (selectedSolutions.includes('softpos')) {
        if (['softpos'].includes(device.id)) {
          return true;
        }
      }
      if (selectedSolutions.includes('platobna-brana')) {
        return false; // No physical devices for payment gateway
      }
      if (selectedSolutions.includes('nabijacia-stanica')) {
        return false; // No devices for charging stations yet
      }
      return false;
    });
  };

  // Toggle device selection
  const handleDeviceSelection = (deviceId: string) => {
    updateZariadenie(deviceId, { selected: !data.zariadenia.find(d => d.id === deviceId)?.selected });
  };

  // Update device details
  const updateDeviceDetails = (deviceId: string, updates: any) => {
    updateZariadenie(deviceId, updates);
  };

  // Navigation between steps
  const goToNextStep = () => {
    switch (currentStep) {
      case 'solution':
        setCurrentStep('devices');
        break;
      case 'devices':
        setCurrentStep('software');
        break;
      case 'software':
        setCurrentStep('payment');
        break;
      case 'payment':
        setCurrentStep('services');
        break;
      case 'services':
        onNext(); // Complete the wizard
        break;
    }
  };

  const goToPrevStep = () => {
    switch (currentStep) {
      case 'devices':
        setCurrentStep('solution');
        break;
      case 'software':
        setCurrentStep('devices');
        break;
      case 'payment':
        setCurrentStep('software');
        break;
      case 'services':
        setCurrentStep('payment');
        break;
      default:
        onBack(); // Go back to previous onboarding step
    }
  };

  // Calculate selected items count
  const getSelectedItemsCount = () => {
    const devices = data.zariadenia.filter(d => d.selected).length;
    const software = data.licencie.filter(l => l.selected).length;
    const payments = data.platobneMetody.filter(p => p.selected).length;
    const services = data.doplnkoveSluzby.filter(s => s.selected).length;
    return devices + software + payments + services;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 md:gap-4">
        {['solution', 'devices', 'software', 'payment', 'services'].map((step, index) => (
          <div 
            key={step}
            className={cn(
              "flex items-center", 
              index !== 4 && "flex-1",
              currentStep === step ? "opacity-100" : "opacity-60"
            )}
          >
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                currentStep === step 
                  ? "bg-emerald-500 text-white" 
                  : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300"
              )}
            >
              {index + 1}
            </div>
            <span className={cn(
              "text-sm font-medium hidden md:block",
              currentStep === step 
                ? "text-emerald-600 dark:text-emerald-400" 
                : "text-slate-500 dark:text-slate-400"
            )}>
              {step === 'solution' && 'Výber riešenia'}
              {step === 'devices' && 'Zariadenia'}
              {step === 'software' && 'Softvér'}
              {step === 'payment' && 'Platby'}
              {step === 'services' && 'Služby'}
            </span>
            {index < 4 && (
              <div className="flex-1 h-0.5 mx-2 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        {/* Step 1: Solution Selection */}
        {currentStep === 'solution' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Výber riešenia</h2>
            <p className="text-slate-600 dark:text-slate-400">Vyberte si jedno alebo viac riešení, ktoré potrebujete pre vašu prevádzku.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {solutions.map(solution => (
                <Card 
                  key={solution.id} 
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden relative",
                    selectedSolutions.includes(solution.id) 
                      ? "border-emerald-500 dark:border-emerald-400 shadow-emerald-100 dark:shadow-emerald-900/30" 
                      : "border-slate-200 dark:border-slate-700"
                  )}
                  onClick={() => toggleSolution(solution.id)}
                >
                  {selectedSolutions.includes(solution.id) && (
                    <div className="absolute top-0 right-0 mt-2 mr-2 bg-emerald-100 dark:bg-emerald-900/70 rounded-full p-1">
                      <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={cn(
                      "p-4 rounded-full mb-4",
                      selectedSolutions.includes(solution.id) 
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" 
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    )}>
                      {solution.icon}
                    </div>
                    <h3 className="text-lg font-medium">{solution.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Device Selection */}
        {currentStep === 'devices' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Výber zariadení</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Vyberte si zariadenia, ktoré chcete používať vo vašej prevádzke.
              {selectedSolutions.length > 0 && ' Zobrazujeme zariadenia relevantné pre vaše riešenia.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredDevices().map(device => {
                const isSelected = device.selected;
                
                return (
                  <Card 
                    key={device.id} 
                    className={cn(
                      "transition-all duration-200 overflow-hidden",
                      isSelected ? "border-emerald-500 dark:border-emerald-400" : "border-slate-200 dark:border-slate-700"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">{device.nazov}</h3>
                        <Switch
                          checked={isSelected}
                          onCheckedChange={() => handleDeviceSelection(device.id)}
                        />
                      </div>
                      
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`${device.id}-pocet`}>Počet kusov</Label>
                              <Input
                                id={`${device.id}-pocet`}
                                type="number"
                                min={1}
                                value={device.pocetKs}
                                onChange={(e) => updateDeviceDetails(device.id, { pocetKs: parseInt(e.target.value) || 1 })}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Typ nákupu</Label>
                              <RadioGroup 
                                value={device.typNakupu} 
                                onValueChange={(value) => updateDeviceDetails(device.id, { typNakupu: value })}
                                className="flex space-x-2"
                              >
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem value="Prenájom" id={`${device.id}-prenajom`} />
                                  <Label htmlFor={`${device.id}-prenajom`}>Prenájom</Label>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <RadioGroupItem value="Kúpa" id={`${device.id}-kupa`} />
                                  <Label htmlFor={`${device.id}-kupa`}>Kúpa</Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                          
                          {device.typNakupu === 'Prenájom' && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`${device.id}-viazanost`}>Viazanosť</Label>
                                <Select
                                  value={String(device.viazanost)}
                                  onValueChange={(value) => updateDeviceDetails(device.id, { viazanost: parseInt(value) as 12 | 24 | 36 })}
                                >
                                  <SelectTrigger id={`${device.id}-viazanost`}>
                                    <SelectValue placeholder="Vyberte viazanosť" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="12">12 mesiacov</SelectItem>
                                    <SelectItem value="24">24 mesiacov</SelectItem>
                                    <SelectItem value="36">36 mesiacov</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`${device.id}-frekvencia`}>Frekvencia platby</Label>
                                <Select
                                  value={device.frekvenciaPlatby}
                                  onValueChange={(value) => updateDeviceDetails(device.id, { frekvenciaPlatby: value })}
                                >
                                  <SelectTrigger id={`${device.id}-frekvencia`}>
                                    <SelectValue placeholder="Vyberte frekvenciu" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="mesačne">Mesačne</SelectItem>
                                    <SelectItem value="ročne">Ročne</SelectItem>
                                    <SelectItem value="sezónne">Sezónne</SelectItem>
                                    <SelectItem value="z obratu">Z obratu</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <Label>Typ pripojenia</Label>
                            <div className="flex flex-wrap gap-2">
                              {connectionTypes.map(conn => (
                                <Button
                                  key={conn.id}
                                  variant={conn.id === 'wifi' && device.hasWifi || conn.id === 'sim' && device.hasSim ? "default" : "outline"}
                                  size="sm"
                                  className={cn(
                                    "gap-1",
                                    conn.id === 'wifi' && device.hasWifi && "bg-blue-500 hover:bg-blue-600",
                                    conn.id === 'sim' && device.hasSim && "bg-green-500 hover:bg-green-600"
                                  )}
                                  onClick={() => {
                                    if (conn.id === 'wifi') {
                                      updateDeviceDetails(device.id, { hasWifi: !device.hasWifi });
                                    } else if (conn.id === 'sim') {
                                      updateDeviceDetails(device.id, { hasSim: !device.hasSim });
                                    }
                                  }}
                                >
                                  {conn.icon}
                                  <span>{conn.name}</span>
                                </Button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 3: Software Licenses */}
        {currentStep === 'software' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Softvérové licencie</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Vyberte si licencie, ktoré chcete používať.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.licencie.map(license => {
                const isSelected = license.selected;
                
                return (
                  <Card 
                    key={license.id} 
                    className={cn(
                      "transition-all duration-200 overflow-hidden",
                      isSelected ? "border-emerald-500 dark:border-emerald-400" : "border-slate-200 dark:border-slate-700"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">{license.nazov}</h3>
                        <Switch
                          checked={isSelected}
                          onCheckedChange={(checked) => updateLicencia(license.id, checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 4: Payment Methods */}
        {currentStep === 'payment' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Platobné možnosti</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Vyberte si platobné možnosti, ktoré chcete prijímať.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {data.platobneMetody.map(method => (
                <Badge
                  key={method.id}
                  variant={method.selected ? "default" : "outline"}
                  className={cn(
                    "text-sm py-1.5 px-3 cursor-pointer",
                    method.selected ? "bg-emerald-500 hover:bg-emerald-600" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                  onClick={() => updatePlatobnaMetoda(method.id, !method.selected)}
                >
                  {method.nazov}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 5: Additional Services */}
        {currentStep === 'services' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Doplnkové služby</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Vyberte si doplnkové služby, ktoré potrebujete.
            </p>
            
            <div className="space-y-4">
              {data.doplnkoveSluzby.map(service => (
                <div key={service.id} className="flex items-center space-x-3 py-2">
                  <Checkbox 
                    id={service.id}
                    checked={service.selected}
                    onCheckedChange={(checked) => updateDoplnkovaSluzba(service.id, checked === true)}
                  />
                  <Label htmlFor={service.id}>{service.nazov}</Label>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Summary Section */}
      <div className="bg-emerald-50/80 dark:bg-emerald-900/20 backdrop-blur-sm rounded-xl border border-emerald-100 dark:border-emerald-800/30 p-6">
        <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-300 mb-4">Vybrané položky: {getSelectedItemsCount()}</h3>
        
        {data.zariadenia.filter(d => d.selected).length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-2">Zariadenia:</h4>
            <div className="space-y-1">
              {data.zariadenia.filter(d => d.selected).map(device => (
                <div key={device.id} className="text-sm text-slate-700 dark:text-slate-300">
                  {device.nazov} ({device.pocetKs}x) - {device.typNakupu}
                  {device.hasWifi && <span className="ml-1 text-blue-500"><Wifi className="inline h-3 w-3" /></span>}
                  {device.hasSim && <span className="ml-1 text-green-500"><Signal className="inline h-3 w-3" /></span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.licencie.filter(l => l.selected).length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-2">Licencie:</h4>
            <div className="space-y-1">
              {data.licencie.filter(l => l.selected).map(license => (
                <div key={license.id} className="text-sm text-slate-700 dark:text-slate-300">{license.nazov}</div>
              ))}
            </div>
          </div>
        )}

        {data.platobneMetody.filter(p => p.selected).length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-2">Platobné metódy:</h4>
            <div className="flex flex-wrap gap-1">
              {data.platobneMetody.filter(p => p.selected).map(payment => (
                <Badge key={payment.id} variant="outline" className="border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300">
                  {payment.nazov}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {data.doplnkoveSluzby.filter(s => s.selected).length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-2">Doplnkové služby:</h4>
            <div className="space-y-1">
              {data.doplnkoveSluzby.filter(s => s.selected).map(service => (
                <div key={service.id} className="text-sm text-slate-700 dark:text-slate-300">{service.nazov}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4 mt-4">
        <Button 
          variant="ghost" 
          onClick={goToPrevStep}
          className="flex items-center gap-2"
        >
          <ChevronDown className="h-4 w-4 rotate-90" />
          {currentStep === 'solution' ? 'Späť' : 'Predchádzajúci krok'}
        </Button>
        
        <Button 
          onClick={goToNextStep}
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
        >
          {currentStep === 'services' ? 'Dokončiť' : 'Ďalší krok'}
          <ChevronDown className="h-4 w-4 -rotate-90" />
        </Button>
      </div>
    </div>
  );
};
