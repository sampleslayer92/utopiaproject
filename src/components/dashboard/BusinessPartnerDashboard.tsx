
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  FileText, 
  Target,
  Award,
  Eye,
  UsersRound,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TeamMember } from '@/types/team';

const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    firstName: 'Peter',
    lastName: 'Novák',
    email: 'peter.novak@iso-org.sk',
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

const monthlyData = [
  { month: 'Jan', total: 35000, peter: 15000, jana: 12000, martin: 8000 },
  { month: 'Feb', total: 38000, peter: 16000, jana: 13000, martin: 9000 },
  { month: 'Mar', total: 42000, peter: 18000, jana: 14000, martin: 10000 },
  { month: 'Apr', total: 45000, peter: 19000, jana: 15000, martin: 11000 },
  { month: 'Máj', total: 41000, peter: 17000, jana: 13500, martin: 10500 },
  { month: 'Jún', total: 47000, peter: 20000, jana: 16000, martin: 11000 },
];

export const BusinessPartnerDashboard: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');

  const getFilteredData = () => {
    if (selectedEmployee === 'all') {
      return {
        totalRevenue: mockTeamMembers.reduce((sum, member) => sum + member.performance.monthlyRevenue, 0),
        totalMerchants: mockTeamMembers.reduce((sum, member) => sum + member.performance.merchantsManaged, 0),
        totalContracts: mockTeamMembers.reduce((sum, member) => sum + member.performance.contractsSigned, 0),
        averageEfficiency: mockTeamMembers.reduce((sum, member) => sum + member.performance.efficiency, 0) / mockTeamMembers.length,
        chartData: monthlyData
      };
    }

    const member = mockTeamMembers.find(m => m.id === selectedEmployee);
    if (!member) return null;

    return {
      totalRevenue: member.performance.monthlyRevenue,
      totalMerchants: member.performance.merchantsManaged,
      totalContracts: member.performance.contractsSigned,
      averageEfficiency: member.performance.efficiency,
      chartData: monthlyData.map(item => ({
        month: item.month,
        value: item[member.firstName.toLowerCase() as keyof typeof item] || 0
      }))
    };
  };

  const filteredData = getFilteredData();
  const topPerformer = mockTeamMembers.reduce((top, member) => 
    member.performance.monthlyRevenue > top.performance.monthlyRevenue ? member : top
  );

  if (!filteredData) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard - Iso Organizacia
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Vítajte späť, Marián Lapoš
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <UsersRound className="h-4 w-4 text-gray-500" />
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetci zamestnanci</SelectItem>
                {mockTeamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.firstName} {member.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reporty
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {selectedEmployee === 'all' ? 'Celkové tržby tímu' : 'Mesačné tržby'}
                </p>
                <p className="text-2xl font-bold">€{filteredData.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12% vs minulý mesiac</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {selectedEmployee === 'all' ? 'Celkom merchantov' : 'Spravovaní merchanti'}
                </p>
                <p className="text-2xl font-bold">{filteredData.totalMerchants}</p>
                <p className="text-sm text-blue-600">
                  {selectedEmployee === 'all' ? `${mockTeamMembers.length} zamestnancov` : 'Aktívne spravuje'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {selectedEmployee === 'all' ? 'Celkom zmlúv' : 'Podpísané zmluvy'}
                </p>
                <p className="text-2xl font-bold">{filteredData.totalContracts}</p>
                <p className="text-sm text-purple-600">Tento mesiac</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {selectedEmployee === 'all' ? 'Priemerná efektivita' : 'Efektivita'}
                </p>
                <p className="text-2xl font-bold">{filteredData.averageEfficiency.toFixed(1)}%</p>
                <p className="text-sm text-orange-600">
                  {selectedEmployee === 'all' ? 'Celého tímu' : 'Individuálna'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {selectedEmployee === 'all' ? 'Tržby tímu' : `Tržby - ${mockTeamMembers.find(m => m.id === selectedEmployee)?.firstName} ${mockTeamMembers.find(m => m.id === selectedEmployee)?.lastName}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {selectedEmployee === 'all' ? (
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Tržby']} />
                  <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={filteredData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Tržby']} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              {selectedEmployee === 'all' ? 'Top výkonnosť tímu' : 'Detail zamestnanca'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEmployee === 'all' ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-yellow-800 dark:text-yellow-300">🏆 Top performer</p>
                      <p className="text-lg font-bold">{topPerformer.firstName} {topPerformer.lastName}</p>
                      <p className="text-sm text-yellow-600">€{topPerformer.performance.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {mockTeamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">{member.firstName} {member.lastName}</p>
                      <p className="text-sm text-gray-500">{member.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">€{member.performance.monthlyRevenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{member.performance.efficiency}%</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {(() => {
                  const member = mockTeamMembers.find(m => m.id === selectedEmployee);
                  if (!member) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-white font-bold text-xl">
                            {member.firstName[0]}{member.lastName[0]}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg">{member.firstName} {member.lastName}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{member.position}</p>
                        <Badge className="mt-2">
                          {member.status === 'active' ? 'Aktívny' : 'Neaktívny'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <p className="text-sm font-medium text-green-700 dark:text-green-300">Celkové tržby</p>
                          <p className="text-xl font-bold text-green-600">€{member.performance.totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Merchanti</p>
                          <p className="text-xl font-bold text-blue-600">{member.performance.merchantsManaged}</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                          <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Efektivita</p>
                          <p className="text-xl font-bold text-purple-600">{member.performance.efficiency}%</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
