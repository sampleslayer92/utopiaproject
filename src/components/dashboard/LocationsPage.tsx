
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, MapPin, Building, Users, TrendingUp, Plus, Settings, Eye, Smartphone, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from '@/contexts/LocationContext';
import { demoLocations, demoDevices, getClientLocations, getLocationDevices } from '@/data/demoData';
import { AddLocationDialog } from './AddLocationDialog';

export const LocationsPage: React.FC = () => {
  const { user } = useAuth();
  const { selectedLocation, isOverviewMode } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocationDetail, setSelectedLocationDetail] = useState<any>(null);

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

  const handleRowClick = (location: any) => {
    setSelectedLocationDetail(location);
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

      {/* Locations Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Zoznam prevádzok</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Názov</TableHead>
                <TableHead>Adresa</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Zariadenia</TableHead>
                <TableHead>Online</TableHead>
                <TableHead>Tržby</TableHead>
                <TableHead>Manažér</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((location) => {
                const devices = getLocationDevices(location.id);
                const onlineDevices = devices.filter(d => d.status === 'online').length;
                
                return (
                  <TableRow 
                    key={location.id} 
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => handleRowClick(location)}
                  >
                    <TableCell className="font-medium">{location.name}</TableCell>
                    <TableCell>{location.address}</TableCell>
                    <TableCell>{location.type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(location.status)}>
                        {location.status === 'active' ? 'Aktívne' : 
                         location.status === 'inactive' ? 'Neaktívne' : 'Nastavovanie'}
                      </Badge>
                    </TableCell>
                    <TableCell>{devices.length}</TableCell>
                    <TableCell>{onlineDevices}</TableCell>
                    <TableCell>€{location.monthlyRevenue.toLocaleString()}</TableCell>
                    <TableCell>{location.manager}</TableCell>
                    <TableCell>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Location Detail Dialog */}
      <Dialog open={!!selectedLocationDetail} onOpenChange={() => setSelectedLocationDetail(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detail prevádzky</DialogTitle>
          </DialogHeader>
          {selectedLocationDetail && (
            <div className="grid grid-cols-2 gap-6 p-4">
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Základné informácie
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Názov</p>
                      <p className="font-medium">{selectedLocationDetail.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Adresa</p>
                      <p className="font-medium">{selectedLocationDetail.address}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Typ</p>
                      <p className="font-medium">{selectedLocationDetail.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <Badge className={getStatusColor(selectedLocationDetail.status)}>
                        {selectedLocationDetail.status === 'active' ? 'Aktívne' : 
                         selectedLocationDetail.status === 'inactive' ? 'Neaktívne' : 'Nastavovanie'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Kontaktné údaje
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Telefón</p>
                      <p className="font-medium">{selectedLocationDetail.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="font-medium">{selectedLocationDetail.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Manažér</p>
                      <p className="font-medium">{selectedLocationDetail.manager}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Zariadenia
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Celkové zariadenia</p>
                      <p className="text-2xl font-bold text-blue-600">{getLocationDevices(selectedLocationDetail.id).length}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Online zariadenia</p>
                      <p className="text-xl font-bold text-green-600">{getLocationDevices(selectedLocationDetail.id).filter(d => d.status === 'online').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Finančné údaje
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Mesačné tržby</p>
                      <p className="text-2xl font-bold text-green-600">€{selectedLocationDetail.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Denné transakcie</p>
                      <p className="text-xl font-bold">{selectedLocationDetail.dailyTransactions}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Dátumy</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Otvorené</p>
                      <p className="font-medium">{new Date(selectedLocationDetail.openDate).toLocaleDateString('sk-SK')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
