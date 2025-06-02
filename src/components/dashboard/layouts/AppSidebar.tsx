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
  FileText,
  Ticket,
  Settings,
  BarChart3,
  UserCheck,
  CreditCard
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Card, CardContent } from '@/components/ui/card';

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
        roles: ['admin']
      },
      {
        title: "Zmluvy",
        url: "/dashboard/contracts",
        icon: FileText,
        roles: ['admin']
      },
      {
        title: "Tickety",
        url: "/dashboard/tickets",
        icon: Ticket,
        roles: ['admin', 'client']
      },
      {
        title: "Tím",
        url: "/dashboard/team",
        icon: UserCheck,
        roles: ['admin']
      },
      {
        title: "Reporty",
        url: "/dashboard/reports",
        icon: BarChart3,
        roles: ['admin']
      },
      {
        title: "Nastavenia",
        url: "/dashboard/settings",
        icon: Settings,
        roles: ['admin', 'client']
      }
    ];

    const clientItems = [
      {
        title: "Transakcie",
        url: "/dashboard/transactions",
        icon: CreditCard,
        roles: ['client']
      },
      {
        title: "Tickety",
        url: "/dashboard/tickets",
        icon: Ticket,
        roles: ['client']
      },
      {
        title: "Nastavenia",
        url: "/dashboard/settings",
        icon: Settings,
        roles: ['client']
      }
    ];

    return [...baseItems, ...adminItems, ...clientItems].filter(item => 
      item.roles.includes(user?.role || '')
    );
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center space-y-3">
              <img 
                src="https://cdn.prod.website-files.com/65bb58bd9feeda1fd2e1b551/65bb58bd9feeda1fd2e1b5ad_logo-header.svg" 
                alt="Onepos Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Onepos</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ISO Organizácia
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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
        <div className="space-y-3">
          <div className="border-t pt-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">Téma</p>
                <ThemeToggle />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Jazyk</p>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            © 2025 Onepos Platform
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
