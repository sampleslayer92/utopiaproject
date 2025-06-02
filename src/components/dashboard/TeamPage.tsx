import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  Target,
  Grid3X3,
  List,
  Plus,
  Download,
  Settings,
  Euro,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AddEmployeeDialog } from './AddEmployeeDialog';
import { EditTeamMemberDialog } from './EditTeamMemberDialog';
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';
import { TeamMember } from '@/types/team';
import { PageHeader } from '@/components/ui/page-header';
import { EntityActions } from '@/components/ui/entity-actions';
import { SectionHeader } from '@/components/ui/section-header';

// Mock data pre tím s reálnejšími údajmi
const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    firstName: 'Peter',
    lastName: 'Fekiač',
    email: 'peter.fekiac@iso-org.sk',
    phone: '+421 900 123 456',
    position: 'Senior Account Manager',
    department: 'Sales',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-01-15',
    performance: {
      monthlyRevenue: 4800,
      totalRevenue: 57600,
      merchantsManaged: 15,
      contractsSigned: 12,
      efficiency: 95
    },
    assignedMerchants: ['merchant-1', 'merchant-2'],
    permissions: ['view_merchants', 'edit_contracts', 'create_reports'],
    salary: 3200,
    commissionRate: 2.0
  },
  {
    id: 'team-2',
    firstName: 'Ladislav',
    lastName: 'Mathis',
    email: 'ladislav.mathis@iso-org.sk',
    phone: '+421 900 654 321',
    position: 'Account Manager',
    department: 'Sales',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-03-20',
    performance: {
      monthlyRevenue: 3200,
      totalRevenue: 32000,
      merchantsManaged: 12,
      contractsSigned: 8,
      efficiency: 92
    },
    assignedMerchants: ['merchant-3', 'merchant-4'],
    permissions: ['view_merchants', 'edit_contracts'],
    salary: 2800,
    commissionRate: 1.8
  },
  {
    id: 'team-3',
    firstName: 'Richie',
    lastName: 'Plichta',
    email: 'richie.plichta@iso-org.sk',
    phone: '+421 900 789 123',
    position: 'Technical Support Manager',
    department: 'Support',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2022-11-10',
    performance: {
      monthlyRevenue: 2800,
      totalRevenue: 33600,
      merchantsManaged: 8,
      contractsSigned: 6,
      efficiency: 98
    },
    assignedMerchants: ['merchant-5'],
    permissions: ['technical_support', 'maintenance_contracts'],
    salary: 3000,
    commissionRate: 1.5
  },
  {
    id: 'team-4',
    firstName: 'Mária',
    lastName: 'Novotná',
    email: 'maria.novotna@iso-org.sk',
    phone: '+421 900 555 777',
    position: 'Sales Representative',
    department: 'Sales',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-06-01',
    performance: {
      monthlyRevenue: 2100,
      totalRevenue: 12600,
      merchantsManaged: 6,
      contractsSigned: 4,
      efficiency: 87
    },
    assignedMerchants: ['merchant-6'],
    permissions: ['view_merchants'],
    salary: 2400,
    commissionRate: 1.2
  },
  {
    id: 'team-5',
    firstName: 'Ján',
    lastName: 'Kováč',
    email: 'jan.kovac@iso-org.sk',
    phone: '+421 900 333 444',
    position: 'Customer Success Manager',
    department: 'Support',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-09-15',
    performance: {
      monthlyRevenue: 1600,
      totalRevenue: 4800,
      merchantsManaged: 5,
      contractsSigned: 3,
      efficiency: 89
    },
    assignedMerchants: ['merchant-7'],
    permissions: ['technical_support', 'view_merchants'],
    salary: 2600,
    commissionRate: 1.0
  }
];

export const TeamPage: React.FC = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleAddEmployee = (newEmployee: TeamMember) => {
    setTeamMembers(prev => [...prev, newEmployee]);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setShowEditDialog(true);
  };

  const handleSaveMember = (updatedMember: TeamMember) => {
    setTeamMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  const handleDeleteMember = (member: TeamMember) => {
    setDeletingMember(member);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deletingMember) {
      setTeamMembers(prev => prev.filter(m => m.id !== deletingMember.id));
      toast({
        title: "Úspech",
        description: "Člen tímu bol úspešne vymazaný.",
      });
      setDeletingMember(null);
      setShowDeleteDialog(false);
    }
  };

  const filteredMembers = teamMembers.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateCommission = (member: TeamMember) => {
    return member.performance.monthlyRevenue * (member.commissionRate || 0) / 100;
  };

  const activeMembers = teamMembers.filter(m => m.status === 'active').length;
  const avgEfficiency = Math.round(teamMembers.reduce((acc, m) => acc + m.performance.efficiency, 0) / teamMembers.length);
  const totalRevenue = teamMembers.reduce((acc, m) => acc + m.performance.monthlyRevenue, 0);

  const stats = [
    {
      label: 'Aktívni členovia',
      value: activeMembers,
      icon: Users,
      color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Priemerná efektivita',
      value: `${avgEfficiency}%`,
      icon: TrendingUp,
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
    },
    {
      label: 'Celkový obrat',
      value: `€${totalRevenue.toLocaleString()}`,
      icon: Euro,
      color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
    }
  ];

  const actions = (
    <>
      <Button variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Export tímu
      </Button>
      <Button variant="outline">
        <Settings className="h-4 w-4 mr-2" />
        Nastavenia
      </Button>
      <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
    </>
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Users}
        title="Správa tímu"
        description="Spravujte členov vášho tímu, sledujte výkonnosť a koordinujte prácu"
        stats={stats}
        actions={actions}
      />

      {/* Search and View Toggle */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Hľadať člena tímu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {member.firstName[0]}{member.lastName[0]}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{member.firstName} {member.lastName}</CardTitle>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Euro className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Provízia: {member.commissionRate}%</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Efektivita</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {member.performance.efficiency}%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Zmluvy:</span>
                      <span className="font-medium">{member.performance.contractsSigned}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tržby:</span>
                      <span className="font-medium">€{member.performance.monthlyRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Provízia:</span>
                      <span className="font-medium text-green-600">€{calculateCommission(member).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Link to={`/dashboard/team/${member.id}`} className="flex-1">
                    <Button className="w-full" variant="outline" size="sm">
                      Detail
                    </Button>
                  </Link>
                  <EntityActions
                    actions={[
                      {
                        type: 'edit',
                        label: 'Upraviť',
                        onClick: () => handleEditMember(member)
                      },
                      {
                        type: 'delete',
                        label: 'Vymazať',
                        onClick: () => handleDeleteMember(member)
                      }
                    ]}
                    entityName="člena tímu"
                    entityId={`${member.firstName} ${member.lastName}`}
                    compact={true}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Meno</TableHead>
                  <TableHead>Pozícia</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefón</TableHead>
                  <TableHead>Efektivita</TableHead>
                  <TableHead>Tržby</TableHead>
                  <TableHead>Provízia %</TableHead>
                  <TableHead>Moja provízia</TableHead>
                  <TableHead>Akcie</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {member.firstName[0]}{member.lastName[0]}
                        </div>
                        <span className="font-medium">{member.firstName} {member.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{member.position}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {member.performance.efficiency}%
                      </Badge>
                    </TableCell>
                    <TableCell>€{member.performance.monthlyRevenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-purple-600">
                        {member.commissionRate}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">
                        €{calculateCommission(member).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link to={`/dashboard/team/${member.id}`}>
                          <Button size="sm" variant="outline">
                            Detail
                          </Button>
                        </Link>
                        <EntityActions
                          actions={[
                            {
                              type: 'edit',
                              label: 'Upraviť',
                              onClick: () => handleEditMember(member)
                            },
                            {
                              type: 'delete',
                              label: 'Vymazať',
                              onClick: () => handleDeleteMember(member)
                            }
                          ]}
                          entityName="člena tímu"
                          entityId={`${member.firstName} ${member.lastName}`}
                          compact={true}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <EditTeamMemberDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        member={editingMember}
        onSave={handleSaveMember}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Vymazať člena tímu"
        description="Ste si istí, že chcete vymazať tohoto člena tímu? Táto akcia sa nedá vrátiť späť."
        itemName={deletingMember ? `${deletingMember.firstName} ${deletingMember.lastName}` : undefined}
      />
    </div>
  );
};
