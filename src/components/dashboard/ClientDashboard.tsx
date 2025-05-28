
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Smartphone, 
  Users, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export const ClientDashboard: React.FC = () => {
  // Mock data for transactions chart
  const transactionData = [
    { month: 'Jan', amount: 4200 },
    { month: 'Feb', amount: 3800 },
    { month: 'Mar', amount: 5100 },
    { month: 'Apr', amount: 4600 },
    { month: 'Máj', amount: 5800 },
    { month: 'Jún', amount: 6200 },
  ];

  // Mock devices data
  const devices = [
    { id: '001', name: 'Platobný terminál 1', location: 'Hlavná prevádzka', status: 'online', lastSeen: '2 min' },
    { id: '002', name: 'Platobný terminál 2', location: 'Hlavná prevádzka', status: 'online', lastSeen: '1 min' },
    { id: '003', name: 'Platobný terminál 3', location: 'Pobočka Centrum', status: 'offline', lastSeen: '2 hod' },
    { id: '004', name: 'Platobný terminál 4', location: 'Pobočka Východ', status: 'maintenance', lastSeen: '1 deň' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'offline':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'maintenance':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Online</Badge>;
      case 'offline':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Offline</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Údržba</Badge>;
      default:
        return <Badge variant="secondary">Neznámy</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Celkové tržby</p>
                <p className="text-2xl font-bold">€34,250</p>
                <p className="text-blue-100 text-xs flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% oproti minulému mesiacu
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Priemerná transakcia</p>
                <p className="text-2xl font-bold">€28.50</p>
                <p className="text-green-100 text-xs flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.2% oproti minulému mesiacu
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Aktívne zariadenia</p>
                <p className="text-2xl font-bold">3/4</p>
                <p className="text-purple-100 text-xs flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  1 zariadenie v údržbe
                </p>
              </div>
              <Smartphone className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Prevádzky</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-orange-100 text-xs flex items-center mt-1">
                  <Users className="h-3 w-3 mr-1" />
                  Všetky aktívne
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Transactions Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Mesačné transakcie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Device Status List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Stav zariadení</span>
              <Badge variant="outline">4 zariadenia</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(device.status)}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {device.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {device.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(device.status)}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Posledný kontakt: {device.lastSeen}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
