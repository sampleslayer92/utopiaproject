
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'device' | 'location' | 'contract' | 'technical' | 'billing';
  createdBy: string; // User ID
  assignedTo?: string; // Business Partner ID
  clientId?: string;
  businessPartnerId?: string; // Added businessPartnerId property
  locationId?: string;
  deviceId?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  comments: TicketComment[];
}

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  isInternal: boolean; // Internal notes vs client-visible comments
  createdAt: string;
}

export interface CreateTicketData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'device' | 'location' | 'contract' | 'technical' | 'billing';
  deviceId?: string;
  locationId?: string;
  attachments?: File[];
}
