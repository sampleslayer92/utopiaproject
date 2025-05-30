
import { User, UserRole } from '@/types/auth';

export const roleHierarchy: Record<UserRole, number> = {
  'admin': 4,
  'business_partner': 3,
  'client': 2,
  'location': 1
};

export const canUserAccess = (currentUser: User, targetRole: UserRole): boolean => {
  return roleHierarchy[currentUser.role] >= roleHierarchy[targetRole];
};

export const canUserManage = (currentUser: User, targetUser: User): boolean => {
  // Admin can manage everyone
  if (currentUser.role === 'admin') return true;
  
  // Business partner can manage their clients and locations
  if (currentUser.role === 'business_partner') {
    return targetUser.businessPartnerId === currentUser.id;
  }
  
  // Client can manage their locations
  if (currentUser.role === 'client') {
    return targetUser.clientId === currentUser.id;
  }
  
  return false;
};

export const getFilteredData = <T extends { businessPartnerId?: string; clientId?: string }>(
  data: T[], 
  currentUser: User
): T[] => {
  if (currentUser.role === 'admin') {
    return data;
  }
  
  if (currentUser.role === 'business_partner') {
    return data.filter(item => item.businessPartnerId === currentUser.id);
  }
  
  if (currentUser.role === 'client') {
    return data.filter(item => 
      item.businessPartnerId === currentUser.businessPartnerId ||
      item.clientId === currentUser.id
    );
  }
  
  if (currentUser.role === 'location') {
    return data.filter(item => 
      item.businessPartnerId === currentUser.businessPartnerId ||
      item.clientId === currentUser.clientId
    );
  }
  
  return [];
};

export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case 'admin': return 'Administrátor';
    case 'business_partner': return 'Business Partner';
    case 'client': return 'Merchant';
    case 'location': return 'Prevádzka';
    default: return 'Používateľ';
  }
};

export const getRolePermissions = (role: UserRole) => {
  const permissions = {
    admin: {
      canManageBusinessPartners: true,
      canManageClients: true,
      canManageLocations: true,
      canViewAllTickets: true,
      canViewAllTransactions: true,
      canManageSettings: true,
      canViewReports: true
    },
    business_partner: {
      canManageBusinessPartners: false,
      canManageClients: true,
      canManageLocations: true,
      canViewAllTickets: false, // only their clients' tickets
      canViewAllTransactions: false, // only their clients' transactions
      canManageSettings: true,
      canViewReports: true
    },
    client: {
      canManageBusinessPartners: false,
      canManageClients: false,
      canManageLocations: true,
      canViewAllTickets: false, // only their tickets
      canViewAllTransactions: false, // only their transactions
      canManageSettings: true,
      canViewReports: false
    },
    location: {
      canManageBusinessPartners: false,
      canManageClients: false,
      canManageLocations: false,
      canViewAllTickets: false, // only their tickets
      canViewAllTransactions: false, // only their transactions
      canManageSettings: false,
      canViewReports: false
    }
  };
  
  return permissions[role];
};
