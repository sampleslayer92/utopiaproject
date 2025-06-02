import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  ArrowUpDown,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AddClientDialog } from './AddClientDialog';
import { EditClientDialog } from './EditClientDialog';
import { Client } from '@/types/dashboard';

// Mock data with more realistic commission values
const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Reštaurácia U Jána',
    email: 'jan@restaurant.sk',
    phone: '+421 900 123 456',
    businessPartnerId: 'bp-1',
    locationsCount: 2,
    devicesCount: 5,
    totalRevenue: 2400,
    monthlyRevenue: 2400,
    expectedRevenue: 2500,
    commissionRate: 2.5,
    calculatedCommission: 60,
    contractViolation: false,
    status: 'active',
    createdAt: '2024-01-15',
    lastActivity: '2024-11-28',
    industry: 'restaurant',
    address: 'Hlavná 15, Bratislava',
    website: 'www.restaurant-jana.sk',
    contactPerson: 'Ján Novák',
    assignedTeamMemberId: 'team-1'
  },
  {
    id: 'client-2',
    name: 'Fresh Market s.r.o.',
    email: 'info@freshmarket.sk',
    phone: '+421 902 456 789',
    businessPartnerId: 'bp-1',
    locationsCount: 3,
    devicesCount: 8,
    totalRevenue: 3200,
    monthlyRevenue: 3200,
    expectedRevenue: 3500,
    commissionRate: 3.0,
    calculatedCommission: 96,
    contractViolation: false,
    status: 'active',
    createdAt: '2024-02-20',
    lastActivity: '2024-11-27',
    industry: 'retail',
    address: 'Obchodná 25, Košice',
    website: 'www.freshmarket.sk',
    contactPerson: 'Peter Svoboda',
    assignedTeamMemberId: 'team-2'
  },
  {
    id: 'client-3',
    name: 'Hotel Centrum',
    email: 'rezervacie@hotelcentrum.sk',
    phone: '+421 905 789 123',
    businessPartnerId: 'bp-2',
    locationsCount: 1,
    devicesCount: 3,
    totalRevenue: 1800,
    monthlyRevenue: 1800,
    expectedRevenue: 2000,
    commissionRate: 2.2,
    calculatedCommission: 39.6,
    contractViolation: false,
    status: 'active',
    createdAt: '2024-03-10',
    lastActivity: '2024-11-26',
    industry: 'hospitality',
    address: 'Centrum 1, Bratislava',
    website: 'www.hotelcentrum.sk',
    contactPerson: 'Anna Hotelová',
    assignedTeamMemberId: 'team-1'
  },
  {
    id: 'client-4',
    name: 'Fitness Centrum Power',
    email: 'info@fitnesspower.sk',
    phone: '+421 907 654 321',
    businessPartnerId: 'bp-1',
    locationsCount: 2,
    devicesCount: 4,
    totalRevenue: 1600,
    monthlyRevenue: 1600,
    expectedRevenue: 1800,
    commissionRate: 2.8,
    calculatedCommission: 44.8,
    contractViolation: false,
    status: 'active',
    createdAt: '2024-04-05',
    lastActivity: '2024-11-25',
    industry: 'fitness',
    address: 'Športová 10, Žilina',
    website: 'www.fitnesspower.sk',
    contactPerson: 'Marek Silný',
    assignedTeamMemberId: 'team-2'
  },
  {
    id: 'client-5',
    name: 'Kaderníctvo Style',
    email: 'style@beauty.sk',
    phone: '+421 908 111 222',
    businessPartnerId: 'bp-1',
    locationsCount: 1,
    devicesCount: 2,
    totalRevenue: 1200,
    monthlyRevenue: 1200,
    expectedRevenue: 1300,
    commissionRate: 3.5,
    calculatedCommission: 42,
    contractViolation: false,
    status: 'active',
    createdAt: '2024-05-15',
    lastActivity: '2024-11-24',
    industry: 'beauty',
    address: 'Krásna 5, Prešov',
    website: 'www.style-beauty.sk',
    contactPerson: 'Lucia Krásna',
    assignedTeamMemberId: 'team-1'
  }
];

export const ClientsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  let filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) || '';
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || client.industry === industryFilter;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  // Apply sorting
  if (sortField) {
    filteredClients.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'monthlyRevenue':
          aValue = a.monthlyRevenue;
          bValue = b.monthlyRevenue;
          break;
        case 'calculatedCommission':
          aValue = a.calculatedCommission;
          bValue = b.calculatedCommission;
          break;
        case 'devicesCount':
          aValue = a.devicesCount;
          bValue = b.devicesCount;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const handleClientAdded = (newClient: Client) => {
    setClients(prev => [...prev, newClient]);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setEditDialogOpen(true);
  };

  const handleSaveClient = (updatedClient: Client) => {
    setClients(prev => prev.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
  };

  const handleDeleteClient = (client: Client) => {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (clientToDelete) {
      setClients(prev => prev.filter(client => client.id !== clientToDelete.id));
      setClientToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
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

  const getClientStats = () => {
    const stats = {
      total: filteredClients.length,
      active: filteredClients.filter(c => c.status === 'active').length,
      totalRevenue: filteredClients.reduce((sum, c) => sum + c.monthlyRevenue, 0),
      totalCommission: filteredClients.reduce((sum, c) => sum + c.calculatedCommission, 0)
    };
    return stats;
  };

  const stats = getClientStats();

  if (user?.role !== 'admin') {
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Klienti</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Spravujte všetkých klientov v systéme
          </p>
        </div>
        <AddClientDialog onClientAdded={handleClientAdded} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom klientov</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktívni</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesačné tržby</p>
                <p className="text-2xl font-bold text-purple-600">€{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Moja provízia</p>
                <p className="text-2xl font-bold text-orange-600">€{stats.totalCommission.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Vyhľadať klientov..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Stav" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky stavy</SelectItem>
                <SelectItem value="active">Aktívni</SelectItem>
                <SelectItem value="inactive">Neaktívni</SelectItem>
                <SelectItem value="suspended">Pozastavení</SelectItem>
              </SelectContent>
            </Select>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Odvetvie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky odvetvia</SelectItem>
                <SelectItem value="restaurant">Reštaurácia</SelectItem>
                <SelectItem value="retail">Maloobchod</SelectItem>
                <SelectItem value="hospitality">Hotelierstvo</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="beauty">Kaderníctvo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Zoznam klientov</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Klient</span>
                    {getSortIcon('name')}
                  </div>
                </TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead>Odvetvie</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort('monthlyRevenue')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Mesačné tržby</span>
                    {getSortIcon('monthlyRevenue')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort('calculatedCommission')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Moja provízia</span>
                    {getSortIcon('calculatedCommission')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort('devicesCount')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Zariadenia</span>
                    {getSortIcon('devicesCount')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Stav</span>
                    {getSortIcon('status')}
                  </div>
                </TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow 
                  key={client.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => navigate(`/dashboard/merchants/${client.id}`)}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.contactPerson}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-sm">
                        <Mail className="h-3 w-3" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Phone className="h-3 w-3" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getIndustryLabel(client.industry || '')}
                    </Badge>
                  </TableCell>
                  <TableCell>€{client.monthlyRevenue.toLocaleString()}</TableCell>
                  <TableCell className="font-medium text-green-600">
                    €{client.calculatedCommission.toFixed(2)}
                  </TableCell>
                  <TableCell>{client.devicesCount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status === 'active' ? 'Aktívny' :
                       client.status === 'inactive' ? 'Neaktívny' : 'Pozastavený'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/merchants/${client.id}`);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClient(client);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClient(client);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Žiadni klienti
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Momentálne nemáte žiadnych klientov ktorí by zodpovedali zadaným kritériám.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Client Dialog */}
      <EditClientDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        client={editingClient}
        onSave={handleSaveClient}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Odstrániť klienta"
        description={`Naozaj chcete odstrániť klienta "${clientToDelete?.name}"? Táto akcia sa nedá vrátiť späť.`}
      />
    </div>
  );
};
