
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Building, Users, TrendingUp, Plus, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from '@/contexts/LocationContext';
import { demoLocations, demoDevices, getClientLocations, getLocationDevices } from '@/data/demoData';
import { AddLocationDialog } from './AddLocationDialog';

export const LocationsPage: React.FC = () => {
  const { user } = useAuth();
  const { selectedLocation, isOverviewMode } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Get locations based on user role
  const getLocationsForUser = () => {
    if (user?.role === 'admin') {
      return demoLocations;
    }
    
    if (user?.role === 'business_partner') {
      return demoLocations;
    }
    
    if (user?.role === 'client') {
      return getClientLocations('client-1');
    }
    
    return [];
  };

  const locations = getLocationsForUser().filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalLocations = locations.length;
  const activeLocations = locations.filter(l => l.status === 'active').length;
  const totalDevices = locations.reduce((sum, loc) => {
    const devices = getLocationDevices(loc.id);
    return sum + devices.length;
  }, 0);
  const totalRevenue = locations.reduce((sum, loc) => sum + loc.monthlyRevenue, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'setup':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleLocationAdded = () => {
    console.log('Location added successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Prevádzky
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isOverviewMode ? 'Prehľad všetkých prevádzok' : `Prevádzky`}
          </p>
        </div>
        <div className="flex gap-3">
          {user?.role === 'client' && <AddLocationDialog onLocationAdded={handleLocationAdded} />}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Celkové prevádzky</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalLocations}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">+2 nové tento mesiac</p>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Aktívne prevádzky</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{activeLocations}</p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {totalLocations > 0 ? ((activeLocations / totalLocations) * 100).toFixed(1) : 0}% aktívnych
                </p>
              </div>
              <MapPin className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Celkové zariadenia</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{totalDevices}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Všetky prevádzky</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Mesačné tržby</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">€{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">+15.3% vs minulý mesiac</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
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
                placeholder="Hľadať prevádzky..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-gray-900/80"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => {
          const devices = getLocationDevices(location.id);
          const onlineDevices = devices.filter(d => d.status === 'online').length;
          
          return (
            <Card key={location.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{location.name}</CardTitle>
                  <Badge className={getStatusColor(location.status)}>
                    {location.status === 'active' ? 'Aktívne' : 
                     location.status === 'inactive' ? 'Neaktívne' : 'Nastavovanie'}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {location.address}
                  </p>
                  <p><strong>Typ:</strong> {location.type}</p>
                  <p><strong>Manažér:</strong> {location.manager}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{devices.length}</p>
                    <p className="text-xs text-gray-500">Zariadenia</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{onlineDevices}</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mesačné tržby</span>
                    <span className="font-semibold">€{location.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Transakcie/deň</span>
                    <span className="font-semibold">{location.dailyTransactions}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p><strong>Telefón:</strong> {location.phone}</p>
                  <p><strong>Email:</strong> {location.email}</p>
                  <p><strong>Otvorené:</strong> {new Date(location.openDate).toLocaleDateString('sk-SK')}</p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="h-3 w-3 mr-1" />
                    Nastavenia
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {locations.length === 0 && (
        <Card className="p-8 text-center">
          <Building className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Žiadne prevádzky
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm ? 'Neboli nájdené žiadne prevádzky pre zadané kritériá.' : 'Zatiaľ nemáte žiadne prevádzky.'}
          </p>
          {!searchTerm && user?.role === 'client' && <AddLocationDialog onLocationAdded={handleLocationAdded} />}
        </Card>
      )}
    </div>
  );
};
