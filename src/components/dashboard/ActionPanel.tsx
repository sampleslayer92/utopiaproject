
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Users, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const ActionPanel: React.FC = () => {
  const { user } = useAuth();

  const handleAddTeamMember = () => {
    console.log('Adding team member...');
    // TODO: Implement add team member functionality
  };

  const handleAddMerchant = () => {
    console.log('Adding merchant...');
    // TODO: Implement add merchant functionality
  };

  return (
    <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Vitajte späť, Marián!</h2>
            <p className="text-blue-100 text-lg">
              ISO Organizácia • Business Partner
            </p>
            <p className="text-blue-200 text-sm mt-1">
              Spravujte svoj tím a merchantov jednoducho a efektívne
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  variant="outline"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Pridať
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border shadow-lg">
                <DropdownMenuItem onClick={handleAddTeamMember} className="cursor-pointer">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Člen Teamu</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAddMerchant} className="cursor-pointer">
                  <Building className="h-4 w-4 mr-2" />
                  <span>Merchant</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
