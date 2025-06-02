
import { ExtendedContract } from '@/types/contract';
import { defaultOnboardingData } from '@/types/onboarding';

export const extendedContractData: ExtendedContract[] = [
  {
    id: 'contract-1',
    contractNumber: 'SMV-2024-001',
    clientId: 'client-1',
    clientName: 'TechCorp Solutions s.r.o.',
    type: 'Prenájom POS terminálov',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2026-01-14',
    value: 24000,
    monthlyFee: 890,
    commissionRate: 0.025,
    signedBy: 'Ján Novák',
    notes: 'Štandardná zmluva na 24 mesiacov s možnosťou predĺženia',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    documents: [
      { id: 'doc-1', name: 'Zmluva.pdf', type: 'contract', uploadedAt: '2024-01-15' },
      { id: 'doc-2', name: 'Príloha_1.pdf', type: 'attachment', uploadedAt: '2024-01-15' }
    ],
    onboardingData: {
      ...defaultOnboardingData,
      company: {
        ico: '12345678',
        nazovSpolocnosti: 'TechCorp Solutions s.r.o.',
        dic: '2023456789',
        icDph: 'SK2023456789',
        sidlo: 'Hlavná 123, 811 01 Bratislava',
        zapisVOrsr: 'Okresný súd Bratislava I, oddiel: Sro, vložka č. 12345/B',
        manualInput: false,
        predmetCinnosti: 'Vývoj softvérových riešení, IT poradenstvo',
        suhlasZOU: true
      },
      prevadzky: [
        {
          id: 'prevadzka-1',
          nazovPrevadzky: 'TechCorp - Hlavná pobočka',
          adresaPrevadzky: 'Hlavná 123, 811 01 Bratislava',
          mesto: 'Bratislava',
          psc: '81101',
          telefon: '+421 2 5555 0123',
          email: 'info@techcorp.sk',
          typPrevadzky: 'Kamenná',
          predmetPodnikania: 'Predaj softvérových riešení',
          otvaracieHodiny: 'Po-Pia 9:00-17:00',
          sezonnost: false,
          trvanieSezony: 0,
          odhadovanyRocnyObrat: 500000,
          priemernaVyskaTransakcie: 150,
          ocakavanyObratKariet: 80,
          hasWifi: true,
          hasSimCard: false,
          hasEthernet: true,
          pouzitFiremneUdaje: true,
          bankovyUcet: [
            {
              id: 'ucet-1',
              nazov: 'Hlavný účet',
              iban: 'SK89 1111 0000 0012 3456 7890',
              mena: 'EUR',
              swift: 'GIBASKBX'
            }
          ]
        }
      ],
      zariadenia: [
        { 
          id: 'a920-wifi', 
          nazov: 'A920 WIFI', 
          pocetKs: 2, 
          typNakupu: 'Prenájom', 
          viazanost: 24, 
          frekvenciaPlatby: 'mesačne', 
          selected: true,
          hasWifi: true,
          hasSim: false,
          seriove_cislo: 'A920W-001, A920W-002'
        },
        { 
          id: 'pinpad', 
          nazov: 'PINPAD', 
          pocetKs: 1, 
          typNakupu: 'Prenájom', 
          viazanost: 24, 
          frekvenciaPlatby: 'mesačne', 
          selected: true,
          seriove_cislo: 'PIN-001'
        }
      ],
      licencie: [
        { id: 'smartpos-pro', nazov: 'SMARTPOS PRO', selected: true },
        { id: 'chdu', nazov: 'CHDÚ', selected: true }
      ],
      platobneMetody: [
        { id: 'gp-webpay', nazov: 'GP WebPay', selected: true },
        { id: 'apple-pay', nazov: 'Apple Pay', selected: true },
        { id: 'google-pay', nazov: 'Google Pay', selected: true }
      ],
      doplnkoveSluzby: [
        { id: 'instalacia', nazov: 'Inštalácia zariadenia', selected: true },
        { id: 'zaskolenie', nazov: 'Zaškolenie na prevádzke', selected: true },
        { id: 'technicka-podpora', nazov: '24/7 technická podpora', selected: true }
      ],
      obchodneOsoby: [
        {
          id: 'obchodna-1',
          meno: 'Ján Novák',
          email: 'jan.novak@techcorp.sk',
          telefon: '+421 905 123 456',
          funkcia: 'Obchodný riaditeľ',
          prevadzkaId: 'prevadzka-1'
        }
      ],
      technickeOsoby: [
        {
          id: 'technicka-1',
          meno: 'Peter Kováč',
          email: 'peter.kovac@techcorp.sk',
          telefon: '+421 905 654 321',
          funkcia: 'IT administrátor',
          prevadzkaId: 'prevadzka-1'
        }
      ],
      opravneneOsoby: [
        {
          id: 'opravnena-1',
          meno: 'Ján Novák',
          email: 'jan.novak@techcorp.sk',
          telefon: '+421 905 123 456',
          funkcia: 'konateľ',
          datumNarodenia: new Date('1985-03-15'),
          rodneCislo: '850315/1234',
          obcianstvo: 'Slovenská republika',
          adresaTrvalehoBydliska: 'Kvetná 45, 811 04 Bratislava',
          typDokladu: 'Občiansky preukaz',
          cisloDokladu: 'EX123456',
          platnostDokladu: new Date('2030-03-15'),
          statVydania: 'Slovenská republika',
          politickyExponovana: false,
          prevadzkaId: 'prevadzka-1',
          dokumenty: []
        }
      ],
      fakturacneUdaje: {
        fakturacnyEmail: 'faktury@techcorp.sk',
        fakturacnaAdresa: 'Hlavná 123, 811 01 Bratislava',
        iban: 'SK89 1111 0000 0012 3456 7890',
        sposobUhrady: 'Faktúra',
        frekvencia: 'Mesačne',
        spolocnySubjekt: false,
        odlisnyObjednavatel: false
      }
    }
  },
  {
    id: 'contract-2',
    contractNumber: 'SMV-2024-002',
    clientId: 'client-2',
    clientName: 'Retail Plus s.r.o.',
    type: 'Kúpa POS systému',
    status: 'pending',
    startDate: '2024-02-01',
    endDate: '2027-01-31',
    value: 15000,
    monthlyFee: 450,
    commissionRate: 0.03,
    signedBy: 'Mária Svobodová',
    notes: 'Čaká sa na dokončenie inštalácie',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-30',
    documents: [
      { id: 'doc-3', name: 'Zmluva_Retail.pdf', type: 'contract', uploadedAt: '2024-01-30' }
    ],
    onboardingData: {
      ...defaultOnboardingData,
      company: {
        ico: '87654321',
        nazovSpolocnosti: 'Retail Plus s.r.o.',
        dic: '2087654321',
        icDph: 'SK2087654321',
        sidlo: 'Obchodná 45, 949 01 Nitra',
        zapisVOrsr: 'Okresný súd Nitra, oddiel: Sro, vložka č. 54321/B',
        manualInput: false,
        predmetCinnosti: 'Maloobchodný predaj',
        suhlasZOU: true
      }
    }
  }
];

export const getExtendedContract = (id: string): ExtendedContract | undefined => {
  return extendedContractData.find(contract => contract.id === id);
};
