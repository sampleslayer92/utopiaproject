
import React, { useState } from 'react';
import { StepContainer } from '../StepContainer';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export const StepCompany: React.FC = () => {
  const { data, updateCompanyInfo } = useOnboarding();
  const { company } = data;
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCompanyInfo({
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {
    if (!company.ico.trim()) {
      toast.error("Zadajte IČO pre vyhľadanie");
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock data for demo purposes
      if (company.ico === "12345678") {
        updateCompanyInfo({
          nazovSpolocnosti: "UKÁŽKOVÁ SPOLOČNOSŤ, s.r.o.",
          dic: "2023456789",
          icDph: "SK2023456789",
          sidlo: "Hlavná 123, 831 01 Bratislava",
          zapisVOrsr: "Obchodný register Okresného súdu Bratislava I, oddiel: Sro, vložka č. 12345/B"
        });
        toast.success("Spoločnosť nájdená");
      } else {
        toast.error("Spoločnosť s týmto IČO nebola nájdená");
      }
      setLoading(false);
    }, 800);
  };

  const toggleManualInput = (checked: boolean) => {
    updateCompanyInfo({ 
      manualInput: checked,
      // Clear read-only fields when switching to manual input
      ...(checked ? {
        nazovSpolocnosti: "",
        dic: "",
        icDph: "",
        sidlo: "",
        zapisVOrsr: ""
      } : {})
    });
  };

  return (
    <StepContainer
      title="Výber firmy"
      subtitle="Zadajte IČO firmy pre automatické vyplnenie údajov alebo vyplňte údaje manuálne."
    >
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {!company.manualInput ? (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Label htmlFor="ico">IČO spoločnosti</Label>
                    <Input
                      id="ico"
                      name="ico"
                      value={company.ico}
                      onChange={handleChange}
                      placeholder="Zadajte 8-miestne IČO"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={handleSearch} 
                      disabled={loading || !company.ico.trim()}
                      className="bg-utopia-600 hover:bg-utopia-700"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Hľadám...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Search className="h-4 w-4" />
                          Vyhľadať podľa IČO
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
                
                {company.nazovSpolocnosti && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-scale-in">
                    <div className="flex items-center gap-2 text-green-600 mb-3">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">Spoločnosť nájdená</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-gray-500">Názov spoločnosti</Label>
                        <p className="font-medium">{company.nazovSpolocnosti}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">DIČ</Label>
                        <p className="font-medium">{company.dic}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">IČ DPH</Label>
                        <p className="font-medium">{company.icDph}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Sídlo spoločnosti</Label>
                        <p className="font-medium">{company.sidlo}</p>
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs text-gray-500">Zapísaná v ORSR</Label>
                        <p className="font-medium">{company.zapisVOrsr}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nazovSpolocnosti">Názov spoločnosti</Label>
                  <Input
                    id="nazovSpolocnosti"
                    name="nazovSpolocnosti"
                    value={company.nazovSpolocnosti}
                    onChange={handleChange}
                    placeholder="Zadajte názov spoločnosti"
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ico">IČO</Label>
                    <Input
                      id="ico"
                      name="ico"
                      value={company.ico}
                      onChange={handleChange}
                      placeholder="Zadajte IČO"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dic">DIČ</Label>
                    <Input
                      id="dic"
                      name="dic"
                      value={company.dic}
                      onChange={handleChange}
                      placeholder="Zadajte DIČ"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="icDph">IČ DPH</Label>
                    <Input
                      id="icDph"
                      name="icDph"
                      value={company.icDph}
                      onChange={handleChange}
                      placeholder="Zadajte IČ DPH"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sidlo">Sídlo spoločnosti</Label>
                    <Input
                      id="sidlo"
                      name="sidlo"
                      value={company.sidlo}
                      onChange={handleChange}
                      placeholder="Zadajte sídlo spoločnosti"
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="zapisVOrsr">Zapísaná v ORSR</Label>
                    <Input
                      id="zapisVOrsr"
                      name="zapisVOrsr"
                      value={company.zapisVOrsr}
                      onChange={handleChange}
                      placeholder="Napr. Obchodný register Okresného súdu Bratislava I, oddiel: Sro, vložka č. 12345/B"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2 pt-4 border-t">
              <Switch
                id="manual-input"
                checked={company.manualInput}
                onCheckedChange={toggleManualInput}
              />
              <Label htmlFor="manual-input">Zadať firmu manuálne</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </StepContainer>
  );
};
