
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, FileText, Calendar, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { demoContracts, demoLocations } from '@/data/demoData';

export const ContractsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter contracts based on search and filters
  const filteredContracts = demoContracts.filter(contract => {
    const matchesSearch = contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const activeContracts = demoContracts.filter(c => c.status === 'active').length;
  const pendingContracts = demoContracts.filter(c => c.status === 'pending').length;
  const expiringSoon = demoContracts.filter(c => {
    const endDate = new Date(c.endDate);
    const now = new Date();
    const daysDiff = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 30 && daysDiff > 0;
  }).length;
  const totalValue = demoContracts.reduce((sum, c) => sum + c.value, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'terminated':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const isExpiringSoon = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const daysDiff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 30 && daysDiff > 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Zmluvy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Správa zmlúv a kontraktov
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Aktívne zmluvy</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{activeContracts}</p>
                <p className="text-xs text-green-600 dark:text-green-400">Platné kontrakty</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Čakajúce</p>
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{pendingContracts}</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">Na podpis</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Končia čoskoro</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">{expiringSoon}</p>
                <p className="text-xs text-red-600 dark:text-red-400">Do 30 dní</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Celková hodnota</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">€{totalValue.toLocaleString()}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Všetky zmluvy</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Hľadať zmluvy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-gray-900/80"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky statusy</SelectItem>
                <SelectItem value="active">Aktívne</SelectItem>
                <SelectItem value="pending">Čakajúce</SelectItem>
                <SelectItem value="expired">Expirované</SelectItem>
                <SelectItem value="terminated">Ukončené</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContracts.map((contract) => {
          const location = demoLocations.find(loc => loc.id === contract.locationId);
          const expiring = isExpiringSoon(contract.endDate);
          
          return (
            <Card key={contract.id} className={`bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 border-l-4 ${expiring ? 'border-l-red-500' : 'border-l-blue-500'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-2">{contract.contractNumber}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(contract.status)}>
                        {contract.status === 'active' ? 'Aktívne' :
                         contract.status === 'pending' ? 'Čakajúce' :
                         contract.status === 'expired' ? 'Expirované' : 'Ukončené'}
                      </Badge>
                      {expiring && (
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Končí čoskoro
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p><strong>Klient:</strong> {contract.clientName}</p>
                      <p><strong>Typ:</strong> {contract.type}</p>
                      <p><strong>Prevádzka:</strong> {location?.name}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">€{contract.value.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Hodnota zmluvy</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-lg font-bold text-green-600">€{contract.monthlyFee}</p>
                    <p className="text-xs text-gray-500">Mesačný poplatok</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Začiatok zmluvy</span>
                    <span className="font-semibold">{new Date(contract.startDate).toLocaleDateString('sk-SK')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Koniec zmluvy</span>
                    <span className={`font-semibold ${expiring ? 'text-red-600' : ''}`}>
                      {new Date(contract.endDate).toLocaleDateString('sk-SK')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Automatické predĺženie</span>
                    <span className="font-semibold">{contract.autoRenewal ? 'Áno' : 'Nie'}</span>
                  </div>
                </div>

                {contract.notes && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 border-t pt-2">
                    <p><strong>Poznámky:</strong> {contract.notes}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    Zobraziť
                  </Button>
                  <Button size="sm" className="flex-1">
                    Upraviť
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredContracts.length === 0 && (
        <Card className="p-8 text-center">
          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Žiadne zmluvy
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Neboli nájdené žiadne zmluvy pre zadané kritériá.' 
              : 'Zatiaľ nemáte žiadne zmluvy.'}
          </p>
        </Card>
      )}
    </div>
  );
};
