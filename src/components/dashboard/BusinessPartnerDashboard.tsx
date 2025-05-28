
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Smartphone, DollarSign, TrendingUp, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { DashboardCard, Client } from '@/types/dashboard';

const dashboardData: DashboardCard[] = [
  { title: 'Moji klienti', value: 24, change: '+3', trend: 'up', icon: Users },
  { title: 'Celkem zařízení', value: 456, change: '+12', trend: 'up', icon: Smartphone },
  { title: 'Měsíční tržby', value: '€8,500', change: '+8%', trend: 'up', icon: DollarSign },
  { title: 'Aktivní tikety', value: 7, change: '-2', trend: 'up', icon: AlertCircle },
];

const recentClients: Client[] = [
  {
    id: 'client-1',
    name: 'TechCorp s.r.o.',
    email: 'client1@utopia.sk',
    businessPartnerId: 'bp-1',
    locationsCount: 3,
    devicesCount: 45,
    totalRevenue: 25000,
    monthlyRevenue: 2100,
    status: 'active',
    createdAt: '2024-11-15',
    contracts: []
  },
  {
    id: 'client-2',
    name: 'RetailMax a.s.',
    email: 'client2@utopia.sk', 
    businessPartnerId: 'bp-1',
    locationsCount: 8,
    devicesCount: 128,
    totalRevenue: 58000,
    monthlyRevenue: 4800,
    status: 'active',
    createdAt: '2024-10-20',
    contracts: []
  }
];

const recentTickets = [
  { id: 'T-001', client: 'TechCorp s.r.o.', title: 'Zařízení offline v centru', priority: 'high', status: 'open', created: '2 hodiny' },
  { id: 'T-002', client: 'RetailMax a.s.', title: 'Pomalé zpracování plateb', priority: 'medium', status: 'in_progress', created: '1 den' },
  { id: 'T-003', client: 'ShopEasy s.r.o.', title: 'Chyba při aktualizaci firmware', priority: 'low', status: 'resolved', created: '3 dny' },
];

export const BusinessPartnerDashboard: React.FC = () => {
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
        {/* Recent Clients */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Nedávní klienti</CardTitle>
            <Button variant="outline" size="sm">
              Spravovat klienty
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      client.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{client.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {client.locationsCount} prevádzok • {client.devicesCount} zařízení
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">€{client.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">měsíčně</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Tickets */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Nedávné tikety</CardTitle>
            <Button variant="outline" size="sm">
              Spravovat tikety
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        {ticket.id}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        ticket.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {ticket.status === 'resolved' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : ticket.status === 'in_progress' ? (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">{ticket.created}</span>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white mb-1">{ticket.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.client}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Přehled výkonnosti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">€42,350</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Celkové tržby</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">96.2%</p>
              <p className="text-sm text-green-700 dark:text-green-300">Spokojenost klientů</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">4.8h</p>
              <p className="text-sm text-purple-700 dark:text-purple-300">Průměrná doba řešení</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
