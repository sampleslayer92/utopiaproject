
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
}

export interface Client {
  id: string;
  name: string;
  email: string;
  businessPartnerId: string;
  locationsCount: number;
  devicesCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  clientId: string;
  devicesCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  locationId: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: string;
}

export interface Contract {
  id: string;
  clientId: string;
  type: string;
  value: number;
  status: 'active' | 'pending' | 'expired';
  startDate: string;
  endDate: string;
}
