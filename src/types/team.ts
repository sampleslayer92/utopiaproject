
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
  notes?: string;
}

export interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  totalRevenue: number;
  averagePerformance: number;
  topPerformer: TeamMember | null;
}
