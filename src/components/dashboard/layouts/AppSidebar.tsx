
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

    if (user?.role === 'partner') {
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
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <UserCheck className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">PaymentHub</h2>
            <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
        {user && (
          <div className="mt-2 text-sm">
            <p className="font-medium">{user.companyName || user.name}</p>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <button 
                      onClick={() => navigate(item.url)}
                      className="flex items-center space-x-2 w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          © 2024 PaymentHub
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
