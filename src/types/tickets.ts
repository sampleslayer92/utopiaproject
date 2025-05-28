
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'general' | 'feature_request';
  createdBy: string;
  assignedTo?: string;
  businessPartnerId?: string;
  clientId?: string;
  locationId?: string;
  createdAt: string;
  updatedAt: string;
  attachments?: TicketAttachment[];
  comments?: TicketComment[];
}

export interface TicketAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  uploadedAt: string;
}

export interface TicketComment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface CreateTicketData {
  title: string;
  description: string;
  priority: Ticket['priority'];
  category: Ticket['category'];
  assignedTo?: string;
}
