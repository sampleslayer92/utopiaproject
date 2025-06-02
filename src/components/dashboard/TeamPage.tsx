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
  Settings,
  FileText,
  Calendar,
  Target,
  Grid3X3,
  List,
  Plus,
  Download,
  Edit,
  Trash2,
  Euro
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AddEmployeeDialog } from './AddEmployeeDialog';
import { EditTeamMemberDialog } from './EditTeamMemberDialog';
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';
import { TeamMember } from '@/types/team';

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
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table'); // Changed default to table
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

  return (
    <div className="space-y-6">
      {/* Action Panel */}
      <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Správa tímu</h2>
                <p className="text-blue-100 text-sm">
                  Spravujte členov vášho tímu, sledujte výkonnosť a koordinujte prácu
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
                <Download className="h-4 w-4 mr-2" />
                Export tímu
              </Button>
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
                <Settings className="h-4 w-4 mr-2" />
                Nastavenia
              </Button>
              <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Celkom členov</p>
                <p className="text-3xl font-bold text-blue-900">{teamMembers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Aktívni</p>
                <p className="text-3xl font-bold text-green-900">
                  {teamMembers.filter(m => m.status === 'active').length}
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Priemerná efektivita</p>
                <p className="text-3xl font-bold text-purple-900">
                  {Math.round(teamMembers.reduce((acc, m) => acc + m.performance.efficiency, 0) / teamMembers.length)}%
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Celkom provízie</p>
                <p className="text-3xl font-bold text-orange-900">
                  €{teamMembers.reduce((acc, m) => acc + calculateCommission(m), 0).toLocaleString()}
                </p>
              </div>
              <Euro className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditMember(member)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteMember(member)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditMember(member)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteMember(member)}
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
