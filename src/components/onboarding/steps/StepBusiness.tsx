
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { StepContainer } from '../StepContainer';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Prevadzka, BankovyUcet } from '@/types/onboarding';

export const StepBusiness: React.FC = () => {
  const { t } = useLanguage();
  const { 
    data, 
    addPrevadzka, 
    updatePrevadzka, 
    removePrevadzka, 
    addBankovyUcet, 
    updateBankovyUcet, 
    removeBankovyUcet,
    nextStep, 
    prevStep,
    isStepComplete
  } = useOnboarding();
  
  // Track which collapsibles are open
  const [openPrevadzky, setOpenPrevadzky] = useState<Record<string, boolean>>({});
  const [openBankAccounts, setOpenBankAccounts] = useState<Record<string, boolean>>({});
  
  const togglePrevadzka = (id: string) => {
    setOpenPrevadzky(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const toggleBankAccounts = (id: string) => {
    setOpenBankAccounts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle using company data for location
  const handleUseCompanyData = (id: string, checked: boolean) => {
    if (checked) {
      updatePrevadzka(id, {
        pouzitFiremneUdaje: true,
        nazovPrevadzky: data.company.nazovSpolocnosti,
        adresaPrevadzky: data.company.sidlo,
        predmetPodnikania: data.company.predmetCinnosti || "",
        typPrevadzky: "Kamenná",
        otvaracieHodiny: "Po-Pia 9:00-17:00"
      });
    } else {
      updatePrevadzka(id, {
        pouzitFiremneUdaje: false
      });
    }
  };
  
  // Handle adding a new location
  const handleAddPrevadzka = () => {
    const newPrevadzka: Prevadzka = {
      id: uuidv4(),
      nazovPrevadzky: "",
      adresaPrevadzky: "",
      mesto: "",
      psc: "",
      telefon: "",
      email: "",
      typPrevadzky: "Kamenná",
      predmetPodnikania: "",
      otvaracieHodiny: "Po-Pia 9:00-17:00",
      sezonnost: false,
      trvanieSezony: 0,
      odhadovanyRocnyObrat: 0,
      priemernaVyskaTransakcie: 0,
      ocakavanyObratKariet: 0,
      hasWifi: false,
      hasSimCard: false,
      hasEthernet: false,
      pouzitFiremneUdaje: false,
      bankovyUcet: []
    };
    
    addPrevadzka(newPrevadzka);
    
    // Open the newly added prevadzka
    setOpenPrevadzky(prev => ({
      ...prev,
      [newPrevadzka.id]: true
    }));
  };
  
  // Handle adding a new bank account
  const handleAddBankAccount = (prevadzkaId: string) => {
    const newBankAccount: BankovyUcet = {
      id: uuidv4(),
      nazov: "",
      iban: "",
      mena: "EUR",
      swift: ""
    };
    
    addBankovyUcet(prevadzkaId, newBankAccount);
  };
  
  return (
    <StepContainer
      title={t('business.title')}
      subtitle={t('business.subtitle')}
    >
      <div className="space-y-6">
        {data.prevadzky && data.prevadzky.map((prevadzka, index) => (
          <Collapsible 
            key={prevadzka.id} 
            open={openPrevadzky[prevadzka.id]} 
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900"
          >
            <CollapsibleTrigger 
              asChild
              onClick={() => togglePrevadzka(prevadzka.id)}
            >
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800">
                <div className="flex items-center gap-4">
                  {openPrevadzky[prevadzka.id] ? 
                    <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  }
                  <h3 className="text-lg font-medium">
                    {prevadzka.nazovPrevadzky || t('business.location')}
                  </h3>
                </div>
                
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePrevadzka(prevadzka.id);
                    }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-4">
                {/* Use company data checkbox */}
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox 
                    id={`use-company-data-${prevadzka.id}`}
                    checked={prevadzka.pouzitFiremneUdaje}
                    onCheckedChange={(checked) => handleUseCompanyData(prevadzka.id, checked === true)}
                  />
                  <Label htmlFor={`use-company-data-${prevadzka.id}`}>
                    {t('business.useCompanyData')}
                  </Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Názov prevádzky */}
                  <div className="space-y-2">
                    <Label htmlFor={`nazov-prevadzky-${prevadzka.id}`}>
                      {t('business.locationName')}*
                    </Label>
                    <Input
                      id={`nazov-prevadzky-${prevadzka.id}`}
                      value={prevadzka.nazovPrevadzky}
                      onChange={(e) => updatePrevadzka(prevadzka.id, { nazovPrevadzky: e.target.value })}
                      placeholder={t('business.locationNamePlaceholder')}
                      disabled={prevadzka.pouzitFiremneUdaje}
                    />
                  </div>
                  
                  {/* Adresa prevádzky */}
                  <div className="space-y-2">
                    <Label htmlFor={`adresa-prevadzky-${prevadzka.id}`}>
                      {t('business.locationAddress')}*
                    </Label>
                    <Input
                      id={`adresa-prevadzky-${prevadzka.id}`}
                      value={prevadzka.adresaPrevadzky}
                      onChange={(e) => updatePrevadzka(prevadzka.id, { adresaPrevadzky: e.target.value })}
                      placeholder={t('business.locationAddressPlaceholder')}
                      disabled={prevadzka.pouzitFiremneUdaje}
                    />
                  </div>
                  
                  {/* Mesto */}
                  <div className="space-y-2">
                    <Label htmlFor={`mesto-${prevadzka.id}`}>
                      {t('business.city')}*
                    </Label>
                    <Input
                      id={`mesto-${prevadzka.id}`}
                      value={prevadzka.mesto}
                      onChange={(e) => updatePrevadzka(prevadzka.id, { mesto: e.target.value })}
                      placeholder={t('business.cityPlaceholder')}
                    />
                  </div>
                  
                  {/* PSČ */}
                  <div className="space-y-2">
                    <Label htmlFor={`psc-${prevadzka.id}`}>
                      {t('business.zipCode')}*
                    </Label>
                    <Input
                      id={`psc-${prevadzka.id}`}
                      value={prevadzka.psc}
                      onChange={(e) => updatePrevadzka(prevadzka.id, { psc: e.target.value })}
                      placeholder={t('business.zipCodePlaceholder')}
                    />
                  </div>
                  
                  {/* Telefón */}
                  <div className="space-y-2">
                    <Label htmlFor={`telefon-${prevadzka.id}`}>
                      {t('business.phone')}*
                    </Label>
                    <Input
                      id={`telefon-${prevadzka.id}`}
                      value={prevadzka.telefon}
                      onChange={(e) => updatePrevadzka(prevadzka.id, { telefon: e.target.value })}
                      placeholder={t('business.phonePlaceholder')}
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor={`email-${prevadzka.id}`}>
                      {t('business.email')}*
                    </Label>
                    <Input
                      id={`email-${prevadzka.id}`}
                      value={prevadzka.email}
                      onChange={(e) => updatePrevadzka(prevadzka.id, { email: e.target.value })}
                      placeholder={t('business.emailPlaceholder')}
                    />
                  </div>
                  
                  {/* Typ prevádzky */}
                  <div className="space-y-2">
                    <Label htmlFor={`typ-prevadzky-${prevadzka.id}`}>
                      {t('business.locationType')}
                    </Label>
                    <Select
                      value={prevadzka.typPrevadzky}
                      onValueChange={(value) => updatePrevadzka(prevadzka.id, { typPrevadzky: value as Prevadzka['typPrevadzky'] })}
                      disabled={prevadzka.pouzitFiremneUdaje}
                    >
                      <SelectTrigger id={`typ-prevadzky-${prevadzka.id}`}>
                        <SelectValue placeholder={t('business.selectLocationType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kamenná">{t('business.storeType')}</SelectItem>
                        <SelectItem value="Mobilná">{t('business.mobileType')}</SelectItem>
                        <SelectItem value="Online">{t('business.onlineType')}</SelectItem>
                        <SelectItem value="Iná">{t('business.otherType')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Otváracie hodiny */}
                  <div className="space-y-2">
                    <Label htmlFor={`otvaracie-hodiny-${prevadzka.id}`}>
                      {t('business.openingHours')}
                    </Label>
                    <Input
                      id={`otvaracie-hodiny-${prevadzka.id}`}
                      value={prevadzka.otvaracieHodiny}
                      onChange={(e) => updatePrevadzka(prevadzka.id, { otvaracieHodiny: e.target.value })}
                      placeholder={t('business.openingHoursPlaceholder')}
                      disabled={prevadzka.pouzitFiremneUdaje}
                    />
                  </div>
                </div>
                
                {/* Sezónna prevádzka */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id={`sezonnost-${prevadzka.id}`}
                      checked={prevadzka.sezonnost}
                      onCheckedChange={(checked) => updatePrevadzka(prevadzka.id, { sezonnost: checked })}
                    />
                    <Label htmlFor={`sezonnost-${prevadzka.id}`}>
                      {t('business.seasonal')}
                    </Label>
                  </div>
                  
                  {prevadzka.sezonnost && (
                    <div className="pl-8">
                      <div className="space-y-2">
                        <Label htmlFor={`trvanie-sezony-${prevadzka.id}`}>
                          {t('business.seasonLength')}
                        </Label>
                        <Input
                          id={`trvanie-sezony-${prevadzka.id}`}
                          type="number"
                          min="1"
                          max="12"
                          value={prevadzka.trvanieSezony}
                          onChange={(e) => updatePrevadzka(prevadzka.id, { trvanieSezony: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Odhadovaný ročný obrat */}
                  <div className="space-y-2">
                    <Label htmlFor={`rocny-obrat-${prevadzka.id}`}>
                      {t('business.yearlyTurnover')}
                    </Label>
                    <Input
                      id={`rocny-obrat-${prevadzka.id}`}
                      type="number"
                      value={prevadzka.odhadovanyRocnyObrat}
                      onChange={(e) => updatePrevadzka(prevadzka.id, { odhadovanyRocnyObrat: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  
                  {/* Priemerná výška transakcie */}
                  <div className="space-y-2">
                    <Label htmlFor={`priemerna-transakcia-${prevadzka.id}`}>
                      {t('business.averageTransaction')}
                    </Label>
                    <Input
                      id={`priemerna-transakcia-${prevadzka.id}`}
                      type="number"
                      value={prevadzka.priemernaVyskaTransakcie}
                      onChange={(e) => updatePrevadzka(prevadzka.id, { priemernaVyskaTransakcie: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  
                  {/* Očakávaný obrat platobných kariet */}
                  <div className="space-y-2">
                    <Label htmlFor={`ocakavany-obrat-kariet-${prevadzka.id}`}>
                      {t('business.expectedCardTurnover')}
                    </Label>
                    <Input
                      id={`ocakavany-obrat-kariet-${prevadzka.id}`}
                      type="number"
                      value={prevadzka.ocakavanyObratKariet}
                      onChange={(e) => updatePrevadzka(prevadzka.id, { ocakavanyObratKariet: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                
                {/* Predmet podnikania */}
                <div className="space-y-2">
                  <Label htmlFor={`predmet-podnikania-${prevadzka.id}`}>
                    {t('business.businessSubject')}
                  </Label>
                  <Textarea
                    id={`predmet-podnikania-${prevadzka.id}`}
                    value={prevadzka.predmetPodnikania}
                    onChange={(e) => updatePrevadzka(prevadzka.id, { predmetPodnikania: e.target.value })}
                    placeholder={t('business.businessSubjectPlaceholder')}
                    disabled={prevadzka.pouzitFiremneUdaje}
                    className="min-h-[80px]"
                  />
                </div>
                
                {/* Pripojenie */}
                <div className="space-y-2">
                  <Label className="block mb-2">
                    {t('business.connection')}
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`wifi-${prevadzka.id}`}
                        checked={prevadzka.hasWifi}
                        onCheckedChange={(checked) => updatePrevadzka(prevadzka.id, { hasWifi: checked === true })}
                      />
                      <Label htmlFor={`wifi-${prevadzka.id}`}>{t('business.wifi')}</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`sim-${prevadzka.id}`}
                        checked={prevadzka.hasSimCard}
                        onCheckedChange={(checked) => updatePrevadzka(prevadzka.id, { hasSimCard: checked === true })}
                      />
                      <Label htmlFor={`sim-${prevadzka.id}`}>{t('business.simCard')}</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`ethernet-${prevadzka.id}`}
                        checked={prevadzka.hasEthernet}
                        onCheckedChange={(checked) => updatePrevadzka(prevadzka.id, { hasEthernet: checked === true })}
                      />
                      <Label htmlFor={`ethernet-${prevadzka.id}`}>{t('business.ethernet')}</Label>
                    </div>
                  </div>
                </div>
                
                {/* Bank Accounts Section */}
                <Collapsible
                  open={openBankAccounts[prevadzka.id]}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mt-4"
                >
                  <CollapsibleTrigger 
                    asChild
                    onClick={() => toggleBankAccounts(prevadzka.id)}
                  >
                    <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 bg-gray-50 dark:bg-slate-800">
                      <div className="flex items-center gap-2">
                        {openBankAccounts[prevadzka.id] ? 
                          <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        }
                        <h4 className="text-md font-medium">
                          {t('business.bankAccounts')}
                        </h4>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="px-4 py-3 bg-white dark:bg-slate-900">
                    <div className="space-y-4">
                      {prevadzka.bankovyUcet && prevadzka.bankovyUcet.map((ucet) => (
                        <div key={ucet.id} className="border border-gray-200 dark:border-gray-700 rounded-md p-3 relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBankovyUcet(prevadzka.id, ucet.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Názov účtu */}
                            <div className="space-y-2">
                              <Label htmlFor={`nazov-uctu-${ucet.id}`}>
                                {t('business.accountName')}
                              </Label>
                              <Input
                                id={`nazov-uctu-${ucet.id}`}
                                value={ucet.nazov}
                                onChange={(e) => updateBankovyUcet(prevadzka.id, ucet.id, { nazov: e.target.value })}
                                placeholder={t('business.accountNamePlaceholder')}
                              />
                            </div>
                            
                            {/* IBAN */}
                            <div className="space-y-2">
                              <Label htmlFor={`iban-${ucet.id}`}>
                                {t('business.iban')}*
                              </Label>
                              <Input
                                id={`iban-${ucet.id}`}
                                value={ucet.iban}
                                onChange={(e) => updateBankovyUcet(prevadzka.id, ucet.id, { iban: e.target.value })}
                                placeholder={t('business.ibanPlaceholder')}
                              />
                            </div>
                            
                            {/* Mena */}
                            <div className="space-y-2">
                              <Label htmlFor={`mena-${ucet.id}`}>
                                {t('business.currency')}*
                              </Label>
                              <Select
                                value={ucet.mena}
                                onValueChange={(value) => updateBankovyUcet(prevadzka.id, ucet.id, { mena: value })}
                              >
                                <SelectTrigger id={`mena-${ucet.id}`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="CZK">CZK</SelectItem>
                                  <SelectItem value="GBP">GBP</SelectItem>
                                  <SelectItem value="HUF">HUF</SelectItem>
                                  <SelectItem value="PLN">PLN</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {/* SWIFT/BIC */}
                            <div className="space-y-2">
                              <Label htmlFor={`swift-${ucet.id}`}>
                                {t('business.swift')} ({t('business.optional')})
                              </Label>
                              <Input
                                id={`swift-${ucet.id}`}
                                value={ucet.swift || ''}
                                onChange={(e) => updateBankovyUcet(prevadzka.id, ucet.id, { swift: e.target.value })}
                                placeholder={t('business.swiftPlaceholder')}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button
                        variant="outline"
                        onClick={() => handleAddBankAccount(prevadzka.id)}
                        className="w-full mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {t('business.addBankAccount')}
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
        
        <Button
          variant="outline"
          onClick={handleAddPrevadzka}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('business.addLocation')}
        </Button>
      </div>
    </StepContainer>
  );
};
