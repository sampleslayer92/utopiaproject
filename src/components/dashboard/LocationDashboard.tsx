
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
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-full">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Prevádzka panel
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Sledujte výkonnosť svojej prevádzky a zariadení
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => {
          const IconComponent = item.icon;
          const gradients = [
            'from-blue-500 to-blue-600',
            'from-green-500 to-green-600', 
            'from-purple-500 to-purple-600',
            'from-orange-500 to-orange-600'
          ];
          return (
            <Card key={index} className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradients[index]}`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${gradients[index]}`}>
                  {IconComponent && <IconComponent className="h-5 w-5 text-white" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.value}</div>
                {item.change && item.change !== '0' && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">
                      {item.change} oproti včera
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-600" />
                Stav zařízení
              </CardTitle>
              <Button variant="outline" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                Diagnostika
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full shadow-sm ${
                        device.status === 'online' ? 'bg-gradient-to-r from-green-400 to-green-500' :
                        device.status === 'offline' ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
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
                        {device.metrics.transactions} transakcií
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
                    <div className="mt-3 p-3 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border border-red-200 dark:border-red-800">
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
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Nedávné reporty
              </CardTitle>
              <Button variant="outline" size="sm" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                Všechny reporty
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{report.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{report.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">€{report.revenue}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {report.transactions} transakcií
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
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Rychlé akce
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 hover:shadow-md transition-all duration-200 border-0">
                <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg mb-2">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">Nahlásit problém</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:shadow-md transition-all duration-200 border-0">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mb-2">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">Test zařízení</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-md transition-all duration-200 border-0">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mb-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">Generovat report</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:shadow-md transition-all duration-200 border-0">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-2">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium">Plánovaná údržba</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-yellow-600" />
              Stav podpory
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">
                      1 aktivní tiket
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Terminal 3 offline
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="hover:bg-yellow-100 dark:hover:bg-yellow-900/20">
                  Zobrazit
                </Button>
              </div>
              
              <div className="text-center py-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-fit mx-auto mb-3">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
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
