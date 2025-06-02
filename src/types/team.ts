
export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  businessPartnerId: string;
  status: 'active' | 'inactive' | 'on_leave';
  hireDate: string;
  avatar?: string;
  performance: {
    monthlyRevenue: number;
    totalRevenue: number;
    merchantsManaged: number;
    contractsSigned: number;
    efficiency: number; // percentage
  };
  assignedMerchants: string[]; // merchant IDs
  lastActivity?: string;
  permissions: string[];
  salary?: number;
  commissionRate?: number; // percentage
  notes?: string;
}

export interface ContractsByStatus {
  draft: number;
  signed: number;
  rejected: number;
  expired: number;
}

export interface RevenueBreakdown {
  services: number;
  devices: number;
  commissions: number;
  licenses: number;
}

export interface TeamMemberPerformance extends TeamMember {
  contractsByStatus: ContractsByStatus;
  revenueBreakdown: RevenueBreakdown;
  conversionRate: number;
  averageContractValue: number;
  monthlyGoals: {
    contracts: number;
    revenue: number;
  };
  contractsSent: number;
}

export interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  totalRevenue: number;
  averagePerformance: number;
  topPerformer: TeamMember | null;
}

export interface Merchant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  businessPartnerId: string;
  assignedTeamMemberId?: string;
  locationsCount: number;
  devicesCount: number;
  totalRevenue: number;
  monthlyRevenue: number;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  industry: string;
  address?: string;
  website?: string;
  contactPerson?: string;
  notes?: string;
}
