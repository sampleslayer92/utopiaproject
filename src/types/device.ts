
export interface Device {
  id: string;
  name: string;
  type: string;
  model?: string;
  serialNumber?: string;
  tid: string; // Terminal ID
  locationId: string;
  locationName: string;
  clientId: string;
  clientName: string;
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
