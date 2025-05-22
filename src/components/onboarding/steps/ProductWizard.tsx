import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DeviceCard } from './DeviceCard';
import { SolutionSelection } from './SolutionSelection';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ArrowRight, ArrowLeft, Calendar, Plus, Trash2, Check, X, Info } from 'lucide-react';
import { Zariadenie } from '@/types/onboarding';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface ProductWizardProps {
  onNext: () => void;
  onBack: () => void;
}

// Extended device type with UI specific properties
type ExtendedDevice = Zariadenie & {
  hasWifi: boolean;
  hasSim: boolean;
  hasEthernet: boolean;
  imageUrl?: string;
  hasDiscount?: boolean;
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
}

// Additional service type
type Service = {
  id: string;
  name: string;
  selected: boolean;
  date?: Date;
  people?: number;
}

export const ProductWizard: React.FC<ProductWizardProps> = ({ onNext, onBack }) => {
  const { t } = useLanguage();
  const { data, updateZariadenie, updateLicencia, updatePlatobnaMetoda, updateDoplnkovaSluzba } = useOnboarding();
  
  const [activeTab, setActiveTab] = useState<string>('solutions');
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  
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
      hasWifi: false,
      hasSim: true,
      hasEthernet: false,
      imageUrl: 'https://www.mobilnaterminaly.sk/wp-content/uploads/2021/05/a920-3-uhl-1.jpg',
      hasDiscount: true
    },
    {
      id: 'a920-wifi',
      nazov: 'A920 WIFI',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: true,
      hasSim: false,
      hasEthernet: false,
      imageUrl: 'https://www.mobilnaterminaly.sk/wp-content/uploads/2021/05/a920-3-uhl-1.jpg',
      hasDiscount: false
    },
    {
      id: 'a80-eth',
      nazov: 'A80 ETH',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: false,
      hasSim: false,
      hasEthernet: true,
      imageUrl: 'https://b2bchannels.co.uk/wp-content/uploads/2021/03/PAXA80.jpg',
      hasDiscount: false
    },
    {
      id: 's800-eth',
      nazov: 'S800 ETH',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: false,
      hasSim: false,
      hasEthernet: true,
      imageUrl: 'https://www.mobilnaterminaly.sk/wp-content/uploads/2022/01/s800-1.png',
      hasDiscount: false
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
      hasSim: false,
      hasEthernet: true,
      imageUrl: 'https://placehold.co/600x400?text=Q80+Terminal',
      hasDiscount: false
    },
    {
      id: 'q80-eth',
      nazov: 'Q80 (ETH)',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: false,
      hasSim: false,
      hasEthernet: true,
      imageUrl: 'https://placehold.co/600x400?text=Q80+Terminal',
      hasDiscount: false
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
      hasSim: true,
      hasEthernet: false,
      imageUrl: 'https://www.mobilnaterminaly.sk/wp-content/uploads/2021/05/a920-3-uhl-1.jpg',
      hasDiscount: false
    },
    {
      id: 'pax-a80',
      nazov: 'PAX A80',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: false,
      hasSim: false,
      hasEthernet: true,
      imageUrl: 'https://b2bchannels.co.uk/wp-content/uploads/2021/03/PAXA80.jpg',
      hasDiscount: false
    },
    {
      id: 'pax-a35',
      nazov: 'PAX A35',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: false,
      hasSim: false,
      hasEthernet: true,
      imageUrl: 'https://placehold.co/600x400?text=PAX+A35',
      hasDiscount: false
    },
    {
      id: 'softpos',
      nazov: 'SOFTPOS',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: false,
      hasSim: false,
      hasEthernet: false,
      imageUrl: 'https://placehold.co/600x400?text=SOFTPOS',
      hasDiscount: false
    },
    {
      id: 'pinpad',
      nazov: 'PINPAD',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: false,
      hasSim: false,
      hasEthernet: true,
      imageUrl: 'https://placehold.co/600x400?text=PINPAD',
      hasDiscount: false
    },
    {
      id: 'sim-card',
      nazov: 'SIM karta',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: false,
      hasSim: true,
      hasEthernet: false,
      imageUrl: 'https://placehold.co/600x400?text=SIM+karta',
      hasDiscount: false
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
    { id: 'gp-webpay', name: 'GP WebPay', selected: false },
    { id: 'besteron', name: 'Besteron', selected: false },
    { id: 'other-gateway', name: 'Iná brána', selected: false },
    { id: 'push-payments', name: 'Push Payments', selected: false },
    { id: 'recurring-payments', name: 'Opakované platby', selected: false },
    { id: 'stored-card', name: 'Uložená karta', selected: false },
    { id: 'card-verification', name: 'Overenie karty', selected: false },
    { id: 'apple-pay', name: 'Apple Pay', selected: false },
    { id: 'google-pay', name: 'Google Pay', selected: false },
    { id: 'fast-pay', name: 'FastPay', selected: false },
    { id: 'bank-buttons', name: 'Bankové tlačidlá', selected: false },
    { id: 'moto-payments', name: 'MO/TO platby', selected: false },
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
  
  // Solution options
  const solutionOptions = [
    { id: 'payment-terminal', name: 'Platobný terminál', icon: '💳' },
    { id: 'pos-solution', name: 'Pokladničné riešenie', icon: '🧾' },
    { id: 'payment-gateway', name: 'Platobná brána', icon: '🌐' },
    { id: 'softpos', name: 'Terminál v mobile (SoftPOS)', icon: '📱' },
    { id: 'charging-station', name: 'Nabíjacia stanica', icon: '🔌' }
  ];
  
  const handleSolutionSelect = (solutionId: string) => {
    setSelectedSolutions(prev => {
      if (prev.includes(solutionId)) {
        return prev.filter(id => id !== solutionId);
      } else {
        return [...prev, solutionId];
      }
    });
  };
  
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
  
  const handlePaymentMethodSelect = (methodId: string) => {
    setPaymentMethods(prev => prev.map(method => 
      method.id === methodId ? { ...method, selected: !method.selected } : method
    ));
  };
  
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
          // Pass connectivity options
          hasWifi: device.hasWifi,
          hasSim: device.hasSim,
          hasEthernet: device.hasEthernet
        } as any);
      }
    });
    
    onNext();
  };
  
  // Filter devices based on selected solutions
  const filteredDevices = selectedSolutions.length === 0 
    ? devices 
    : devices.filter(device => {
        if (selectedSolutions.includes('payment-terminal')) {
          return !device.id.includes('softpos');
        }
        if (selectedSolutions.includes('softpos')) {
          return device.id.includes('softpos');
        }
        return true;
      });
  
  const getSelectedCount = () => {
    const deviceCount = devices.filter(d => d.selected).length;
    const licenseCount = licenses.filter(l => l.selected).length;
    const paymentMethodCount = paymentMethods.filter(p => p.selected).length;
    const serviceCount = services.filter(s => s.selected).length;
    
    return deviceCount + licenseCount + paymentMethodCount + serviceCount;
  };
  
  // The modified function to properly convert types before passing to handlers
  const onQtyChange = (id: string, qtyStr: string) => {
    const qty = parseInt(qtyStr);
    if (!isNaN(qty) && qty > 0) {
      handleDeviceQtyChange(id, qty);
    }
  };

  const onPurchaseTypeChange = (id: string, typeStr: string) => {
    // Ensure the type is one of the allowed values
    const type = typeStr as 'Prenájom' | 'Kúpa';
    if (type === 'Prenájom' || type === 'Kúpa') {
      handleDevicePurchaseTypeChange(id, type);
    }
  };

  const onCommitmentChange = (id: string, monthsStr: string) => {
    // Convert string to number and ensure it's one of the allowed values
    const months = parseInt(monthsStr);
    if (months === 12 || months === 24 || months === 36) {
      handleDeviceCommitmentChange(id, months as 12 | 24 | 36);
    }
  };

  const onPaymentFrequencyChange = (id: string, frequencyStr: string) => {
    // Ensure the frequency is one of the allowed values
    const frequency = frequencyStr as 'mesačne' | 'ročne' | 'sezónne' | 'z obratu';
    if (['mesačne', 'ročne', 'sezónne', 'z obratu'].includes(frequency)) {
      handleDevicePaymentFrequencyChange(id, frequency);
    }
  };

  const onConnectivityChange = (id: string, typeStr: string, value: boolean) => {
    // Ensure the type is one of the allowed values
    const type = typeStr as 'wifi' | 'sim' | 'ethernet';
    if (['wifi', 'sim', 'ethernet'].includes(type)) {
      handleConnectivityChange(id, type, value);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
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
        
        <TabsContent value="solutions" className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Výber riešenia</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {solutionOptions.map(solution => (
                  <div
                    key={solution.id}
                    onClick={() => handleSolutionSelect(solution.id)}
                    className={cn(
                      "p-6 border rounded-xl cursor-pointer transition-all hover:shadow-md flex flex-col items-center text-center gap-4",
                      selectedSolutions.includes(solution.id)
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <div className="text-4xl">{solution.icon}</div>
                    <div className="font-medium">{solution.name}</div>
                    {selectedSolutions.includes(solution.id) && (
                      <Badge className="bg-emerald-500">Vybrané</Badge>
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="devices" className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Výber zariadení</h3>
              
              <div className="space-y-4">
                {filteredDevices.map(device => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    onSelect={() => handleDeviceSelect(device.id)}
                    onQtyChange={(qty) => onQtyChange(device.id, qty.toString())}
                    onPurchaseTypeChange={(type) => onPurchaseTypeChange(device.id, type)}
                    onCommitmentChange={(months) => onCommitmentChange(device.id, months.toString())}
                    onPaymentFrequencyChange={(freq) => onPaymentFrequencyChange(device.id, freq)}
                    onConnectivityChange={(type, value) => onConnectivityChange(device.id, type, value)}
                  />
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="licenses" className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Softvérové licencie</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {licenses.map(license => (
                  <div
                    key={license.id}
                    className={cn(
                      "p-4 border rounded-xl transition-all hover:shadow-md",
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
                          <Label className="mb-1 block">Počet licencií</Label>
                          <Input 
                            type="number" 
                            min={1}
                            value={license.count}
                            onChange={(e) => handleLicenseCountChange(license.id, parseInt(e.target.value) || 1)}
                          />
                        </div>
                        
                        <div>
                          <Label className="mb-1 block">Typ aktivácie</Label>
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
                          <Label className="mb-1 block">Viazanosť</Label>
                          <div className="flex gap-3 mt-1">
                            <Button
                              type="button"
                              variant={license.commitment === 12 ? 'default' : 'outline'}
                              size="sm"
                              className={license.commitment === 12 ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                              onClick={() => handleLicenseCommitmentChange(license.id, 12)}
                            >
                              12 mesiacov
                            </Button>
                            <Button
                              type="button"
                              variant={license.commitment === 24 ? 'default' : 'outline'}
                              size="sm"
                              className={license.commitment === 24 ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                              onClick={() => handleLicenseCommitmentChange(license.id, 24)}
                            >
                              24 mesiacov
                            </Button>
                            <Button
                              type="button"
                              variant={license.commitment === 36 ? 'default' : 'outline'}
                              size="sm"
                              className={license.commitment === 36 ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                              onClick={() => handleLicenseCommitmentChange(license.id, 36)}
                            >
                              36 mesiacov
                            </Button>
                          </div>
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment-methods" className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Platobné možnosti</h3>
              
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
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
                ))}
              </div>
              
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Doplnkové služby</h3>
              
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
                            <Label className="mb-1 block">Počet osôb</Label>
                            <Input 
                              type="number" 
                              min={1}
                              value={service.people || 1}
                              onChange={(e) => handleServicePeopleChange(service.id, parseInt(e.target.value) || 1)}
                              className="max-w-[120px]"
                            />
                          </div>
                        )}
                        
                        {(service.id === 'branch-training' || service.id === 'device-installation' || service.id === 'express-installation') && (
                          <div>
                            <Label className="mb-1 block">Preferovaný dátum</Label>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Summary section */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Vybrané položky <Badge variant="outline" className="ml-2">{getSelectedCount()}</Badge></h3>
            <Button variant="ghost" size="sm" className="text-slate-500">
              <Info className="h-4 w-4 mr-1" />
              Detail
            </Button>
          </div>
          
          <div className="space-y-4">
            {/* Selected devices */}
            {devices.some(d => d.selected) && (
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-2">Zariadenia</h4>
                <div className="flex flex-wrap gap-2">
                  {devices.filter(d => d.selected).map(device => (
                    <Badge key={device.id} variant="secondary" className="flex items-center gap-1">
                      {device.nazov} ({device.pocetKs}x)
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
                    <Badge key={license.id} variant="secondary" className="flex items-center gap-1">
                      {license.name} ({license.count}x)
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
                    <Badge key={method.id} variant="secondary" className="flex items-center gap-1">
                      {method.name}
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
                    <Badge key={service.id} variant="secondary" className="flex items-center gap-1">
                      {service.name}
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
