
import { User, UserRole } from '@/types/auth';

export const roleHierarchy: Record<UserRole, number> = {
  'admin': 2,
  'client': 1
};

export const canUserAccess = (currentUser: User, targetRole: UserRole): boolean => {
  return roleHierarchy[currentUser.role] >= roleHierarchy[targetRole];
};

export const canUserManage = (currentUser: User, targetUser: User): boolean => {
  // ISO Organizácia (admin) can manage all clients
  if (currentUser.role === 'admin') return true;
  
  // Clients cannot manage other users
  return false;
};

export const getFilteredData = <T extends { organizationId?: string; clientId?: string }>(
  data: T[], 
  currentUser: User
): T[] => {
  if (currentUser.role === 'admin') {
    return data;
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
    case 'client': return 'Klient';
    default: return 'Používateľ';
  }
};

export const getRolePermissions = (role: UserRole) => {
  const permissions = {
    admin: {
      canManageClients: true,
      canManageLocations: true,
      canViewAllTickets: true,
      canViewAllTransactions: true,
      canManageSettings: true,
      canViewReports: true,
      canManageDevices: true,
      canManageContracts: true
    },
    client: {
      canManageClients: false,
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
