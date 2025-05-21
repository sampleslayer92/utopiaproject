
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

export const StepBilling: React.FC = () => {
  const { data, updateFakturacneUdaje } = useOnboarding();
  const { fakturacneUdaje } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFakturacneUdaje({
      [e.target.name]: e.target.value
    });
  };

  const handleSposobUhradyChange = (value: string) => {
    updateFakturacneUdaje({
      sposobUhrady: value as "Faktúra" | "Strhnutie z obratu" | "Predfaktúra"
    });
  };

  const handleFrekvenciaChange = (value: string) => {
    updateFakturacneUdaje({
      frekvencia: value as "Mesačne" | "Ročne" | "Polročne"
    });
  };

  const handleSpolocnySubjektChange = (checked: boolean) => {
    updateFakturacneUdaje({
      spolocnySubjekt: checked
    });
  };

  const handleOdlisnyObjednavatelChange = (checked: boolean) => {
    updateFakturacneUdaje({
      odlisnyObjednavatel: checked
    });
  };

  return (
    <StepContainer
      title="Fakturačné údaje"
      subtitle="Zadajte údaje potrebné pre fakturáciu služieb."
    >
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fakturacnyEmail">Fakturačný e-mail</Label>
              <Input
                id="fakturacnyEmail"
                name="fakturacnyEmail"
                type="email"
                value={fakturacneUdaje.fakturacnyEmail}
                onChange={handleChange}
                placeholder="Zadajte fakturačný e-mail"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="iban">IBAN</Label>
              <Input
                id="iban"
                name="iban"
                value={fakturacneUdaje.iban}
                onChange={handleChange}
                placeholder="Zadajte IBAN"
                className="mt-1"
              />
            </div>
            
            <div className="col-span-2">
              <Label htmlFor="fakturacnaAdresa">Fakturačná adresa</Label>
              <Input
                id="fakturacnaAdresa"
                name="fakturacnaAdresa"
                value={fakturacneUdaje.fakturacnaAdresa}
                onChange={handleChange}
                placeholder="Zadajte fakturačnú adresu"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>Spôsob úhrady</Label>
              <RadioGroup
                value={fakturacneUdaje.sposobUhrady}
                onValueChange={handleSposobUhradyChange}
                className="mt-1 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Faktúra" id="faktura" />
                  <Label htmlFor="faktura" className="font-normal">Faktúra</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Strhnutie z obratu" id="strhnutie" />
                  <Label htmlFor="strhnutie" className="font-normal">Strhnutie z obratu</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Predfaktúra" id="predfaktura" />
                  <Label htmlFor="predfaktura" className="font-normal">Predfaktúra</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="frekvencia">Frekvencia</Label>
              <Select
                value={fakturacneUdaje.frekvencia}
                onValueChange={handleFrekvenciaChange}
              >
                <SelectTrigger id="frekvencia" className="mt-1">
                  <SelectValue placeholder="Vyberte frekvenciu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mesačne">Mesačne</SelectItem>
                  <SelectItem value="Ročne">Ročne</SelectItem>
                  <SelectItem value="Polročne">Polročne</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-2 space-y-4 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="spolocnySubjekt"
                  checked={fakturacneUdaje.spolocnySubjekt}
                  onCheckedChange={handleSpolocnySubjektChange}
                />
                <Label htmlFor="spolocnySubjekt">Spoločný subjekt pre viac prevádzok</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="odlisnyObjednavatel"
                  checked={fakturacneUdaje.odlisnyObjednavatel}
                  onCheckedChange={handleOdlisnyObjednavatelChange}
                />
                <Label htmlFor="odlisnyObjednavatel">Objednávateľ odlišný od obchodníka</Label>
              </div>
              
              {fakturacneUdaje.odlisnyObjednavatel && (
                <div className="bg-gray-50 rounded-lg p-4 animate-fade-in mt-3">
                  <p className="text-sm text-gray-600">
                    Vyplňte informácie o objednávateľovi v ďalšej časti procesu.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </StepContainer>
  );
};
