
import React, { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Upload, File } from 'lucide-react';
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
import { toast } from 'sonner';
import { OpravnenaOsoba } from '@/types/onboarding';

export const StepPersons: React.FC = () => {
  const { data, updateObchodnaOsoba, updateTechnickaOsoba, addOpravnenaOsoba, updateOpravnenaOsoba, removeOpravnenaOsoba } = useOnboarding();
  const { obchodnaOsoba, technickaOsoba, opravneneOsoby } = data;
  const [activeIndex, setActiveIndex] = useState(0);

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
    updateOpravnenaOsoba(activeIndex, {
      [e.target.name]: e.target.value
    });
  };

  const handleTypDokladuChange = (value: string) => {
    updateOpravnenaOsoba(activeIndex, {
      typDokladu: value as "Občiansky preukaz" | "Pas"
    });
  };

  const handlePolitickyExponovana = (checked: boolean) => {
    updateOpravnenaOsoba(activeIndex, {
      politickyExponovana: checked
    });
  };

  const handleAddOpravnenaOsoba = () => {
    if (opravneneOsoby.length >= 4) {
      toast.error("Maximálny počet oprávnených osôb je 4");
      return;
    }

    const newOpravnenaOsoba: OpravnenaOsoba = {
      meno: "",
      email: "",
      telefon: "",
      funkcia: "",
      datumNarodenia: "",
      rodneCislo: "",
      obcianstvo: "Slovenské",
      adresaTrvalehoBydliska: "",
      typDokladu: "Občiansky preukaz",
      cisloDokladu: "",
      platnostDokladu: "",
      statVydania: "Slovenská republika",
      politickyExponovana: false
    };
    
    addOpravnenaOsoba(newOpravnenaOsoba);
    setActiveIndex(opravneneOsoby.length);
  };

  const handleRemoveOpravnenaOsoba = (index: number) => {
    if (opravneneOsoby.length <= 1) {
      toast.error("Musí zostať aspoň jedna oprávnená osoba");
      return;
    }
    
    removeOpravnenaOsoba(index);
    setActiveIndex(Math.max(0, index - 1));
  };

  const handleFileUpload = (type: 'dokumentId' | 'dokumentVypis') => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/png, image/jpeg, application/pdf';
    
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        
        // In a real app, you would upload this file to a server
        // For this demo, we'll just store the file name
        updateOpravnenaOsoba(activeIndex, {
          [type]: file.name
        });
        
        toast.success(`Dokument ${file.name} bol nahratý`);
      }
    };
    
    fileInput.click();
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
      
      <div className="mb-6 flex flex-wrap gap-2">
        {opravneneOsoby.map((_, index) => (
          <Button
            key={index}
            variant={activeIndex === index ? "default" : "outline"}
            onClick={() => setActiveIndex(index)}
            className="flex-grow-0"
          >
            Oprávnená osoba {index + 1}
          </Button>
        ))}
        
        {opravneneOsoby.length < 4 && (
          <Button 
            variant="outline" 
            onClick={handleAddOpravnenaOsoba}
            className="flex items-center gap-1"
          >
            <PlusCircle size={16} />
            Pridať osobu
          </Button>
        )}
      </div>
      
      {opravneneOsoby.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Oprávnená osoba {activeIndex + 1} (na podpis)</h3>
              {opravneneOsoby.length > 1 && (
                <Button
                  variant="outline"
                  onClick={() => handleRemoveOpravnenaOsoba(activeIndex)}
                  className="text-red-500 border-red-200 hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-1" />
                  Odstrániť
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="meno">Meno a priezvisko</Label>
                <Input
                  id="meno"
                  name="meno"
                  value={opravneneOsoby[activeIndex]?.meno || ""}
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
                  value={opravneneOsoby[activeIndex]?.funkcia || ""}
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
                  value={opravneneOsoby[activeIndex]?.email || ""}
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
                  value={opravneneOsoby[activeIndex]?.telefon || ""}
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
                  value={opravneneOsoby[activeIndex]?.datumNarodenia || ""}
                  onChange={handleOpravnenaOsobaChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="rodneCislo">Rodné číslo</Label>
                <Input
                  id="rodneCislo"
                  name="rodneCislo"
                  value={opravneneOsoby[activeIndex]?.rodneCislo || ""}
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
                  value={opravneneOsoby[activeIndex]?.obcianstvo || ""}
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
                  value={opravneneOsoby[activeIndex]?.adresaTrvalehoBydliska || ""}
                  onChange={handleOpravnenaOsobaChange}
                  placeholder="Zadajte adresu trvalého pobytu"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Typ dokladu</Label>
                <RadioGroup
                  value={opravneneOsoby[activeIndex]?.typDokladu || "Občiansky preukaz"}
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
                  value={opravneneOsoby[activeIndex]?.cisloDokladu || ""}
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
                  value={opravneneOsoby[activeIndex]?.platnostDokladu || ""}
                  onChange={handleOpravnenaOsobaChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="statVydania">Štát vydania</Label>
                <Input
                  id="statVydania"
                  name="statVydania"
                  value={opravneneOsoby[activeIndex]?.statVydania || ""}
                  onChange={handleOpravnenaOsobaChange}
                  placeholder="Zadajte štát vydania"
                  className="mt-1"
                />
              </div>

              {/* Document Upload Section */}
              <div className="col-span-3 mt-4 border-t pt-4">
                <h4 className="font-medium mb-3">Nahrať doklady</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">Doklad totožnosti</Label>
                    <div className="flex items-center gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleFileUpload('dokumentId')}
                        className="flex items-center gap-2"
                      >
                        <Upload size={16} />
                        Nahrať doklad
                      </Button>
                      {opravneneOsoby[activeIndex]?.dokumentId && (
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded text-sm">
                          <File size={16} />
                          <span>{opravneneOsoby[activeIndex].dokumentId}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Povolené formáty: JPG, PNG, PDF</p>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Výpis z obchodného registra</Label>
                    <div className="flex items-center gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleFileUpload('dokumentVypis')}
                        className="flex items-center gap-2"
                      >
                        <Upload size={16} />
                        Nahrať výpis
                      </Button>
                      {opravneneOsoby[activeIndex]?.dokumentVypis && (
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded text-sm">
                          <File size={16} />
                          <span>{opravneneOsoby[activeIndex].dokumentVypis}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Povolené formáty: JPG, PNG, PDF</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="politickyExponovana"
                    checked={opravneneOsoby[activeIndex]?.politickyExponovana || false}
                    onCheckedChange={handlePolitickyExponovana}
                  />
                  <Label htmlFor="politickyExponovana">Politicky exponovaná osoba</Label>
                </div>
                
                {opravneneOsoby[activeIndex]?.politickyExponovana && (
                  <p className="mt-2 text-sm text-amber-600 bg-amber-50 p-2 rounded">
                    Keďže oprávnená osoba je politicky exponovaná, v ďalšom kroku bude potrebné zadať skutočného majiteľa.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </StepContainer>
  );
};
