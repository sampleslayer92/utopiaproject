import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Edit, Eye, MapPin, Users, Smartphone, DollarSign, Trash2, AlertTriangle, Filter, ArrowUpDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Client } from '@/types/dashboard';
import { AddClientDialog } from './AddClientDialog';
import { EditClientDialog } from './EditClientDialog';
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Reštaurácia U Jána',
    email: 'jan@restaurant.sk',
    phone: '+421 900 123 456',
    businessPartnerId: 'bp-1',
    locationsCount: 2,
    devicesCount: 5,
    totalRevenue: 12000,
    monthlyRevenue: 2400,
    expectedRevenue: 3000,
    commissionRate: 2.5,
    calculatedCommission: 60,
    contractViolation: true,
    status: 'active',
    createdAt: '2024-01-15',
    industry: 'restaurant',
    address: 'Hlavná 15, Bratislava',
    website: 'www.restaurant-jana.sk',
    contactPerson: 'Ján Novák',
    assignedTeamMemberId: 'team-1',
    services: [
      { id: 'service-1', name: 'POS Systém', monthlyFee: 89, status: 'active', commission: 22.25 },
      { id: 'service-2', name: 'Online platby', monthlyFee: 45, status: 'active', commission: 11.25 },
      { id: 'service-3', name: 'Inventúra', monthlyFee: 29, status: 'active', commission: 7.25 }
    ]
  },
  {
    id: 'client-2',
    name: 'Kaderníctvo Lucia',
    email: 'lucia@salon.sk',
    phone: '+421 900 654 321',
    businessPartnerId: 'bp-1',
    locationsCount: 1,
    devicesCount: 3,
    totalRevenue: 8400,
    monthlyRevenue: 1680,
    expectedRevenue: 1500,
    commissionRate: 3.0,
    calculatedCommission: 50.4,
    contractViolation: false,
    status: 'active',
    createdAt: '2024-02-20',
    industry: 'beauty',
    address: 'Obchodná 28, Bratislava',
    website: 'www.salon-lucia.sk',
    contactPerson: 'Lucia Nováková',
    assignedTeamMemberId: 'team-2',
    services: [
      { id: 'service-4', name: 'Rezervačný systém', monthlyFee: 39, status: 'active', commission: 11.7 },
      { id: 'service-5', name: 'Online platby', monthlyFee: 25, status: 'active', commission: 7.5 }
    ]
  },
  {
    id: 'client-3',
    name: 'Fitness Club Active',
    email: 'info@activeclub.sk',
    phone: '+421 900 789 123',
    businessPartnerId: 'bp-2',
    locationsCount: 1,
    devicesCount: 4,
    totalRevenue: 15600,
    monthlyRevenue: 3120,
    expectedRevenue: 2800,
    commissionRate: 2.8,
    calculatedCommission: 87.36,
    contractViolation: false,
    status: 'active',
    createdAt: '2024-03-10',
    industry: 'fitness',
    address: 'Športová 12, Košice',
    website: 'www.activeclub.sk',
    contactPerson: 'Peter Športovec',
    assignedTeamMemberId: 'team-3',
    services: [
      { id: 'service-6', name: 'Členský systém', monthlyFee: 79, status: 'active', commission: 22.12 },
      { id: 'service-7', name: 'Vstupný systém', monthlyFee: 59, status: 'active', commission: 16.52 },
      { id: 'service-8', name: 'Online platby', monthlyFee: 35, status: 'active', commission: 9.8 }
    ]
  },
  {
    id: 'client-4',
    name: 'Obchod so športom',
    email: 'shop@sport.sk',
    phone: '+421 900 555 777',
    businessPartnerId: 'bp-1',
    locationsCount: 1,
    devicesCount: 2,
    totalRevenue: 6000,
    monthlyRevenue: 1200,
    expectedRevenue: 1800,
    commissionRate: 3.5,
    calculatedCommission: 42,
    contractViolation: true,
    status: 'active',
    createdAt: '2024-04-05',
    industry: 'retail',
    address: 'Nákupná 5, Prešov',
    contactPerson: 'Michal Predajca',
    assignedTeamMemberId: 'team-1',
    services: [
      { id: 'service-9', name: 'POS Systém', monthlyFee: 69, status: 'active', commission: 24.15 },
      { id: 'service-10', name: 'Sklad', monthlyFee: 49, status: 'inactive', commission: 17.15 }
    ]
  }
];

export const ClientsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [violationFilter, setViolationFilter] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sortField, setSortField] = useState<keyof Client | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedClients = clients
    .filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) || '';
      
      const matchesIndustry = industryFilter === 'all' || client.industry === industryFilter;
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesViolation = !violationFilter || client.contractViolation;
      
      return matchesSearch && matchesIndustry && matchesStatus && matchesViolation;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });

  const getIndustryLabel = (industry: string) => {
    const labels = {
      restaurant: 'Reštaurácia',
      retail: 'Maloobchod',
      beauty: 'Kaderníctvo',
      fitness: 'Fitness',
      hospitality: 'Hotel'
    };
    return labels[industry as keyof typeof labels] || industry;
  };

  const handleAddClient = () => {
    // Refresh the clients list or trigger a re-fetch
    // Since we're using mock data, we don't need to do anything here
    // In a real app, this would trigger a refetch of the clients
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setShowEditDialog(true);
  };

  const handleSaveClient = (updatedClient: Client) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
    toast({
      title: "Úspech",
      description: "Klient bol úspešne upravený.",
    });
  };

  const handleDeleteClient = (client: Client) => {
    setDeletingClient(client);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deletingClient) {
      setClients(prev => prev.filter(c => c.id !== deletingClient.id));
      toast({
        title: "Úspech",
        description: "Klient bol úspešne vymazaný.",
      });
      setDeletingClient(null);
      setShowDeleteDialog(false);
    }
  };

  const violationCount = clients.filter(c => c.contractViolation).length;
  const totalCommission = clients.reduce((sum, c) => sum + c.calculatedCommission, 0);

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          Nemáte oprávnenie na zobrazenie tejto stránky.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Merchanti
          </h1>
          <p className="text-gray-600">
            Správa klientov a ich obchodných aktivít
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant={violationFilter ? "default" : "outline"}
            onClick={() => setViolationFilter(!violationFilter)}
            className="flex items-center space-x-2"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Porušenia ({violationCount})</span>
          </Button>
          <AddClientDialog onClientAdded={handleAddClient} />
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
                <p className="text-sm font-medium text-gray-600">Moja mesačná provízia</p>
                <p className="text-2xl font-bold">€{totalCommission.toFixed(2)}</p>
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Hľadať klientov..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Odvetvie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky odvetvia</SelectItem>
                <SelectItem value="restaurant">Reštaurácia</SelectItem>
                <SelectItem value="retail">Maloobchod</SelectItem>
                <SelectItem value="beauty">Kaderníctvo</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky statusy</SelectItem>
                <SelectItem value="active">Aktívny</SelectItem>
                <SelectItem value="inactive">Neaktívny</SelectItem>
                <SelectItem value="suspended">Pozastavený</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Klient</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('industry')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Odvetvie</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Lokácie</TableHead>
                  <TableHead>Zariadenia</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('monthlyRevenue')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Mesačný obrat</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('calculatedCommission')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Moja provízia</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Akcie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {client.contractViolation && (
                          <Tooltip>
                            <TooltipTrigger>
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Obrat klienta je pod úrovňou deklarovanej zmluvy.</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getIndustryLabel(client.industry || '')}
                      </Badge>
                    </TableCell>
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
                        <div className="font-medium text-green-600">€{client.calculatedCommission.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">{client.commissionRate}%</div>
                      </div>
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClient(client)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteClient(client)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <EditClientDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        client={editingClient}
        onSave={handleSaveClient}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Vymazať klienta"
        description="Ste si istí, že chcete vymazať tohto klienta? Táto akcia sa nedá vrátiť späť."
        itemName={deletingClient?.name}
      />
    </div>
  );
};
