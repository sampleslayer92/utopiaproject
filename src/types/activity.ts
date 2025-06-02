
export interface TeamActivity {
  id: string;
  memberId: string;
  memberName: string;
  actionType: 'contract_signed' | 'client_added' | 'device_updated' | 'contract_status';
  description: string;
  timestamp: string;
  details: {
    clientName?: string;
    contractValue?: number;
    deviceType?: string;
    statusFrom?: string;
    statusTo?: string;
  };
  icon: string;
}

export interface DashboardFilters {
  period: 'month' | 'quarter' | 'custom';
  teamMember: 'all' | string;
  actionType: 'all' | 'contract' | 'client' | 'device' | 'status';
  dateRange?: {
    from: string;
    to: string;
  };
}
