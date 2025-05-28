
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Edit, Eye, Smartphone, MapPin, DollarSign, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Device } from '@/types/device';

const mockDevices: Device[] = [
  {
    id: 'dev-1',
    name: 'Terminal 1',
    type: 'POS Terminal',
    model: 'Ingenico iPP350',
    serialNumber: 'IPP350-001234',
    tid: 'T1001',
    locationId: 'loc-1',
    locationName: 'TechCorp Centrum',
    clientId: 'client-1',
    clientName: 'TechCorp s.r.o.',
    businessPartnerId: 'bp-1',
    status: 'online',
    lastSeen: '2024-11-28T14:30:00Z',
    installDate: '2024-01-15',
    warrantyExpiry: '2027-01-15',
    revenue: {
      daily: 1250,
      monthly: 32500,
      total: 125000
    },
    metrics: {
      uptime: 99.2,
      transactions: 1250,
      errors: 2
    }
  },
  {
    id: 'dev-2',
    name: 'Terminal 2',
    type: 'POS Terminal',
    model: 'Verifone P400',
    serialNumber: 'P400-005678',
    tid: 'T1002',
    locationId: 'loc-1',
    locationName: 'TechCorp Centrum',
    clientId: 'client-1',
    clientName: 'TechCorp s.r.o.',
    businessPartnerId: 'bp-1',
    status: 'maintenance',
    lastSeen: '2024-11-28T08:15:00Z',
    installDate: '2024-02-20',
    warrantyExpiry: '2027-02-20',
    revenue: {
      daily: 980,
      monthly: 28600,
      total: 98000
    },
    metrics: {
      uptime: 97.8,
      transactions: 980,
      errors: 5
    }
  },
  {
    id: 'dev-3',
    name: 'Terminal 3',
    type: 'Payment Gateway',
    model: 'PAX A920',
    serialNumber: 'A920-009876',
    tid: 'T1003',
    locationId: 'loc-2',
    locationName: 'RetailMax Pobočka A',
    clientId: 'client-2',
    clientName: 'RetailMax a.s.',
    businessPartnerId: 'bp-1',
    status: 'online',
    lastSeen: '2024-11-28T14:25:00Z',
    installDate: '2024-03-10',
    warrantyExpiry: '2027-03-10',
    revenue: {
      daily: 1180,
      monthly: 35400,
      total: 118000
    },
    metrics: {
      uptime: 98.5,
      transactions: 1180,
      errors: 1
    }
  },
  {
    id: 'dev-4',
    name: 'Terminal 4',
    type: 'Mobile Terminal',
    model: 'SumUp Air',
    serialNumber: 'SUMUP-012345',
    tid: 'T1004',
    locationId: 'loc-3',
    locationName: 'CafeChain Centrum',
    clientId: 'client-3',
    clientName: 'CafeChain Ltd.',
    businessPartnerId: 'bp-2',
    status: 'error',
    lastSeen: '2024-11-27T16:45:00Z',
    installDate: '2024-04-05',
    warrantyExpiry: '2026-04-05',
    revenue: {
      daily: 750,
      monthly: 22500,
      total: 75000
    },
    metrics: {
      uptime: 95.2,
      transactions: 750,
      errors: 12
    }
  }
];

export const DevicesPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter devices based on user role
  const getFilteredDevices = () => {
    let devices = mockDevices;
    
    if (user?.role === 'business_partner') {
      devices = devices.filter(device => device.businessPartnerId === user.businessPartnerId);
    } else if (user?.role === 'client') {
      devices = devices.filter(device => device.clientId === user.id);
    }
    
    return devices.filter(device => {
      const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           device.tid.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           device.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           device.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const filteredDevices = getFilteredDevices();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'offline':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Smartphone className="h-4 w-4 text-gray-500" />;
    }
  };

  const statusCounts = {
    total: filteredDevices.length,
    online: filteredDevices.filter(d => d.status === 'online').length,
    offline: filteredDevices.filter(d => d.status === 'offline').length,
    maintenance: filteredDevices.filter(d => d.status === 'maintenance').length,
    error: filteredDevices.filter(d => d.status === 'error').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Zariadenia
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Správa a monitoring platobných zariadení
          </p>
        </div>
        {(user?.role === 'admin' || user?.role === 'business_partner') && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Pridať zariadenie
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Smartphone className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom zariadení</p>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Online</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.online}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Údržba</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.maintenance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Chyby</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Denné tržby</p>
                <p className="text-2xl font-bold">€{filteredDevices.reduce((sum, d) => sum + d.revenue.daily, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
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
            <div className="flex space-x-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                Všetky
              </Button>
              <Button
                variant={statusFilter === 'online' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('online')}
              >
                Online
              </Button>
              <Button
                variant={statusFilter === 'error' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('error')}
              >
                Chyby
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zariadenie</TableHead>
                <TableHead>TID</TableHead>
                <TableHead>Umiestnenie</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Denné tržby</TableHead>
                <TableHead>Posledná aktivita</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(device.status)}
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-sm text-gray-500">{device.model}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{device.tid}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{device.locationName}</div>
                      <div className="text-sm text-gray-500">{device.clientName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(device.status)}>
                      {device.status === 'online' ? 'Online' :
                       device.status === 'offline' ? 'Offline' :
                       device.status === 'maintenance' ? 'Údržba' : 'Chyba'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{device.metrics.uptime}%</div>
                      <Progress value={device.metrics.uptime} className="w-16 h-2" />
                    </div>
                  </TableCell>
                  <TableCell>€{device.revenue.daily.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(device.lastSeen).toLocaleString('sk-SK')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedDevice(device)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detail zariadenia</DialogTitle>
                          </DialogHeader>
                          {selectedDevice && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Názov</p>
                                  <p>{selectedDevice.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">TID</p>
                                  <p>{selectedDevice.tid}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Model</p>
                                  <p>{selectedDevice.model}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Sériové číslo</p>
                                  <p>{selectedDevice.serialNumber}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Umiestnenie</p>
                                  <p>{selectedDevice.locationName}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Klient</p>
                                  <p>{selectedDevice.clientName}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Inštalácia</p>
                                  <p>{new Date(selectedDevice.installDate).toLocaleDateString('sk-SK')}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Záruka do</p>
                                  <p>{selectedDevice.warrantyExpiry ? new Date(selectedDevice.warrantyExpiry).toLocaleDateString('sk-SK') : 'N/A'}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                                <div className="text-center">
                                  <p className="text-2xl font-bold text-green-600">€{selectedDevice.revenue.monthly.toLocaleString()}</p>
                                  <p className="text-sm text-gray-500">Mesačné tržby</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-2xl font-bold text-blue-600">{selectedDevice.metrics.transactions}</p>
                                  <p className="text-sm text-gray-500">Transakcie</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-2xl font-bold text-purple-600">{selectedDevice.metrics.uptime}%</p>
                                  <p className="text-sm text-gray-500">Uptime</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      {(user?.role === 'admin' || user?.role === 'business_partner') && (
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
