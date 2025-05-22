export interface CompanyInfo {
  ico: string;
  nazovSpolocnosti: string;
  dic: string;
  icDph: string;
  sidlo: string;
  zapisVOrsr: string;
  manualInput: boolean;
}

export interface BusinessInfo {
  nazovPrevadzky: string;
  adresaPrevadzky: string;
  mesto: string;
  psc: string;
  telefon: string;
  email: string;
  typPrevadzky: "Kamenná" | "Mobilná" | "Sezónna" | "Iné";
  predmetPodnikania: string;
  otvaracieHodiny: string;
  sezonnost: boolean;
  trvanieSezony: number;
  odhadovanyRocnyObrat: number;
  priemernaVyskaTransakcie: number;
  ocakavanyObratKariet: number;
  hasWifi: boolean;
  hasSimCard: boolean;
}

export type Zariadenie = {
  id: string;
  nazov: string;
  pocetKs: number;
  typNakupu: "Prenájom" | "Kúpa";
  viazanost: 12 | 24 | 36;
  frekvenciaPlatby: "mesačne" | "ročne" | "sezónne" | "z obratu";
  selected: boolean;
};

export type SoftverLicencia = {
  id: string;
  nazov: string;
  selected: boolean;
};

export type PlatobnaMetoda = {
  id: string;
  nazov: string;
  selected: boolean;
  value?: string;
};

export type DoplnkovaSluzba = {
  id: string;
  nazov: string;
  selected: boolean;
  value?: string;
};

export interface Osoba {
  meno: string;
  email: string;
  telefon: string;
}

export interface OpravnenaOsoba extends Osoba {
  funkcia: string;
  datumNarodenia: string;
  rodneCislo: string;
  obcianstvo: string;
  adresaTrvalehoBydliska: string;
  typDokladu: "Občiansky preukaz" | "Pas";
  cisloDokladu: string;
  platnostDokladu: string;
  statVydania: string;
  politickyExponovana: boolean;
}

export interface SkutocnyMajitel {
  menoAPriezvisko: string;
  rodnePriezvisko: string;
  datumNarodenia: string;
  miestoNarodenia: string;
  trvalyPobyt: string;
  obcianstvo: string;
  politickyExponovana: boolean;
  vztahKObchodnikovi: string;
}

export interface FakturacneUdaje {
  fakturacnyEmail: string;
  fakturacnaAdresa: string;
  iban: string;
  sposobUhrady: "Faktúra" | "Strhnutie z obratu" | "Predfaktúra";
  frekvencia: "Mesačne" | "Ročne" | "Polročne";
  spolocnySubjekt: boolean;
  odlisnyObjednavatel: boolean;
}

export interface PodpisSuhlasy {
  gdpr: boolean;
  obchodnePodmienky: boolean;
  dorucovanieElektronicky: boolean;
}

export interface OnboardingData {
  company: CompanyInfo;
  business: BusinessInfo;
  zariadenia: Zariadenie[];
  licencie: SoftverLicencia[];
  platobneMetody: PlatobnaMetoda[];
  doplnkoveSluzby: DoplnkovaSluzba[];
  obchodnaOsoba: Osoba;
  technickaOsoba: Osoba;
  opravnenaOsoba: OpravnenaOsoba;
  skutocniMajitelia: SkutocnyMajitel[];
  fakturacneUdaje: FakturacneUdaje;
  podpisSuhlasy: PodpisSuhlasy;
}

export type OnboardingStep = 
  | "company" 
  | "business" 
  | "products" 
  | "persons" 
  | "beneficialOwners" 
  | "billing" 
  | "sign";

export type OnboardingContextType = {
  currentStep: OnboardingStep;
  data: OnboardingData;
  setStep: (step: OnboardingStep) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  updateBusinessInfo: (info: Partial<BusinessInfo>) => void;
  updateZariadenie: (id: string, info: Partial<Zariadenie>) => void;
  updateLicencia: (id: string, selected: boolean) => void;
  updatePlatobnaMetoda: (id: string, selected: boolean, value?: string) => void;
  updateDoplnkovaSluzba: (id: string, selected: boolean, value?: string) => void;
  updateObchodnaOsoba: (info: Partial<Osoba>) => void;
  updateTechnickaOsoba: (info: Partial<Osoba>) => void;
  updateOpravnenaOsoba: (info: Partial<OpravnenaOsoba>) => void;
  addSkutocnyMajitel: (majitel: SkutocnyMajitel) => void;
  updateSkutocnyMajitel: (index: number, info: Partial<SkutocnyMajitel>) => void;
  removeSkutocnyMajitel: (index: number) => void;
  updateFakturacneUdaje: (info: Partial<FakturacneUdaje>) => void;
  updatePodpisSuhlasy: (info: Partial<PodpisSuhlasy>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isStepComplete: (step: OnboardingStep) => boolean;
  saveProgress: () => void;
};

export const defaultOnboardingData: OnboardingData = {
  company: {
    ico: "",
    nazovSpolocnosti: "",
    dic: "",
    icDph: "",
    sidlo: "",
    zapisVOrsr: "",
    manualInput: false
  },
  business: {
    nazovPrevadzky: "",
    adresaPrevadzky: "",
    mesto: "",
    psc: "",
    telefon: "",
    email: "",
    typPrevadzky: "Kamenná",
    predmetPodnikania: "",
    otvaracieHodiny: "",
    sezonnost: false,
    trvanieSezony: 0,
    odhadovanyRocnyObrat: 0,
    priemernaVyskaTransakcie: 0,
    ocakavanyObratKariet: 0,
    hasWifi: false,
    hasSimCard: false
  },
  zariadenia: [
    { id: "a920-gprs", nazov: "A920 GPRS", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false },
    { id: "a920-wifi", nazov: "A920 WIFI", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false },
    { id: "a80-eth", nazov: "A80 ETH", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false },
    { id: "s800-eth", nazov: "S800 ETH", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false },
    { id: "q80-wifi-eth", nazov: "Q80 (WIFI/ETH)", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false },
    { id: "q80-eth", nazov: "Q80 (ETH)", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false },
    { id: "pax-a920", nazov: "PAX A920", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false },
    { id: "pax-a80", nazov: "PAX A80", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false },
    { id: "pax-a35", nazov: "PAX A35", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false },
    { id: "softpos", nazov: "SOFTPOS", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false },
    { id: "pinpad", nazov: "PINPAD", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false },
    { id: "sim-karta", nazov: "SIM karta", pocetKs: 1, typNakupu: "Prenájom", viazanost: 24, frekvenciaPlatby: "mesačne", selected: false }
  ],
  licencie: [
    { id: "smartpos-pro", nazov: "SMARTPOS PRO", selected: false },
    { id: "smartpos-lite", nazov: "SMARTPOS LITE", selected: false },
    { id: "smartpos-air", nazov: "SMARTPOS AIR", selected: false },
    { id: "a920-vrp", nazov: "A920 VRP LICENCIA", selected: false },
    { id: "easy-kasa", nazov: "EASY KASA LICENCIA", selected: false },
    { id: "3k-pos", nazov: "3K POS LICENCIA", selected: false },
    { id: "vrp-driver", nazov: "VRP DRIVER", selected: false },
    { id: "chdu", nazov: "CHDÚ", selected: false },
    { id: "iny-softver", nazov: "Iný softvér", selected: false }
  ],
  platobneMetody: [
    { id: "gp-webpay", nazov: "GP WebPay", selected: false },
    { id: "besteron", nazov: "Besteron", selected: false },
    { id: "ina-brana", nazov: "Iná brána", selected: false },
    { id: "push-payments", nazov: "Push Payments", selected: false },
    { id: "opakovane-platby", nazov: "Opakované platby", selected: false },
    { id: "ulozena-karta", nazov: "Uložená karta", selected: false },
    { id: "overenie-karty", nazov: "Overenie karty", selected: false },
    { id: "apple-pay", nazov: "Apple Pay", selected: false },
    { id: "google-pay", nazov: "Google Pay", selected: false },
    { id: "fastpay", nazov: "FastPay", selected: false },
    { id: "bankove-tlacidla", nazov: "Bankové tlačidlá", selected: false },
    { id: "moto-platby", nazov: "MO/TO platby", selected: false },
    { id: "pos-terminal", nazov: "POS terminál", selected: false },
    { id: "e-commerce", nazov: "E-commerce", selected: false }
  ],
  doplnkoveSluzby: [
    { id: "instalacia", nazov: "Inštalácia zariadenia", selected: false },
    { id: "expresna-instalacia", nazov: "Expresná inštalácia do 48h", selected: false },
    { id: "zaskolenie", nazov: "Zaškolenie na prevádzke", selected: false },
    { id: "programovanie-plu", nazov: "Programovanie PLU", selected: false },
    { id: "prepojenie-externy-softver", nazov: "Prepojenie na externý softvér", selected: false },
    { id: "technicka-podpora", nazov: "24/7 technická podpora", selected: false },
    { id: "deinstalacia", nazov: "Deinštalácia", selected: false }
  ],
  obchodnaOsoba: {
    meno: "",
    email: "",
    telefon: ""
  },
  technickaOsoba: {
    meno: "",
    email: "",
    telefon: ""
  },
  opravnenaOsoba: {
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
  },
  skutocniMajitelia: [],
  fakturacneUdaje: {
    fakturacnyEmail: "",
    fakturacnaAdresa: "",
    iban: "",
    sposobUhrady: "Faktúra",
    frekvencia: "Mesačne",
    spolocnySubjekt: false,
    odlisnyObjednavatel: false
  },
  podpisSuhlasy: {
    gdpr: false,
    obchodnePodmienky: false,
    dorucovanieElektronicky: false
  }
};
