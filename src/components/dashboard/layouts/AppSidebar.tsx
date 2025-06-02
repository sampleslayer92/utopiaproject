
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
import { Card, CardContent } from '@/components/ui/card';
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
      <SidebarHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center justify-center">
              <img 
                src="https://cdn.prod.website-files.com/65bb58bd9feeda1fd2e1b551/65bb58bd9feeda1fd2e1b5ad_logo-header.svg" 
                alt="Onepos Logo" 
                className="h-8 w-auto"
              />
            </div>
          </CardContent>
        </Card>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="w-full justify-start px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 dark:data-[active=true]:bg-blue-900/20 dark:data-[active=true]:text-blue-400"
                  >
                    <Link to={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Téma</p>
              <ThemeToggle />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Jazyk</p>
              <LanguageSwitcher />
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200 dark:border-gray-700">
            © 2025 Onepos Platform
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
