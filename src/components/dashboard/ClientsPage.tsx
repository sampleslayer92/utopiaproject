
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Edit, Eye, Building2, Smartphone, DollarSign, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Client } from '@/types/dashboard';

const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'TechCorp s.r.o.',
    email: 'client1@utopia.sk',
    businessPartnerId: 'bp-1',
    locationsCount: 3,
    devicesCount: 45,
    totalRevenue: 25000,
    monthlyRevenue: 2100,
    status: 'active',
    createdAt: '2024-11-15',
    lastActivity: '2024-11-28T10:30:00Z',
    contracts: []
  },
  {
    id: 'client-2',
    name: 'RetailMax a.s.',
    email: 'client2@utopia.sk',
    businessPartnerId: 'bp-1',
    locationsCount: 8,
    devicesCount: 128,
    totalRevenue: 58000,
    monthlyRevenue: 4800,
    status: 'active',
    createdAt: '2024-10-20',
    lastActivity: '2024-11-28T09:15:00Z',
    contracts: []
  },
  {
    id: 'client-3',
    name: 'CafeChain Ltd.',
    email: 'info@cafechain.com',
    businessPartnerId: 'bp-2',
    locationsCount: 12,
    devicesCount: 84,
    totalRevenue: 42000,
    monthlyRevenue: 3200,
    status: 'active',
    createdAt: '2024-09-05',
    lastActivity: '2024-11-27T16:45:00Z',
    contracts: []
  },
  {
    id: 'client-4',
    name: 'ShopEasy s.r.o.',
    email: 'contact@shopeasy.sk',
    businessPartnerId: 'bp-1',
    locationsCount: 5,
    devicesCount: 67,
    totalRevenue: 31000,
    monthlyRevenue: 2450,
    status: 'inactive',
    createdAt: '2024-08-12',
    lastActivity: '2024-11-20T14:20:00Z',
    contracts: []
  }
];

export const ClientsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Filter clients based on user role
  const getFilteredClients = () => {
    let clients = mockClients;
    
    if (user?.role === 'business_partner') {
      clients = clients.filter(client => client.businessPartnerId === user.businessPartnerId);
    }
    
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredClients = getFilteredClients();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // Check if user has access to this page
  if (!user || !['admin', 'business_partner'].includes(user.role)) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Nemáte oprávnenie na zobrazenie tejto stránky.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Klienti
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user.role === 'admin' ? 'Správa všetkých klientov' : 'Správa vašich klientov'}
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Pridať klienta
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom klientov</p>
                <p className="text-2xl font-bold">{filteredClients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Prevádzky</p>
                <p className="text-2xl font-bold">{filteredClients.reduce((sum, c) => sum + c.locationsCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Smartphone className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Zariadenia</p>
                <p className="text-2xl font-bold">{filteredClients.reduce((sum, c) => sum + c.devicesCount, 0)}</p>
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
                <p className="text-2xl font-bold">€{filteredClients.reduce((sum, c) => sum + c.monthlyRevenue, 0).toLocaleString()}</p>
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
                placeholder="Hľadať klientov..."
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
                <TableHead>Klient</TableHead>
                <TableHead>Prevádzky</TableHead>
                <TableHead>Zariadenia</TableHead>
                <TableHead>Mesačné tržby</TableHead>
                <TableHead>Posledná aktivita</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{client.locationsCount}</TableCell>
                  <TableCell>{client.devicesCount}</TableCell>
                  <TableCell>€{client.monthlyRevenue.toLocaleString()}</TableCell>
                  <TableCell>
                    {client.lastActivity 
                      ? new Date(client.lastActivity).toLocaleDateString('sk-SK')
                      : 'Nikdy'
                    }
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status === 'active' ? 'Aktívny' : 
                       client.status === 'inactive' ? 'Neaktívny' : 'Pozastavený'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedClient(client)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detail klienta</DialogTitle>
                          </DialogHeader>
                          {selectedClient && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Názov</p>
                                  <p>{selectedClient.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Email</p>
                                  <p>{selectedClient.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Počet prevádzok</p>
                                  <p>{selectedClient.locationsCount}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Počet zariadení</p>
                                  <p>{selectedClient.devicesCount}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Celkové tržby</p>
                                  <p>€{selectedClient.totalRevenue.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Vytvorený</p>
                                  <p>{new Date(selectedClient.createdAt).toLocaleDateString('sk-SK')}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
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
