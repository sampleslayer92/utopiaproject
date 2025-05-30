
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 'technical' | 'billing' | 'device' | 'contract' | 'other';

export interface TicketComment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  attachments?: string[];
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  createdBy: string;
  assignedTo?: string;
  clientId: string;
  organizationId: string; // Added missing property
  locationId?: string;
  deviceId?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  comments: TicketComment[];
}
