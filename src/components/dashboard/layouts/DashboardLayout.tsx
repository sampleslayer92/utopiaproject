
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { DashboardHeader } from './DashboardHeader';
import { AdminDashboard } from '../AdminDashboard';
import { ClientDashboard } from '../ClientDashboard';
import { BusinessPartnerDashboard } from '../BusinessPartnerDashboard';
import { LocationDashboard } from '../LocationDashboard';
import { ClientsPage } from '../ClientsPage';
import { BusinessPartnersPage } from '../BusinessPartnersPage';
import { DevicesPage } from '../DevicesPage';
import { LocationsPage } from '../LocationsPage';
import { TransactionsPage } from '../TransactionsPage';
import { ReportsPage } from '../ReportsPage';
import { ContractsPage } from '../ContractsPage';
import { TicketsPage } from '../TicketsPage';
import { TeamPage } from '../TeamPage';
import { TeamMemberDetail } from '../TeamMemberDetail';
import { SettingsPage } from '../SettingsPage';
import { MerchantDetailPage } from '../MerchantDetailPage';
import { GlobalChatbot } from '../../chat/GlobalChatbot';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'business_partner':
        return <BusinessPartnerDashboard />;
      case 'client':
        return <ClientDashboard />;
      default:
        return <div>Neznáma rola používateľa</div>;
    }
  };

  const getPageComponent = () => {
    if (location.pathname === '/dashboard') {
      return getDashboardComponent();
    }
    
    if (location.pathname === '/dashboard/merchants') {
      return <ClientsPage />;
    }
    
    if (location.pathname.startsWith('/dashboard/merchants/')) {
      return <MerchantDetailPage />;
    }
    
    if (location.pathname === '/dashboard/business-partners') {
      return <BusinessPartnersPage />;
    }
    
    if (location.pathname === '/dashboard/devices') {
      return <DevicesPage />;
    }
    
    if (location.pathname === '/dashboard/locations') {
      return <LocationsPage />;
    }
    
    if (location.pathname.startsWith('/dashboard/location/')) {
      return <LocationDashboard />;
    }
    
    if (location.pathname === '/dashboard/transactions') {
      return <TransactionsPage />;
    }
    
    if (location.pathname === '/dashboard/reports') {
      return <ReportsPage />;
    }
    
    if (location.pathname === '/dashboard/contracts') {
      return <ContractsPage />;
    }
    
    if (location.pathname === '/dashboard/tickets') {
      return <TicketsPage />;
    }
    
    if (location.pathname === '/dashboard/team') {
      return <TeamPage />;
    }
    
    if (location.pathname.startsWith('/dashboard/team/')) {
      return <TeamMemberDetail />;
    }
    
    if (location.pathname === '/dashboard/settings') {
      return <SettingsPage />;
    }
    
    return getDashboardComponent();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              {getPageComponent()}
            </div>
          </main>
        </div>
        <GlobalChatbot />
      </div>
    </SidebarProvider>
  );
};
