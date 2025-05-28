
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, TrendingUp, AlertTriangle, DollarSign, Activity, Clock, CheckCircle2 } from 'lucide-react';
import { DashboardCard, Device } from '@/types/dashboard';

const dashboardData: DashboardCard[] = [
  { title: 'Moje zařízení', value: 15, change: '+2', trend: 'up', icon: Smartphone },
  { title: 'Online zařízení', value: 14, change: '0', trend: 'neutral', icon: Activity },
  { title: 'Denní tržby', value: '€450', change: '+12%', trend: 'up', icon: DollarSign },
  { title: 'Aktivní problémy', value: 1, change: '-1', trend: 'up', icon: AlertTriangle },
];

const devices: Device[] = [
  {
    id: 'dev-1',
    name: 'Terminal 1 - Hlavní pokladna',
    type: 'POS Terminal',
    model: 'PayTech PT-300',
    serialNumber: 'PT300-001-2024',
    locationId: 'loc-1',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    status: 'online',
    lastSeen: '2025-01-28T10:30:00Z',
    installDate: '2024-08-15',
    revenue: { daily: 150, monthly: 4500, total: 22500 },
    metrics: { uptime: 99.8, transactions: 1250, errors: 2 }
  },
  {
    id: 'dev-2',
    name: 'Terminal 2 - Vedlejší pokladna',
    type: 'POS Terminal', 
    model: 'PayTech PT-300',
    serialNumber: 'PT300-002-2024',
    locationId: 'loc-1',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    status: 'online',
    lastSeen: '2025-01-28T10:25:00Z',
    installDate: '2024-08-15',
    revenue: { daily: 120, monthly: 3600, total: 18000 },
    metrics: { uptime: 98.5, transactions: 980, errors: 5 }
  },
  {
    id: 'dev-3',
    name: 'Terminal 3 - Expresní pokladna',
    type: 'POS Terminal',
    model: 'PayTech PT-200',
    serialNumber: 'PT200-003-2024',
    locationId: 'loc-1',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    status: 'offline',
    lastSeen: '2025-01-28T08:15:00Z',
    installDate: '2024-09-01',
    revenue: { daily: 0, monthly: 2400, total: 9600 },
    metrics: { uptime: 94.2, transactions: 650, errors: 12 }
  }
];

const recentReports = [
  { type: 'daily', title: 'Denní přehled', date: '28.1.2025', transactions: 245, revenue: 450 },
  { type: 'daily', title: 'Denní přehled', date: '27.1.2025', transactions: 198, revenue: 380 },
  { type: 'weekly', title: 'Týdenní přehled', date: '20-26.1.2025', transactions: 1680, revenue: 3200 },
];

export const LocationDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.title}
                </CardTitle>
                {IconComponent && <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                {item.change && item.change !== '0' && (
                  <p className={`text-xs flex items-center gap-1 ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="h-3 w-3" />
                    {item.change} oproti včera
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Stav zařízení</CardTitle>
            <Button variant="outline" size="sm">
              Diagnostika
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        device.status === 'online' ? 'bg-green-500' :
                        device.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{device.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {device.model} • SN: {device.serialNumber}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {device.metrics.uptime}% uptime
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {device.metrics.transactions} transakcí
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Denní tržby: €{device.revenue.daily}
                    </span>
                    <span className="text-gray-500 dark:text-gray-500">
                      Poslední aktivita: {new Date(device.lastSeen).toLocaleTimeString('cs-CZ')}
                    </span>
                  </div>
                  {device.status === 'offline' && (
                    <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                      <p className="text-sm text-red-800 dark:text-red-200 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Zařízení je offline od {new Date(device.lastSeen).toLocaleTimeString('cs-CZ')}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Reports */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Nedávné reporty</CardTitle>
            <Button variant="outline" size="sm">
              Všechny reporty
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{report.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{report.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">€{report.revenue}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {report.transactions} transakcí
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Rychlé akce</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <AlertTriangle className="h-6 w-6 mb-2" />
                <span className="text-sm">Nahlásit problém</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Activity className="h-6 w-6 mb-2" />
                <span className="text-sm">Test zařízení</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span className="text-sm">Generovat report</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Clock className="h-6 w-6 mb-2" />
                <span className="text-sm">Plánovaná údržba</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Stav podpory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">
                      1 aktivní tiket
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Terminal 3 offline
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Zobrazit
                </Button>
              </div>
              
              <div className="text-center py-4">
                <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ostatní systémy fungují normálně
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
