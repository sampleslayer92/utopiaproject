
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Users, Building, UserPlus, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { designSystem, roleColors } from '@/styles/design-system';

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

  const getRoleGradient = () => {
    if (!user?.role) return roleColors.client;
    return roleColors[user.role] || roleColors.client;
  };

  const getWelcomeMessage = () => {
    if (user?.role === 'admin') {
      return {
        title: 'Vitajte späť, Admin!',
        subtitle: 'Systémová správa • Administrator',
        description: 'Spravujte celý systém, business partnerov a monitorujte všetky aktivity'
      };
    }
    if (user?.role === 'business_partner') {
      return {
        title: 'Vitajte späť, Marián!',
        subtitle: 'ISO Organizácia • Business Partner',
        description: 'Spravujte svoj tím a merchantov jednoducho a efektívne'
      };
    }
    if (user?.role === 'client') {
      return {
        title: 'Vitajte späť!',
        subtitle: 'Merchant • Klient',
        description: 'Spravujte svoje prevádzky, zariadenia a sledujte transakcie'
      };
    }
    return {
      title: 'Vitajte späť!',
      subtitle: 'Používateľ',
      description: 'Vitajte v systéme'
    };
  };

  const message = getWelcomeMessage();

  return (
    <Card className={`${designSystem.borderRadius.card} ${designSystem.shadows.card} border-0 bg-gradient-to-r ${getRoleGradient()} text-white overflow-hidden relative`}>
      <div className="absolute inset-0 bg-black/10"></div>
      <CardContent className={`${designSystem.spacing.cardPadding} relative z-10`}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{message.title}</h2>
            <p className="text-white/90 text-lg font-medium">
              {message.subtitle}
            </p>
            <p className="text-white/80 text-sm max-w-md">
              {message.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {(user?.role === 'business_partner' || user?.role === 'admin') && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    size="lg"
                    className={`bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm ${designSystem.transitions.default}`}
                    variant="outline"
                  >
                    <Plus className={designSystem.spacing.iconSize + ' mr-2'} />
                    Pridať
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border shadow-lg">
                  {user?.role === 'business_partner' && (
                    <>
                      <DropdownMenuItem onClick={handleAddTeamMember} className="cursor-pointer">
                        <UserPlus className="h-4 w-4 mr-2" />
                        <span>Člen Teamu</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleAddMerchant} className="cursor-pointer">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span>Merchant</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.role === 'admin' && (
                    <>
                      <DropdownMenuItem onClick={() => console.log('Add business partner')} className="cursor-pointer">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Business Partner</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleAddMerchant} className="cursor-pointer">
                        <Building className="h-4 w-4 mr-2" />
                        <span>Organizácia</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
