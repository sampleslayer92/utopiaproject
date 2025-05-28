
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Smartphone, TrendingUp } from 'lucide-react';
import { DashboardCard } from '@/types/dashboard';

const dashboardData: DashboardCard[] = [
  { title: 'Total Business Partners', value: 12, change: '+2', trend: 'up', icon: Building2 },
  { title: 'Total Clients', value: 145, change: '+8', trend: 'up', icon: Users },
  { title: 'Active Devices', value: 2847, change: '+23', trend: 'up', icon: Smartphone },
  { title: 'Monthly Revenue', value: '€48,392', change: '+12%', trend: 'up', icon: TrendingUp },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card key={index} className="bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.title}
                </CardTitle>
                {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                {item.change && (
                  <p className={`text-xs ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change} from last month
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
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  New business partner registered: TechCorp Ltd.
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  5 new devices deployed at Location Alpha
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Contract renewal pending for Client Beta
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Device Uptime</span>
                <span className="text-sm font-medium text-green-600">99.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">API Response Time</span>
                <span className="text-sm font-medium text-green-600">120ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Active Tickets</span>
                <span className="text-sm font-medium text-yellow-600">3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
