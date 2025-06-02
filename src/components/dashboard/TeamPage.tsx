import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Users, 
  UserCheck, 
  TrendingUp, 
  DollarSign,
  ArrowUpDown,
  MoreHorizontal,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AddEmployeeDialog } from './AddEmployeeDialog';

// Mock data for team members
const mockTeamMembers = [
  {
    id: 'team-1',
    firstName: 'Peter',
    lastName: 'Manažér',
    email: 'peter@utopia.sk',
    phone: '+421 905 111 222',
    position: 'Senior Obchodný Manažér',
    department: 'Predaj',
    commissionRate: 3.5,
    calculatedCommission: 85.50,
    status: 'active',
    hireDate: '2023-01-15',
    merchantsCount: 8,
    monthlyRevenue: 2440
  },
  {
    id: 'team-2',
    firstName: 'Jana',
    lastName: 'Novotná',
    email: 'jana@utopia.sk',
    phone: '+421 907 333 444',
    position: 'Obchodný Zástupca',
    department: 'Predaj',
    commissionRate: 2.8,
    calculatedCommission: 67.20,
    status: 'active',
    hireDate: '2023-03-10',
    merchantsCount: 6,
    monthlyRevenue: 2400
  },
  {
    id: 'team-3',
    firstName: 'Michal',
    lastName: 'Technický',
    email: 'michal@utopia.sk',
    phone: '+421 908 555 666',
    position: 'Technický Špecialista',
    department: 'Podpora',
    commissionRate: 1.5,
    calculatedCommission: 36.00,
    status: 'active',
    hireDate: '2023-05-20',
    merchantsCount: 4,
    monthlyRevenue: 2400
  }
];

export const TeamPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  let filteredTeamMembers = mockTeamMembers.filter(member => {
    const fullName = `${member.firstName} ${member.lastName}`;
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'all' || member.position.toLowerCase().includes(positionFilter.toLowerCase());
    
    return matchesSearch && matchesPosition;
  });

  // Apply sorting
  if (sortField) {
    filteredTeamMembers.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
          break;
        case 'position':
          aValue = a.position;
          bValue = b.position;
          break;
        case 'commissionRate':
          aValue = a.commissionRate;
          bValue = b.commissionRate;
          break;
        case 'calculatedCommission':
          aValue = a.calculatedCommission;
          bValue = b.calculatedCommission;
          break;
        case 'merchantsCount':
          aValue = a.merchantsCount;
          bValue = b.merchantsCount;
          break;
        case 'monthlyRevenue':
          aValue = a.monthlyRevenue;
          bValue = b.monthlyRevenue;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const handleTeamMemberAdded = (newMember: any) => {
    console.log('New team member added:', newMember);
    // In real app, add to state or refetch data
  };

  const getTeamStats = () => {
    const stats = {
      total: filteredTeamMembers.length,
      active: filteredTeamMembers.filter(m => m.status === 'active').length,
      totalCommission: filteredTeamMembers.reduce((sum, m) => sum + m.calculatedCommission, 0),
      totalMerchants: filteredTeamMembers.reduce((sum, m) => sum + m.merchantsCount, 0)
    };
    return stats;
  };

  const stats = getTeamStats();

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tím</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Spravujte členov vášho tímu a sledujte ich výkonnosť
          </p>
        </div>
        <AddEmployeeDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom členov</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktívni</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celková provízia</p>
                <p className="text-2xl font-bold text-purple-600">€{stats.totalCommission.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Spravovaní merchanti</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalMerchants}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Vyhľadať členov tímu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Pozícia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky pozície</SelectItem>
                <SelectItem value="manažér">Manažér</SelectItem>
                <SelectItem value="zástupca">Zástupca</SelectItem>
                <SelectItem value="špecialista">Špecialista</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Team Table */}
      <Card>
        <CardHeader>
          <CardTitle>Členovia tímu</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Meno</span>
                    {getSortIcon('name')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort('position')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Pozícia</span>
                    {getSortIcon('position')}
                  </div>
                </TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort('commissionRate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Provízia %</span>
                    {getSortIcon('commissionRate')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort('calculatedCommission')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Mesačná provízia</span>
                    {getSortIcon('calculatedCommission')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort('merchantsCount')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Merchanti</span>
                    {getSortIcon('merchantsCount')}
                  </div>
                </TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeamMembers.map((member) => (
                <TableRow 
                  key={member.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => navigate(`/dashboard/team/${member.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{member.firstName} {member.lastName}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-sm">
                        <Mail className="h-3 w-3" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Phone className="h-3 w-3" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.commissionRate}%</TableCell>
                  <TableCell className="font-medium text-green-600">€{member.calculatedCommission.toFixed(2)}</TableCell>
                  <TableCell>{member.merchantsCount}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle action menu
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredTeamMembers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Žiadni členovia tímu
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Momentálne nemáte žiadnych členov tímu ktorí by zodpovedali zadaným kritériám.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
