
import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Monitor, 
  Users, 
  MapPin, 
  FileText, 
  Ticket, 
  Settings,
  Building2,
  UserCheck
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useAuth } from '@/contexts/AuthContext';

export const AppSidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getMenuItems = () => {
    const baseItems = [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
      }
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        {
          title: 'Transakcie',
          url: '/dashboard/transactions',
          icon: CreditCard,
        },
        {
          title: 'Zariadenia',
          url: '/dashboard/devices',
          icon: Monitor,
        },
        {
          title: 'Obchodní partneri',
          url: '/dashboard/business-partners',
          icon: Building2,
        },
        {
          title: 'Klienti',
          url: '/dashboard/clients',
          icon: Users,
        },
        {
          title: 'Prevádzky',
          url: '/dashboard/locations',
          icon: MapPin,
        },
        {
          title: 'Zmluvy',
          url: '/dashboard/contracts',
          icon: FileText,
        },
        {
          title: 'Tikety',
          url: '/dashboard/tickets',
          icon: Ticket,
        },
        {
          title: 'Nastavenia',
          url: '/dashboard/settings',
          icon: Settings,
        }
      ];
    }

    if (user?.role === 'business_partner') {
      return [
        ...baseItems,
        {
          title: 'Klienti',
          url: '/dashboard/clients',
          icon: Users,
        },
        {
          title: 'Prevádzky',
          url: '/dashboard/locations',
          icon: MapPin,
        },
        {
          title: 'Zariadenia',
          url: '/dashboard/devices',
          icon: Monitor,
        },
        {
          title: 'Tikety',
          url: '/dashboard/tickets',
          icon: Ticket,
        },
        {
          title: 'Nastavenia',
          url: '/dashboard/settings',
          icon: Settings,
        }
      ];
    }

    if (user?.role === 'client') {
      return [
        ...baseItems,
        {
          title: 'Transakcie',
          url: '/dashboard/transactions',
          icon: CreditCard,
        },
        {
          title: 'Zariadenia',
          url: '/dashboard/devices',
          icon: Monitor,
        },
        {
          title: 'Prevádzky',
          url: '/dashboard/locations',
          icon: MapPin,
        },
        {
          title: 'Zmluvy',
          url: '/dashboard/contracts',
          icon: FileText,
        },
        {
          title: 'Tikety',
          url: '/dashboard/tickets',
          icon: Ticket,
        },
        {
          title: 'Nastavenia',
          url: '/dashboard/settings',
          icon: Settings,
        }
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">PaymentHub</h2>
              <p className="text-blue-100 text-sm capitalize">
                {user?.role?.replace('_', ' ')} Panel
              </p>
            </div>
          </div>
          {user && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="font-semibold text-white">{user.fullName}</p>
              <p className="text-blue-100 text-sm">{user.email}</p>
              <div className="mt-2 inline-flex items-center px-2 py-1 bg-white/20 rounded-full text-xs text-blue-100">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Online
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                      location.pathname === item.url 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                        : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20'
                    }`}
                  >
                    <button 
                      onClick={() => navigate(item.url)}
                      className="flex items-center space-x-3 w-full p-3"
                    >
                      <div className={`p-2 rounded-lg transition-colors ${
                        location.pathname === item.url 
                          ? 'bg-white/20' 
                          : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
                      }`}>
                        <item.icon className={`h-4 w-4 ${
                          location.pathname === item.url 
                            ? 'text-white' 
                            : 'text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`} />
                      </div>
                      <span className={`font-medium ${
                        location.pathname === item.url 
                          ? 'text-white' 
                          : 'text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300'
                      }`}>
                        {item.title}
                      </span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-t border-gray-200 dark:border-gray-600">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              © 2024 PaymentHub
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Verzia 2.1.0
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
