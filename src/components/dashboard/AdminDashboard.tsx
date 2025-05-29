import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, Smartphone, TrendingUp, AlertTriangle, CheckCircle, Clock, DollarSign, Plus, Settings, BarChart3, Shield } from 'lucide-react';
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
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-full">
      {/* Enhanced Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Administrátorský panel</h1>
                  <p className="text-blue-100 text-lg mt-1">
                    Vitajte späť! Máte plnú kontrolu nad systémom.
                  </p>
                </div>
              </div>
              <p className="text-blue-100 max-w-2xl">
                Spravujte obchodných partnerov, monitorujte výkonnosť a dohliadajte na celý ekosystém.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nový partner
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Settings className="h-5 w-5 mr-2" />
                Systémové nastavenia
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Detailný report
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Business Partners */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Nejlepší obchodní partneri
              </CardTitle>
              <Button variant="outline" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                Zobrazit všechny
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {topPartners.map((partner) => (
                <div key={partner.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full shadow-sm ${
                      partner.tier === 'gold' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                      partner.tier === 'silver' ? 'bg-gradient-to-r from-gray-300 to-gray-400' : 'bg-gradient-to-r from-orange-400 to-orange-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{partner.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <span>{partner.region}</span>
                        <span>•</span>
                        <span className="capitalize">{partner.tier} tier</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">{partner.clientsCount} klientů</p>
                    <p className="text-sm text-green-600 font-medium">€{partner.monthlyRevenue.toLocaleString()}/měs</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              Nedávná aktivita
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full mt-2 shadow-sm ${
                      activity.status === 'success' ? 'bg-gradient-to-r from-green-400 to-green-500' :
                      activity.status === 'info' ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                      activity.status === 'warning' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                    }`}></div>
                    {index < recentActivity.length - 1 && (
                      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gray-200 dark:bg-gray-600"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health Overview */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-purple-600" />
            Přehled systému
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-1">99.8%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dostupnost zařízení</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-1">120ms</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Odezva API</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-yellow-600 mb-1">3</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Aktivní tikety</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-600 mb-1">€156K</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tržby tento měsíc</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
