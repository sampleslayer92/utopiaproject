import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut, Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { Input } from '@/components/ui/input';

export const DashboardHeader: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 lg:w-1/3">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative hidden lg:flex w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Hľadať..." 
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2 text-gray-600 border-gray-200 hover:bg-gray-50">
              <Bell className="h-4 w-4" />
              <span>Notifikácie</span>
              <Badge className="ml-1 bg-red-500 text-white h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">3</Badge>
            </Button>
            
            <NotificationCenter />
          </div>
          
          {/* Minimalistic Profile Widget Card - removed shadow-lg class */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-3">
              <div className="flex items-center space-x-3">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src="https://cdn.prod.website-files.com/65bb58bd9feeda1fd2e1b551/668549d26dee517c49833a53_Lapos-p-500.webp" 
                      alt="Marián Lapoš" 
                    />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col space-y-0.5">
                    {/* Name - changed to Marián Lapoš */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900">
                        Marián Lapoš
                      </span>
                      {/* Online Status Indicator */}
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">
                          Online
                        </span>
                      </div>
                    </div>
                    
                    {/* Email */}
                    <span className="text-xs text-gray-500">
                      marian.lapos@onepos.eu
                    </span>
                  </div>
                </div>
                
                {/* Logout Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="ml-2 hover:bg-gray-100"
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