import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Edit, Eye, MapPin, Users, Smartphone, DollarSign, Trash2, AlertTriangle, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { BusinessPartner } from '@/types/dashboard';
import { AddBusinessPartnerDialog } from './AddBusinessPartnerDialog';
import { EditBusinessPartnerDialog } from './EditBusinessPartnerDialog';
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const mockBusinessPartners: BusinessPartner[] = [
  {
    id: 'bp-1',
    name: 'Martin Novák',
    email: 'partner1@utopia.sk',
    phone: '+421 905 123 456',
    address: 'Hlavná 15, Bratislava',
    clientsCount: 24,
    devicesCount: 456,
    totalRevenue: 25000,
    monthlyRevenue: 4200,
    expectedRevenue: 5000,
    commissionRate: 0.5,
    calculatedCommission: 21.0,
    contractViolation: true,
    status: 'active',
    createdAt: '2024-01-15',
    tier: 'gold',
    region: 'Bratislava',
    totalSales: 25000,
    commission: 21.0,
    clients: 24
  },
  {
    id: 'bp-2',
    name: 'Jana Svoboda',
    email: 'partner2@utopia.sk',
    phone: '+420 606 789 012',
    address: 'Wenceslas Square 8, Praha',
    clientsCount: 18,
    devicesCount: 324,
    totalRevenue: 19600,
    monthlyRevenue: 3300,
    expectedRevenue: 3000,
    commissionRate: 0.5,
    calculatedCommission: 16.5,
    contractViolation: false,
    status: 'active',
    createdAt: '2024-02-20',
    tier: 'silver',
    region: 'Praha',
    totalSales: 19600,
    commission: 16.5,
    clients: 18
  },
  {
    id: 'bp-3',
    name: 'TechSolutions Ltd.',
    email: 'contact@techsolutions.com',
    phone: '+421 911 345 678',
    address: 'Technická 42, Košice',
    clientsCount: 12,
    devicesCount: 189,
    totalRevenue: 13400,
    monthlyRevenue: 2100,
    expectedRevenue: 2500,
    commissionRate: 0.5,
    calculatedCommission: 10.5,
    contractViolation: true,
    status: 'active',
    createdAt: '2024-03-10',
    tier: 'bronze',
    region: 'Košice',
    totalSales: 13400,
    commission: 10.5,
    clients: 12
  }
];

export const BusinessPartnersPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [partners, setPartners] = useState<BusinessPartner[]>(mockBusinessPartners);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<BusinessPartner | null>(null);
  const [editingPartner, setEditingPartner] = useState<BusinessPartner | null>(null);
  const [deletingPartner, setDeletingPartner] = useState<BusinessPartner | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViolationsOnly, setShowViolationsOnly] = useState(false);

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesViolationFilter = !showViolationsOnly || partner.contractViolation;
    
    return matchesSearch && matchesViolationFilter;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'silver':
        return 'bg-gray-100 text-gray-800';
      case 'bronze':
        return 'bg-orange-100 text-orange-800';
      case 'platinum':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePartnerAdded = () => {
    console.log('Business partner added successfully');
  };

  const handleEditPartner = (partner: BusinessPartner) => {
    setEditingPartner(partner);
    setShowEditDialog(true);
  };

  const handleSavePartner = (updatedPartner: BusinessPartner) => {
    setPartners(prev => prev.map(p => p.id === updatedPartner.id ? updatedPartner : p));
  };

  const handleDeletePartner = (partner: BusinessPartner) => {
    setDeletingPartner(partner);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deletingPartner) {
      setPartners(prev => prev.filter(p => p.id !== deletingPartner.id));
      toast({
        title: "Úspech",
        description: "Obchodný partner bol úspešne vymazaný.",
      });
      setDeletingPartner(null);
      setShowDeleteDialog(false);
    }
  };

  // Only admins can see this page
  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          Nemáte oprávnenie na zobrazenie tejto stránky.
        </p>
      </div>
    );
  }

  const violationCount = partners.filter(p => p.contractViolation).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Obchodní partneri
          </h1>
          <p className="text-gray-600">
            Správa obchodných partnerov a ich výkonnosti
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant={showViolationsOnly ? "default" : "outline"}
            onClick={() => setShowViolationsOnly(!showViolationsOnly)}
            className="flex items-center space-x-2"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Porušenia ({violationCount})</span>
          </Button>
          <AddBusinessPartnerDialog onPartnerAdded={handlePartnerAdded} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Celkom partnerov</p>
                <p className="text-2xl font-bold">{partners.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Smartphone className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Celkom zariadení</p>
                <p className="text-2xl font-bold">{partners.reduce((sum, p) => sum + p.devicesCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mesačné provízie</p>
                <p className="text-2xl font-bold">€{partners.reduce((sum, p) => sum + p.calculatedCommission, 0).toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Porušenia zmluvy</p>
                <p className="text-2xl font-bold text-red-600">{violationCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Hľadať partnerov..."
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
                <TableHead>Partner</TableHead>
                <TableHead>Región</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Klienti</TableHead>
                <TableHead>Zariadenia</TableHead>
                <TableHead>Mesačný obrat</TableHead>
                <TableHead>Moja provízia</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {partner.contractViolation && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Obrat klienta je pod úrovňou deklarovanej zmluvy.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      <div>
                        <div className="font-medium">{partner.name}</div>
                        <div className="text-sm text-gray-500">{partner.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{partner.region}</TableCell>
                  <TableCell>
                    <Badge className={getTierColor(partner.tier)}>
                      {partner.tier.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{partner.clientsCount}</TableCell>
                  <TableCell>{partner.devicesCount}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">€{partner.monthlyRevenue.toLocaleString()}</div>
                      {partner.contractViolation && (
                        <div className="text-xs text-red-500">
                          Očakávané: €{partner.expectedRevenue.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">€{partner.calculatedCommission.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{partner.commissionRate}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(partner.status)}>
                      {partner.status === 'active' ? 'Aktívny' : 
                       partner.status === 'inactive' ? 'Neaktívny' : 'Pozastavený'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPartner(partner)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detail partnera</DialogTitle>
                          </DialogHeader>
                          {selectedPartner && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Názov</p>
                                  <p>{selectedPartner.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Email</p>
                                  <p>{selectedPartner.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Telefón</p>
                                  <p>{selectedPartner.phone}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Adresa</p>
                                  <p>{selectedPartner.address}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Celkové tržby</p>
                                  <p>€{selectedPartner.totalRevenue.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Vytvorený</p>
                                  <p>{new Date(selectedPartner.createdAt).toLocaleDateString('sk-SK')}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditPartner(partner)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeletePartner(partner)}
                        className="text-red-600 hover:text-red-700"
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

      {/* Edit Dialog */}
      <EditBusinessPartnerDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        partner={editingPartner}
        onSave={handleSavePartner}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Vymazať obchodného partnera"
        description="Ste si istí, že chcete vymazať tohto obchodného partnera? Táto akcia sa nedá vrátiť späť."
        itemName={deletingPartner?.name}
      />
    </div>
  );
};
