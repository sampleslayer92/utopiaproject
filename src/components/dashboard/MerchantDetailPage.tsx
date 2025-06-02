import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  DollarSign,
  Euro,
  Smartphone,
  Settings,
  FileText,
  Users,
  Activity,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Contract } from '@/types/dashboard';
import { EditContractDialog } from './EditContractDialog';
import { AddContractDialog } from './AddContractDialog';
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';

// Mock data for merchant detail
const mockMerchantData = {
  id: 'client-1',
  name: 'Reštaurácia U Jána',
  email: 'jan@restaurant.sk',
  phone: '+421 900 123 456',
  address: 'Hlavná 15, Bratislava',
  website: 'www.restaurant-jana.sk',
  contactPerson: 'Ján Novák',
  industry: 'restaurant',
  status: 'active',
  createdAt: '2024-01-15',
  totalRevenue: 12000,
  monthlyRevenue: 2400,
  commissionRate: 2.5,
  calculatedCommission: 60,
  assignedTeamMember: {
    id: 'team-1',
    name: 'Peter Manažér',
    email: 'peter@utopia.sk',
    phone: '+421 905 111 222'
  },
  activeServices: [
    { 
      id: 'service-1', 
      name: 'POS Systém', 
      status: 'active', 
      monthlyFee: 89,
      commission: 22.25,
      description: 'Pokladničný systém s online synchronizáciou'
    },
    { 
      id: 'service-2', 
      name: 'Online platby', 
      status: 'active', 
      monthlyFee: 45,
      commission: 11.25,
      description: 'Platobná brána pre online objednávky'
    },
    { 
      id: 'service-3', 
      name: 'Inventúra', 
      status: 'active', 
      monthlyFee: 29,
      commission: 7.25,
      description: 'Automatická správa skladu a zásob'
    }
  ],
  locations: [
    { 
      id: 'loc-1', 
      name: 'Hlavná pobočka', 
      address: 'Hlavná 15, Bratislava', 
      status: 'active',
      devicesCount: 5,
      monthlyRevenue: 2300
    },
    { 
      id: 'loc-2', 
      name: 'Pobočka Centrum', 
      address: 'Námestie 8, Bratislava', 
      status: 'active',
      devicesCount: 3,
      monthlyRevenue: 1500
    }
  ],
  devices: [
    {
      id: 'dev-1',
      name: 'POS Terminal 1',
      type: 'POS',
      location: 'Hlavná pobočka',
      status: 'online',
      lastSeen: '2024-11-28T16:45:00Z',
      monthlyRevenue: 1200
    },
    {
      id: 'dev-2',
      name: 'Payment Terminal 1',
      type: 'Payment',
      location: 'Hlavná pobočka',
      status: 'online',
      lastSeen: '2024-11-28T16:40:00Z',
      monthlyRevenue: 800
    },
    {
      id: 'dev-3',
      name: 'POS Terminal 2',
      type: 'POS',
      location: 'Pobočka Centrum',
      status: 'offline',
      lastSeen: '2024-11-28T14:20:00Z',
      monthlyRevenue: 600
    }
  ],
  contracts: [
    {
      id: 'contract-1',
      clientId: 'client-1',
      businessPartnerId: 'team-1',
      title: 'Základný POS balík',
      type: 'subscription' as const,
      status: 'active' as const,
      value: 1068,
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      autoRenewal: true,
      terms: 'Štandardné podmienky pre POS systém s mesačným poplatkom.'
    }
  ]
};

export const MerchantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Contract management state
  const [contracts, setContracts] = useState(mockMerchantData.contracts);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [showEditContractDialog, setShowEditContractDialog] = useState(false);
  const [showAddContractDialog, setShowAddContractDialog] = useState(false);
  const [deletingContract, setDeletingContract] = useState<Contract | null>(null);
  const [showDeleteContractDialog, setShowDeleteContractDialog] = useState(false);

  const merchant = mockMerchantData; // In real app, fetch by id

  // Contract handler functions
  const handleEditContract = (contract: Contract) => {
    setEditingContract(contract);
    setShowEditContractDialog(true);
  };

  const handleDeleteContract = (contract: Contract) => {
    setDeletingContract(contract);
    setShowDeleteContractDialog(true);
  };

  const handleSaveContract = (updatedContract: Contract) => {
    setContracts(prev => prev.map(contract => 
      contract.id === updatedContract.id ? updatedContract : contract
    ));
    toast({
      title: "Zmluva aktualizovaná",
      description: "Zmluva bola úspešne aktualizovaná.",
    });
  };

  const handleAddContract = (newContract: Contract) => {
    setContracts(prev => [...prev, newContract]);
    toast({
      title: "Zmluva pridaná",
      description: "Nová zmluva bola úspešne pridaná.",
    });
  };

  const handleConfirmDeleteContract = () => {
    if (deletingContract) {
      setContracts(prev => prev.filter(contract => contract.id !== deletingContract.id));
      toast({
        title: "Zmluva vymazaná",
        description: "Zmluva bola úspešne vymazaná.",
      });
      setDeletingContract(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'online':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'offline':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
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
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/merchants')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Späť na zoznam</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {merchant.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Detail merchanta a správa služieb
          </p>
        </div>
      </div>

      {/* Merchant Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesačné tržby</p>
                <p className="text-2xl font-bold">€{merchant.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Euro className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Moja provízia</p>
                <p className="text-2xl font-bold text-green-600">€{merchant.calculatedCommission.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{merchant.commissionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lokácie</p>
                <p className="text-2xl font-bold">{merchant.locations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Smartphone className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Zariadenia</p>
                <p className="text-2xl font-bold">{merchant.devices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                <Badge className={getStatusColor(merchant.status)}>
                  {merchant.status === 'active' ? 'Aktívny' : 'Neaktívny'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Prehľad</TabsTrigger>
          <TabsTrigger value="commission">Provízia</TabsTrigger>
          <TabsTrigger value="services">Služby</TabsTrigger>
          <TabsTrigger value="locations">Lokácie</TabsTrigger>
          <TabsTrigger value="devices">Zariadenia</TabsTrigger>
          <TabsTrigger value="contracts">Zmluvy</TabsTrigger>
          <TabsTrigger value="team">Obchodník</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Základné informácie</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Názov</p>
                    <p className="font-medium">{merchant.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Odvetvie</p>
                    <Badge variant="outline">{getIndustryLabel(merchant.industry)}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="font-medium">{merchant.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telefón</p>
                    <p className="font-medium">{merchant.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Adresa</p>
                    <p className="font-medium">{merchant.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Web</p>
                    <p className="font-medium">{merchant.website}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Kontaktná osoba</p>
                    <p className="font-medium">{merchant.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vytvorený</p>
                    <p className="font-medium">{new Date(merchant.createdAt).toLocaleDateString('sk-SK')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Priradený obchodník</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{merchant.assignedTeamMember.name}</p>
                    <p className="text-sm text-gray-500">{merchant.assignedTeamMember.email}</p>
                    <p className="text-sm text-gray-500">{merchant.assignedTeamMember.phone}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Kontaktovať
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="commission" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Breakdown provízie podľa služieb</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {merchant.activeServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-500">{service.description}</p>
                        <p className="text-sm text-gray-600">Mesačný poplatok: €{service.monthlyFee}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">€{service.commission.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{merchant.commissionRate}%</p>
                        <Badge className={service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {service.status === 'active' ? 'Aktívna' : 'Neaktívna'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Celková provízia:</span>
                      <span className="text-green-600">€{merchant.calculatedCommission.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Prehľad provízie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mesačný obrat klienta:</span>
                    <span className="font-medium">€{merchant.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Percento provízie:</span>
                    <span className="font-medium">{merchant.commissionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Počet aktívnych služieb:</span>
                    <span className="font-medium">{merchant.activeServices.filter(s => s.status === 'active').length}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Moja mesačná provízia:</span>
                      <span className="text-green-600">€{merchant.calculatedCommission.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktívne služby</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Služba</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Mesačný poplatok</TableHead>
                    <TableHead>Moja provízia</TableHead>
                    <TableHead>Akcie</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {merchant.activeServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-500">{service.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {service.status === 'active' ? 'Aktívna' : 'Neaktívna'}
                        </Badge>
                      </TableCell>
                      <TableCell>€{service.monthlyFee}</TableCell>
                      <TableCell className="text-green-600 font-medium">€{service.commission.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lokácie</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Názov</TableHead>
                    <TableHead>Adresa</TableHead>
                    <TableHead>Zariadenia</TableHead>
                    <TableHead>Mesačné tržby</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {merchant.locations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell className="font-medium">{location.name}</TableCell>
                      <TableCell>{location.address}</TableCell>
                      <TableCell>{location.devicesCount}</TableCell>
                      <TableCell>€{location.monthlyRevenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(location.status)}>
                          {location.status === 'active' ? 'Aktívna' : 'Neaktívna'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zariadenia</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Názov</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Lokácia</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posledná aktivita</TableHead>
                    <TableHead>Mesačné tržby</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {merchant.devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">{device.name}</TableCell>
                      <TableCell>{device.type}</TableCell>
                      <TableCell>{device.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(device.status)}>
                          {device.status === 'online' ? 'Online' : 'Offline'}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(device.lastSeen).toLocaleString('sk-SK')}</TableCell>
                      <TableCell>€{device.monthlyRevenue.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Zmluvy</CardTitle>
                <Button onClick={() => setShowAddContractDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Pridať zmluvu
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Názov</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Hodnota</TableHead>
                    <TableHead>Platnosť</TableHead>
                    <TableHead>Akcie</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.title}</TableCell>
                      <TableCell>{contract.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(contract.status)}>
                          {contract.status === 'active' ? 'Aktívna' : 'Neaktívna'}
                        </Badge>
                      </TableCell>
                      <TableCell>€{contract.value.toLocaleString()}</TableCell>
                      <TableCell>
                        {new Date(contract.startDate).toLocaleDateString('sk-SK')} - {new Date(contract.endDate).toLocaleDateString('sk-SK')}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditContract(contract)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteContract(contract)}
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
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Priradený obchodník</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{merchant.assignedTeamMember.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Obchodný manažér</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{merchant.assignedTeamMember.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{merchant.assignedTeamMember.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Odoslať email
                  </Button>
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Zavolať
                  </Button>
                  <Button variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Zobraziť profil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contract Management Dialogs */}
      <EditContractDialog
        contract={editingContract}
        open={showEditContractDialog}
        onOpenChange={setShowEditContractDialog}
        onSave={handleSaveContract}
      />

      <AddContractDialog
        open={showAddContractDialog}
        onOpenChange={setShowAddContractDialog}
        onAdd={handleAddContract}
        clientId={merchant.id}
        businessPartnerId={merchant.assignedTeamMember.id}
      />

      <ConfirmDeleteDialog
        open={showDeleteContractDialog}
        onOpenChange={setShowDeleteContractDialog}
        onConfirm={handleConfirmDeleteContract}
        title="Vymazať zmluvu"
        description={`Ste si istí, že chcete vymazať zmluvu "${deletingContract?.title}"? Táto akcia sa nedá vrátiť späť.`}
      />
    </div>
  );
};
