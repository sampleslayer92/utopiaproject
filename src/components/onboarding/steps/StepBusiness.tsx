import React, { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Wifi, Smartphone } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const StepBusiness: React.FC = () => {
  const { data, updateBusinessInfo } = useOnboarding();
  const { business } = data;
  const { t } = useLanguage();
  const [locations, setLocations] = useState<Array<{id: string, name: string, address: string}>>([
    { id: '1', name: business.nazovPrevadzky || '', address: business.adresaPrevadzky || '' }
  ]);
  const [connectivity, setConnectivity] = useState<{wifi: boolean, sim: boolean}>({
    wifi: business.hasWifi || false,
    sim: business.hasSimCard || false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateBusinessInfo({ [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateBusinessInfo({ [name]: parseInt(value) });
  };

  const handleTypChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateBusinessInfo({ [name]: value });
  };

  const handleSezonnostChange = (isSezonnost: boolean) => {
    updateBusinessInfo({
      sezonnost: isSezonnost
    });
  };

  const handleWifiToggle = () => {
    setConnectivity(prev => ({ ...prev, wifi: !prev.wifi }));
    updateBusinessInfo({
      hasWifi: !connectivity.wifi
    });
  };

  const handleSimToggle = () => {
    setConnectivity(prev => ({ ...prev, sim: !prev.sim }));
    updateBusinessInfo({
      hasSimCard: !connectivity.sim
    });
  };

  const addLocation = () => {
    const newLocation = { id: `loc-${Date.now()}`, name: '', address: '' };
    setLocations([...locations, newLocation]);
  };

  const removeLocation = (id: string) => {
    if (locations.length <= 1) return;
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const updateLocation = (id: string, field: 'name' | 'address', value: string) => {
    setLocations(locations.map(loc => 
      loc.id === id ? { ...loc, [field]: value } : loc
    ));
    
    // Update main business info if this is the first location
    if (id === locations[0]?.id) {
      if (field === 'name') {
        updateBusinessInfo({ nazovPrevadzky: value });
      } else if (field === 'address') {
        updateBusinessInfo({ adresaPrevadzky: value });
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(value);
  };

  return (
    <StepContainer
      title={t('business.locations')}
      subtitle={t('business.subject')}
    >
      <div className="space-y-8">
        {/* Business Locations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{t('business.locations')}</h3>
            <Button 
              size="sm" 
              onClick={addLocation}
              className="gap-1"
              variant="outline"
            >
              <Plus className="h-4 w-4" /> {t('add.location')}
            </Button>
          </div>
          
          <div className="space-y-4">
            {locations.map((location, index) => (
              <Card key={location.id} className="border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">
                      {index === 0 ? t('business.name') : `${t('business.name')} ${index + 1}`}
                    </h4>
                    
                    {index !== 0 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeLocation(location.id)}
                      >
                        <Minus className="h-4 w-4 mr-1 text-red-500" />
                        <span className="text-red-500">{t('remove.location')}</span>
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`business-name-${location.id}`}>{t('business.name')}</Label>
                      <Input
                        id={`business-name-${location.id}`}
                        placeholder={t('business.name')}
                        value={location.name}
                        onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`business-address-${location.id}`}>{t('business.address')}</Label>
                      <Input
                        id={`business-address-${location.id}`}
                        placeholder={t('business.address')}
                        value={location.address}
                        onChange={(e) => updateLocation(location.id, 'address', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Business Type */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-medium mb-4">{t('business.type')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="typPrevadzky">{t('business.type')}</Label>
              <Select 
                value={business.typPrevadzky || 'brick-and-mortar'}
                onValueChange={(value) => updateBusinessInfo({ typPrevadzky: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('business.type')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brick-and-mortar">{t('brick.and.mortar')}</SelectItem>
                  <SelectItem value="mobile">{t('mobile')}</SelectItem>
                  <SelectItem value="seasonal">{t('seasonal_business')}</SelectItem>
                  <SelectItem value="other">{t('other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="otvHodiny">{t('opening.hours')}</Label>
              <Input
                id="otvHodiny"
                placeholder="Po-Pia 9:00 - 17:00, So-Ne zatvorené"
                value={business.otvHodiny || ''}
                onChange={(e) => updateBusinessInfo({ otvHodiny: e.target.value })}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="sezonnost"
              checked={business.sezonnost || false}
              onCheckedChange={handleSezonnostChange}
            />
            <Label htmlFor="sezonnost">{t('is.seasonal')}</Label>
          </div>
          
          {business.sezonnost && (
            <div className="mb-4">
              <Label htmlFor="trvanieSezonnosti">{t('season.duration')}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="trvanieSezonnosti"
                  type="number"
                  min="1"
                  max="52"
                  className="max-w-[100px]"
                  value={business.trvanieSezonnosti || 12}
                  onChange={(e) => updateBusinessInfo({ trvanieSezonnosti: parseInt(e.target.value) })}
                />
                <span>{t('weeks')}</span>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <Label htmlFor="rocnyObrat">{t('estimated.annual.turnover')}</Label>
              <Input
                id="rocnyObrat"
                type="number"
                min="0"
                step="1000"
                value={business.rocnyObrat || 0}
                onChange={(e) => updateBusinessInfo({ rocnyObrat: parseInt(e.target.value) })}
              />
              <div className="text-sm text-slate-500 mt-1">
                {formatCurrency(business.rocnyObrat || 0)}
              </div>
            </div>
            
            <div>
              <Label htmlFor="priemTransakcia">{t('average.transaction')}</Label>
              <Input
                id="priemTransakcia"
                type="number"
                min="0"
                step="1"
                value={business.priemTransakcia || 0}
                onChange={(e) => updateBusinessInfo({ priemTransakcia: parseInt(e.target.value) })}
              />
              <div className="text-sm text-slate-500 mt-1">
                {formatCurrency(business.priemTransakcia || 0)}
              </div>
            </div>
          </div>
        </div>
        
        {/* Predmet Podnikania */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-medium mb-4">{t('business.subject')}</h3>
          
          <div>
            <Textarea
              id="predmetPodnikania"
              placeholder={t('business.subject')}
              className="min-h-24"
              value={business.predmetPodnikania || ''}
              onChange={(e) => updateBusinessInfo({ predmetPodnikania: e.target.value })}
            />
          </div>
        </div>
        
        {/* Connectivity Options */}
        <div className="mt-6 border-t pt-4">
          <h4 className="text-base font-medium mb-3">{t('connectivity')}</h4>
          <div className="flex flex-wrap gap-3">
            <div 
              className={`flex items-center gap-2 p-3 border rounded-lg transition-all cursor-pointer ${
                connectivity.wifi ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
              onClick={handleWifiToggle}
            >
              <div className={`p-2 rounded-full ${connectivity.wifi ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-slate-700'}`}>
                <Wifi className={`h-4 w-4 ${connectivity.wifi ? 'text-emerald-500' : ''}`} />
              </div>
              <span>{t('wifi')}</span>
            </div>
            
            <div 
              className={`flex items-center gap-2 p-3 border rounded-lg transition-all cursor-pointer ${
                connectivity.sim ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
              onClick={handleSimToggle}
            >
              <div className={`p-2 rounded-full ${connectivity.sim ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-slate-700'}`}>
                <Smartphone className={`h-4 w-4 ${connectivity.sim ? 'text-emerald-500' : ''}`} />
              </div>
              <span>{t('sim.card')}</span>
            </div>
          </div>
        </div>
      </div>
    </StepContainer>
  );
};
