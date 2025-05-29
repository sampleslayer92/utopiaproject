
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
    id: 'client-1',
    name: 'TechCorp s.r.o.',
    email: 'contact@techcorp.sk',
    businessPartnerId: 'bp-1',
    locationsCount: 4,
    devicesCount: 20,
    totalRevenue: 125000,
    monthlyRevenue: 12500,
    status: 'active',
    createdAt: '2024-11-15',
    contracts: []
  },
  {
    id: 'client-2',
    name: 'RetailMax a.s.',
    email: 'info@retailmax.sk',
    businessPartnerId: 'bp-1',
    locationsCount: 3,
    devicesCount: 15,
    totalRevenue: 98000,
    monthlyRevenue: 9800,
    status: 'active',
    createdAt: '2024-10-20',
    contracts: []
  },
  {
    id: 'client-3',
    name: 'CafeChain Ltd.',
    email: 'hello@cafechain.sk',
    businessPartnerId: 'bp-1',
    locationsCount: 6,
    devicesCount: 24,
    totalRevenue: 156000,
    monthlyRevenue: 15600,
    status: 'active',
    createdAt: '2024-09-10',
    contracts: []
  },
  {
    id: 'client-4',
    name: 'ShopEasy s.r.o.',
    email: 'orders@shopeasy.sk',
    businessPartnerId: 'bp-1',
    locationsCount: 2,
    devicesCount: 8,
    totalRevenue: 67000,
    monthlyRevenue: 6700,
    status: 'active',
    createdAt: '2024-08-05',
    contracts: []
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
    name: 'Hlavná pobočka',
    address: 'Hlavná 15, Bratislava centrum',
    type: 'retail',
    devicesCount: 6,
    monthlyRevenue: 12500,
    isActive: true,
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    phone: '+421 2 5555 1234',
    contactPerson: 'Peter Novotný',
    openingHours: '8:00 - 20:00'
  },
  {
    id: 'loc-2', 
    name: 'Letisko',
    address: 'M. R. Štefánika Airport, Bratislava',
    type: 'travel',
    devicesCount: 4,
    monthlyRevenue: 8200,
    isActive: true,
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    phone: '+421 2 4857 1111',
    contactPerson: 'Mária Kováčová',
    openingHours: '24/7'
  },
  {
    id: 'loc-3',
    name: 'Eurovea',
    address: 'Eurovea, Pribinova 8, Bratislava',
    type: 'retail',
    devicesCount: 8,
    monthlyRevenue: 15800,
    isActive: true,
    clientId: 'client-2',
    businessPartnerId: 'bp-1',
    phone: '+421 2 6820 0000',
    contactPerson: 'Ján Svoboda',
    openingHours: '9:00 - 22:00'
  },
  {
    id: 'loc-4',
    name: 'Online shop',
    address: 'E-commerce platforma',
    type: 'online',
    devicesCount: 2,
    monthlyRevenue: 6500,
    isActive: true,
    clientId: 'client-3',
    businessPartnerId: 'bp-1',
    phone: '+421 2 5555 9999',
    contactPerson: 'Online tím',
    openingHours: '24/7'
  },
  {
    id: 'loc-5',
    name: 'Kaviareň Central',
    address: 'Obchodná 24, Bratislava',
    type: 'restaurant',
    devicesCount: 3,
    monthlyRevenue: 4200,
    isActive: true,
    clientId: 'client-3',
    businessPartnerId: 'bp-1',
    phone: '+421 2 5555 7777',
    contactPerson: 'Anna Mráková',
    openingHours: '7:00 - 23:00'
  }
];

// Demo devices
export const demoDevices: DemoDevice[] = [
  {
    id: 'dev-1',
    name: 'Terminal 1',
    tid: 'T1001',
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
    name: 'Terminal 2',
    tid: 'T1002',
    status: 'online',
    transactions: 980,
    revenue: 5120,
    uptime: 97.8,
    locationId: 'loc-1',
    model: 'V240m',
    brand: 'Verifone',
    serialNumber: 'VER2024002',
    installDate: '2024-01-16'
  },
  {
    id: 'dev-3',
    name: 'Terminal 3',
    tid: 'T1003',
    status: 'maintenance',
    transactions: 750,
    revenue: 3890,
    uptime: 95.2,
    locationId: 'loc-1',
    model: 'A920Pro',
    brand: 'PAX',
    serialNumber: 'PAX2024003',
    installDate: '2024-02-01',
    lastMaintenance: '2024-11-25'
  },
  {
    id: 'dev-4',
    name: 'Mobilný čítač',
    tid: 'M1001',
    status: 'online',
    transactions: 420,
    revenue: 2180,
    uptime: 98.9,
    locationId: 'loc-2',
    model: 'mPOP',
    brand: 'Square',
    serialNumber: 'SQR2024004',
    installDate: '2024-03-15'
  },
  {
    id: 'dev-5',
    name: 'Web Gateway',
    tid: 'W4001',
    status: 'online',
    transactions: 2450,
    revenue: 12780,
    uptime: 99.9,
    locationId: 'loc-4',
    model: 'API Gateway',
    brand: 'Utopia',
    serialNumber: 'UTO2024005',
    installDate: '2024-04-01'
  }
];

// Demo tickets
export const demoTickets: DemoTicket[] = [
  {
    id: 'T-001',
    title: 'Zariadenie offline v centre',
    description: 'Terminal T1003 sa nepodarilo pripojiť k sieti po výpadku elektriny.',
    priority: 'high',
    status: 'open',
    createdAt: '2024-11-28T08:15:00Z',
    updatedAt: '2024-11-28T08:15:00Z',
    clientId: 'client-1',
    deviceId: 'dev-3',
    locationId: 'loc-1',
    estimatedResolution: '2024-11-28T18:00:00Z'
  },
  {
    id: 'T-002',
    title: 'Pomalé spracovanie platieb',
    description: 'Zákazníci si sťažujú na pomalé spracovanie platobných transakcií.',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2024-11-27T14:30:00Z',
    updatedAt: '2024-11-28T09:00:00Z',
    clientId: 'client-2',
    locationId: 'loc-3',
    assignedTo: 'Technický tím'
  },
  {
    id: 'T-003',
    title: 'Aktualizácia firmware',
    description: 'Potrebná aktualizácia firmware na všetkých zariadeniach v pobočke.',
    priority: 'low',
    status: 'resolved',
    createdAt: '2024-11-25T10:00:00Z',
    updatedAt: '2024-11-27T16:00:00Z',
    clientId: 'client-3',
    locationId: 'loc-5'
  }
];

// Demo contracts
export const demoContracts: DemoContract[] = [
  {
    id: 'C-001',
    title: 'Zmluva o poskytovaní platobných služieb',
    clientId: 'client-1',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    value: 25000,
    type: 'service',
    description: 'Kompletné platobné riešenie pre retail pobočky.',
    renewalDate: '2025-10-01'
  },
  {
    id: 'C-002',
    title: 'Dodávka platobných terminálov',
    clientId: 'client-2',
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2026-02-28',
    value: 45000,
    type: 'hardware',
    description: 'Dodávka a inštalácia 15 platobných terminálov.',
    renewalDate: '2025-12-01'
  },
  {
    id: 'C-003',
    title: 'Maintenance zmluva',
    clientId: 'client-3',
    status: 'pending',
    startDate: '2025-01-01',
    endDate: '2026-12-31',
    value: 12000,
    type: 'maintenance',
    description: 'Preventívna údržba a technická podpora 24/7.'
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
    clientId: 'client-1',
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
    locationId: 'loc-1',
    clientId: 'client-1',
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
    locationId: 'loc-1',
    clientId: 'client-1',
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
