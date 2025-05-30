
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  team: 'Team',
  clients: 'Merchanti',
  contracts: 'Zmluvy', 
  reports: 'Reporty',
  tickets: 'Tickety',
  settings: 'Nastavenia',
  transactions: 'Transakcie',
  devices: 'Zariadenia',
  locations: 'Prevádzky',
  'business-partners': 'Obchodní partneri'
};

export const AppBreadcrumb: React.FC = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels[segment] || segment;
      
      if (index < pathSegments.length - 1) {
        breadcrumbs.push({
          label,
          href: currentPath
        });
      } else {
        breadcrumbs.push({
          label
        });
      }
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard" className="flex items-center hover:text-gray-900 dark:hover:text-gray-200">
                <Home className="h-4 w-4 mr-1" />
                Domov
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {crumb.href ? (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.href} className="hover:text-gray-900 dark:hover:text-gray-200">
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="font-medium text-gray-900 dark:text-gray-100">
                    {crumb.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
