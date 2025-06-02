import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Edit, Eye, MapPin, Users, Smartphone, DollarSign, Plus, UserPlus, Calendar, Filter, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Client } from '@/types/dashboard';
import { useNavigate } from 'react-router-dom';
import { OnboardingClientCard } from './OnboardingClientCard';

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
    industry: 'hospitality',
    address: 'Hviezdoslavovo nám. 5, Bratislava',
    website: 'www.grandeur.sk',
    contactPerson: 'Mária Hotelová',
    assignedTeamMemberId: 'team-3'
  },
  {
    id: 'client-4',
    name: 'Fitness Centrum Power',
    email: 'info@fitnesspower.sk',
    phone: '+421 911 555 777',
    businessPartnerId: 'bp-1',
    locationsCount: 3,
    devicesCount: 6,
    totalRevenue: 32000,
    monthlyRevenue: 2800,
    status: 'active',
    createdAt: '2024-04-05',
    lastActivity: '2024-11-28T10:15:00Z',
    industry: 'fitness',
    address: 'Športová 28, Žilina',
    website: 'www.fitnesspower.sk',
    contactPerson: 'Martin Silný',
    assignedTeamMemberId: 'team-1'
  },
  {
    id: 'client-5',
    name: 'Kaderníctvo Bella',
    email: 'bella@salon.sk',
    phone: '+421 908 333 444',
    businessPartnerId: 'bp-2',
    locationsCount: 1,
    devicesCount: 2,
    totalRevenue: 18000,
    monthlyRevenue: 1500,
    status: 'active',
    createdAt: '2024-05-12',
    lastActivity: '2024-11-28T15:20:00Z',
    industry: 'beauty',
    address: 'Krásna 12, Trenčín',
    website: 'www.bellasalon.sk',
    contactPerson: 'Isabella Krásna',
    assignedTeamMemberId: 'team-3'
  }
];

export const ClientsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState('list'); // Default to table view

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.industry && client.industry.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIndustryLabel = (industry: string) => {
    switch (industry) {
      case 'restaurant': return 'Reštaurácia';
      case 'retail': return 'Maloobchod';
      case 'hospitality': return 'Hotelierstvo';
      case 'fitness': return 'Fitness';
      case 'beauty': return 'Kaderníctvo';
      default: return 'Iné';
    }
  };

  const handleClientClick = (clientId: string) => {
    navigate(`/dashboard/merchants/${clientId}`);
  };

  const handleAddNewMerchant = () => {
    setActiveTab('add');
  };

  // Only admins can see this page
  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          Nemáte oprávnenie na zobrazenie tejto stránky.
        </p>
      </div>
    );
  }

  const activeMerchants = filteredClients.filter(c => c.status === 'active').length;
  const totalValue = filteredClients.reduce((sum, c) => sum + c.totalRevenue, 0);
  const newThisMonth = filteredClients.filter(c => {
    const createdDate = new Date(c.createdAt);
    const now = new Date();
    return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl p-8 border border-blue-100 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Merchanti
                </h1>
                <p className="text-gray-600 text-lg">
                  Vítajte späť, {user?.fullName}! Správa všetkých merchantov v systéme.
                </p>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Celkom merchantov</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredClients.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Aktívni</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeMerchants}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Celkové tržby</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">€{totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Noví tento mesiac</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{newThisMonth}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleAddNewMerchant}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Pridať nového merchanta
            </Button>
            <Button variant="outline" className="border-gray-200">
              <Calendar className="h-4 w-4 mr-2" />
              Kalender
            </Button>
            <Button variant="outline" className="border-gray-200">
              <Filter className="h-4 w-4 mr-2" />
              Reporty
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for List and Add New */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="list">Zoznam merchantov</TabsTrigger>
          <TabsTrigger value="add" className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Pridať nového</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          {/* Search and Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Hľadať merchantov..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredClients.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {searchTerm ? 'Žiadni merchanti nevyhovujú hľadaniu.' : 'Žiadni merchanti neboli nájdení.'}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Merchant</TableHead>
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
                            {getIndustryLabel(client.industry || '')}
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
                                  <DialogTitle>Detail merchanta</DialogTitle>
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <div className="max-w-2xl">
            <OnboardingClientCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
