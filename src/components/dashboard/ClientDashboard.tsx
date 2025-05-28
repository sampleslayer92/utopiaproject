
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Smartphone, FileText, Ticket } from 'lucide-react';
import { DashboardCard } from '@/types/dashboard';

const dashboardData: DashboardCard[] = [
  { title: 'My Locations', value: 8, change: '+1', trend: 'up', icon: MapPin },
  { title: 'Total Devices', value: 45, change: '+3', trend: 'up', icon: Smartphone },
  { title: 'Active Contracts', value: 3, change: '0', trend: 'neutral', icon: FileText },
  { title: 'Open Tickets', value: 2, change: '-1', trend: 'down', icon: Ticket },
];

export const ClientDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.title}
                </CardTitle>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                {item.change && item.change !== '0' && (
                  <p className={`text-xs ${
                    item.trend === 'up' ? 'text-green-600' : 
                    item.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {item.change} this month
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>My Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Main Office</p>
                  <p className="text-xs text-gray-500">12 devices • Online</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Warehouse A</p>
                  <p className="text-xs text-gray-500">8 devices • Online</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Branch Office</p>
                  <p className="text-xs text-gray-500">6 devices • Maintenance</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Maintenance
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  New device installed at Main Office
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Support ticket #1234 resolved
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Scheduled maintenance at Branch Office
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
