import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  TrendingUp, 
  DollarSign, 
  MapPin,
  Phone,
  Mail,
  Calendar,
  Eye
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AddMerchantDialog } from './AddMerchantDialog';

// Mock data for merchants
const mockMerchants = [
  {
    id: 'client-1',
    name: 'Reštaurácia U Jána',
    email: 'jan@restaurant.sk',
    phone: '+421 900 123 456',
    address: 'Hlavná 15, Bratislava',
    contactPerson: 'Ján Novák',
    industry: 'restaurant',
    status: 'active',
    createdAt: '2024-01-15',
    monthlyRevenue: 12400,
    locationsCount: 2,
    assignedManager: 'Peter Manažér'
  },
  {
    id: 'client-2',
    name: 'Kaviareň Dobiáš',
    email: 'info@kaviarendobias.sk',
    phone: '+421 902 345 678',
    address: 'Námestie SNP 22, Banská Bystrica',
    contactPerson: 'Pavol Dobiáš',
    industry: 'hospitality',
    status: 'inactive',
    createdAt: '2023-11-01',
    monthlyRevenue: 6800,
    locationsCount: 1,
    assignedManager: 'Zuzana Riaditeľka'
  },
  {
    id: 'client-3',
    name: 'Fitnes centrum Olympia',
    email: 'recepcia@olympiafit.sk',
    phone: '+421 903 456 789',
    address: 'Športová 8, Košice',
    contactPerson: 'Eva Horváthová',
    industry: 'fitness',
    status: 'active',
    createdAt: '2024-03-10',
    monthlyRevenue: 9200,
    locationsCount: 3,
    assignedManager: 'Michal Technik'
  },
  {
    id: 'client-4',
    name: 'Kaderníctvo Zuzana',
    email: 'objednavky@kadernictvozuzana.sk',
    phone: '+421 911 567 890',
    address: 'Poštová 4, Žilina',
    contactPerson: 'Zuzana Kováčová',
    industry: 'beauty',
    status: 'pending',
    createdAt: '2024-02-28',
    monthlyRevenue: 4500,
    locationsCount: 1,
    assignedManager: 'Jana Obchodníčka'
  },
  {
    id: 'client-5',
    name: 'Maloobchodný reťazec FreshMarket',
    email: 'centrala@freshmarket.sk',
    phone: '+421 915 678 901',
    address: 'Priemyselná 12, Martin',
    contactPerson: 'Peter Veselý',
    industry: 'retail',
    status: 'active',
    createdAt: '2023-09-18',
    monthlyRevenue: 21500,
    locationsCount: 5,
    assignedManager: 'Ondrej Projektový'
  }
];

export const ClientsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [showAddMerchantDialog, setShowAddMerchantDialog] = useState(false);

  const filteredMerchants = mockMerchants.filter(merchant => {
    const searchMatch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        merchant.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        merchant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || merchant.status === statusFilter;
    const industryMatch = industryFilter === 'all' || merchant.industry === industryFilter;

    return searchMatch && statusMatch && industryMatch;
  });

  const handleMerchantClick = (merchantId: string) => {
    navigate(`/dashboard/merchants/${merchantId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Merchanti
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Správa klientov a ich obchodných aktivít
          </p>
        </div>
        <Button onClick={() => setShowAddMerchantDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Pridať merchanta
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom merchantov</p>
                <p className="text-2xl font-bold">{mockMerchants.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktívni</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockMerchants.filter(m => m.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkové tržby</p>
                <p className="text-2xl font-bold">€{mockMerchants.reduce((sum, m) => sum + m.monthlyRevenue, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lokácie</p>
                <p className="text-2xl font-bold">{mockMerchants.reduce((sum, m) => sum + m.locationsCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Hľadať merchantov..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky statusy</SelectItem>
                <SelectItem value="active">Aktívny</SelectItem>
                <SelectItem value="inactive">Neaktívny</SelectItem>
                <SelectItem value="pending">Čakajúci</SelectItem>
              </SelectContent>
            </Select>
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
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
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Viac filtrov
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Merchants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Zoznam merchantov</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead>Odvetvie</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Mesačné tržby</TableHead>
                <TableHead>Lokácie</TableHead>
                <TableHead>Priradený manažér</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMerchants.map((merchant) => (
                <TableRow 
                  key={merchant.id}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleMerchantClick(merchant.id)}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{merchant.name}</p>
                      <p className="text-sm text-gray-500">{merchant.contactPerson}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3 w-3 mr-1" />
                        {merchant.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-1" />
                        {merchant.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {merchant.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getIndustryLabel(merchant.industry)}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(merchant.status)}>
                      {merchant.status === 'active' ? 'Aktívny' : 
                       merchant.status === 'inactive' ? 'Neaktívny' : 'Čakajúci'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">€{merchant.monthlyRevenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">
                        Provízia: €{(merchant.monthlyRevenue * 0.025).toFixed(2)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{merchant.locationsCount}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{merchant.assignedManager}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(merchant.createdAt).toLocaleDateString('sk-SK')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMerchantClick(merchant.id);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddMerchantDialog
        open={showAddMerchantDialog}
        onOpenChange={setShowAddMerchantDialog}
      />
    </div>
  );
};
