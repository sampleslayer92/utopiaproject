
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Smartphone, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Search,
  Filter,
  MoreVertical,
  MapPin,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Device {
  id: string;
  name: string;
  type: string;
  model: string;
  serialNumber: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance' | 'error';
  lastSeen: string;
  installDate: string;
  dailyTransactions: number;
  monthlyRevenue: number;
  uptime: number;
}

export const DevicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock devices data
  const devices: Device[] = [
    {
      id: 'DEV-001',
      name: 'Platobný terminál 1',
      type: 'POS Terminal',
      model: 'VeriFone V400m',
      serialNumber: 'VF4001234567',
      location: 'Hlavná prevádzka - Pokladňa 1',
      status: 'online',
      lastSeen: '2 minúty',
      installDate: '2024-01-15',
      dailyTransactions: 156,
      monthlyRevenue: 8450,
      uptime: 99.8
    },
    {
      id: 'DEV-002',
      name: 'Platobný terminál 2',
      type: 'POS Terminal',
      model: 'VeriFone V400m',
      serialNumber: 'VF4001234568',
      location: 'Hlavná prevádzka - Pokladňa 2',
      status: 'online',
      lastSeen: '1 minúta',
      installDate: '2024-01-15',
      dailyTransactions: 134,
      monthlyRevenue: 7220,
      uptime: 99.5
    },
    {
      id: 'DEV-003',
      name: 'Platobný terminál 3',
      type: 'POS Terminal',
      model: 'Ingenico Move/5000',
      serialNumber: 'ING5001234569',
      location: 'Pobočka Centrum - Recepcia',
      status: 'offline',
      lastSeen: '2 hodiny',
      installDate: '2024-02-01',
      dailyTransactions: 0,
      monthlyRevenue: 5680,
      uptime: 89.2
    },
    {
      id: 'DEV-004',
      name: 'Platobný terminál 4',
      type: 'POS Terminal',
      model: 'PAX A920Pro',
      serialNumber: 'PAX9201234570',
      location: 'Pobočka Východ - Hlavná pokladňa',
      status: 'maintenance',
      lastSeen: '1 deň',
      installDate: '2024-02-10',
      dailyTransactions: 0,
      monthlyRevenue: 4350,
      uptime: 95.1
    },
    {
      id: 'DEV-005',
      name: 'Platobný terminál 5',
      type: 'POS Terminal',
      model: 'VeriFone V400m',
      serialNumber: 'VF4001234571',
      location: 'Pobočka Západ - Pokladňa 1',
      status: 'error',
      lastSeen: '3 hodiny',
      installDate: '2024-03-01',
      dailyTransactions: 0,
      monthlyRevenue: 3200,
      uptime: 78.3
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'offline':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'maintenance':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
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
      case 'error':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Chyba</Badge>;
      default:
        return <Badge variant="secondary">Neznámy</Badge>;
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    maintenance: devices.filter(d => d.status === 'maintenance').length,
    error: devices.filter(d => d.status === 'error').length,
  };

  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Hľadať zariadenia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Status ({statusCounts[statusFilter as keyof typeof statusCounts]})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                Všetky ({statusCounts.all})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('online')}>
                Online ({statusCounts.online})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('offline')}>
                Offline ({statusCounts.offline})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('maintenance')}>
                Údržba ({statusCounts.maintenance})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('error')}>
                Chyba ({statusCounts.error})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Device Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <Card key={device.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Smartphone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{device.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{device.model}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Zobraziť detaily</DropdownMenuItem>
                    <DropdownMenuItem>Reštartovať</DropdownMenuItem>
                    <DropdownMenuItem>Nastavenia</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Deaktivovať</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(device.status)}
                  <span className="text-sm text-gray-600 dark:text-gray-400">Posledný kontakt:</span>
                </div>
                {getStatusBadge(device.status)}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {device.lastSeen}
              </p>

              {/* Location */}
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {device.location}
                </span>
              </div>

              {/* Install Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Inštalované: {new Date(device.installDate).toLocaleDateString('sk-SK')}
                </span>
              </div>

              {/* Performance Metrics */}
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Denné transakcie:</span>
                  <span className="font-semibold">{device.dailyTransactions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Mesačné tržby:</span>
                  <span className="font-semibold">€{device.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Uptime:</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="font-semibold text-green-600">{device.uptime}%</span>
                  </div>
                </div>
              </div>

              {/* Serial Number */}
              <div className="text-xs text-gray-500 dark:text-gray-400 border-t pt-2">
                S/N: {device.serialNumber}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Žiadne zariadenia nezodpovedajú filtrom.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
