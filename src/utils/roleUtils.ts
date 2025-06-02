
import { User, UserRole } from '@/types/auth';

export const roleHierarchy: Record<UserRole, number> = {
  'admin': 3,
  'business_partner': 2,
  'client': 1
};

export const canUserAccess = (currentUser: User, targetRole: UserRole): boolean => {
  return roleHierarchy[currentUser.role] >= roleHierarchy[targetRole];
};

export const canUserManage = (currentUser: User, targetUser: User): boolean => {
  // ISO Organizácia (admin) can manage all users
  if (currentUser.role === 'admin') return true;
  
  // Business partners can manage clients
  if (currentUser.role === 'business_partner' && targetUser.role === 'client') return true;
  
  // Clients cannot manage other users
  return false;
};

export const getFilteredData = <T extends { organizationId?: string; clientId?: string; businessPartnerId?: string }>(
  data: T[], 
  currentUser: User
): T[] => {
  if (currentUser.role === 'admin') {
    return data;
  }
  
  if (currentUser.role === 'business_partner') {
    return data.filter(item => 
      item.businessPartnerId === currentUser.id ||
      item.organizationId === currentUser.organizationId
    );
  }
  
  if (currentUser.role === 'client') {
    return data.filter(item => 
      item.organizationId === currentUser.organizationId ||
      item.clientId === currentUser.id
    );
  }
  
  return [];
};

export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case 'admin': return 'ISO Organizácia';
    case 'business_partner': return 'Obchodný partner';
    case 'client': return 'Klient';
    default: return 'Používateľ';
  }
};

export const getRolePermissions = (role: UserRole) => {
  const permissions = {
    admin: {
      canManageClients: true,
      canManageBusinessPartners: true,
      canManageLocations: true,
      canViewAllTickets: true,
      canViewAllTransactions: true,
      canManageSettings: true,
      canViewReports: true,
      canManageDevices: true,
      canManageContracts: true
    },
    business_partner: {
      canManageClients: true,
      canManageBusinessPartners: false,
      canManageLocations: true,
      canViewAllTickets: false,
      canViewAllTransactions: false,
      canManageSettings: false,
      canViewReports: true,
      canManageDevices: true,
      canManageContracts: true
    },
    client: {
      canManageClients: false,
      canManageBusinessPartners: false,
      canManageLocations: true,
      canViewAllTickets: false, // only their tickets
      canViewAllTransactions: false, // only their transactions
      canManageSettings: true,
      canViewReports: false,
      canManageDevices: false,
      canManageContracts: false
    }
  };
  
  return permissions[role];
};
