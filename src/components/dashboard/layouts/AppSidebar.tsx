
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, Users, FileText, CreditCard, Settings, 
  BarChart3, MapPin, Smartphone, Headphones,
  Building2, UserCheck, Receipt
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['admin', 'business_partner'] },
  { name: 'Tím', href: '/dashboard/team', icon: Users, roles: ['admin', 'business_partner'] },
  { name: 'Obchodní partneri', href: '/dashboard/business-partners', icon: Building2, roles: ['admin'] },
  { name: 'Merchanti', href: '/dashboard/clients', icon: UserCheck, roles: ['admin', 'business_partner'] },
  { name: 'Zmluvy', href: '/dashboard/contracts', icon: FileText, roles: ['admin', 'business_partner'] },
  { name: 'Zariadenia', href: '/dashboard/devices', icon: Smartphone, roles: ['admin', 'business_partner'] },
  { name: 'Prevádzky', href: '/dashboard/locations', icon: MapPin, roles: ['admin', 'business_partner'] },
  { name: 'Transakcie', href: '/dashboard/transactions', icon: CreditCard, roles: ['admin', 'business_partner'] },
  { name: 'Reporty', href: '/dashboard/reports', icon: BarChart3, roles: ['admin', 'business_partner'] },
  { name: 'Tikety', href: '/dashboard/tickets', icon: Headphones, roles: ['admin', 'business_partner'] },
  { name: 'Nastavenia', href: '/dashboard/settings', icon: Settings, roles: ['admin', 'business_partner'] },
];

export const AppSidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role as string)
  );

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Utopia</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Utopia Portal v2.0
        </div>
      </div>
    </div>
  );
};
