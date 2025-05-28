
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Edit, Eye, FileText, DollarSign, Calendar, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Contract } from '@/types/dashboard';

const mockContracts: Contract[] = [
  {
    id: 'contract-1',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    type: 'subscription',
    title: 'Platobné terminály - TechCorp',
    value: 25000,
    monthlyValue: 2100,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    renewalDate: '2024-11-15',
    autoRenewal: true,
    terms: 'Mesačná licencia pre platobné terminály s podporou 24/7',
    devices: ['dev-1', 'dev-2', 'dev-3']
  },
  {
    id: 'contract-2',
    clientId: 'client-2',
    businessPartnerId: 'bp-1',
    type: 'lease',
    title: 'Prenájom zariadení - RetailMax',
    value: 58000,
    monthlyValue: 4800,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    renewalDate: '2024-12-01',
    autoRenewal: false,
    terms: 'Prenájom POS terminálov s údržbou a podporou',
    devices: ['dev-4', 'dev-5', 'dev-6', 'dev-7']
  },
  {
    id: 'contract-3',
    clientId: 'client-3',
    businessPartnerId: 'bp-2',
    type: 'purchase',
    title: 'Nákup licencií - CafeChain',
    value: 42000,
    status: 'active',
    startDate: '2024-03-10',
    endDate: '2025-03-09',
    autoRenewal: true,
    terms: 'Jednorazový nákup licencií s ročnou podporou',
    devices: ['dev-8', 'dev-9']
  },
  {
    id: 'contract-4',
    clientId: 'client-1',
    businessPartnerId: 'bp-1',
    type: 'maintenance',
    title: 'Údržbová zmluva - TechCorp',
    value: 8400,
    monthlyValue: 700,
    status: 'pending',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    autoRenewal: false,
    terms: 'Rozšírená údržba a technická podpora pre všetky zariadenia'
  },
  {
    id: 'contract-5',
    clientId: 'client-4',
    businessPartnerId: 'bp-1',
    type: 'subscription',
    title: 'Licencie - ShopEasy',
    value: 15000,
    monthlyValue: 1250,
    status: 'expired',
    startDate: '2024-01-01',
    endDate: '2024-11-30',
    autoRenewal: false,
    terms: 'Mesačné licencie pre základné funkcie POS systému'
  }
];

export const ContractsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  // Filter contracts based on user role
  const getFilteredContracts = () => {
    let contracts = mockContracts;
    
    if (user?.role === 'business_partner') {
      contracts = contracts.filter(contract => contract.businessPartnerId === user.businessPartnerId);
    } else if (user?.role === 'client') {
      contracts = contracts.filter(contract => contract.clientId === user.clientId);
    } else if (user?.role === 'location') {
      // Location users can't see contracts
      return [];
    }
    
    return contracts.filter(contract =>
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredContracts = getFilteredContracts();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktívna';
      case 'pending':
        return 'Čakajúca';
      case 'expired':
        return 'Vypršala';
      case 'cancelled':
        return 'Zrušená';
      default:
        return 'Neznámy';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'subscription':
        return 'Predplatné';
      case 'lease':
        return 'Prenájom';
      case 'purchase':
        return 'Nákup';
      case 'maintenance':
        return 'Údržba';
      default:
        return 'Iný';
    }
  };

  const isExpiringSoon = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  // Check if user has access to this page
  if (!user || user.role === 'location') {
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
            Zmluvy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user.role === 'admin' ? 'Správa všetkých zmlúv' : 
             user.role === 'business_partner' ? 'Správa zmlúv vašich klientov' : 'Vaše zmluvy'}
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nová zmluva
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom zmlúv</p>
                <p className="text-2xl font-bold">{filteredContracts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktívne zmluvy</p>
                <p className="text-2xl font-bold">{filteredContracts.filter(c => c.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Čakajúce</p>
                <p className="text-2xl font-bold">{filteredContracts.filter(c => c.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Čoskoro vypršia</p>
                <p className="text-2xl font-bold">{filteredContracts.filter(c => isExpiringSoon(c.endDate)).length}</p>
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
                placeholder="Hľadať zmluvy..."
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
                <TableHead>Zmluva</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Hodnota</TableHead>
                <TableHead>Mesačne</TableHead>
                <TableHead>Platná do</TableHead>
                <TableHead>Auto-predĺženie</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{contract.title}</div>
                      <div className="text-sm text-gray-500">ID: {contract.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeText(contract.type)}</TableCell>
                  <TableCell>€{contract.value.toLocaleString()}</TableCell>
                  <TableCell>
                    {contract.monthlyValue ? `€${contract.monthlyValue.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell>
                    <div>
                      {new Date(contract.endDate).toLocaleDateString('sk-SK')}
                      {isExpiringSoon(contract.endDate) && (
                        <div className="flex items-center text-orange-600 text-xs mt-1">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Čoskoro vyprší
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={contract.autoRenewal ? 'default' : 'secondary'}>
                      {contract.autoRenewal ? 'Áno' : 'Nie'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(contract.status)}>
                      {getStatusText(contract.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedContract(contract)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Detail zmluvy</DialogTitle>
                          </DialogHeader>
                          {selectedContract && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Názov</p>
                                  <p>{selectedContract.title}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Typ</p>
                                  <p>{getTypeText(selectedContract.type)}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Celková hodnota</p>
                                  <p>€{selectedContract.value.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Mesačná hodnota</p>
                                  <p>{selectedContract.monthlyValue ? `€${selectedContract.monthlyValue.toLocaleString()}` : 'N/A'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Platná od</p>
                                  <p>{new Date(selectedContract.startDate).toLocaleDateString('sk-SK')}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Platná do</p>
                                  <p>{new Date(selectedContract.endDate).toLocaleDateString('sk-SK')}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Auto-predĺženie</p>
                                  <p>{selectedContract.autoRenewal ? 'Áno' : 'Nie'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Status</p>
                                  <Badge className={getStatusColor(selectedContract.status)}>
                                    {getStatusText(selectedContract.status)}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500 mb-2">Podmienky zmluvy</p>
                                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                  {selectedContract.terms}
                                </p>
                              </div>
                              {selectedContract.devices && selectedContract.devices.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium text-gray-500 mb-2">Pokryté zariadenia</p>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedContract.devices.map((deviceId) => (
                                      <Badge key={deviceId} variant="outline">
                                        {deviceId}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
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
