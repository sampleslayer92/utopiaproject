
export interface Contract {
  id: string;
  title: string;
  client: string;
  type: 'subscription' | 'lease' | 'purchase' | 'maintenance';
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'expired' | 'cancelled';
  terms?: string;
}

export interface ContractData {
  id: string;
  clientId: string;
  clientName: string;
  contractNumber: string;
  type: string;
  status: 'active' | 'pending' | 'expired';
  startDate: string;
  endDate: string;
  value: number;
  monthlyFee: number;
  commissionRate: number;
  devices: string[];
  signedBy: string;
  notes: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  industry: string;
  contactPerson?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  totalRevenue: number;
  monthlyRevenue: number;
}

export interface BusinessPartner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  region?: string;
  tier: 'gold' | 'silver' | 'bronze' | 'platinum';
  status: 'active' | 'inactive' | 'suspended';
  totalSales: number;
  commission: number;
  clients: number;
}
