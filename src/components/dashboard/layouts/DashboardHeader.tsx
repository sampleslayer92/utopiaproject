
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

export const DashboardHeader: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <NotificationCenter />
          
          {/* Minimalistic Profile Widget Card */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src="https://cdn.prod.website-files.com/65bb58bd9feeda1fd2e1b551/668549d26dee517c49833a53_Lapos-p-500.webp" 
                      alt="Marián Lapoš" 
                    />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col space-y-0.5">
                    {/* Name */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Marián Lapoš
                      </span>
                      {/* Online Status Indicator */}
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          Online
                        </span>
                      </div>
                    </div>
                    
                    {/* Email */}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      marian.lapos@onepos.eu
                    </span>
                    
                    {/* Organization and Role */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        Onepos
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                        ISO Organizácia
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Logout Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="ml-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </header>
  );
};
