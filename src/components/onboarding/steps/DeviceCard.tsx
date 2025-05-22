
import React from 'react';
import { Card } from '@/components/ui/card';
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
import { useLanguage } from '@/contexts/LanguageContext';
import { Wifi, Smartphone, HardDrive, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DeviceCardProps {
  device: {
    id: string;
    nazov: string;
    selected: boolean;
    pocetKs: number;
    typNakupu: 'Prenájom' | 'Kúpa';
    viazanost: 12 | 24 | 36;
    frekvenciaPlatby: 'mesačne' | 'ročne' | 'sezónne' | 'z obratu';
    hasWifi: boolean;
    hasSim: boolean;
    hasEthernet?: boolean;
    imageUrl?: string;
    hasDiscount?: boolean;
  };
  onSelect: (id: string) => void;
  onQtyChange: (id: string, qty: number) => void;
  onPurchaseTypeChange: (id: string, type: 'Prenájom' | 'Kúpa') => void;
  onCommitmentChange: (id: string, months: 12 | 24 | 36) => void;
  onPaymentFrequencyChange: (id: string, frequency: 'mesačne' | 'ročne' | 'sezónne' | 'z obratu') => void;
  onConnectivityChange?: (id: string, type: 'wifi' | 'sim' | 'ethernet', value: boolean) => void;
  onSimOptionChange?: (id: string, selected: boolean) => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onSelect,
  onQtyChange,
  onPurchaseTypeChange,
  onCommitmentChange,
  onPaymentFrequencyChange,
  onConnectivityChange,
  onSimOptionChange
}) => {
  const { t } = useLanguage();
  
  // Default device images based on device ID
  const getDefaultImage = (id: string) => {
    const imageMap: Record<string, string> = {
      'terminal-a920': 'https://www.mobilnaterminaly.sk/wp-content/uploads/2021/05/a920-3-uhl-1.jpg',
      'terminal-s800': 'https://www.mobilnaterminaly.sk/wp-content/uploads/2022/01/s800-1.png',
      'terminal-pax-a80': 'https://b2bchannels.co.uk/wp-content/uploads/2021/03/PAXA80.jpg'
    };
    return imageMap[id] || 'https://placehold.co/600x400?text=Terminal';
  };

  // Handle SIM option change, using either dedicated function or fallback to connectivity change
  const handleSimOptionChange = (id: string, selected: boolean) => {
    if (onSimOptionChange) {
      onSimOptionChange(id, selected);
    } else if (onConnectivityChange) {
      onConnectivityChange(id, 'sim', selected);
    }
  };

  const handleConnectivityChange = (id: string, type: 'wifi' | 'sim' | 'ethernet', value: boolean) => {
    if (onConnectivityChange) {
      onConnectivityChange(id, type, value);
    }
  };

  const imageUrl = device.imageUrl || getDefaultImage(device.id);

  return (
    <div className="relative p-4 border rounded-lg bg-white dark:bg-slate-900 transition-all hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Device Image */}
        <div className="w-24 h-24 flex-shrink-0 relative">
          <img 
            src={imageUrl} 
            alt={device.nazov} 
            className="w-full h-full object-contain rounded-md"
          />
          {device.hasDiscount && (
            <Badge className="absolute -top-2 -right-2 bg-red-500">
              <Tag className="h-3 w-3 mr-1" />
              Akcia
            </Badge>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Switch 
                checked={device.selected}
                onCheckedChange={() => onSelect(device.id)}
                className="mr-3"
              />
              <Label htmlFor={`device-${device.id}`} className="text-lg font-medium">
                {device.nazov}
              </Label>
            </div>
          </div>
          
          {!device.selected && (
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-12">
              Vyberte tento terminál pre zobrazenie detailov
            </p>
          )}
        </div>
      </div>
      
      {device.selected && (
        <div className="space-y-4 mt-4 ml-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor={`qty-${device.id}`}>{t('quantity')}</Label>
              <Input 
                id={`qty-${device.id}`}
                type="number"
                min="1"
                value={device.pocetKs}
                onChange={(e) => onQtyChange(device.id, parseInt(e.target.value) || 1)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`type-${device.id}`}>{t('purchase.type')}</Label>
              <Select 
                value={device.typNakupu}
                onValueChange={(value) => onPurchaseTypeChange(device.id, value as 'Prenájom' | 'Kúpa')}
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
                onValueChange={(value) => onCommitmentChange(device.id, parseInt(value) as 12 | 24 | 36)}
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
                onValueChange={(value) => onPaymentFrequencyChange(device.id, value as 'mesačne' | 'ročne' | 'sezónne' | 'z obratu')}
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
          
          <div className="border-t pt-3 mt-3">
            <h4 className="text-base font-medium mb-3">{t('connectivity')}</h4>
            <div className="flex flex-wrap gap-3">
              <div 
                className={`flex items-center gap-2 p-3 border rounded-lg transition-all cursor-pointer ${
                  device.hasWifi ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => handleConnectivityChange(device.id, 'wifi', !device.hasWifi)}
              >
                <div className={`p-2 rounded-full ${device.hasWifi ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-slate-700'}`}>
                  <Wifi className={`h-4 w-4 ${device.hasWifi ? 'text-emerald-500' : ''}`} />
                </div>
                <span>{t('wifi')}</span>
              </div>
              
              <div 
                className={`flex items-center gap-2 p-3 border rounded-lg transition-all cursor-pointer ${
                  device.hasSim ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => handleSimOptionChange(device.id, !device.hasSim)}
              >
                <div className={`p-2 rounded-full ${device.hasSim ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-slate-700'}`}>
                  <Smartphone className={`h-4 w-4 ${device.hasSim ? 'text-emerald-500' : ''}`} />
                </div>
                <span>{t('sim.card')}</span>
              </div>
              
              <div 
                className={`flex items-center gap-2 p-3 border rounded-lg transition-all cursor-pointer ${
                  device.hasEthernet ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => handleConnectivityChange(device.id, 'ethernet', !device.hasEthernet)}
              >
                <div className={`p-2 rounded-full ${device.hasEthernet ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-slate-700'}`}>
                  <HardDrive className={`h-4 w-4 ${device.hasEthernet ? 'text-emerald-500' : ''}`} />
                </div>
                <span>Ethernet</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
