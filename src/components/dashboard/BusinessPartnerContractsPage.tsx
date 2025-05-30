
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Eye, Edit, Trash2, Copy, FileText, TrendingUp, DollarSign, Clock, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { demoContracts, type DemoContract } from '@/data/demoData';

const revenueData = [
  { month: 'Jan', revenue: 15000 },
  { month: 'Feb', revenue: 18000 },
  { month: 'Mar', revenue: 22000 },
  { month: 'Apr', revenue: 19000 },
  { month: 'Máj', revenue: 25000 },
  { month: 'Jún', revenue: 28000 }
];

export const BusinessPartnerContractsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedContract, setSelectedContract] = useState<DemoContract | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Filter contracts for business partner
  const businessPartnerContracts = demoContracts.filter(contract => 
    contract.businessPartnerId === user?.businessPartnerId
  );

  const filteredContracts = businessPartnerContracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.clientName.toLowerCase().includes(searchTerm.toLowerCase());
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

  const activeContracts = businessPartnerContracts.filter(c => c.status === 'active').length;
  const totalValue = businessPartnerContracts.reduce((sum, c) => sum + c.value, 0);
  const monthlyRevenue = businessPartnerContracts.reduce((sum, c) => sum + (c.monthlyFee || 0), 0);

  const handleRowClick = (contract: DemoContract) => {
    setSelectedContract(contract);
    setIsEditMode(false);
  };

  const handleEdit = (contract: DemoContract, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedContract(contract);
    setIsEditMode(true);
  };

  const handleDelete = (contractId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Naozaj chcete zmazať túto zmluvu?')) {
      console.log('Deleting contract:', contractId);
    }
  };

  const handleDuplicate = (contract: DemoContract, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Duplicating contract:', contract.id);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-8 border border-emerald-100 dark:border-gray-700 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Moje zmluvy
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Správa vašich zmlúv a ich výkonnosť
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
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mesačné tržby</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">€{monthlyRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Nová zmluva
            </Button>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Vývoj tržieb z zmlúv
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`€${value}`, 'Tržby']} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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
          </div>
        </CardContent>
      </Card>

      {/* Contracts Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Zoznam zmlúv</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Názov</TableHead>
                <TableHead>Číslo zmluvy</TableHead>
                <TableHead>Klient</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hodnota</TableHead>
                <TableHead>Mesačný poplatok</TableHead>
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
                    <Badge className={getTypeColor(contract.type)}>
                      {contract.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(contract.status)}>
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell>€{contract.value.toLocaleString()}</TableCell>
                  <TableCell>€{contract.monthlyFee?.toLocaleString() || 0}</TableCell>
                  <TableCell>{new Date(contract.endDate).toLocaleDateString('sk')}</TableCell>
                  <TableCell>
                    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline" onClick={(e) => handleEdit(contract, e)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => handleDuplicate(contract, e)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => handleDelete(contract.id, e)}>
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

      {/* Contract Detail/Edit Dialog */}
      <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Editovať zmluvu' : 'Detail zmluvy'}</DialogTitle>
          </DialogHeader>
          {selectedContract && (
            <div className="grid grid-cols-2 gap-6 p-4">
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
                        {selectedContract.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <Badge className={getStatusColor(selectedContract.status)}>
                        {selectedContract.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Popis</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedContract.description}</p>
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
                    <div>
                      <p className="text-sm font-medium text-gray-500">Mesačný poplatok</p>
                      <p className="text-xl font-bold text-blue-600">€{selectedContract.monthlyFee?.toLocaleString() || 0}</p>
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

                {isEditMode && (
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Uložiť zmeny</Button>
                    <Button variant="outline" onClick={() => setIsEditMode(false)}>
                      Zrušiť
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
