
import React from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(value);
  };

  return (
    <StepContainer
      title="Údaje o prevádzke"
      subtitle="Zadajte informácie o vašej prevádzke."
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Adresa a kontakt</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nazovPrevadzky">Názov prevádzky</Label>
              <Input
                id="nazovPrevadzky"
                name="nazovPrevadzky"
                value={business.nazovPrevadzky}
                onChange={handleChange}
                placeholder="Zadajte názov prevádzky"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="adresaPrevadzky">Adresa prevádzky</Label>
              <Input
                id="adresaPrevadzky"
                name="adresaPrevadzky"
                value={business.adresaPrevadzky}
                onChange={handleChange}
                placeholder="Zadajte adresu prevádzky"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="mesto">Mesto</Label>
              <Input
                id="mesto"
                name="mesto"
                value={business.mesto}
                onChange={handleChange}
                placeholder="Zadajte mesto"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="psc">PSČ</Label>
              <Input
                id="psc"
                name="psc"
                value={business.psc}
                onChange={handleChange}
                placeholder="Zadajte PSČ"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="telefon">Telefón</Label>
              <Input
                id="telefon"
                name="telefon"
                value={business.telefon}
                onChange={handleChange}
                placeholder="Zadajte telefónne číslo"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={business.email}
                onChange={handleChange}
                placeholder="Zadajte e-mailovú adresu"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Typ a obrat</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="typPrevadzky">Typ prevádzky</Label>
              <Select 
                value={business.typPrevadzky} 
                onValueChange={handleTypChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Vyberte typ prevádzky" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kamenná">Kamenná</SelectItem>
                  <SelectItem value="Mobilná">Mobilná</SelectItem>
                  <SelectItem value="Sezónna">Sezónna</SelectItem>
                  <SelectItem value="Iné">Iné</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="predmetPodnikania">Predmet podnikania</Label>
              <Input
                id="predmetPodnikania"
                name="predmetPodnikania"
                value={business.predmetPodnikania}
                onChange={handleChange}
                placeholder="Zadajte predmet podnikania alebo MCC kód"
                className="mt-1"
              />
            </div>
            
            <div className="col-span-2">
              <Label htmlFor="otvaracieHodiny">Otváracie hodiny</Label>
              <Textarea
                id="otvaracieHodiny"
                name="otvaracieHodiny"
                value={business.otvaracieHodiny}
                onChange={handleChange}
                placeholder="Zadajte otváracie hodiny"
                className="mt-1 h-24"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="sezonnost"
                checked={business.sezonnost}
                onCheckedChange={handleSezonnostChange}
              />
              <Label htmlFor="sezonnost">Sezónnosť prevádzky</Label>
            </div>
            
            {business.sezonnost && (
              <div>
                <Label htmlFor="trvanieSezony">Trvanie sezóny (týždne)</Label>
                <Input
                  id="trvanieSezony"
                  name="trvanieSezony"
                  type="number"
                  min="1"
                  max="52"
                  value={business.trvanieSezony}
                  onChange={handleNumberChange}
                  className="mt-1"
                />
              </div>
            )}
            
            <div className="col-span-2">
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <Label htmlFor="odhadovanyRocnyObrat">Odhadovaný ročný obrat</Label>
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
                    <p className="text-sm text-gray-500 mt-1">{formatCurrency(business.odhadovanyRocnyObrat)}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="priemernaVyskaTransakcie">Priemerná výška transakcie</Label>
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
                    <p className="text-sm text-gray-500 mt-1">{formatCurrency(business.priemernaVyskaTransakcie)}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="ocakavanyObratKariet">Očakávaný obrat z kariet</Label>
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
                    <p className="text-sm text-gray-500 mt-1">{formatCurrency(business.ocakavanyObratKariet)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </StepContainer>
  );
};
