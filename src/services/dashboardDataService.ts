
import { TeamActivity, DashboardFilters } from '@/types/activity';
import { TeamMemberPerformance } from '@/types/team';

// Mock activities data
const mockActivities: TeamActivity[] = [
  {
    id: '1',
    memberId: 'peter',
    memberName: 'Peter Fekiač',
    actionType: 'contract_signed',
    description: 'podpísal novú zmluvu s klientom Kaviareň Mlynská',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    details: {
      clientName: 'Kaviareň Mlynská',
      contractValue: 2850
    },
    icon: '✍️'
  },
  {
    id: '2',
    memberId: 'ladislav',
    memberName: 'Ladislav Mathis',
    description: 'pridal nového klienta – MobilCoffee',
    actionType: 'client_added',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    details: {
      clientName: 'MobilCoffee'
    },
    icon: '➕'
  },
  {
    id: '3',
    memberId: 'richie',
    memberName: 'Richie Plichta',
    actionType: 'device_updated',
    description: 'aktualizoval stav zariadenia pre Klienta A',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    details: {
      clientName: 'Klient A',
      deviceType: 'POS Terminal'
    },
    icon: '🛠️'
  },
  {
    id: '4',
    memberId: 'system',
    memberName: 'Systém',
    actionType: 'contract_status',
    description: 'Zmluva s prevádzkou Bistro Urban bola označená ako expirovaná',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    details: {
      clientName: 'Bistro Urban',
      statusFrom: 'active',
      statusTo: 'expired'
    },
    icon: '📄'
  }
];

// Enhanced team performance data
const enhancedTeamData: TeamMemberPerformance[] = [
  {
    id: 'peter',
    firstName: 'Peter',
    lastName: 'Fekiač',
    email: 'peter.fekiac@onepos.sk',
    position: 'Senior Sales Manager',
    department: 'Sales',
    businessPartnerId: 'bp1',
    status: 'active',
    hireDate: '2023-01-15',
    performance: {
      monthlyRevenue: 23800,
      totalRevenue: 285600,
      merchantsManaged: 15,
      contractsSigned: 12,
      efficiency: 95
    },
    assignedMerchants: ['m1', 'm2', 'm3'],
    permissions: ['sales', 'reports'],
    contractsByStatus: {
      draft: 3,
      signed: 12,
      rejected: 2,
      expired: 1
    },
    revenueBreakdown: {
      services: 8500,
      devices: 12000,
      commissions: 2800,
      licenses: 500
    },
    conversionRate: 60,
    averageContractValue: 1983,
    monthlyGoals: {
      contracts: 15,
      revenue: 25000
    },
    contractsSent: 20
  },
  {
    id: 'ladislav',
    firstName: 'Ladislav',
    lastName: 'Mathis',
    email: 'ladislav.mathis@onepos.sk',
    position: 'Sales Manager',
    department: 'Sales',
    businessPartnerId: 'bp1',
    status: 'active',
    hireDate: '2023-03-10',
    performance: {
      monthlyRevenue: 18800,
      totalRevenue: 207800,
      merchantsManaged: 12,
      contractsSigned: 8,
      efficiency: 92
    },
    assignedMerchants: ['m4', 'm5'],
    permissions: ['sales'],
    contractsByStatus: {
      draft: 2,
      signed: 8,
      rejected: 3,
      expired: 0
    },
    revenueBreakdown: {
      services: 6200,
      devices: 9800,
      commissions: 2300,
      licenses: 500
    },
    conversionRate: 53,
    averageContractValue: 2350,
    monthlyGoals: {
      contracts: 12,
      revenue: 20000
    },
    contractsSent: 15
  },
  {
    id: 'richie',
    firstName: 'Richie',
    lastName: 'Plichta',
    email: 'richie.plichta@onepos.sk',
    position: 'Technical Sales',
    department: 'Sales',
    businessPartnerId: 'bp1',
    status: 'active',
    hireDate: '2022-11-20',
    performance: {
      monthlyRevenue: 16600,
      totalRevenue: 299200,
      merchantsManaged: 10,
      contractsSigned: 16,
      efficiency: 98
    },
    assignedMerchants: ['m6', 'm7'],
    permissions: ['sales', 'technical'],
    contractsByStatus: {
      draft: 1,
      signed: 16,
      rejected: 1,
      expired: 0
    },
    revenueBreakdown: {
      services: 5500,
      devices: 8200,
      commissions: 2400,
      licenses: 500
    },
    conversionRate: 89,
    averageContractValue: 1038,
    monthlyGoals: {
      contracts: 18,
      revenue: 18000
    },
    contractsSent: 18
  }
];

export const getTeamActivities = (filters: DashboardFilters): TeamActivity[] => {
  let filtered = [...mockActivities];

  // Filter by team member
  if (filters.teamMember !== 'all') {
    filtered = filtered.filter(activity => activity.memberId === filters.teamMember);
  }

  // Filter by action type
  if (filters.actionType !== 'all') {
    const typeMap = {
      'contract': ['contract_signed', 'contract_status'],
      'client': ['client_added'],
      'device': ['device_updated'],
      'status': ['contract_status']
    };
    const allowedTypes = typeMap[filters.actionType] || [];
    filtered = filtered.filter(activity => allowedTypes.includes(activity.actionType));
  }

  // Sort by timestamp (newest first)
  return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 4);
};

export const getTeamPerformanceData = (filters: DashboardFilters): TeamMemberPerformance[] => {
  let filtered = [...enhancedTeamData];

  // Filter by team member
  if (filters.teamMember !== 'all') {
    filtered = filtered.filter(member => member.id === filters.teamMember);
  }

  return filtered;
};

export const getRevenueData = (filters: DashboardFilters) => {
  // Mock revenue data that responds to filters
  const baseData = [
    { month: 'Január', services: 15000, devices: 28000, commissions: 12000, licenses: 8000, total: 63000 },
    { month: 'Február', services: 18000, devices: 32000, commissions: 14000, licenses: 9500, total: 73500 },
    { month: 'Marec', services: 16500, devices: 29000, commissions: 13500, licenses: 8800, total: 67800 },
    { month: 'Apríl', services: 19000, devices: 35000, commissions: 15500, licenses: 10200, total: 79700 },
    { month: 'Máj', services: 20500, devices: 38000, commissions: 16800, licenses: 11000, total: 86300 },
    { month: 'Jún', services: 22000, devices: 41000, commissions: 18200, licenses: 12500, total: 93700 }
  ];

  // Apply period filter
  if (filters.period === 'month') {
    return baseData.slice(-1);
  } else if (filters.period === 'quarter') {
    return baseData.slice(-3);
  }

  return baseData;
};

export const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return 'pred chvíľou';
  } else if (diffInHours === 1) {
    return 'pred hodinou';
  } else if (diffInHours < 24) {
    return `pred ${diffInHours} hodinami`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `pred ${diffInDays} dňami`;
  }
};
