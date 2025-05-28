
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Edit, Eye, MapPin, Smartphone, DollarSign, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Location } from '@/types/dashboard';

const mockLocations: Location[] = [
  {
    id: 'loc-1',
    name: 'Hlavná prevádzka',
    address: 'Hlavná 15, Bratislava',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    devicesCount: 15,
    activeDevices: 14,
    status: 'active',
    createdAt: '2024-01-15',
    lastReportDate: '2024-11-28',
    revenue: { monthly: 1200, total: 14400 }
  },
  {
    id: 'loc-2',
    name: 'Pobočka Centrum',
    address: 'Námestie 8, Bratislava',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    devicesCount: 12,
    activeDevices: 11,
    status: 'active',
    createdAt: '2024-02-01',
    lastReportDate: '2024-11-28',
    revenue: { monthly: 950, total: 9500 }
  },
  {
    id: 'loc-3',
    name: 'Prevádzka Východ',
    address: 'Východná 22, Košice',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    devicesCount: 18,
    activeDevices: 18,
    status: 'active',
    createdAt: '2024-03-10',
    lastReportDate: '2024-11-27',
    revenue: { monthly: 1450, total: 13050 }
  },
  {
    id: 'loc-4',
    name: 'RetailMax - Aupark',
    address: 'Aupark, Bratislava',
    clientId: 'client-2',
    businessPartnerId: 'bp-1',
    devicesCount: 25,
    activeDevices: 23,
    status: 'active',
    createdAt: '2024-01-20',
    lastReportDate: '2024-11-28',
    revenue: { monthly: 2100, total: 23100 }
  },
  {
    id: 'loc-5',
    name: 'RetailMax - Polus',
    address: 'Polus City Center, Bratislava',
    clientId: 'client-2',
    businessPartnerId: 'bp-1',
    devicesCount: 20,
    activeDevices: 19,
    status: 'maintenance',
    createdAt: '2024-02-15',
    lastReportDate: '2024-11-25',
    revenue: { monthly: 1850, total: 18500 }
  }
];

export const LocationsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Filter locations based on user role
  const getFilteredLocations = () => {
    let locations = mockLocations;
    
    if (user?.role === 'business_partner') {
      locations = locations.filter(location => location.businessPartnerId === user.businessPartnerId);
    } else if (user?.role === 'client') {
      locations = locations.filter(location => location.clientId === user.clientId);
    } else if (user?.role === 'location') {
      locations = locations.filter(location => location.id === user.clientId); // For location users, clientId represents locationId
    }
    
    return locations.filter(location =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredLocations = getFilteredLocations();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktívna';
      case 'inactive':
        return 'Neaktívna';
      case 'maintenance':
        return 'Údržba';
      default:
        return 'Neznámy';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Prevádzky
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.role === 'admin' ? 'Správa všetkých prevádzok' : 
             user?.role === 'business_partner' ? 'Správa prevádzok vašich klientov' :
             user?.role === 'client' ? 'Správa vašich prevádzok' : 'Detail prevádzky'}
          </p>
        </div>
        {user?.role !== 'location' && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Pridať prevádzku
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom prevádzok</p>
                <p className="text-2xl font-bold">{filteredLocations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Smartphone className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom zariadení</p>
                <p className="text-2xl font-bold">{filteredLocations.reduce((sum, l) => sum + l.devicesCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktívne zariadenia</p>
                <p className="text-2xl font-bold">{filteredLocations.reduce((sum, l) => sum + l.activeDevices, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesačné tržby</p>
                <p className="text-2xl font-bold">€{filteredLocations.reduce((sum, l) => sum + l.revenue.monthly, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Hľadať prevádzky..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prevádzka</TableHead>
                <TableHead>Adresa</TableHead>
                <TableHead>Zariadenia</TableHead>
                <TableHead>Aktívne/Celkom</TableHead>
                <TableHead>Mesačné tržby</TableHead>
                <TableHead>Posledný report</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>
                    <div className="font-medium">{location.name}</div>
                  </TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>{location.devicesCount}</TableCell>
                  <TableCell>
                    <span className={location.activeDevices === location.devicesCount ? 'text-green-600' : 'text-yellow-600'}>
                      {location.activeDevices}/{location.devicesCount}
                    </span>
                  </TableCell>
                  <TableCell>€{location.revenue.monthly.toLocaleString()}</TableCell>
                  <TableCell>
                    {location.lastReportDate 
                      ? new Date(location.lastReportDate).toLocaleDateString('sk-SK')
                      : 'Nikdy'
                    }
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(location.status)}>
                      {getStatusText(location.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedLocation(location)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detail prevádzky</DialogTitle>
                          </DialogHeader>
                          {selectedLocation && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Názov</p>
                                  <p>{selectedLocation.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Adresa</p>
                                  <p>{selectedLocation.address}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Počet zariadení</p>
                                  <p>{selectedLocation.devicesCount}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Aktívne zariadenia</p>
                                  <p>{selectedLocation.activeDevices}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Mesačné tržby</p>
                                  <p>€{selectedLocation.revenue.monthly.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Celkové tržby</p>
                                  <p>€{selectedLocation.revenue.total.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Vytvorená</p>
                                  <p>{new Date(selectedLocation.createdAt).toLocaleDateString('sk-SK')}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Status</p>
                                  <Badge className={getStatusColor(selectedLocation.status)}>
                                    {getStatusText(selectedLocation.status)}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      {user?.role !== 'location' && (
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
