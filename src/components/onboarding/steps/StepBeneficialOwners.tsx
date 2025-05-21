
import React, { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkutocnyMajitel } from '@/types/onboarding';

export const StepBeneficialOwners: React.FC = () => {
  const { 
    data, 
    addSkutocnyMajitel, 
    updateSkutocnyMajitel, 
    removeSkutocnyMajitel 
  } = useOnboarding();
  const { skutocniMajitelia } = data;
  
  const [newMajitel, setNewMajitel] = useState<SkutocnyMajitel>({
    menoAPriezvisko: '',
    rodnePriezvisko: '',
    datumNarodenia: '',
    miestoNarodenia: '',
    trvalyPobyt: '',
    obcianstvo: 'Slovenské',
    politickyExponovana: false,
    vztahKObchodnikovi: ''
  });
  
  const vztahy = [
    'Konečný užívateľ výhod',
    'Akcionár',
    'Spoločník',
    'Štatutárny orgán',
    'Člen dozornej rady',
    'Prokurista',
    'Splnomocnená osoba',
    'Iné'
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMajitel(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const handlePolitickyExponovana = (checked: boolean) => {
    setNewMajitel(prev => ({
      ...prev,
      politickyExponovana: checked
    }));
  };
  
  const handleVztahChange = (value: string) => {
    setNewMajitel(prev => ({
      ...prev,
      vztahKObchodnikovi: value
    }));
  };
  
  const handleAddMajitel = () => {
    addSkutocnyMajitel(newMajitel);
    setNewMajitel({
      menoAPriezvisko: '',
      rodnePriezvisko: '',
      datumNarodenia: '',
      miestoNarodenia: '',
      trvalyPobyt: '',
      obcianstvo: 'Slovenské',
      politickyExponovana: false,
      vztahKObchodnikovi: ''
    });
  };
  
  const canAddMajitel = 
    newMajitel.menoAPriezvisko && 
    newMajitel.datumNarodenia && 
    newMajitel.trvalyPobyt && 
    newMajitel.obcianstvo && 
    newMajitel.vztahKObchodnikovi;
  
  const maxMajitelov = skutocniMajitelia.length >= 4;

  return (
    <StepContainer
      title="Skutočný majiteľ (BO)"
      subtitle="Zadajte informácie o skutočnom majiteľovi vašej spoločnosti."
    >
      {skutocniMajitelia.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Pridaní majitelia</h3>
          
          {skutocniMajitelia.map((majitel, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4 relative">
                <button 
                  onClick={() => removeSkutocnyMajitel(index)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                
                <div className="flex items-start gap-3 mb-3">
                  <Badge 
                    className="mt-0.5 text-white bg-gray-700 hover:bg-gray-700"
                  >
                    {index + 1}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{majitel.menoAPriezvisko}</h4>
                    <p className="text-sm text-gray-500">{majitel.vztahKObchodnikovi}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs text-gray-500">Dátum narodenia</Label>
                    <p>{majitel.datumNarodenia}</p>
                  </div>
                  
                  <div>
                    <Label className="text-xs text-gray-500">Miesto narodenia</Label>
                    <p>{majitel.miestoNarodenia || "-"}</p>
                  </div>
                  
                  <div>
                    <Label className="text-xs text-gray-500">Občianstvo</Label>
                    <p>{majitel.obcianstvo}</p>
                  </div>
                  
                  <div className="col-span-3">
                    <Label className="text-xs text-gray-500">Trvalý pobyt</Label>
                    <p>{majitel.trvalyPobyt}</p>
                  </div>
                  
                  {majitel.politickyExponovana && (
                    <div className="col-span-3">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        Politicky exponovaná osoba
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {!maxMajitelov && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">
              {skutocniMajitelia.length === 0 ? "Pridať skutočného majiteľa" : "Pridať ďalšieho majiteľa"}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="menoAPriezvisko">Meno a priezvisko</Label>
                <Input
                  id="menoAPriezvisko"
                  name="menoAPriezvisko"
                  value={newMajitel.menoAPriezvisko}
                  onChange={handleInputChange}
                  placeholder="Zadajte meno a priezvisko"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="rodnePriezvisko">Rodné priezvisko</Label>
                <Input
                  id="rodnePriezvisko"
                  name="rodnePriezvisko"
                  value={newMajitel.rodnePriezvisko}
                  onChange={handleInputChange}
                  placeholder="Zadajte rodné priezvisko"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="datumNarodenia">Dátum narodenia</Label>
                <Input
                  id="datumNarodenia"
                  name="datumNarodenia"
                  type="date"
                  value={newMajitel.datumNarodenia}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="miestoNarodenia">Miesto narodenia</Label>
                <Input
                  id="miestoNarodenia"
                  name="miestoNarodenia"
                  value={newMajitel.miestoNarodenia}
                  onChange={handleInputChange}
                  placeholder="Zadajte miesto narodenia"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="obcianstvo">Občianstvo</Label>
                <Input
                  id="obcianstvo"
                  name="obcianstvo"
                  value={newMajitel.obcianstvo}
                  onChange={handleInputChange}
                  placeholder="Zadajte občianstvo"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="vztahKObchodnikovi">Vzťah k obchodníkovi</Label>
                <Select
                  value={newMajitel.vztahKObchodnikovi}
                  onValueChange={handleVztahChange}
                >
                  <SelectTrigger id="vztahKObchodnikovi" className="mt-1">
                    <SelectValue placeholder="Vyberte vzťah" />
                  </SelectTrigger>
                  <SelectContent>
                    {vztahy.map((vztah) => (
                      <SelectItem key={vztah} value={vztah}>{vztah}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="trvalyPobyt">Trvalý pobyt</Label>
                <Input
                  id="trvalyPobyt"
                  name="trvalyPobyt"
                  value={newMajitel.trvalyPobyt}
                  onChange={handleInputChange}
                  placeholder="Zadajte trvalý pobyt"
                  className="mt-1"
                />
              </div>
              
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="politickyExponovana"
                    checked={newMajitel.politickyExponovana}
                    onCheckedChange={handlePolitickyExponovana}
                  />
                  <Label htmlFor="politickyExponovana">Politicky exponovaná osoba (PEP)</Label>
                </div>
              </div>
              
              <div className="col-span-2">
                <Button
                  onClick={handleAddMajitel}
                  disabled={!canAddMajitel}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Pridať majiteľa
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {maxMajitelov && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700">
          Dosiahli ste maximálny počet skutočných majiteľov (4).
        </div>
      )}
    </StepContainer>
  );
};
