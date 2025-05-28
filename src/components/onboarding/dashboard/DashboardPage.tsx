
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { BusinessPartnerDashboard } from '@/components/dashboard/BusinessPartnerDashboard';
import { ClientDashboard } from '@/components/dashboard/ClientDashboard';
import { LocationDashboard } from '@/components/dashboard/LocationDashboard';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'business_partner':
        return <BusinessPartnerDashboard />;
      case 'client':
        return <ClientDashboard />;
      case 'location':
        return <LocationDashboard />;
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              Neznámá role uživatele: {user.role}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Vítejte zpět, {user.fullName}
        </p>
      </div>
      
      {renderDashboard()}
    </div>
  );
};
