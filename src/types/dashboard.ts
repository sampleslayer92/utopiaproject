
import { LucideIcon } from 'lucide-react';

export interface DashboardCard {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: string[];
  badge?: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  businessPartnerId: string;
  locationsCount: number;
  devicesCount: number;
  totalRevenue: number;
  monthlyRevenue: number;
  expectedRevenue: number;
  commissionRate: number;
  calculatedCommission: number;
  contractViolation: boolean;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastActivity?: string;
  industry?: string;
  address?: string;
  website?: string;
  contactPerson?: string;
  assignedTeamMemberId?: string;
  services?: {
    id: string;
    name: string;
    monthlyFee: number;
    status: 'active' | 'inactive';
    commission: number;
  }[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  clientId: string;
  businessPartnerId: string;
  devicesCount: number;
  activeDevices: number;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: string;
  lastReportDate?: string;
  revenue: {
    monthly: number;
    total: number;
  };
}

export interface Device {
  id: string;
  name: string;
  type: string;
  model?: string;
  serialNumber?: string;
  locationId: string;
  clientId: string;
  businessPartnerId: string;
  status: 'online' | 'offline' | 'maintenance' | 'error';
  lastSeen: string;
  installDate: string;
  warrantyExpiry?: string;
  revenue: {
    daily: number;
    monthly: number;
    total: number;
  };
  metrics: {
    uptime: number;
    transactions: number;
    errors: number;
  };
}

export interface Contract {
  id: string;
  clientId: string;
  businessPartnerId: string;
  type: 'subscription' | 'lease' | 'purchase' | 'maintenance';
  title: string;
  value: number;
  monthlyValue?: number;
  status: 'active' | 'pending' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  renewalDate?: string;
  autoRenewal: boolean;
  terms: string;
  devices?: string[];
  companyInfo?: {
    name: string;
    ico: string;
    dic: string;
    address: string;
    email: string;
    phone: string;
  };
  locations?: {
    id: string;
    name: string;
    address: string;
    contact: string;
  }[];
  products?: string[];
  services?: string[];
  persons?: {
    name: string;
    position: string;
    email: string;
    phone: string;
  }[];
  billing?: {
    invoiceAddress: string;
    paymentMethod: string;
    paymentTerms: string;
  };
  digitalSignature?: {
    signedAt: string;
    signedBy: string;
    documentHash: string;
  };
}

export interface BusinessPartner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  clientsCount: number;
  devicesCount: number;
  totalRevenue: number;
  monthlyRevenue: number;
  expectedRevenue: number;
  commissionRate: number;
  calculatedCommission: number;
  contractViolation: boolean;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastActivity?: string;
  region?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface RevenueReport {
  period: string;
  totalRevenue: number;
  deviceRevenue: number;
  subscriptionRevenue: number;
  transactionCount: number;
  activeDevices: number;
  newClients: number;
  churnRate: number;
}
