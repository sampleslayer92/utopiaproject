
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Smartphone, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  CreditCard, 
  Users, 
  MapPin, 
  BarChart3,
  Plus,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from '@/contexts/LocationContext';
import { CreateTicketDialog } from './CreateTicketDialog';
import { getLocationDevices } from '@/data/demoData';

const weeklyData = [
  { day: 'Pon', transactions: 450, revenue: 2340 },
  { day: 'Uto', transactions: 520, revenue: 2680 },
  { day: 'Str', transactions: 380, revenue: 1950 },
  { day: 'Štv', transactions: 620, revenue: 3200 },
  { day: 'Pia', transactions: 750, revenue: 3890 },
  { day: 'Sob', transactions: 890, revenue: 4560 },
  { day: 'Ned', transactions: 680, revenue: 3510 }
];

export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { selectedLocation, allLocations, isOverviewMode } = useLocation();

  const handleTicketCreated = () => {
    console.log('Quick ticket created');
  };

  // Get devices for selected location or all devices for overview
  const devices = isOverviewMode 
    ? allLocations.flatMap(loc => getLocationDevices(loc.id))
    : selectedLocation 
      ? getLocationDevices(selectedLocation.id)
      : [];

  const totalRevenue = isOverviewMode 
    ? allLocations.reduce((sum, loc) => sum + loc.monthlyRevenue, 0)
    : selectedLocation?.monthlyRevenue || 0;

  const totalTransactions = devices.reduce((sum, device) => sum + device.transactions, 0);
  const activeDevices = devices.filter(device => device.status === 'online').length;
  const averageUptime = devices.length > 0 
    ? devices.reduce((sum, device) => sum + device.uptime, 0) / devices.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isOverviewMode ? 'Všeobecný prehľad' : selectedLocation?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isOverviewMode 
              ? `Prehľad všetkých ${allLocations.length} prevádzok`
              : `Prehľad prevádzky ${selectedLocation?.name}`
            }
          </p>
        </div>
        <div className="flex gap-3">
          <CreateTicketDialog onTicketCreated={handleTicketCreated} />
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Detailný report
          </Button>
        </div>
      </div>

      {/* Overview Cards for All Locations */}
      {isOverviewMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {allLocations.map((location) => (
            <Card key={location.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">
                        {location.type === 'retail' ? '🏪' : 
                         location.type === 'travel' ? '✈️' : 
                         location.type === 'online' ? '💻' : '🏢'}
                      </span>
                      <h3 className="font-semibold">{location.name}</h3>
                    </div>
                    <p className="text-2xl font-bold text-green-600">€{location.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{location.devicesCount} zariadení</p>
                  </div>
                  <Badge variant={location.isActive ? 'default' : 'secondary'}>
                    {location.isActive ? 'Aktívna' : 'Neaktívna'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isOverviewMode ? 'Celkové tržby' : 'Mesačné tržby'}
                </p>
                <p className="text-2xl font-bold text-green-600">€{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+12.5% vs minulý mesiac</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkové transakcie</p>
                <p className="text-2xl font-bold text-blue-600">{totalTransactions.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">+8.3% vs minulý mesiac</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktívne zariadenia</p>
                <p className="text-2xl font-bold text-purple-600">{activeDevices}/{devices.length}</p>
                <p className="text-xs text-green-600 mt-1">
                  {activeDevices === devices.length ? 'Všetky online' : `${devices.length - activeDevices} offline`}
                </p>
              </div>
              <Smartphone className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Priemerná dostupnosť</p>
                <p className="text-2xl font-bold text-orange-600">{averageUptime.toFixed(1)}%</p>
                <p className="text-xs text-green-600 mt-1">
                  {averageUptime > 98 ? 'Výborná' : averageUptime > 95 ? 'Dobrá' : 'Potrebuje pozornosť'}
                </p>
              </div>
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Týždenný trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Transakcie"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Tržby (€)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {isOverviewMode ? 'Výkonnosť všetkých zariadení' : `Výkonnosť zariadení - ${selectedLocation?.name}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={devices.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="transactions" fill="#8b5cf6" name="Transakcie" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Status */}
      <Card>
        <CardHeader>
          <CardTitle>
            Status zariadení {!isOverviewMode && `- ${selectedLocation?.name}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devices.slice(0, 8).map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    device.status === 'online' ? 'bg-green-100 dark:bg-green-900' :
                    device.status === 'maintenance' ? 'bg-yellow-100 dark:bg-yellow-900' :
                    'bg-red-100 dark:bg-red-900'
                  }`}>
                    <Smartphone className={`h-5 w-5 ${
                      device.status === 'online' ? 'text-green-600' :
                      device.status === 'maintenance' ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{device.name}</h4>
                    <p className="text-sm text-gray-500">TID: {device.tid}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium">{device.transactions} transakcií</p>
                    <p className="text-xs text-gray-500">€{device.revenue.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{device.uptime}% uptime</p>
                    <Progress value={device.uptime} className="w-20 h-2" />
                  </div>
                  <Badge variant={
                    device.status === 'online' ? 'default' :
                    device.status === 'maintenance' ? 'secondary' : 'destructive'
                  }>
                    {device.status === 'online' ? 'Online' :
                     device.status === 'maintenance' ? 'Údržba' : 'Offline'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
