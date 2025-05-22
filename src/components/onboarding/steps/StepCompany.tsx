
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { StepContainer } from '../StepContainer';

export const StepCompany: React.FC = () => {
  const { t } = useLanguage();
  const { data, updateCompanyInfo, isStepComplete } = useOnboarding();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = () => {
    if (!data.company.ico) {
      toast.error("Zadajte prosím IČO spoločnosti");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock data for demo
      const mockData = {
        nazovSpolocnosti: "EXAMPLE s.r.o.",
        dic: "2023456789",
        sidlo: "Hlavná 123, 831 01 Bratislava"
      };
      
      updateCompanyInfo(mockData);
      setIsLoading(false);
      toast.success("Spoločnosť bola úspešne nájdená");
    }, 1500);
  };
  
  return (
    <StepContainer
      title="Údaje o spoločnosti"
      subtitle="Zadajte základné informácie o vašej spoločnosti"
    >
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-700">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Údaje o spoločnosti</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="manualInput"
                checked={data.company.manualInput}
                onCheckedChange={(checked) => updateCompanyInfo({ manualInput: checked })}
              />
              <Label htmlFor="manualInput">Zadať údaje manuálne</Label>
            </div>
            
            {!data.company.manualInput ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ico">IČO spoločnosti</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="ico"
                      value={data.company.ico}
                      onChange={(e) => updateCompanyInfo({ ico: e.target.value })}
                      className="flex-1"
                      placeholder="Napr. 12345678"
                    />
                    <Button 
                      onClick={handleSearch}
                      disabled={isLoading}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4 mr-1" />
                      )}
                      Vyhľadať
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nazovSpolocnosti">Názov spoločnosti</Label>
                  <Input 
                    id="nazovSpolocnosti"
                    value={data.company.nazovSpolocnosti}
                    onChange={(e) => updateCompanyInfo({ nazovSpolocnosti: e.target.value })}
                    placeholder="Názov vašej spoločnosti"
                    readOnly={!data.company.manualInput}
                    className={!data.company.manualInput ? "bg-slate-50" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dic">DIČ</Label>
                  <Input 
                    id="dic"
                    value={data.company.dic}
                    onChange={(e) => updateCompanyInfo({ dic: e.target.value })}
                    placeholder="Napr. 2023456789"
                    readOnly={!data.company.manualInput}
                    className={!data.company.manualInput ? "bg-slate-50" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sidlo">Sídlo spoločnosti</Label>
                  <Input 
                    id="sidlo"
                    value={data.company.sidlo}
                    onChange={(e) => updateCompanyInfo({ sidlo: e.target.value })}
                    placeholder="Ulica, číslo, PSČ, mesto"
                    readOnly={!data.company.manualInput}
                    className={!data.company.manualInput ? "bg-slate-50" : ""}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nazovSpolocnosti">Názov spoločnosti</Label>
                  <Input 
                    id="nazovSpolocnosti"
                    value={data.company.nazovSpolocnosti}
                    onChange={(e) => updateCompanyInfo({ nazovSpolocnosti: e.target.value })}
                    placeholder="Názov vašej spoločnosti"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dic">DIČ</Label>
                  <Input 
                    id="dic"
                    value={data.company.dic}
                    onChange={(e) => updateCompanyInfo({ dic: e.target.value })}
                    placeholder="Napr. 2023456789"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sidlo">Sídlo spoločnosti</Label>
                  <Input 
                    id="sidlo"
                    value={data.company.sidlo}
                    onChange={(e) => updateCompanyInfo({ sidlo: e.target.value })}
                    placeholder="Ulica, číslo, PSČ, mesto"
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2 pt-4">
              <Checkbox 
                id="suhlasZOU" 
                checked={data.company.suhlasZOU || false}
                onCheckedChange={(checked) => updateCompanyInfo({ suhlasZOU: checked === true })}
              />
              <Label htmlFor="suhlasZOU" className="text-sm text-slate-700 dark:text-slate-300">
                Súhlasím so spracovaním osobných údajov v zmysle zákona o ochrane osobných údajov
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </StepContainer>
  );
};
