
import { Client, BusinessPartner } from '@/types/dashboard';

// Extended demo data for all entities
export const demoBusinessPartners: BusinessPartner[] = [
  {
    id: 'bp-1',
    name: 'Martin Novák',
    email: 'martin@utopia.sk',
    phone: '+421 905 123 456',
    address: 'Hlavná 15, Bratislava',
    clientsCount: 4,
    devicesCount: 20,
    totalRevenue: 145000,
    monthlyRevenue: 4300,
    status: 'active',
    createdAt: '2024-01-15',
    tier: 'gold',
    region: 'Bratislava'
  },
  {
    id: 'bp-2',
    name: 'Jana Svoboda',
    email: 'jana@utopia.sk',
    phone: '+420 606 789 012',
    address: 'Wenceslas Square 8, Praha',
    clientsCount: 3,
    devicesCount: 15,
    totalRevenue: 98000,
    monthlyRevenue: 3200,
    status: 'active',
    createdAt: '2024-02-20',
    tier: 'silver',
    region: 'Praha'
  }
];

export const demoClients: Client[] = [
  {
    id: 'merchant-1',
    name: 'Restaurant Savoy',
    email: 'info@savoy.sk',
    businessPartnerId: 'bp-1',
    locationsCount: 2,
    devicesCount: 6,
    totalRevenue: 125000,
    monthlyRevenue: 12500,
    status: 'active',
    createdAt: '2024-01-15',
    contracts: [],
    phone: '+421 2 5555 1234',
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
    businessPartnerId: 'bp-1',
    locationsCount: 3,
    devicesCount: 8,
    totalRevenue: 185000,
    monthlyRevenue: 18500,
    status: 'active',
    createdAt: '2024-02-20',
    contracts: [],
    phone: '+421 2 5555 2345',
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
    businessPartnerId: 'bp-1',
    locationsCount: 1,
    devicesCount: 4,
    totalRevenue: 95000,
    monthlyRevenue: 9500,
    status: 'active',
    createdAt: '2024-03-10',
    contracts: [],
    phone: '+421 2 5555 3456',
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
    businessPartnerId: 'bp-1',
    locationsCount: 2,
    devicesCount: 5,
    totalRevenue: 78000,
    monthlyRevenue: 7800,
    status: 'active',
    createdAt: '2024-04-05',
    contracts: [],
    phone: '+421 2 5555 4567',
    industry: 'healthcare',
    address: 'Dunajská 45, Bratislava',
    website: 'www.pharmacyplus.sk',
    contactPerson: 'Anna Horáková',
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

// Demo devices
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
  },
  {
    id: 'dev-3',
    name: 'Terminal Tech Pro 1',
    tid: 'TEC001',
    status: 'online',
    transactions: 950,
    revenue: 4750,
    uptime: 97.8,
    locationId: 'loc-3',
    model: 'A920Pro',
    brand: 'PAX',
    serialNumber: 'PAX2024003',
    installDate: '2024-03-10'
  },
  {
    id: 'dev-4',
    name: 'Terminal Pharmacy 1',
    tid: 'PHA001',
    status: 'maintenance',
    transactions: 650,
    revenue: 3250,
    uptime: 95.2,
    locationId: 'loc-4',
    model: 'mPOP',
    brand: 'Square',
    serialNumber: 'SQR2024004',
    installDate: '2024-04-05',
    lastMaintenance: '2024-11-25'
  }
];

// Demo tickets
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
  },
  {
    id: 'T-002',
    title: 'Pomalé spracovanie platieb - Fashion Elite',
    description: 'Zákazníci si sťažujú na pomalé spracovanie platobných transakcií v Eurovea.',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2024-11-27T14:30:00Z',
    updatedAt: '2024-11-28T09:00:00Z',
    clientId: 'merchant-2',
    locationId: 'loc-2',
    assignedTo: 'Richie Plichta ❤️',
    type: 'Performance',
    responseTime: '2h',
    lastUpdate: '2024-11-28T09:00:00Z'
  },
  {
    id: 'T-003',
    title: 'Aktualizácia firmware - Pharmacy Plus',
    description: 'Potrebná aktualizácia firmware na všetkých zariadeniach v lekárni.',
    priority: 'low',
    status: 'resolved',
    createdAt: '2024-11-25T10:00:00Z',
    updatedAt: '2024-11-27T16:00:00Z',
    clientId: 'merchant-4',
    locationId: 'loc-4',
    type: 'Údržba',
    responseTime: '1h',
    lastUpdate: '2024-11-27T16:00:00Z'
  }
];

// Enhanced demo contracts with more entries for business partners
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
    description: 'Kompletné platobné riešenie pre reštauračné prevádzky s POS systémom.',
    renewalDate: '2024-11-15',
    contractNumber: 'SRV-2024-001',
    clientName: 'Restaurant Savoy',
    locationId: 'loc-1',
    monthlyFee: 750,
    autoRenewal: true,
    notes: 'Zahŕňa 24/7 technickú podporu',
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
    description: 'Dvojročný lease 8 platobných terminálov pre fashion retail.',
    renewalDate: '2025-12-20',
    contractNumber: 'HW-2024-002',
    clientName: 'Fashion Store Elite',
    locationId: 'loc-2',
    monthlyFee: 1200,
    autoRenewal: false,
    notes: 'Zahŕňa údržbu a náhradné diely',
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
    description: 'Ročné licencie pre POS software s API integráciou.',
    contractNumber: 'SW-2024-003',
    clientName: 'Tech Solutions Pro',
    locationId: 'loc-3',
    monthlyFee: 500,
    autoRenewal: true,
    notes: 'Zahŕňa updates a developer support',
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
    description: 'Preventívna údržba a technická podpora pre lekáreň.',
    contractNumber: 'MNT-2024-004',
    clientName: 'Pharmacy Plus',
    locationId: 'loc-4',
    monthlyFee: 350,
    autoRenewal: true,
    notes: 'Zahŕňa emergency response do 2h',
    businessPartnerId: 'bp-1',
    createdBy: 'team-3',
    createdByName: 'Richie Plichta ❤️'
  },
  {
    id: 'C-005',
    title: 'Rozšírené platobné služby - Restaurant Savoy',
    clientId: 'merchant-1',
    status: 'pending',
    startDate: '2025-01-01',
    endDate: '2026-12-31',
    value: 24000,
    type: 'service',
    description: 'Rozšírenie služieb o online objednávky a delivery platformy.',
    contractNumber: 'SRV-2025-005',
    clientName: 'Restaurant Savoy',
    monthlyFee: 950,
    autoRenewal: false,
    notes: 'Čaká na schválenie riaditeľstva',
    businessPartnerId: 'bp-1',
    createdBy: 'team-1',
    createdByName: 'Peter Fekiač'
  },
  {
    id: 'C-006',
    title: 'Mobile payment riešenie - Fashion Elite',
    clientId: 'merchant-2',
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    value: 15000,
    type: 'hardware',
    description: 'Mobilné terminály pre pop-up stores a eventové predaje.',
    contractNumber: 'MOB-2024-006',
    clientName: 'Fashion Store Elite',
    monthlyFee: 650,
    autoRenewal: true,
    businessPartnerId: 'bp-1',
    createdBy: 'team-1',
    createdByName: 'Peter Fekiač'
  }
];

// Demo transactions
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
  },
  {
    id: 'TX-002',
    amount: 125.00,
    currency: 'EUR',
    status: 'completed',
    timestamp: '2024-11-28T14:25:30Z',
    deviceId: 'dev-2',
    locationId: 'loc-2',
    clientId: 'merchant-2',
    paymentMethod: 'card',
    reference: 'REF123456790',
    fee: 0.63
  },
  {
    id: 'TX-003',
    amount: 8.90,
    currency: 'EUR',
    status: 'failed',
    timestamp: '2024-11-28T14:20:45Z',
    deviceId: 'dev-3',
    locationId: 'loc-3',
    clientId: 'merchant-3',
    paymentMethod: 'card',
    reference: 'REF123456791',
    fee: 0.00
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
