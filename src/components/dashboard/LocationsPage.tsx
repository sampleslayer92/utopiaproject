
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, MapPin, Users, TrendingUp, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { demoLocations, demoDevices, demoTransactions, LocationData } from '@/data/demoData';
import { getFilteredData } from '@/utils/roleUtils';
import { PageHeader } from '@/components/ui/page-header';
import { EntityActions } from '@/components/ui/entity-actions';

export const LocationsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Načítanie...
        </p>
      </div>
    );
  }

  const filteredLocations: LocationData[] = getFilteredData(demoLocations, user).filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  ) as LocationData[];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getDeviceCount = (locationId: string) => {
    return demoDevices.filter(device => device.locationId === locationId).length;
  };

  const getMonthlyVolume = (locationId: string) => {
    const locationTransactions = demoTransactions.filter(tx => tx.locationId === locationId);
    return locationTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  };

  const activeLocations = filteredLocations.filter(l => l.status === 'active').length;
  const totalVolume = filteredLocations.reduce((sum, location) => sum + getMonthlyVolume(location.id), 0);
  const totalDevices = filteredLocations.reduce((sum, location) => sum + getDeviceCount(location.id), 0);

  const stats = [
    {
      label: 'Aktívne pobočky',
      value: activeLocations,
      icon: MapPin,
      color: 'text-blue-500'
    },
    {
      label: 'Celkom zariadení',
      value: totalDevices,
      icon: Users,
      color: 'text-green-500'
    },
    {
      label: 'Mesačný obrat',
      value: `€${totalVolume.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-500'
    },
    {
      label: 'Priemerný obrat',
      value: `€${activeLocations > 0 ? Math.round(totalVolume / activeLocations).toLocaleString() : '0'}`,
      icon: TrendingUp,
      color: 'text-orange-500'
    }
  ];

  const actions = (
    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
      <Plus className="h-4 w-4 mr-2" />
      Pridať pobočku
    </Button>
  );

  const description = user.role === 'admin' 
    ? 'Správa všetkých pobočiek v systéme'
    : 'Správa vašich prevádzok a pobočiek';

  return (
    <PageHeader
      title="Pobočky"
      description={description}
      stats={stats}
      actions={actions}
    >
      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Hľadať pobočky..."
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
                <TableHead>Názov</TableHead>
                <TableHead>Adresa</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Zariadenia</TableHead>
                <TableHead>Mesačný obrat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vytvorené</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">{location.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell className="capitalize">{location.type}</TableCell>
                  <TableCell>
                    <span className="font-medium">{getDeviceCount(location.id)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">
                      €{getMonthlyVolume(location.id).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(location.status)}>
                      {location.status === 'active' && 'Aktívne'}
                      {location.status === 'inactive' && 'Neaktívne'}
                      {location.status === 'pending' && 'Čakajúce'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(location.createdAt).toLocaleDateString('sk-SK')}
                  </TableCell>
                  <TableCell>
                    <EntityActions
                      actions={[
                        {
                          type: 'view',
                          label: 'Zobraziť detail',
                          onClick: () => console.log('View location', location.id)
                        },
                        {
                          type: 'edit',
                          label: 'Upraviť',
                          onClick: () => console.log('Edit location', location.id)
                        },
                        {
                          type: 'delete',
                          label: 'Vymazať',
                          onClick: () => console.log('Delete location', location.id)
                        }
                      ]}
                      entityName="pobočku"
                      entityId={location.name}
                      compact={true}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageHeader>
  );
};
