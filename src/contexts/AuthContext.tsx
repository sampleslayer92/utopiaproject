
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData, AuthContextType } from '@/types/auth';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const storedUser = localStorage.getItem('utopia_user');
        const rememberMe = localStorage.getItem('utopia_remember_me');
        
        if (storedUser && rememberMe === 'true') {
          const user: User = JSON.parse(storedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkExistingSession();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate API call - in real app, this would be a backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email for demo purposes
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        fullName: getMockUserName(credentials.email),
        role: getMockUserRole(credentials.email),
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Store user session
      localStorage.setItem('utopia_user', JSON.stringify(mockUser));
      if (credentials.rememberMe) {
        localStorage.setItem('utopia_remember_me', 'true');
      } else {
        localStorage.removeItem('utopia_remember_me');
      }

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });

      toast.success('Úspešne ste sa prihlásili');
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast.error('Chyba pri prihlásení');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('utopia_user');
    localStorage.removeItem('utopia_remember_me');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    toast.success('Úspešne ste sa odhlásili');
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        businessPartnerId: data.businessPartnerId,
        clientId: data.clientId,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('utopia_user', JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });

      toast.success('Účet bol úspešne vytvorený');
    } catch (error) {
      console.error('Registration error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast.error('Chyba pri registrácii');
      throw error;
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Odkaz na reset hesla bol odoslaný na ${email}`);
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Chyba pri odosielaní emailu');
      throw error;
    }
  };

  const value: AuthContextType = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
    register,
    forgotPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Helper functions for mock data
const getMockUserName = (email: string): string => {
  if (email.includes('admin')) return 'Admin Používateľ';
  if (email.includes('partner')) return 'Obchodný Partner';
  if (email.includes('location')) return 'Prevádzka Používateľ';
  return 'Klient Používateľ';
};

const getMockUserRole = (email: string) => {
  if (email.includes('admin')) return 'admin' as const;
  if (email.includes('partner')) return 'business_partner' as const;
  if (email.includes('location')) return 'location' as const;
  return 'client' as const;
};
