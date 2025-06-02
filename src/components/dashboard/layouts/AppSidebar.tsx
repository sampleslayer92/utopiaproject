
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Home,
  Users,
  Building2,
  Smartphone,
  MapPin,
  CreditCard,
  FileText,
  Ticket,
  Settings,
  BarChart3,
  UserCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();

  // Define menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        roles: ['admin', 'business_partner', 'client']
      }
    ];

    const adminItems = [
      {
        title: "Merchanti",
        url: "/dashboard/merchants",
        icon: Users,
        roles: ['admin', 'business_partner']
      },
      {
        title: "Business Partneri",
        url: "/dashboard/business-partners",
        icon: Building2,
        roles: ['admin']
      },
      {
        title: "Zariadenia",
        url: "/dashboard/devices",
        icon: Smartphone,
        roles: ['admin', 'business_partner']
      },
      {
        title: "Lokácie",
        url: "/dashboard/locations",
        icon: MapPin,
        roles: ['admin', 'business_partner', 'client']
      },
      {
        title: "Transakcie",
        url: "/dashboard/transactions",
        icon: CreditCard,
        roles: ['admin', 'business_partner', 'client']
      },
      {
        title: "Kontrakty",
        url: "/dashboard/contracts",
        icon: FileText,
        roles: ['admin', 'business_partner']
      },
      {
        title: "Tickety",
        url: "/dashboard/tickets",
        icon: Ticket,
        roles: ['admin', 'business_partner', 'client']
      },
      {
        title: "Tím",
        url: "/dashboard/team",
        icon: UserCheck,
        roles: ['admin', 'business_partner']
      },
      {
        title: "Reporty",
        url: "/dashboard/reports",
        icon: BarChart3,
        roles: ['admin', 'business_partner']
      },
      {
        title: "Nastavenia",
        url: "/dashboard/settings",
        icon: Settings,
        roles: ['admin', 'business_partner', 'client']
      }
    ];

    return [...baseItems, ...adminItems].filter(item => 
      item.roles.includes(user?.role || '')
    );
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
          <div>
            <h2 className="text-lg font-semibold">Utopia</h2>
            <p className="text-xs text-gray-500">
              {user?.role === 'admin' ? 'ISO Platform' : 
               user?.role === 'business_partner' ? 'Partner Portal' : 
               'Client Portal'}
            </p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="space-y-4">
          <div className="border-t pt-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-2">Téma</p>
                <ThemeToggle />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Jazyk</p>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            © 2025 Utopia Platform
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
