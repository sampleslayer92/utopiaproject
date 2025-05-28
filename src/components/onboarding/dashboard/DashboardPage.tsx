
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
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
      return <ClientDashboard />;
  }
};
