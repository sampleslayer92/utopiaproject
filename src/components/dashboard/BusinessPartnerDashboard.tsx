
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Smartphone, DollarSign, TrendingUp, AlertCircle, Clock, CheckCircle2, Euro, PieChart } from 'lucide-react';
import { DashboardCard } from '@/types/dashboard';
import { OnboardingClientCard } from './OnboardingClientCard';
import { demoClients, calculatePartnerRevenue } from '@/data/demoData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dashboardData: DashboardCard[] = [
  { title: 'Moji klienti', value: 4, change: '+1', trend: 'up', icon: Users },
  { title: 'Celkem zařízení', value: 62, change: '+8', trend: 'up', icon: Smartphone },
  { title: 'Měsíční provize', value: '€4,360', change: '+12%', trend: 'up', icon: Euro },
  { title: 'Aktivní tikety', value: 3, change: '-4', trend: 'up', icon: AlertCircle },
];

const recentTickets = [
  { id: 'T-001', client: 'TechCorp s.r.o.', title: 'Zařízení offline v centru', priority: 'high', status: 'open', created: '2 hodiny' },
  { id: 'T-002', client: 'RetailMax a.s.', title: 'Pomalé zpracování plateb', priority: 'medium', status: 'in_progress', created: '1 den' },
  { id: 'T-003', client: 'CafeChain Ltd.', title: 'Aktualizace firmware', priority: 'low', status: 'resolved', created: '3 dny' },
];

export const BusinessPartnerDashboard: React.FC = () => {
  const revenueData = calculatePartnerRevenue(demoClients);
  
  const chartData = revenueData.clientBreakdown.map(item => ({
    name: item.clientName.split(' ')[0], // Short name for chart
    revenue: item.clientRevenue,
    earning: item.partnerEarning
  }));

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

      {/* Onboarding and Revenue Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OnboardingClientCard />
        
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              <span>Provize z klientů</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  €{revenueData.partnerCommission.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Měsíční provize (10%)</p>
              </div>
              
              <div className="space-y-2">
                {revenueData.clientBreakdown.map((client) => (
                  <div key={client.clientId} className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                    <span className="text-sm font-medium">{client.clientName}</span>
                    <span className="text-green-600 font-semibold">
                      €{client.partnerEarning.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tržby klientů vs. Moje provize</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" name="Tržby klienta (€)" />
                <Bar dataKey="earning" fill="#10b981" name="Moja provize (€)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Clients */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Moji klienti</CardTitle>
            <Button variant="outline" size="sm">
              Spravovat klienty
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demoClients.slice(0, 3).map((client) => (
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
                    <p className="font-semibold text-green-600">€{(client.monthlyRevenue * 0.1).toLocaleString()}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">moja provize</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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
                    <Badge className={
                      ticket.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }>
                      {ticket.priority}
                    </Badge>
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
  );
};
