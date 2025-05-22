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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateBusinessInfo({
      [e.target.name]: e.target.value
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBusinessInfo({
      [e.target.name]: e.target.value ? parseFloat(e.target.value) : 0
    });
  };

  const handleTypChange = (value: string) => {
    updateBusinessInfo({
      typPrevadzky: value as any
    });
  };

  const handleSezonnostChange = (checked: boolean) => {
    updateBusinessInfo({
      sezonnost: checked,
      trvanieSezony: checked ? business.trvanieSezony || 12 : 0
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
      subtitle={t('select.business.type.subtitle')}
    >
      <div className="space-y-6">
        {/* Locations section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{t('business.locations')}</h3>
              <Button 
                onClick={addLocation} 
                size="sm" 
                className="flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                {t('add.location')}
              </Button>
            </div>
            
            <div className="space-y-6">
              {locations.map((location, index) => (
                <div key={location.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-slate-900">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">{t('business.name')} #{index + 1}</h4>
                    {locations.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeLocation(location.id)}
                        className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Minus className="w-4 h-4 mr-1" />
                        {t('remove')}
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`location-name-${location.id}`}>{t('business.name')}</Label>
                      <Input
                        id={`location-name-${location.id}`}
                        value={location.name}
                        onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                        placeholder={t('business.name')}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`location-address-${location.id}`}>{t('business.address')}</Label>
                      <Input
                        id={`location-address-${location.id}`}
                        value={location.address}
                        onChange={(e) => updateLocation(location.id, 'address', e.target.value)}
                        placeholder={t('business.address')}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">{t('address')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mesto">{t('city')}</Label>
                <Input
                  id="mesto"
                  name="mesto"
                  value={business.mesto}
                  onChange={handleChange}
                  placeholder={t('city')}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="psc">{t('postal.code')}</Label>
                <Input
                  id="psc"
                  name="psc"
                  value={business.psc}
                  onChange={handleChange}
                  placeholder={t('postal.code')}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="telefon">{t('phone')}</Label>
                <Input
                  id="telefon"
                  name="telefon"
                  value={business.telefon}
                  onChange={handleChange}
                  placeholder={t('phone')}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={business.email}
                  onChange={handleChange}
                  placeholder={t('email')}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Business Type */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">{t('business.type')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="typPrevadzky">{t('business.type')}</Label>
                <Select 
                  value={business.typPrevadzky} 
                  onValueChange={handleTypChange}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={t('select.business.type')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kamenná">{t('brick.and.mortar')}</SelectItem>
                    <SelectItem value="Mobilná">{t('mobile')}</SelectItem>
                    <SelectItem value="Sezónna">{t('seasonal')}</SelectItem>
                    <SelectItem value="Iné">{t('other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="predmetPodnikania">{t('business.subject')}</Label>
                <Input
                  id="predmetPodnikania"
                  name="predmetPodnikania"
                  value={business.predmetPodnikania}
                  onChange={handleChange}
                  placeholder={t('business.subject')}
                  className="mt-1"
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="otvaracieHodiny">{t('opening.hours')}</Label>
                <Textarea
                  id="otvaracieHodiny"
                  name="otvaracieHodiny"
                  value={business.otvaracieHodiny}
                  onChange={handleChange}
                  placeholder={t('opening.hours')}
                  className="mt-1 h-24"
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
            
            {/* Seasonality */}
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  id="sezonnost"
                  checked={business.sezonnost}
                  onCheckedChange={handleSezonnostChange}
                />
                <Label htmlFor="sezonnost">{t('seasonal')}</Label>
              </div>
              
              {business.sezonnost && (
                <div>
                  <Label htmlFor="trvanieSezony">{t('season.duration')} ({t('weeks')})</Label>
                  <Input
                    id="trvanieSezony"
                    name="trvanieSezony"
                    type="number"
                    min="1"
                    max="52"
                    value={business.trvanieSezony}
                    onChange={handleNumberChange}
                    className="mt-1 w-full md:w-1/3"
                  />
                </div>
              )}
            </div>
            
            {/* Financial Information */}
            <div className="mt-6 border-t pt-4">
              <h4 className="text-base font-medium mb-3">{t('estimated.annual.turnover')}</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4 dark:bg-slate-900">
                <div>
                  <Label htmlFor="odhadovanyRocnyObrat">{t('estimated.annual.turnover')}</Label>
                  <Input
                    id="odhadovanyRocnyObrat"
                    name="odhadovanyRocnyObrat"
                    type="number"
                    value={business.odhadovanyRocnyObrat || ''}
                    onChange={handleNumberChange}
                    placeholder="0.00"
                    className="mt-1"
                  />
                  {business.odhadovanyRocnyObrat > 0 && (
                    <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">{formatCurrency(business.odhadovanyRocnyObrat)}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="priemernaVyskaTransakcie">{t('average.transaction')}</Label>
                  <Input
                    id="priemernaVyskaTransakcie"
                    name="priemernaVyskaTransakcie"
                    type="number"
                    value={business.priemernaVyskaTransakcie || ''}
                    onChange={handleNumberChange}
                    placeholder="0.00"
                    className="mt-1"
                  />
                  {business.priemernaVyskaTransakcie > 0 && (
                    <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">{formatCurrency(business.priemernaVyskaTransakcie)}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="ocakavanyObratKariet">{t('expected.card.turnover')}</Label>
                  <Input
                    id="ocakavanyObratKariet"
                    name="ocakavanyObratKariet"
                    type="number"
                    value={business.ocakavanyObratKariet || ''}
                    onChange={handleNumberChange}
                    placeholder="0.00"
                    className="mt-1"
                  />
                  {business.ocakavanyObratKariet > 0 && (
                    <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">{formatCurrency(business.ocakavanyObratKariet)}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StepContainer>
  );
};
