
import React, { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { DeviceCard } from './DeviceCard';
import { Button } from '@/components/ui/button';

export const StepProducts: React.FC = () => {
  const { nextStep, prevStep, updateZariadenie, data } = useOnboarding();
  const { t } = useLanguage();
  
  // Initial devices with correct types
  const [devices, setDevices] = useState([
    {
      id: 'terminal-a920',
      nazov: 'Terminal A920',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom' as const,
      viazanost: 24 as const,
      frekvenciaPlatby: 'mesačne' as const,
      hasWifi: false,
      hasSim: false
    },
    {
      id: 'terminal-s800',
      nazov: 'Terminal S800',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom' as const,
      viazanost: 24 as const,
      frekvenciaPlatby: 'mesačne' as const,
      hasWifi: false,
      hasSim: false
    },
    {
      id: 'terminal-pax-a80',
      nazov: 'Terminal PAX A80',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom' as const,
      viazanost: 24 as const,
      frekvenciaPlatby: 'mesačne' as const,
      hasWifi: false,
      hasSim: false
    }
  ]);

  const handleSelect = (id: string) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, selected: !device.selected } : device
    ));
  };

  const handleQtyChange = (id: string, qty: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, pocetKs: qty } : device
    ));
  };

  const handlePurchaseTypeChange = (id: string, type: 'Prenájom' | 'Kúpa') => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, typNakupu: type } : device
    ));
  };

  const handleCommitmentChange = (id: string, months: 12 | 24 | 36) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, viazanost: months } : device
    ));
  };

  const handlePaymentFrequencyChange = (id: string, frequency: 'mesačne' | 'ročne' | 'sezónne' | 'z obratu') => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, frekvenciaPlatby: frequency } : device
    ));
  };

  const handleConnectivityChange = (id: string, type: 'wifi' | 'sim', value: boolean) => {
    setDevices(devices.map(device => 
      device.id === id 
        ? { 
            ...device, 
            hasWifi: type === 'wifi' ? value : device.hasWifi,
            hasSim: type === 'sim' ? value : device.hasSim
          } 
        : device
    ));
  };

  const handleContinue = () => {
    // Update devices in the onboarding context
    devices.forEach(device => {
      if (device.selected) {
        updateZariadenie(device.id, {
          selected: device.selected,
          pocetKs: device.pocetKs,
          typNakupu: device.typNakupu,
          viazanost: device.viazanost,
          frekvenciaPlatby: device.frekvenciaPlatby
        });
      }
    });
    nextStep();
  };

  return (
    <StepContainer
      title={t('products.select')}
      subtitle={t('products.subtitle')}
    >
      <div className="space-y-4">
        {devices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onSelect={handleSelect}
            onQtyChange={handleQtyChange}
            onPurchaseTypeChange={handlePurchaseTypeChange}
            onCommitmentChange={handleCommitmentChange}
            onPaymentFrequencyChange={handlePaymentFrequencyChange}
            onConnectivityChange={handleConnectivityChange}
          />
        ))}
        
        <div className="pt-6 flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
          >
            {t('previous.step')}
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={!devices.some(d => d.selected)}
          >
            {t('next.step')}
          </Button>
        </div>
      </div>
    </StepContainer>
  );
};
