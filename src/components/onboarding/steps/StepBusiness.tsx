
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { StepContainer } from '../StepContainer';
import { BackButton } from '../BackButton';
import { NextButton } from '../NextButton';
import { SaveContinueLater } from '../SaveContinueLater';

export const StepBusiness: React.FC = () => {
  const { t } = useLanguage();
  const { data, updateBusinessInfo, nextStep, prevStep, isStepComplete } = useOnboarding();
  
  return (
    <StepContainer>
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-700">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-6">Údaje o prevádzke</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nazovPrevadzky">Názov prevádzky</Label>
                <Input 
                  id="nazovPrevadzky"
                  value={data.business.nazovPrevadzky}
                  onChange={(e) => updateBusinessInfo({ nazovPrevadzky: e.target.value })}
                  placeholder="Názov vašej prevádzky"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adresaPrevadzky">Adresa prevádzky</Label>
                <Input 
                  id="adresaPrevadzky"
                  value={data.business.adresaPrevadzky}
                  onChange={(e) => updateBusinessInfo({ adresaPrevadzky: e.target.value })}
                  placeholder="Ulica, číslo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mesto">Mesto</Label>
                <Input 
                  id="mesto"
                  value={data.business.mesto}
                  onChange={(e) => updateBusinessInfo({ mesto: e.target.value })}
                  placeholder="Mesto"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="psc">PSČ</Label>
                <Input 
                  id="psc"
                  value={data.business.psc}
                  onChange={(e) => updateBusinessInfo({ psc: e.target.value })}
                  placeholder="PSČ"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="telefon">Telefónne číslo prevádzky</Label>
                <Input 
                  id="telefon"
                  value={data.business.telefon}
                  onChange={(e) => updateBusinessInfo({ telefon: e.target.value })}
                  placeholder="+421"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail prevádzky</Label>
                <Input 
                  id="email"
                  type="email"
                  value={data.business.email}
                  onChange={(e) => updateBusinessInfo({ email: e.target.value })}
                  placeholder="info@nazovprevadzky.sk"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="poznamka">Poznámka</Label>
              <Input 
                id="poznamka"
                value={data.business.poznamka}
                onChange={(e) => updateBusinessInfo({ poznamka: e.target.value })}
                placeholder="Doplnkové informácie"
              />
            </div>
          </div>
          
          <div className="flex justify-between mt-10">
            <BackButton onClick={prevStep} />
            <SaveContinueLater />
            <NextButton 
              onClick={nextStep}
              disabled={!isStepComplete('business')}
            />
          </div>
        </CardContent>
      </Card>
    </StepContainer>
  );
};
