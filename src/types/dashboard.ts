
export interface BusinessPartner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  clientsCount: number;
  devicesCount: number;
  totalRevenue: number;
  monthlyRevenue: number;
  expectedRevenue: number; // New: Expected revenue declared in contract
  commissionRate: number; // New: Commission percentage (default 0.5%)
  calculatedCommission: number; // New: Calculated commission
  contractViolation: boolean; // New: Flag for contract violation
  status: 'active' | 'inactive';
  createdAt: string;
  tier: 'gold' | 'silver' | 'bronze';
  region: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  businessPartnerId: string;
  managerId?: string;
  devicesCount: number;
  monthlyRevenue: number;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  type: 'main' | 'branch';
  contactPerson?: string;
  phone?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  businessPartnerId: string;
  assignedTeamMemberId?: string;
  locationsCount: number;
  devicesCount: number;
  totalRevenue: number;
  monthlyRevenue: number;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  industry: string;
  website?: string;
  contactPerson?: string;
  notes?: string;
}

export interface Device {
  id: string;
  model: string;
  serialNumber: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  locationId: string;
  businessPartnerId: string;
  clientId: string;
  lastActivity: string;
  installDate: string;
  type: 'pos' | 'payment_terminal' | 'tablet' | 'printer';
  version: string;
  batteryLevel?: number;
  networkStatus: 'online' | 'offline';
}

export interface Contract {
  id: string;
  number: string;
  title: string;
  clientId: string;
  clientName: string;
  type: 'hardware' | 'software' | 'service' | 'maintenance';
  status: 'draft' | 'pending' | 'active' | 'expired' | 'terminated';
  value: number;
  startDate: string;
  endDate: string;
  signedDate?: string;
  businessPartnerId: string;
  assignedTeamMemberId?: string;
  description?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: 'technical' | 'billing' | 'general' | 'hardware';
  clientId: string;
  clientName: string;
  businessPartnerId: string;
  assignedTeamMemberId?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: 'EUR' | 'USD' | 'CZK';
  type: 'payment' | 'refund' | 'fee' | 'commission';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  clientId: string;
  clientName: string;
  merchantId: string;
  deviceId: string;
  timestamp: string;
  description?: string;
  reference?: string;
}
