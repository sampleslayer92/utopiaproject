
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
