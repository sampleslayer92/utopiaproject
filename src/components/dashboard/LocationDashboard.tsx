
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Devices, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { DashboardCard } from '@/types/dashboard';

const dashboardData: DashboardCard[] = [
  { title: 'Location Devices', value: 6, change: '+1', trend: 'up', icon: Devices },
  { title: 'Online Devices', value: 5, change: '0', trend: 'neutral', icon: CheckCircle },
  { title: 'Offline Devices', value: 1, change: '+1', trend: 'up', icon: AlertTriangle },
  { title: 'Avg. Uptime', value: '98.5%', change: '+0.3%', trend: 'up', icon: Activity },
];

export const LocationDashboard: React.FC = () => {
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
                    {item.change} this week
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
            <CardTitle>Device Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">POS Terminal 01</p>
                  <p className="text-xs text-gray-500">Last seen: 2 minutes ago</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Security Camera 02</p>
                  <p className="text-xs text-gray-500">Last seen: 5 minutes ago</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Door Sensor 03</p>
                  <p className="text-xs text-gray-500">Last seen: 2 hours ago</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Offline
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Door Sensor 03 went offline
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Security Camera 02 back online
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  POS Terminal 01 software updated
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
