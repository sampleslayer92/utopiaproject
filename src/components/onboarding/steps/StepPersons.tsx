
import React from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";

export const StepPersons: React.FC = () => {
  const { data, updateObchodnaOsoba, updateTechnickaOsoba, updateOpravnenaOsoba } = useOnboarding();
  const { obchodnaOsoba, technickaOsoba, opravnenaOsoba } = data;

  const handleObchodnaOsobaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateObchodnaOsoba({
      [e.target.name]: e.target.value
    });
  };

  const handleTechnickaOsobaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTechnickaOsoba({
      [e.target.name]: e.target.value
    });
  };

  const handleOpravnenaOsobaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateOpravnenaOsoba({
      [e.target.name]: e.target.value
    });
  };

  const handleTypDokladuChange = (value: string) => {
    updateOpravnenaOsoba({
      typDokladu: value as "Občiansky preukaz" | "Pas"
    });
  };

  const handlePolitickyExponovana = (checked: boolean) => {
    updateOpravnenaOsoba({
      politickyExponovana: checked
    });
  };

  return (
    <StepContainer
      title="Osoby"
      subtitle="Zadajte informácie o osobách spojených s vašou firmou."
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Obchodná osoba</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="meno-obchodna">Meno a priezvisko</Label>
              <Input
                id="meno-obchodna"
                name="meno"
                value={obchodnaOsoba.meno}
                onChange={handleObchodnaOsobaChange}
                placeholder="Zadajte meno a priezvisko"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email-obchodna">E-mail</Label>
              <Input
                id="email-obchodna"
                name="email"
                type="email"
                value={obchodnaOsoba.email}
                onChange={handleObchodnaOsobaChange}
                placeholder="Zadajte e-mailovú adresu"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="telefon-obchodna">Telefón</Label>
              <Input
                id="telefon-obchodna"
                name="telefon"
                value={obchodnaOsoba.telefon}
                onChange={handleObchodnaOsobaChange}
                placeholder="Zadajte telefónne číslo"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Technická osoba</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="meno-technicka">Meno a priezvisko</Label>
              <Input
                id="meno-technicka"
                name="meno"
                value={technickaOsoba.meno}
                onChange={handleTechnickaOsobaChange}
                placeholder="Zadajte meno a priezvisko"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email-technicka">E-mail</Label>
              <Input
                id="email-technicka"
                name="email"
                type="email"
                value={technickaOsoba.email}
                onChange={handleTechnickaOsobaChange}
                placeholder="Zadajte e-mailovú adresu"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="telefon-technicka">Telefón</Label>
              <Input
                id="telefon-technicka"
                name="telefon"
                value={technickaOsoba.telefon}
                onChange={handleTechnickaOsobaChange}
                placeholder="Zadajte telefónne číslo"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Oprávnená osoba (na podpis)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="meno">Meno a priezvisko</Label>
              <Input
                id="meno"
                name="meno"
                value={opravnenaOsoba.meno}
                onChange={handleOpravnenaOsobaChange}
                placeholder="Zadajte meno a priezvisko"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="funkcia">Funkcia</Label>
              <Input
                id="funkcia"
                name="funkcia"
                value={opravnenaOsoba.funkcia}
                onChange={handleOpravnenaOsobaChange}
                placeholder="Napr. konateľ, predseda predstavenstva"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={opravnenaOsoba.email}
                onChange={handleOpravnenaOsobaChange}
                placeholder="Zadajte e-mailovú adresu"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="telefon">Telefón</Label>
              <Input
                id="telefon"
                name="telefon"
                value={opravnenaOsoba.telefon}
                onChange={handleOpravnenaOsobaChange}
                placeholder="Zadajte telefónne číslo"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="datumNarodenia">Dátum narodenia</Label>
              <Input
                id="datumNarodenia"
                name="datumNarodenia"
                type="date"
                value={opravnenaOsoba.datumNarodenia}
                onChange={handleOpravnenaOsobaChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="rodneCislo">Rodné číslo</Label>
              <Input
                id="rodneCislo"
                name="rodneCislo"
                value={opravnenaOsoba.rodneCislo}
                onChange={handleOpravnenaOsobaChange}
                placeholder="Zadajte rodné číslo"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="obcianstvo">Občianstvo</Label>
              <Input
                id="obcianstvo"
                name="obcianstvo"
                value={opravnenaOsoba.obcianstvo}
                onChange={handleOpravnenaOsobaChange}
                placeholder="Zadajte občianstvo"
                className="mt-1"
              />
            </div>
            
            <div className="col-span-2">
              <Label htmlFor="adresaTrvalehoBydliska">Adresa trvalého pobytu</Label>
              <Input
                id="adresaTrvalehoBydliska"
                name="adresaTrvalehoBydliska"
                value={opravnenaOsoba.adresaTrvalehoBydliska}
                onChange={handleOpravnenaOsobaChange}
                placeholder="Zadajte adresu trvalého pobytu"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>Typ dokladu</Label>
              <RadioGroup
                value={opravnenaOsoba.typDokladu}
                onValueChange={handleTypDokladuChange}
                className="mt-1 flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Občiansky preukaz" id="obciansky" />
                  <Label htmlFor="obciansky" className="font-normal">Občiansky preukaz</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Pas" id="pas" />
                  <Label htmlFor="pas" className="font-normal">Pas</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="cisloDokladu">Číslo dokladu</Label>
              <Input
                id="cisloDokladu"
                name="cisloDokladu"
                value={opravnenaOsoba.cisloDokladu}
                onChange={handleOpravnenaOsobaChange}
                placeholder="Zadajte číslo dokladu"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="platnostDokladu">Platnosť dokladu</Label>
              <Input
                id="platnostDokladu"
                name="platnostDokladu"
                type="date"
                value={opravnenaOsoba.platnostDokladu}
                onChange={handleOpravnenaOsobaChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="statVydania">Štát vydania</Label>
              <Input
                id="statVydania"
                name="statVydania"
                value={opravnenaOsoba.statVydania}
                onChange={handleOpravnenaOsobaChange}
                placeholder="Zadajte štát vydania"
                className="mt-1"
              />
            </div>
            
            <div className="col-span-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="politickyExponovana"
                  checked={opravnenaOsoba.politickyExponovana}
                  onCheckedChange={handlePolitickyExponovana}
                />
                <Label htmlFor="politickyExponovana">Politicky exponovaná osoba</Label>
              </div>
              
              {opravnenaOsoba.politickyExponovana && (
                <p className="mt-2 text-sm text-amber-600 bg-amber-50 p-2 rounded">
                  Keďže oprávnená osoba je politicky exponovaná, v ďalšom kroku bude potrebné zadať skutočného majiteľa.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </StepContainer>
  );
};
