
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  MapPin,
  UserPlus,
  Settings,
  FileText,
  Calendar,
  Target
} from 'lucide-react';
import { AddEmployeeDialog } from './AddEmployeeDialog';
import { TeamMember } from '@/types/team';

// Mock data pre tím
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
      totalRevenue: 285600,
      merchantsManaged: 15,
      contractsSigned: 12,
      efficiency: 95
    },
    assignedMerchants: ['merchant-1', 'merchant-2'],
    permissions: ['view_merchants', 'edit_contracts', 'create_reports'],
    salary: 3200,
    commissionRate: 6.5
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
      monthlyRevenue: 18800,
      totalRevenue: 188000,
      merchantsManaged: 12,
      contractsSigned: 8,
      efficiency: 92
    },
    assignedMerchants: ['merchant-3', 'merchant-4'],
    permissions: ['view_merchants', 'edit_contracts'],
    salary: 2800,
    commissionRate: 5.5
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
      monthlyRevenue: 16600,
      totalRevenue: 199200,
      merchantsManaged: 8,
      contractsSigned: 6,
      efficiency: 98
    },
    assignedMerchants: ['merchant-5'],
    permissions: ['technical_support', 'maintenance_contracts'],
    salary: 3000,
    commissionRate: 4.0
  }
];

export const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddEmployee = (newEmployee: TeamMember) => {
    setTeamMembers(prev => [...prev, newEmployee]);
  };

  const filteredMembers = teamMembers.filter(member =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
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
                <FileText className="h-4 w-4 mr-2" />
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
                <p className="text-sm font-medium text-orange-600">Celkom zmluv</p>
                <p className="text-3xl font-bold text-orange-900">
                  {teamMembers.reduce((acc, m) => acc + m.performance.contractsSigned, 0)}
                </p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Hľadať člena tímu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Team Members Grid */}
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
                <div className={`w-3 h-3 rounded-full ${getStatusColor(member.status)}`}></div>
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
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{member.department}</span>
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
                </div>
              </div>
              
              <Button className="w-full" variant="outline">
                Zobraziť detail
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
