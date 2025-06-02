
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, FileText, Download, Calendar, Clock, Euro, FileCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { demoContracts, getClientName, ContractData } from '@/data/demoData';
import { getFilteredData } from '@/utils/roleUtils';
import { SectionHeader } from '@/components/ui/section-header';

export const ContractsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Načítanie...
        </p>
      </div>
    );
  }

  const filteredContracts: ContractData[] = getFilteredData(demoContracts, user).filter(contract => {
    const clientName = getClientName(contract.clientId);
    const contractTitle = `${contract.contractNumber} - ${contract.type}`;
    const matchesSearch = contractTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesType = typeFilter === 'all' || contract.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  }) as ContractData[];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const activeContracts = filteredContracts.filter(c => c.status === 'active').length;
  const totalValue = filteredContracts.reduce((sum, contract) => sum + contract.value, 0);
  const expiringCount = filteredContracts.filter(c => {
    const expiryDate = new Date(c.endDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  }).length;

  const stats = [
    {
      label: 'Aktívne zmluvy',
      value: activeContracts,
      icon: FileCheck,
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
    },
    {
      label: 'Celková hodnota',
      value: `€${totalValue.toLocaleString()}`,
      icon: Euro,
      color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Expirujú čoskoro',
      value: expiringCount,
      icon: Clock,
      color: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
    }
  ];

  const actions = (
    <>
      <Button variant="outline" className="flex items-center space-x-2">
        <Download className="h-4 w-4" />
        <span>Export</span>
      </Button>
      <Button variant="outline" className="flex items-center space-x-2">
        <Calendar className="h-4 w-4" />
        <span>Kalendár</span>
      </Button>
      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
        <Plus className="h-4 w-4 mr-2" />
        Nová zmluva
      </Button>
    </>
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={FileText}
        title="Zmluvy"
        description="Spravujte všetky zmluvy, sledujte ich stav a expirácie"
        stats={stats}
        actions={actions}
      />

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Vyhľadať zmluvy..."
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
                <SelectItem value="active">Aktívne</SelectItem>
                <SelectItem value="pending">Čakajúce</SelectItem>
                <SelectItem value="expired">Expirované</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Typ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky typy</SelectItem>
                <SelectItem value="maintenance">Údržba</SelectItem>
                <SelectItem value="service">Servis</SelectItem>
                <SelectItem value="rental">Prenájom</SelectItem>
                <SelectItem value="purchase">Kúpa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Názov zmluvy</TableHead>
                <TableHead>Klient</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Hodnota</TableHead>
                <TableHead>Začiatok</TableHead>
                <TableHead>Koniec</TableHead>
                <TableHead>Stav</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">{contract.contractNumber} - {contract.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getClientName(contract.clientId)}</TableCell>
                  <TableCell className="capitalize">{contract.type}</TableCell>
                  <TableCell>€{contract.value.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(contract.startDate).toLocaleDateString('sk-SK')}
                  </TableCell>
                  <TableCell>
                    {new Date(contract.endDate).toLocaleDateString('sk-SK')}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(contract.status)}>
                      {contract.status === 'active' && 'Aktívna'}
                      {contract.status === 'pending' && 'Čakajúca'}
                      {contract.status === 'expired' && 'Expirovaná'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Zobraziť
                      </Button>
                      <Button size="sm" variant="outline">
                        Upraviť
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
