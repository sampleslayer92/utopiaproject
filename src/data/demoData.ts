
import { Client, BusinessPartner } from '@/types/dashboard';

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
    monthlyRevenue: 4300, // 10% from total client revenue of 43000
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

export const calculatePartnerRevenue = (clients: Client[]) => {
  const totalMonthlyRevenue = clients.reduce((sum, client) => sum + client.monthlyRevenue, 0);
  const partnerCommission = totalMonthlyRevenue * 0.1; // 10% commission
  
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
  const devicesByLocation = {
    'loc-1': [
      { id: 'dev-1', name: 'Terminal 1', tid: 'T1001', status: 'online', transactions: 1250, revenue: 6450, uptime: 99.2 },
      { id: 'dev-2', name: 'Terminal 2', tid: 'T1002', status: 'online', transactions: 980, revenue: 5120, uptime: 97.8 },
      { id: 'dev-3', name: 'Terminal 3', tid: 'T1003', status: 'online', transactions: 1180, revenue: 6180, uptime: 98.5 },
      { id: 'dev-4', name: 'Terminal 4', tid: 'T1004', status: 'maintenance', transactions: 750, revenue: 3890, uptime: 95.2 },
      { id: 'dev-5', name: 'Kiosk 1', tid: 'K1001', status: 'online', transactions: 420, revenue: 2180, uptime: 98.9 },
      { id: 'dev-6', name: 'Kiosk 2', tid: 'K1002', status: 'online', transactions: 380, revenue: 1980, uptime: 99.1 }
    ],
    'loc-2': [
      { id: 'dev-7', name: 'Airport Terminal 1', tid: 'A2001', status: 'online', transactions: 890, revenue: 4650, uptime: 98.7 },
      { id: 'dev-8', name: 'Airport Terminal 2', tid: 'A2002', status: 'online', transactions: 720, revenue: 3760, uptime: 99.3 },
      { id: 'dev-9', name: 'Duty Free 1', tid: 'D2001', status: 'online', transactions: 650, revenue: 3390, uptime: 97.5 },
      { id: 'dev-10', name: 'Duty Free 2', tid: 'D2002', status: 'offline', transactions: 0, revenue: 0, uptime: 0 }
    ],
    'loc-3': [
      { id: 'dev-11', name: 'Mall Terminal 1', tid: 'M3001', status: 'online', transactions: 1450, revenue: 7560, uptime: 99.5 },
      { id: 'dev-12', name: 'Mall Terminal 2', tid: 'M3002', status: 'online', transactions: 1320, revenue: 6890, uptime: 98.8 },
      { id: 'dev-13', name: 'Mall Terminal 3', tid: 'M3003', status: 'online', transactions: 1180, revenue: 6150, uptime: 99.2 },
      { id: 'dev-14', name: 'Food Court 1', tid: 'F3001', status: 'online', transactions: 890, revenue: 4640, uptime: 97.9 },
      { id: 'dev-15', name: 'Food Court 2', tid: 'F3002', status: 'online', transactions: 780, revenue: 4070, uptime: 98.6 },
      { id: 'dev-16', name: 'Cinema Terminal', tid: 'C3001', status: 'online', transactions: 450, revenue: 2350, uptime: 99.8 },
      { id: 'dev-17', name: 'Parking Terminal', tid: 'P3001', status: 'online', transactions: 320, revenue: 1670, uptime: 98.1 },
      { id: 'dev-18', name: 'Info Kiosk', tid: 'I3001', status: 'maintenance', transactions: 0, revenue: 0, uptime: 0 }
    ],
    'loc-4': [
      { id: 'dev-19', name: 'Web Gateway 1', tid: 'W4001', status: 'online', transactions: 2450, revenue: 12780, uptime: 99.9 },
      { id: 'dev-20', name: 'Mobile Gateway', tid: 'W4002', status: 'online', transactions: 1890, revenue: 9870, uptime: 99.7 }
    ]
  };
  
  return devicesByLocation[locationId as keyof typeof devicesByLocation] || [];
};
