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
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Zariadenie } from '@/types/onboarding';

interface ProductWizardProps {
  onNext: () => void;
  onBack: () => void;
}

// Extended device type with UI specific properties
type ExtendedDevice = Zariadenie & {
  hasWifi: boolean;
  hasSim: boolean;
  imageUrl?: string;
  hasDiscount?: boolean;
}

export const ProductWizard: React.FC<ProductWizardProps> = ({ onNext, onBack }) => {
  const { t } = useLanguage();
  const { data, updateZariadenie, updateLicencia, updatePlatobnaMetoda, updateDoplnkovaSluzba } = useOnboarding();
  
  const [activeStep, setActiveStep] = useState<'solutions' | 'devices' | 'licences' | 'services'>('solutions');
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  
  // Map original devices to extended devices with UI properties
  const devicesList = data.zariadenia
    .filter(device => device.id !== 'sim')
    .map(device => ({
      ...device,
      hasWifi: false,
      hasSim: false,
      imageUrl: getDefaultImage(device.id),
      hasDiscount: device.id === 'terminal-a920'
    })) as ExtendedDevice[];

  // Default device images based on device ID
  function getDefaultImage(id: string) {
    const imageMap: Record<string, string> = {
      'a920-gprs': 'https://www.mobilnaterminaly.sk/wp-content/uploads/2021/05/a920-3-uhl-1.jpg',
      'a920-wifi': 'https://www.mobilnaterminaly.sk/wp-content/uploads/2021/05/a920-3-uhl-1.jpg',
      'a80-eth': 'https://b2bchannels.co.uk/wp-content/uploads/2021/03/PAXA80.jpg',
      's800-eth': 'https://www.mobilnaterminaly.sk/wp-content/uploads/2022/01/s800-1.png',
      'pax-a920': 'https://www.mobilnaterminaly.sk/wp-content/uploads/2021/05/a920-3-uhl-1.jpg',
      'pax-a80': 'https://b2bchannels.co.uk/wp-content/uploads/2021/03/PAXA80.jpg',
    };
    return imageMap[id] || 'https://placehold.co/600x400?text=Terminal';
  }

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
    const device = devicesList.find(z => z.id === deviceId);
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

  const handleConnectivityChange = (deviceId: string, type: 'wifi' | 'sim', value: boolean) => {
    // Just log the change for now - no direct updating to context
    console.log(`${type} option for device ${deviceId}: ${value ? 'selected' : 'deselected'}`);
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

  const handleNext = () => {
    if (activeStep === 'solutions') setActiveStep('devices');
    else if (activeStep === 'devices') setActiveStep('licences');
    else if (activeStep === 'licences') setActiveStep('services');
    else if (activeStep === 'services') onNext();
  };

  const handleBack = () => {
    if (activeStep === 'services') setActiveStep('licences');
    else if (activeStep === 'licences') setActiveStep('devices');
    else if (activeStep === 'devices') setActiveStep('solutions');
    else if (activeStep === 'solutions') onBack();
  };

  const getStepTitle = () => {
    switch (activeStep) {
      case 'solutions': return t('select.solution.type');
      case 'devices': return t('devices');
      case 'licences': return t('licences');
      case 'services': return t('services');
      default: return '';
    }
  };

  const isCurrentStepValid = () => {
    if (activeStep === 'solutions') {
      return selectedSolutions.length > 0;
    }
    if (activeStep === 'devices') {
      return devicesList.some(d => d.selected);
    }
    if (activeStep === 'licences') {
      return data.licencie.some(l => l.selected);
    }
    if (activeStep === 'services') {
      return data.platobneMetody.some(p => p.selected);
    }
    return false;
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{getStepTitle()}</h3>
            <div className="flex space-x-2">
              {['solutions', 'devices', 'licences', 'services'].map((step, index) => (
                <div 
                  key={step}
                  className={`w-2.5 h-2.5 rounded-full ${
                    activeStep === step 
                      ? 'bg-emerald-500' 
                      : index < ['solutions', 'devices', 'licences', 'services'].indexOf(activeStep) 
                        ? 'bg-emerald-300' 
                        : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {activeStep === 'solutions' && (
          <div className="space-y-4">
            <SolutionSelection 
              selectedSolutions={selectedSolutions}
              onSelect={handleSolutionSelect}
            />
            
            <div className="py-2 px-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mt-4 flex items-center">
              <div className="mr-2 text-blue-500 dark:text-blue-300">ℹ️</div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t('solution.selection.help')}
              </p>
            </div>
          </div>
        )}

        {activeStep === 'devices' && (
          <div className="space-y-4">
            {devicesList.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onSelect={handleDeviceSelect}
                onQtyChange={handleDeviceQtyChange}
                onPurchaseTypeChange={handleDevicePurchaseTypeChange}
                onCommitmentChange={handleDeviceCommitmentChange}
                onPaymentFrequencyChange={handleDevicePaymentFrequencyChange}
                onConnectivityChange={handleConnectivityChange}
              />
            ))}
          </div>
        )}

        {activeStep === 'licences' && (
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
        )}

        {activeStep === 'services' && (
          <div>
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
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button 
            onClick={handleBack}
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('back')}
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
            className="flex items-center bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
          >
            {activeStep === 'services' ? t('complete') : t('next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
