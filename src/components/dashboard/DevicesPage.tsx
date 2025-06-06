
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Smartphone, Clock, CheckCircle, AlertTriangle, XCircle, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { demoDevices, demoLocations, DeviceData } from '@/data/demoData';
import { getFilteredData } from '@/utils/roleUtils';
import { PageHeader } from '@/components/ui/page-header';
import { EntityActions } from '@/components/ui/entity-actions';

export const DevicesPage: React.FC = () => {
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

  // Check if user is client - clients can view devices but have limited access
  if (user.role === 'client') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Ako klient nemáte oprávnenie na správu zariadení. Pre správu zariadení kontaktujte vašu ISO Organizáciu.
        </p>
      </div>
    );
  }

  const filteredDevices: DeviceData[] = getFilteredData(demoDevices, user).filter(device =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  ) as DeviceData[];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'inactive': return <Clock className="h-4 w-4" />;
      case 'maintenance': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getLocationName = (locationId: string) => {
    const location = demoLocations.find(loc => loc.id === locationId);
    return location?.name || 'Neznáma lokácia';
  };

  const activeDevices = filteredDevices.filter(d => d.status === 'active').length;
  const inactiveDevices = filteredDevices.filter(d => d.status === 'inactive').length;
  const maintenanceDevices = filteredDevices.filter(d => d.status === 'maintenance').length;
  const errorDevices = filteredDevices.filter(d => d.status === 'error').length;

  const stats = [
    {
      label: 'Aktívne',
      value: activeDevices,
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      label: 'Neaktívne',
      value: inactiveDevices,
      icon: Clock,
      color: 'text-gray-500'
    },
    {
      label: 'Údržba',
      value: maintenanceDevices,
      icon: AlertTriangle,
      color: 'text-yellow-500'
    },
    {
      label: 'Chyba',
      value: errorDevices,
      icon: XCircle,
      color: 'text-red-500'
    }
  ];

  const actions = (
    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
      <Plus className="h-4 w-4 mr-2" />
      Pridať zariadenie
    </Button>
  );

  return (
    <PageHeader
      title="Zariadenia"
      description="Správa a monitoring všetkých platobných zariadení"
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
                placeholder="Hľadať zariadenia..."
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
                <TableHead>Sériové číslo</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Lokácia</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posledná aktivita</TableHead>
                <TableHead>Firmware</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">{device.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{device.serialNumber}</TableCell>
                  <TableCell>{device.model}</TableCell>
                  <TableCell>{getLocationName(device.locationId)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(device.status)}>
                      {getStatusIcon(device.status)}
                      <span className="ml-1">
                        {device.status === 'active' && 'Aktívne'}
                        {device.status === 'inactive' && 'Neaktívne'}
                        {device.status === 'maintenance' && 'Údržba'}
                        {device.status === 'error' && 'Chyba'}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(device.lastActivity).toLocaleDateString('sk-SK')}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{device.firmwareVersion}</TableCell>
                  <TableCell>
                    <EntityActions
                      actions={[
                        {
                          type: 'view',
                          label: 'Zobraziť detail',
                          onClick: () => console.log('View device', device.id)
                        },
                        {
                          type: 'edit',
                          label: 'Upraviť',
                          onClick: () => console.log('Edit device', device.id)
                        },
                        {
                          type: 'delete',
                          label: 'Vymazať',
                          onClick: () => console.log('Delete device', device.id)
                        }
                      ]}
                      entityName="zariadenie"
                      entityId={device.name}
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
