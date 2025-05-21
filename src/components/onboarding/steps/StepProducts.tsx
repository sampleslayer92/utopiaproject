
import React from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Check, CreditCard, Package, Server } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';

export const StepProducts: React.FC = () => {
  const { data, updateZariadenie, updateLicencia, updatePlatobnaMetoda, updateDoplnkovaSluzba } = useOnboarding();
  const { zariadenia, licencie, platobneMetody, doplnkoveSluzby } = data;

  const handleZariadenieToggle = (id: string, selected: boolean) => {
    updateZariadenie(id, { selected });
  };

  const handleZariadenieChange = (id: string, field: string, value: any) => {
    updateZariadenie(id, { [field]: value });
  };

  return (
    <StepContainer
      title="Výber produktov a služieb"
      subtitle="Vyberte si zariadenia, licencie a služby, ktoré potrebujete."
    >
      <Tabs defaultValue="zariadenia">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="zariadenia" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span>Zariadenia</span>
          </TabsTrigger>
          <TabsTrigger value="licencie" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span>Softvérové licencie</span>
          </TabsTrigger>
          <TabsTrigger value="platby" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Platobné možnosti</span>
          </TabsTrigger>
          <TabsTrigger value="doplnkove" className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span>Doplnkové služby</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Zariadenia */}
        <TabsContent value="zariadenia" className="animate-fade-in mt-0">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Zariadenia</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {zariadenia.map((zariadenie) => (
                  <div 
                    key={zariadenie.id}
                    onClick={() => handleZariadenieToggle(zariadenie.id, !zariadenie.selected)}
                    className={cn(
                      "utopia-product-card",
                      zariadenie.selected && "selected"
                    )}
                  >
                    {zariadenie.selected && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-utopia-500 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                    
                    <h4 className="font-medium">{zariadenie.nazov}</h4>
                    
                    {zariadenie.selected && (
                      <div className="mt-4 space-y-3 pt-4 border-t">
                        <div>
                          <Label htmlFor={`pocet-${zariadenie.id}`} className="text-xs text-gray-500">
                            Počet kusov
                          </Label>
                          <Input
                            id={`pocet-${zariadenie.id}`}
                            type="number"
                            min="1"
                            value={zariadenie.pocetKs}
                            onChange={(e) => handleZariadenieChange(zariadenie.id, 'pocetKs', parseInt(e.target.value) || 1)}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs text-gray-500">Typ</Label>
                          <RadioGroup
                            value={zariadenie.typNakupu}
                            onValueChange={(value) => handleZariadenieChange(zariadenie.id, 'typNakupu', value)}
                            onClick={(e) => e.stopPropagation()}
                            className="flex gap-4 mt-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Prenájom" id={`rent-${zariadenie.id}`} />
                              <Label htmlFor={`rent-${zariadenie.id}`} className="text-sm">Prenájom</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Kúpa" id={`buy-${zariadenie.id}`} />
                              <Label htmlFor={`buy-${zariadenie.id}`} className="text-sm">Kúpa</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label htmlFor={`viazanost-${zariadenie.id}`} className="text-xs text-gray-500">
                            Viazanosť
                          </Label>
                          <Select
                            value={zariadenie.viazanost.toString()}
                            onValueChange={(value) => handleZariadenieChange(zariadenie.id, 'viazanost', parseInt(value))}
                            onOpenChange={(open) => open && setTimeout(() => document.body.click(), 100)}
                          >
                            <SelectTrigger 
                              id={`viazanost-${zariadenie.id}`}
                              className="w-full mt-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <SelectValue placeholder="Vyberte obdobie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">12 mesiacov</SelectItem>
                              <SelectItem value="24">24 mesiacov</SelectItem>
                              <SelectItem value="36">36 mesiacov</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor={`frekvencia-${zariadenie.id}`} className="text-xs text-gray-500">
                            Frekvencia platby
                          </Label>
                          <Select
                            value={zariadenie.frekvenciaPlatby}
                            onValueChange={(value) => handleZariadenieChange(zariadenie.id, 'frekvenciaPlatby', value)}
                            onOpenChange={(open) => open && setTimeout(() => document.body.click(), 100)}
                          >
                            <SelectTrigger 
                              id={`frekvencia-${zariadenie.id}`}
                              className="w-full mt-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <SelectValue placeholder="Vyberte frekvenciu" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mesačne">mesačne</SelectItem>
                              <SelectItem value="ročne">ročne</SelectItem>
                              <SelectItem value="sezónne">sezónne</SelectItem>
                              <SelectItem value="z obratu">z obratu</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Licencie */}
        <TabsContent value="licencie" className="animate-fade-in mt-0">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Softvérové licencie</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {licencie.map((licencia) => (
                  <div
                    key={licencia.id}
                    onClick={() => updateLicencia(licencia.id, !licencia.selected)}
                    className={cn(
                      "utopia-service-tile h-24",
                      licencia.selected && "selected"
                    )}
                  >
                    {licencia.selected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-utopia-500 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                    
                    <p className="text-center text-sm">{licencia.nazov}</p>
                    
                    {licencia.id === 'iny-softver' && licencia.selected && (
                      <Input
                        placeholder="Zadajte názov softvéru"
                        className="mt-2 w-full text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Platobné možnosti */}
        <TabsContent value="platby" className="animate-fade-in mt-0">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Platobné možnosti</h3>
              
              <div className="flex flex-wrap gap-2">
                {platobneMetody.map((platba) => (
                  <div
                    key={platba.id}
                    onClick={() => updatePlatobnaMetoda(platba.id, !platba.selected)}
                    className={cn(
                      "utopia-payment-tag",
                      platba.selected && "selected"
                    )}
                  >
                    {platba.nazov}
                    
                    {platba.id === 'ina-brana' && platba.selected && (
                      <Input
                        placeholder="Zadajte názov brány"
                        className="mt-2 w-full"
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Doplnkové služby */}
        <TabsContent value="doplnkove" className="animate-fade-in mt-0">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Doplnkové služby</h3>
              
              <div className="space-y-3">
                {doplnkoveSluzby.map((sluzba) => (
                  <div key={sluzba.id} className="flex items-start">
                    <Checkbox 
                      id={sluzba.id}
                      checked={sluzba.selected}
                      onCheckedChange={(checked) => updateDoplnkovaSluzba(sluzba.id, checked === true)}
                      className="mt-1"
                    />
                    <div className="ml-3 space-y-1">
                      <Label 
                        htmlFor={sluzba.id}
                        className="font-normal"
                      >
                        {sluzba.nazov}
                      </Label>
                      
                      {sluzba.id === 'prepojenie-externy-softver' && sluzba.selected && (
                        <Input
                          placeholder="Zadajte názov externého softvéru"
                          className="mt-2 w-full"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <h3 className="font-medium text-lg mb-3">Vybrané položky</h3>
        <div className="flex flex-wrap gap-2">
          {zariadenia.filter(z => z.selected).map((zariadenie) => (
            <Badge key={zariadenie.id} className="bg-utopia-100 text-utopia-800 hover:bg-utopia-100">
              {zariadenie.nazov} ({zariadenie.pocetKs}x)
            </Badge>
          ))}
          
          {licencie.filter(l => l.selected).map((licencia) => (
            <Badge key={licencia.id} className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              {licencia.nazov}
            </Badge>
          ))}
          
          {platobneMetody.filter(p => p.selected).map((platba) => (
            <Badge key={platba.id} className="bg-purple-100 text-purple-800 hover:bg-purple-100">
              {platba.nazov}
            </Badge>
          ))}
          
          {doplnkoveSluzby.filter(d => d.selected).map((sluzba) => (
            <Badge key={sluzba.id} className="bg-green-100 text-green-800 hover:bg-green-100">
              {sluzba.nazov}
            </Badge>
          ))}
          
          {!zariadenia.some(z => z.selected) && 
           !licencie.some(l => l.selected) && 
           !platobneMetody.some(p => p.selected) && 
           !doplnkoveSluzby.some(d => d.selected) && (
            <p className="text-gray-500 text-sm italic">Žiadne položky neboli vybrané</p>
          )}
        </div>
      </div>
    </StepContainer>
  );
};
