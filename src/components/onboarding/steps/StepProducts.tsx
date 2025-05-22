
import React, { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductWizard } from './ProductWizard';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const StepProducts: React.FC = () => {
  const { data, updateZariadenie, updateLicencia, updatePlatobnaMetoda, updateDoplnkovaSluzba } = useOnboarding();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('zariadenia');
  
  const handleZariadenieSelect = (id: string, selected: boolean) => {
    updateZariadenie(id, { selected });
  };

  const handleZariadeniePocet = (id: string, pocetKs: number) => {
    updateZariadenie(id, { pocetKs });
  };

  const handleZariadenieTypNakupu = (id: string, typNakupu: "Prenájom" | "Kúpa") => {
    updateZariadenie(id, { typNakupu });
  };

  const handleZariadenieViazanost = (id: string, viazanost: 12 | 24 | 36) => {
    updateZariadenie(id, { viazanost: Number(viazanost) as 12 | 24 | 36 });
  };

  const handleLicenciaSelect = (id: string, selected: boolean) => {
    updateLicencia(id, selected);
  };

  const handlePlatobnaMetodaSelect = (id: string, selected: boolean) => {
    updatePlatobnaMetoda(id, selected);
  };

  const handleDoplnkovaSluzbaSelect = (id: string, selected: boolean) => {
    updateDoplnkovaSluzba(id, selected);
  };
  
  return (
    <StepContainer
      title="Výber produktov a služieb"
      subtitle="Vyberte si z našej ponuky zariadení, licencií a platobných metód."
      helpText="V jednotlivých záložkách nájdete ponuku produktov a služieb."
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="zariadenia">Zariadenia</TabsTrigger>
          <TabsTrigger value="licencie">Licencie</TabsTrigger>
          <TabsTrigger value="platby">Platobné metódy</TabsTrigger>
          <TabsTrigger value="sluzby">Doplnkové služby</TabsTrigger>
        </TabsList>
        
        <TabsContent value="zariadenia" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.zariadenia.map((zariadenie) => (
              <Card key={zariadenie.id} className={zariadenie.selected ? 'border-2 border-utopia-600' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-lg">{zariadenie.nazov}</h3>
                    <Switch 
                      checked={zariadenie.selected}
                      onCheckedChange={(checked) => handleZariadenieSelect(zariadenie.id, checked)}
                    />
                  </div>
                  
                  {zariadenie.selected && (
                    <div className="space-y-3 mt-3 pt-3 border-t">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`pocet-${zariadenie.id}`}>Počet kusov</Label>
                          <Input
                            id={`pocet-${zariadenie.id}`}
                            type="number"
                            min="1"
                            value={zariadenie.pocetKs}
                            onChange={(e) => handleZariadeniePocet(zariadenie.id, parseInt(e.target.value))}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`typ-${zariadenie.id}`}>Typ nákupu</Label>
                          <Select 
                            value={zariadenie.typNakupu} 
                            onValueChange={(value) => handleZariadenieTypNakupu(zariadenie.id, value as "Prenájom" | "Kúpa")}
                          >
                            <SelectTrigger id={`typ-${zariadenie.id}`} className="mt-1">
                              <SelectValue placeholder="Vyberte typ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Prenájom">Prenájom</SelectItem>
                              <SelectItem value="Kúpa">Kúpa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      {zariadenie.typNakupu === "Prenájom" && (
                        <div>
                          <Label htmlFor={`viazanost-${zariadenie.id}`}>Viazanosť (mesiace)</Label>
                          <Select 
                            value={zariadenie.viazanost.toString()} 
                            onValueChange={(value) => handleZariadenieViazanost(zariadenie.id, value as unknown as 12 | 24 | 36)}
                          >
                            <SelectTrigger id={`viazanost-${zariadenie.id}`} className="mt-1">
                              <SelectValue placeholder="Vyberte viazanosť" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">12 mesiacov</SelectItem>
                              <SelectItem value="24">24 mesiacov</SelectItem>
                              <SelectItem value="36">36 mesiacov</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="licencie" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.licencie.map((licencia) => (
              <Card key={licencia.id} className={licencia.selected ? 'border-2 border-utopia-600' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{licencia.nazov}</h3>
                    <Switch 
                      checked={licencia.selected}
                      onCheckedChange={(checked) => handleLicenciaSelect(licencia.id, checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="platby" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.platobneMetody.map((metoda) => (
              <Card key={metoda.id} className={metoda.selected ? 'border-2 border-utopia-600' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{metoda.nazov}</h3>
                    <Switch 
                      checked={metoda.selected}
                      onCheckedChange={(checked) => handlePlatobnaMetodaSelect(metoda.id, checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sluzby" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.doplnkoveSluzby.map((sluzba) => (
              <Card key={sluzba.id} className={sluzba.selected ? 'border-2 border-utopia-600' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{sluzba.nazov}</h3>
                    <Switch 
                      checked={sluzba.selected}
                      onCheckedChange={(checked) => handleDoplnkovaSluzbaSelect(sluzba.id, checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-medium mb-2">Vybrané položky:</h3>
        <div className="flex flex-wrap gap-2">
          {data.zariadenia.filter(z => z.selected).map(zariadenie => (
            <Badge key={zariadenie.id} className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              {zariadenie.nazov} ({zariadenie.pocetKs}x)
            </Badge>
          ))}
          
          {data.licencie.filter(l => l.selected).map(licencia => (
            <Badge key={licencia.id} className="bg-green-100 text-green-700 hover:bg-green-200">
              {licencia.nazov}
            </Badge>
          ))}
          
          {data.platobneMetody.filter(p => p.selected).map(metoda => (
            <Badge key={metoda.id} className="bg-purple-100 text-purple-700 hover:bg-purple-200">
              {metoda.nazov}
            </Badge>
          ))}
          
          {data.doplnkoveSluzby.filter(d => d.selected).map(sluzba => (
            <Badge key={sluzba.id} className="bg-amber-100 text-amber-700 hover:bg-amber-200">
              {sluzba.nazov}
            </Badge>
          ))}
          
          {data.zariadenia.filter(z => z.selected).length === 0 && 
           data.licencie.filter(l => l.selected).length === 0 && 
           data.platobneMetody.filter(p => p.selected).length === 0 && 
           data.doplnkoveSluzby.filter(d => d.selected).length === 0 && (
            <span className="text-gray-500 italic">Zatiaľ nemáte vybrané žiadne položky</span>
          )}
        </div>
      </div>
    </StepContainer>
  );
};
