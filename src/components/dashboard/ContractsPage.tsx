import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Search, Filter, Calendar, FileText, User, MapPin, DollarSign, Clock, Eye, Edit, Trash2, Grid3X3, List } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ContractForm } from './ContractForm';
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';

// Updated contract interface with creator info
interface ContractWithCreator {
  id: string;
  title: string;
  contractNumber: string;
  clientName: string;
  type: 'hardware' | 'software' | 'service' | 'maintenance';
  status: 'active' | 'pending' | 'expired' | 'terminated';
  value: number;
  startDate: string;
  endDate: string;
  description: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  services?: string[];
  products?: string[];
}

const mockContracts: ContractWithCreator[] = [
  {
    id: 'contract-1',
    title: 'POS Systém - Reštaurácia U Jána',
    contractNumber: 'CT-2024-001',
    clientName: 'Reštaurácia U Jána',
    type: 'hardware',
    status: 'active',
    value: 12800,
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    description: 'Kompletný POS systém s platobným terminálom a online správou.',
    createdBy: {
      id: 'team-1',
      name: 'Peter Manažér',
      email: 'peter@utopia.sk'
    },
    createdAt: '2024-01-10',
    services: ['POS Systém', 'Online platby'],
    products: ['POS terminál', 'Platobný terminál']
  },
  {
    id: 'contract-2',
    title: 'Software licencia - Tech Store',
    contractNumber: 'CT-2024-002',
    clientName: 'Tech Store Slovakia',
    type: 'software',
    status: 'active',
    value: 8640,
    startDate: '2024-02-20',
    endDate: '2025-02-20',
    description: 'Ročná licencia pre inventúrny a predajný systém.',
    createdBy: {
      id: 'team-2',
      name: 'Mária Obchodná',
      email: 'maria@utopia.sk'
    },
    createdAt: '2024-02-15'
  },
  {
    id: 'contract-3',
    title: 'Údržba zariadení - Hotel Grandeur',
    contractNumber: 'CT-2024-003',
    clientName: 'Hotel Grandeur',
    type: 'maintenance',
    status: 'active',
    value: 3600,
    startDate: '2024-03-10',
    endDate: '2025-03-10',
    description: 'Pravidelná údržba a podpora pre všetky POS zariadenia.',
    createdBy: {
      id: 'team-3',
      name: 'Tomáš Technik',
      email: 'tomas@utopia.sk'
    },
    createdAt: '2024-03-05'
  },
  {
    id: 'contract-4',
    title: 'Služby - Fitness Centrum Power',
    contractNumber: 'CT-2024-004',
    clientName: 'Fitness Centrum Power',
    type: 'service',
    status: 'pending',
    value: 4800,
    startDate: '2024-12-01',
    endDate: '2025-12-01',
    description: 'Kompletné služby pre správu členstva a platieb.',
    createdBy: {
      id: 'team-1',
      name: 'Peter Manažér',
      email: 'peter@utopia.sk'
    },
    createdAt: '2024-11-25'
  }
];

export const ContractsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contracts, setContracts] = useState<ContractWithCreator[]>(mockContracts);
  const [selectedContract, setSelectedContract] = useState<ContractWithCreator | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showContractForm, setShowContractForm] = useState(false);
  const [editingContract, setEditingContract] = useState<ContractWithCreator | null>(null);
  const [deletingContract, setDeletingContract] = useState<ContractWithCreator | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesType = typeFilter === 'all' || contract.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'terminated': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hardware': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'software': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'service': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'maintenance': return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Aktívna';
      case 'pending': return 'Čakajúca';
      case 'expired': return 'Expirovaná';
      case 'terminated': return 'Ukončená';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'hardware': return 'Hardware';
      case 'software': return 'Software';
      case 'service': return 'Služby';
      case 'maintenance': return 'Údržba';
      default: return type;
    }
  };

  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const totalValue = contracts.reduce((sum, c) => sum + c.value, 0);
  const expiringContracts = contracts.filter(c => {
    const endDate = new Date(c.endDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return endDate <= threeMonthsFromNow && c.status === 'active';
  }).length;

  const handleRowClick = (contract: ContractWithCreator) => {
    setSelectedContract(contract);
  };

  const handleNewContract = () => {
    setEditingContract(null);
    setShowContractForm(true);
  };

  const handleEditContract = (contract: ContractWithCreator) => {
    setEditingContract(contract);
    setShowContractForm(true);
  };

  const handleDeleteContract = (contract: ContractWithCreator) => {
    setDeletingContract(contract);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deletingContract) {
      setContracts(prev => prev.filter(c => c.id !== deletingContract.id));
      toast({
        title: "Úspech",
        description: "Zmluva bola úspešne vymazaná.",
      });
      setDeletingContract(null);
      setShowDeleteDialog(false);
    }
  };

  const handleSaveContract = (contractData: any) => {
    console.log('Saving contract:', contractData);
    setShowContractForm(false);
    setEditingContract(null);
  };

  const handleCancelContract = () => {
    setShowContractForm(false);
    setEditingContract(null);
  };

  // Only admins can see this page
  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Nemáte oprávnenie na zobrazenie tejto stránky.
        </p>
      </div>
    );
  }

  if (showContractForm) {
    return (
      <ContractForm
        contract={editingContract}
        isEdit={!!editingContract}
        onSave={handleSaveContract}
        onCancel={handleCancelContract}
      />
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-8 border border-blue-100 dark:border-gray-700 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Zmluvy
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Vítajte späť, {user?.fullName}! Správa zmlúv a kontraktov.
                </p>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Aktívne zmluvy</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeContracts}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Celková hodnota</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">€{totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Expirujú čoskoro</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{expiringContracts}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleNewContract}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nová zmluva
            </Button>
            <Button variant="outline" className="border-gray-200 dark:border-gray-700">
              <Calendar className="h-4 w-4 mr-2" />
              Kalender
            </Button>
            <Button variant="outline" className="border-gray-200 dark:border-gray-700">
              <Filter className="h-4 w-4 mr-2" />
              Reporty
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Vyhľadať zmluvy..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky statusy</SelectItem>
                <SelectItem value="active">Aktívne</SelectItem>
                <SelectItem value="pending">Čakajúce</SelectItem>
                <SelectItem value="expired">Expirované</SelectItem>
                <SelectItem value="terminated">Ukončené</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter typ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky typy</SelectItem>
                <SelectItem value="hardware">Hardware</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="service">Služby</SelectItem>
                <SelectItem value="maintenance">Údržba</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContracts.map((contract) => (
            <Card key={contract.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={() => handleRowClick(contract)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg line-clamp-2">{contract.title}</CardTitle>
                    <p className="text-sm text-gray-600">{contract.contractNumber}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Badge className={getTypeColor(contract.type)}>
                      {getTypeLabel(contract.type)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{contract.clientName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 font-medium">€{contract.value.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{new Date(contract.endDate).toLocaleDateString('sk')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <Badge className={getStatusColor(contract.status)}>
                    {getStatusLabel(contract.status)}
                  </Badge>
                  <div className="text-sm text-gray-500">
                    {contract.createdBy.name}
                  </div>
                </div>
                
                <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    Detail
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEditContract(contract)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteContract(contract)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Zoznam zmlúv</CardTitle>
            <CardDescription>
              Kliknite na riadok pre zobrazenie detailu zmluvy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Názov</TableHead>
                  <TableHead>Číslo zmluvy</TableHead>
                  <TableHead>Klient</TableHead>
                  <TableHead>Vytvoril</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Hodnota</TableHead>
                  <TableHead>Koniec</TableHead>
                  <TableHead>Akcie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow 
                    key={contract.id} 
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => handleRowClick(contract)}
                  >
                    <TableCell className="font-medium">{contract.title}</TableCell>
                    <TableCell>{contract.contractNumber}</TableCell>
                    <TableCell>{contract.clientName}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contract.createdBy.name}</div>
                        <div className="text-sm text-gray-500">{contract.createdBy.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(contract.type)}>
                        {getTypeLabel(contract.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contract.status)}>
                        {getStatusLabel(contract.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>€{contract.value.toLocaleString()}</TableCell>
                    <TableCell>{new Date(contract.endDate).toLocaleDateString('sk')}</TableCell>
                    <TableCell>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditContract(contract)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteContract(contract)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Contract Detail Dialog */}
      <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Detail zmluvy</span>
              {selectedContract && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditContract(selectedContract)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Upraviť
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedContract && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Základné informácie
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Názov</p>
                      <p className="font-medium">{selectedContract.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Číslo zmluvy</p>
                      <p className="font-medium">{selectedContract.contractNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Typ</p>
                      <Badge className={getTypeColor(selectedContract.type)}>
                        {getTypeLabel(selectedContract.type)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <Badge className={getStatusColor(selectedContract.status)}>
                        {getStatusLabel(selectedContract.status)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Klient a tvoriteľ
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Klient</p>
                      <p className="font-medium">{selectedContract.clientName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Vytvoril</p>
                      <p className="font-medium">{selectedContract.createdBy.name}</p>
                      <p className="text-sm text-gray-500">{selectedContract.createdBy.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Dátum vytvorenia</p>
                      <p className="font-medium">{new Date(selectedContract.createdAt).toLocaleDateString('sk')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Finančné informácie
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Hodnota zmluvy</p>
                      <p className="text-2xl font-bold text-green-600">€{selectedContract.value.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Časové údaje
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Začiatok</p>
                      <p className="font-medium">{new Date(selectedContract.startDate).toLocaleDateString('sk')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Koniec</p>
                      <p className="font-medium">{new Date(selectedContract.endDate).toLocaleDateString('sk')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Popis</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedContract.description}</p>
                </div>

                {/* Services and Products */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Služby</h3>
                    <div className="space-y-2">
                      {(selectedContract.services || ['POS Systém', 'Online platby']).map((service, index) => (
                        <Badge key={index} variant="outline" className="mr-2">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Produkty</h3>
                    <div className="space-y-2">
                      {(selectedContract.products || ['POS terminál', 'Platobný terminál']).map((product, index) => (
                        <Badge key={index} variant="outline" className="mr-2">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Vymazať zmluvu"
        description="Ste si istí, že chcete vymazať túto zmluvu? Táto akcia sa nedá vrátiť späť."
        itemName={deletingContract?.title}
      />
    </div>
  );
};
