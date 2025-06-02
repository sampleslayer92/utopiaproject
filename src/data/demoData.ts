export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  email: string;
  performance: number;
}

export interface BusinessPartnerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  clientsCount: number;
  totalRevenue: number;
  monthlyRevenue: number;
  commission: number;
  website: string;
  industry: string;
  notes: string;
  teamMembers: TeamMemberData[];
}

export interface ContractData {
  id: string;
  clientId: string;
  clientName: string;
  contractNumber: string;
  type: string;
  status: "active" | "pending" | "expired";
  startDate: string;
  endDate: string;
  value: number;
  monthlyFee: number;
  commissionRate: number;
  devices: string[];
  signedBy: string;
  notes: string;
}

export interface TicketData {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "high" | "medium" | "low";
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  estimatedResolution: string;
}

export interface ReportData {
  id: string;
  name: string;
  type: string;
  period: string;
  createdAt: string;
  createdBy: string;
  status: "completed" | "pending" | "failed";
  data: {
    totalRevenue: number;
    totalTransactions: number;
    averageTicket: number;
    topPerformer: string;
    growth: number;
    totalProfit?: number;
    expenses?: number;
    profitMargin?: number;
  };
}

export interface TransactionData {
  id: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed" | "refunded";
  type: "card_payment" | "contactless" | "online" | "cash";
  timestamp: string;
  paymentMethod: string;
  terminalId: string;
  receiptNumber: string;
  locationId: string;
  errorCode?: string;
}

export interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessPartnerId: string;
  assignedTeamMemberId: string;
  locationsCount: number;
  devicesCount: number;
  totalRevenue: number;
  monthlyRevenue: number;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  industry: string;
  address?: string;
  website?: string;
  contactPerson?: string;
  notes?: string;
}

export interface DeviceData {
  id: string;
  name: string;
  serialNumber: string;
  model: string;
  brand: string;
  status: "active" | "inactive" | "maintenance" | "error";
  locationId: string;
  lastActivity: string;
  firmwareVersion: string;
  tid: string;
  clientId: string;
}

export interface LocationData {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  clientId: string;
  devicesCount: number;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  type: string;
}

// Enhanced demo data with more comprehensive information
export const demoBusinessPartners = [
  {
    id: 'bp-1',
    name: 'ISO Organizácia Slovakia',
    email: 'info@iso-org.sk',
    phone: '+421 2 1234 5678',
    address: 'Bratislava, Slovakia',
    contactPerson: 'Marián Lapoš',
    status: 'active' as const,
    createdAt: '2023-01-01',
    clientsCount: 156,
    totalRevenue: 2850000,
    monthlyRevenue: 285000,
    commission: 12.5,
    website: 'https://iso-org.sk',
    industry: 'Payment Processing',
    notes: 'Hlavný business partner pre Slovensko',
    teamMembers: [
      {
        id: 'team-1',
        name: 'Peter Fekiač',
        role: 'Senior Account Manager',
        email: 'peter.fekiac@iso-org.sk',
        performance: 95
      },
      {
        id: 'team-2',
        name: 'Ladislav Mathis',
        role: 'Account Manager',
        email: 'ladislav.mathis@iso-org.sk',
        performance: 92
      },
      {
        id: 'team-3',
        name: 'Richie Plichta',
        role: 'Technical Support Manager',
        email: 'richie.plichta@iso-org.sk',
        performance: 98
      }
    ]
  },
  {
    id: 'bp-2',
    name: 'Central Europe Payments',
    email: 'contact@cepayments.com',
    phone: '+420 234 567 890',
    address: 'Prague, Czech Republic',
    contactPerson: 'Jan Novák',
    status: 'active' as const,
    createdAt: '2023-03-15',
    clientsCount: 89,
    totalRevenue: 1650000,
    monthlyRevenue: 165000,
    commission: 11.0,
    website: 'https://cepayments.com',
    industry: 'Payment Processing',
    notes: 'Expanding partner for Czech market',
    teamMembers: []
  }
];

export const demoContracts = [
  {
    id: 'contract-1',
    clientId: 'client-1',
    clientName: 'Reštaurácia U Jána',
    contractNumber: 'CON-2024-001',
    type: 'Standard POS Agreement',
    status: 'active' as const,
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    value: 12800,
    monthlyFee: 45,
    commissionRate: 2.5,
    devices: ['Terminal PAX A920', 'Receipt Printer'],
    signedBy: 'Peter Fekiač',
    notes: 'Štandardná zmluva pre reštauračné zariadenie'
  },
  {
    id: 'contract-2',
    clientId: 'client-4',
    clientName: 'Fitness Centrum Power',
    contractNumber: 'CON-2024-002',
    type: 'Premium Service Package',
    status: 'active' as const,
    startDate: '2024-02-20',
    endDate: '2025-02-19',
    value: 8600,
    monthlyFee: 65,
    commissionRate: 2.2,
    devices: ['Terminal Ingenico Move 5000', 'Mobile Reader'],
    signedBy: 'Ladislav Mathis',
    notes: 'Premium balík s pokročilými funkciami'
  },
  {
    id: 'contract-3',
    clientId: 'client-5',
    clientName: 'Obchod s elektronikou Tech Store',
    contractNumber: 'CON-2024-003',
    type: 'E-commerce Integration',
    status: 'pending' as const,
    startDate: '2024-11-01',
    endDate: '2025-10-31',
    value: 15200,
    monthlyFee: 85,
    commissionRate: 2.8,
    devices: ['Virtual Terminal', 'API Integration'],
    signedBy: 'Richie Plichta',
    notes: 'Integrácia pre online obchod'
  }
];

export const demoTickets = [
  {
    id: 'ticket-1',
    title: 'Problém s platobným terminálom',
    description: 'Terminál sa náhodne reštartuje počas transakcie',
    clientId: 'client-1',
    clientName: 'Reštaurácia U Jána',
    status: 'open' as const,
    priority: 'high' as const,
    assignedTo: 'Richie Plichta',
    createdAt: '2024-11-25T10:30:00Z',
    updatedAt: '2024-11-26T14:15:00Z',
    category: 'Technical Issue',
    estimatedResolution: '2024-11-27T16:00:00Z'
  },
  {
    id: 'ticket-2',
    title: 'Žiadosť o zvýšenie limitu',
    description: 'Potrebujeme zvýšiť denný limit transakcií',
    clientId: 'client-4',
    clientName: 'Fitness Centrum Power',
    status: 'in_progress' as const,
    priority: 'medium' as const,
    assignedTo: 'Peter Fekiač',
    createdAt: '2024-11-24T08:45:00Z',
    updatedAt: '2024-11-25T11:20:00Z',
    category: 'Account Management',
    estimatedResolution: '2024-11-28T12:00:00Z'
  },
  {
    id: 'ticket-3',
    title: 'Inštalácia nového terminála',
    description: 'Potrebujeme nainštalovať dodatočný terminál',
    clientId: 'client-2',
    clientName: 'Kaviarňa Central',
    status: 'resolved' as const,
    priority: 'low' as const,
    assignedTo: 'Ladislav Mathis',
    createdAt: '2024-11-20T14:20:00Z',
    updatedAt: '2024-11-23T16:45:00Z',
    category: 'Installation',
    estimatedResolution: '2024-11-23T16:45:00Z'
  }
];

export const demoReports = [
  {
    id: 'report-1',
    name: 'Mesačný prehľad výkonnosti',
    type: 'Performance Report',
    period: 'November 2024',
    createdAt: '2024-11-01',
    createdBy: 'Peter Fekiač',
    status: 'completed' as const,
    data: {
      totalRevenue: 86200,
      totalTransactions: 1247,
      averageTicket: 69.12,
      topPerformer: 'Richie Plichta',
      growth: 12.5
    }
  },
  {
    id: 'report-2',
    name: 'Kvartálne finančné výsledky',
    type: 'Financial Report',
    period: 'Q3 2024',
    createdAt: '2024-10-01',
    createdBy: 'Ladislav Mathis',
    status: 'completed' as const,
    data: {
      totalRevenue: 245600,
      totalProfit: 73680,
      expenses: 171920,
      profitMargin: 30.0
    }
  }
];

export const demoTransactions = [
  {
    id: 'trans-1',
    merchantId: 'client-1',
    merchantName: 'Reštaurácia U Jána',
    amount: 89.50,
    currency: 'EUR',
    status: 'completed' as const,
    type: 'card_payment' as const,
    timestamp: '2024-11-26T12:34:56Z',
    paymentMethod: 'Visa **** 1234',
    terminalId: 'PAX-001',
    receiptNumber: 'RCP-001234',
    locationId: 'location-1'
  },
  {
    id: 'trans-2',
    merchantId: 'client-4',
    merchantName: 'Fitness Centrum Power',
    amount: 35.00,
    currency: 'EUR',
    status: 'completed' as const,
    type: 'contactless' as const,
    timestamp: '2024-11-26T11:22:15Z',
    paymentMethod: 'Mastercard Contactless',
    terminalId: 'ING-002',
    receiptNumber: 'RCP-001235',
    locationId: 'location-4'
  },
  {
    id: 'trans-3',
    merchantId: 'client-2',
    merchantName: 'Kaviarňa Central',
    amount: 12.80,
    currency: 'EUR',
    status: 'failed' as const,
    type: 'card_payment' as const,
    timestamp: '2024-11-26T10:15:30Z',
    paymentMethod: 'Visa **** 5678',
    terminalId: 'PAX-003',
    receiptNumber: 'RCP-001236',
    locationId: 'location-2',
    errorCode: 'insufficient_funds'
  }
];

export const demoClients: ClientData[] = [
  {
    id: 'client-1',
    name: 'Reštaurácia U Jána',
    email: 'info@restauraciaujana.sk',
    phone: '+421 903 123 456',
    businessPartnerId: 'bp-1',
    assignedTeamMemberId: 'team-1',
    locationsCount: 1,
    devicesCount: 3,
    totalRevenue: 125000,
    monthlyRevenue: 10500,
    status: 'active',
    createdAt: '2022-05-15',
    industry: 'Reštaurácia',
    address: 'Hlavná 123, 010 01 Žilina',
    website: 'www.restauraciaujana.sk',
    contactPerson: 'Ján Novák',
    notes: 'Overený klient s pravidelnými platbami'
  },
  {
    id: 'client-2',
    name: 'Kaviarňa Central',
    email: 'info@kaviarencentral.sk',
    phone: '+421 905 789 123',
    businessPartnerId: 'bp-1',
    assignedTeamMemberId: 'team-2',
    locationsCount: 1,
    devicesCount: 2,
    totalRevenue: 85000,
    monthlyRevenue: 7000,
    status: 'active',
    createdAt: '2022-08-01',
    industry: 'Kaviarňa',
    address: 'Námestie Slobody 5, 811 01 Bratislava',
    website: 'www.kaviarencentral.sk',
    contactPerson: 'Eva Horváthová',
    notes: 'Klient s potenciálom pre rast'
  },
  {
    id: 'client-3',
    name: 'Pizzeria Italia',
    email: 'objednavky@pizzeriaitalia.sk',
    phone: '+421 911 456 789',
    businessPartnerId: 'bp-1',
    assignedTeamMemberId: 'team-1',
    locationsCount: 1,
    devicesCount: 4,
    totalRevenue: 150000,
    monthlyRevenue: 12500,
    status: 'active',
    createdAt: '2022-10-10',
    industry: 'Pizzeria',
    address: 'Štúrova 25, 040 01 Košice',
    website: 'www.pizzeriaitalia.sk',
    contactPerson: 'Matej Kováč',
    notes: 'Dobrý platca, občasné technické problémy'
  },
    {
    id: 'client-4',
    name: 'Fitness Centrum Power',
    email: 'info@fitnesspower.sk',
    phone: '+421 907 987 654',
    businessPartnerId: 'bp-1',
    assignedTeamMemberId: 'team-2',
    locationsCount: 1,
    devicesCount: 2,
    totalRevenue: 95000,
    monthlyRevenue: 8000,
    status: 'active',
    createdAt: '2023-01-20',
    industry: 'Fitness',
    address: 'Trenčianska 45, 821 09 Bratislava',
    website: 'www.fitnesspower.sk',
    contactPerson: 'Zuzana Králiková',
    notes: 'Spoľahlivý klient, platby vždy načas'
  },
  {
    id: 'client-5',
    name: 'Obchod s elektronikou Tech Store',
    email: 'eshop@techstore.sk',
    phone: '+421 902 345 678',
    businessPartnerId: 'bp-1',
    assignedTeamMemberId: 'team-3',
    locationsCount: 1,
    devicesCount: 5,
    totalRevenue: 220000,
    monthlyRevenue: 18000,
    status: 'pending',
    createdAt: '2023-03-01',
    industry: 'Elektronika',
    address: 'Mlynská dolina 9, 841 04 Bratislava',
    website: 'www.techstore.sk',
    contactPerson: 'Tomáš Molnár',
    notes: 'Nový klient, čaká sa na schválenie zmluvy'
  },
  {
    id: 'client-6',
    name: 'Kvetinárstvo Orchidea',
    email: 'info@kvetinarstvoorchidea.sk',
    phone: '+421 915 678 901',
    businessPartnerId: 'bp-1',
    assignedTeamMemberId: 'team-1',
    locationsCount: 1,
    devicesCount: 1,
    totalRevenue: 60000,
    monthlyRevenue: 5000,
    status: 'active',
    createdAt: '2023-05-10',
    industry: 'Kvetinárstvo',
    address: 'Poštová 11, 974 01 Banská Bystrica',
    website: 'www.kvetinarstvoorchidea.sk',
    contactPerson: 'Lucia Benková',
    notes: 'Malý klient, stabilný príjem'
  },
  {
    id: 'client-7',
    name: 'Cukráreň Sladký Sen',
    email: 'objednavky@sladkysen.sk',
    phone: '+421 908 234 567',
    businessPartnerId: 'bp-1',
    assignedTeamMemberId: 'team-2',
    locationsCount: 1,
    devicesCount: 2,
    totalRevenue: 90000,
    monthlyRevenue: 7500,
    status: 'active',
    createdAt: '2023-07-01',
    industry: 'Cukráreň',
    address: 'SNP 15, 036 01 Martin',
    website: 'www.sladkysen.sk',
    contactPerson: 'Veronika Gajdošová',
    notes: 'Klient s rastúcim obratom'
  },
  {
    id: 'client-8',
    name: 'Reštaurácia Zlatý Kľúčik',
    email: 'rezervacie@zlatykucik.sk',
    phone: '+421 917 567 890',
    businessPartnerId: 'bp-1',
    assignedTeamMemberId: 'team-3',
    locationsCount: 1,
    devicesCount: 3,
    totalRevenue: 180000,
    monthlyRevenue: 15000,
    status: 'active',
    createdAt: '2023-09-15',
    industry: 'Reštaurácia',
    address: 'Hviezdoslavovo námestie 7, 811 02 Bratislava',
    website: 'www.zlatykucik.sk',
    contactPerson: 'Peter Urban',
    notes: 'VIP klient, vyžaduje promptnú podporu'
  },
  {
    id: 'client-9',
    name: 'Kaderníctvo Glamour',
    email: 'objednavky@kadernictvoglamour.sk',
    phone: '+421 904 890 123',
    businessPartnerId: 'bp-1',
    assignedTeamMemberId: 'team-1',
    locationsCount: 1,
    devicesCount: 1,
    totalRevenue: 55000,
    monthlyRevenue: 4500,
    status: 'active',
    createdAt: '2023-11-01',
    industry: 'Kaderníctvo',
    address: 'Kollárovo námestie 20, 811 07 Bratislava',
    website: 'www.kadernictvoglamour.sk',
    contactPerson: 'Martina Lukáčová',
    notes: 'Malý klient, stabilné platby'
  },
  {
    id: 'client-10',
    name: 'Autoservis Rýchly Servis',
    email: 'servis@rychlyservis.sk',
    phone: '+421 918 123 456',
    businessPartnerId: 'bp-1',
    assignedTeamMemberId: 'team-2',
    locationsCount: 1,
    devicesCount: 2,
    totalRevenue: 110000,
    monthlyRevenue: 9000,
    status: 'active',
    createdAt: '2024-01-10',
    industry: 'Autoservis',
    address: 'Rožňavská 22, 821 01 Bratislava',
    website: 'www.rychlyservis.sk',
    contactPerson: 'Jozef Mráz',
    notes: 'Klient s potenciálom pre rozšírenie služieb'
  }
];

export const demoDevices: DeviceData[] = [
  {
    id: 'device-1',
    name: 'Terminál Reštaurácia U Jána',
    serialNumber: 'PAX001234',
    model: 'A920',
    brand: 'PAX Technology',
    status: 'active',
    locationId: 'location-1',
    lastActivity: '2024-11-26T14:30:00Z',
    firmwareVersion: '2.1.5',
    tid: 'TID001234',
    clientId: 'client-1'
  },
  {
    id: 'device-2',
    name: 'Terminál Kaviarňa Central',
    serialNumber: 'ING005678',
    model: 'Move 5000',
    brand: 'Ingenico',
    status: 'active',
    locationId: 'location-2',
    lastActivity: '2024-11-26T13:45:00Z',
    firmwareVersion: '1.8.2',
    tid: 'TID005678',
    clientId: 'client-2'
  },
  {
    id: 'device-3',
    name: 'Terminál Pizzeria Italia',
    serialNumber: 'PAX009876',
    model: 'A920',
    brand: 'PAX Technology',
    status: 'maintenance',
    locationId: 'location-3',
    lastActivity: '2024-11-25T18:20:00Z',
    firmwareVersion: '2.1.3',
    tid: 'TID009876',
    clientId: 'client-3'
  },
  {
    id: 'device-4',
    name: 'Terminál Fitness Power',
    serialNumber: 'VER004567',
    model: 'VX520',
    brand: 'Verifone',
    status: 'active',
    locationId: 'location-4',
    lastActivity: '2024-11-26T16:15:00Z',
    firmwareVersion: '3.2.1',
    tid: 'TID004567',
    clientId: 'client-4'
  },
  {
    id: 'device-5',
    name: 'Terminál Tech Store',
    serialNumber: 'ING007890',
    model: 'Desk 5000',
    brand: 'Ingenico',
    status: 'error',
    locationId: 'location-5',
    lastActivity: '2024-11-24T09:30:00Z',
    firmwareVersion: '1.9.1',
    tid: 'TID007890',
    clientId: 'client-5'
  }
];

export const demoLocations: LocationData[] = [
  {
    id: 'location-1',
    name: 'Reštaurácia U Jána - Hlavná pobočka',
    address: 'Hlavná 123, 010 01 Žilina',
    city: 'Žilina',
    country: 'Slovensko',
    clientId: 'client-1',
    devicesCount: 1,
    status: 'active',
    createdAt: '2022-05-15',
    type: 'restaurant'
  },
  {
    id: 'location-2',
    name: 'Kaviarňa Central - Centrum',
    address: 'Námestie Slobody 5, 811 01 Bratislava',
    city: 'Bratislava',
    country: 'Slovensko',
    clientId: 'client-2',
    devicesCount: 1,
    status: 'active',
    createdAt: '2022-08-01',
    type: 'cafe'
  },
  {
    id: 'location-3',
    name: 'Pizzeria Italia - Košice',
    address: 'Štúrova 25, 040 01 Košice',
    city: 'Košice',
    country: 'Slovensko',
    clientId: 'client-3',
    devicesCount: 1,
    status: 'active',
    createdAt: '2022-10-10',
    type: 'restaurant'
  },
  {
    id: 'location-4',
    name: 'Fitness Centrum Power - Bratislava',
    address: 'Trenčianska 45, 821 09 Bratislava',
    city: 'Bratislava',
    country: 'Slovensko',
    clientId: 'client-4',
    devicesCount: 1,
    status: 'active',
    createdAt: '2023-01-20',
    type: 'fitness'
  },
  {
    id: 'location-5',
    name: 'Tech Store - Mlynská dolina',
    address: 'Mlynská dolina 9, 841 04 Bratislava',
    city: 'Bratislava',
    country: 'Slovensko',
    clientId: 'client-5',
    devicesCount: 1,
    status: 'pending',
    createdAt: '2023-03-01',
    type: 'retail'
  }
];

// Export mockTickets as alias for demoTickets
export const mockTickets = demoTickets;

// Helper function to get assigned team member name
export const getAssignedToName = (assignedToId: string): string => {
  const teamMembers = [
    { id: 'team-1', name: 'Peter Fekiač' },
    { id: 'team-2', name: 'Ladislav Mathis' },
    { id: 'team-3', name: 'Richie Plichta' }
  ];
  
  const member = teamMembers.find(m => m.id === assignedToId);
  return member ? member.name : assignedToId;
};

// Helper function to get client name
export const getClientName = (clientId: string): string => {
  const client = demoClients.find(c => c.id === clientId);
  return client ? client.name : 'Neznámy klient';
};
