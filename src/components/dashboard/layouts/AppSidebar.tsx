
import React from 'react';
import { LayoutDashboard, CreditCard, Monitor, Users, MapPin, FileText, Ticket, Settings, Building2, BarChart3 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useAuth } from '@/contexts/AuthContext';
import { designSystem, roleColors } from '@/styles/design-system';

export const AppSidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getMenuItems = () => {
    const baseItems = [{
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard
    }];

    if (user?.role === 'admin') {
      return [...baseItems, {
        title: 'Transakcie',
        url: '/dashboard/transactions',
        icon: CreditCard
      }, {
        title: 'Zariadenia',
        url: '/dashboard/devices',
        icon: Monitor
      }, {
        title: 'Klienti',
        url: '/dashboard/clients',
        icon: Users
      }, {
        title: 'Prevádzky',
        url: '/dashboard/locations',
        icon: MapPin
      }, {
        title: 'Zmluvy',
        url: '/dashboard/contracts',
        icon: FileText
      }, {
        title: 'Reporty',
        url: '/dashboard/reports',
        icon: BarChart3
      }, {
        title: 'Tikety',
        url: '/dashboard/tickets',
        icon: Ticket
      }, {
        title: 'Nastavenia',
        url: '/dashboard/settings',
        icon: Settings
      }];
    }

    if (user?.role === 'client') {
      return [...baseItems, {
        title: 'Transakcie',
        url: '/dashboard/transactions',
        icon: CreditCard
      }, {
        title: 'Zariadenia',
        url: '/dashboard/devices',
        icon: Monitor
      }, {
        title: 'Prevádzky',
        url: '/dashboard/locations',
        icon: MapPin
      }, {
        title: 'Zmluvy',
        url: '/dashboard/contracts',
        icon: FileText
      }, {
        title: 'Tikety',
        url: '/dashboard/tickets',
        icon: Ticket
      }, {
        title: 'Nastavenia',
        url: '/dashboard/settings',
        icon: Settings
      }];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();
  const roleGradient = user?.role ? roleColors[user.role] : roleColors.client;

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className={designSystem.spacing.cardPadding}>
          <div className="flex items-center mb-6">
            <img 
              src="https://cdn.prod.website-files.com/65bb58bd9feeda1fd2e1b551/65bb58bd9feeda1fd2e1b5ad_logo-header.svg" 
              alt="Onepos Logo" 
              className="h-8 w-auto" 
            />
          </div>
          
          {user && (
            <div className={`${designSystem.borderRadius.card} ${designSystem.spacing.cardPadding} bg-gradient-to-r ${roleGradient} text-white shadow-lg`}>
              <div className="space-y-2">
                <p className="font-semibold text-white">{user.fullName}</p>
                <p className="text-white/90 text-sm">{user.email}</p>
                <p className="text-white/80 text-xs">
                  {user.role === 'admin' && 'ISO Organizácia'}
                  {user.role === 'client' && 'Klient'}
                </p>
                <div className="inline-flex items-center px-2 py-1 bg-white/20 rounded-full text-xs text-white">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Online
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className={designSystem.gradients.background}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={`${designSystem.spacing.sectionSpacing} ${designSystem.spacing.cardPadding}`}>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url} 
                    className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                      location.pathname === item.url 
                        ? `bg-gradient-to-r ${roleGradient} text-white shadow-lg` 
                        : `hover:bg-gradient-to-r hover:${roleGradient.replace('from-', 'from-').replace('to-', 'to-')}/10 dark:hover:${roleGradient}/20 hover:shadow-md`
                    }`}
                  >
                    <button 
                      onClick={() => navigate(item.url)} 
                      className="flex items-center space-x-3 w-full p-3"
                    >
                      <item.icon className={`w-5 h-5 ${
                        location.pathname === item.url 
                          ? 'text-white' 
                          : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                      }`} />
                      <span className={`font-medium ${
                        location.pathname === item.url 
                          ? 'text-white' 
                          : 'text-gray-700 dark:text-gray-200 group-hover:text-gray-800 dark:group-hover:text-gray-100'
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
      
      <SidebarFooter className={`p-4 ${designSystem.gradients.background} border-t border-gray-200 dark:border-gray-600`}>
        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              © 2025 Onepos
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
