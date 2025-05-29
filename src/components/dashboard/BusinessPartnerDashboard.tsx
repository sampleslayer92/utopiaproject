import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Smartphone, DollarSign, TrendingUp, AlertCircle, Clock, CheckCircle2, Euro, PieChart, Plus, UserPlus, Ticket, BarChart3, Briefcase } from 'lucide-react';
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
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-full">
      {/* Enhanced Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Obchodný partner panel</h1>
                  <p className="text-purple-100 text-lg mt-1">
                    Vitajte späť! Vaša provízia rastie.
                  </p>
                </div>
              </div>
              <p className="text-purple-100 max-w-2xl">
                Spravujte svojich klientov, sledujte provízie a rozširujte svoje podnikanie.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Pridať klienta
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Ticket className="h-5 w-5 mr-2" />
                Nový tiket
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Provízie report
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full"></div>
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
                {item.change && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">
                      {item.change} oproti minulému měsíci
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Onboarding and Revenue Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OnboardingClientCard />
        
        <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <PieChart className="h-5 w-5 text-white" />
              </div>
              <span>Provize z klientů</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  €{revenueData.partnerCommission.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Měsíční provize (10%)</p>
              </div>
              
              <div className="space-y-3">
                {revenueData.clientBreakdown.map((client) => (
                  <div key={client.clientId} className="flex justify-between items-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{client.clientName}</span>
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
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-green-600" />
              Tržby klientů vs. Moje provize
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="revenue" fill="#3b82f6" name="Tržby klienta (€)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="earning" fill="#10b981" name="Moja provize (€)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Clients */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Moji klienti
              </CardTitle>
              <Button variant="outline" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                Spravovat klienty
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {demoClients.slice(0, 3).map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full shadow-sm ${
                      client.status === 'active' ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-gray-300 to-gray-400'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{client.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <span>{client.locationsCount} prevádzok</span>
                        <span>•</span>
                        <span>{client.devicesCount} zařízení</span>
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
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Nedávné tikety
            </CardTitle>
            <Button variant="outline" size="sm" className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20">
              Spravovat tikety
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                      {ticket.id}
                    </span>
                    <Badge className={`${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {ticket.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded-full ${
                      ticket.status === 'resolved' ? 'bg-green-100 dark:bg-green-900' :
                      ticket.status === 'in_progress' ? 'bg-yellow-100 dark:bg-yellow-900' :
                      'bg-red-100 dark:bg-red-900'
                    }`}>
                      {ticket.status === 'resolved' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : ticket.status === 'in_progress' ? (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
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
