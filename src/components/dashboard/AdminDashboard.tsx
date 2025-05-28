
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, Smartphone, TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { DashboardCard, BusinessPartner } from '@/types/dashboard';

const dashboardData: DashboardCard[] = [
  { title: 'Obchodní partneri', value: 12, change: '+2', trend: 'up', icon: Building2 },
  { title: 'Celkem klientů', value: 145, change: '+8', trend: 'up', icon: Users },
  { title: 'Aktivní zařízení', value: 2847, change: '+23', trend: 'up', icon: Smartphone },
  { title: 'Měsíční tržby', value: '€48,392', change: '+12%', trend: 'up', icon: TrendingUp },
];

const topPartners: BusinessPartner[] = [
  {
    id: 'bp-1',
    name: 'Martin Novák',
    email: 'partner1@utopia.sk',
    clientsCount: 24,
    devicesCount: 456,
    totalRevenue: 125000,
    monthlyRevenue: 8500,
    status: 'active',
    createdAt: '2024-01-15',
    tier: 'gold',
    region: 'Bratislava'
  },
  {
    id: 'bp-2', 
    name: 'Jana Svoboda',
    email: 'partner2@utopia.sk',
    clientsCount: 18,
    devicesCount: 324,
    totalRevenue: 98000,
    monthlyRevenue: 6200,
    status: 'active',
    createdAt: '2024-02-20',
    tier: 'silver',
    region: 'Praha'
  }
];

const recentActivity = [
  { type: 'new_partner', message: 'Nový obchodní partner: TechCorp Ltd.', time: '2 hodiny', status: 'success' },
  { type: 'device_deployment', message: '15 nových zařízení nasazeno u klienta Alpha', time: '4 hodiny', status: 'info' },
  { type: 'contract_renewal', message: 'Smlouva s Beta Corp. čeká na obnovení', time: '6 hodin', status: 'warning' },
  { type: 'system_alert', message: 'Výpadek zařízení v lokalitě Centrum', time: '1 den', status: 'error' }
];

export const AdminDashboard: React.FC = () => {
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
                {item.change && (
                  <p className={`text-xs flex items-center gap-1 ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="h-3 w-3" />
                    {item.change} oproti minulému měsíci
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Business Partners */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Nejlepší obchodní partneri</CardTitle>
            <Button variant="outline" size="sm">
              Zobrazit všechny
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPartners.map((partner) => (
                <div key={partner.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      partner.tier === 'gold' ? 'bg-yellow-500' :
                      partner.tier === 'silver' ? 'bg-gray-400' : 'bg-orange-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{partner.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{partner.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">{partner.clientsCount} klientů</p>
                    <p className="text-sm text-green-600">€{partner.monthlyRevenue.toLocaleString()}/měs</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Nedávná aktivita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'info' ? 'bg-blue-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health Overview */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Přehled systému</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-600">99.8%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dostupnost zařízení</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-blue-600">120ms</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Odezva API</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Aktivní tikety</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-purple-600">€156K</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tržby tento měsíc</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
