
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

export const DashboardHeader: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="https://cdn.prod.website-files.com/65bb58bd9feeda1fd2e1b551/65bb58bd9feeda1fd2e1b5ad_logo-header.svg" 
            alt="Onepos Logo" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            onepos
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationCenter />
          
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage 
                src="https://cdn.prod.website-files.com/65bb58bd9feeda1fd2e1b551/668549d26dee517c49833a53_Lapos-p-500.webp" 
                alt="Marián Lapoš" 
              />
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Marián Lapoš
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                ISO Organizácia Admin
              </span>
            </div>
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
