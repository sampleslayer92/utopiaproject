
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit3, 
  Eye, 
  Trash2, 
  Copy,
  FileText,
  TrendingUp,
  Calendar,
  Euro
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { demoContracts, demoClients, type DemoContract } from '@/data/demoData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock revenue data for chart
const revenueData = [
  { month: 'Jan', revenue: 4500, contracts: 3 },
  { month: 'Feb', revenue: 5200, contracts: 4 },
  { month: 'Mar', revenue: 4800, contracts: 3 },
  { month: 'Apr', revenue: 6100, contracts: 5 },
  { month: 'May', revenue: 5800, contracts: 4 },
  { month: 'Jun', revenue: 7200, contracts: 6 },
];

export const BusinessPartnerContractsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [contracts, setContracts] = useState<DemoContract[]>(demoContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedContract, setSelectedContract] = useState<DemoContract | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<DemoContract | null>(null);
  const [chartPeriod, setChartPeriod] = useState('6months');

  // Filter contracts
  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesType = typeFilter === 'all' || contract.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate stats
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const totalValue = contracts.reduce((sum, c) => sum + c.value, 0);
  const monthlyRevenue = contracts.filter(c => c.status === 'active').reduce((sum, c) => sum + c.monthlyFee, 0);

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

  const handleEdit = (contract: DemoContract) => {
    setEditingContract({ ...contract });
    setIsEditOpen(true);
  };

  const handleSaveContract = () => {
    if (!editingContract) return;
    
    setContracts(prev => prev.map(c => 
      c.id === editingContract.id ? editingContract : c
    ));
    
    toast({
      title: "Zmluva aktualizovaná",
      description: "Zmluva bola úspešne aktualizovaná.",
    });
    
    setIsEditOpen(false);
    setEditingContract(null);
  };

  const handleDelete = (contract: DemoContract) => {
    setSelectedContract(contract);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedContract) return;
    
    setContracts(prev => prev.filter(c => c.id !== selectedContract.id));
    
    toast({
      title: "Zmluva zmazaná",
      description: "Zmluva bola úspešne zmazaná.",
      variant: "destructive",
    });
    
    setIsDeleteOpen(false);
    setSelectedContract(null);
  };

  const handleDuplicate = (contract: DemoContract) => {
    const newContract: DemoContract = {
      ...contract,
      id: `C-${Date.now()}`,
      title: `${contract.title} (Kópia)`,
      contractNumber: `${contract.contractNumber}-COPY`,
      status: 'pending',
    };
    
    setContracts(prev => [newContract, ...prev]);
    
    toast({
      title: "Zmluva duplikovaná",
      description: "Nová kópia zmluvy bola vytvorená.",
    });
  };

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
                  Správa zmlúv obchodného partnera
                </p>
              </div>
            </div>
            
            {/* Stats */}
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
                    <Euro className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Celková hodnota</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">€{totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mesačný príjem</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">€{monthlyRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Nová zmluva
            </Button>
            <Button variant="outline" className="border-gray-200 dark:border-gray-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-t-xl">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Výnosy z zmlúv
            </CardTitle>
            <Select value={chartPeriod} onValueChange={setChartPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">Posledných 6 mesiacov</SelectItem>
                <SelectItem value="year">Celý rok</SelectItem>
                <SelectItem value="quarter">Štvrťrok</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `€${value}` : value,
                    name === 'revenue' ? 'Príjem' : 'Zmluvy'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
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

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                    {contract.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{contract.contractNumber}</p>
                </div>
                <div className="flex gap-1">
                  <Badge className={getStatusColor(contract.status)}>
                    {contract.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Klient:</span>
                  <span className="font-medium">{contract.clientName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Typ:</span>
                  <Badge className={getTypeColor(contract.type)}>
                    {contract.type}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Hodnota:</span>
                  <span className="font-semibold">€{contract.value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Mesačne:</span>
                  <span className="font-semibold text-green-600">€{contract.monthlyFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Do:</span>
                  <span>{new Date(contract.endDate).toLocaleDateString('sk')}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedContract(contract);
                    setIsDetailOpen(true);
                  }}
                  className="flex-1"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Detail
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(contract)}
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDuplicate(contract)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(contract)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contract Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Detail zmluvy
            </DialogTitle>
          </DialogHeader>
          
          {selectedContract && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Názov zmluvy</Label>
                    <p className="text-lg font-semibold mt-1">{selectedContract.title}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Číslo zmluvy</Label>
                    <p className="font-mono mt-1">{selectedContract.contractNumber}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Klient</Label>
                    <p className="mt-1">{selectedContract.clientName}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Status</Label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(selectedContract.status)}>
                        {selectedContract.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Typ zmluvy</Label>
                    <div className="mt-1">
                      <Badge className={getTypeColor(selectedContract.type)}>
                        {selectedContract.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Celková hodnota</Label>
                    <p className="text-2xl font-bold text-green-600 mt-1">€{selectedContract.value.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Mesačný poplatok</Label>
                    <p className="text-xl font-semibold text-blue-600 mt-1">€{selectedContract.monthlyFee.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Automatické obnovenie</Label>
                    <p className="mt-1">{selectedContract.autoRenewal ? 'Áno' : 'Nie'}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Začiatok zmluvy</Label>
                  <p className="mt-1">{new Date(selectedContract.startDate).toLocaleDateString('sk')}</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-600">Koniec zmluvy</Label>
                  <p className="mt-1">{new Date(selectedContract.endDate).toLocaleDateString('sk')}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Popis</Label>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{selectedContract.description}</p>
              </div>
              
              {selectedContract.notes && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Poznámky</Label>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{selectedContract.notes}</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => selectedContract && handleEdit(selectedContract)}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Upraviť
            </Button>
            <Button
              variant="outline"
              onClick={() => selectedContract && handleDelete(selectedContract)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Zmazať
            </Button>
            <Button onClick={() => setIsDetailOpen(false)}>
              Zavrieť
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Contract Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upraviť zmluvu</DialogTitle>
            <DialogDescription>
              Upravte údaje zmluvy. Všetky polia sú editovateľné.
            </DialogDescription>
          </DialogHeader>
          
          {editingContract && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Názov zmluvy</Label>
                  <Input
                    id="title"
                    value={editingContract.title}
                    onChange={(e) => setEditingContract(prev => prev ? {...prev, title: e.target.value} : null)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="contractNumber">Číslo zmluvy</Label>
                  <Input
                    id="contractNumber"
                    value={editingContract.contractNumber}
                    onChange={(e) => setEditingContract(prev => prev ? {...prev, contractNumber: e.target.value} : null)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={editingContract.status} 
                    onValueChange={(value) => setEditingContract(prev => prev ? {...prev, status: value as any} : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktívne</SelectItem>
                      <SelectItem value="pending">Čakajúce</SelectItem>
                      <SelectItem value="expired">Expirované</SelectItem>
                      <SelectItem value="terminated">Ukončené</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="type">Typ</Label>
                  <Select 
                    value={editingContract.type} 
                    onValueChange={(value) => setEditingContract(prev => prev ? {...prev, type: value as any} : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="service">Služby</SelectItem>
                      <SelectItem value="maintenance">Údržba</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox 
                    id="autoRenewal"
                    checked={editingContract.autoRenewal}
                    onCheckedChange={(checked) => setEditingContract(prev => prev ? {...prev, autoRenewal: !!checked} : null)}
                  />
                  <Label htmlFor="autoRenewal">Automatické obnovenie</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="value">Celková hodnota (€)</Label>
                  <Input
                    id="value"
                    type="number"
                    value={editingContract.value}
                    onChange={(e) => setEditingContract(prev => prev ? {...prev, value: Number(e.target.value)} : null)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="monthlyFee">Mesačný poplatok (€)</Label>
                  <Input
                    id="monthlyFee"
                    type="number"
                    value={editingContract.monthlyFee}
                    onChange={(e) => setEditingContract(prev => prev ? {...prev, monthlyFee: Number(e.target.value)} : null)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Začiatok zmluvy</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={editingContract.startDate}
                    onChange={(e) => setEditingContract(prev => prev ? {...prev, startDate: e.target.value} : null)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="endDate">Koniec zmluvy</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={editingContract.endDate}
                    onChange={(e) => setEditingContract(prev => prev ? {...prev, endDate: e.target.value} : null)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Popis</Label>
                <Textarea
                  id="description"
                  value={editingContract.description}
                  onChange={(e) => setEditingContract(prev => prev ? {...prev, description: e.target.value} : null)}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Poznámky</Label>
                <Textarea
                  id="notes"
                  value={editingContract.notes || ''}
                  onChange={(e) => setEditingContract(prev => prev ? {...prev, notes: e.target.value} : null)}
                  rows={2}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Zrušiť
            </Button>
            <Button onClick={handleSaveContract}>
              Uložiť zmeny
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Potvrdiť zmazanie</DialogTitle>
            <DialogDescription>
              Ste si istí, že chcete zmazať zmluvu "{selectedContract?.title}"? 
              Táto akcia sa nedá vrátiť späť.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Zrušiť
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Zmazať
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
