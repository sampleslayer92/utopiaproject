
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate as useReactRouterNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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
  defaultOnboardingData,
  Zariadenie
} from '@/types/onboarding';

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useReactRouterNavigate ? useReactRouterNavigate() : undefined;
  const { step } = useParams<{ step: string }>();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('company');
  const [data, setData] = useState<OnboardingData>(defaultOnboardingData);

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('utopiaOnboardingData');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, []);

  // Update current step based on URL parameter
  useEffect(() => {
    if (step && isValidStep(step)) {
      setCurrentStep(step as OnboardingStep);
    }
  }, [step]);

  const isValidStep = (step: string): boolean => {
    return ['company', 'business', 'products', 'persons', 'beneficialOwners', 'billing', 'sign'].includes(step);
  };

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('utopiaOnboardingData', JSON.stringify(data));
  }, [data]);

  const setStep = (step: OnboardingStep) => {
    setCurrentStep(step);
    if (navigate) {
      navigate(`/onboarding/${step}`);
    }
  };

  const saveProgress = () => {
    // In a real app, you would also save to backend
    localStorage.setItem('utopiaOnboardingData', JSON.stringify(data));
    toast.success("Progres uložený!", {
      description: "Môžete sa vrátiť neskôr a pokračovať."
    });
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
    if (!navigate) return;
    
    switch (currentStep) {
      case 'company':
        setStep('business');
        break;
      case 'business':
        setStep('products');
        break;
      case 'products':
        setStep('persons');
        break;
      case 'persons':
        setStep(
          data.opravnenaOsoba.politickyExponovana ? 'beneficialOwners' : 'billing'
        );
        break;
      case 'beneficialOwners':
        setStep('billing');
        break;
      case 'billing':
        setStep('sign');
        break;
      case 'sign':
        toast.success("Onboarding úspešne dokončený!");
        navigate('/dashboard');
        break;
    }
  };

  const prevStep = () => {
    if (!navigate) return;
    
    switch (currentStep) {
      case 'company':
        navigate('/dashboard');
        break;
      case 'business':
        setStep('company');
        break;
      case 'products':
        setStep('business');
        break;
      case 'persons':
        setStep('products');
        break;
      case 'beneficialOwners':
        setStep('persons');
        break;
      case 'billing':
        setStep(
          data.opravnenaOsoba.politickyExponovana ? 'beneficialOwners' : 'persons'
        );
        break;
      case 'sign':
        setStep('billing');
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
    isStepComplete,
    saveProgress
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
