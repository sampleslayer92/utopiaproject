
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Smartphone, FileText, AlertCircle, TrendingUp, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { DashboardCard, Location, Contract } from '@/types/dashboard';

const dashboardData: DashboardCard[] = [
  { title: 'Moje prevádzky', value: 3, change: '+1', trend: 'up', icon: Building2 },
  { title: 'Celkem zařízení', value: 45, change: '+5', trend: 'up', icon: Smartphone },
  { title: 'Aktivní smlouvy', value: 2, change: '0', trend: 'neutral', icon: FileText },
  { title: 'Otevřené tikety', value: 1, change: '-2', trend: 'up', icon: AlertCircle },
];

const locations: Location[] = [
  {
    id: 'loc-1',
    name: 'Centrum - Hlavní prevádzka',
    address: 'Námestie SNP 15, Bratislava',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    devicesCount: 25,
    activeDevices: 24,
    status: 'active',
    createdAt: '2024-08-15',
    revenue: { monthly: 1250, total: 5000 }
  },
  {
    id: 'loc-2', 
    name: 'Pobočka Východ',
    address: 'Košická 8, Bratislava',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    devicesCount: 15,
    activeDevices: 15,
    status: 'active',
    createdAt: '2024-09-20',
    revenue: { monthly: 850, total: 2550 }
  },
  {
    id: 'loc-3',
    name: 'Sklad - Logistické centrum',
    address: 'Priemyselná 45, Senec',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    devicesCount: 5,
    activeDevices: 4,
    status: 'maintenance',
    createdAt: '2024-10-10',
    revenue: { monthly: 320, total: 960 }
  }
];

const contracts: Contract[] = [
  {
    id: 'contract-1',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    type: 'subscription',
    title: 'Platební terminály - Subscription',
    value: 24000,
    monthlyValue: 2000,
    status: 'active',
    startDate: '2024-08-01',
    endDate: '2025-07-31',
    autoRenewal: true,
    terms: 'Měsíční platba za terminály včetně podpory'
  },
  {
    id: 'contract-2',
    clientId: 'client-1', 
    businessPartnerId: 'bp-1',
    type: 'maintenance',
    title: 'Rozšířená podpora a údržba',
    value: 6000,
    monthlyValue: 500,
    status: 'active',
    startDate: '2024-08-01',
    endDate: '2025-07-31',
    autoRenewal: true,
    terms: '24/7 podpora, preventivní údržba'
  }
];

const recentTickets = [
  { 
    id: 'T-001', 
    title: 'Terminal offline v Centrum prevádzke', 
    location: 'Centrum - Hlavní prevádzka',
    priority: 'high', 
    status: 'in_progress', 
    created: '2 hodiny',
    description: 'Terminal č. 3 nereaguje od ranních hodin'
  }
];

export const ClientDashboard: React.FC = () => {
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
                    {item.change} oproti minulému měsíci
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Locations */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Moje prevádzky</CardTitle>
            <Button variant="outline" size="sm">
              Spravovat prevádzky
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locations.map((location) => (
                <div key={location.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        location.status === 'active' ? 'bg-green-500' :
                        location.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{location.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {location.address}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {location.activeDevices}/{location.devicesCount} zařízení
                      </p>
                      <p className="text-sm text-green-600">€{location.revenue.monthly}/měs</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Active Contracts */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Aktivní smlouvy</CardTitle>
            <Button variant="outline" size="sm">
              Zobrazit všechny
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div key={contract.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{contract.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {contract.type === 'subscription' ? 'Předplatné' : 'Údržba'} • 
                        Aktivní do {new Date(contract.endDate).toLocaleDateString('cs-CZ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        €{contract.monthlyValue?.toLocaleString()}/měs
                      </p>
                      <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Aktivní
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets & Support */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Podpora a tikety</CardTitle>
          <Button variant="default" size="sm">
            Nový tiket
          </Button>
        </CardHeader>
        <CardContent>
          {recentTickets.length > 0 ? (
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
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
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{ticket.created}</span>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white mb-1">{ticket.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{ticket.description}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">📍 {ticket.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Žádné aktivní tikety</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Všechny problémy jsou vyřešené</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
