
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Edit, Eye, MapPin, Users, Smartphone, DollarSign, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Client } from '@/types/dashboard';
import { useNavigate } from 'react-router-dom';

const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Reštaurácia U Jána',
    email: 'jan@restaurant.sk',
    phone: '+421 900 123 456',
    businessPartnerId: 'bp-1',
    locationsCount: 2,
    devicesCount: 8,
    totalRevenue: 45000,
    monthlyRevenue: 3800,
    status: 'active',
    createdAt: '2024-01-15',
    lastActivity: '2024-11-28T14:30:00Z',
    contracts: [],
    industry: 'restaurant',
    address: 'Hlavná 15, Bratislava',
    website: 'www.restaurant-jana.sk',
    contactPerson: 'Ján Novák',
    assignedTeamMemberId: 'team-1'
  },
  {
    id: 'client-2',
    name: 'Tech Store Slovakia',
    email: 'info@techstore.sk',
    phone: '+421 905 654 321',
    businessPartnerId: 'bp-1',
    locationsCount: 5,
    devicesCount: 15,
    totalRevenue: 89000,
    monthlyRevenue: 7200,
    status: 'active',
    createdAt: '2024-02-20',
    lastActivity: '2024-11-28T16:45:00Z',
    contracts: [],
    industry: 'retail',
    address: 'Obchodná 32, Košice',
    website: 'www.techstore.sk',
    contactPerson: 'Peter Svoboda',
    assignedTeamMemberId: 'team-2'
  },
  {
    id: 'client-3',
    name: 'Hotel Grandeur',
    email: 'reception@grandeur.sk',
    phone: '+421 907 888 999',
    businessPartnerId: 'bp-2',
    locationsCount: 1,
    devicesCount: 12,
    totalRevenue: 156000,
    monthlyRevenue: 12800,
    status: 'active',
    createdAt: '2024-03-10',
    lastActivity: '2024-11-28T12:20:00Z',
    contracts: [],
    industry: 'hospitality',
    address: 'Hviezdoslavovo nám. 5, Bratislava',
    website: 'www.grandeur.sk',
    contactPerson: 'Mária Hotelová',
    assignedTeamMemberId: 'team-3'
  }
];

export const ClientsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.industry && client.industry.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  const handleClientClick = (clientId: string) => {
    navigate(`/dashboard/merchants/${clientId}`);
  };

  const handleAddClient = () => {
    // Set onboarding context for merchant
    localStorage.setItem('onboarding_context', JSON.stringify({ type: 'merchant' }));
    navigate('/onboarding/company');
  };

  // Only admins and business partners can see this page
  if (!user || (user.role !== 'admin' && user.role !== 'business_partner')) {
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
            Merchanti
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Správa vašich klientov a ich prevádzok
          </p>
        </div>
        {user.role === 'admin' && (
          <Button 
            onClick={handleAddClient}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Pridať merchanta
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom klientov</p>
                <p className="text-2xl font-bold">{mockClients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom lokácií</p>
                <p className="text-2xl font-bold">{mockClients.reduce((sum, c) => sum + c.locationsCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Smartphone className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktívne zariadenia</p>
                <p className="text-2xl font-bold">{mockClients.reduce((sum, c) => sum + c.devicesCount, 0)}</p>
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
                <p className="text-2xl font-bold">€{mockClients.reduce((sum, c) => sum + c.monthlyRevenue, 0).toLocaleString()}</p>
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
                <TableHead>Odvetvie</TableHead>
                <TableHead>Lokácie</TableHead>
                <TableHead>Zariadenia</TableHead>
                <TableHead>Mesačné tržby</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow 
                  key={client.id}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleClientClick(client.id)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {client.industry === 'restaurant' ? 'Reštaurácia' :
                       client.industry === 'retail' ? 'Maloobchod' :
                       client.industry === 'hospitality' ? 'Hotelierstvo' : 'Iné'}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.locationsCount}</TableCell>
                  <TableCell>{client.devicesCount}</TableCell>
                  <TableCell>€{client.monthlyRevenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status === 'active' ? 'Aktívny' : 
                       client.status === 'inactive' ? 'Neaktívny' : 'Pozastavený'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
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
                                  <p className="text-sm font-medium text-gray-500">Telefón</p>
                                  <p>{selectedClient.phone}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Adresa</p>
                                  <p>{selectedClient.address}</p>
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
