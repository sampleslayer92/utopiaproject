
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Users, Building, UserPlus, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { designSystem, roleColors } from '@/styles/design-system';

export const ActionPanel: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddTeamMember = () => {
    // Redirect to onboarding for new merchant
    navigate('/onboarding');
  };

  const handleAddMerchant = () => {
    // Redirect to onboarding for new merchant
    navigate('/onboarding');
  };

  const getRoleGradient = () => {
    if (!user?.role) return roleColors.client;
    return roleColors[user.role] || roleColors.client;
  };

  const getWelcomeMessage = () => {
    if (user?.role === 'admin') {
      return {
        title: 'Vitajte späť, Admin!',
        subtitle: 'ISO Organizácia • Administrator',
        description: 'Spravujte celý systém, klientov a monitorujte všetky aktivity'
      };
    }
    if (user?.role === 'client') {
      return {
        title: 'Vitajte späť!',
        subtitle: 'Klient • Merchant',
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
            {user?.role === 'admin' && (
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
                  <DropdownMenuItem onClick={handleAddTeamMember} className="cursor-pointer">
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span>Nový klient</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleAddMerchant} className="cursor-pointer">
                    <Building2 className="h-4 w-4 mr-2" />
                    <span>Nová lokácia</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Add device')} className="cursor-pointer">
                    <Building className="h-4 w-4 mr-2" />
                    <span>Nové zariadenie</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
