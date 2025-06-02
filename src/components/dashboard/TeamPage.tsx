import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Users, TrendingUp, Award, Target, Eye, Edit, Trash2, FileText, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { TeamMember } from '@/types/team';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddEmployeeDialog } from './AddEmployeeDialog';

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
      monthlyRevenue: 23800,
      totalRevenue: 286000,
      merchantsManaged: 3,
      contractsSigned: 12,
      efficiency: 95
    },
    assignedMerchants: ['merchant-1', 'merchant-2', 'merchant-6'],
    lastActivity: '2024-11-28T14:30:00Z',
    permissions: ['view_merchants', 'edit_contracts', 'create_reports', 'manage_team'],
    salary: 3200,
    commissionRate: 8,
    notes: 'Výborný senior account manager s dlhoročnými skúsenosťami. Špecializuje sa na veľkých klientov v reštauračnom a retail sektore. Má najvyšší conversion rate v tíme.'
  },
  {
    id: 'team-2',
    firstName: 'Ladislav',
    lastName: 'Mathis',
    email: 'ladislav.mathis@iso-org.sk',
    phone: '+421 900 234 567',
    position: 'Account Manager',
    department: 'Sales',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-06-01',
    performance: {
      monthlyRevenue: 18800,
      totalRevenue: 131600,
      merchantsManaged: 3,
      contractsSigned: 8,
      efficiency: 92
    },
    assignedMerchants: ['merchant-3', 'merchant-5', 'merchant-7'],
    lastActivity: '2024-11-28T16:45:00Z',
    permissions: ['view_merchants', 'edit_contracts', 'create_reports'],
    salary: 2800,
    commissionRate: 6,
    notes: 'Rýchlo sa rozvíjajúci account manager so silnými komunikačnými schopnosťami. Špecializuje sa na tech a retail segmenty. Výborný v cross-selling produktov.'
  },
  {
    id: 'team-3',
    firstName: 'Richie',
    lastName: 'Plichta ❤️',
    email: 'richie.plichta@iso-org.sk',
    phone: '+421 900 345 678',
    position: 'Technical Support Manager',
    department: 'Support',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-03-20',
    performance: {
      monthlyRevenue: 16600,
      totalRevenue: 132800,
      merchantsManaged: 2,
      contractsSigned: 6,
      efficiency: 98
    },
    assignedMerchants: ['merchant-4', 'merchant-8'],
    lastActivity: '2024-11-28T12:20:00Z',
    permissions: ['view_merchants', 'technical_support', 'maintenance_contracts'],
    salary: 3000,
    commissionRate: 5,
    notes: 'Expert na technické riešenia s najvyššou customer satisfaction v tíme. Špecializuje sa na komplexné integrácie a maintenance zmluvy. Výborný problem solver.'
  }
];

export const TeamPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [reassignTo, setReassignTo] = useState<string>('');
  const [performanceFilter, setPerformanceFilter] = useState('all');
  const [revenueFilter, setRevenueFilter] = useState('all');

  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPerformance = performanceFilter === 'all' || 
      (performanceFilter === 'high' && member.performance.efficiency >= 95) ||
      (performanceFilter === 'medium' && member.performance.efficiency >= 90 && member.performance.efficiency < 95) ||
      (performanceFilter === 'low' && member.performance.efficiency < 90);
    
    const matchesRevenue = revenueFilter === 'all' ||
      (revenueFilter === 'high' && member.performance.monthlyRevenue >= 20000) ||
      (revenueFilter === 'medium' && member.performance.monthlyRevenue >= 15000 && member.performance.monthlyRevenue < 20000) ||
      (revenueFilter === 'low' && member.performance.monthlyRevenue < 15000);

    return matchesSearch && matchesPerformance && matchesRevenue;
  });

  const totalRevenue = mockTeamMembers.reduce((sum, member) => sum + member.performance.monthlyRevenue, 0);
  const averageEfficiency = mockTeamMembers.reduce((sum, member) => sum + member.performance.efficiency, 0) / mockTeamMembers.length;
  const topPerformer = mockTeamMembers.reduce((top, member) => 
    member.performance.monthlyRevenue > top.performance.monthlyRevenue ? member : top
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleMemberClick = (memberId: string) => {
    navigate(`/dashboard/team/${memberId}`);
  };

  const handleDeleteMember = (member: TeamMember) => {
    setMemberToDelete(member);
  };

  const handleAddEmployee = (employee: TeamMember) => {
    console.log('Pridáva sa nový zamestnanec:', employee);
    // TODO: Implement actual employee addition logic
  };

  const confirmDeleteMember = () => {
    if (memberToDelete && reassignTo) {
      console.log(`Deleting member ${memberToDelete.id} and reassigning to ${reassignTo}`);
      // TODO: Implement actual deletion and reassignment
      setMemberToDelete(null);
      setReassignTo('');
    }
  };

  const otherMembers = mockTeamMembers.filter(m => m.id !== memberToDelete?.id);

  // Only admins (ISO Organizácia) can view team management
  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Nemáte oprávnenie na zobrazenie tejto stránky. Správa tímu je dostupná len pre ISO Organizáciu.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tím
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Správa vašich zamestnancov a ich výkonnosti
          </p>
        </div>
      </div>

      {/* Action Panel */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Správa tímu
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Spravujte zamestnancov a analyzujte ich výkonnosť
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Výkonnostný report</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Nastavenia tímu</span>
              </Button>
              <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom členov</p>
                <p className="text-2xl font-bold">{mockTeamMembers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesačné tržby</p>
                <p className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Priemerná efektivita</p>
                <p className="text-2xl font-bold">{averageEfficiency.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Top výkonnosť</p>
                <p className="text-lg font-bold">{topPerformer.firstName} {topPerformer.lastName}</p>
                <p className="text-sm text-gray-500">€{topPerformer.performance.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Hľadať členov tímu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Výkonnosť" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všetky úrovne</SelectItem>
                  <SelectItem value="high">Vysoká (95%+)</SelectItem>
                  <SelectItem value="medium">Stredná (90-95%)</SelectItem>
                  <SelectItem value="low">Nízka (&lt;90%)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={revenueFilter} onValueChange={setRevenueFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tržby" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všetky tržby</SelectItem>
                  <SelectItem value="high">Vysoké (€20k+)</SelectItem>
                  <SelectItem value="medium">Stredné (€15-20k)</SelectItem>
                  <SelectItem value="low">Nízke (&lt;€15k)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meno</TableHead>
                <TableHead>Pozícia</TableHead>
                <TableHead>Oddelenie</TableHead>
                <TableHead>Merchanti</TableHead>
                <TableHead>Mesačné tržby</TableHead>
                <TableHead>Provízia</TableHead>
                <TableHead>Efektivita</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow 
                  key={member.id}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleMemberClick(member.id)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{member.firstName} {member.lastName}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.performance.merchantsManaged}</TableCell>
                  <TableCell>€{member.performance.monthlyRevenue.toLocaleString()}</TableCell>
                  <TableCell>{member.commissionRate}%</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${member.performance.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{member.performance.efficiency}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status === 'active' ? 'Aktívny' : 
                       member.status === 'inactive' ? 'Neaktívny' : 'Na dovolenke'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMemberClick(member.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteMember(member)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Odstrániť člena tímu</AlertDialogTitle>
                            <AlertDialogDescription>
                              Naozaj chcete odstrániť {member.firstName} {member.lastName} z tímu? 
                              Musíte vybrať iného člena tímu, ktorému sa priradia jeho merchanti a zmluvy.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="py-4">
                            <Select value={reassignTo} onValueChange={setReassignTo}>
                              <SelectTrigger>
                                <SelectValue placeholder="Vyber člena tímu..." />
                              </SelectTrigger>
                              <SelectContent>
                                {otherMembers.map((otherMember) => (
                                  <SelectItem key={otherMember.id} value={otherMember.id}>
                                    {otherMember.firstName} {otherMember.lastName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => {setMemberToDelete(null); setReassignTo('');}}>
                              Zrušiť
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={confirmDeleteMember}
                              disabled={!reassignTo}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Odstrániť a priradiť
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
