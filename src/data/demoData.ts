
import { Ticket } from '@/types/tickets';

// Users data - updated to new 2-level structure
export const demoUsers = [
  {
    id: 'usr-admin-1',
    name: 'ISO Organizácia Admin',
    email: 'admin@isoorg.sk',
    role: 'admin' as const,
    avatar: '/avatars/admin.jpg'
  },
  {
    id: 'usr-client-1',
    name: 'Jana Svobodová',
    email: 'jana@restacia.sk',
    role: 'client' as const,
    organizationId: 'org-1',
    avatar: '/avatars/jana.jpg'
  },
  {
    id: 'usr-client-2',
    name: 'Martin Tatra',
    email: 'martin@hoteltatra.sk',
    role: 'client' as const,
    organizationId: 'org-1',
    avatar: '/avatars/martin.jpg'
  },
  {
    id: 'usr-client-3',
    name: 'Eva Športová',
    email: 'eva@sportshop.sk',
    role: 'client' as const,
    organizationId: 'org-1',
    avatar: '/avatars/eva.jpg'
  },
  {
    id: 'usr-client-4',
    name: 'Tomáš Zdravý',
    email: 'tomas@lekaren.sk',
    role: 'client' as const,
    organizationId: 'org-1',
    avatar: '/avatars/tomas.jpg'
  }
];

// Clients/Merchants data - updated structure
export const demoClients = [
  {
    id: 'usr-client-1',
    name: 'Reštaurácia U Jána',
    businessName: 'Reštaurácia U Jána s.r.o.',
    email: 'jana@restacia.sk',
    phone: '+421 905 123 456',
    address: 'Hlavná 15, 811 01 Bratislava',
    organizationId: 'org-1',
    status: 'active' as const,
    joinedDate: '2023-06-15',
    monthlyVolume: 25000,
    monthlyRevenue: 2500,
    devicesCount: 2,
    industry: 'restaurant'
  },
  {
    id: 'usr-client-2',
    name: 'Hotel Tatra',
    businessName: 'Hotel Tatra a.s.',
    email: 'martin@hoteltatra.sk',
    phone: '+421 905 234 567',
    address: 'Námestie SNP 8, 811 06 Bratislava',
    organizationId: 'org-1',
    status: 'active' as const,
    joinedDate: '2023-08-20',
    monthlyVolume: 85000,
    monthlyRevenue: 8500,
    devicesCount: 5,
    industry: 'hospitality'
  },
  {
    id: 'usr-client-3',
    name: 'Športový obchod',
    businessName: 'Sport Pro s.r.o.',
    email: 'eva@sportshop.sk',
    phone: '+421 905 345 678',
    address: 'Obchodná 22, 811 02 Bratislava',
    organizationId: 'org-1',
    status: 'active' as const,
    joinedDate: '2023-07-10',
    monthlyVolume: 45000,
    monthlyRevenue: 4500,
    devicesCount: 3,
    industry: 'retail'
  },
  {
    id: 'usr-client-4',
    name: 'Lekáreň Zdravie',
    businessName: 'Zdravie Pharmacy s.r.o.',
    email: 'tomas@lekaren.sk',
    phone: '+421 905 456 789',
    address: 'Lekárska 5, 811 08 Bratislava',
    organizationId: 'org-1',
    status: 'active' as const,
    joinedDate: '2023-09-05',
    monthlyVolume: 32000,
    monthlyRevenue: 3200,
    devicesCount: 2,
    industry: 'pharmacy'
  }
];

// Locations data - updated with organizationId and missing properties
export const demoLocations = [
  {
    id: 'loc-1',
    name: 'Hlavná prevádzka',
    address: 'Hlavná 15, 811 01 Bratislava',
    clientId: 'usr-client-1',
    organizationId: 'org-1',
    devicesCount: 2,
    status: 'active' as const,
    type: 'retail' as const,
    monthlyRevenue: 2500,
    manager: 'Jana Svobodová',
    createdAt: '2023-06-15T10:00:00Z'
  },
  {
    id: 'loc-2',
    name: 'Hotel - Recepcia',
    address: 'Námestie SNP 8, 811 06 Bratislava',
    clientId: 'usr-client-2',
    organizationId: 'org-1',
    devicesCount: 3,
    status: 'active' as const,
    type: 'hospitality' as const,
    monthlyRevenue: 5000,
    manager: 'Martin Tatra',
    createdAt: '2023-08-20T10:00:00Z'
  },
  {
    id: 'loc-3',
    name: 'Hotel - Reštaurácia',
    address: 'Námestie SNP 8, 811 06 Bratislava',
    clientId: 'usr-client-2',
    organizationId: 'org-1',
    devicesCount: 2,
    status: 'inactive' as const,
    type: 'hospitality' as const,
    monthlyRevenue: 3500,
    manager: 'Martin Tatra',
    createdAt: '2023-08-20T10:00:00Z'
  },
  {
    id: 'loc-4',
    name: 'Predajňa',
    address: 'Obchodná 22, 811 02 Bratislava',
    clientId: 'usr-client-3',
    organizationId: 'org-1',
    devicesCount: 3,
    status: 'active' as const,
    type: 'retail' as const,
    monthlyRevenue: 4500,
    manager: 'Eva Športová',
    createdAt: '2023-07-10T10:00:00Z'
  },
  {
    id: 'loc-5',
    name: 'Lekáreň',
    address: 'Lekárska 5, 811 08 Bratislava',
    clientId: 'usr-client-4',
    organizationId: 'org-1',
    devicesCount: 2,
    status: 'pending' as const,
    type: 'retail' as const,
    monthlyRevenue: 3200,
    manager: 'Tomáš Zdravý',
    createdAt: '2023-09-05T10:00:00Z'
  }
];

// Devices data - updated with correct status values and missing properties
export const demoDevices = [
  {
    id: 'dev-1',
    name: 'Terminal 1',
    type: 'terminal' as const,
    brand: 'Ingenico',
    model: 'iWL250',
    tid: 'T1001',
    status: 'active' as const,
    locationId: 'loc-1',
    clientId: 'usr-client-1',
    organizationId: 'org-1',
    lastTransaction: '2024-01-15T14:30:00Z',
    lastActivity: '2024-01-15T14:30:00Z',
    transactions: 1250,
    revenue: 15600,
    uptime: 98.5,
    serialNumber: 'IGN-2023-001',
    firmwareVersion: 'v2.1.4',
    installDate: '2023-06-15',
    lastMaintenance: '2024-01-01'
  },
  {
    id: 'dev-2',
    name: 'Terminal 2',
    type: 'terminal' as const,
    brand: 'Verifone',
    model: 'V240m',
    tid: 'T1002',
    status: 'active' as const,
    locationId: 'loc-1',
    clientId: 'usr-client-1',
    organizationId: 'org-1',
    lastTransaction: '2024-01-15T16:45:00Z',
    lastActivity: '2024-01-15T16:45:00Z',
    transactions: 980,
    revenue: 12400,
    uptime: 97.2,
    serialNumber: 'VRF-2023-002',
    firmwareVersion: 'v3.0.1',
    installDate: '2023-06-16'
  },
  {
    id: 'dev-3',
    name: 'Recepcia Terminal',
    type: 'terminal' as const,
    brand: 'PAX',
    model: 'A920Pro',
    tid: 'T2001',
    status: 'maintenance' as const,
    locationId: 'loc-2',
    clientId: 'usr-client-2',
    organizationId: 'org-1',
    lastTransaction: '2024-01-15T18:20:00Z',
    lastActivity: '2024-01-14T18:20:00Z',
    transactions: 2150,
    revenue: 28900,
    uptime: 99.1,
    serialNumber: 'PAX-2023-003',
    firmwareVersion: 'v1.5.2',
    installDate: '2023-08-20'
  },
  {
    id: 'dev-4',
    name: 'Terminal Offline',
    type: 'terminal' as const,
    brand: 'Ingenico',
    model: 'iWL220',
    tid: 'T2002',
    status: 'inactive' as const,
    locationId: 'loc-4',
    clientId: 'usr-client-3',
    organizationId: 'org-1',
    lastTransaction: '2024-01-10T10:20:00Z',
    lastActivity: '2024-01-10T10:20:00Z',
    transactions: 450,
    revenue: 8900,
    uptime: 85.2,
    serialNumber: 'IGN-2023-004',
    firmwareVersion: 'v2.0.3',
    installDate: '2023-07-10'
  },
  {
    id: 'dev-5',
    name: 'Terminal Error',
    type: 'terminal' as const,
    brand: 'Verifone',
    model: 'V240m',
    tid: 'T3001',
    status: 'error' as const,
    locationId: 'loc-5',
    clientId: 'usr-client-4',
    organizationId: 'org-1',
    lastTransaction: '2024-01-12T15:30:00Z',
    lastActivity: '2024-01-12T15:30:00Z',
    transactions: 120,
    revenue: 2400,
    uptime: 45.8,
    serialNumber: 'VRF-2023-005',
    firmwareVersion: 'v2.8.1',
    installDate: '2023-09-05'
  }
];

// Contracts data
export interface DemoContract {
  id: string;
  title: string;
  contractNumber: string;
  description: string;
  type: 'hardware' | 'software' | 'service' | 'maintenance';
  status: 'active' | 'pending' | 'expired' | 'terminated';
  value: number;
  monthlyFee?: number;
  startDate: string;
  endDate: string;
  clientId: string;
  clientName: string;
  organizationId: string;
  createdBy: string;
}

export const demoContracts: DemoContract[] = [
  {
    id: 'contract-1',
    title: 'Dodávka POS terminálov',
    contractNumber: 'CON-2023-001',
    description: 'Dodávka a inštalácia 2 POS terminálov pre reštauráciu',
    type: 'hardware',
    status: 'active',
    value: 598,
    monthlyFee: 25,
    startDate: '2023-06-15',
    endDate: '2025-06-15',
    clientId: 'usr-client-1',
    clientName: 'Reštaurácia U Jána',
    organizationId: 'org-1',
    createdBy: 'usr-admin-1'
  },
  {
    id: 'contract-2',
    title: 'Hotel POS systém',
    contractNumber: 'CON-2023-002',
    description: 'Kompletný POS systém pre hotel s 5 terminálmi',
    type: 'hardware',
    status: 'active',
    value: 1495,
    monthlyFee: 75,
    startDate: '2023-08-20',
    endDate: '2025-08-20',
    clientId: 'usr-client-2',
    clientName: 'Hotel Tatra',
    organizationId: 'org-1',
    createdBy: 'usr-admin-1'
  }
];

// Transactions data
export interface DemoTransaction {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  type: 'payment' | 'refund';
  timestamp: string;
  merchantId: string;
  merchantName: string;
  deviceId: string;
  locationId: string;
  organizationId: string;
  clientId: string;
  reference: string;
  paymentMethod: 'card' | 'contactless' | 'mobile' | 'cash';
  fee: number;
}

export const demoTransactions: DemoTransaction[] = [
  {
    id: 'txn-1',
    amount: 25.50,
    currency: 'EUR',
    status: 'completed',
    type: 'payment',
    timestamp: '2024-01-15T14:30:00Z',
    merchantId: 'usr-client-1',
    merchantName: 'Reštaurácia U Jána',
    deviceId: 'dev-1',
    locationId: 'loc-1',
    organizationId: 'org-1',
    clientId: 'usr-client-1',
    reference: 'TXN-240115-001',
    paymentMethod: 'card',
    fee: 0.51
  },
  {
    id: 'txn-2',
    amount: 120.00,
    currency: 'EUR',
    status: 'completed',
    type: 'payment',
    timestamp: '2024-01-15T16:45:00Z',
    merchantId: 'usr-client-2',
    merchantName: 'Hotel Tatra',
    deviceId: 'dev-3',
    locationId: 'loc-2',
    organizationId: 'org-1',
    clientId: 'usr-client-2',
    reference: 'TXN-240115-002',
    paymentMethod: 'contactless',
    fee: 2.40
  }
];

// Helper functions
export const getClientLocations = (clientId: string) => {
  return demoLocations.filter(location => location.clientId === clientId);
};

export const getLocationDevices = (locationId: string) => {
  return demoDevices.filter(device => device.locationId === locationId);
};

// Updated mockTickets with new structure
export const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'Terminal nefunguje na pobočke Bratislava',
    description: 'Zákazníci sa sťažujú, že terminál odmietne karty. Potrebujeme okamžitú pomoc.',
    status: 'open' as const,
    priority: 'high' as const,
    category: 'device' as const,
    createdBy: 'usr-client-1',
    assignedTo: 'usr-admin-1',
    clientId: 'usr-client-1',
    organizationId: 'org-1',
    locationId: 'loc-1',
    deviceId: 'dev-1',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    comments: []
  },
  {
    id: 'TKT-002',
    title: 'Požiadavka na nový terminál',
    description: 'Potrebujeme pridať druhý terminál do novej časti prevádzky.',
    status: 'in_progress' as const,
    priority: 'medium' as const,
    category: 'device' as const,
    createdBy: 'usr-client-2',
    assignedTo: 'usr-admin-1',
    clientId: 'usr-client-2',
    organizationId: 'org-1',
    locationId: 'loc-2',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    comments: []
  },
  {
    id: 'TKT-003',
    title: 'Problém s účtovaním poplatkov',
    description: 'Zistili sme rozdiel v účtovaných poplatkoch za minulý mesiac.',
    status: 'resolved' as const,
    priority: 'high' as const,
    category: 'billing' as const,
    createdBy: 'usr-client-3',
    assignedTo: 'usr-admin-1',
    clientId: 'usr-client-3',
    organizationId: 'org-1',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-13T11:30:00Z',
    resolvedAt: '2024-01-13T11:30:00Z',
    comments: []
  },
  {
    id: 'TKT-004',
    title: 'Aktualizácia softvéru',
    description: 'Potrebujeme aktualizovať softvér na všetkých termináloch.',
    status: 'open' as const,
    priority: 'medium' as const,
    category: 'technical' as const,
    createdBy: 'usr-client-1',
    assignedTo: 'usr-admin-1',
    clientId: 'usr-client-1',
    organizationId: 'org-1',
    createdAt: '2024-01-13T08:00:00Z',
    updatedAt: '2024-01-13T08:00:00Z',
    comments: []
  },
  {
    id: 'TKT-005',
    title: 'Zmena podmienok zmluvy',
    description: 'Chceme prediskutovať možnosť zníženia poplatkov.',
    status: 'in_progress' as const,
    priority: 'medium' as const,
    category: 'contract' as const,
    createdBy: 'usr-client-4',
    assignedTo: 'usr-admin-1',
    clientId: 'usr-client-4',
    organizationId: 'org-1',
    createdAt: '2024-01-11T13:15:00Z',
    updatedAt: '2024-01-14T10:20:00Z',
    comments: []
  }
];

// Helper function to get client name from tickets
export const getClientName = (clientId: string): string => {
  const client = demoClients.find(c => c.id === clientId);
  return client ? client.name : 'Neznámy klient';
};

// Helper function to get assigned person name
export const getAssignedToName = (assignedTo: string): string => {
  const user = demoUsers.find(u => u.id === assignedTo);
  return user ? user.name : 'Nepridelené';
};
