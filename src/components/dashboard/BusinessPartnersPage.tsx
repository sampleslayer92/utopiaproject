import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Edit, Eye, MapPin, Users, Smartphone, DollarSign, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { BusinessPartner } from '@/types/dashboard';
import { AddBusinessPartnerDialog } from './AddBusinessPartnerDialog';
import { EditBusinessPartnerDialog } from './EditBusinessPartnerDialog';
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';

const mockBusinessPartners: BusinessPartner[] = [
  {
    id: 'bp-1',
    name: 'Martin Novák',
    email: 'partner1@utopia.sk',
    phone: '+421 905 123 456',
    address: 'Hlavná 15, Bratislava',
    clientsCount: 24,
    devicesCount: 456,
    totalRevenue: 125000,
    monthlyRevenue: 8500,
    status: 'active',
    createdAt: '2024-01-15',
    tier: 'gold',
    region: 'Bratislava'
  },
  {
    id: 'bp-2',
    name: 'Jana Svoboda',
    email: 'partner2@utopia.sk',
    phone: '+420 606 789 012',
    address: 'Wenceslas Square 8, Praha',
    clientsCount: 18,
    devicesCount: 324,
    totalRevenue: 98000,
    monthlyRevenue: 6200,
    status: 'active',
    createdAt: '2024-02-20',
    tier: 'silver',
    region: 'Praha'
  },
  {
    id: 'bp-3',
    name: 'TechSolutions Ltd.',
    email: 'contact@techsolutions.com',
    phone: '+421 911 345 678',
    address: 'Technická 42, Košice',
    clientsCount: 12,
    devicesCount: 189,
    totalRevenue: 67000,
    monthlyRevenue: 4100,
    status: 'active',
    createdAt: '2024-03-10',
    tier: 'bronze',
    region: 'Košice'
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

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'silver':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'bronze':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handlePartnerAdded = () => {
    console.log('Business partner added successfully');
    // Refresh data if needed
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
            Obchodní partneri
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Správa obchodných partnerov a ich výkonnosti
          </p>
        </div>
        <AddBusinessPartnerDialog onPartnerAdded={handlePartnerAdded} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom partnerov</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom zariadení</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesačné tržby</p>
                <p className="text-2xl font-bold">€{partners.reduce((sum, p) => sum + p.monthlyRevenue, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktívni partneri</p>
                <p className="text-2xl font-bold">{partners.filter(p => p.status === 'active').length}</p>
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
                <TableHead>Mesačné tržby</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-sm text-gray-500">{partner.email}</div>
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
                  <TableCell>€{partner.monthlyRevenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(partner.status)}>
                      {partner.status === 'active' ? 'Aktívny' : 'Neaktívny'}
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
