
import React, { createContext, useContext, useState } from 'react';
import { 
  OnboardingContextType, 
  OnboardingData, 
  OnboardingStep,
  CompanyInfo,
  BusinessInfo,
  Osoba,
  OpravnenaOsoba,
  SkutocnyMajitel,
  FakturacneUdaje,
  PodpisSuhlasy,
  defaultOnboardingData
} from '@/types/onboarding';

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('company');
  const [data, setData] = useState<OnboardingData>(defaultOnboardingData);

  const setStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setData(prev => ({
      ...prev,
      company: { ...prev.company, ...info }
    }));
  };

  const updateBusinessInfo = (info: Partial<BusinessInfo>) => {
    setData(prev => ({
      ...prev,
      business: { ...prev.business, ...info }
    }));
  };

  const updateZariadenie = (id: string, info: Partial<Zariadenie>) => {
    setData(prev => ({
      ...prev,
      zariadenia: prev.zariadenia.map(z => 
        z.id === id ? { ...z, ...info } : z
      )
    }));
  };

  const updateLicencia = (id: string, selected: boolean) => {
    setData(prev => ({
      ...prev,
      licencie: prev.licencie.map(l => 
        l.id === id ? { ...l, selected } : l
      )
    }));
  };

  const updatePlatobnaMetoda = (id: string, selected: boolean, value?: string) => {
    setData(prev => ({
      ...prev,
      platobneMetody: prev.platobneMetody.map(p => 
        p.id === id ? { ...p, selected, value: value || p.value } : p
      )
    }));
  };

  const updateDoplnkovaSluzba = (id: string, selected: boolean, value?: string) => {
    setData(prev => ({
      ...prev,
      doplnkoveSluzby: prev.doplnkoveSluzby.map(d => 
        d.id === id ? { ...d, selected, value: value || d.value } : d
      )
    }));
  };

  const updateObchodnaOsoba = (info: Partial<Osoba>) => {
    setData(prev => ({
      ...prev,
      obchodnaOsoba: { ...prev.obchodnaOsoba, ...info }
    }));
  };

  const updateTechnickaOsoba = (info: Partial<Osoba>) => {
    setData(prev => ({
      ...prev,
      technickaOsoba: { ...prev.technickaOsoba, ...info }
    }));
  };

  const updateOpravnenaOsoba = (info: Partial<OpravnenaOsoba>) => {
    setData(prev => ({
      ...prev,
      opravnenaOsoba: { ...prev.opravnenaOsoba, ...info }
    }));
  };

  const addSkutocnyMajitel = (majitel: SkutocnyMajitel) => {
    setData(prev => ({
      ...prev,
      skutocniMajitelia: [...prev.skutocniMajitelia, majitel]
    }));
  };

  const updateSkutocnyMajitel = (index: number, info: Partial<SkutocnyMajitel>) => {
    setData(prev => ({
      ...prev,
      skutocniMajitelia: prev.skutocniMajitelia.map((m, i) => 
        i === index ? { ...m, ...info } : m
      )
    }));
  };

  const removeSkutocnyMajitel = (index: number) => {
    setData(prev => ({
      ...prev,
      skutocniMajitelia: prev.skutocniMajitelia.filter((_, i) => i !== index)
    }));
  };

  const updateFakturacneUdaje = (info: Partial<FakturacneUdaje>) => {
    setData(prev => ({
      ...prev,
      fakturacneUdaje: { ...prev.fakturacneUdaje, ...info }
    }));
  };

  const updatePodpisSuhlasy = (info: Partial<PodpisSuhlasy>) => {
    setData(prev => ({
      ...prev,
      podpisSuhlasy: { ...prev.podpisSuhlasy, ...info }
    }));
  };

  const nextStep = () => {
    switch (currentStep) {
      case 'company':
        setCurrentStep('business');
        break;
      case 'business':
        setCurrentStep('products');
        break;
      case 'products':
        setCurrentStep('persons');
        break;
      case 'persons':
        setCurrentStep(
          data.opravnenaOsoba.politickyExponovana ? 'beneficialOwners' : 'billing'
        );
        break;
      case 'beneficialOwners':
        setCurrentStep('billing');
        break;
      case 'billing':
        setCurrentStep('sign');
        break;
      case 'sign':
        // Final step - do nothing or handle completion
        break;
    }
  };

  const prevStep = () => {
    switch (currentStep) {
      case 'company':
        // Already at first step, do nothing
        break;
      case 'business':
        setCurrentStep('company');
        break;
      case 'products':
        setCurrentStep('business');
        break;
      case 'persons':
        setCurrentStep('products');
        break;
      case 'beneficialOwners':
        setCurrentStep('persons');
        break;
      case 'billing':
        setCurrentStep(
          data.opravnenaOsoba.politickyExponovana ? 'beneficialOwners' : 'persons'
        );
        break;
      case 'sign':
        setCurrentStep('billing');
        break;
    }
  };

  const isStepComplete = (step: OnboardingStep): boolean => {
    switch (step) {
      case 'company': {
        const { ico, nazovSpolocnosti, dic, sidlo } = data.company;
        return data.company.manualInput 
          ? Boolean(nazovSpolocnosti && dic && sidlo)
          : Boolean(ico && nazovSpolocnosti && dic && sidlo);
      }
      case 'business': {
        const { nazovPrevadzky, adresaPrevadzky, mesto, psc, telefon, email } = data.business;
        return Boolean(nazovPrevadzky && adresaPrevadzky && mesto && psc && telefon && email);
      }
      case 'products': {
        const hasZariadenie = data.zariadenia.some(z => z.selected);
        const hasLicencia = data.licencie.some(l => l.selected);
        const hasPlatobnaMetoda = data.platobneMetody.some(p => p.selected);
        return hasZariadenie || hasLicencia || hasPlatobnaMetoda;
      }
      case 'persons': {
        const { meno: obchodne, email: obchodnyEmail, telefon: obchodnyTelefon } = data.obchodnaOsoba;
        const { meno: technicke, email: technickyEmail, telefon: technickyTelefon } = data.technickaOsoba;
        const { 
          meno, funkcia, datumNarodenia, rodneCislo, obcianstvo, 
          adresaTrvalehoBydliska, cisloDokladu, platnostDokladu 
        } = data.opravnenaOsoba;
        
        return Boolean(
          obchodne && obchodnyEmail && obchodnyTelefon &&
          technicke && technickyEmail && technickyTelefon &&
          meno && funkcia && datumNarodenia && rodneCislo && 
          obcianstvo && adresaTrvalehoBydliska && cisloDokladu && platnostDokladu
        );
      }
      case 'beneficialOwners': {
        return data.skutocniMajitelia.length > 0 && data.skutocniMajitelia.every(
          ({ menoAPriezvisko, datumNarodenia, trvalyPobyt, obcianstvo, vztahKObchodnikovi }) => 
            Boolean(menoAPriezvisko && datumNarodenia && trvalyPobyt && obcianstvo && vztahKObchodnikovi)
        );
      }
      case 'billing': {
        const { fakturacnyEmail, fakturacnaAdresa, iban, sposobUhrady } = data.fakturacneUdaje;
        return Boolean(fakturacnyEmail && fakturacnaAdresa && iban && sposobUhrady);
      }
      case 'sign': {
        const { gdpr, obchodnePodmienky, dorucovanieElektronicky } = data.podpisSuhlasy;
        return gdpr && obchodnePodmienky && dorucovanieElektronicky;
      }
    }
  };

  const value: OnboardingContextType = {
    currentStep,
    data,
    setStep,
    updateCompanyInfo,
    updateBusinessInfo,
    updateZariadenie,
    updateLicencia,
    updatePlatobnaMetoda,
    updateDoplnkovaSluzba,
    updateObchodnaOsoba,
    updateTechnickaOsoba,
    updateOpravnenaOsoba,
    addSkutocnyMajitel,
    updateSkutocnyMajitel,
    removeSkutocnyMajitel,
    updateFakturacneUdaje,
    updatePodpisSuhlasy,
    nextStep,
    prevStep,
    isStepComplete
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
