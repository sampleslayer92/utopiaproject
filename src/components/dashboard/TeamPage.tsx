
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Users, TrendingUp, Award, Target, Eye, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { TeamMember } from '@/types/team';
import { useNavigate } from 'react-router-dom';

const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    firstName: 'Peter',
    lastName: 'Novák',
    email: 'peter.novak@iso-org.sk',
    phone: '+421 900 123 456',
    position: 'Senior Account Manager',
    department: 'Sales',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-01-15',
    performance: {
      monthlyRevenue: 15000,
      totalRevenue: 180000,
      merchantsManaged: 12,
      contractsSigned: 8,
      efficiency: 92
    },
    assignedMerchants: ['client-1', 'client-2'],
    lastActivity: '2024-11-28T14:30:00Z',
    permissions: ['view_merchants', 'edit_contracts', 'create_reports']
  },
  {
    id: 'team-2',
    firstName: 'Jana',
    lastName: 'Kováčová',
    email: 'jana.kovacova@iso-org.sk',
    phone: '+421 900 234 567',
    position: 'Account Manager',
    department: 'Sales',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-06-01',
    performance: {
      monthlyRevenue: 12000,
      totalRevenue: 72000,
      merchantsManaged: 8,
      contractsSigned: 5,
      efficiency: 88
    },
    assignedMerchants: ['client-3'],
    lastActivity: '2024-11-28T16:45:00Z',
    permissions: ['view_merchants', 'edit_contracts']
  },
  {
    id: 'team-3',
    firstName: 'Martin',
    lastName: 'Svoboda',
    email: 'martin.svoboda@iso-org.sk',
    phone: '+421 900 345 678',
    position: 'Technical Support',
    department: 'Support',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-03-20',
    performance: {
      monthlyRevenue: 8000,
      totalRevenue: 64000,
      merchantsManaged: 15,
      contractsSigned: 2,
      efficiency: 95
    },
    assignedMerchants: ['client-4'],
    lastActivity: '2024-11-28T12:20:00Z',
    permissions: ['view_merchants', 'technical_support']
  }
];

export const TeamPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = mockTeamMembers.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (!user || user.role !== 'business_partner') {
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
            Team
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Správa vašich zamestnancov a ich výkonnosti
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          <Plus className="h-4 w-4 mr-2" />
          Pridať člena tímu
        </Button>
      </div>

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

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Hľadať členov tímu..."
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
                <TableHead>Meno</TableHead>
                <TableHead>Pozícia</TableHead>
                <TableHead>Oddelenie</TableHead>
                <TableHead>Merchanti</TableHead>
                <TableHead>Mesačné tržby</TableHead>
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
