
import React, { useState, useEffect } from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Wifi, Smartphone, Trash2, ChevronDown, ChevronUp, Globe, HardDrive } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type BankAccount = {
  id: string;
  name: string;
  iban: string;
  currency: string;
  swift?: string;
};

type Location = {
  id: string;
  name: string;
  address: string;
  type: "Kamenná" | "Mobilná" | "Online" | "Iná";
  seasonal: boolean;
  seasonDuration?: number;
  openingHours: string;
  estimatedAnnualTurnover: number;
  averageTransactionAmount: number;
  businessSubject: string;
  connectivity: {
    wifi: boolean;
    sim: boolean;
    ethernet: boolean;
  };
  bankAccounts: BankAccount[];
  isOpen: boolean;
};

export const StepBusiness: React.FC = () => {
  const { data, updateBusinessInfo } = useOnboarding();
  const { business, company } = data;
  const { t } = useLanguage();
  
  const [useCompanyAddress, setUseCompanyAddress] = useState(false);
  const [locations, setLocations] = useState<Location[]>([
    { 
      id: '1', 
      name: business.nazovPrevadzky || '', 
      address: business.adresaPrevadzky || '',
      type: business.typPrevadzky || "Kamenná",
      seasonal: business.sezonnost || false,
      seasonDuration: business.trvanieSezony || 12,
      openingHours: business.otvaracieHodiny || 'Po-Pia 9:00 - 17:00',
      estimatedAnnualTurnover: business.odhadovanyRocnyObrat || 0,
      averageTransactionAmount: business.priemernaVyskaTransakcie || 0,
      businessSubject: business.predmetPodnikania || '',
      connectivity: {
        wifi: business.hasWifi || false,
        sim: business.hasSimCard || false,
        ethernet: false
      },
      bankAccounts: [],
      isOpen: true
    }
  ]);

  // Handle the "Use company address" checkbox
  useEffect(() => {
    if (useCompanyAddress) {
      const updatedLocations = [...locations];
      updatedLocations[0] = {
        ...updatedLocations[0],
        name: company.nazovSpolocnosti || '',
        address: company.sidlo || '',
        type: "Kamenná",
        openingHours: 'Po-Pia 9:00 - 17:00',
        businessSubject: company.predmetCinnosti || ''
      };
      setLocations(updatedLocations);
      
      // Update business info in context
      updateBusinessInfo({
        nazovPrevadzky: company.nazovSpolocnosti,
        adresaPrevadzky: company.sidlo,
        typPrevadzky: "Kamenná",
        otvaracieHodiny: 'Po-Pia 9:00 - 17:00',
        predmetPodnikania: company.predmetCinnosti
      });
    }
  }, [useCompanyAddress, company]);

  // Update business info in context when first location changes
  useEffect(() => {
    if (locations.length > 0) {
      const mainLocation = locations[0];
      updateBusinessInfo({
        nazovPrevadzky: mainLocation.name,
        adresaPrevadzky: mainLocation.address,
        typPrevadzky: mainLocation.type as any,
        sezonnost: mainLocation.seasonal,
        trvanieSezony: mainLocation.seasonDuration,
        otvaracieHodiny: mainLocation.openingHours,
        odhadovanyRocnyObrat: mainLocation.estimatedAnnualTurnover,
        priemernaVyskaTransakcie: mainLocation.averageTransactionAmount,
        predmetPodnikania: mainLocation.businessSubject,
        hasWifi: mainLocation.connectivity.wifi,
        hasSimCard: mainLocation.connectivity.sim
      });
    }
  }, [locations]);

  const addLocation = () => {
    const newLocation: Location = { 
      id: `loc-${Date.now()}`, 
      name: '', 
      address: '',
      type: "Kamenná",
      seasonal: false,
      openingHours: 'Po-Pia 9:00 - 17:00',
      estimatedAnnualTurnover: 0,
      averageTransactionAmount: 0,
      businessSubject: '',
      connectivity: {
        wifi: false,
        sim: false,
        ethernet: false
      },
      bankAccounts: [],
      isOpen: true
    };
    setLocations([...locations, newLocation]);
  };

  const removeLocation = (id: string) => {
    if (locations.length <= 1) return;
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const updateLocation = (id: string, field: keyof Location, value: any) => {
    setLocations(locations.map(loc => 
      loc.id === id ? { ...loc, [field]: value } : loc
    ));
  };

  const updateConnectivity = (id: string, type: 'wifi' | 'sim' | 'ethernet', value: boolean) => {
    setLocations(locations.map(loc => 
      loc.id === id 
        ? { 
            ...loc, 
            connectivity: { 
              ...loc.connectivity, 
              [type]: value 
            } 
          } 
        : loc
    ));
  };

  const addBankAccount = (locationId: string) => {
    const newAccount: BankAccount = {
      id: `acc-${Date.now()}`,
      name: '',
      iban: '',
      currency: 'EUR',
      swift: ''
    };
    
    setLocations(locations.map(loc => 
      loc.id === locationId 
        ? { 
            ...loc, 
            bankAccounts: [...loc.bankAccounts, newAccount]
          } 
        : loc
    ));
  };

  const updateBankAccount = (locationId: string, accountId: string, field: keyof BankAccount, value: string) => {
    setLocations(locations.map(loc => 
      loc.id === locationId 
        ? { 
            ...loc, 
            bankAccounts: loc.bankAccounts.map(acc => 
              acc.id === accountId 
                ? { ...acc, [field]: value } 
                : acc
            )
          } 
        : loc
    ));
  };

  const removeBankAccount = (locationId: string, accountId: string) => {
    setLocations(locations.map(loc => 
      loc.id === locationId 
        ? { 
            ...loc, 
            bankAccounts: loc.bankAccounts.filter(acc => acc.id !== accountId)
          } 
        : loc
    ));
  };

  const toggleLocationCollapse = (id: string) => {
    setLocations(locations.map(loc => 
      loc.id === id ? { ...loc, isOpen: !loc.isOpen } : loc
    ));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(value);
  };

  const currencies = ["EUR", "USD", "CZK", "GBP", "HUF", "PLN"];

  return (
    <StepContainer
      title={t('business.locations')}
      subtitle={t('business.subject')}
    >
      <div className="space-y-6">
        {/* Use company address checkbox */}
        <div className="flex items-center space-x-2 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
          <Checkbox 
            id="useCompanyAddress" 
            checked={useCompanyAddress} 
            onCheckedChange={(checked) => setUseCompanyAddress(checked as boolean)}
          />
          <Label 
            htmlFor="useCompanyAddress" 
            className="font-medium cursor-pointer"
          >
            Použiť údaje z firemnej adresy
          </Label>
        </div>
        
        {/* Business Locations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{t('business.locations')}</h3>
          </div>
          
          <div className="space-y-4">
            {locations.map((location, index) => (
              <Card key={location.id} className="border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <CollapsibleTrigger 
                      onClick={() => toggleLocationCollapse(location.id)}
                      className="rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      {location.isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </CollapsibleTrigger>
                    <h4 className="font-medium">
                      {location.name || `Prevádzka ${index + 1}`}
                    </h4>
                  </div>
                  
                  {index !== 0 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeLocation(location.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      <span>{t('remove.location')}</span>
                    </Button>
                  )}
                </div>
                
                <CollapsibleContent forceMount className={location.isOpen ? 'block' : 'hidden'}>
                  <CardContent className="p-4">
                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`business-name-${location.id}`}>{t('business.name')}</Label>
                          <Input
                            id={`business-name-${location.id}`}
                            placeholder={t('business.name')}
                            value={location.name}
                            onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                            disabled={useCompanyAddress && index === 0}
                            className={useCompanyAddress && index === 0 ? 'bg-gray-100 dark:bg-slate-800' : ''}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`business-address-${location.id}`}>{t('business.address')}</Label>
                          <Input
                            id={`business-address-${location.id}`}
                            placeholder={t('business.address')}
                            value={location.address}
                            onChange={(e) => updateLocation(location.id, 'address', e.target.value)}
                            disabled={useCompanyAddress && index === 0}
                            className={useCompanyAddress && index === 0 ? 'bg-gray-100 dark:bg-slate-800' : ''}
                          />
                        </div>
                      </div>
                      
                      {/* Business Type */}
                      <div>
                        <Label htmlFor={`business-type-${location.id}`}>{t('business.type')}</Label>
                        <Select 
                          value={location.type}
                          onValueChange={(value: "Kamenná" | "Mobilná" | "Online" | "Iná") => updateLocation(location.id, 'type', value)}
                          disabled={useCompanyAddress && index === 0}
                        >
                          <SelectTrigger className={useCompanyAddress && index === 0 ? 'bg-gray-100 dark:bg-slate-800' : ''}>
                            <SelectValue placeholder={t('business.type')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Kamenná">{t('brick.and.mortar')}</SelectItem>
                            <SelectItem value="Mobilná">{t('mobile')}</SelectItem>
                            <SelectItem value="Online">Online</SelectItem>
                            <SelectItem value="Iná">{t('other')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Seasonal Business */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`seasonal-${location.id}`}
                            checked={location.seasonal}
                            onCheckedChange={(checked) => updateLocation(location.id, 'seasonal', checked)}
                            disabled={useCompanyAddress && index === 0}
                          />
                          <Label htmlFor={`seasonal-${location.id}`}>{t('is.seasonal')}</Label>
                        </div>
                        
                        {location.seasonal && (
                          <div>
                            <Label htmlFor={`season-duration-${location.id}`}>{t('season.duration')}</Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id={`season-duration-${location.id}`}
                                type="number"
                                min="1"
                                max="52"
                                className="max-w-[100px]"
                                value={location.seasonDuration || 12}
                                onChange={(e) => updateLocation(location.id, 'seasonDuration', parseInt(e.target.value))}
                                disabled={useCompanyAddress && index === 0}
                              />
                              <span>{t('weeks')}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Opening Hours */}
                      <div>
                        <Label htmlFor={`opening-hours-${location.id}`}>{t('opening.hours')}</Label>
                        <Input
                          id={`opening-hours-${location.id}`}
                          placeholder="Po-Pia 9:00 - 17:00, So-Ne zatvorené"
                          value={location.openingHours}
                          onChange={(e) => updateLocation(location.id, 'openingHours', e.target.value)}
                          disabled={useCompanyAddress && index === 0}
                          className={useCompanyAddress && index === 0 ? 'bg-gray-100 dark:bg-slate-800' : ''}
                        />
                      </div>
                      
                      {/* Financial Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`annual-turnover-${location.id}`}>{t('estimated.annual.turnover')}</Label>
                          <Input
                            id={`annual-turnover-${location.id}`}
                            type="number"
                            min="0"
                            step="1000"
                            value={location.estimatedAnnualTurnover || 0}
                            onChange={(e) => updateLocation(location.id, 'estimatedAnnualTurnover', parseInt(e.target.value))}
                          />
                          <div className="text-sm text-slate-500 mt-1">
                            {formatCurrency(location.estimatedAnnualTurnover || 0)}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor={`avg-transaction-${location.id}`}>{t('average.transaction')}</Label>
                          <Input
                            id={`avg-transaction-${location.id}`}
                            type="number"
                            min="0"
                            step="1"
                            value={location.averageTransactionAmount || 0}
                            onChange={(e) => updateLocation(location.id, 'averageTransactionAmount', parseInt(e.target.value))}
                          />
                          <div className="text-sm text-slate-500 mt-1">
                            {formatCurrency(location.averageTransactionAmount || 0)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Business Subject */}
                      <div>
                        <Label htmlFor={`business-subject-${location.id}`}>{t('business.subject')}</Label>
                        <Textarea
                          id={`business-subject-${location.id}`}
                          placeholder={t('business.subject')}
                          className="min-h-24"
                          value={location.businessSubject}
                          onChange={(e) => updateLocation(location.id, 'businessSubject', e.target.value)}
                          disabled={useCompanyAddress && index === 0}
                          className={useCompanyAddress && index === 0 ? 'bg-gray-100 dark:bg-slate-800 min-h-24' : 'min-h-24'}
                        />
                      </div>
                      
                      {/* Connectivity Options */}
                      <div>
                        <h4 className="text-base font-medium mb-3">{t('connectivity')}</h4>
                        <div className="flex flex-wrap gap-3">
                          <div 
                            className={`flex items-center gap-2 p-3 border rounded-lg transition-all cursor-pointer ${
                              location.connectivity.wifi ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'hover:bg-gray-50 dark:hover:bg-slate-800'
                            }`}
                            onClick={() => updateConnectivity(location.id, 'wifi', !location.connectivity.wifi)}
                          >
                            <div className={`p-2 rounded-full ${location.connectivity.wifi ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-slate-700'}`}>
                              <Wifi className={`h-4 w-4 ${location.connectivity.wifi ? 'text-emerald-500' : ''}`} />
                            </div>
                            <span>WiFi</span>
                          </div>
                          
                          <div 
                            className={`flex items-center gap-2 p-3 border rounded-lg transition-all cursor-pointer ${
                              location.connectivity.sim ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'hover:bg-gray-50 dark:hover:bg-slate-800'
                            }`}
                            onClick={() => updateConnectivity(location.id, 'sim', !location.connectivity.sim)}
                          >
                            <div className={`p-2 rounded-full ${location.connectivity.sim ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-slate-700'}`}>
                              <Smartphone className={`h-4 w-4 ${location.connectivity.sim ? 'text-emerald-500' : ''}`} />
                            </div>
                            <span>SIM karta</span>
                          </div>
                          
                          <div 
                            className={`flex items-center gap-2 p-3 border rounded-lg transition-all cursor-pointer ${
                              location.connectivity.ethernet ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300' : 'hover:bg-gray-50 dark:hover:bg-slate-800'
                            }`}
                            onClick={() => updateConnectivity(location.id, 'ethernet', !location.connectivity.ethernet)}
                          >
                            <div className={`p-2 rounded-full ${location.connectivity.ethernet ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-slate-700'}`}>
                              <HardDrive className={`h-4 w-4 ${location.connectivity.ethernet ? 'text-emerald-500' : ''}`} />
                            </div>
                            <span>Ethernet</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bank Accounts */}
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-base font-medium">Bankové účty</h4>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => addBankAccount(location.id)}
                            className="gap-1"
                          >
                            <Plus className="h-4 w-4" />
                            Pridať účet
                          </Button>
                        </div>
                        
                        {location.bankAccounts.length === 0 ? (
                          <div className="text-sm text-slate-500 p-3 border border-dashed rounded-lg text-center">
                            Zatiaľ nie sú pridané žiadne bankové účty
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {location.bankAccounts.map((account) => (
                              <div key={account.id} className="p-3 border rounded-lg">
                                <div className="flex justify-between mb-2">
                                  <h5 className="font-medium text-sm">
                                    {account.name || 'Nový účet'}
                                  </h5>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeBankAccount(location.id, account.id)}
                                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <Label htmlFor={`account-name-${account.id}`} className="text-xs">Názov účtu</Label>
                                    <Input
                                      id={`account-name-${account.id}`}
                                      placeholder="Hlavný účet"
                                      value={account.name}
                                      onChange={(e) => updateBankAccount(location.id, account.id, 'name', e.target.value)}
                                      className="h-8 text-sm"
                                    />
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor={`account-iban-${account.id}`} className="text-xs">IBAN</Label>
                                    <Input
                                      id={`account-iban-${account.id}`}
                                      placeholder="SK0000000000000000000000"
                                      value={account.iban}
                                      onChange={(e) => updateBankAccount(location.id, account.id, 'iban', e.target.value)}
                                      className="h-8 text-sm"
                                    />
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor={`account-currency-${account.id}`} className="text-xs">Mena</Label>
                                    <Select 
                                      value={account.currency}
                                      onValueChange={(value) => updateBankAccount(location.id, account.id, 'currency', value)}
                                    >
                                      <SelectTrigger className="h-8 text-sm">
                                        <SelectValue placeholder="Vyberte menu" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {currencies.map(currency => (
                                          <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor={`account-swift-${account.id}`} className="text-xs">SWIFT/BIC (voliteľné)</Label>
                                    <Input
                                      id={`account-swift-${account.id}`}
                                      placeholder="TATRSKBX"
                                      value={account.swift || ''}
                                      onChange={(e) => updateBankAccount(location.id, account.id, 'swift', e.target.value)}
                                      className="h-8 text-sm"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            ))}
          </div>
          
          <Button 
            className="mt-4 gap-1"
            variant="outline"
            onClick={addLocation}
          >
            <Plus className="h-4 w-4" /> 
            Pridať ďalšiu prevádzku
          </Button>
        </div>
      </div>
    </StepContainer>
  );
};
