
export type UserRole = 'admin' | 'business_partner' | 'client' | 'location';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  businessPartnerId?: string; // For clients and locations
  clientId?: string; // For locations
  createdAt: string;
  lastLogin?: string;
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
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}
