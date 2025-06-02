
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardHeader: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user?.role === 'admin' ? 'ISO Organizácia Dashboard' : 
             user?.role === 'business_partner' ? 'Business Partner Dashboard' : 
             'Klient Dashboard'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user?.fullName}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {user?.role === 'admin' ? 'ISO Admin' : 
               user?.role === 'business_partner' ? 'Partner' : 'Klient'}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Odhlásiť</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
