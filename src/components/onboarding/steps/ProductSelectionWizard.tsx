
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { 
  ArrowRight, ArrowLeft, Calendar, Plus, Trash2, 
  Check, X, Info, Wifi, Smartphone, Ethernet, CreditCard,
  ShoppingBag, Globe, Phone, BatteryCharging, Settings
} from 'lucide-react';
import { Zariadenie } from '@/types/onboarding';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProductSelectionWizardProps {
  onNext: () => void;
  onBack: () => void;
}

// Extended device type with UI specific properties
type ExtendedDevice = Zariadenie & {
  hasWifi?: boolean;
  hasSim?: boolean;
  hasEthernet?: boolean;
}

// License type
type License = {
  id: string;
  name: string;
  selected: boolean;
  count: number;
  activationType: 'monthly' | 'yearly';
  commitment?: 12 | 24 | 36;
  assignedDevice?: string;
}

// Payment method type
type PaymentMethod = {
  id: string;
  name: string;
  selected: boolean;
  description?: string;
  tooltip?: string;
}

// Additional service type
type Service = {
  id: string;
  name: string;
  selected: boolean;
  date?: Date;
  people?: number;
}

// Solution type
type Solution = {
  id: string;
  name: string;
  selected: boolean;
  icon: React.ReactNode;
}

export const ProductSelectionWizard: React.FC<ProductSelectionWizardProps> = ({ onNext, onBack }) => {
  const { t } = useLanguage();
  const { data, updateZariadenie, updateLicencia, updatePlatobnaMetoda, updateDoplnkovaSluzba } = useOnboarding();
  
  const [activeTab, setActiveTab] = useState<string>('solutions');
  
  // Solutions state
  const [solutions, setSolutions] = useState<Solution[]>([
    { id: 'payment-terminal', name: 'Platobný terminál', selected: false, icon: <CreditCard className="h-8 w-8" /> },
    { id: 'pos-solution', name: 'Pokladničné riešenie', selected: false, icon: <ShoppingBag className="h-8 w-8" /> },
    { id: 'payment-gateway', name: 'Platobná brána', selected: false, icon: <Globe className="h-8 w-8" /> },
    { id: 'softpos', name: 'Terminál v mobile (SoftPOS)', selected: false, icon: <Phone className="h-8 w-8" /> },
    { id: 'charging-station', name: 'Nabíjacia stanica', selected: false, icon: <BatteryCharging className="h-8 w-8" /> }
  ]);
  
  // Devices state
  const [devices, setDevices] = useState<ExtendedDevice[]>([
    {
      id: 'a920-gprs',
      nazov: 'A920 GPRS',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasSim: true
    },
    {
      id: 'a920-wifi',
      nazov: 'A920 WIFI',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: true
    },
    {
      id: 'a80-eth',
      nazov: 'A80 ETH',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasEthernet: true
    },
    {
      id: 's800-eth',
      nazov: 'S800 ETH',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasEthernet: true
    },
    {
      id: 'q80-wifi-eth',
      nazov: 'Q80 (WIFI/ETH)',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: true,
      hasEthernet: true
    },
    {
      id: 'q80-eth',
      nazov: 'Q80 (ETH)',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasEthernet: true
    },
    {
      id: 'pax-a920',
      nazov: 'PAX A920',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: true,
      hasSim: true
    },
    {
      id: 'pax-a80',
      nazov: 'PAX A80',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasEthernet: true
    },
    {
      id: 'pax-a35',
      nazov: 'PAX A35',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasEthernet: true
    },
    {
      id: 'softpos',
      nazov: 'SOFTPOS',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne'
    },
    {
      id: 'pinpad',
      nazov: 'PINPAD',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasEthernet: true
    },
    {
      id: 'sim-card',
      nazov: 'SIM karta',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasSim: true
    }
  ]);
  
  // Licenses state
  const [licenses, setLicenses] = useState<License[]>([
    { id: 'smartpos-pro', name: 'SMARTPOS PRO', selected: false, count: 1, activationType: 'monthly' },
    { id: 'smartpos-lite', name: 'SMARTPOS LITE', selected: false, count: 1, activationType: 'monthly' },
    { id: 'smartpos-air', name: 'SMARTPOS AIR', selected: false, count: 1, activationType: 'monthly' },
    { id: 'easy-kasa', name: 'EASY KASA LICENCIA', selected: false, count: 1, activationType: 'monthly' },
    { id: '3k-pos', name: '3K POS LICENCIA', selected: false, count: 1, activationType: 'monthly' },
    { id: 'a920-vrp', name: 'A920 VRP LICENCIA', selected: false, count: 1, activationType: 'monthly' },
    { id: 'vrp-driver', name: 'VRP DRIVER', selected: false, count: 1, activationType: 'monthly' },
    { id: 'chdu', name: 'CHDÚ', selected: false, count: 1, activationType: 'monthly' },
    { id: 'other-software', name: 'Iný softvér', selected: false, count: 1, activationType: 'monthly' }
  ]);
  
  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 'gp-webpay', name: 'GP WebPay', selected: false, tooltip: 'Platobná brána pre online platby' },
    { id: 'besteron', name: 'Besteron', selected: false, tooltip: 'Platobná brána pre online platby' },
    { id: 'other-gateway', name: 'Iná brána', selected: false },
    { id: 'push-payments', name: 'Push Payments', selected: false, tooltip: 'Vyžiadanie platby od zákazníka' },
    { id: 'recurring-payments', name: 'Opakované platby', selected: false, tooltip: 'Pravidelné platby bez interakcie zákazníka' },
    { id: 'stored-card', name: 'Uložená karta', selected: false, tooltip: 'Uloženie karty pre neskoršie platby' },
    { id: 'card-verification', name: 'Overenie karty', selected: false, tooltip: 'Overenie platnosti platobnej karty' },
    { id: 'apple-pay', name: 'Apple Pay', selected: false },
    { id: 'google-pay', name: 'Google Pay', selected: false },
    { id: 'fast-pay', name: 'FastPay', selected: false },
    { id: 'bank-buttons', name: 'Bankové tlačidlá', selected: false, tooltip: 'Presmerovanie na online banking' },
    { id: 'moto-payments', name: 'MO/TO platby', selected: false, tooltip: 'Mail Order/Telephone Order platby' },
    { id: 'pos-terminal', name: 'POS terminál', selected: false },
    { id: 'e-commerce', name: 'E-commerce', selected: false }
  ]);
  
  // Services state
  const [services, setServices] = useState<Service[]>([
    { id: 'device-installation', name: 'Inštalácia zariadenia', selected: false },
    { id: 'express-installation', name: 'Expresná inštalácia do 48h', selected: false },
    { id: 'branch-training', name: 'Zaškolenie na prevádzke', selected: false, people: 1 },
    { id: 'plu-programming', name: 'Programovanie PLU', selected: false },
    { id: 'external-software-connection', name: 'Prepojenie na externý softvér', selected: false },
    { id: '24-7-support', name: '24/7 technická podpora', selected: false },
    { id: 'deinstallation', name: 'Deinštalácia', selected: false }
  ]);
  
  // Handle solution selection
  const handleSolutionSelect = (solutionId: string) => {
    setSolutions(prev => prev.map(solution => 
      solution.id === solutionId ? { ...solution, selected: !solution.selected } : solution
    ));
  };
  
  // Device handlers
  const handleDeviceSelect = (deviceId: string) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, selected: !device.selected } : device
    ));
  };
  
  const handleDeviceQtyChange = (deviceId: string, qty: number) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, pocetKs: qty } : device
    ));
  };
  
  const handleDevicePurchaseTypeChange = (deviceId: string, type: 'Prenájom' | 'Kúpa') => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, typNakupu: type } : device
    ));
  };
  
  const handleDeviceCommitmentChange = (deviceId: string, months: 12 | 24 | 36) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, viazanost: months } : device
    ));
  };
  
  const handleDevicePaymentFrequencyChange = (deviceId: string, frequency: 'mesačne' | 'ročne' | 'sezónne' | 'z obratu') => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, frekvenciaPlatby: frequency } : device
    ));
  };
  
  const handleConnectivityChange = (deviceId: string, type: 'wifi' | 'sim' | 'ethernet', value: boolean) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { 
        ...device, 
        hasWifi: type === 'wifi' ? value : device.hasWifi,
        hasSim: type === 'sim' ? value : device.hasSim,
        hasEthernet: type === 'ethernet' ? value : device.hasEthernet
      } : device
    ));
  };
  
  // License handlers
  const handleLicenseSelect = (licenseId: string) => {
    setLicenses(prev => prev.map(license => 
      license.id === licenseId ? { ...license, selected: !license.selected } : license
    ));
  };
  
  const handleLicenseCountChange = (licenseId: string, count: number) => {
    setLicenses(prev => prev.map(license => 
      license.id === licenseId ? { ...license, count } : license
    ));
  };
  
  const handleLicenseActivationTypeChange = (licenseId: string, type: 'monthly' | 'yearly') => {
    setLicenses(prev => prev.map(license => 
      license.id === licenseId ? { ...license, activationType: type } : license
    ));
  };
  
  const handleLicenseCommitmentChange = (licenseId: string, months: 12 | 24 | 36) => {
    setLicenses(prev => prev.map(license => 
      license.id === licenseId ? { ...license, commitment: months } : license
    ));
  };
  
  const handleLicenseDeviceAssignment = (licenseId: string, deviceId: string) => {
    setLicenses(prev => prev.map(license => 
      license.id === licenseId ? { ...license, assignedDevice: deviceId } : license
    ));
  };
  
  // Payment method handler
  const handlePaymentMethodSelect = (methodId: string) => {
    setPaymentMethods(prev => prev.map(method => 
      method.id === methodId ? { ...method, selected: !method.selected } : method
    ));
  };
  
  // Service handlers
  const handleServiceSelect = (serviceId: string) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, selected: !service.selected } : service
    ));
  };
  
  const handleServiceDateChange = (serviceId: string, date: Date) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, date } : service
    ));
  };
  
  const handleServicePeopleChange = (serviceId: string, people: number) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, people } : service
    ));
  };
  
  // Handle continue to next step
  const handleContinue = () => {
    // Save selected devices to onboarding context
    devices.forEach(device => {
      if (device.selected) {
        updateZariadenie(device.id, {
          selected: device.selected,
          pocetKs: device.pocetKs,
          typNakupu: device.typNakupu,
          viazanost: device.viazanost,
          frekvenciaPlatby: device.frekvenciaPlatby,
          hasWifi: device.hasWifi,
          hasSim: device.hasSim,
          hasEthernet: device.hasEthernet
        } as any);
      }
    });
    
    // Save licenses, payment methods, and services to context
    // TODO: Update these methods in OnboardingContext
    
    onNext();
  };
  
  // Filter devices based on selected solutions
  const getFilteredDevices = () => {
    const selectedSolutionIds = solutions
      .filter(s => s.selected)
      .map(s => s.id);
    
    if (selectedSolutionIds.length === 0) {
      return devices;
    }
    
    return devices.filter(device => {
      // Show softpos only for softpos solution
      if (device.id.includes('softpos')) {
        return selectedSolutionIds.includes('softpos');
      }
      
      // Show card terminals for payment terminal solution
      if (selectedSolutionIds.includes('payment-terminal')) {
        return !device.id.includes('softpos');
      }
      
      return true;
    });
  };
  
  // Get the count of selected items
  const getSelectedCount = () => {
    const deviceCount = devices.filter(d => d.selected).length;
    const licenseCount = licenses.filter(l => l.selected).length;
    const paymentMethodCount = paymentMethods.filter(p => p.selected).length;
    const serviceCount = services.filter(s => s.selected).length;
    
    return deviceCount + licenseCount + paymentMethodCount + serviceCount;
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-8 text-center">Výber produktov a služieb</h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8 bg-slate-100 dark:bg-slate-800 p-1">
              <TabsTrigger value="solutions" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 dark:data-[state=active]:bg-emerald-900 dark:data-[state=active]:text-emerald-200">
                1. Výber riešenia
              </TabsTrigger>
              <TabsTrigger value="devices" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 dark:data-[state=active]:bg-emerald-900 dark:data-[state=active]:text-emerald-200">
                2. Zariadenia
              </TabsTrigger>
              <TabsTrigger value="licenses" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 dark:data-[state=active]:bg-emerald-900 dark:data-[state=active]:text-emerald-200">
                3. Licencie
              </TabsTrigger>
              <TabsTrigger value="payment-methods" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 dark:data-[state=active]:bg-emerald-900 dark:data-[state=active]:text-emerald-200">
                4. Platobné možnosti
              </TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800 dark:data-[state=active]:bg-emerald-900 dark:data-[state=active]:text-emerald-200">
                5. Doplnkové služby
              </TabsTrigger>
            </TabsList>
            
            {/* Step 1: Solutions Selection */}
            <TabsContent value="solutions" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutions.map(solution => (
                  <div
                    key={solution.id}
                    onClick={() => handleSolutionSelect(solution.id)}
                    className={cn(
                      "p-6 border rounded-xl cursor-pointer transition-all hover:shadow-md flex flex-col items-center text-center gap-4",
                      solution.selected
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <div className={cn(
                      "p-4 rounded-full",
                      solution.selected 
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400" 
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    )}>
                      {solution.icon}
                    </div>
                    <div className="font-medium text-lg">{solution.name}</div>
                    {solution.selected && (
                      <Badge className="bg-emerald-500 hover:bg-emerald-600">Vybrané</Badge>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <Button onClick={onBack} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Späť
                </Button>
                <Button 
                  onClick={() => setActiveTab('devices')}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                >
                  Ďalej
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            {/* Step 2: Devices Selection */}
            <TabsContent value="devices" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {getFilteredDevices().map(device => (
                  <div
                    key={device.id}
                    className={cn(
                      "relative border rounded-xl p-4 transition-all",
                      device.selected
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{device.nazov}</h3>
                      <Switch 
                        checked={device.selected} 
                        onCheckedChange={() => handleDeviceSelect(device.id)}
                      />
                    </div>
                    
                    <div className="flex mt-2 gap-1">
                      {device.hasWifi && (
                        <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800">
                          <Wifi className="h-3 w-3 mr-1" />
                          WiFi
                        </Badge>
                      )}
                      {device.hasSim && (
                        <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800">
                          <Smartphone className="h-3 w-3 mr-1" />
                          SIM
                        </Badge>
                      )}
                      {device.hasEthernet && (
                        <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800">
                          <Ethernet className="h-3 w-3 mr-1" />
                          ETH
                        </Badge>
                      )}
                    </div>
                    
                    {device.selected && (
                      <div className="space-y-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div>
                          <Label htmlFor={`device-${device.id}-qty`} className="text-sm">Počet kusov</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              disabled={device.pocetKs <= 1}
                              onClick={() => handleDeviceQtyChange(device.id, Math.max(1, device.pocetKs - 1))}
                            >-</Button>
                            <Input 
                              id={`device-${device.id}-qty`}
                              type="number"
                              value={device.pocetKs}
                              onChange={(e) => handleDeviceQtyChange(device.id, parseInt(e.target.value) || 1)}
                              min={1}
                              className="w-16 text-center"
                            />
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleDeviceQtyChange(device.id, device.pocetKs + 1)}
                            >+</Button>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm">Typ nákupu</Label>
                          <RadioGroup 
                            value={device.typNakupu}
                            onValueChange={(value) => handleDevicePurchaseTypeChange(
                              device.id, 
                              value as 'Prenájom' | 'Kúpa'
                            )}
                            className="flex gap-4 mt-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Prenájom" id={`device-${device.id}-rent`} />
                              <Label htmlFor={`device-${device.id}-rent`} className="text-sm">Prenájom</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Kúpa" id={`device-${device.id}-buy`} />
                              <Label htmlFor={`device-${device.id}-buy`} className="text-sm">Kúpa</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {device.typNakupu === 'Prenájom' && (
                          <>
                            <div>
                              <Label className="text-sm">Viazanosť</Label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {[12, 24, 36].map((months) => (
                                  <Button
                                    key={months}
                                    type="button"
                                    size="sm"
                                    variant={device.viazanost === months ? "default" : "outline"}
                                    className={device.viazanost === months ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                                    onClick={() => handleDeviceCommitmentChange(
                                      device.id, 
                                      months as 12 | 24 | 36
                                    )}
                                  >
                                    {months} mesiacov
                                  </Button>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <Label className="text-sm">Frekvencia platby</Label>
                              <Select 
                                value={device.frekvenciaPlatby}
                                onValueChange={(value) => handleDevicePaymentFrequencyChange(
                                  device.id,
                                  value as any
                                )}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mesačne">Mesačne</SelectItem>
                                  <SelectItem value="štvrťročne">Štvrťročne</SelectItem>
                                  <SelectItem value="ročne">Ročne</SelectItem>
                                  <SelectItem value="z obratu">Z obratu</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                        
                        <div>
                          <Label className="text-sm">Typ pripojenia</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`device-${device.id}-wifi`}
                                checked={device.hasWifi || false}
                                onCheckedChange={(checked) => 
                                  handleConnectivityChange(device.id, 'wifi', checked)
                                }
                              />
                              <Label htmlFor={`device-${device.id}-wifi`} className="text-sm">WiFi</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`device-${device.id}-sim`}
                                checked={device.hasSim || false}
                                onCheckedChange={(checked) => 
                                  handleConnectivityChange(device.id, 'sim', checked)
                                }
                              />
                              <Label htmlFor={`device-${device.id}-sim`} className="text-sm">SIM karta</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={`device-${device.id}-eth`}
                                checked={device.hasEthernet || false}
                                onCheckedChange={(checked) => 
                                  handleConnectivityChange(device.id, 'ethernet', checked)
                                }
                              />
                              <Label htmlFor={`device-${device.id}-eth`} className="text-sm">Ethernet</Label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            size="sm"
                            onClick={() => handleDeviceSelect(device.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Odstrániť
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <Button onClick={() => setActiveTab('solutions')} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Späť
                </Button>
                <Button 
                  onClick={() => setActiveTab('licenses')}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                >
                  Ďalej
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            {/* Step 3: Licenses */}
            <TabsContent value="licenses" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {licenses.map(license => (
                  <div
                    key={license.id}
                    className={cn(
                      "p-4 border rounded-xl transition-all",
                      license.selected
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => handleLicenseSelect(license.id)}
                      >
                        <Switch checked={license.selected} />
                        <span className="font-medium">{license.name}</span>
                      </div>
                      
                      {license.selected && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-slate-500"
                          onClick={() => handleLicenseSelect(license.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {license.selected && (
                      <div className="space-y-3 mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                        <div>
                          <Label className="mb-1 block text-sm">Počet licencií</Label>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              disabled={license.count <= 1}
                              onClick={() => handleLicenseCountChange(license.id, Math.max(1, license.count - 1))}
                            >-</Button>
                            <Input 
                              type="number" 
                              min={1}
                              value={license.count}
                              onChange={(e) => handleLicenseCountChange(license.id, parseInt(e.target.value) || 1)}
                              className="w-16 text-center"
                            />
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleLicenseCountChange(license.id, license.count + 1)}
                            >+</Button>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="mb-1 block text-sm">Typ aktivácie</Label>
                          <div className="flex gap-3 mt-1">
                            <Button
                              type="button"
                              variant={license.activationType === 'monthly' ? 'default' : 'outline'}
                              size="sm"
                              className={license.activationType === 'monthly' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                              onClick={() => handleLicenseActivationTypeChange(license.id, 'monthly')}
                            >
                              Mesačne
                            </Button>
                            <Button
                              type="button"
                              variant={license.activationType === 'yearly' ? 'default' : 'outline'}
                              size="sm"
                              className={license.activationType === 'yearly' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                              onClick={() => handleLicenseActivationTypeChange(license.id, 'yearly')}
                            >
                              Ročne
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="mb-1 block text-sm">Viazanosť</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {[12, 24, 36].map((months) => (
                              <Button
                                key={months}
                                type="button"
                                variant={license.commitment === months ? "default" : "outline"}
                                size="sm"
                                className={license.commitment === months ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                                onClick={() => handleLicenseCommitmentChange(license.id, months as 12 | 24 | 36)}
                              >
                                {months} mesiacov
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Label className="mb-1 block text-sm">Priradiť k zariadeniu</Label>
                          <Select
                            value={license.assignedDevice || ''}
                            onValueChange={(value) => handleLicenseDeviceAssignment(license.id, value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Vyberte zariadenie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Žiadne zariadenie</SelectItem>
                              {devices.filter(d => d.selected).map(device => (
                                <SelectItem key={device.id} value={device.id}>
                                  {device.nazov} (x{device.pocetKs})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <Button onClick={() => setActiveTab('devices')} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Späť
                </Button>
                <Button 
                  onClick={() => setActiveTab('payment-methods')}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                >
                  Ďalej
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            {/* Step 4: Payment Methods */}
            <TabsContent value="payment-methods" className="space-y-6">
              <TooltipProvider delayDuration={300}>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Platobné brány pre e-shop</h3>
                    <div className="flex flex-wrap gap-3">
                      {paymentMethods
                        .filter(method => ['gp-webpay', 'besteron', 'other-gateway'].includes(method.id))
                        .map(method => (
                          <Tooltip key={method.id}>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() => handlePaymentMethodSelect(method.id)}
                                className={cn(
                                  "px-4 py-2 rounded-full border cursor-pointer transition-all",
                                  method.selected
                                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                )}
                              >
                                {method.name}
                                {method.selected && (
                                  <Check className="inline-block ml-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                )}
                              </div>
                            </TooltipTrigger>
                            {method.tooltip && (
                              <TooltipContent>
                                <p>{method.tooltip}</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Typy platieb</h3>
                    <div className="flex flex-wrap gap-3">
                      {paymentMethods
                        .filter(method => ['push-payments', 'recurring-payments', 'stored-card', 'card-verification', 'moto-payments'].includes(method.id))
                        .map(method => (
                          <Tooltip key={method.id}>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() => handlePaymentMethodSelect(method.id)}
                                className={cn(
                                  "px-4 py-2 rounded-full border cursor-pointer transition-all",
                                  method.selected
                                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                )}
                              >
                                {method.name}
                                {method.selected && (
                                  <Check className="inline-block ml-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                )}
                              </div>
                            </TooltipTrigger>
                            {method.tooltip && (
                              <TooltipContent>
                                <p>{method.tooltip}</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Alternatívne platobné metódy</h3>
                    <div className="flex flex-wrap gap-3">
                      {paymentMethods
                        .filter(method => ['apple-pay', 'google-pay', 'fast-pay', 'bank-buttons'].includes(method.id))
                        .map(method => (
                          <Tooltip key={method.id}>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() => handlePaymentMethodSelect(method.id)}
                                className={cn(
                                  "px-4 py-2 rounded-full border cursor-pointer transition-all",
                                  method.selected
                                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                )}
                              >
                                {method.name}
                                {method.selected && (
                                  <Check className="inline-block ml-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                )}
                              </div>
                            </TooltipTrigger>
                            {method.tooltip && (
                              <TooltipContent>
                                <p>{method.tooltip}</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Ďalšie riešenia</h3>
                    <div className="flex flex-wrap gap-3">
                      {paymentMethods
                        .filter(method => ['pos-terminal', 'e-commerce'].includes(method.id))
                        .map(method => (
                          <Tooltip key={method.id}>
                            <TooltipTrigger asChild>
                              <div
                                onClick={() => handlePaymentMethodSelect(method.id)}
                                className={cn(
                                  "px-4 py-2 rounded-full border cursor-pointer transition-all",
                                  method.selected
                                    ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                )}
                              >
                                {method.name}
                                {method.selected && (
                                  <Check className="inline-block ml-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                )}
                              </div>
                            </TooltipTrigger>
                            {method.tooltip && (
                              <TooltipContent>
                                <p>{method.tooltip}</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        ))}
                    </div>
                  </div>
                </div>
              </TooltipProvider>
              
              <div className="flex justify-between mt-8">
                <Button onClick={() => setActiveTab('licenses')} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Späť
                </Button>
                <Button 
                  onClick={() => setActiveTab('services')}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                >
                  Ďalej
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            {/* Step 5: Additional Services */}
            <TabsContent value="services" className="space-y-6">
              <div className="space-y-4">
                {services.map(service => (
                  <div
                    key={service.id}
                    className={cn(
                      "p-4 border rounded-lg transition-all",
                      service.selected
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-slate-200 dark:border-slate-700"
                    )}
                  >
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Switch checked={service.selected} />
                        <span className="font-medium">{service.name}</span>
                      </div>
                      
                      {service.selected && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-slate-500"
                          onClick={() => handleServiceSelect(service.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    {service.selected && (service.id === 'branch-training' || service.id === 'device-installation' || service.id === 'express-installation') && (
                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-4">
                        {(service.id === 'branch-training') && (
                          <div>
                            <Label className="mb-1 block text-sm">Počet osôb</Label>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                disabled={(service.people || 1) <= 1}
                                onClick={() => handleServicePeopleChange(service.id, Math.max(1, (service.people || 1) - 1))}
                              >-</Button>
                              <Input 
                                type="number" 
                                min={1}
                                value={service.people || 1}
                                onChange={(e) => handleServicePeopleChange(service.id, parseInt(e.target.value) || 1)}
                                className="w-16 text-center"
                              />
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleServicePeopleChange(service.id, (service.people || 1) + 1)}
                              >+</Button>
                            </div>
                          </div>
                        )}
                        
                        {(service.id === 'branch-training' || service.id === 'device-installation' || service.id === 'express-installation') && (
                          <div>
                            <Label className="mb-1 block text-sm">Preferovaný dátum</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !service.date && "text-muted-foreground"
                                  )}
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {service.date ? format(service.date, "PPP") : <span>Vyberte dátum</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                  mode="single"
                                  selected={service.date}
                                  onSelect={(date) => date && handleServiceDateChange(service.id, date)}
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <Button onClick={() => setActiveTab('payment-methods')} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Späť
                </Button>
                <Button 
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                >
                  Dokončiť
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Summary section */}
      <Card className="border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">
              Vybrané položky 
              <Badge variant="outline" className="ml-2">{getSelectedCount()}</Badge>
            </h3>
          </div>
          
          <div className="space-y-4">
            {/* Selected devices */}
            {devices.some(d => d.selected) && (
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-2">Zariadenia</h4>
                <div className="flex flex-wrap gap-2">
                  {devices.filter(d => d.selected).map(device => (
                    <Badge key={device.id} variant="secondary" className="flex items-center gap-1 py-1.5">
                      <span className="font-medium">{device.nazov}</span>
                      <span className="text-xs opacity-70">({device.pocetKs}x)</span>
                      <button 
                        className="ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        onClick={() => handleDeviceSelect(device.id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Selected licenses */}
            {licenses.some(l => l.selected) && (
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-2">Licencie</h4>
                <div className="flex flex-wrap gap-2">
                  {licenses.filter(l => l.selected).map(license => (
                    <Badge key={license.id} variant="secondary" className="flex items-center gap-1 py-1.5">
                      <span className="font-medium">{license.name}</span>
                      <span className="text-xs opacity-70">({license.count}x)</span>
                      <button 
                        className="ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        onClick={() => handleLicenseSelect(license.id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Selected payment methods */}
            {paymentMethods.some(p => p.selected) && (
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-2">Platobné možnosti</h4>
                <div className="flex flex-wrap gap-2">
                  {paymentMethods.filter(p => p.selected).map(method => (
                    <Badge key={method.id} variant="secondary" className="flex items-center gap-1 py-1.5">
                      <span className="font-medium">{method.name}</span>
                      <button 
                        className="ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        onClick={() => handlePaymentMethodSelect(method.id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Selected services */}
            {services.some(s => s.selected) && (
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-2">Doplnkové služby</h4>
                <div className="flex flex-wrap gap-2">
                  {services.filter(s => s.selected).map(service => (
                    <Badge key={service.id} variant="secondary" className="flex items-center gap-1 py-1.5">
                      <span className="font-medium">{service.name}</span>
                      <button 
                        className="ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                        onClick={() => handleServiceSelect(service.id)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {getSelectedCount() === 0 && (
              <div className="text-center py-6 text-slate-500">
                Zatiaľ nemáte vybrané žiadne položky.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
