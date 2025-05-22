
import React, { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SolutionSelection } from './SolutionSelection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const StepProducts: React.FC = () => {
  const { data, updateZariadenie, updateLicencia, updatePlatobnaMetoda, updateDoplnkovaSluzba } = useOnboarding();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('solutions');
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);

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
    const device = data.zariadenia.find(z => z.id === deviceId);
    if (device) {
      updateZariadenie(deviceId, { selected: !device.selected });
    }
  };

  const handleDeviceQtyChange = (deviceId: string, qty: number) => {
    updateZariadenie(deviceId, { pocetKs: qty });
  };

  const handleDevicePurchaseTypeChange = (deviceId: string, type: 'Prenájom' | 'Kúpa') => {
    updateZariadenie(deviceId, { typNakupu: type });
  };

  const handleDeviceCommitmentChange = (deviceId: string, months: 12 | 24 | 36) => {
    updateZariadenie(deviceId, { viazanost: months });
  };

  const handleDevicePaymentFrequencyChange = (deviceId: string, frequency: 'mesačne' | 'ročne' | 'sezónne' | 'z obratu') => {
    updateZariadenie(deviceId, { frekvenciaPlatby: frequency });
  };

  const handleLicenceSelect = (licenceId: string) => {
    const licence = data.licencie.find(l => l.id === licenceId);
    if (licence) {
      updateLicencia(licenceId, !licence.selected);
    }
  };

  const handlePaymentMethodSelect = (methodId: string, value?: string) => {
    const method = data.platobneMetody.find(m => m.id === methodId);
    if (method) {
      updatePlatobnaMetoda(methodId, !method.selected, value);
    }
  };

  const handleAdditionalServiceSelect = (serviceId: string, value?: string) => {
    const service = data.doplnkoveSluzby.find(s => s.id === serviceId);
    if (service) {
      updateDoplnkovaSluzba(serviceId, !service.selected, value);
    }
  };

  return (
    <StepContainer
      title={t('products.select')}
      subtitle={t('products.subtitle')}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="solutions">{t('select.solution.type')}</TabsTrigger>
          <TabsTrigger value="devices">{t('devices')}</TabsTrigger>
          <TabsTrigger value="licences">{t('licences')}</TabsTrigger>
          <TabsTrigger value="services">{t('services')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solutions" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">{t('select.solution.type')}</h3>
              <SolutionSelection 
                selectedSolutions={selectedSolutions}
                onSelect={handleSolutionSelect}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">{t('devices')}</h3>
              <div className="space-y-4">
                {data.zariadenia.map((device) => (
                  <div key={device.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-slate-900/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Switch 
                          checked={device.selected}
                          onCheckedChange={() => handleDeviceSelect(device.id)}
                          className="mr-3"
                        />
                        <Label htmlFor={`device-${device.id}`} className="text-base font-medium">
                          {device.nazov}
                        </Label>
                      </div>
                    </div>
                    
                    {device.selected && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <Label htmlFor={`qty-${device.id}`}>{t('quantity')}</Label>
                          <Input 
                            id={`qty-${device.id}`}
                            type="number"
                            min="1"
                            value={device.pocetKs}
                            onChange={(e) => handleDeviceQtyChange(device.id, parseInt(e.target.value) || 1)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`type-${device.id}`}>{t('purchase.type')}</Label>
                          <Select 
                            value={device.typNakupu}
                            onValueChange={(value) => handleDevicePurchaseTypeChange(device.id, value as 'Prenájom' | 'Kúpa')}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Prenájom">{t('rental')}</SelectItem>
                              <SelectItem value="Kúpa">{t('purchase')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor={`commitment-${device.id}`}>{t('commitment')}</Label>
                          <Select 
                            value={device.viazanost.toString()}
                            onValueChange={(value) => handleDeviceCommitmentChange(device.id, parseInt(value) as 12 | 24 | 36)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">12 {t('months')}</SelectItem>
                              <SelectItem value="24">24 {t('months')}</SelectItem>
                              <SelectItem value="36">36 {t('months')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor={`frequency-${device.id}`}>{t('payment.frequency')}</Label>
                          <Select 
                            value={device.frekvenciaPlatby}
                            onValueChange={(value) => handleDevicePaymentFrequencyChange(device.id, value as 'mesačne' | 'ročne' | 'sezónne' | 'z obratu')}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mesačne">{t('monthly')}</SelectItem>
                              <SelectItem value="ročne">{t('yearly')}</SelectItem>
                              <SelectItem value="sezónne">{t('seasonal')}</SelectItem>
                              <SelectItem value="z obratu">{t('from.turnover')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="licences" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">{t('licences')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.licencie.map((licence) => (
                  <div 
                    key={licence.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      licence.selected 
                      ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-500/50' 
                      : 'bg-gray-50 hover:bg-gray-100 dark:bg-slate-900/50 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => handleLicenceSelect(licence.id)}
                  >
                    <div className="flex items-center">
                      <Switch 
                        checked={licence.selected}
                        className="mr-3"
                      />
                      <Label className="cursor-pointer">{licence.nazov}</Label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">{t('payment.methods')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {data.platobneMetody.map((method) => (
                  <div 
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      method.selected 
                      ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-500/50' 
                      : 'bg-gray-50 hover:bg-gray-100 dark:bg-slate-900/50 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                  >
                    <div className="flex items-center">
                      <Switch 
                        checked={method.selected}
                        className="mr-3"
                      />
                      <Label className="cursor-pointer">{method.nazov}</Label>
                    </div>
                    
                    {method.selected && method.value !== undefined && (
                      <Input
                        className="mt-2"
                        value={method.value}
                        onChange={(e) => handlePaymentMethodSelect(method.id, e.target.value)}
                        placeholder={t('additional.info')}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium mb-4 mt-8">{t('additional.services')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.doplnkoveSluzby.map((service) => (
                  <div 
                    key={service.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      service.selected 
                      ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/20 dark:border-emerald-500/50' 
                      : 'bg-gray-50 hover:bg-gray-100 dark:bg-slate-900/50 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => handleAdditionalServiceSelect(service.id)}
                  >
                    <div className="flex items-center">
                      <Switch 
                        checked={service.selected}
                        className="mr-3"
                      />
                      <Label className="cursor-pointer">{service.nazov}</Label>
                    </div>
                    
                    {service.selected && service.value !== undefined && (
                      <Input
                        className="mt-2"
                        value={service.value}
                        onChange={(e) => handleAdditionalServiceSelect(service.id, e.target.value)}
                        placeholder={t('additional.info')}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </StepContainer>
  );
};
