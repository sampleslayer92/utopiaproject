import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Edit, Eye, MapPin, Users, Smartphone, DollarSign, Trash2, AlertTriangle, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Client } from '@/types/dashboard';
import { AddClientDialog } from './AddClientDialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Kaviareň Mlynská',
    email: 'info@kaviarenmlynska.sk',
    phone: '+421 905 123 456',
    businessPartnerId: 'bp-1',
    locationsCount: 2,
    devicesCount: 8,
    totalRevenue: 45000,
    monthlyRevenue: 3200,
    status: 'active',
    createdAt: '2024-01-15',
    industry: 'Gastronomie',
    address: 'Mlynská 15, Bratislava',
    website: 'kaviarenmlynska.sk',
    contactPerson: 'Ján Novák',
    assignedTeamMemberId: 'peter',
    expectedRevenue: 4000, // Deklarovaný očakávaný obrat
    commissionRate: 0.5, // 0.5% provízia
    calculatedCommission: 16.0, // 3200 * 0.005
    contractViolation: true // 3200 < 4000
  },
  {
    id: 'client-2',
    name: 'Reštaurácia U Kocha',
    email: 'kontakt@ukocha.sk',
    phone: '+421 911 789 012',
    businessPartnerId: 'bp-1',
    locationsCount: 1,
    devicesCount: 5,
    totalRevenue: 67000,
    monthlyRevenue: 5800,
    status: 'active',
    createdAt: '2024-02-20',
    industry: 'Gastronomie',
    address: 'Hlavná 28, Košice',
    contactPerson: 'Mária Svoboda',
    assignedTeamMemberId: 'ladislav',
    expectedRevenue: 5000,
    commissionRate: 0.5,
    calculatedCommission: 29.0,
    contractViolation: false
  },
  {
    id: 'client-3',
    name: 'Obchod Tech Store',
    email: 'admin@techstore.sk',
    phone: '+421 907 345 678',
    businessPartnerId: 'bp-2',
    locationsCount: 3,
    devicesCount: 12,
    totalRevenue: 89000,
    monthlyRevenue: 7200,
    status: 'active',
    createdAt: '2024-03-10',
    industry: 'Retail',
    address: 'Obchodná 42, Prešov',
    contactPerson: 'Peter Kováč',
    assignedTeamMemberId: 'richie',
    expectedRevenue: 8000,
    commissionRate: 0.5,
    calculatedCommission: 36.0,
    contractViolation: true
  }
];

export const ClientsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showViolationsOnly, setShowViolationsOnly] = useState(false);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesViolationFilter = !showViolationsOnly || client.contractViolation;
    
    return matchesSearch && matchesViolationFilter;
  });

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

  const handleClientAdded = () => {
    console.log('Client added successfully');
  };

  const violationCount = clients.filter(c => c.contractViolation).length;

  // Show different content based on user role
  if (user?.role === 'business_partner') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Moji klienti
            </h1>
            <p className="text-gray-600">
              Prehľad vašich klientov a ich výkonnosti
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant={showViolationsOnly ? "default" : "outline"}
              onClick={() => setShowViolationsOnly(!showViolationsOnly)}
              className="flex items-center space-x-2"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Porušenia ({violationCount})</span>
            </Button>
            <AddClientDialog onClientAdded={handleClientAdded} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Celkom klientov</p>
                  <p className="text-2xl font-bold">{clients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Smartphone className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Celkom zariadení</p>
                  <p className="text-2xl font-bold">{clients.reduce((sum, c) => sum + c.devicesCount, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Mesačné provízie</p>
                  <p className="text-2xl font-bold">€{clients.reduce((sum, c) => sum + c.calculatedCommission, 0).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Porušenia zmluvy</p>
                  <p className="text-2xl font-bold text-red-600">{violationCount}</p>
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
                  <TableHead>Prevádzky</TableHead>
                  <TableHead>Zariadenia</TableHead>
                  <TableHead>Mesačný obrat</TableHead>
                  <TableHead>Moja provízia</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Akcie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {client.contractViolation && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Obrat klienta je pod úrovňou deklarovanej zmluvy.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{client.industry}</TableCell>
                    <TableCell>{client.locationsCount}</TableCell>
                    <TableCell>{client.devicesCount}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">€{client.monthlyRevenue.toLocaleString()}</div>
                        {client.contractViolation && (
                          <div className="text-xs text-red-500">
                            Očakávané: €{client.expectedRevenue.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">€{client.calculatedCommission.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">{client.commissionRate}%</div>
                      </div>
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
  }

  // For admin and other roles - show basic view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Klienti
          </h1>
          <p className="text-gray-600">
            Správa klientov a ich prevádzok
          </p>
        </div>
        <AddClientDialog onClientAdded={handleClientAdded} />
      </div>

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
                <TableHead>Prevádzky</TableHead>
                <TableHead>Zariadenia</TableHead>
                <TableHead>Obrat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.email}</div>
                  </TableCell>
                  <TableCell>{client.industry}</TableCell>
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
