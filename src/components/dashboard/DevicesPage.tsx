
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Smartphone, Wifi, WifiOff, Settings, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from '@/contexts/LocationContext';
import { demoDevices, demoLocations, getLocationDevices, getClientLocations } from '@/data/demoData';
import { AddDeviceDialog } from './AddDeviceDialog';

export const DevicesPage: React.FC = () => {
  const { user } = useAuth();
  const { selectedLocation, isOverviewMode } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Get devices based on user role and location selection
  const getDevicesForUser = () => {
    if (user?.role === 'admin') {
      return demoDevices;
    }
    
    if (user?.role === 'business_partner') {
      // Show devices for all clients of this business partner
      return demoDevices;
    }
    
    if (user?.role === 'client') {
      if (isOverviewMode) {
        // Show all devices for this client
        const clientLocations = getClientLocations('client-1'); // In real app, use actual client ID
        const locationIds = clientLocations.map(loc => loc.id);
        return demoDevices.filter(device => locationIds.includes(device.locationId));
      } else if (selectedLocation) {
        return getLocationDevices(selectedLocation.id);
      }
    }
    
    return [];
  };

  const devices = getDevicesForUser().filter(device =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.tid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const totalTransactions = devices.reduce((sum, d) => sum + d.transactions, 0);
  const totalRevenue = devices.reduce((sum, d) => sum + d.revenue, 0);
  const averageUptime = devices.length > 0 ? devices.reduce((sum, d) => sum + d.uptime, 0) / devices.length : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'offline':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="h-4 w-4" />;
      case 'offline':
        return <WifiOff className="h-4 w-4" />;
      case 'maintenance':
        return <Settings className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleDeviceAdded = () => {
    console.log('Device added successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Zariadenia
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isOverviewMode ? 'Prehľad všetkých zariadení' : `Zariadenia - ${selectedLocation?.name}`}
          </p>
        </div>
        <div className="flex gap-3">
          <AddDeviceDialog onDeviceAdded={handleDeviceAdded} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Online zariadenia</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{onlineDevices}/{devices.length}</p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {devices.length > 0 ? ((onlineDevices / devices.length) * 100).toFixed(1) : 0}% dostupnosť
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Celkové transakcie</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalTransactions.toLocaleString()}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">+8.3% vs minulý mesiac</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Celkové tržby</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">€{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">+12.1% vs minulý mesiac</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Priemerná dostupnosť</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{averageUptime.toFixed(1)}%</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  {averageUptime > 98 ? 'Výborná' : averageUptime > 95 ? 'Dobrá' : 'Potrebuje pozornosť'}
                </p>
              </div>
              <Smartphone className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Hľadať zariadenia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-gray-900/80"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => {
          const location = demoLocations.find(loc => loc.id === device.locationId);
          return (
            <Card key={device.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{device.name}</CardTitle>
                  <Badge className={getStatusColor(device.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(device.status)}
                      {device.status === 'online' ? 'Online' : 
                       device.status === 'offline' ? 'Offline' : 'Údržba'}
                    </div>
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>TID:</strong> {device.tid}</p>
                  <p><strong>Model:</strong> {device.brand} {device.model}</p>
                  <p><strong>Prevádzka:</strong> {location?.name}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{device.transactions}</p>
                    <p className="text-xs text-gray-500">Transakcie</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">€{device.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Tržby</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Dostupnosť</span>
                    <span className="font-semibold">{device.uptime}%</span>
                  </div>
                  <Progress value={device.uptime} className="h-2" />
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p><strong>S/N:</strong> {device.serialNumber}</p>
                  <p><strong>Inštalácia:</strong> {new Date(device.installDate).toLocaleDateString('sk-SK')}</p>
                  {device.lastMaintenance && (
                    <p><strong>Údržba:</strong> {new Date(device.lastMaintenance).toLocaleDateString('sk-SK')}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {devices.length === 0 && (
        <Card className="p-8 text-center">
          <Smartphone className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Žiadne zariadenia
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm ? 'Neboli nájdené žiadne zariadenia pre zadané kritériá.' : 'Zatiaľ nemáte žiadne zariadenia.'}
          </p>
          {!searchTerm && <AddDeviceDialog onDeviceAdded={handleDeviceAdded} />}
        </Card>
      )}
    </div>
  );
};
