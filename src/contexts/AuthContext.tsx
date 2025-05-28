import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

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
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: getMockUserId(credentials.email),
        email: credentials.email,
        fullName: getMockUserName(credentials.email),
        role: getMockUserRole(credentials.email),
        businessPartnerId: getMockBusinessPartnerId(credentials.email),
        clientId: getMockClientId(credentials.email),
        organizationId: credentials.email.includes('admin') ? 'org-1' : undefined,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true
      };

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
      
      // Check if user has completed onboarding
      const onboardingProgress = localStorage.getItem('onboarding_progress');
      if (onboardingProgress) {
        const progress = JSON.parse(onboardingProgress);
        if (!progress.completed) {
          navigate(`/onboarding/${progress.currentStep || 'company'}`);
          return;
        }
      }
      
      navigate('/dashboard');
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
    navigate('/');
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        businessPartnerId: data.businessPartnerId,
        clientId: data.clientId,
        organizationId: data.organizationId,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      localStorage.setItem('utopia_user', JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });

      toast.success('Účet bol úspešne vytvorený');
      
      // Don't navigate here - let the registration component handle it
    } catch (error) {
      console.error('Registration error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast.error('Chyba pri registrácii');
      throw error;
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
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

// Helper functions for mock data with hierarchical structure
const getMockUserId = (email: string): string => {
  if (email.includes('admin')) return 'admin-1';
  if (email.includes('partner1')) return 'bp-1';
  if (email.includes('partner2')) return 'bp-2';
  if (email.includes('client1')) return 'client-1';
  if (email.includes('client2')) return 'client-2';
  if (email.includes('location1')) return 'location-1';
  if (email.includes('location2')) return 'location-2';
  return 'user-' + Date.now();
};

const getMockUserName = (email: string): string => {
  if (email.includes('admin')) return 'Admin Používateľ';
  if (email.includes('partner1')) return 'Martin Novák - Partner';
  if (email.includes('partner2')) return 'Jana Svoboda - Partner';
  if (email.includes('client1')) return 'TechCorp s.r.o.';
  if (email.includes('client2')) return 'RetailMax a.s.';
  if (email.includes('location1')) return 'Prevádzka Centrum';
  if (email.includes('location2')) return 'Prevádzka Východ';
  return 'Demo Používateľ';
};

const getMockUserRole = (email: string) => {
  if (email.includes('admin')) return 'admin' as const;
  if (email.includes('partner')) return 'business_partner' as const;
  if (email.includes('location')) return 'location' as const;
  return 'client' as const;
};

const getMockBusinessPartnerId = (email: string): string | undefined => {
  if (email.includes('client1') || email.includes('location1')) return 'bp-1';
  if (email.includes('client2') || email.includes('location2')) return 'bp-2';
  return undefined;
};

const getMockClientId = (email: string): string | undefined => {
  if (email.includes('location1')) return 'client-1';
  if (email.includes('location2')) return 'client-2';
  return undefined;
};
