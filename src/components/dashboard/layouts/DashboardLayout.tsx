
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
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
import { useAuth } from '@/contexts/AuthContext';

export const DashboardLayout: React.FC = () => {
  const { user } = useAuth();

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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Routes>
              <Route path="/" element={getDashboardComponent()} />
              <Route path="/merchants" element={<ClientsPage />} />
              <Route path="/merchants/:id" element={<MerchantDetailPage />} />
              <Route path="/business-partners" element={<BusinessPartnersPage />} />
              <Route path="/devices" element={<DevicesPage />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/location/:id" element={<LocationDashboard />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/contracts" element={<ContractsPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/team/:id" element={<TeamMemberDetail />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
