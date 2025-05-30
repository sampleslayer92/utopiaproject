
export type UserRole = 'admin' | 'business_partner' | 'client';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  businessPartnerId?: string; // For clients - ID of their business partner
  clientId?: string; // For sub-entities - ID of their parent client
  parentId?: string; // Generic parent ID for hierarchical structure
  organizationId?: string; // For admin users
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  businessPartnerId?: string;
  clientId?: string;
  organizationId?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithRole: (role: UserRole) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}
