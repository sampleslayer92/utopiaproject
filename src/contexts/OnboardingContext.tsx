import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate as useReactRouterNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
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
  Zariadenie,
  Prevadzka,
  BankovyUcet
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
    setData(prev => {
      // If company data changes and we have prevadzky that use company data, update them
      if (prev.prevadzky && Array.isArray(prev.prevadzky)) {
        const updatedPrevadzky = prev.prevadzky.map(prevadzka => {
          if (prevadzka.pouzitFiremneUdaje) {
            return {
              ...prevadzka,
              nazovPrevadzky: info.nazovSpolocnosti || prevadzka.nazovPrevadzky,
              adresaPrevadzky: info.sidlo || prevadzka.adresaPrevadzky,
              predmetPodnikania: info.predmetCinnosti || prevadzka.predmetPodnikania
            };
          }
          return prevadzka;
        });
        
        return {
          ...prev,
          company: { ...prev.company, ...info },
          prevadzky: updatedPrevadzky
        };
      }
      
      return {
        ...prev,
        company: { ...prev.company, ...info }
      };
    });
  };

  const updateBusinessInfo = (info: Partial<BusinessInfo>) => {
    setData(prev => ({
      ...prev,
      business: { ...prev.business, ...info }
    }));
  };
  
  // Prevadzky management
  const addPrevadzka = (prevadzka: Prevadzka) => {
    const newPrevadzka = {
      ...prevadzka,
      id: prevadzka.id || uuidv4()
    };
    
    setData(prev => ({
      ...prev,
      prevadzky: Array.isArray(prev.prevadzky) ? [...prev.prevadzky, newPrevadzka] : [newPrevadzka]
    }));
  };
  
  const updatePrevadzka = (id: string, info: Partial<Prevadzka>) => {
    setData(prev => {
      const prevadzky = Array.isArray(prev.prevadzky) ? [...prev.prevadzky] : [];
      const index = prevadzky.findIndex(p => p.id === id);
      
      if (index !== -1) {
        // If pouzitFiremneUdaje is changing to true, update with company data
        if (info.pouzitFiremneUdaje === true && !prevadzky[index].pouzitFiremneUdaje) {
          prevadzky[index] = {
            ...prevadzky[index],
            ...info,
            nazovPrevadzky: prev.company.nazovSpolocnosti,
            adresaPrevadzky: prev.company.sidlo,
            predmetPodnikania: prev.company.predmetCinnosti || prevadzky[index].predmetPodnikania
          };
        } else {
          prevadzky[index] = { ...prevadzky[index], ...info };
        }
      }
      
      return { ...prev, prevadzky };
    });
  };
  
  const removePrevadzka = (id: string) => {
    setData(prev => ({
      ...prev,
      prevadzky: Array.isArray(prev.prevadzky) 
        ? prev.prevadzky.filter(p => p.id !== id)
        : []
    }));
  };
  
  // Bankovy ucet management
  const addBankovyUcet = (prevadzkaId: string, ucet: BankovyUcet) => {
    const newUcet = {
      ...ucet,
      id: ucet.id || uuidv4()
    };
    
    setData(prev => {
      const prevadzky = Array.isArray(prev.prevadzky) ? [...prev.prevadzky] : [];
      const index = prevadzky.findIndex(p => p.id === prevadzkaId);
      
      if (index !== -1) {
        const bankovyUcet = Array.isArray(prevadzky[index].bankovyUcet) 
          ? [...prevadzky[index].bankovyUcet, newUcet]
          : [newUcet];
          
        prevadzky[index] = { ...prevadzky[index], bankovyUcet };
      }
      
      return { ...prev, prevadzky };
    });
  };
  
  const updateBankovyUcet = (prevadzkaId: string, ucetId: string, info: Partial<BankovyUcet>) => {
    setData(prev => {
      const prevadzky = Array.isArray(prev.prevadzky) ? [...prev.prevadzky] : [];
      const prevadzkaIndex = prevadzky.findIndex(p => p.id === prevadzkaId);
      
      if (prevadzkaIndex !== -1) {
        const bankovyUcet = Array.isArray(prevadzky[prevadzkaIndex].bankovyUcet) 
          ? [...prevadzky[prevadzkaIndex].bankovyUcet] 
          : [];
          
        const ucetIndex = bankovyUcet.findIndex(u => u.id === ucetId);
        
        if (ucetIndex !== -1) {
          bankovyUcet[ucetIndex] = { ...bankovyUcet[ucetIndex], ...info };
          prevadzky[prevadzkaIndex] = { ...prevadzky[prevadzkaIndex], bankovyUcet };
        }
      }
      
      return { ...prev, prevadzky };
    });
  };
  
  const removeBankovyUcet = (prevadzkaId: string, ucetId: string) => {
    setData(prev => {
      const prevadzky = Array.isArray(prev.prevadzky) ? [...prev.prevadzky] : [];
      const prevadzkaIndex = prevadzky.findIndex(p => p.id === prevadzkaId);
      
      if (prevadzkaIndex !== -1) {
        const bankovyUcet = Array.isArray(prevadzky[prevadzkaIndex].bankovyUcet) 
          ? prevadzky[prevadzkaIndex].bankovyUcet.filter(u => u.id !== ucetId)
          : [];
          
        prevadzky[prevadzkaIndex] = { ...prevadzky[prevadzkaIndex], bankovyUcet };
      }
      
      return { ...prev, prevadzky };
    });
  };

  const updateZariadenie = (id: string, info: Partial<Zariadenie>) => {
    setData(prev => ({
      ...prev,
      zariadenia: Array.isArray(prev.zariadenia) ? prev.zariadenia.map(z => 
        z.id === id ? { ...z, ...info } : z
      ) : []
    }));
  };

  const updateLicencia = (id: string, selected: boolean) => {
    setData(prev => ({
      ...prev,
      licencie: Array.isArray(prev.licencie) ? prev.licencie.map(l => 
        l.id === id ? { ...l, selected } : l
      ) : []
    }));
  };

  const updatePlatobnaMetoda = (id: string, selected: boolean, value?: string) => {
    setData(prev => ({
      ...prev,
      platobneMetody: Array.isArray(prev.platobneMetody) ? prev.platobneMetody.map(p => 
        p.id === id ? { ...p, selected, value: value || p.value } : p
      ) : []
    }));
  };

  const updateDoplnkovaSluzba = (id: string, selected: boolean, value?: string) => {
    setData(prev => ({
      ...prev,
      doplnkoveSluzby: Array.isArray(prev.doplnkoveSluzby) ? prev.doplnkoveSluzby.map(d => 
        d.id === id ? { ...d, selected, value: value || d.value } : d
      ) : []
    }));
  };

  // Updated person management methods
  const addObchodnaOsoba = (osoba: Osoba) => {
    const newOsoba = {
      ...osoba,
      id: osoba.id || uuidv4()
    };
    
    setData(prev => ({
      ...prev,
      obchodneOsoby: Array.isArray(prev.obchodneOsoby) ? [...prev.obchodneOsoby, newOsoba] : [newOsoba]
    }));
  };

  const updateObchodnaOsoba = (id: string, info: Partial<Osoba>) => {
    setData(prev => ({
      ...prev,
      obchodneOsoby: Array.isArray(prev.obchodneOsoby) ? prev.obchodneOsoby.map(o => 
        o.id === id ? { ...o, ...info } : o
      ) : []
    }));
  };

  const removeObchodnaOsoba = (id: string) => {
    setData(prev => ({
      ...prev,
      obchodneOsoby: Array.isArray(prev.obchodneOsoby) ? prev.obchodneOsoby.filter(o => o.id !== id) : []
    }));
  };

  const addTechnickaOsoba = (osoba: Osoba) => {
    const newOsoba = {
      ...osoba,
      id: osoba.id || uuidv4()
    };
    
    setData(prev => ({
      ...prev,
      technickeOsoby: Array.isArray(prev.technickeOsoby) ? [...prev.technickeOsoby, newOsoba] : [newOsoba]
    }));
  };

  const updateTechnickaOsoba = (id: string, info: Partial<Osoba>) => {
    setData(prev => ({
      ...prev,
      technickeOsoby: Array.isArray(prev.technickeOsoby) ? prev.technickeOsoby.map(o => 
        o.id === id ? { ...o, ...info } : o
      ) : []
    }));
  };

  const removeTechnickaOsoba = (id: string) => {
    setData(prev => ({
      ...prev,
      technickeOsoby: Array.isArray(prev.technickeOsoby) ? prev.technickeOsoby.filter(o => o.id !== id) : []
    }));
  };

  // Updated opravnene osoby methods
  const addOpravnenaOsoba = (osoba: OpravnenaOsoba) => {
    const newOsoba = {
      ...osoba,
      id: osoba.id || uuidv4()
    };
    
    setData(prev => ({
      ...prev,
      opravneneOsoby: Array.isArray(prev.opravneneOsoby) ? [...prev.opravneneOsoby, newOsoba] : [newOsoba]
    }));
  };

  const updateOpravnenaOsoba = (id: string, info: Partial<OpravnenaOsoba>) => {
    setData(prev => ({
      ...prev,
      opravneneOsoby: Array.isArray(prev.opravneneOsoby) ? prev.opravneneOsoby.map(o => 
        o.id === id ? { ...o, ...info } : o
      ) : []
    }));
  };

  const removeOpravnenaOsoba = (id: string) => {
    setData(prev => ({
      ...prev,
      opravneneOsoby: Array.isArray(prev.opravneneOsoby) ? prev.opravneneOsoby.filter(o => o.id !== id) : []
    }));
  };

  const addSkutocnyMajitel = (majitel: SkutocnyMajitel) => {
    setData(prev => ({
      ...prev,
      skutocniMajitelia: Array.isArray(prev.skutocniMajitelia) ? [...prev.skutocniMajitelia, majitel] : [majitel]
    }));
  };

  const updateSkutocnyMajitel = (index: number, info: Partial<SkutocnyMajitel>) => {
    if (!Array.isArray(data.skutocniMajitelia)) {
      console.error("skutocniMajitelia is not an array");
      return;
    }
    
    setData(prev => ({
      ...prev,
      skutocniMajitelia: Array.isArray(prev.skutocniMajitelia) ? prev.skutocniMajitelia.map((m, i) => 
        i === index ? { ...m, ...info } : m
      ) : []
    }));
  };

  const removeSkutocnyMajitel = (index: number) => {
    if (!Array.isArray(data.skutocniMajitelia)) {
      console.error("skutocniMajitelia is not an array");
      return;
    }
    
    setData(prev => ({
      ...prev,
      skutocniMajitelia: Array.isArray(prev.skutocniMajitelia) ? prev.skutocniMajitelia.filter((_, i) => i !== index) : []
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
        // Check if any authorized person is politically exposed
        const hasPoliticallyExposed = Array.isArray(data.opravneneOsoby) && data.opravneneOsoby.some(osoba => osoba && osoba.politickyExponovana);
        setStep(hasPoliticallyExposed ? 'beneficialOwners' : 'billing');
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
        // Check if any authorized person is politically exposed
        const hasPoliticallyExposed = Array.isArray(data.opravneneOsoby) && data.opravneneOsoby.some(osoba => osoba && osoba.politickyExponovana);
        setStep(hasPoliticallyExposed ? 'beneficialOwners' : 'persons');
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
        // Check if at least one prevadzka has required fields filled
        return Array.isArray(data.prevadzky) && data.prevadzky.some(p => {
          const { nazovPrevadzky, adresaPrevadzky, telefon, email } = p;
          return Boolean(nazovPrevadzky && adresaPrevadzky && telefon && email);
        });
      }
      case 'products': {
        const hasZariadenie = Array.isArray(data.zariadenia) && data.zariadenia.some(z => z && z.selected);
        const hasLicencia = Array.isArray(data.licencie) && data.licencie.some(l => l && l.selected);
        const hasPlatobnaMetoda = Array.isArray(data.platobneMetody) && data.platobneMetody.some(p => p && p.selected);
        return hasZariadenie || hasLicencia || hasPlatobnaMetoda;
      }
      case 'persons': {
        // Check if at least one business and one technical contact is valid
        const hasValidObchodnaOsoba = Array.isArray(data.obchodneOsoby) && data.obchodneOsoby.some(o => {
          return Boolean(o && o.meno && o.email && o.telefon);
        });
        
        const hasValidTechnickaOsoba = Array.isArray(data.technickeOsoby) && data.technickeOsoby.some(o => {
          return Boolean(o && o.meno && o.email && o.telefon);
        });
        
        // Check if at least one authorized person is valid
        const hasValidOpravnenaOsoba = Array.isArray(data.opravneneOsoby) && data.opravneneOsoby.some(osoba => {
          if (!osoba) return false;
          const { 
            meno, funkcia, datumNarodenia, rodneCislo, obcianstvo, 
            adresaTrvalehoBydliska, cisloDokladu, platnostDokladu
          } = osoba;
          
          return Boolean(
            meno && funkcia && datumNarodenia && rodneCislo && 
            obcianstvo && adresaTrvalehoBydliska && cisloDokladu && platnostDokladu
          );
        });
        
        return Boolean(hasValidObchodnaOsoba && hasValidTechnickaOsoba && hasValidOpravnenaOsoba);
      }
      case 'beneficialOwners': {
        // Add null check before accessing length and using every
        return Array.isArray(data.skutocniMajitelia) && 
          data.skutocniMajitelia.length > 0 && 
          data.skutocniMajitelia.every(majitel => {
            if (!majitel) return false;
            const { menoAPriezvisko, datumNarodenia, trvalyPobyt, obcianstvo, vztahKObchodnikovi } = majitel;
            return Boolean(menoAPriezvisko && datumNarodenia && trvalyPobyt && obcianstvo && vztahKObchodnikovi);
          });
      }
      case 'billing': {
        const { fakturacnyEmail, fakturacnaAdresa, iban, sposobUhrady } = data.fakturacneUdaje;
        return Boolean(fakturacnyEmail && fakturacnaAdresa && iban && sposobUhrady);
      }
      case 'sign': {
        const { gdpr, obchodnePodmienky, dorucovanieElektronicky } = data.podpisSuhlasy;
        return Boolean(gdpr && obchodnePodmienky && dorucovanieElektronicky);
      }
      default:
        return false;
    }
  };

  const value: OnboardingContextType = {
    currentStep,
    data,
    setStep,
    updateCompanyInfo,
    updateBusinessInfo,
    addPrevadzka,
    updatePrevadzka,
    removePrevadzka,
    addBankovyUcet,
    updateBankovyUcet,
    removeBankovyUcet,
    updateZariadenie,
    updateLicencia,
    updatePlatobnaMetoda,
    updateDoplnkovaSluzba,
    addObchodnaOsoba,
    updateObchodnaOsoba,
    removeObchodnaOsoba,
    addTechnickaOsoba,
    updateTechnickaOsoba,
    removeTechnickaOsoba,
    addOpravnenaOsoba,
    updateOpravnenaOsoba,
    removeOpravnenaOsoba,
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
