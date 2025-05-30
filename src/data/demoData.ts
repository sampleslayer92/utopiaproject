import { Client, BusinessPartner } from '@/types/dashboard';

// Extended demo data for all entities
export const demoBusinessPartners: BusinessPartner[] = [
  {
    id: 'bp-1',
    name: 'Martin Novák',
    email: 'martin@utopia.sk',
    phone: '+421 905 123 456',
    address: 'Hlavná 15, Bratislava',
    clientsCount: 8,
    devicesCount: 35,
    totalRevenue: 425000,
    monthlyRevenue: 45300,
    status: 'active',
    createdAt: '2024-01-15',
    tier: 'gold',
    region: 'Bratislava'
  }
];

export const demoClients: Client[] = [
  {
    id: 'merchant-1',
    name: 'Restaurant Savoy',
    email: 'info@savoy.sk',
    phone: '+421 2 5555 1234',
    businessPartnerId: 'bp-1',
    locationsCount: 2,
    devicesCount: 6,
    totalRevenue: 125000,
    monthlyRevenue: 12500,
    status: 'active',
    createdAt: '2024-01-15',
    contracts: [],
    industry: 'restaurant',
    address: 'Námestie slobody 12, Bratislava',
    website: 'www.savoy.sk',
    contactPerson: 'Ján Novák',
    assignedTeamMemberId: 'team-1'
  },
  {
    id: 'merchant-2',
    name: 'Fashion Store Elite',
    email: 'orders@elite.sk',
    phone: '+421 2 5555 2345',
    businessPartnerId: 'bp-1',
    locationsCount: 3,
    devicesCount: 8,
    totalRevenue: 185000,
    monthlyRevenue: 18500,
    status: 'active',
    createdAt: '2024-02-20',
    contracts: [],
    industry: 'retail',
    address: 'Obchodná 25, Bratislava',
    website: 'www.elite.sk',
    contactPerson: 'Mária Kováčová',
    assignedTeamMemberId: 'team-1'
  },
  {
    id: 'merchant-3',
    name: 'Tech Solutions Pro',
    email: 'contact@techpro.sk',
    phone: '+421 2 5555 3456',
    businessPartnerId: 'bp-1',
    locationsCount: 1,
    devicesCount: 4,
    totalRevenue: 95000,
    monthlyRevenue: 9500,
    status: 'active',
    createdAt: '2024-03-10',
    contracts: [],
    industry: 'technology',
    address: 'Michalská 15, Bratislava',
    website: 'www.techpro.sk',
    contactPerson: 'Peter Svoboda',
    assignedTeamMemberId: 'team-2'
  },
  {
    id: 'merchant-4',
    name: 'Pharmacy Plus',
    email: 'info@pharmacyplus.sk',
    phone: '+421 2 5555 4567',
    businessPartnerId: 'bp-1',
    locationsCount: 2,
    devicesCount: 5,
    totalRevenue: 78000,
    monthlyRevenue: 7800,
    status: 'active',
    createdAt: '2024-04-05',
    contracts: [],
    industry: 'healthcare',
    address: 'Dunajská 45, Bratislava',
    website: 'www.pharmacyplus.sk',
    contactPerson: 'Anna Horáková',
    assignedTeamMemberId: 'team-3'
  },
  {
    id: 'merchant-5',
    name: 'Coffee Corner',
    email: 'info@coffeecorner.sk',
    phone: '+421 2 5555 5678',
    businessPartnerId: 'bp-1',
    locationsCount: 1,
    devicesCount: 3,
    totalRevenue: 45000,
    monthlyRevenue: 4500,
    status: 'active',
    createdAt: '2024-05-12',
    contracts: [],
    industry: 'restaurant',
    address: 'Kamenné námestie 8, Bratislava',
    website: 'www.coffeecorner.sk',
    contactPerson: 'Tomáš Veselý',
    assignedTeamMemberId: 'team-2'
  },
  {
    id: 'merchant-6',
    name: 'Fitness Zone',
    email: 'reception@fitnesszone.sk',
    phone: '+421 2 5555 6789',
    businessPartnerId: 'bp-1',
    locationsCount: 1,
    devicesCount: 2,
    totalRevenue: 32000,
    monthlyRevenue: 3200,
    status: 'active',
    createdAt: '2024-06-20',
    contracts: [],
    industry: 'fitness',
    address: 'Sportová 22, Bratislava',
    website: 'www.fitnesszone.sk',
    contactPerson: 'Lucia Tóthová',
    assignedTeamMemberId: 'team-1'
  },
  {
    id: 'merchant-7',
    name: 'Book World',
    email: 'info@bookworld.sk',
    phone: '+421 2 5555 7890',
    businessPartnerId: 'bp-1',
    locationsCount: 2,
    devicesCount: 4,
    totalRevenue: 68000,
    monthlyRevenue: 6800,
    status: 'active',
    createdAt: '2024-07-10',
    contracts: [],
    industry: 'retail',
    address: 'Literárna 14, Bratislava',
    website: 'www.bookworld.sk',
    contactPerson: 'Martin Čierny',
    assignedTeamMemberId: 'team-2'
  },
  {
    id: 'merchant-8',
    name: 'Auto Service Plus',
    email: 'service@autoplus.sk',
    phone: '+421 2 5555 8901',
    businessPartnerId: 'bp-1',
    locationsCount: 1,
    devicesCount: 3,
    totalRevenue: 89000,
    monthlyRevenue: 8900,
    status: 'active',
    createdAt: '2024-08-15',
    contracts: [],
    industry: 'automotive',
    address: 'Priemyselná 45, Bratislava',
    website: 'www.autoplus.sk',
    contactPerson: 'Jozef Kováč',
    assignedTeamMemberId: 'team-3'
  }
];

export interface DemoLocation {
  id: string;
  name: string;
  address: string;
  type: 'retail' | 'restaurant' | 'travel' | 'online';
  devicesCount: number;
  monthlyRevenue: number;
  isActive: boolean;
  clientId: string;
  businessPartnerId: string;
  phone?: string;
  contactPerson?: string;
  openingHours?: string;
  status: 'active' | 'inactive' | 'setup';
  manager: string;
  dailyTransactions: number;
  email: string;
  openDate: string;
}

export interface DemoDevice {
  id: string;
  name: string;
  tid: string;
  status: 'online' | 'offline' | 'maintenance';
  transactions: number;
  revenue: number;
  uptime: number;
  locationId: string;
  model: string;
  brand: string;
  serialNumber: string;
  installDate: string;
  lastMaintenance?: string;
}

export interface DemoTicket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  clientId: string;
  deviceId?: string;
  locationId?: string;
  assignedTo?: string;
  estimatedResolution?: string;
  type: string;
  responseTime?: string;
  lastUpdate?: string;
}

export interface DemoContract {
  id: string;
  title: string;
  clientId: string;
  status: 'active' | 'pending' | 'expired' | 'terminated';
  startDate: string;
  endDate: string;
  value: number;
  type: 'hardware' | 'software' | 'service' | 'maintenance';
  description: string;
  renewalDate?: string;
  contractNumber: string;
  clientName: string;
  locationId?: string;
  monthlyFee: number;
  autoRenewal: boolean;
  notes?: string;
  businessPartnerId?: string;
  createdBy?: string;
  createdByName?: string;
}

export interface DemoTransaction {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  timestamp: string;
  deviceId: string;
  locationId: string;
  clientId: string;
  paymentMethod: 'card' | 'contactless' | 'mobile' | 'cash';
  reference: string;
  fee: number;
}

// Demo locations
export const demoLocations: DemoLocation[] = [
  {
    id: 'loc-1',
    name: 'Restaurant Savoy - Centrum',
    address: 'Námestie slobody 12, Bratislava',
    type: 'restaurant',
    devicesCount: 3,
    monthlyRevenue: 7500,
    isActive: true,
    clientId: 'merchant-1',
    businessPartnerId: 'bp-1',
    phone: '+421 2 5555 1234',
    contactPerson: 'Ján Novák',
    openingHours: '11:00 - 23:00',
    status: 'active',
    manager: 'Ján Novák',
    dailyTransactions: 85,
    email: 'centrum@savoy.sk',
    openDate: '2024-01-15'
  },
  {
    id: 'loc-2', 
    name: 'Fashion Elite - Eurovea',
    address: 'Eurovea, Pribinova 8, Bratislava',
    type: 'retail',
    devicesCount: 5,
    monthlyRevenue: 12000,
    isActive: true,
    clientId: 'merchant-2',
    businessPartnerId: 'bp-1',
    phone: '+421 2 6820 0000',
    contactPerson: 'Mária Kováčová',
    openingHours: '9:00 - 22:00',
    status: 'active',
    manager: 'Mária Kováčová',
    dailyTransactions: 140,
    email: 'eurovea@elite.sk',
    openDate: '2024-02-20'
  },
  {
    id: 'loc-3',
    name: 'Tech Pro - Hlavná pobočka',
    address: 'Michalská 15, Bratislava',
    type: 'retail',
    devicesCount: 4,
    monthlyRevenue: 9500,
    isActive: true,
    clientId: 'merchant-3',
    businessPartnerId: 'bp-1',
    phone: '+421 2 5555 3456',
    contactPerson: 'Peter Svoboda',
    openingHours: '8:00 - 18:00',
    status: 'active',
    manager: 'Peter Svoboda',
    dailyTransactions: 95,
    email: 'hlavna@techpro.sk',
    openDate: '2024-03-10'
  },
  {
    id: 'loc-4',
    name: 'Pharmacy Plus - Dunajská',
    address: 'Dunajská 45, Bratislava',
    type: 'retail',
    devicesCount: 3,
    monthlyRevenue: 4500,
    isActive: true,
    clientId: 'merchant-4',
    businessPartnerId: 'bp-1',
    phone: '+421 2 5555 4567',
    contactPerson: 'Anna Horáková',
    openingHours: '7:00 - 20:00',
    status: 'active',
    manager: 'Anna Horáková',
    dailyTransactions: 65,
    email: 'dunajska@pharmacyplus.sk',
    openDate: '2024-04-05'
  }
];

// Enhanced demo contracts with comprehensive data
export const demoContracts: DemoContract[] = [
  {
    id: 'C-001',
    title: 'Platobné služby - Restaurant Savoy',
    clientId: 'merchant-1',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    value: 18000,
    type: 'service',
    description: 'Kompletné platobné riešenie pre reštauračné prevádzky s POS systémom a online objednávkami.',
    renewalDate: '2024-11-15',
    contractNumber: 'SRV-2024-001',
    clientName: 'Restaurant Savoy',
    locationId: 'loc-1',
    monthlyFee: 750,
    autoRenewal: true,
    notes: 'Zahŕňa 24/7 technickú podporu a bezplatné aktualizácie',
    businessPartnerId: 'bp-1',
    createdBy: 'team-1',
    createdByName: 'Peter Fekiač'
  },
  {
    id: 'C-002',
    title: 'Hardware lease - Fashion Elite',
    clientId: 'merchant-2',
    status: 'active',
    startDate: '2024-02-20',
    endDate: '2026-02-19',
    value: 32000,
    type: 'hardware',
    description: 'Dvojročný lease 8 platobných terminálov pre fashion retail s možnosťou upgrade.',
    renewalDate: '2025-12-20',
    contractNumber: 'HW-2024-002',
    clientName: 'Fashion Store Elite',
    locationId: 'loc-2',
    monthlyFee: 1200,
    autoRenewal: false,
    notes: 'Zahŕňa údržbu, náhradné diely a ročnú aktualizáciu firmware',
    businessPartnerId: 'bp-1',
    createdBy: 'team-1',
    createdByName: 'Peter Fekiač'
  },
  {
    id: 'C-003',
    title: 'Software licencie - Tech Solutions',
    clientId: 'merchant-3',
    status: 'active',
    startDate: '2024-03-10',
    endDate: '2025-03-09',
    value: 12000,
    type: 'software',
    description: 'Ročné licencie pre POS software s API integráciou a cloud synchronizáciou.',
    contractNumber: 'SW-2024-003',
    clientName: 'Tech Solutions Pro',
    locationId: 'loc-3',
    monthlyFee: 500,
    autoRenewal: true,
    notes: 'Zahŕňa neobmedzené updates, developer support a cloud backup',
    businessPartnerId: 'bp-1',
    createdBy: 'team-2',
    createdByName: 'Ladislav Mathis'
  },
  {
    id: 'C-004',
    title: 'Maintenance zmluva - Pharmacy Plus',
    clientId: 'merchant-4',
    status: 'active',
    startDate: '2024-04-05',
    endDate: '2025-04-04',
    value: 8500,
    type: 'maintenance',
    description: 'Preventívna údržba a technická podpora pre lekáreň s emergency response.',
    contractNumber: 'MNT-2024-004',
    clientName: 'Pharmacy Plus',
    locationId: 'loc-4',
    monthlyFee: 350,
    autoRenewal: true,
    notes: 'Zahŕňa emergency response do 2h, pravidelné kontroly a náhradné diely',
    businessPartnerId: 'bp-1',
    createdBy: 'team-3',
    createdByName: 'Richie Plichta ❤️'
  },
  {
    id: 'C-005',
    title: 'Kompletné riešenie - Coffee Corner',
    clientId: 'merchant-5',
    status: 'active',
    startDate: '2024-05-12',
    endDate: '2025-05-11',
    value: 15000,
    type: 'service',
    description: 'Kompletné platobné riešenie pre kaviareň s loyalty programom a mobilnou aplikáciou.',
    contractNumber: 'SRV-2024-005',
    clientName: 'Coffee Corner',
    monthlyFee: 650,
    autoRenewal: true,
    notes: 'Zahŕňa loyalty systém, mobilnú app a marketing podporu',
    businessPartnerId: 'bp-1',
    createdBy: 'team-2',
    createdByName: 'Ladislav Mathis'
  },
  {
    id: 'C-006',
    title: 'Fitness platobné riešenie - Fitness Zone',
    clientId: 'merchant-6',
    status: 'active',
    startDate: '2024-06-20',
    endDate: '2025-06-19',
    value: 9500,
    type: 'service',
    description: 'Špecializované platobné riešenie pre fitness centrum s členským systémom.',
    contractNumber: 'FIT-2024-006',
    clientName: 'Fitness Zone',
    monthlyFee: 425,
    autoRenewal: true,
    notes: 'Zahŕňa členský systém, automatické platby a access control integráciu',
    businessPartnerId: 'bp-1',
    createdBy: 'team-1',
    createdByName: 'Peter Fekiač'
  },
  {
    id: 'C-007',
    title: 'Retail systém - Book World',
    clientId: 'merchant-7',
    status: 'active',
    startDate: '2024-07-10',
    endDate: '2025-07-09',
    value: 11000,
    type: 'software',
    description: 'POS systém pre kníhkupectvo s inventory managementom a e-shop integráciou.',
    contractNumber: 'RET-2024-007',
    clientName: 'Book World',
    monthlyFee: 485,
    autoRenewal: true,
    notes: 'Zahŕňa inventory management, e-shop synchronizáciu a reporting',
    businessPartnerId: 'bp-1',
    createdBy: 'team-2',
    createdByName: 'Ladislav Mathis'
  },
  {
    id: 'C-008',
    title: 'Automotive service riešenie - Auto Service Plus',
    clientId: 'merchant-8',
    status: 'active',
    startDate: '2024-08-15',
    endDate: '2025-08-14',
    value: 13500,
    type: 'service',
    description: 'Platobné riešenie pre autoservis s appointment systémom a diagnostickými nástrojmi.',
    contractNumber: 'AUTO-2024-008',
    clientName: 'Auto Service Plus',
    monthlyFee: 575,
    autoRenewal: true,
    notes: 'Zahŕňa appointment booking, diagnostické nástroje a CRM systém',
    businessPartnerId: 'bp-1',
    createdBy: 'team-3',
    createdByName: 'Richie Plichta ❤️'
  }
];

export const demoDevices: DemoDevice[] = [
  {
    id: 'dev-1',
    name: 'Terminal Savoy 1',
    tid: 'SAV001',
    status: 'online',
    transactions: 1250,
    revenue: 6450,
    uptime: 99.2,
    locationId: 'loc-1',
    model: 'iWL250',
    brand: 'Ingenico',
    serialNumber: 'ING2024001',
    installDate: '2024-01-15',
    lastMaintenance: '2024-11-01'
  },
  {
    id: 'dev-2',
    name: 'Terminal Elite 1',
    tid: 'ELT001',
    status: 'online',
    transactions: 1850,
    revenue: 9200,
    uptime: 98.5,
    locationId: 'loc-2',
    model: 'V240m',
    brand: 'Verifone',
    serialNumber: 'VER2024002',
    installDate: '2024-02-20'
  }
];

export const demoTickets: DemoTicket[] = [
  {
    id: 'T-001',
    title: 'Terminal offline v Restaurant Savoy',
    description: 'Terminal SAV001 sa nepodarilo pripojiť k sieti po výpadku elektriny.',
    priority: 'high',
    status: 'open',
    createdAt: '2024-11-28T08:15:00Z',
    updatedAt: '2024-11-28T08:15:00Z',
    clientId: 'merchant-1',
    deviceId: 'dev-1',
    locationId: 'loc-1',
    estimatedResolution: '2024-11-28T18:00:00Z',
    type: 'Technický problém',
    responseTime: '4h',
    lastUpdate: '2024-11-28T10:30:00Z'
  }
];

export const demoTransactions: DemoTransaction[] = [
  {
    id: 'TX-001',
    amount: 45.50,
    currency: 'EUR',
    status: 'completed',
    timestamp: '2024-11-28T14:30:15Z',
    deviceId: 'dev-1',
    locationId: 'loc-1',
    clientId: 'merchant-1',
    paymentMethod: 'contactless',
    reference: 'REF123456789',
    fee: 0.23
  }
];

export const calculatePartnerRevenue = (clients: Client[]) => {
  const totalMonthlyRevenue = clients.reduce((sum, client) => sum + client.monthlyRevenue, 0);
  const partnerCommission = totalMonthlyRevenue * 0.1;
  
  return {
    totalMonthlyRevenue,
    partnerCommission,
    clientBreakdown: clients.map(client => ({
      clientId: client.id,
      clientName: client.name,
      clientRevenue: client.monthlyRevenue,
      partnerEarning: client.monthlyRevenue * 0.1
    }))
  };
};

export const getLocationDevices = (locationId: string) => {
  return demoDevices.filter(device => device.locationId === locationId);
};

export const getClientLocations = (clientId: string) => {
  return demoLocations.filter(location => location.clientId === clientId);
};

export const getClientTickets = (clientId: string) => {
  return demoTickets.filter(ticket => ticket.clientId === clientId);
};

export const getClientContracts = (clientId: string) => {
  return demoContracts.filter(contract => contract.clientId === clientId);
};

export const getClientTransactions = (clientId: string) => {
  return demoTransactions.filter(transaction => transaction.clientId === clientId);
};

export const getBusinessPartnerContracts = (businessPartnerId: string) => {
  return demoContracts.filter(contract => contract.businessPartnerId === businessPartnerId);
};

// Enhanced demo data with proper relationships
export const mockTeamMembers = [
  {
    id: 'tm-1',
    name: 'Marián Lapoš',
    email: 'marian.lapos@onepos.eu',
    role: 'Business Partner Lead' as const,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'active' as const,
    department: 'Vedenie',
    joinDate: '2020-01-15',
    lastActive: new Date().toISOString(),
    phone: '+421 901 234 567',
    businessPartnerId: 'bp-1',
    permissions: ['manage_clients', 'view_reports', 'manage_team'],
    performance: {
      clientsManaged: 25,
      monthlyRevenue: 45000,
      satisfactionRating: 4.8,
      tasksCompleted: 124
    }
  },
  {
    id: 'tm-2',
    name: 'Anna Kováčová',
    email: 'anna.kovacova@onepos.eu',
    role: 'Account Manager' as const,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: 'active' as const,
    department: 'Sales',
    joinDate: '2021-03-10',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    phone: '+421 902 345 678',
    businessPartnerId: 'bp-1',
    permissions: ['manage_clients', 'view_reports'],
    performance: {
      clientsManaged: 18,
      monthlyRevenue: 32000,
      satisfactionRating: 4.6,
      tasksCompleted: 98
    }
  },
  {
    id: 'tm-3',
    name: 'Peter Novák',
    email: 'peter.novak@onepos.eu',
    role: 'Technical Support' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'away' as const,
    department: 'Support',
    joinDate: '2021-07-20',
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    phone: '+421 903 456 789',
    businessPartnerId: 'bp-1',
    permissions: ['view_tickets', 'manage_devices'],
    performance: {
      clientsManaged: 35,
      monthlyRevenue: 0,
      satisfactionRating: 4.9,
      tasksCompleted: 156
    }
  }
];

export const mockClients = [
  {
    id: 'client-1',
    name: 'TechCorp s.r.o.',
    email: 'info@techcorp.sk',
    phone: '+421 2 1234 5678',
    address: 'Technická 1, 811 07 Bratislava',
    businessPartnerId: 'bp-1',
    assignedTo: 'tm-1',
    status: 'active' as const,
    type: 'retail' as const,
    joinDate: '2023-01-15',
    lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    totalRevenue: 125000,
    monthlyRevenue: 12500,
    devicesCount: 5,
    locationsCount: 3,
    contractStatus: 'active' as const,
    satisfactionRating: 4.7,
    notes: 'Veľmi spokojný klient, pravidelné platby, plánuje rozšírenie.',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop'
  },
  {
    id: 'client-2',
    name: 'RetailMax a.s.',
    email: 'contact@retailmax.sk',
    phone: '+421 2 2345 6789',
    address: 'Obchodná 15, 811 06 Bratislava',
    businessPartnerId: 'bp-1',
    assignedTo: 'tm-2',
    status: 'active' as const,
    type: 'restaurant' as const,
    joinDate: '2023-03-22',
    lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    totalRevenue: 89000,
    monthlyRevenue: 8900,
    devicesCount: 8,
    locationsCount: 2,
    contractStatus: 'active' as const,
    satisfactionRating: 4.5,
    notes: 'Rastúci reťazec reštaurácií, záujem o nové služby.',
    avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&h=150&fit=crop'
  },
  {
    id: 'client-3',
    name: 'CafeStreet s.r.o.',
    email: 'hello@cafestreet.sk',
    phone: '+421 2 3456 7890',
    address: 'Hlavná 28, 040 01 Košice',
    businessPartnerId: 'bp-1',
    assignedTo: 'tm-2',
    status: 'pending' as const,
    type: 'cafe' as const,
    joinDate: '2024-01-10',
    lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    totalRevenue: 15000,
    monthlyRevenue: 5000,
    devicesCount: 2,
    locationsCount: 1,
    contractStatus: 'pending' as const,
    satisfactionRating: 4.2,
    notes: 'Nový klient, momentálne v procese nastavenia.',
    avatar: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=150&h=150&fit=crop'
  },
  {
    id: 'client-4',
    name: 'SportZone Ltd.',
    email: 'admin@sportzone.sk',
    phone: '+421 2 4567 8901',
    address: 'Športová 5, 010 01 Žilina',
    businessPartnerId: 'bp-1',
    assignedTo: 'tm-1',
    status: 'inactive' as const,
    type: 'retail' as const,
    joinDate: '2022-11-05',
    lastActivity: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    totalRevenue: 67000,
    monthlyRevenue: 0,
    devicesCount: 3,
    locationsCount: 1,
    contractStatus: 'suspended' as const,
    satisfactionRating: 3.8,
    notes: 'Dočasne pozastavené služby kvôli finančným problémom.',
    avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop'
  }
];

export const mockContracts = [
  {
    id: 'contract-1',
    clientId: 'client-1',
    clientName: 'TechCorp s.r.o.',
    businessPartnerId: 'bp-1',
    assignedTo: 'tm-1',
    title: 'POS Systém - Kompletné riešenie',
    type: 'pos_system' as const,
    status: 'active' as const,
    startDate: '2023-01-15',
    endDate: '2025-01-15',
    value: 125000,
    monthlyFee: 2500,
    description: 'Kompletné POS riešenie pre 3 prevádzky s cloudovým systémom.',
    services: ['POS terminály', 'Cloudový systém', 'Technická podpora', 'Školenie'],
    lastUpdated: '2024-01-15',
    nextReview: '2024-07-15'
  },
  {
    id: 'contract-2',
    clientId: 'client-2',
    clientName: 'RetailMax a.s.',
    businessPartnerId: 'bp-1',
    assignedTo: 'tm-2',
    title: 'Reštauračný systém Premium',
    type: 'restaurant_system' as const,
    status: 'active' as const,
    startDate: '2023-03-22',
    endDate: '2025-03-22',
    value: 89000,
    monthlyFee: 1800,
    description: 'Špecializovaný systém pre reštaurácie s objednávkovým systémom.',
    services: ['POS terminály', 'Online objednávky', 'Inventory systém', 'Analytics'],
    lastUpdated: '2024-03-22',
    nextReview: '2024-09-22'
  },
  {
    id: 'contract-3',
    clientId: 'client-3',
    clientName: 'CafeStreet s.r.o.',
    businessPartnerId: 'bp-1',
    assignedTo: 'tm-2',
    title: 'Kaviareň Starter Package',
    type: 'basic_pos' as const,
    status: 'pending' as const,
    startDate: '2024-01-10',
    endDate: '2026-01-10',
    value: 15000,
    monthlyFee: 650,
    description: 'Základný POS systém pre malé kaviarne.',
    services: ['Jeden POS terminál', 'Základný reporting', 'Email podpora'],
    lastUpdated: '2024-01-10',
    nextReview: '2024-07-10'
  }
];

// Enhanced tickets with proper role-based assignment
export const mockTickets = [
  {
    id: 'ticket-1',
    title: 'POS terminál nefunguje',
    description: 'POS terminál v hlavnej prevádzke sa zasekáva pri platbách kartou.',
    status: 'open' as const,
    priority: 'high' as const,
    category: 'technical' as const,
    clientId: 'client-1',
    clientName: 'TechCorp s.r.o.',
    businessPartnerId: 'bp-1',
    assignedTo: 'tm-3',
    assignedToName: 'Peter Novák',
    createdBy: 'client-1',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    tags: ['urgent', 'hardware'],
    attachments: ['error_log.txt', 'terminal_photo.jpg']
  },
  {
    id: 'ticket-2',
    title: 'Žiadosť o školenie nových zamestnancov',
    description: 'Potrebujeme zaškoliť 3 nových zamestnancov na prácu s POS systémom.',
    status: 'in_progress' as const,
    priority: 'medium' as const,
    category: 'training' as const,
    clientId: 'client-2',
    clientName: 'RetailMax a.s.',
    businessPartnerId: 'bp-1',
    assignedTo: 'tm-2',
    assignedToName: 'Anna Kováčová',
    createdBy: 'client-2',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['training', 'scheduled'],
    attachments: []
  },
  {
    id: 'ticket-3',
    title: 'Problém s cloudovým systémom',
    description: 'Dáta sa nesynchronizujú medzi prevádzkami.',
    status: 'resolved' as const,
    priority: 'high' as const,
    category: 'technical' as const,
    clientId: 'client-1',
    clientName: 'TechCorp s.r.o.',
    businessPartnerId: 'bp-1',
    assignedTo: 'tm-3',
    assignedToName: 'Peter Novák',
    createdBy: 'client-1',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    tags: ['cloud', 'sync', 'resolved'],
    attachments: ['solution_steps.pdf']
  }
];
