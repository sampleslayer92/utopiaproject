
import React, { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { DeviceCard } from './DeviceCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Define a more specific type that matches our devices array
type DeviceType = {
  id: string;
  nazov: string;
  selected: boolean;
  pocetKs: number;
  typNakupu: 'Prenájom' | 'Kúpa';
  viazanost: 12 | 24 | 36;
  frekvenciaPlatby: 'mesačne' | 'ročne' | 'sezónne' | 'z obratu';
  hasWifi: boolean;
  hasSim: boolean;
  imageUrl?: string;
  hasDiscount?: boolean;
};

export const StepProducts: React.FC = () => {
  const { nextStep, prevStep, updateZariadenie, data } = useOnboarding();
  const { t } = useLanguage();
  
  // Initial devices with the correct type
  const [devices, setDevices] = useState<DeviceType[]>([
    {
      id: 'terminal-a920',
      nazov: 'Terminal A920',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: false,
      hasSim: false,
      imageUrl: 'https://www.mobilnaterminaly.sk/wp-content/uploads/2021/05/a920-3-uhl-1.jpg',
      hasDiscount: true
    },
    {
      id: 'terminal-s800',
      nazov: 'Terminal S800',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: false,
      hasSim: false,
      imageUrl: 'https://www.mobilnaterminaly.sk/wp-content/uploads/2022/01/s800-1.png',
      hasDiscount: false
    },
    {
      id: 'terminal-pax-a80',
      nazov: 'Terminal PAX A80',
      selected: false,
      pocetKs: 1,
      typNakupu: 'Prenájom',
      viazanost: 24,
      frekvenciaPlatby: 'mesačne',
      hasWifi: false,
      hasSim: false,
      imageUrl: 'https://b2bchannels.co.uk/wp-content/uploads/2021/03/PAXA80.jpg',
      hasDiscount: false
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

  // Fix the type for purchase type change
  const handlePurchaseTypeChange = (id: string, type: 'Prenájom' | 'Kúpa') => {
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, typNakupu: type } : device
    ));
  };

  // Fix the type for commitment change
  const handleCommitmentChange = (id: string, months: 12 | 24 | 36) => {
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, viazanost: months } : device
    ));
  };

  // Fix the type for payment frequency change
  const handlePaymentFrequencyChange = (id: string, frequency: 'mesačne' | 'ročne' | 'sezónne' | 'z obratu') => {
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, frekvenciaPlatby: frequency } : device
    ));
  };

  const handleConnectivityChange = (id: string, type: 'wifi' | 'sim' | 'ethernet', value: boolean) => {
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

  // Add an explicit function for SIM option change
  const handleSimOptionChange = (id: string, selected: boolean) => {
    handleConnectivityChange(id, 'sim', selected);
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
          frekvenciaPlatby: device.frekvenciaPlatby,
          // Use the hasWifi and hasSim properties as custom properties
          // These will be added to the Zariadenie type in the context
          hasWifi: device.hasWifi,
          hasSim: device.hasSim
        } as any); // Using "as any" as a temporary fix until the Zariadenie type is updated
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
            onSimOptionChange={handleSimOptionChange}
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
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
          >
            {t('next.step')}
          </Button>
        </div>
      </div>
    </StepContainer>
  );
};
