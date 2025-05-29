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
  Zap,
  Building2,
  Headphones
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
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-full">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">
                    {isOverviewMode ? 'Všeobecný prehľad' : selectedLocation?.name}
                  </h1>
                  <p className="text-green-100 text-lg mt-1">
                    Vitajte späť! Vaše podnikanie rastie.
                  </p>
                </div>
              </div>
              <p className="text-green-100 max-w-2xl">
                {isOverviewMode 
                  ? `Komplexný prehľad všetkých ${allLocations.length} prevádzok a ich výkonnosti`
                  : `Detailný prehľad prevádzky ${selectedLocation?.name} a jej výkonnosti`
                }
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nová prevádzka
              </Button>
              <CreateTicketDialog onTicketCreated={handleTicketCreated} />
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

      {/* Overview Cards for All Locations */}
      {isOverviewMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {allLocations.map((location) => (
            <Card key={location.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 border-0 shadow-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-2xl">
                        {location.type === 'retail' ? '🏪' : 
                         location.type === 'travel' ? '✈️' : 
                         location.type === 'online' ? '💻' : '🏢'}
                      </span>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{location.name}</h3>
                    </div>
                    <p className="text-2xl font-bold text-green-600 mb-1">€{location.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Smartphone className="h-3 w-3" />
                      {location.devicesCount} zariadení
                    </p>
                  </div>
                  <Badge variant={location.isActive ? 'default' : 'secondary'} className="group-hover:scale-105 transition-transform">
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
        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {isOverviewMode ? 'Celkové tržby' : 'Mesačné tržby'}
                </p>
                <p className="text-2xl font-bold text-green-600 mb-1">€{totalRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">+12.5% vs minulý mesiac</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Celkové transakcie</p>
                <p className="text-2xl font-bold text-blue-600 mb-1">{totalTransactions.toLocaleString()}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-blue-500" />
                  <span className="text-xs text-blue-600 font-medium">+8.3% vs minulý mesiac</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Aktívne zariadenia</p>
                <p className="text-2xl font-bold text-purple-600 mb-1">{activeDevices}/{devices.length}</p>
                <span className="text-xs text-green-600 font-medium">
                  {activeDevices === devices.length ? 'Všetky online' : `${devices.length - activeDevices} offline`}
                </span>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Priemerná dostupnosť</p>
                <p className="text-2xl font-bold text-orange-600 mb-1">{averageUptime.toFixed(1)}%</p>
                <span className="text-xs text-green-600 font-medium">
                  {averageUptime > 98 ? 'Výborná' : averageUptime > 95 ? 'Dobrá' : 'Potrebuje pozornosť'}
                </span>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Týždenný trend
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Transakcie"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Tržby (€)"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-green-600" />
              {isOverviewMode ? 'Výkonnosť všetkých zariadení' : `Výkonnosť zariadení - ${selectedLocation?.name}`}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={devices.slice(0, 6)}>
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
                <Bar dataKey="transactions" fill="url(#purpleGradient)" name="Transakcie" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Status */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700">
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-gray-600" />
            Status zariadení {!isOverviewMode && `- ${selectedLocation?.name}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {devices.slice(0, 8).map((device) => (
              <div key={device.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                    device.status === 'online' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    device.status === 'maintenance' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}>
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{device.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">TID: {device.tid}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{device.transactions} transakcií</p>
                    <p className="text-xs text-gray-500">€{device.revenue.toLocaleString()}</p>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">{device.uptime}% uptime</p>
                    <Progress value={device.uptime} className="w-20 h-2" />
                  </div>
                  <Badge variant={
                    device.status === 'online' ? 'default' :
                    device.status === 'maintenance' ? 'secondary' : 'destructive'
                  } className="min-w-[70px] justify-center">
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
