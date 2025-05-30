import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Calendar, FileText, User, MapPin, DollarSign, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { BusinessPartnerContractsPage } from './BusinessPartnerContractsPage';
import { demoContracts, demoClients, type DemoContract } from '@/data/demoData';

export const ContractsPage: React.FC = () => {
  const { user } = useAuth();
  
  // If user is a business partner, show the specialized view
  if (user?.role === 'business_partner') {
    return <BusinessPartnerContractsPage />;
  }

  // Keep existing code for admin and other roles
  const [contracts] = useState<DemoContract[]>(demoContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredContracts = contracts.filter(contract => {
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

  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const totalValue = contracts.reduce((sum, c) => sum + c.value, 0);
  const expiringContracts = contracts.filter(c => {
    const endDate = new Date(c.endDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return endDate <= threeMonthsFromNow && c.status === 'active';
  }).length;

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
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg">
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
          </div>
        </CardContent>
      </Card>

      {/* Contracts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                  {contract.title}
                </CardTitle>
                <Badge className={getStatusColor(contract.status)}>
                  {contract.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{contract.contractNumber}</p>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <User className="h-4 w-4" />
                <span>{contract.clientName}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <Badge className={getTypeColor(contract.type)}>
                  {contract.type}
                </Badge>
                <span className="font-semibold text-lg">€{contract.value.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Do: {new Date(contract.endDate).toLocaleDateString('sk')}</span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {contract.description}
              </p>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Zobraziť
                </Button>
                <Button size="sm" variant="outline">
                  Upraviť
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
